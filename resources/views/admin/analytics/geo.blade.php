@extends('layouts.admin')

@section('content')
<div class="container-fluid">
    <!-- Основные метрики -->
    <div class="row mb-4">
        <div class="col-md-3">
            <div class="card">
                <div class="card-body">
                    <h6 class="card-title text-muted">Общий доход</h6>
                    <h2 class="mb-0">₽{{ number_format(array_sum(array_column($geoStats, 'revenue')), 0, '.', ' ') }}</h2>
                    <small class="text-success">+12.5% с прошлого месяца</small>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card">
                <div class="card-body">
                    <h6 class="card-title text-muted">Всего посещений</h6>
                    <h2 class="mb-0">{{ number_format(array_sum(array_column($geoStats, 'visits_count')), 0, '.', ' ') }}</h2>
                    <small class="text-success">+8.3% с прошлого месяца</small>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card">
                <div class="card-body">
                    <h6 class="card-title text-muted">Средняя конверсия</h6>
                    <h2 class="mb-0">2.8%</h2>
                    <small class="text-danger">-0.2% с прошлого месяца</small>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card">
                <div class="card-body">
                    <h6 class="card-title text-muted">Ср. время на сайте</h6>
                    <h2 class="mb-0">4:05</h2>
                    <small class="text-success">+0:15 с прошлого месяца</small>
                </div>
            </div>
        </div>
    </div>

    <!-- Карта -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">География доходов и посещений</h5>
                </div>
                <div class="card-body">
                    <div id="map" style="height: 600px;"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <!-- Таблица городов -->
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Статистика по городам</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Город</th>
                                    <th>Доход</th>
                                    <th>Посещения</th>
                                    <th>Конверсия</th>
                                    <th>Отказы</th>
                                    <th>Ср. время</th>
                                    <th>Тренд</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($geoStats as $stat)
                                <tr>
                                    <td>{{ $stat['city'] }}</td>
                                    <td>₽{{ number_format($stat['revenue'], 0, '.', ' ') }}</td>
                                    <td>{{ number_format($stat['visits_count']) }}</td>
                                    <td>{{ $stat['conversion_rate'] }}%</td>
                                    <td>{{ $stat['bounce_rate'] }}%</td>
                                    <td>{{ $stat['avg_time'] }}</td>
                                    <td>
                                        <div class="sparkline-line"></div>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Источники трафика -->
        <div class="col-md-4">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Источники трафика</h5>
                </div>
                <div class="card-body">
                    <canvas id="trafficSourcesChart" height="300"></canvas>
                </div>
            </div>
        </div>
    </div>

    <!-- Федеральные округа -->
    <div class="row mt-4">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Статистика по федеральным округам</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-8">
                            <canvas id="federalDistrictsChart" height="200"></canvas>
                        </div>
                        <div class="col-md-4">
                            <div class="table-responsive">
                                <table class="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Округ</th>
                                            <th>Доход</th>
                                            <th>Посещения</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach($federalDistricts as $district => $data)
                                        <tr>
                                            <td>{{ $district }}</td>
                                            <td>₽{{ number_format($data['revenue'], 0, '.', ' ') }}</td>
                                            <td>{{ number_format($data['visits']) }}</td>
                                        </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@push('scripts')
<script src="https://maps.googleapis.com/maps/api/js?key={{ config('services.google.maps_api_key') }}"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jquery-sparkline"></script>

<script>
    // Инициализация карты с тепловой картой
    function initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 4,
            center: { lat: 55.7558, lng: 37.6173 },
            styles: [/* стили карты */]
        });

        const visits = @json($geoVisits);
        
        // Создаем тепловую карту
        const heatmapData = visits.map(visit => ({
            location: new google.maps.LatLng(visit.latitude, visit.longitude),
            weight: visit.revenue / 10000 // Вес точки зависит от дохода
        }));

        new google.maps.visualization.HeatmapLayer({
            data: heatmapData,
            map: map,
            radius: 30
        });

        // Добавляем маркеры с информацией
        visits.forEach(visit => {
            const marker = new google.maps.Marker({
                position: { lat: parseFloat(visit.latitude), lng: parseFloat(visit.longitude) },
                map: map,
                title: visit.city
            });

            const infowindow = new google.maps.InfoWindow({
                content: `
                    <div class="p-2">
                        <h6>${visit.city}</h6>
                        <p class="mb-1">Доход: ₽${visit.revenue.toLocaleString()}</p>
                        <p class="mb-1">Посещения: ${visit.visits_count.toLocaleString()}</p>
                        <p class="mb-0">Конверсия: ${visit.conversion_rate}%</p>
                    </div>
                `
            });

            marker.addListener('click', () => {
                infowindow.open(map, marker);
            });
        });
    }

    // Инициализация графиков
    const trafficSourcesChart = new Chart(
        document.getElementById('trafficSourcesChart'),
        {
            type: 'doughnut',
            data: {
                labels: ['Органический', 'Прямой', 'Реферальный', 'Социальные сети'],
                datasets: [{
                    data: [43, 28, 17, 12],
                    backgroundColor: ['#28a745', '#17a2b8', '#ffc107', '#dc3545']
                }]
            }
        }
    );

    // Спарклайны для трендов
    $('.sparkline-line').sparkline([5,6,7,9,9,5,3,2,2,4,6,7], {
        type: 'line',
        width: '100',
        height: '30',
        lineColor: '#28a745',
        fillColor: false
    });

    initMap();
</script>
@endpush

@push('styles')
<style>
    .card {
        box-shadow: 0 0 1px rgba(0,0,0,.125), 0 1px 3px rgba(0,0,0,.2);
        margin-bottom: 1rem;
    }
    .table td {
        vertical-align: middle;
    }
</style>
@endpush 
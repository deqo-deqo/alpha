@extends('layouts.admin')

@section('content')
<div class="container-fluid">
    <!-- Сводка -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Анализ конкурентов</h5>
                    <div class="btn-group">
                        <button class="btn btn-sm btn-outline-secondary">За месяц</button>
                        <button class="btn btn-sm btn-outline-secondary active">За квартал</button>
                        <button class="btn btn-sm btn-outline-secondary">За год</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Основные метрики -->
    <div class="row mb-4">
        <!-- Доля рынка -->
        <div class="col-md-6">
            <div class="card h-100">
                <div class="card-header">
                    <h6 class="mb-0">Доля рынка</h6>
                </div>
                <div class="card-body">
                    <canvas id="marketShareChart" height="250"></canvas>
                </div>
            </div>
        </div>
        <!-- Динамика выручки -->
        <div class="col-md-6">
            <div class="card h-100">
                <div class="card-header">
                    <h6 class="mb-0">Динамика выручки по кварталам</h6>
                </div>
                <div class="card-body">
                    <canvas id="revenueChart" height="250"></canvas>
                </div>
            </div>
        </div>
    </div>

    <!-- Сравнительная таблица -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h6 class="mb-0">Сравнительный анализ</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Показатель</th>
                                    @foreach($competitors as $name => $data)
                                        <th>{{ $name }}</th>
                                    @endforeach
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Количество магазинов</td>
                                    @foreach($competitors as $data)
                                        <td>{{ number_format($data['store_count']) }}</td>
                                    @endforeach
                                </tr>
                                <tr>
                                    <td>Онлайн-присутствие</td>
                                    @foreach($competitors as $data)
                                        <td>{{ $data['online_presence'] }}%</td>
                                    @endforeach
                                </tr>
                                <tr>
                                    <td>Удовлетворенность клиентов</td>
                                    @foreach($competitors as $data)
                                        <td>{{ $data['customer_satisfaction'] }}/5</td>
                                    @endforeach
                                </tr>
                                <tr>
                                    <td>Ценовой индекс</td>
                                    @foreach($competitors as $data)
                                        <td>{{ $data['price_index'] }}</td>
                                    @endforeach
                                </tr>
                                <tr>
                                    <td>Доля трафика</td>
                                    @foreach($competitors as $data)
                                        <td>{{ $data['traffic_share'] }}%</td>
                                    @endforeach
                                </tr>
                                <tr>
                                    <td>Конверсия</td>
                                    @foreach($competitors as $data)
                                        <td>{{ $data['conversion_rate'] }}%</td>
                                    @endforeach
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Категории товаров -->
    <div class="row">
        @foreach($competitors as $name => $data)
        <div class="col-md-4">
            <div class="card">
                <div class="card-header">
                    <h6 class="mb-0">{{ $name }} - Структура продаж</h6>
                </div>
                <div class="card-body">
                    <canvas id="categories{{ str_replace(' ', '', $name) }}" height="250"></canvas>
                </div>
            </div>
        </div>
        @endforeach
    </div>
</div>

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    // График доли рынка
    new Chart(document.getElementById('marketShareChart'), {
        type: 'pie',
        data: {
            labels: {!! json_encode(array_keys($competitors)) !!},
            datasets: [{
                data: {!! json_encode(array_column($competitors, 'market_share')) !!},
                backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc']
            }]
        }
    });

    // График выручки
    new Chart(document.getElementById('revenueChart'), {
        type: 'line',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [
                @foreach($competitors as $name => $data)
                {
                    label: '{{ $name }}',
                    data: {!! json_encode(array_values($data['revenue'])) !!},
                    borderColor: '{{ $loop->iteration == 1 ? "#4e73df" : ($loop->iteration == 2 ? "#1cc88a" : "#36b9cc") }}',
                    fill: false
                },
                @endforeach
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString() + ' ₽';
                        }
                    }
                }
            }
        }
    });

    // Графики категорий для каждого конкурента
    @foreach($competitors as $name => $data)
    new Chart(document.getElementById('categories{{ str_replace(' ', '', $name) }}'), {
        type: 'doughnut',
        data: {
            labels: {!! json_encode(array_keys($data['top_categories'])) !!},
            datasets: [{
                data: {!! json_encode(array_values($data['top_categories'])) !!},
                backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e']
            }]
        }
    });
    @endforeach
</script>
@endpush

@push('styles')
<style>
    .card {
        box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
        margin-bottom: 1.5rem;
    }
    .card-header {
        background-color: #f8f9fc;
        border-bottom: 1px solid #e3e6f0;
    }
    .table td, .table th {
        vertical-align: middle;
    }
</style>
@endpush 
console.log('charts-init.js loaded');

// В начале файла добавим общие настройки для всех графиков
Chart.defaults.font.family = "'Styrene UI', -apple-system, BlinkMacSystemFont, sans-serif";
Chart.defaults.color = '#9BA1A8';
Chart.defaults.scale.grid.color = '#2A2F35';

// Общие настройки для тултипов
Chart.defaults.plugins.tooltip = {
    backgroundColor: '#1E2227',
    titleColor: '#E9ECEF',
    bodyColor: '#9BA1A8',
    borderColor: '#2A2F35',
    borderWidth: 1,
    padding: 12,
    bodyFont: {
        family: "'Styrene UI', -apple-system, BlinkMacSystemFont, sans-serif",
        size: 12
    },
    titleFont: {
        family: "'Styrene UI', -apple-system, BlinkMacSystemFont, sans-serif",
        size: 12,
        weight: 500
    }
};

// Общие настройки для легенды
Chart.defaults.plugins.legend.labels = {
    font: {
        family: "'Styrene UI', -apple-system, BlinkMacSystemFont, sans-serif",
        size: 12
    },
    padding: 16
};

// Общие настройки для осей
Chart.defaults.scale.ticks.font = {
    family: "'Styrene UI', -apple-system, BlinkMacSystemFont, sans-serif",
    size: 11
};

function initializeCharts(service) {
    switch(service) {
        case 'dashboard':
            initDashboardCharts();
            break;
        case 'seller':
            initSellerCharts();
            break;
        case 'optimizer':
            initOptimizerCharts();
            break;
        case 'data':
            initDataCharts();
            break;
        case 'insight':
            initInsightCharts();
            break;
        case 'generator':
            initGeneratorCharts();
            break;
        case 'target':
            initTargetCharts();
            break;
    }
}

function initDashboardCharts() {
    const salesChart = document.getElementById('salesChart');
    if (salesChart) {
        const ctx = salesChart.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
                datasets: [{
                    label: 'Wildberries',
                    data: [1200000, 1900000, 1700000, 2100000, 2500000, 2300000],
                    borderColor: '#FF4539',
                    backgroundColor: 'rgba(255, 69, 57, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Ozon',
                    data: [800000, 1100000, 1300000, 1500000, 1700000, 1900000],
                    borderColor: '#34D399',
                    backgroundColor: 'rgba(52, 211, 153, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#9BA1A8',
                            font: {
                                family: 'Styrene UI',
                                size: 12
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#2A2F35'
                        },
                        ticks: {
                            color: '#9BA1A8',
                            callback: value => `₽${value.toLocaleString()}`
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#9BA1A8'
                        }
                    }
                }
            }
        });
    }

    const ordersChart = document.getElementById('ordersChart');
    if (ordersChart) {
        const ctx = ordersChart.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                datasets: [{
                    label: 'Заказы',
                    data: [145, 132, 151, 142, 165, 121, 93],
                    backgroundColor: 'rgba(255, 69, 57, 0.2)',
                    borderColor: '#FF4539',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#2A2F35'
                        },
                        ticks: {
                            color: '#9BA1A8'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#9BA1A8'
                        }
                    }
                }
            }
        });
    }
}

// Обновим функцию форматирования для всех графиков
function formatCurrency(value) {
    if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + ' млн ₽';
    } else if (value >= 1000) {
        return (value / 1000).toFixed(1) + ' тыс ₽';
    }
    return value + ' ₽';
}

// Обновим функцию для Альфа Дата
function initDataCharts() {
    // Круговая диаграмма сегментации клиентов
    const segmentCtx = document.getElementById('customerSegmentChart');
    if (segmentCtx) {
        new Chart(segmentCtx, {
            type: 'doughnut',
            data: {
                labels: ['Новые', 'Активные', 'Постоянные', 'Спящие'],
                datasets: [{
                    data: [25, 40, 20, 15],
                    backgroundColor: [
                        '#FF4539',
                        '#34D399',
                        '#60A5FA',
                        '#9BA1A8'
                    ],
                    borderWidth: 0,
                    borderRadius: 4,
                    spacing: 2
                }]
            },
            options: {
                responsive: true,
                cutout: '75%',
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: '#E9ECEF',
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            font: {
                                size: 13,
                                weight: '500'
                            },
                            generateLabels: function(chart) {
                                const data = chart.data;
                                return data.labels.map((label, i) => ({
                                    text: `${label} ${data.datasets[0].data[i]}%`,
                                    fillStyle: data.datasets[0].backgroundColor[i],
                                    hidden: false,
                                    index: i,
                                    strokeStyle: data.datasets[0].backgroundColor[i]
                                }));
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#1E2227',
                        titleColor: '#E9ECEF',
                        bodyColor: '#E9ECEF',
                        padding: 12,
                        callbacks: {
                            label: function(context) {
                                return ` ${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Воронка продаж
    const salesFunnelCtx = document.getElementById('salesFunnelChart');
    if (salesFunnelCtx) {
        new Chart(salesFunnelCtx, {
            type: 'bar',
            data: {
                labels: ['Просмотры', 'Корзина', 'Оформление', 'Оплата'],
                datasets: [{
                    data: [1000, 400, 200, 100],
                    backgroundColor: '#FF4539',
                    borderRadius: 4
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 1000,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // График доли рынка
    const marketShareCtx = document.getElementById('marketShareChart');
    if (marketShareCtx) {
        new Chart(marketShareCtx, {
            type: 'doughnut',
            data: {
                labels: ['X5 Group', 'Магнит', 'Лента', 'Другие'],
                datasets: [{
                    data: [11.5, 9.8, 7.2, 71.5],
                    backgroundColor: [
                        '#FF4539',
                        '#34D399',
                        '#60A5FA',
                        '#9BA1A8'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                cutout: '60%',
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }

    // График динамики выручки конкурентов
    const revenueCtx = document.getElementById('competitorsRevenueChart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [{
                    label: 'X5 Group',
                    data: [6250000000, 6890000000, 7120000000, 7580000000],
                    borderColor: '#FF4539',
                    tension: 0.4
                }, {
                    label: 'Магнит',
                    data: [5890000000, 6120000000, 6450000000, 6890000000],
                    borderColor: '#34D399',
                    tension: 0.4
                }, {
                    label: 'Лента',
                    data: [3250000000, 3480000000, 3680000000, 3920000000],
                    borderColor: '#60A5FA',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }

    // Прогноз спроса
    const demandCtx = document.getElementById('demandForecastChart');
    if (demandCtx) {
        new Chart(demandCtx, {
            type: 'line',
            data: {
                labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
                datasets: [{
                    label: 'Прогноз',
                    data: [1500, 1800, 2100, 2400, 2700, 3000],
                    borderColor: '#34D399',
                    backgroundColor: 'rgba(52, 211, 153, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 3000,
                        ticks: {
                            stepSize: 400
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Retention Rate
    const retentionCtx = document.getElementById('retentionChart');
    if (retentionCtx) {
        new Chart(retentionCtx, {
            type: 'line',
            data: {
                labels: ['Неделя 1', 'Неделя 2', 'Неделя 3', 'Неделя 4'],
                datasets: [{
                    label: 'Retention Rate',
                    data: [100, 85, 75, 70],
                    borderColor: '#60A5FA',
                    backgroundColor: 'rgba(96, 165, 250, 0.1)',
                    fill: true
                }]
            }
        });
    }

    // График территориального анализа
    const territoryCtx = document.getElementById('territoryAnalysisChart');
    if (territoryCtx) {
        new Chart(territoryCtx, {
            type: 'bar',
            data: {
                labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                datasets: [{
                    label: 'Авто трафик',
                    data: [45000, 46000, 45000, 46000, 48000, 41000, 40000],
                    backgroundColor: '#60A5FA'
                }, {
                    label: 'Пешеходный трафик',
                    data: [12000, 12500, 12000, 12500, 18000, 16000, 15000],
                    backgroundColor: '#34D399'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 50000,
                        ticks: {
                            stepSize: 5000
                        },
                        grid: {
                            color: 'rgba(42, 47, 53, 0.5)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // График конкурентного анализа
    const competitorTrafficCtx = document.getElementById('competitorTrafficChart');
    if (competitorTrafficCtx) {
        new Chart(competitorTrafficCtx, {
            type: 'line',
            data: {
                labels: ['9:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'],
                datasets: [{
                    label: 'Наш трафик',
                    data: [150, 230, 380, 420, 480, 440, 280],
                    borderColor: '#FF4539',
                    tension: 0.4
                }, {
                    label: 'Конкурент 1',
                    data: [120, 180, 340, 380, 420, 390, 240],
                    borderColor: '#34D399',
                    tension: 0.4
                }, {
                    label: 'Конкурент 2',
                    data: [90, 140, 280, 320, 360, 330, 200],
                    borderColor: '#60A5FA',
                    tension: 0.4
                }]
            }
        });
    }

    // График среднего чека конкурентов
    const competitorPriceCtx = document.getElementById('competitorPriceChart');
    if (competitorPriceCtx) {
        new Chart(competitorPriceCtx, {
            type: 'bar',
            data: {
                labels: ['Наш магазин', 'Конкурент 1', 'Конкурент 2', 'Конкурнт 3'],
                datasets: [{
                    data: [2500, 2300, 2700, 2100],
                    backgroundColor: ['#FF4539', '#34D399', '#60A5FA', '#9BA1A8']
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '₽' + value;
                            }
                        }
                    }
                }
            }
        });
    }

    // График трафика от Билайн
    const beelineCtx = document.getElementById('beelineTrafficChart');
    if (beelineCtx) {
        new Chart(beelineCtx, {
            type: 'line',
            data: {
                labels: ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
                datasets: [{
                    label: 'Посетители',
                    data: [450, 680, 890, 920, 1100, 980, 640],
                    borderColor: '#F7C244',
                    backgroundColor: 'rgba(247, 194, 68, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.raw} посетителей`;
                            }
                        }
                    }
                }
            }
        });
    }

    // График прогноза оттока
    const churnCtx = document.getElementById('churnPredictionChart');
    if (churnCtx) {
        new Chart(churnCtx, {
            type: 'line',
            data: {
                labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
                datasets: [{
                    label: 'Прогноз оттока',
                    data: [2.0, 2.2, 2.1, 2.3, 2.5, 2.3],
                    borderColor: '#FF4539',
                    backgroundColor: 'rgba(255, 69, 57, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 3,
                        ticks: {
                            stepSize: 0.5,
                            callback: value => value + '%'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // График качества лидов
    const leadsCtx = document.getElementById('leadsQualityChart');
    if (leadsCtx) {
        new Chart(leadsCtx, {
            type: 'doughnut',
            data: {
                labels: ['Горячие', 'Теплые', 'Холодные'],
                datasets: [{
                    data: [45, 35, 20],
                    backgroundColor: ['#34D399', '#FFB400', '#9BA1A8']
                }]
            },
            options: {
                cutout: '70%'
            }
        });
    }

    // График эффективности маркетинговых кампаний
    const campaignEffectivenessCtx = document.getElementById('campaignEffectivenessChart');
    if (campaignEffectivenessCtx) {
        new Chart(campaignEffectivenessCtx, {
            type: 'bar',
            data: {
                labels: ['Email', 'SMS', 'Push', 'Контекст', 'Соцсети', 'Партнеры'],
                datasets: [{
                    label: 'ROI',
                    data: [350, 280, 220, 420, 380, 290],
                    backgroundColor: '#34D399',
                    borderRadius: 4,
                    yAxisID: 'y'
                }, {
                    label: 'CAC',
                    data: [1200, 800, 600, 2500, 1800, 1500],
                    backgroundColor: '#FF4539',
                    borderRadius: 4,
                    yAxisID: 'y1'
                }]
            },
            options: {
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    y: {
                        type: 'linear',
                        position: 'left',
                        max: 450,
                        title: {
                            display: true,
                            text: 'ROI (%)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        position: 'right',
                        max: 2500,
                        title: {
                            display: true,
                            text: 'CAC (₽)'
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                }
            }
        });
    }

    // График воронки продаж по каналам
    const channelFunnelCtx = document.getElementById('channelFunnelChart');
    if (channelFunnelCtx) {
        new Chart(channelFunnelCtx, {
            type: 'bar',
            data: {
                labels: ['Органика', 'Email', 'Реклама', 'Соцсети', 'Партнеры'],
                datasets: [{
                    label: 'Просмотры',
                    data: [5000, 3500, 4200, 3800, 2900],
                    backgroundColor: '#60A5FA'
                }, {
                    label: 'Регистрации',
                    data: [1500, 1200, 1800, 1400, 900],
                    backgroundColor: '#34D399'
                }, {
                    label: 'Покупки',
                    data: [500, 400, 700, 450, 300],
                    backgroundColor: '#FF4539'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Количество пользователей'
                        }
                    }
                }
            }
        });
    }

    // График удержания по каналам привлечения
    const retentionByChannelCtx = document.getElementById('retentionByChannelChart');
    if (retentionByChannelCtx) {
        new Chart(retentionByChannelCtx, {
            type: 'line',
            data: {
                labels: ['День 1', 'День 7', 'День 14', 'День 30', 'День 60', 'День 90'],
                datasets: [{
                    label: 'Органика',
                    data: [100, 45, 35, 30, 25, 22],
                    borderColor: '#34D399'
                }, {
                    label: 'Реклама',
                    data: [100, 40, 30, 25, 20, 18],
                    borderColor: '#60A5FA'
                }, {
                    label: 'Соцсети',
                    data: [100, 35, 25, 20, 15, 12],
                    borderColor: '#FF4539'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Retention Rate (%)'
                        }
                    }
                }
            }
        });
    }

    // Real-time активность
    const realtimeActivityCtx = document.getElementById('realtimeActivityChart');
    if (realtimeActivityCtx) {
        let realtimeChart = new Chart(realtimeActivityCtx, {
            type: 'line',
            data: {
                labels: Array.from({length: 20}, (_, i) => `${i}:00`),
                datasets: [{
                    label: 'Активные пользователи',
                    data: [150, 165, 180, 175, 190, 205, 200, 220, 235, 225, 240, 235, 
                           250, 245, 260, 255, 240, 235, 220, 210],
                    borderColor: '#60A5FA',
                    backgroundColor: 'rgba(96, 165, 250, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 300,
                        grid: {
                            color: 'rgba(42, 47, 53, 0.5)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });

        setInterval(() => {
            const data = realtimeChart.data.datasets[0].data;
            data.shift();
            data.push(Math.floor(Math.random() * 50) + 200);
            realtimeChart.update('none');
        }, 5000);
    }

    // График распределения клиентских сегментов по LTV
    const segmentLTVCtx = document.getElementById('segmentLTVChart');
    if (segmentLTVCtx) {
        new Chart(segmentLTVCtx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Высокий LTV',
                    data: generateSegmentData(50, 80000, 90),
                    backgroundColor: '#34D399'
                }, {
                    label: 'Средний LTV',
                    data: generateSegmentData(40, 40000, 60),
                    backgroundColor: '#60A5FA'
                }, {
                    label: 'Низкий LTV',
                    data: generateSegmentData(30, 20000, 30),
                    backgroundColor: '#FF4539'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Частота покупок'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'LTV'
                        },
                        ticks: {
                            callback: value => formatCurrency(value)
                        }
                    }
                }
            }
        });
    }

    // Real-time дашборд мониторинга
    const realtimeMetrics = {
        revenue: {
            current: 0,
            target: 1000000,
            element: document.getElementById('realtimeRevenue')
        },
        orders: {
            current: 0,
            target: 1000,
            element: document.getElementById('realtimeOrders')
        },
        conversion: {
            current: 0,
            target: 5,
            element: document.getElementById('realtimeConversion')
        },
        avgCheck: {
            current: 0,
            target: 5000,
            element: document.getElementById('realtimeAvgCheck')
        }
    };

    // Функция обновления метрик
    function updateRealtimeMetrics() {
        Object.keys(realtimeMetrics).forEach(key => {
            const metric = realtimeMetrics[key];
            const newValue = simulateMetricValue(key);
            const trend = ((newValue - metric.current) / metric.current * 100).toFixed(1);
            
            metric.current = newValue;
            
            if (metric.element) {
                metric.element.querySelector('.metric-value').textContent = formatMetricValue(key, newValue);
                metric.element.querySelector('.metric-trend').innerHTML = `
                    <span class="material-icons-round">${trend > 0 ? 'trending_up' : 'trending_down'}</span>
                    ${Math.abs(trend)}%
                `;
                metric.element.querySelector('.metric-trend').className = 
                    `metric-trend ${trend > 0 ? 'positive' : 'negative'}`;
                
                // Обновляем прогресс
                const progress = (newValue / metric.target * 100).toFixed(1);
                metric.element.querySelector('.progress').style.width = `${progress}%`;
            }
        });
    }

    // Функция форматирования значений
    function formatMetricValue(type, value) {
        switch(type) {
            case 'revenue':
                return `₽${(value / 1000000).toFixed(2)}M`;
            case 'conversion':
                return `${value.toFixed(1)}%`;
            case 'avgCheck':
                return `₽${value.toFixed(0)}`;
            default:
                return value.toFixed(0);
        }
    }

    // Симуляция изменения метрик
    function simulateMetricValue(type) {
        const metric = realtimeMetrics[type];
        const variation = Math.random() * 0.1 - 0.05; // ±5%
        return metric.current * (1 + variation);
    }

    // Запускаем обновление каждые 3 секунды
    setInterval(updateRealtimeMetrics, 3000);

    // Инициализация начальных значений
    realtimeMetrics.revenue.current = 850000;
    realtimeMetrics.orders.current = 850;
    realtimeMetrics.conversion.current = 4.2;
    realtimeMetrics.avgCheck.current = 4500;
    updateRealtimeMetrics();

    // Инициализация карты
    const mapElement = document.getElementById('geoMap');
    if (mapElement) {
        const map = new google.maps.Map(mapElement, {
            center: { lat: 55.7558, lng: 37.6173 }, // Москва
            zoom: 12,
            styles: [
                { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                {
                    featureType: "administrative.locality",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#d59563" }],
                },
                {
                    featureType: "poi",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#d59563" }],
                },
                {
                    featureType: "poi.park",
                    elementType: "geometry",
                    stylers: [{ color: "#263c3f" }],
                },
                {
                    featureType: "poi.park",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#6b9a76" }],
                },
                {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [{ color: "#38414e" }],
                },
                {
                    featureType: "road",
                    elementType: "geometry.stroke",
                    stylers: [{ color: "#212a37" }],
                },
                {
                    featureType: "road",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#9ca5b3" }],
                },
                {
                    featureType: "road.highway",
                    elementType: "geometry",
                    stylers: [{ color: "#746855" }],
                },
                {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [{ color: "#1f2835" }],
                },
                {
                    featureType: "road.highway",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#f3d19c" }],
                },
                {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{ color: "#17263c" }],
                },
                {
                    featureType: "water",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#515c6d" }],
                },
                {
                    featureType: "water",
                    elementType: "labels.text.stroke",
                    stylers: [{ color: "#17263c" }],
                },
            ]
        });

        // Добавляем маркеры конкурентов
        const competitors = [
            { position: { lat: 55.7558, lng: 37.6173 }, title: "Наш магазин" },
            { position: { lat: 55.7557, lng: 37.6174 }, title: "Конкурент 1" },
            { position: { lat: 55.7556, lng: 37.6175 }, title: "Конкурент 2" }
        ];

        // Тепловая карта посещаемости
        const heatmapData = [
            { location: new google.maps.LatLng(55.7558, 37.6173), weight: 0.8 },
            { location: new google.maps.LatLng(55.7557, 37.6174), weight: 0.6 },
            { location: new google.maps.LatLng(55.7556, 37.6175), weight: 0.4 }
            // Добавьте больше точек для более реалистичной тепловой карты
        ];

        const heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatmapData,
            map: map,
            radius: 50,
            gradient: [
                'rgba(0, 255, 255, 0)',
                'rgba(0, 255, 255, 1)',
                'rgba(0, 191, 255, 1)',
                'rgba(0, 127, 255, 1)',
                'rgba(0, 63, 255, 1)',
                'rgba(0, 0, 255, 1)',
                'rgba(0, 0, 223, 1)',
                'rgba(0, 0, 191, 1)',
                'rgba(0, 0, 159, 1)',
                'rgba(0, 0, 127, 1)',
                'rgba(63, 0, 91, 1)',
                'rgba(127, 0, 63, 1)',
                'rgba(191, 0, 31, 1)',
                'rgba(255, 0, 0, 1)'
            ]
        });

        // Добавляем маркеры
        competitors.forEach(competitor => {
            new google.maps.Marker({
                position: competitor.position,
                map: map,
                title: competitor.title
            });
        });
    }

    // График оттока клиентов
    const churnChart = document.getElementById('churnChart');
    if (churnChart) {
        new Chart(churnChart, {
            type: 'line',
            data: {
                labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
                datasets: [{
                    label: 'Отток клиентов',
                    data: [2.0, 2.1, 2.0, 2.2, 2.5, 2.3],
                    borderColor: '#FF4539',
                    backgroundColor: 'rgba(255, 69, 57, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => value + '%'
                        },
                        grid: {
                            color: 'rgba(42, 47, 53, 0.5)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // График прогноза спроса
    const demandChart = document.getElementById('demandChart');
    if (demandChart) {
        new Chart(demandChart, {
            type: 'line',
            data: {
                labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
                datasets: [{
                    label: 'Прогноз спроса',
                    data: [1500, 1800, 2000, 2200, 2500, 2800],
                    borderColor: '#34D399',
                    backgroundColor: 'rgba(52, 211, 153, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(42, 47, 53, 0.5)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

// Графики для Альфа Инсайт
function initInsightCharts() {
    const ctx = document.getElementById('reviewsChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            datasets: [{
                label: 'Позитивные',
                data: [25, 30, 28, 35, 32, 28, 24],
                borderColor: '#34D399',
                backgroundColor: 'rgba(52, 211, 153, 0.1)',
                fill: true
            }, {
                label: 'Негативные',
                data: [5, 7, 4, 6, 5, 8, 6],
                borderColor: '#FF4539',
                backgroundColor: 'rgba(255, 69, 57, 0.1)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#9BA1A8',
                        font: {
                            family: fontFamily
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#2A2F35'
                    },
                    ticks: {
                        color: '#9BA1A8',
                        font: {
                            family: fontFamily
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#9BA1A8',
                        font: {
                            family: fontFamily
                        }
                    }
                }
            }
        }
    });
}

// Графики для Альфа Генератор
function initGeneratorCharts() {
    const ctx = document.getElementById('postsPerformanceChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                datasets: [{
                    label: 'Охват',
                    data: [5000, 7000, 6500, 8000, 7500, 9000, 8500],
                    borderColor: '#60A5FA',
                    backgroundColor: 'rgba(96, 165, 250, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}

// Графики для Альфа Таргет
function initTargetCharts() {
    const ctx = document.getElementById('adPerformanceChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                datasets: [{
                    label: 'ROI',
                    data: [150, 180, 170, 190, 200, 185, 195],
                    borderColor: '#34D399',
                    backgroundColor: 'rgba(52, 211, 153, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    yAxisID: 'y'
                }, {
                    label: 'Расходы',
                    data: [5000, 7000, 6500, 8000, 7500, 9000, 8500],
                    borderColor: '#FF4539',
                    backgroundColor: 'rgba(255, 69, 57, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    yAxisID: 'y1'
                }]
            },
            options: {
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false
                }
            }
        });
    }
}

// Добавим функцию для Альфа Селлер
function initSellerCharts() {
    const ctx = document.getElementById('sellerSalesChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
                datasets: [{
                    label: 'Wildberries',
                    data: [1200000, 1900000, 1700000, 2100000, 2500000, 2300000],
                    borderColor: '#FF4539',
                    backgroundColor: 'rgba(255, 69, 57, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Ozon',
                    data: [800000, 1100000, 1300000, 1500000, 1700000, 1900000],
                    borderColor: '#34D399',
                    backgroundColor: 'rgba(52, 211, 153, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += new Intl.NumberFormat('ru-RU', {
                                    style: 'currency',
                                    currency: 'RUB',
                                    maximumFractionDigits: 0
                                }).format(context.raw);
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: function(value) {
                                if (value >= 1000000) {
                                    return (value / 1000000).toFixed(1) + ' млн ₽';
                                }
                                return value.toLocaleString() + ' ₽';
                            }
                        }
                    }
                }
            }
        });
    }
}

// Добавим функцию для Альфа Оптимизатор
function initOptimizerCharts() {
    const ctx = document.getElementById('demandForecastChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
                datasets: [{
                    label: 'Прогноз',
                    data: [1500, 1800, 2100, 2400, 2700, 3000],
                    borderColor: '#34D399',
                    backgroundColor: 'rgba(52, 211, 153, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Фактические продажи',
                    data: [1400, 1700, 1900, 2200, 2500, null],
                    borderColor: '#60A5FA',
                    backgroundColor: 'rgba(96, 165, 250, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }
}

function getHeatmapData() {
    return [
        { location: new google.maps.LatLng(55.7558, 37.6173), weight: 0.5 },
        { location: new google.maps.LatLng(55.7557, 37.6174), weight: 0.7 }
    ];
}

function generateSegmentData(count, maxY, spread) {
    return Array.from({ length: count }, () => ({
        x: Math.random() * spread,
        y: Math.random() * maxY
    }));
}

// График проблемных зон сервиса
const serviceIssuesCtx = document.getElementById('serviceIssuesChart');
if (serviceIssuesCtx) {
    new Chart(serviceIssuesCtx, {
        type: 'bar',
        data: {
            labels: ['Время ответа', 'Повторные обращения', 'Нерешенные проблемы', 'Негативные отзывы'],
            datasets: [{
                label: 'Текущий месяц',
                data: [15, 23, 8, 12],
                backgroundColor: '#FF4539',
                borderRadius: 4
            }, {
                label: 'Прошлый месяц',
                data: [18, 25, 10, 15],
                backgroundColor: '#9BA1A8',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => value + '%'
                    }
                }
            }
        }
    });
}

// График динамики обращений по категориям
const issuesCategoryCtx = document.getElementById('issuesCategoryChart');
if (issuesCategoryCtx) {
    new Chart(issuesCategoryCtx, {
        type: 'line',
        data: {
            labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            datasets: [{
                label: 'Технические',
                data: [45, 52, 48, 55, 50, 40, 38],
                borderColor: '#FF4539',
                tension: 0.4
            }, {
                label: 'Оплата',
                data: [30, 35, 32, 38, 35, 28, 25],
                borderColor: '#34D399',
                tension: 0.4
            }, {
                label: 'Доставка',
                data: [25, 28, 30, 32, 28, 22, 20],
                borderColor: '#60A5FA',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false
            }
        }
    });
}

// График удовлетворенности клиентов
const satisfactionCtx = document.getElementById('customerSatisfactionChart');
if (satisfactionCtx) {
    new Chart(satisfactionCtx, {
        type: 'doughnut',
        data: {
            labels: ['Довольны', 'Нейтрально', '��едовольны'],
            datasets: [{
                data: [65, 25, 10],
                backgroundColor: [
                    '#34D399',
                    '#FFB400',
                    '#FF4539'
                ],
                borderWidth: 0,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#E9ECEF',
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                }
            }
        }
    });
}

// График времени ответа по каналам
const responseTimeCtx = document.getElementById('responseTimeChart');
if (responseTimeCtx) {
    new Chart(responseTimeCtx, {
        type: 'bar',
        data: {
            labels: ['Чат', 'Email', 'Телефон', 'Соцсети'],
            datasets: [{
                label: 'Среднее время ответа (мин)',
                data: [2, 45, 1, 15],
                backgroundColor: '#60A5FA',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Минуты'
                    }
                }
            }
        }
    });
}

// График эффективности каналов
const channelPerformanceCtx = document.getElementById('channelPerformanceChart');
if (channelPerformanceCtx) {
    new Chart(channelPerformanceCtx, {
        type: 'radar',
        data: {
            labels: ['Конверсия', 'ROI', 'Охват', 'Вовлеченность', 'LTV', 'Retention'],
            datasets: [{
                label: 'Email',
                data: [85, 90, 65, 75, 82, 78],
                borderColor: '#34D399',
                backgroundColor: 'rgba(52, 211, 153, 0.2)'
            }, {
                label: 'Соцсети',
                data: [75, 82, 90, 88, 70, 72],
                borderColor: '#60A5FA',
                backgroundColor: 'rgba(96, 165, 250, 0.2)'
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        display: false
                    }
                }
            }
        }
    });
}

// График динамики конверсии
const conversionTrendCtx = document.getElementById('conversionTrendChart');
if (conversionTrendCtx) {
    new Chart(conversionTrendCtx, {
        type: 'line',
        data: {
            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
            datasets: [{
                label: 'Конверсия',
                data: [3.2, 3.5, 3.8, 4.2, 4.5, 4.7],
                borderColor: '#FF4539',
                backgroundColor: 'rgba(255, 69, 57, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Конверсия: ${context.raw}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => value + '%'
                    }
                }
            }
        }
    });
}

// График потенциальных клиентов
const potentialClientsCtx = document.getElementById('potentialClientsChart');
if (potentialClientsCtx) {
    new Chart(potentialClientsCtx, {
        type: 'line',
        data: {
            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
            datasets: [{
                label: 'Новые лиды',
                data: [800, 950, 1100, 1234, 1400, 1500],
                borderColor: '#34D399',
                backgroundColor: 'rgba(52, 211, 153, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// График смарт-прайсинга
const smartPricingCtx = document.getElementById('smartPricingChart');
if (smartPricingCtx) {
    new Chart(smartPricingCtx, {
        type: 'line',
        data: {
            labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            datasets: [{
                label: 'Рекомендованная цена',
                data: [2500, 2600, 2550, 2700, 2800, 2750, 2600],
                borderColor: '#34D399',
                borderDash: [5, 5]
            }, {
                label: 'Текущая цена',
                data: [2400, 2500, 2450, 2600, 2700, 2650, 2500],
                borderColor: '#60A5FA'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: value => '₽' + value
                    }
                }
            }
        }
    });
}

// Добавим инициализацию графика трендов роста
function initTrendsChart() {
    const trendsCtx = document.getElementById('competitorTrendsChart');
    if (trendsCtx) {
        new Chart(trendsCtx, {
            type: 'line',
            data: {
                labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
                datasets: [{
                    label: 'X5 Group',
                    data: [100, 105, 108, 112, 115, 120],
                    borderColor: '#FF4539',
                    tension: 0.4
                }, {
                    label: 'Магнит',
                    data: [100, 102, 105, 107, 110, 112],
                    borderColor: '#34D399',
                    tension: 0.4
                }, {
                    label: 'Лента',
                    data: [100, 101, 103, 104, 106, 108],
                    borderColor: '#60A5FA',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw}%`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 95,
                        max: 125,
                        ticks: {
                            callback: value => value + '%'
                        }
                    }
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    try {
        initDataCharts();
        console.log('Charts initialized');
    } catch (error) {
        console.error('Error initializing charts:', error);
    }
});
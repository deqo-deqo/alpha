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
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                cutout: '60%',
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            generateLabels: function(chart) {
                                const data = chart.data;
                                return data.labels.map((label, i) => ({
                                    text: `${label} (${data.datasets[0].data[i]}%)`,
                                    fillStyle: data.datasets[0].backgroundColor[i],
                                    hidden: false,
                                    index: i
                                }));
                            }
                        }
                    },
                    tooltip: {
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
    const funnelCtx = document.getElementById('salesFunnelChart');
    if (funnelCtx) {
        new Chart(funnelCtx, {
            type: 'bar',
            data: {
                labels: ['Просмотры', 'Корзина', 'Оформление', 'Оплата'],
                datasets: [{
                    data: [1000, 400, 200, 150],
                    backgroundColor: '#FF4539',
                    borderRadius: 4,
                    barThickness: 20
                }]
            },
            options: {
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            callback: value => value
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
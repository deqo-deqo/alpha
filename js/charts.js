document.addEventListener('DOMContentLoaded', () => {
    // Проверяем наличие элемента перед инициализацией
    const salesChart = document.getElementById('salesChart');
    if (salesChart) {
        const ctx = salesChart.getContext('2d');
        // Инициализация графика
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
                            },
                            padding: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: '#1E2227',
                        titleColor: '#E9ECEF',
                        bodyColor: '#9BA1A8',
                        borderColor: '#2A2F35',
                        borderWidth: 1,
                        padding: 12,
                        bodyFont: {
                            family: 'Styrene UI',
                            size: 12
                        },
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
                        beginAtZero: true,
                        ticks: {
                            color: '#9BA1A8',
                            font: {
                                family: 'Styrene UI',
                                size: 11
                            },
                            callback: function(value) {
                                return new Intl.NumberFormat('ru-RU', {
                                    style: 'currency',
                                    currency: 'RUB',
                                    notation: 'compact',
                                    maximumFractionDigits: 1
                                }).format(value);
                            }
                        },
                        grid: {
                            color: '#2A2F35',
                            drawBorder: false
                        }
                    },
                    x: {
                        ticks: {
                            color: '#9BA1A8',
                            font: {
                                family: 'Styrene UI',
                                size: 11
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    const ordersChart = document.getElementById('ordersChart');
    if (ordersChart) {
        const ctx = ordersChart.getContext('2d');
        // Инициализация графика
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
                    },
                    tooltip: {
                        backgroundColor: '#1E2227',
                        titleColor: '#E9ECEF',
                        bodyColor: '#9BA1A8',
                        borderColor: '#2A2F35',
                        borderWidth: 1,
                        padding: 12,
                        bodyFont: {
                            family: 'Styrene UI',
                            size: 12
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#9BA1A8',
                            font: {
                                family: 'Styrene UI',
                                size: 11
                            }
                        },
                        grid: {
                            color: '#2A2F35',
                            drawBorder: false
                        }
                    },
                    x: {
                        ticks: {
                            color: '#9BA1A8',
                            font: {
                                family: 'Styrene UI',
                                size: 11
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}); 
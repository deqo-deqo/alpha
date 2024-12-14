// Обновленная версия main.js
function navigateToService(service) {
    // Предотвращаем стандартное поведение ссылки
    event.preventDefault();
    
    // Убираем активный класс со всех пунктов меню
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Добавляем активный класс к выбранному пункту
    const menuItem = event.currentTarget.closest('.menu-item');
    if (menuItem) {
        menuItem.classList.add('active');
    }
    
    // Загружаем контент
    loadServiceContent(service);
    
    // Обновляем URL без перезагрузки страницы
    history.pushState({service: service}, '', `/${service}`);
}

function loadServiceContent(service) {
    const mainContent = document.querySelector('.dashboard-main');
    
    // Показываем индикатор загрузки
    mainContent.innerHTML = '<div class="loading">Загрузка...</div>';
    
    fetch(`services/${service}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            mainContent.innerHTML = html;
            
            // Инициализируем графики после загрузки контента
            if (typeof initializeCharts === 'function') {
                initializeCharts(service);
            }
        })
        .catch(error => {
            console.error('Error loading content:', error);
            mainContent.innerHTML = `
                <div class="error-message">
                    <span class="material-icons-round">error_outline</span>
                    <p>Произошла ошибка при загрузке контента</p>
                </div>
            `;
        });
}

// Обработчики мобильного меню
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.querySelector('.sidebar');
    
    // Создаем оверлей
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.insertBefore(overlay, sidebar.nextSibling);

    if (mobileMenuBtn && sidebar) {
        // Обработчик клика по кнопке меню
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Menu button clicked'); // Добавим для отладки
            sidebar.classList.toggle('active');
            document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
            
            // Обновляем иконку
            const icon = this.querySelector('.material-icons-round');
            icon.textContent = sidebar.classList.contains('active') ? 'close' : 'menu';
            
            // Показываем/скрываем оверлей
            overlay.style.visibility = sidebar.classList.contains('active') ? 'visible' : 'hidden';
            overlay.style.opacity = sidebar.classList.contains('active') ? '1' : '0';
        });

        // Закрытие меню при клике на оверлей
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
            mobileMenuBtn.querySelector('.material-icons-round').textContent = 'menu';
            this.style.visibility = 'hidden';
            this.style.opacity = '0';
        });

        // Закрытие меню при клике на пункт меню
        sidebar.querySelectorAll('.menu-item a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    document.body.style.overflow = '';
                    mobileMenuBtn.querySelector('.material-icons-round').textContent = 'menu';
                    overlay.style.visibility = 'hidden';
                    overlay.style.opacity = '0';
                }
            });
        });

        // Предотвращаем закрытие при клике на само меню
        sidebar.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Блокируем скролл при открытом меню
        sidebar.addEventListener('touchmove', function(e) {
            if (sidebar.classList.contains('active')) {
                e.stopPropagation();
            }
        }, { passive: true });
    }

    // Определяем текущий путь и устанавливаем активный пункт меню
    const currentPath = window.location.pathname.substring(1) || 'dashboard';
    setActiveMenuItem(currentPath);
});

// Обработчик изменения истории браузера
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.service) {
        loadServiceContent(event.state.service);
        setActiveMenuItem(event.state.service);
    }
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Загружаем дашбод по умолчанию
    loadServiceContent('dashboard');
});

// Определяем текущий сервис из URL
const path = window.location.pathname.substring(1);
const service = path || 'dashboard';

// Устанавливаем активный пункт меню
const menuItem = document.querySelector(`[onclick="navigateToService('${service}')"]`);
if (menuItem) {
    menuItem.parentElement.classList.add('active');
}

// Обновленный обработчик для точек на карте
document.addEventListener('DOMContentLoaded', function() {
    const geoPoints = document.querySelectorAll('.geo-point');
    
    geoPoints.forEach(point => {
        point.addEventListener('mouseover', function() {
            const stats = JSON.parse(this.dataset.stats);
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.innerHTML = `
                <div class="tooltip-title">${stats.city}</div>
                <div class="tooltip-content">
                    <div>Выручка: ${stats.revenue}</div>
                    <div>Магазинов: ${stats.stores}</div>
                    <div>Рост: ${stats.growth}</div>
                </div>
            `;
            
            this.appendChild(tooltip);
        });
        
        point.addEventListener('mouseout', function() {
            const tooltip = this.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
});

// Добавим в существующий файл
document.addEventListener('DOMContentLoaded', function() {
    // Определяем текущий путь
    const currentPath = window.location.pathname;
    
    // Находим все пункты подменю
    const submenuItems = document.querySelectorAll('.submenu-item');
    
    // Устанавливаем активный класс для текущего пути
    submenuItems.forEach(item => {
        if (item.getAttribute('href') === currentPath) {
            item.classList.add('active');
            // Также активируем родительское подменю, если есть
            const parentSubmenu = item.closest('.submenu-secondary');
            if (parentSubmenu) {
                parentSubmenu.parentElement.classList.add('active');
            }
        }
    });
});

// Обновляем обработчик клика для подменю
function toggleSubmenu(element) {
    event.preventDefault();
    event.stopPropagation(); // Предотвращаем всплытие события
    const menuItem = element.closest('.has-submenu');
    menuItem.classList.toggle('open');
}

// Обновим функцию определения активного пункта
function setActiveMenuItem(path) {
    // Убираем активный класс со всех пунктов
    document.querySelectorAll('.sidebar-menu a').forEach(item => {
        item.classList.remove('active');
    });
    
    // Находим и активируем нужный пункт
    const menuItem = document.querySelector(`.sidebar-menu a[onclick*="${path}"]`);
    if (menuItem) {
        menuItem.classList.add('active');
        // Если это подпункт, открываем родительское меню
        const parentSubmenu = menuItem.closest('.has-submenu');
        if (parentSubmenu) {
            parentSubmenu.classList.add('open');
        }
    }
}

// Обновляем обработчики мобильного меню
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.querySelector('.sidebar');
    
    // Создаем оверлей
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.insertBefore(overlay, sidebar.nextSibling);

    if (mobileMenuBtn && sidebar) {
        // Обработчик клика по кнопке меню
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Предотвращаем стандартное поведение
            sidebar.classList.toggle('active');
            document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
            
            // Обновляем иконку
            const icon = this.querySelector('.material-icons-round');
            icon.textContent = sidebar.classList.contains('active') ? 'close' : 'menu';
            
            // Показываем/скрываем оверлей
            overlay.style.visibility = sidebar.classList.contains('active') ? 'visible' : 'hidden';
            overlay.style.opacity = sidebar.classList.contains('active') ? '1' : '0';
        });

        // Закрытие меню при клике на оверлей
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
            mobileMenuBtn.querySelector('.material-icons-round').textContent = 'menu';
            this.style.visibility = 'hidden';
            this.style.opacity = '0';
        });

        // Закрытие меню при клике на пункт меню
        sidebar.querySelectorAll('.menu-item a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    document.body.style.overflow = '';
                    mobileMenuBtn.querySelector('.material-icons-round').textContent = 'menu';
                    overlay.style.visibility = 'hidden';
                    overlay.style.opacity = '0';
                }
            });
        });

        // Предотвращаем закрытие при клике на само меню
        sidebar.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Блокируем скролл при открытом меню
        sidebar.addEventListener('touchmove', function(e) {
            if (sidebar.classList.contains('active')) {
                e.stopPropagation();
            }
        }, { passive: true });
    }
});

// Обновить функцию initializeCharts
function initializeCharts(service) {
    // Добавить адаптивные опции для всех графиков
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: window.innerWidth <= 768 ? 'bottom' : 'top',
                labels: {
                    boxWidth: window.innerWidth <= 768 ? 12 : 40,
                    padding: window.innerWidth <= 768 ? 10 : 20
                }
            }
        }
    };

    // Применяем опции к графикам
    if (typeof Chart !== 'undefined') {
        Chart.defaults.set('options', {
            ...Chart.defaults.get('options'),
            ...commonOptions
        });
    }
} 
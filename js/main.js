// Обновленная версия main.js
function navigateToService(service) {
    // Предотвращаем стандартное поведение ссылки
    event.preventDefault();
    
    // Убираем активный класс со всех пунктов меню
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Добавляем активный класс к выбранному пункту
    event.currentTarget.parentElement.classList.add('active');
    
    // Загружаем контент
    loadServiceContent(service);
    
    // Обновляем URL без перезагрузки страницы
    history.pushState({service: service}, '', `/${service}`);
}

function loadServiceContent(service) {
    const mainContent = document.querySelector('.dashboard-main');
    
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
            // Проверяем существование функции
            if (typeof initializeCharts === 'function') {
                try {
                    initializeCharts(service);
                } catch (error) {
                    console.warn('Error initializing charts:', error);
                }
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

// Обработчик кнопки "назад" в браузере
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.service) {
        loadServiceContent(event.state.service);
    }
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Загружаем дашборд по умолчанию
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
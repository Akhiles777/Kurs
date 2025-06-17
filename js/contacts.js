// Инициализация карты
function initMap() {
    // Координаты центра карты (Москва)
    const center = [55.7558, 37.6173];
    
    // Создаем карту
    const map = new ymaps.Map('map', {
        center: center,
        zoom: 11
    });

    // Массив с данными о магазинах
    const shops = [
        {
            name: 'Магазин "Флора" - Центр',
            address: 'г. Москва, ул. Цветочная, 1',
            coordinates: [55.7558, 37.6173],
            phone: '+7 (999) 123-45-67',
            hours: 'Пн-Вс: 9:00 - 21:00'
        },
        {
            name: 'Магазин "Флора" - Север',
            address: 'г. Москва, ул. Северная, 15',
            coordinates: [55.8358, 37.6173],
            phone: '+7 (999) 123-45-68',
            hours: 'Пн-Вс: 9:00 - 21:00'
        },
        {
            name: 'Магазин "Флора" - Юг',
            address: 'г. Москва, ул. Южная, 25',
            coordinates: [55.6758, 37.6173],
            phone: '+7 (999) 123-45-69',
            hours: 'Пн-Вс: 9:00 - 21:00'
        }
    ];

    // Добавляем метки на карту
    shops.forEach(shop => {
        const placemark = new ymaps.Placemark(shop.coordinates, {
            balloonContent: `
                <div class="map-balloon">
                    <h3>${shop.name}</h3>
                    <p><i class="fas fa-map-marker-alt"></i> ${shop.address}</p>
                    <p><i class="fas fa-phone"></i> ${shop.phone}</p>
                    <p><i class="fas fa-clock"></i> ${shop.hours}</p>
                </div>
            `
        }, {
            preset: 'islands#pinkDotIcon'
        });

        map.geoObjects.add(placemark);
    });

    // Добавляем элементы управления
    map.controls.add('zoomControl', {
        position: { right: 10, top: 10 }
    });
    map.controls.add('typeSelector', {
        position: { right: 10, top: 50 }
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем, загружен ли API Яндекс.Карт
    if (typeof ymaps !== 'undefined') {
        ymaps.ready(initMap);
    }

    // Обработка формы
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Форматирование телефона
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhoneNumber);
    }
});

// Обработка отправки формы
function handleFormSubmit(e) {
    e.preventDefault();

    // Получаем данные формы
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

    // Здесь будет отправка данных на сервер
    console.log('Отправка формы:', formData);
    
    // Показываем уведомление
    showNotification('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
    
    // Очищаем форму
    this.reset();
}

// Форматирование номера телефона
function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (value.length <= 3) {
            value = `+7 (${value}`;
        } else if (value.length <= 6) {
            value = `+7 (${value.slice(0, 3)}) ${value.slice(3)}`;
        } else if (value.length <= 8) {
            value = `+7 (${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
        } else {
            value = `+7 (${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 8)}-${value.slice(8, 10)}`;
        }
    }
    e.target.value = value;
}

// Функция для показа уведомлений
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Анимация появления элементов при скролле
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}); 
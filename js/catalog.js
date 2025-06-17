// Данные о товарах (в реальном проекте будут загружаться с сервера)
const products = [
    {
        id: 1,
        name: 'Букет из 25 роз',
        price: 3500,
        category: 'roses',
        image: 'images/bouquet1.jpg',
        description: 'Роскошный букет из 25 алых роз в упаковке'
    },
    {
        id: 2,
        name: 'Букет из тюльпанов',
        price: 2500,
        category: 'tulips',
        image: 'images/bouquet2.jpg',
        description: 'Яркий букет из 15 тюльпанов разных цветов'
    },
    {
        id: 3,
        name: 'Букет из пионов',
        price: 4000,
        category: 'peonies',
        image: 'images/bouquet3.jpg',
        description: 'Нежный букет из 5 крупных пионов'
    },
    {
        id: 4,
        name: 'Полевой букет',
        price: 2000,
        category: 'wildflowers',
        image: 'images/bouquet4.jpg',
        description: 'Романтичный букет из полевых цветов'
    }
];

// Функция для отображения товаров
function displayProducts(category = 'all') {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';

    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);

    filteredProducts.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-content">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">${product.price} ₽</p>
                    <p class="product-description">${product.description}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">В корзину</button>
                </div>
            </div>
        `;
        productsGrid.innerHTML += productCard;
    });
}

// Обработчик клика по категориям
document.querySelectorAll('.categories button').forEach(button => {
    button.addEventListener('click', (e) => {
        // Убираем активный класс у всех кнопок
        document.querySelectorAll('.categories button').forEach(btn => {
            btn.classList.remove('active');
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-secondary');
        });

        // Добавляем активный класс нажатой кнопке
        e.target.classList.add('active');
        e.target.classList.remove('btn-secondary');
        e.target.classList.add('btn-primary');

        // Отображаем товары выбранной категории
        displayProducts(e.target.dataset.category);
    });
});

// Инициализация каталога
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
}); 
// Данные товаров
const products = [
    {
        id: 1,
        name: "Органическое кокосовое масло",
        category: "Красота",
        price: 1290,
        image: "https://well-foods.ru/wp-content/uploads/2020/05/Coconut200.jpg",
        description: "100% натуральное масло холодного отжима"
    },
    {
        id: 2,
        name: "Натуральный горный мед",
        category: "Продукты",
        price: 890,
        image: "https://shop.lifeway.su/wa-data/public/shop/products/63/00/63/images/4282/4282.970.jpg",
        description: "Собранный в экологически чистых районах"
    },
    {
        id: 3,
        name: "Эко-средство для посуды",
        category: "Для дома",
        price: 450,
        image: "https://www.tdarsenal.ru/upload/iblock/ff1/ff10536076e669b896eebb44aec36ec7.jpg",
        description: "Биоразлагаемое средство"
    },
    {
        id: 4,
        name: "Набор эко-сумок",
        category: "Для дома",
        price: 990,
        image: "https://akvarel.com/storage/products/2025_04_11/products_other_524137_1_1744357559.8277.webp",
        description: "3 хлопковые сумки"
    }
];

// Корзина
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Обновление счетчика корзины
function updateCartCount() {
    const countElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    countElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Показать товары на главной странице
function displayFeaturedProducts() {
    const container = document.querySelector('.products');
    if (!container) return;
    
    container.innerHTML = '';
    
    products.slice(0, 4).forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price} ₽</p>
                <button class="add-to-cart" data-id="${product.id}">В корзину</button>
            </div>
        `;
        container.appendChild(productElement);
    });
    
    // Обработчики для кнопок добавления в корзину
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            addToCart(productId);
        });
    });
}

// Добавление товара в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    alert(`Товар "${product.name}" добавлен в корзину!`);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    displayFeaturedProducts();
});
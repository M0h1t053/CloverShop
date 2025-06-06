// Показать все товары на странице каталога
function displayAllProducts() {
    const container = document.querySelector('.products-page .products');
    if (!container) return;
    
    container.innerHTML = '';
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-category">${product.category}</p>
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

// Применение фильтров
function applyFilters() {
    const minPrice = parseInt(document.getElementById('min-price').value) || 0;
    const maxPrice = parseInt(document.getElementById('max-price').value) || 10000;
    
    const filteredProducts = products.filter(product => 
        product.price >= minPrice && 
        product.price <= maxPrice
    );
    
    const container = document.querySelector('.products-page .products');
    if (!container) return;
    
    container.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-category">${product.category}</p>
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

// Инициализация страницы каталога
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.products-page')) {
        displayAllProducts();
        
        document.getElementById('apply-filters').addEventListener('click', applyFilters);
    }
});
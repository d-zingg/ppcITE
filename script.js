// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.querySelectorAll('#current-year').forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            document.querySelector('nav').classList.toggle('active');
        });
    }

    // Filter toggle on mobile
    const filterToggleBtn = document.getElementById('filter-toggle');
    if (filterToggleBtn) {
        filterToggleBtn.addEventListener('click', function() {
            document.getElementById('filters-sidebar').classList.toggle('active');
        });
    }

    // Initialize products
    initializeProducts();

    // Initialize cart
    initializeCart();

    // Initialize product detail page
    if (window.location.pathname.includes('product-detail.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        if (productId) {
            loadProductDetail(productId);
        }
    }
});

// Sample product data
const products = [
    {
        id: 1,
        name: "Vitamin C 1000mg Tablets",
        category: "Vitamins & Supplements",
        price: 12.99,
        originalPrice: 15.99,
        discount: 20,
        rating: 4,
        reviewCount: 128,
        image: "https://placehold.co/400x400",
        description: "High-strength vitamin C tablets to support your immune system. Each tablet provides 1000mg of vitamin C, which contributes to the normal function of the immune system and helps reduce tiredness and fatigue.",
        features: [
            "1000mg of Vitamin C per tablet",
            "Supports immune system function",
            "Helps reduce tiredness and fatigue",
            "Contributes to normal collagen formation",
            "Increases iron absorption",
            "Protects cells from oxidative stress"
        ],
        usage: "Take one tablet daily with food. Do not exceed the recommended dose.",
        warnings: "Keep out of reach of children. Food supplements should not be used as a substitute for a varied diet. If you are pregnant, breastfeeding, taking any medications or under medical supervision, please consult a doctor or healthcare professional before use.",
        ingredients: "Vitamin C (as Ascorbic Acid), Bulking Agent (Microcrystalline Cellulose), Anti-Caking Agent (Magnesium Stearate).",
        stock: 50,
        sku: "VC-1000-120",
        brand: "VitaWell",
        images: [
            "https://placehold.co/400x400",
            "https://placehold.co/400x400",
            "https://placehold.co/400x400",
            "https://placehold.co/400x400"
        ]
    },
    {
        id: 2,
        name: "Digital Blood Pressure Monitor",
        category: "Medical Devices",
        price: 49.99,
        rating: 5,
        reviewCount: 84,
        image: "https://placehold.co/400x400",
        stock: 15,
        brand: "PharmaTech"
    },
    {
        id: 3,
        name: "Pain Relief Gel - Extra Strength",
        category: "Medications",
        price: 8.99,
        originalPrice: 10.99,
        discount: 15,
        rating: 4,
        reviewCount: 56,
        image: "https://placehold.co/400x400",
        stock: 30,
        brand: "MediCare"
    },
    {
        id: 4,
        name: "Moisturizing Hand Sanitizer",
        category: "Personal Care",
        price: 4.99,
        rating: 3,
        reviewCount: 42,
        image: "https://placehold.co/400x400",
        stock: 100,
        brand: "HealthPlus"
    },
    {
        id: 5,
        name: "Multivitamin Daily Tablets",
        category: "Vitamins & Supplements",
        price: 14.99,
        rating: 5,
        reviewCount: 112,
        image: "https://placehold.co/400x400",
        stock: 45,
        brand: "VitaWell"
    },
    {
        id: 6,
        name: "First Aid Kit - Complete",
        category: "First Aid",
        price: 24.99,
        originalPrice: 29.99,
        discount: 15,
        rating: 5,
        reviewCount: 73,
        image: "https://placehold.co/400x400",
        stock: 20,
        brand: "MediCare"
    },
    {
        id: 7,
        name: "Digital Thermometer",
        category: "Medical Devices",
        price: 12.99,
        rating: 4,
        reviewCount: 89,
        image: "https://placehold.co/400x400",
        stock: 35,
        brand: "PharmaTech"
    },
    {
        id: 8,
        name: "Allergy Relief Tablets",
        category: "Medications",
        price: 9.99,
        rating: 4,
        reviewCount: 64,
        image: "https://placehold.co/400x400",
        stock: 25,
        brand: "MediCare"
    },
    {
        id: 9,
        name: "Baby Diaper Rash Cream",
        category: "Baby Care",
        price: 7.99,
        rating: 5,
        reviewCount: 47,
        image: "https://placehold.co/400x400",
        stock: 40,
        brand: "NatureCare"
    }
];

// Initialize products on different pages
function initializeProducts() {
    // Featured products on homepage
    const featuredProductsGrid = document.getElementById('featured-products-grid');
    if (featuredProductsGrid) {
        const featuredProducts = products.slice(0, 4); // First 4 products
        featuredProducts.forEach(product => {
            featuredProductsGrid.appendChild(createProductCard(product));
        });
    }

    // All products on products page
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
        products.forEach(product => {
            productsGrid.appendChild(createProductCard(product));
        });
    }

    // Related products on product detail page
    const relatedProductsGrid = document.getElementById('related-products-grid');
    if (relatedProductsGrid) {
        const relatedProducts = products.filter(p => p.id !== parseInt(getProductIdFromUrl())).slice(0, 4);
        relatedProducts.forEach(product => {
            relatedProductsGrid.appendChild(createProductCard(product));
        });
    }

    // Product search functionality
    const productSearch = document.getElementById('product-search');
    if (productSearch) {
        productSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) || 
                product.category.toLowerCase().includes(searchTerm)
            );
            
            const productsGrid = document.getElementById('products-grid');
            productsGrid.innerHTML = '';
            
            if (filteredProducts.length === 0) {
                productsGrid.innerHTML = '<div class="no-results">No products found matching your search.</div>';
            } else {
                filteredProducts.forEach(product => {
                    productsGrid.appendChild(createProductCard(product));
                });
            }
        });
    }

    // Filter functionality
    const applyFiltersBtn = document.getElementById('apply-filters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            applyFilters();
        });
    }

    const resetFiltersBtn = document.getElementById('reset-filters');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            resetFilters();
        });
    }

    // Price range slider
    const priceRange = document.getElementById('price-range');
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            document.getElementById('price-value').textContent = `$${this.value}+`;
        });
    }
}

// Create product card HTML
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    let discountBadge = '';
    if (product.discount) {
        discountBadge = `<div class="discount-badge">${product.discount}% OFF</div>`;
    }
    
    let originalPrice = '';
    if (product.originalPrice) {
        originalPrice = `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>`;
    }
    
    const stars = generateStarRating(product.rating);
    
    card.innerHTML = `
        <a href="product-detail.html?id=${product.id}" class="product-image">
            <img src="${product.image}" alt="${product.name}">
            ${discountBadge}
        </a>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-rating">
                <div class="stars">${stars}</div>
                <span class="review-count">(${product.reviewCount})</span>
            </div>
            <div class="product-price">
                <div>
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${originalPrice}
                </div>
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i>
                </button>
            </div>
        </div>
    `;
    
    // Add event listener to add to cart button
    const addToCartBtn = card.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        addToCart(product.id);
    });
    
    return card;
}

// Generate star rating HTML
function generateStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Get product ID from URL
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Load product detail
function loadProductDetail(productId) {
    const product = products.find(p => p.id === parseInt(productId));
    
    if (!product) {
        document.getElementById('product-detail').innerHTML = '<div class="not-found">Product not found.</div>';
        return;
    }
    
    // Update breadcrumbs
    document.getElementById('category-link').textContent = product.category;
    document.getElementById('category-link').href = `products.html?category=${product.category.toLowerCase().replace(/\s+/g, '-')}`;
    document.getElementById('product-name').textContent = product.name;
    
    // Create product detail HTML
    const productDetail = document.getElementById('product-detail');
    
    const stars = generateStarRating(product.rating);
    
    let originalPrice = '';
    if (product.originalPrice) {
        originalPrice = `<span class="original-price-detail">$${product.originalPrice.toFixed(2)}</span>`;
    }
    
    let thumbnails = '';
    if (product.images) {
        product.images.forEach((img, index) => {
            thumbnails += `
                <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                    <img src="${img}" alt="${product.name} - Image ${index + 1}">
                </div>
            `;
        });
    }
    
    const stockStatus = product.stock > 0 
        ? `<div class="stock-indicator in-stock"></div><span>In Stock (${product.stock} available)</span>` 
        : `<div class="stock-indicator out-of-stock"></div><span>Out of Stock</span>`;
    
    productDetail.innerHTML = `
        <div class="product-detail-container">
            <div class="product-gallery">
                <div class="main-image">
                    <img src="${product.image}" alt="${product.name}" id="main-product-image">
                    ${product.discount ? `<div class="discount-badge">${product.discount}% OFF</div>` : ''}
                </div>
                <div class="thumbnail-container">
                    ${thumbnails}
                </div>
            </div>
            <div class="product-info-detail">
                <div class="product-meta">
                    <span>Brand: ${product.brand || 'N/A'}</span>
                    <span>•</span>
                    <span>SKU: ${product.sku || `SKU-${product.id}`}</span>
                </div>
                <h1>${product.name}</h1>
                <div class="product-rating-detail">
                    <div class="stars">${stars}</div>
                    <span class="review-count">(${product.reviewCount} reviews)</span>
                </div>
                <div class="product-price-detail">
                    <span class="current-price-detail">$${product.price.toFixed(2)}</span>
                    ${originalPrice}
                </div>
                <p class="product-description">${product.description || 'No description available.'}</p>
                <div class="stock-status">
                    ${stockStatus}
                </div>
                <div class="quantity-selector">
                    <button class="quantity-btn" id="decrease-quantity">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" class="quantity-input" value="1" min="1" max="${product.stock}" id="product-quantity">
                    <button class="quantity-btn" id="increase-quantity">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary add-to-cart-btn" id="add-to-cart-detail" ${product.stock <= 0 ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                    <button class="wishlist-btn">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
                <div class="product-benefits">
                    <div class="benefit-item">
                        <i class="fas fa-truck"></i>
                        <div>
                            <p class="benefit-title">Free shipping</p>
                            <p class="benefit-text">For orders over $50</p>
                        </div>
                    </div>
                    <div class="benefit-item">
                        <i class="fas fa-undo"></i>
                        <div>
                            <p class="benefit-title">Easy returns</p>
                            <p class="benefit-text">30 day return policy</p>
                        </div>
                    </div>
                    <div class="benefit-item">
                        <i class="fas fa-shield-alt"></i>
                        <div>
                            <p class="benefit-title">Secure payments</p>
                            <p class="benefit-text">Protected by encryption</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="product-tabs">
            <div class="tabs-header">
                <button class="tab-btn active" data-tab="description">Description</button>
                <button class="tab-btn" data-tab="features">Features</button>
                <button class="tab-btn" data-tab="usage">Usage & Warnings</button>
                <button class="tab-btn" data-tab="ingredients">Ingredients</button>
            </div>
            <div class="tab-content active" id="description-tab">
                <p>${product.description || 'No description available.'}</p>
            </div>
            <div class="tab-content" id="features-tab">
                ${product.features ? `<ul>${product.features.map(feature => `<li>${feature}</li>`).join('')}</ul>` : '<p>No features available.</p>'}
            </div>
            <div class="tab-content" id="usage-tab">
                <h3>Usage</h3>
                <p>${product.usage || 'No usage information available.'}</p>
                <h3>Warnings</h3>
                <p>${product.warnings || 'No warnings available.'}</p>
            </div>
            <div class="tab-content" id="ingredients-tab">
                <p>${product.ingredients || 'No ingredients information available.'}</p>
            </div>
        </div>
    `;
    
    // Add event listeners for product detail page
    
    // Quantity selector
    const quantityInput = document.getElementById('product-quantity');
    const decreaseBtn = document.getElementById('decrease-quantity');
    const increaseBtn = document.getElementById('increase-quantity');
    
    decreaseBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });
    
    increaseBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value < product.stock) {
            quantityInput.value = value + 1;
        }
    });
    
    // Add to cart button
    const addToCartBtn = document.getElementById('add-to-cart-detail');
    addToCartBtn.addEventListener('click', function() {
        const quantity = parseInt(document.getElementById('product-quantity').value);
        addToCart(product.id, quantity);
    });
    
    // Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            document.getElementById(`${this.dataset.tab}-tab`).classList.add('active');
        });
    });
    
    // Thumbnails
    const thumbnailElements = document.querySelectorAll('.thumbnail');
    thumbnailElements.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnailElements.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            const mainImage = document.getElementById('main-product-image');
            mainImage.src = product.images[this.dataset.index];
        });
    });
}

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function initializeCart() {
    updateCartCount();
    
    // Load cart page if on cart.html
    if (window.location.pathname.includes('cart.html')) {
        loadCartPage();
    }
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === parseInt(productId));
    
    if (!product) return;
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: quantity
        });
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show notification
    showNotification(`${product.name} added to cart!`);
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = cartCount;
    });
}

function loadCartPage() {
    const cartContainer = document.getElementById('cart-container');
    const cartCountText = document.getElementById('cart-count-text');
    
    if (!cartContainer) return;
    
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountText.textContent = `(${cartCount} items)`;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <a href="products.html" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        return;
    }
    
    // Calculate cart totals
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08; // 8% tax
    const discount = 0; // No discount by default
    const total = subtotal + shipping + tax - discount;
    
    cartContainer.innerHTML = `
        <div class="cart-items">
            ${cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-header">
                            <div>
                                <div class="cart-item-name">${item.name}</div>
                                <div class="cart-item-category">${item.category}</div>
                            </div>
                            <div class="cart-item-price">
                                <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
                                <div class="cart-item-unit-price">$${item.price.toFixed(2)} each</div>
                            </div>
                        </div>
                        <div class="cart-item-actions">
                            <div class="cart-quantity">
                                <button class="cart-quantity-btn decrease-cart-quantity" data-id="${item.id}">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <div class="cart-quantity-value">${item.quantity}</div>
                                <button class="cart-quantity-btn increase-cart-quantity" data-id="${item.id}">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                            <button class="remove-item" data-id="${item.id}">
                                <i class="fas fa-trash-alt"></i>
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
            <div class="cart-actions">
                <a href="products.html" class="btn btn-outline continue-shopping">
                    <i class="fas fa-shopping-bag"></i>
                    Continue Shopping
                </a>
                <button class="clear-cart">
                    <i class="fas fa-trash-alt"></i>
                    Clear Cart
                </button>
            </div>
        </div>
        <div class="order-summary">
            <h2>Order Summary</h2>
            <div class="summary-row">
                <span class="summary-label">Subtotal</span>
                <span class="summary-value">$${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span class="summary-label">Shipping</span>
                <span class="summary-value">${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span class="summary-label">Tax</span>
                <span class="summary-value">$${tax.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span class="summary-label">Discount</span>
                <span class="summary-value discount">-$${discount.toFixed(2)}</span>
            </div>
            <div class="summary-row summary-total">
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <div class="coupon-form">
                <input type="text" placeholder="Enter coupon code">
                <button class="btn btn-outline">Apply</button>
            </div>
            <button class="btn btn-primary checkout-btn">Proceed to Checkout</button>
            <div class="payment-methods">
                <h3>We Accept</h3>
                <div class="payment-icons">
                    <div class="payment-icon"></div>
                    <div class="payment-icon"></div>
                    <div class="payment-icon"></div>
                    <div class="payment-icon"></div>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners for cart actions
    
    // Decrease quantity
    document.querySelectorAll('.decrease-cart-quantity').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            updateCartItemQuantity(id, -1);
        });
    });
    
    // Increase quantity
    document.querySelectorAll('.increase-cart-quantity').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            updateCartItemQuantity(id, 1);
        });
    });
    
    // Remove item
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            removeCartItem(id);
        });
    });
    
    // Clear cart
    document.querySelector('.clear-cart').addEventListener('click', function() {
        clearCart();
    });
    
    // Checkout button
    document.querySelector('.checkout-btn').addEventListener('click', function() {
        alert('Checkout functionality would be implemented here.');
    });
}

function updateCartItemQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeCartItem(id);
    } else {
        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Reload cart page
        loadCartPage();
        
        // Update cart count
        updateCartCount();
    }
}

function removeCartItem(id) {
    cart = cart.filter(item => item.id !== id);
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Reload cart page
    loadCartPage();
    
    // Update cart count
    updateCartCount();
}

function clearCart() {
    cart = [];
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Reload cart page
    loadCartPage();
    
    // Update cart count
    updateCartCount();
}

// Filter functionality
function applyFilters() {
    const categoryFilters = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(el => el.value);
    const brandFilters = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(el => el.value);
    const ratingFilters = Array.from(document.querySelectorAll('input[name="rating"]:checked')).map(el => parseInt(el.value));
    const availabilityFilters = Array.from(document.querySelectorAll('input[name="availability"]:checked')).map(el => el.value);
    const maxPrice = parseInt(document.getElementById('price-range').value);
    
    let filteredProducts = [...products];
    
    // Apply category filters
    if (categoryFilters.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
            const category = product.category.toLowerCase().replace(/\s+/g, '-');
            return categoryFilters.includes(category);
        });
    }
    
    // Apply brand filters
    if (brandFilters.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
            const brand = product.brand.toLowerCase().replace(/\s+/g, '-');
            return brandFilters.includes(brand);
        });
    }
    
    // Apply rating filters
    if (ratingFilters.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
            return ratingFilters.some(rating => product.rating >= rating);
        });
    }
    
    // Apply availability filters
    if (availabilityFilters.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
            if (availabilityFilters.includes('in-stock')) {
                return product.stock > 0;
            } else if (availabilityFilters.includes('out-of-stock')) {
                return product.stock <= 0;
            }
            return true;
        });
    }
    
    // Apply price filter
    filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    
    // Update products grid
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<div class="no-results">No products found matching your filters.</div>';
    } else {
        filteredProducts.forEach(product => {
            productsGrid.appendChild(createProductCard(product));
        });
    }
    
    // Close mobile filters if open
    document.getElementById('filters-sidebar').classList.remove('active');
}

function resetFilters() {
    // Uncheck all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset price range
    const priceRange = document.getElementById('price-range');
    if (priceRange) {
        priceRange.value = 100;
        document.getElementById('price-value').textContent = '$100+';
    }
    
    // Show all products
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        productsGrid.appendChild(createProductCard(product));
    });
}

// Notification
function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    
    // Set message and show notification
    notification.textContent = message;
    notification.classList.add('show');
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #2e8b57;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s;
        z-index: 1000;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
`;
document.head.appendChild(style);
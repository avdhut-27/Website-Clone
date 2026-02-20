// Cart Management Functions using localStorage

// Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem('adidasCart');
    return cart ? JSON.parse(cart) : [];
}

//  localStorage
function saveCart(cart) {
    localStorage.setItem('adidasCart', JSON.stringify(cart));
}

// Add item
function addToCart(product) {
    let cart = getCart();
    
    // Check if product with same id and size already exists
    const existingIndex = cart.findIndex(item => 
        item.id === product.id && item.size === product.size
    );
    
    if (existingIndex > -1) {
        // Update quantity if product exists
        cart[existingIndex].quantity += product.quantity;
    } else {
        // Add new product
        cart.push(product);
    }
    
    saveCart(cart);
    return cart;
}

// Remove item from cart
function removeFromCart(productId, size) {
    let cart = getCart();
    cart = cart.filter(item => !(item.id === productId && item.size === size));
    saveCart(cart);
    return cart;
}

// Update item quantity in cart
function updateCartQuantity(productId, size, quantity) {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => 
        item.id === productId && item.size === size
    );
    
    if (itemIndex > -1) {
        if (quantity > 0) {
            cart[itemIndex].quantity = quantity;
        } else {
            cart.splice(itemIndex, 1);
        }
        saveCart(cart);
    }
    
    return cart;
}

// Get total cart value
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get total number of items in cart
function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// Clear entire cart
function clearCart() {
    localStorage.removeItem('adidasCart');
}

// Update cart count badge (call this on page load)
function updateCartCount() {
    const cartCount = getCartItemCount();
    const cartBadge = document.getElementById('cartCount');
    if (cartBadge) {
        cartBadge.textContent = cartCount;
        cartBadge.style.display = cartCount > 0 ? 'block' : 'none';
    }
}

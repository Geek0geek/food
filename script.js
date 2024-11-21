// Initialize cart and food items
let cart = {};
const foodItems = [
    { name: 'Blackbeard Burger', price: 2.5, image: 'food1.jpg' },
    { name: 'Shipwreck Sandwich', price: 3.0, image: 'food2.jpg' },
    { name: 'Plundered Pizza', price: 4.0, image: 'food3.jpg' },
    { name: 'Jolly Roger Fries', price: 1.5, image: 'food4.jpg' },
    { name: 'Buccaneer Burrito', price: 3.5, image: 'food5.jpg' },
    { name: 'Cannonball Nachos', price: 2.0, image: 'food6.jpg' },
    { name: 'Siren Salad', price: 2.5, image: 'food7.jpg' },
    { name: 'Skull & Crossbones Stew', price: 3.0, image: 'food8.jpg' },
    { name: 'High Tide Tacos', price: 2.5, image: 'food9.jpg' },
    { name: 'Davy Jones\' Chowder', price: 3.0, image: 'food10.jpg' },
    { name: 'Pirate\'s Punch', price: 1.5, image: 'food11.jpg' },
    { name: 'Mermaid Mojito', price: 2.0, image: 'food12.jpg' },
    { name: 'Captain\'s Cola', price: 1.5, image: 'food13.jpg' },
    { name: 'Treasure Island Tea', price: 2.0, image: 'food14.jpg' },
    { name: 'Seafarer\'s Smoothie', price: 2.5, image: 'food15.jpg' }
];

// Generate Food Items Dynamically
const menuContainer = document.querySelector('.menu-items');
foodItems.forEach((item, index) => {
    const foodElement = document.createElement('div');
    foodElement.classList.add('food-item');
    foodElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="food-image" />
        <h3>${item.name}</h3>
        <button onclick="addToCart(${index})">Add</button>
    `;
    menuContainer.appendChild(foodElement);
});

// Add food to cart
function addToCart(index) {
    const food = foodItems[index];
    if (!cart[food.name]) {
        cart[food.name] = { ...food, quantity: 0 };
    }
    cart[food.name].quantity += 1;
    updateCart();
}

// Update Cart Modal
function updateCart() {
    const cartDetails = document.getElementById('cart-details');
    cartDetails.innerHTML = '';
    Object.values(cart).forEach(item => {
        cartDetails.innerHTML += `
            <div class="cart-item">
                <p>${item.name} - Quantity: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>
                <button onclick="decreaseQuantity('${item.name}')">-</button>
                <span class="quantity">${item.quantity}</span>
                <button onclick="increaseQuantity('${item.name}')">+</button>
            </div>
        `;
    });
}

// Increase quantity of an item in cart
function increaseQuantity(itemName) {
    cart[itemName].quantity += 1;
    updateCart();
}

// Decrease quantity of an item in cart
function decreaseQuantity(itemName) {
    if (cart[itemName].quantity > 0) {
        cart[itemName].quantity -= 1;
        updateCart();
    }
}

// Show Cart Modal
document.getElementById('cart-button').addEventListener('click', () => {
    document.getElementById('cart-modal').classList.remove('hidden');
});

// Close Cart Modal
document.getElementById('close-cart').addEventListener('click', () => {
    document.getElementById('cart-modal').classList.add('hidden');
});

// Handle Order Now Button
document.getElementById('order-now').addEventListener('click', () => {
    if (Object.keys(cart).length === 0) {
        alert('Please select at least one item to proceed!');
        return;
    }
    document.getElementById('payment-section').classList.remove('hidden');
});

// Payment Handling
document.getElementById('confirm-order').addEventListener('click', () => {
    const paymentMethod = document.getElementById('payment-method').value;

    // Simulate Card Processing Time
    if (paymentMethod === 'card') {
        const processingTime = Math.floor(Math.random() * 10) + 1;
        setTimeout(() => {
            alert('Payment Successful!');
            generateReceipt(paymentMethod);
            document.getElementById('payment-section').classList.add('hidden');
        }, processingTime * 1000); // Random delay between 1 and 10 seconds
    } else {
        alert('Payment Successful!');
        generateReceipt(paymentMethod);
        document.getElementById('payment-section').classList.add('hidden');
    }
});

// Generate Receipt
function generateReceipt(paymentMethod) {
    const receiptDetails = document.getElementById('receipt-details');
    let subtotal = 0;
    let receiptHTML = `
        <p>Here's your receipt:</p>
        <p>-------------------------------------</p>
        <p>Item    Quantity    Price</p>
    `;
    
    Object.values(cart).forEach(item => {
        receiptHTML += `<p>${item.name}    ${item.quantity}           $${(item.price * item.quantity).toFixed(2)}</p>`;
        subtotal += item.price * item.quantity;
    });

    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    receiptHTML += `
        <p>-------------------------------------</p>
        <p>Payment method: ${paymentMethod}</p>
        <p>Subtotal    $${subtotal.toFixed(2)}</p>
        <p>Tax (10%)   $${tax.toFixed(2)}</p>
        <p>Total       $${total.toFixed(2)}</p>
        <p>-------------------------------------</p>
    `;

    receiptDetails.innerHTML = receiptHTML;
    document.getElementById('receipt-section').classList.remove('hidden');
}

// Close Receipt Modal
document.getElementById('close-receipt').addEventListener('click', () => {
    document.getElementById('receipt-section').classList.add('hidden');
});

import { Navbar } from '../components/Navbar.js';
import { Footer } from '../components/Footer.js';

export const renderCart = () => {
    const app = document.querySelector('#app');
    app.innerHTML = `
        ${Navbar()}
        <div class="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-4xl font-bold mb-8">Shopping Cart</h1>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="md:col-span-2" id="cart-items">
                    <div class="animate-pulse space-y-4">
                        <div class="h-24 bg-gray-800 rounded"></div>
                        <div class="h-24 bg-gray-800 rounded"></div>
                    </div>
                </div>
                <div>
                    <div class="glass-panel p-6 sticky top-24">
                        <h2 class="text-xl font-bold mb-4">Order Summary</h2>
                        <div class="flex justify-between mb-2 text-gray-400">
                            <span>Subtotal</span>
                            <span id="subtotal">$0.00</span>
                        </div>
                        <div class="flex justify-between mb-4 text-gray-400">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div class="border-t border-white/10 pt-4 flex justify-between mb-6">
                            <span class="text-lg font-bold">Total</span>
                            <span class="text-lg font-bold text-accent" id="total">$0.00</span>
                        </div>
                        <button id="checkout-btn" class="w-full bg-accent text-primary font-bold py-3 rounded-full hover:bg-white transition-colors">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
        ${Footer()}
    `;

    fetchCart();

    document.getElementById('checkout-btn').addEventListener('click', () => {
        alert('Proceeding to Razorpay Payment (Mock)...');
        // Implement Order Creation API call here
    });
};

const fetchCart = async () => {
    try {
        // Mock data if backend is empty or auth not fully linked in frontend yet
        // In real scenario: const res = await fetch('http://localhost:5000/api/cart', { headers: { Authorization: `Bearer ${token}` } });

        // Simulating data for preview
        const cartItems = [
            { id: 1, product: { name: 'Premium Skin - Matte Black', price: 15.99, image: 'https://placehold.co/100' }, quantity: 1 },
            { id: 2, product: { name: 'Tempered Glass', price: 9.99, image: 'https://placehold.co/100' }, quantity: 2 }
        ];

        renderCartItems(cartItems);

    } catch (error) {
        console.error('Error fetching cart:', error);
        document.getElementById('cart-items').innerHTML = '<p class="text-red-500">Failed to load cart.</p>';
    }
};

const renderCartItems = (items) => {
    const container = document.getElementById('cart-items');

    if (items.length === 0) {
        container.innerHTML = '<p class="text-gray-400">Your cart is empty.</p>';
        return;
    }

    container.innerHTML = items.map(item => `
        <div class="glass-panel p-4 mb-4 flex gap-4 items-center">
            <img src="${item.product.image}" class="w-20 h-20 object-cover rounded bg-gray-700">
            <div class="flex-1">
                <h3 class="font-bold text-lg">${item.product.name}</h3>
                <p class="text-accent font-bold">$${item.product.price}</p>
            </div>
            <div class="flex items-center gap-3">
                <button class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20">-</button>
                <span>${item.quantity}</span>
                <button class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20">+</button>
            </div>
            <button class="text-red-400 hover:text-red-300 ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    `).join('');

    // Update totals
    const subtotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `$${subtotal.toFixed(2)}`;
};

import { Navbar } from '../components/Navbar.js';
import { Footer } from '../components/Footer.js';

export const renderDashboard = () => {
    const app = document.querySelector('#app');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        window.location.href = '/login.html';
        return;
    }

    app.innerHTML = `
        ${Navbar()}
        <div class="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-4xl font-bold mb-8">My Dashboard</h1>
            <div class="glass-panel p-8 mb-8">
                <h2 class="text-2xl font-bold mb-4">Welcome, ${user.name}!</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 class="text-xl font-bold mb-2">Account Details</h3>
                        <p class="text-gray-400">Email: ${user.email}</p>
                        <p class="text-gray-400">Member since: ${new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
                        <button id="logout-btn" class="mt-4 px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            
            <h2 class="text-2xl font-bold mb-4">Order History</h2>
            <div id="orders-list" class="space-y-4">
                <div class="animate-pulse h-20 bg-gray-800 rounded"></div>
            </div>
        </div>
        ${Footer()}
    `;

    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    });

    fetchOrders();
};

const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:5000/api/orders', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const orders = await response.json();

        const container = document.getElementById('orders-list');
        if (orders.length === 0) {
            container.innerHTML = '<p class="text-gray-400">No orders found.</p>';
            return;
        }

        container.innerHTML = orders.map(order => `
            <div class="glass-panel p-4 flex justify-between items-center">
                <div>
                    <p class="font-bold">Order #${order.id}</p>
                    <p class="text-sm text-gray-400 text-sm">Status: <span class="capitalize text-accent">${order.status}</span></p>
                </div>
                 <div>
                    <p class="font-bold text-accent">$${order.total}</p>
                    <p class="text-sm text-gray-400">${new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error(error);
        document.getElementById('orders-list').innerHTML = '<p class="text-red-500">Failed to load orders.</p>';
    }
};

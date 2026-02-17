import { Navbar } from '../components/Navbar.js';
import { Footer } from '../components/Footer.js';

export const renderAdmin = () => {
    const app = document.querySelector('#app');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || user.role !== 'admin') {
        app.innerHTML = '<h1 class="text-center text-red-500 mt-20">Access Denied</h1>';
        return;
    }

    app.innerHTML = `
        ${Navbar()}
        <div class="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-4xl font-bold mb-8">Admin Panel</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="glass-panel p-6">
                    <h2 class="text-xl font-bold mb-4">Add New Product</h2>
                    <form id="add-product-form" class="space-y-4">
                        <input type="text" id="p-name" placeholder="Product Name" class="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white">
                        <textarea id="p-desc" placeholder="Description" class="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white"></textarea>
                        <input type="number" id="p-price" placeholder="Price" class="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white">
                        <input type="text" id="p-image" placeholder="Image URL (Cloudinary)" class="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white">
                        <button type="submit" class="bg-accent text-primary font-bold px-6 py-2 rounded hover:bg-white transition-colors">Add Product</button>
                    </form>
                </div>
                <div class="glass-panel p-6">
                    <h2 class="text-xl font-bold mb-4">Recent Orders</h2>
                    <div id="admin-orders-list">Loading...</div>
                </div>
            </div>
        </div>
        ${Footer()}
    `;

    // Implement fetch logic for admin orders and product submission...
};

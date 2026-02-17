import { Navbar } from '../components/Navbar.js';
import { Footer } from '../components/Footer.js';

export const renderShop = () => {
    const app = document.querySelector('#app');
    app.innerHTML = `
    ${Navbar()}
    <div class="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold mb-8">Shop All Products</h1>
        <div id="product-grid" class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <!-- Products will be loaded here -->
            <div class="col-span-4 text-center text-gray-400">Loading products...</div>
        </div>
    </div>
    ${Footer()}
  `;

    fetchProducts();
};

const fetchProducts = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/products');
        const products = await response.json();

        const grid = document.getElementById('product-grid');

        if (products.length === 0) {
            grid.innerHTML = '<div class="col-span-4 text-center text-gray-400">No products found.</div>';
            return;
        }

        grid.innerHTML = products.map(product => `
            <div class="glass-panel p-4 hover:border-accent/50 transition-all group">
                <div class="h-64 bg-gray-800 rounded-lg mb-4 overflow-hidden relative">
                    <img src="${product.textureUrl || 'https://placehold.co/400x400/1e293b/white?text=Product'}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    <button onclick="window.location.href='/product.html?id=${product.id}'" class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                        View
                    </button>
                </div>
                <h3 class="text-lg font-bold mb-1">${product.name}</h3>
                <p class="text-gray-400 text-sm mb-3 line-clamp-2">${product.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-xl font-bold text-accent">$${product.price}</span>
                    <button class="text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded">Add to Cart</button>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error fetching products:', error);
        document.getElementById('product-grid').innerHTML = '<div class="col-span-4 text-center text-red-500">Failed to load products. Ensure backend is running.</div>';
    }
};

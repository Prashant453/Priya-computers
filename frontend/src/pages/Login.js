import { Navbar } from '../components/Navbar.js';
import { Footer } from '../components/Footer.js';
import { API_URL } from '../config.js';

export const renderLogin = () => {
    const app = document.querySelector('#app');
    app.innerHTML = `
        ${Navbar()}
        <div class="min-h-screen pt-24 pb-12 flex items-center justify-center px-4">
            <div class="glass-panel p-8 w-full max-w-md">
                <h2 class="text-3xl font-bold mb-6 text-center">Login</h2>
                <form id="login-form" class="space-y-4">
                    <div>
                        <label class="block text-gray-400 mb-2">Email</label>
                        <input type="email" id="email" required class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent">
                    </div>
                     <div>
                        <label class="block text-gray-400 mb-2">Password</label>
                        <input type="password" id="password" required class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent">
                    </div>
                    <button type="submit" class="w-full bg-accent text-primary font-bold py-3 rounded-lg hover:bg-white transition-colors">
                        Login
                    </button>
                    <div id="error-msg" class="text-red-500 text-center text-sm hidden"></div>
                    <p class="text-center text-gray-400 mt-4">
                        Don't have an account? <a href="/register.html" class="text-accent hover:underline">Register</a>
                    </p>
                </form>
            </div>
        </div>
        ${Footer()}
    `;

    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMsg = document.getElementById('error-msg');

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = '/dashboard.html';
            } else {
                errorMsg.textContent = data.message || 'Login failed';
                errorMsg.classList.remove('hidden');
            }
        } catch (error) {
            errorMsg.textContent = 'Server error';
            errorMsg.classList.remove('hidden');
        }
    });
};

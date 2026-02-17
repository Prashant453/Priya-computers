import './style.css'
import { renderHome } from './src/pages/Home.js';
import { renderShop } from './src/pages/Shop.js';
import { renderProduct } from './src/pages/Product.js';
import { renderCustomize } from './src/pages/Customize.js';
import { renderCart } from './src/pages/Cart.js';
import { renderLogin } from './src/pages/Login.js';
import { renderRegister } from './src/pages/Register.js';

const app = document.querySelector('#app');

const routes = {
  '/': renderHome,
  '/index.html': renderHome,
  '/shop.html': renderShop,
  '/product.html': renderProduct,
  '/customize.html': renderCustomize,
  '/cart.html': renderCart,
  '/login.html': renderLogin,
  '/register.html': renderRegister,
  '/dashboard.html': () => { app.innerHTML = '<h1 class="text-center text-3xl mt-20">Dashboard Mock - Logged In!</h1>' },
  '/admin.html': () => { app.innerHTML = '<h1 class="text-center text-3xl mt-20">Admin Panel Mock</h1>' },
  '/contact.html': () => { app.innerHTML = '<h1 class="text-center text-3xl mt-20">Contact Us Mock</h1>' },
};

const router = () => {
  const path = window.location.pathname;
  const render = routes[path] || renderHome;
  render();
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  router();

  document.body.addEventListener('click', e => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      history.pushState(null, null, e.target.href);
      router();
    }
  });
});

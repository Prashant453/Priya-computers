import * as THREE from 'three';
import { Navbar } from '../components/Navbar.js';
import { Footer } from '../components/Footer.js';

export const renderHome = () => {
    const app = document.querySelector('#app');
    app.innerHTML = `
    ${Navbar()}
    <div class="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div class="absolute inset-0 z-0" id="hero-canvas"></div>
        <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 class="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-accent to-purple-500 animate-fade-in-up">
                Priya Computers
            </h1>
            <p class="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-up delay-100">
                Premium Skins & Accessories for Your Digital Life
            </p>
            <div class="flex flex-col md:flex-row gap-4 justify-center animate-fade-in-up delay-200">
                <a href="/shop.html" class="px-8 py-3 bg-accent text-primary font-bold rounded-full hover:bg-white transition-all transform hover:scale-105">
                    Shop Now
                </a>
                <a href="/customize.html" class="px-8 py-3 glass-panel text-white font-bold rounded-full hover:bg-white/10 transition-all transform hover:scale-105">
                    Create Your Skin
                </a>
            </div>
        </div>
    </div>
    
    <div class="py-20 max-w-7xl mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-12">Featured Collections</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="glass-panel p-6 hover:border-accent/50 transition-colors group">
                <div class="h-48 bg-gray-800 rounded-lg mb-4 overflow-hidden relative">
                     <img src="https://placehold.co/400x300/1e293b/white?text=Mobile+Skins" alt="Mobile Skins" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                </div>
                <h3 class="text-xl font-bold mb-2">Premium Skins</h3>
                <p class="text-gray-400">Custom textured skins for every device.</p>
            </div>
             <div class="glass-panel p-6 hover:border-accent/50 transition-colors group">
                <div class="h-48 bg-gray-800 rounded-lg mb-4 overflow-hidden relative">
                     <img src="https://placehold.co/400x300/1e293b/white?text=Glass+Guard" alt="Tempered Glass" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                </div>
                <h3 class="text-xl font-bold mb-2">Tempered Glass</h3>
                <p class="text-gray-400">Ultimate protection for your screen.</p>
            </div>
             <div class="glass-panel p-6 hover:border-accent/50 transition-colors group">
                <div class="h-48 bg-gray-800 rounded-lg mb-4 overflow-hidden relative">
                     <img src="https://placehold.co/400x300/1e293b/white?text=Accessories" alt="Accessories" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                </div>
                <h3 class="text-xl font-bold mb-2">Accessories</h3>
                <p class="text-gray-400">Cables, chargers, and more.</p>
            </div>
        </div>
    </div>
    ${Footer()}
  `;

    initHero3D();
};

const initHero3D = () => {
    const container = document.getElementById('hero-canvas');
    if (!container) return;

    const scene = new THREE.Scene();

    // Fog for depth
    scene.fog = new THREE.FogExp2(0x0F172A, 0.02);

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Floating Particles/Abstract Shapes
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshNormalMaterial({ wireframe: true });

    const shapes = [];
    for (let i = 0; i < 20; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15
        );
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        scene.add(mesh);
        shapes.push({ mesh, speed: Math.random() * 0.01 + 0.005 });
    }

    camera.position.z = 8;

    function animate() {
        requestAnimationFrame(animate);
        shapes.forEach(item => {
            item.mesh.rotation.x += item.speed;
            item.mesh.rotation.y += item.speed;
            // Gentle float effect
            item.mesh.position.y += Math.sin(Date.now() * 0.001 * item.speed * 100) * 0.01;
        });
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
};

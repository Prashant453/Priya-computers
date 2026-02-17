import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Navbar } from '../components/Navbar.js';
import { Footer } from '../components/Footer.js';
import { API_URL } from '../config.js';

export const renderProduct = () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    const app = document.querySelector('#app');
    app.innerHTML = `
        ${Navbar()}
        <div class="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div class="h-[500px] glass-panel relative" id="product-canvas">
                    <!-- 3D Viewer -->
                </div>
                <div>
                    <div id="product-details">
                        <div class="h-8 w-32 bg-gray-700 rounded animate-pulse mb-4"></div>
                        <div class="h-4 w-64 bg-gray-700 rounded animate-pulse mb-8"></div>
                    </div>
                </div>
            </div>
        </div>
        ${Footer()}
    `;

    if (productId) {
        fetchProductDetails(productId);
    }
};

const fetchProductDetails = async (id) => {
    try {
        const response = await fetch(`${API_URL}/products/${id}`);
        const product = await response.json();

        document.getElementById('product-details').innerHTML = `
            <h1 class="text-4xl font-bold mb-4">${product.name}</h1>
            <p class="text-2xl text-accent font-bold mb-6">$${product.price}</p>
            <p class="text-gray-300 mb-8 leading-relaxed">${product.description}</p>
            
            <div class="flex gap-4 mb-8">
                <button class="flex-1 bg-accent text-primary font-bold py-3 rounded-lg hover:bg-white transition-colors">
                    Add to Cart
                </button>
                <button class="flex-1 border border-white/20 font-bold py-3 rounded-lg hover:bg-white/5 transition-colors">
                    Customize Skin
                </button>
            </div>
            
            <div class="p-4 glass-panel rounded-lg">
                <h4 class="font-bold mb-2">Product Features</h4>
                <ul class="list-disc list-inside text-gray-400 space-y-1">
                    <li>High quality material</li>
                    <li>Precision cut</li>
                    <li>Easy to apply</li>
                </ul>
            </div>
        `;

        initProduct3D(product.textureUrl);

    } catch (error) {
        console.error('Error:', error);
    }
};

const initProduct3D = (textureUrl) => {
    const container = document.getElementById('product-canvas');
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null; // Transparent

    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Placeholder Geometry (Phone)
    const geometry = new THREE.BoxGeometry(1.5, 3, 0.2);
    const material = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.5, roughness: 0.1 });

    // Load Texture if available
    if (textureUrl) {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(textureUrl, (texture) => {
            material.map = texture;
            material.needsUpdate = true;
        });
    }

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
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

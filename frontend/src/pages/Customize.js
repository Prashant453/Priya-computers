import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Navbar } from '../components/Navbar.js';
import { Footer } from '../components/Footer.js';
import { API_URL } from '../config.js';

let scene, camera, renderer, cube, material;

export const renderCustomize = () => {
    const app = document.querySelector('#app');
    app.innerHTML = `
    ${Navbar()}
    <div class="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold mb-8 text-center">Customize Your Skin</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div class="h-[500px] glass-panel relative" id="customize-canvas">
                <!-- 3D Viewer -->
            </div>
            <div class="glass-panel p-8">
                <h2 class="text-2xl font-bold mb-6">Upload Your Design</h2>
                <div class="mb-6">
                    <label class="block text-gray-400 mb-2">Choose Image</label>
                    <input type="file" id="skin-upload" accept="image/*" class="block w-full text-sm text-gray-400
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-accent file:text-primary
                        hover:file:bg-white
                    "/>
                </div>
                <div id="upload-preview" class="mb-6 hidden">
                    <p class="text-sm text-gray-400 mb-2">Preview</p>
                    <img id="preview-img" src="" class="w-full h-48 object-cover rounded-lg border border-white/20">
                </div>
                <button id="save-design-btn" class="w-full bg-accent text-primary font-bold py-3 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    Save Design & Add to Cart
                </button>
                <div id="upload-status" class="mt-4 text-center text-sm"></div>
            </div>
        </div>
    </div>
    ${Footer()}
  `;

    initCustomize3D();
    setupEventListeners();
};

const setupEventListeners = () => {
    const fileInput = document.getElementById('skin-upload');
    const previewImg = document.getElementById('preview-img');
    const previewContainer = document.getElementById('upload-preview');
    const saveBtn = document.getElementById('save-design-btn');
    const statusDiv = document.getElementById('upload-status');

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target.result;
                previewImg.src = imageUrl;
                previewContainer.classList.remove('hidden');

                // Apply to 3D model
                const textureLoader = new THREE.TextureLoader();
                textureLoader.load(imageUrl, (texture) => {
                    material.map = texture;
                    material.needsUpdate = true;
                });
            };
            reader.readAsDataURL(file);
        }
    });

    saveBtn.addEventListener('click', async () => {
        const file = fileInput.files[0];
        if (!file) {
            statusDiv.textContent = 'Please select an image first.';
            statusDiv.className = 'mt-4 text-center text-sm text-red-500';
            return;
        }

        statusDiv.textContent = 'Uploading...';
        statusDiv.className = 'mt-4 text-center text-sm text-yellow-500';
        saveBtn.disabled = true;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                statusDiv.textContent = 'Design saved! Added to cart.';
                statusDiv.className = 'mt-4 text-center text-sm text-green-500';

                // Add to cart logic here (mock)
                console.log('Uploaded image URL:', data.url);
                // Redirect or update cart count
            } else {
                throw new Error(data.message || 'Upload failed');
            }

        } catch (error) {
            console.error(error);
            statusDiv.textContent = 'Error uploading design.';
            statusDiv.className = 'mt-4 text-center text-sm text-red-500';
        } finally {
            saveBtn.disabled = false;
        }
    });
};

const initCustomize3D = () => {
    const container = document.getElementById('customize-canvas');
    if (!container) return;

    scene = new THREE.Scene();
    scene.background = null;

    camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(2, 2, 5);
    scene.add(directionalLight);

    // Phone Geometry
    const geometry = new THREE.BoxGeometry(1.5, 3, 0.1);
    material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
    cube = new THREE.Mesh(geometry, material);
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

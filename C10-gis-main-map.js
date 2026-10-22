/* ============================================================
   C10-gis-main-map.js | کره زمین سه‌بعدی زنده و برداری GIS
   ============================================================ */

const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
document.head.appendChild(script);

script.onload = () => {
    initGlobe();
};

function initGlobe() {
    const container = document.getElementById('gis-globe-root');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(70, 36, 36);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00d2ff,
        wireframe: true,
        transparent: true,
        opacity: 0.25
    });
    const globe = new THREE.Mesh(geometry, wireframeMaterial);
    scene.add(globe);

    const coreGeometry = new THREE.SphereGeometry(68, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
        color: 0x051020,
        transparent: true,
        opacity: 0.8
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    const activeLocations = [
        { lat: 35.6892, lng: 51.3890 },   // تهران
        { lat: 41.9028, lng: 12.4964 },   // رم
        { lat: 38.8951, lng: -77.0364 }   // بالتیمور
    ];

    const pointsGroup = new THREE.Group();
    activeLocations.forEach(loc => {
        const phi = (90 - loc.lat) * (Math.PI / 180);
        const theta = (loc.lng + 180) * (Math.PI / 180);
        const r = 71;

        const x = -(r * Math.sin(phi) * Math.cos(theta));
        const z = (r * Math.sin(phi) * Math.sin(theta));
        const y = (r * Math.cos(phi));

        const pGeo = new THREE.SphereGeometry(2, 16, 16);
        const pMat = new THREE.MeshBasicMaterial({ color: 0xd4af37 });
        const pointMesh = new THREE.Mesh(pGeo, pMat);
        pointMesh.position.set(x, y, z);
        pointsGroup.add(pointMesh);
    });
    globe.add(pointsGroup);

    function animate() {
        requestAnimationFrame(animate);
        globe.rotation.y += 0.003;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

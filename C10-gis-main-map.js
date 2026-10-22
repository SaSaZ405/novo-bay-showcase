/* ============================================================
   C10-gis-main-map.js | کره زمین نقطه‌چین نورانی و خطوط مداری (بدون نیاز به فایل خارجی)
   ============================================================ */

const scriptTag = document.createElement('script');
scriptTag.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
document.head.appendChild(scriptTag);

scriptTag.onload = () => {
    createDotMatrixGlobe();
};

function createDotMatrixGlobe() {
    const container = document.getElementById('gis-globe-root');
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 210;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 3. Inner Dark Core (هسته تیره مرکزی)
    const coreGeo = new THREE.SphereGeometry(60, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x02050b });
    globeGroup.add(new THREE.Mesh(coreGeo, coreMat));

    // 4. Procedural Dot-Matrix Globe (نقاط نورانی تشکیل‌دهنده قاره‌ها و سطح زمین)
    const particlesCount = 3500;
    const posArray = new Float32Array(particlesCount * 3);
    const radius = 62;

    for (let i = 0; i < particlesCount; i++) {
        const phi = Math.acos(-1 + (2 * i) / particlesCount);
        const theta = Math.sqrt(particlesCount * Math.PI) * phi;

        // توزیع فرم کروی به همراه برجستگی‌های شبیه خشکی
        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);

        posArray[i * 3] = x;
        posArray[i * 3 + 1] = y;
        posArray[i * 3 + 2] = z;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMat = new THREE.PointsMaterial({
        size: 1.2,
        color: 0x00e5ff, // رنگ فیروزه‌ای نورانی
        transparent: true,
        opacity: 0.85
    });

    const dotGlobe = new THREE.Points(particlesGeo, particlesMat);
    globeGroup.add(dotGlobe);

    // 5. Latitude & Longitude Meridian Rings (خطوط مداری و استوا)
    const ringMat = new THREE.LineBasicMaterial({
        color: 0x00a8ff,
        transparent: true,
        opacity: 0.3
    });

    for (let i = 0; i < 3; i++) {
        const ringGeo = new THREE.RingGeometry(62.2, 62.5, 64);
        const ring = new THREE.Line(ringGeo, ringMat);
        if (i === 1) ring.rotation.x = Math.PI / 3;
        if (i === 2) ring.rotation.y = Math.PI / 3;
        globeGroup.add(ring);
    }

    // 6. Glowing Active Pulse Points (نقاط طلایی اکتیو کشورها)
    const activeLocations = [
        { lat: 35.6, lng: 51.3 },  // ایران
        { lat: 41.9, lng: 12.4 },  // ایتالیا
        { lat: 39.9, lng: 116.4 }, // چین
        { lat: 38.8, lng: -77.0 }, // آمریکا
        { lat: 25.2, lng: 55.2 }   // امارات
    ];

    const pointsGroup = new THREE.Group();
    activeLocations.forEach(loc => {
        const phi = (90 - loc.lat) * (Math.PI / 180);
        const theta = (loc.lng + 180) * (Math.PI / 180);
        const r = 63;

        const x = -(r * Math.sin(phi) * Math.cos(theta));
        const z = (r * Math.sin(phi) * Math.sin(theta));
        const y = (r * Math.cos(phi));

        const pGeo = new THREE.SphereGeometry(2, 16, 16);
        const pMat = new THREE.MeshBasicMaterial({ color: 0xffd700 }); // طلایی درخشان
        const pMesh = new THREE.Mesh(pGeo, pMat);
        pMesh.position.set(x, y, z);
        pointsGroup.add(pMesh);
    });
    globeGroup.add(pointsGroup);

    // 7. Atmospheric Outer Glow (هاله نوری دور کره)
    const glowGeo = new THREE.SphereGeometry(66, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
        color: 0x00d2ff,
        transparent: true,
        opacity: 0.12,
        side: THREE.BackSide
    });
    globeGroup.add(new THREE.Mesh(glowGeo, glowMat));

    // 8. Animation Loop (چرخش روان)
    function animate() {
        requestAnimationFrame(animate);
        globeGroup.rotation.y += 0.0025;
        renderer.render(scene, camera);
    }
    animate();

    // Responsive Resize
    window.addEventListener('resize', () => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });
}

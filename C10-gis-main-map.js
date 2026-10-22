/* ============================================================
   C10-gis-main-map.js | کره زمین سینمایی GIS با نقشه قاره‌ها
   ============================================================ */

// لود کتابخانه‌های مورد نیاز Three.js
const s1 = document.createElement('script');
s1.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
document.head.appendChild(s1);

s1.onload = () => {
    initGlowingGlobe();
};

function initGlowingGlobe() {
    const container = document.getElementById('gis-globe-root');
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 220;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 3. Inner Dark Sphere (بدنه تیره مرکزی کره)
    const sphereGeo = new THREE.SphereGeometry(65, 64, 64);
    const sphereMat = new THREE.MeshBasicMaterial({
        color: 0x040a14,
        transparent: true,
        opacity: 0.9
    });
    const innerSphere = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(innerSphere);

    // 4. Outer Atmosphere Glow (هاله نورانی دور کره)
    const glowGeo = new THREE.SphereGeometry(68, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
        color: 0x00d2ff,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(glowGeo, glowMat);
    globeGroup.add(atmosphere);

    // 5. World Map Canvas Texture (رسم نقشه قاره‌ها و خطوط استوا)
    const mapCanvas = document.createElement('canvas');
    mapCanvas.width = 1024;
    mapCanvas.height = 512;
    const ctx = mapCanvas.getContext('2d');

    // تصویر نقشه جهان با نقاط نورانی
    const worldImg = new Image();
    worldImg.crossOrigin = "Anonymous";
    // نقشه شفاف خشکی‌های جهان
    worldImg.src = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson';

    // ساخت بافت متنی با نقشه زمین
    const texture = new THREE.CanvasTexture(mapCanvas);
    const mapGeo = new THREE.SphereGeometry(65.5, 64, 64);
    const mapMat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
    });
    const mapMesh = new THREE.Mesh(mapGeo, mapMat);
    globeGroup.add(mapMesh);

    // رسم قاره‌ها به صورت خطوط فیروزه‌ای و نورانی روی لایه‌بندی
    const imgLoader = new Image();
    imgLoader.crossOrigin = "Anonymous";
    imgLoader.src = "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg";
    imgLoader.onload = () => {
        ctx.drawImage(imgLoader, 0, 0, 1024, 512);
        const imgData = ctx.getImageData(0, 0, 1024, 512);
        
        // تبدیل نقشه به حالت سایه-روشن و خطوط فیروزه‌ای
        ctx.fillStyle = "#030812";
        ctx.fillRect(0, 0, 1024, 512);
        
        for (let y = 0; y < 512; y += 4) {
            for (let x = 0; x < 1024; x += 4) {
                const i = (y * 1024 + x) * 4;
                const brightness = (imgData.data[i] + imgData.data[i+1] + imgData.data[i+2]) / 3;
                if (brightness > 40) {
                    ctx.fillStyle = brightness > 120 ? '#00e5ff' : '#005580';
                    ctx.fillRect(x, y, 2.5, 2.5);
                }
            }
        }
        
        // رسم خطوط مداری و استوا
        ctx.strokeStyle = "rgba(212, 175, 55, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 256); ctx.lineTo(1024, 256); // خط استوا
        ctx.stroke();

        texture.needsUpdate = true;
    };

    // 6. Active Nodes & Connecting Arcs (نقاط درخشان طلایی و کمان‌های متصل)
    const pointsGroup = new THREE.Group();
    const coords = [
        { lat: 35.6, lng: 51.3 },  // ایران
        { lat: 41.9, lng: 12.4 },  // ایتالیا
        { lat: 39.9, lng: 116.4 }, // چین
        { lat: 38.8, lng: -77.0 }, // آمریکا
        { lat: 25.2, lng: 55.2 }   // امارات
    ];

    coords.forEach(c => {
        const phi = (90 - c.lat) * (Math.PI / 180);
        const theta = (c.lng + 180) * (Math.PI / 180);
        const r = 66;

        const x = -(r * Math.sin(phi) * Math.cos(theta));
        const z = (r * Math.sin(phi) * Math.sin(theta));
        const y = (r * Math.cos(phi));

        // نقطه طلایی نورانی
        const pGeo = new THREE.SphereGeometry(1.5, 12, 12);
        const pMat = new THREE.MeshBasicMaterial({ color: 0xffd700 });
        const pMesh = new THREE.Mesh(pGeo, pMat);
        pMesh.position.set(x, y, z);
        pointsGroup.add(pMesh);
    });
    globeGroup.add(pointsGroup);

    // 7. Animation (چرخش ملایم)
    function animate() {
        requestAnimationFrame(animate);
        globeGroup.rotation.y += 0.0025;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });
}

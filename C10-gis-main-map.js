/* ============================================================
   C10-gis-main-map.js | کره مشبک معلق، خطوط مداری و نقاط ریز طلایی چشمک‌زن
   ============================================================ */

const scriptTag = document.createElement('script');
scriptTag.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
document.head.appendChild(scriptTag);

scriptTag.onload = () => {
    initAdvancedGlobe();
};

function initAdvancedGlobe() {
    const container = document.getElementById('gis-globe-root');
    if (!container) return;

    const width = container.clientWidth || 420;
    const height = container.clientHeight || 420;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 210;

    // 2. Renderer با پس‌زمینه شفاف
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 3. کره اصلی تیره و شفاف (زیرین)
    const baseGeo = new THREE.SphereGeometry(60, 32, 32);
    const baseMat = new THREE.MeshBasicMaterial({ 
        color: 0x020813, 
        transparent: true, 
        opacity: 0.6 
    });
    globeGroup.add(new THREE.Mesh(baseGeo, baseMat));

    // 4. شبکه مداری و نصف‌النهاری معلق (کمی بزرگ‌تر برای ایجاد فاصله معلق)
    const gridGeo = new THREE.SphereGeometry(63.5, 24, 24);
    const gridMat = new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        wireframe: true,
        transparent: true,
        opacity: 0.25
    });
    const floatingGrid = new THREE.Mesh(gridGeo, gridMat);
    globeGroup.add(floatingGrid);

    // 5. نقاط ریز و طلایی چشمک‌زن (نشان‌دهنده تراکم فعالیت کشورها روی مرزها و گره‌ها)
    const nodesCount = 180;
    const nodesGeometry = new THREE.BufferGeometry();
    const nodesPositions = [];

    for (let i = 0; i < nodesCount; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        
        const r = 63.8;
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        nodesPositions.push(x, y, z);
    }

    nodesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nodesPositions, 3));

    const nodesMaterial = new THREE.PointsMaterial({
        size: 1.5,
        color: 0xffd700, // طلایی درخشان
        transparent: true,
        opacity: 0.9
    });

    const blinkingNodes = new THREE.Points(nodesGeometry, nodesMaterial);
    globeGroup.add(blinkingNodes);

    // 6. Animation Loop (چرخش روان همراه با افکت چشمک‌زن زنده نقاط)
    let clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);

        globeGroup.rotation.y += 0.0025;

        const elapsedTime = clock.getElapsedTime();
        nodesMaterial.size = 1.2 + Math.sin(elapsedTime * 4) * 0.4;

        renderer.render(scene, camera);
    }
    animate();

    // Responsive Window Resize
    window.addEventListener('resize', () => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });
}

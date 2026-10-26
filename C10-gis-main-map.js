/* C10-gis-main-map.js - نقشه زنده رزولوشن بالا با قابلیت زوم */

(function loadLeafletAndInitMap() {
    if (!document.getElementById('leaflet-css')) {
        const cssLink = document.createElement('link');
        cssLink.id = 'leaflet-css';
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(cssLink);
    }

    if (typeof L === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = initLiveWorldMap;
        document.head.appendChild(script);
    } else {
        initLiveWorldMap();
    }
})();

function initLiveWorldMap() {
    const mapContainer = document.getElementById('gis-globe-root');
    if (!mapContainer) return;

    mapContainer.innerHTML = '<div id="live-map-canvas" style="width:100%; height:100%; position:absolute; top:0; left:0; z-index:1; background:#aad3df;"></div>';

    // تنظیم کنترل زوم و محدوده حرکت
    const map = L.map('live-map-canvas', {
        center: [25, 10],
        zoom: 2,
        minZoom: 1,
        maxZoom: 10,
        zoomControl: true, // فعال کردن دکمه‌های زوم برای راحتی کاربر
        attributionControl: false
    });

    // لایه زنده با رزولوشن بالا (HD Retina Vector Tiles)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        subdomains: ['a', 'b', 'c'],
        detectRetina: true
    }).addTo(map);

    // نودهای فعال روی نقشه
    const liveParticipants = [
        { lat: 35.6892, lng: 51.3890, city: "تهران" },
        { lat: 51.5074, lng: -0.1278, city: "لندن" },
        { lat: 52.5200, lng: 13.4050, city: "برلین" },
        { lat: 39.9042, lng: 116.4074, city: "پکن" },
        { lat: 40.7128, lng: -74.0060, city: "نیویورک" },
        { lat: 41.9028, lng: 12.4964, city: "رم" },
        { lat: 55.6761, lng: 12.5683, city: "کپنهاگ" }
    ];

    liveParticipants.forEach(p => {
        const marker = L.circleMarker([p.lat, p.lng], {
            radius: 6,
            fillColor: '#0284c7',
            color: '#ffffff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.95
        }).addTo(map);

        marker.bindPopup(`<b>نود فعال:</b> ${p.city}`);
    });

    setTimeout(() => {
        map.invalidateSize();
    }, 300);
}

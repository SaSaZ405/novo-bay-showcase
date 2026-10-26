/* C10-gis-main-map.js - نقشه‌ی ۲بعدی تخت جهانی GIS با Leaflet.js */

(function loadLeafletAndInitMap() {
    // بارگذاری فایل CSS کتابخانه Leaflet
    if (!document.getElementById('leaflet-css')) {
        const cssLink = document.createElement('link');
        cssLink.id = 'leaflet-css';
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(cssLink);
    }

    // بارگذاری اسکریپت Leaflet
    if (typeof L === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = init2DWorldMap;
        document.head.appendChild(script);
    } else {
        init2DWorldMap();
    }
})();

function init2DWorldMap() {
    const mapContainer = document.getElementById('gis-globe-root');
    if (!mapContainer) return;

    // تغییر آی‌دی کانتینر برای نقشه ۲بعدی
    mapContainer.innerHTML = '<div id="map-2d-root" style="width:100%; height:100%;"></div>';

    // ایجاد نقشه‌ی تخت دو بعدی
    const map = L.map('map-2d-root', {
        center: [20, 10],
        zoom: 2,
        minZoom: 2,
        maxZoom: 6,
        zoomControl: false,
        attributionControl: false
    });

    // لایه نقشه‌ی تخت جهانی تم روشن (Positron Minimal Bright)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd'
    }).addTo(map);

    // افزودن نودهای فعال پلتفرم روی کشورهای جهان (نقاط زنده)
    const activeNodes = [
        { lat: 35.6892, lng: 51.3890, name: "تهران" },
        { lat: 51.5074, lng: -0.1278, name: "لندن" },
        { lat: 52.5200, lng: 13.4050, name: "برلین" },
        { lat: 39.9042, lng: 116.4074, name: "پکن" },
        { lat: 40.7128, lng: -74.0060, name: "نیویورک" },
        { lat: 41.9028, lng: 12.4964, name: "رم" },
        { lat: 55.6761, lng: 12.5683, name: "کپنهاگ" }
    ];

    activeNodes.forEach(node => {
        L.circleMarker([node.lat, node.lng], {
            radius: 6,
            fillColor: '#0284c7',
            color: '#ffffff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map).bindPopup(`<b>نود فعال: ${node.name}</b>`);
    });
}

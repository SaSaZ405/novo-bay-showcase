/* C10-gis-main-map.js - لود نقشه زنده و تعاملی جهانی با Leaflet */

(function loadLeafletAndInitMap() {
    // بررسی و تزریق فایل CSS کتابخانه Leaflet
    if (!document.getElementById('leaflet-css')) {
        const cssLink = document.createElement('link');
        cssLink.id = 'leaflet-css';
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(cssLink);
    }

    // بررسی و تزریق اسکریپت Leaflet
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

    // پاکسازی کانتینر و آماده‌سازی برای نقشه
    mapContainer.innerHTML = '<div id="live-map-canvas" style="width:100%; height:100%; position:absolute; top:0; left:0; z-index:1;"></div>';

    // ایجاد نقشه زنده جهانی با قابلیت زوم و جابجایی
    const map = L.map('live-map-canvas', {
        center: [25, 10],
        zoom: 2,
        minZoom: 2,
        maxZoom: 7,
        zoomControl: false,
        attributionControl: false
    });

    // استفاده از لایه زنده و استاندارد OpenStreetMap (کاملاً رایگان، بدون نیاز به API Key و کاملاً زنده)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        subdomains: ['a', 'b', 'c']
    }).addTo(map);

    // افزودن مارکرها یا نودهای زنده شرکت‌کنندگان در شهرهای مختلف جهان
    const liveParticipants = [
        { lat: 35.6892, lng: 51.3890, city: "تهران (Tehran)" },
        { lat: 51.5074, lng: -0.1278, city: "لندن (London)" },
        { lat: 52.5200, lng: 13.4050, city: "برلین (Berlin)" },
        { lat: 39.9042, lng: 116.4074, city: "پکن (Beijing)" },
        { lat: 40.7128, lng: -74.0060, city: "نیویورک (New York)" },
        { lat: 41.9028, lng: 12.4964, city: "رم (Rome)" },
        { lat: 55.6761, lng: 12.5683, city: "کپنهاگ (Copenhagen)" },
        { lat: -23.5505, lng: -46.6333, city: "سائوپائولو (São Paulo)" }
    ];

    liveParticipants.forEach(p => {
        // ایجاد پین‌های زنده روی نقشه برای نمایش محل استقرار شرکت‌کنندگان
        const marker = L.circleMarker([p.lat, p.lng], {
            radius: 7,
            fillColor: '#0284c7',
            color: '#ffffff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.9
        }).addTo(map);

        marker.bindPopup(`<b>نود فعال زنده:</b> ${p.city}`);
    });

    // انطباق اندازه نقشه با تغییرات صفحه
    setTimeout(() => {
        map.invalidateSize();
    }, 500);
}

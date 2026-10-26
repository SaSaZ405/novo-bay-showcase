/* C10-gis-main-map.js - v5.0
   نقشه قفل‌شده جهان در یک فریم ثابت بدون امکان کشیدن یا جابه‌جایی لمسی
*/

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

    // ایجاد بوم نقشه با استایل touch-action: none جهت قفل کامل لمسی
    mapContainer.innerHTML = '<div id="live-map-canvas" style="width:100%; height:100%; position:absolute; top:0; left:0; z-index:1; background:#aad3df; touch-action: none !important;"></div>';

    const mapElement = document.getElementById('live-map-canvas');

    // غیرفعال کردن تمامی رویدادهای لمسی و درگ مستقیم روی عنصر HTML نقشه
    ['touchstart', 'touchmove', 'touchend', 'pointermove', 'pointerdown', 'mousedown', 'mousemove'].forEach(eventType => {
        mapElement.addEventListener(eventType, function (e) {
            // اگر کاربر روی خود دکمه‌های زوم (+ و -) کلیک نکرده بود، تمام رویدادهای درگ و زوم لمسی را خنثی کن
            if (!e.target.closest('.leaflet-control-zoom') && !e.target.closest('.leaflet-popup')) {
                if (e.touches && e.touches.length > 1) {
                    e.preventDefault(); // جلوگیری از زوم با دو انگشت
                }
            }
        }, { passive: false });
    });

    // ساخت نقشه با فریم کاملاً ثابت
    const map = L.map('live-map-canvas', {
        center: [20, 0],
        zoom: 2,
        minZoom: 1,
        maxZoom: 6,
        zoomControl: true,         // فعال بودن دکمه‌های زوم + و -
        dragging: false,           // غیرفعال‌سازی درگ
        touchZoom: false,          // غیرفعال‌سازی زوم لمسی با دو انگشت
        doubleClickZoom: false,    // غیرفعال‌سازی زوم با دابل کلیک
        scrollWheelZoom: false,   // غیرفعال‌سازی زوم با اسکرول ماوس
        boxZoom: false,
        keyboard: false,
        tap: false,
        bounceAtZoomLimits: false,
        attributionControl: false
    });

    // غیرفعال‌سازی دستوری اکید تمامی کنترلرهای حرکتی Leaflet
    if (map.dragging) map.dragging.disable();
    if (map.touchZoom) map.touchZoom.disable();
    if (map.doubleClickZoom) map.doubleClickZoom.disable();
    if (map.scrollWheelZoom) map.scrollWheelZoom.disable();

    // لایه زنده نقشه جهانی
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        subdomains: ['a', 'b', 'c'],
        noWrap: true, // نمایش نقشه در یک فریم واحد بدون تکرار
        detectRetina: true
    }).addTo(map);

    // فیت کردن دقیق فریم نقشه جهان در مرکز دید
    const worldBounds = L.latLngBounds(L.latLng(-60, -170), L.latLng(75, 170));
    map.fitBounds(worldBounds);

    // نودهای زنده جهانی شرکت‌کنندگان
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

    // تنظیم مجدد سایز جهت لود کامل فریم بدون پرپک زدن
    setTimeout(() => {
        map.invalidateSize();
        map.fitBounds(worldBounds);
    }, 300);
}

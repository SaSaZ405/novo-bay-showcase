// راه‌اندازی نقشه با حرکت آزاد افقی و قفل عمودی قطب‌ها
const map = L.map('map', {
    zoomControl: false,
    minZoom: 2,
    maxZoom: 8,
    worldCopyJump: true, // پرش نرم هنگام چرخش افقی دور کره زمین
    maxBounds: [
        [-85, -Infinity], // محدودیت انتهای جنوب
        [85, Infinity]    // محدودیت انتهای شمال (محور افقی بی‌نهایت آزاد است)
    ],
    maxBoundsViscosity: 1.0
}).setView([25, 15], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap'
}).addTo(map);

L.control.zoom({ position: 'topleft' }).addTo(map);

// شبیه‌سازی رنگ‌بندی و مرزهای ایالتی/کشوری فعال روی نقشه (Polygon / GeoJSON نمایشی)
const coloredRegions = [
    {
        coords: [[38, 44], [38, 63], [25, 63], [25, 44]], // منطقه ایران / خاورمیانه
        color: '#10b981', name: 'منطقه فعال ایران'
    },
    {
        coords: [[60, 30], [60, 90], [45, 90], [45, 30]], // منطقه اوراسیا / روسیه
        color: '#3b82f6', name: 'منطقه مشترکین'
    },
    {
        coords: [[50, -125], [50, -70], [25, -70], [25, -125]], // منطقه آمریکا
        color: '#f59e0b', name: 'منطقه سهام‌داران'
    }
];

coloredRegions.forEach(region => {
    L.polygon(region.coords, {
        color: region.color,
        weight: 2,
        fillColor: region.color,
        fillOpacity: 0.2
    }).addTo(map).bindPopup(region.name);
});

// چراغ‌های زنده روی نقشه
const liveBeaconsData = [
    { lat: 35.6892, lng: 51.3890, type: 'active', country: 'Iran' },
    { lat: 55.7558, lng: 37.6173, type: 'subscriber', country: 'Russia' },
    { lat: 40.7128, lng: -74.0060, type: 'shareholder', country: 'USA' },
    { lat: 51.5074, lng: -0.1278, type: 'idle', country: 'UK' }
];

liveBeaconsData.forEach(item => {
    const beaconHtml = `<div class="live-beacon beacon-${item.type}" title="${item.country}"></div>`;
    const customIcon = L.divIcon({ html: beaconHtml, className: '' });
    L.marker([item.lat, item.lng], { icon: customIcon }).addTo(map);
});

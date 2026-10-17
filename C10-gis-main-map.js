const map = L.map('map', {
    zoomControl: false,
    minZoom: 2,
    maxZoom: 8,
    maxBounds: [
        [-65, -180], // محدود کردن جنوب
        [75, 180]    // محدود کردن شمال
    ],
    maxBoundsViscosity: 1.0
}).setView([25, 15], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap'
}).addTo(map);

L.control.zoom({ position: 'topleft' }).addTo(map);

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

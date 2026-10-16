
const miniMap = L.map('miniMap', {
    attributionControl: false,
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false
}).setView([20, 0], 1);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 5
}).addTo(miniMap);

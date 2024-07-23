// Inicializar el mapa
var map = L.map('map').setView([19.427167, -99.167487], 60); // Latitud, Longitud, Zoom
// Cargar una capa de mapa desde OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Añadir un marcador
L.marker([19.427167, -99.167487]).addTo(map)
    .bindPopup('<b>Pasteleria Encanto</b><br />Bolar, San Miguel #000.')
    .openPopup();

    console.log(map);
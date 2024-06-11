document.addEventListener('DOMContentLoaded', function() {
    // Inicializar o menu drawer
    const elems = document.querySelectorAll('.sidenav');
    const instances = M.Sidenav.init(elems);

    // Inicializar o mapa Leaflet
    const map = L.map('map').setView([0, 0], 3); // Posição inicial (lat, lon) e zoom

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let marker;

    // Função para obter localização
    function showLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                alert("Latitude: " + lat + "\nLongitude: " + lon);

                // Atualizar o mapa para a localização do usuário
                map.setView([lat, lon], 13);

                if (marker) {
                    marker.setLatLng([lat, lon]);
                } else {
                    marker = L.marker([lat, lon]).addTo(map);
                }
            }, function(error) {
                alert("Erro ao obter localização: " + error.message);
            });
        } else {
            alert("Geolocalização não é suportada pelo seu navegador.");
        }
    }

    // Adicionar evento de clique aos botões
    document.getElementById('getLocation').addEventListener('click', showLocation);
    document.getElementById('getLocationMobile').addEventListener('click', showLocation);
});

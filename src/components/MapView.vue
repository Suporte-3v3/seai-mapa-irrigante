<template>
  <div
    ref="map"
    class="map-container"
  />
</template>

<script>
import L from 'leaflet';
import axios from 'axios';
import { data as ceara_data } from '/Users/Naylton 3v3/Documents/seai-mapa-irrigante/src/cearaGeojson'

export default {
  name: 'MapView',
  data() {
    return {
      stations: [],
      pluviometers: [],
      map: null,
      stationIcon: L.marker({
        iconUrl: '/icone-pluviometer', // caminho para o ícone na pasta public
        iconSize: [100, 95], // tamanho do ícone
      }),
      pluviometerIcon: L.marker({
        iconUrl: '/icon-station', // caminho para o ícone na pasta public
        iconSize: [100, 95], // tamanho do ícone
      }),
    };
  },
  async created() {
    try {
      const responseStation = await axios.get('http://seai.3v3.farm/api/v1/equipments/activated?type=station');
      this.stations = responseStation.data.data;

      const responsePluviometer = await axios.get('http://seai.3v3.farm/api/v1/equipments/activated?type=pluviometer');
      this.pluviometers = responsePluviometer.data.data;
    } catch (error) {
      console.error(error);
    }
  },
  mounted() {
    this.setupMap();
    window.addEventListener('resize', this.handleResize);

    // Adicione os marcadores aqui, depois que o mapa foi criado
    this.stations.forEach(station => {
      L.marker(station.Location.Coordinates, { icon: this.stationIcon }).addTo(this.map);
    });

    this.pluviometers.forEach(pluviometer => {
      L.marker(pluviometer.Location.Coordinates, { icon: this.pluviometerIcon }).addTo(this.map);
    });
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);

    if (this.map) {
      this.map.remove();
    }
  },
  methods: {
    setupMap() {
      // Criar o mapa
      this.map = L.map(this.$refs.map, {
        scrollWheelZoom: true // Desabilita o zoom com a roda do mouse
      });

      // Adicionar camada de tile do OpenStreetMap
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: 'SEAI - Irrigante'
      }).addTo(this.map);

      // Adicionar o GeoJSON ao mapa
      const geojsonLayer = L.geoJSON(ceara_data, {
        onEachFeature: this.onEachFeature,
        style: function(feature) {
          return {
            color: "#1b3f82", // cor do traçado
            weight: 0.5, // largura do traçado
            opacity: 1, // opacidade do traçado
            fillOpacity: 0.2 // opacidade do preenchimento
          };
        }
      }).addTo(this.map);

      // Ajustar o mapa para focar na área coberta pelo GeoJSON
      this.map.fitBounds(geojsonLayer.getBounds());

      // Ocultar apenas a atribuição do Leaflet

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
    
          // Centralizar o mapa na localização do usuário
          this.map.setView([latitude, longitude], 7);
        }, error => {
          console.error('Erro ao obter a localização do usuário:', error);
        });
      } else {
        console.error('Geolocalização não é suportada neste navegador.');
      }
    
      // Ajustar o tamanho do mapa para a tela
      this.handleResize();

      // Adiciona um evento de escuta para desabilitar o zoom quando o usuário toca no mapa
      this.$refs.map.addEventListener('touchstart', () => {
        this.map.scrollWheelZoom.disable(); // Desabilita o zoom com o toque
      });

      // Adiciona um evento de escuta para habilitar o zoom quando o usuário tira o dedo do mapa
      this.$refs.map.addEventListener('touchend', () => {
        this.map.scrollWheelZoom.enable(); // Habilita o zoom com o toque
      });
    },
    handleResize() {
      this.map.invalidateSize(); // Reajusta o tamanho do mapa quando a janela é redimensionada
    },
    onEachFeature(feature, layer) {
      if (feature.properties && feature.properties.name) {
        layer.bindPopup(feature.properties.name);
      }
    }
  }
};
</script>

<style scoped>
.map-container {
  height: 60vh; /* Define a altura do mapa para ocupar 70% da altura da tela */
}

.leaflet-control-attribution {
  display: none;
}
</style>

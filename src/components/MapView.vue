<template>
  <div ref="map" class="map-container"></div>
</template>

<script>
import L from 'leaflet';
import axios from 'axios';
import { data as ceara_data } from '/Users/Naylton 3v3/Documents/seai-mapa-irrigante/src/cearaGeojson';

export default {
  name: 'MapView',
  data() {
    return {
      stations: [],
      pluviometers: [],
      map: null,
      stationIcon: L.icon({
        iconUrl: '/icon-station.png', // caminho para o ícone na pasta public
        iconSize: [15, 15], // tamanho do ícone
      }),
      pluviometerIcon: L.icon({
        iconUrl: '/icon-pluviometer.png', // caminho para o ícone na pasta public
        iconSize: [15, 15], // tamanho do ícone
      }),
    };
  },
  async created() {
    try {
      const responseStation = await axios.get('http://seai.3v3.farm/api/v1/equipments/activated?type=station');
      this.stations = responseStation.data.data || [];
      console.log('Stations data:', this.stations); // Log para verificar dados das estações

      const responsePluviometer = await axios.get('http://seai.3v3.farm/api/v1/equipments/activated?type=pluviometer');
      this.pluviometers = responsePluviometer.data ? responsePluviometer.data.data : [];
      console.log('Pluviometers data:', this.pluviometers); // Log para verificar dados dos pluviômetros

      // Adicionar marcadores após os dados serem carregados e validados
      this.addMarkers();
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  },
  mounted() {
    this.setupMap();
    window.addEventListener('resize', this.handleResize);
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);

    if (this.map) {
      this.map.remove();
    }
  },
  methods: {
    setupMap() {
      this.map = L.map(this.$refs.map, {
        scrollWheelZoom: true, // Habilita o zoom com a roda do mouse
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: 'SEAI - Irrigante',
      }).addTo(this.map);

      const geojsonLayer = L.geoJSON(ceara_data, {
        onEachFeature: this.onEachFeature,
        style: function(feature) {
          return {
            color: '#1b3f82', // cor do traçado
            weight: 0.5, // largura do traçado
            opacity: 1, // opacidade do traçado
            fillOpacity: 0.2, // opacidade do preenchimento
          };
        },
      }).addTo(this.map);

      this.map.fitBounds(geojsonLayer.getBounds());

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.map.setView([latitude, longitude], 7);
          },
          (error) => {
            console.error('Erro ao obter a localização do usuário:', error);
          }
        );
      } else {
        console.error('Geolocalização não é suportada neste navegador.');
      }

      this.handleResize();

      this.$refs.map.addEventListener('touchstart', () => {
        this.map.scrollWheelZoom.disable(); // Desabilita o zoom com o toque
      });

      this.$refs.map.addEventListener('touchend', () => {
        this.map.scrollWheelZoom.enable(); // Habilita o zoom com o toque
      });

      // Adicionar a legenda ao mapa
      this.addLegend();
    },
    handleResize() {
      this.map.invalidateSize(); // Reajusta o tamanho do mapa quando a janela é redimensionada
    },
    onEachFeature(feature, layer) {
      if (feature.properties && feature.properties.name) {
        layer.bindPopup(feature.properties.name);
      }
    },
    addMarkers() {
      if (this.stations && Array.isArray(this.stations)) {
        this.stations.forEach((station) => {
          const coordinates = station.Location.Coordinates;
          console.log('Adding station marker at:', coordinates); // Log para verificar coordenadas das estações
          if (coordinates && coordinates.length === 2) {
            const marker = L.marker([coordinates[0], coordinates[1]], { icon: this.stationIcon }).addTo(this.map);
            marker.bindPopup(`<b>Nome:</b> ${station.Name}<br><b>Orgão:</b> ${station.Organ.Name}<br><b>Et0:</b> ${station.Et0}`);
          } else {
            console.error('Invalid station coordinates:', station);
          }
        });
      } else {
        console.error('Stations data is invalid or not an array');
      }

      if (this.pluviometers && Array.isArray(this.pluviometers)) {
        this.pluviometers.forEach((pluviometer) => {
          const coordinates = pluviometer.Location.Coordinates;
          console.log('Adding pluviometer marker at:', coordinates); // Log para verificar coordenadas dos pluviômetros
          if (coordinates && coordinates.length === 2) {
            const marker = L.marker([coordinates[0], coordinates[1]], { icon: this.pluviometerIcon }).addTo(this.map);
            marker.bindPopup(`<b>Nome:</b> ${pluviometer.Name}<br><b>Orgão:</b> ${pluviometer.Organ.Name}`);
          } else {
            console.error('Invalid pluviometer coordinates:', pluviometer);
          }
        });
      } else {
        console.error('Pluviometers data is invalid or not an array');
      }
    },
    addLegend() {
      const legend = L.control({ position: 'topright' });

      legend.onAdd = () => {
        const div = L.DomUtil.create('div', 'info legend');
        div.innerHTML += '<i style="background: #1b3f82; width: 15px; height: 15px; display: inline-block;"></i> Estação<br>';
        div.innerHTML += '<i style="background: #b1151f; width: 15px; height: 15px; display: inline-block;"></i> Pluviômetro<br>';
        return div;
      };

      legend.addTo(this.map);
    }
  },
};
</script>

<style scoped>
.map-container {
  height: 60vh; /* Define a altura do mapa para ocupar 60% da altura da tela */
}

.leaflet-control-attribution {
  display: none;
}

.info.legend {
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}

.info.legend i {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 5px;
}
</style>

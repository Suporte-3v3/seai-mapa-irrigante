<template>
  <div ref="map" class="map-container" />
</template>

<script>
import L from "leaflet";
import axios from "axios";
import { data as ceara_data } from "@/assets/leaflet/cearaGeojson.js";

export default {
  name: "MapView",
  data() {
    return {
      stations: [],
      pluviometers: [],
      map: null,
      stationIcon: L.icon({
        iconUrl: '/icon-station.png',
        iconSize: [25, 25],
      }),
      pluviometerIcon: L.icon({
        iconUrl: '/icon-pluviometer.png',
        iconSize: [25, 25],
      }),
      userIcon: L.icon({
        iconUrl: '/icon-user.png',
        iconSize: [25, 25],
      }),
    };
  },
  async created() {
    try {
      const responseStation = await axios.get('http://seai.3v3.farm/api/v1/equipments/activated?type=station');
      this.stations = responseStation.data.data || [];
      console.log('Stations data:', this.stations);

      const responsePluviometer = await axios.get('http://seai.3v3.farm/api/v1/equipments/activated?type=pluviometer');
      this.pluviometers = responsePluviometer.data ? responsePluviometer.data.data : [];
      console.log('Pluviometers data:', this.pluviometers);

      this.addMarkers();
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  },
  mounted() {
    this.setupMap();
    window.addEventListener("resize", this.handleResize);

    this.stations.forEach((station) => {
      L.marker(station.Location.Coordinates, { icon: this.stationIcon }).addTo(
        this.map
      );
    });

    this.pluviometers.forEach((pluviometer) => {
      L.marker(pluviometer.Location.Coordinates, {
        icon: this.pluviometerIcon,
      }).addTo(this.map);
    });
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);

    if (this.map) {
      this.map.remove();
    }
  },
  methods: {
    setupMap() {
      this.map = L.map(this.$refs.map, {
        scrollWheelZoom: true,
        attributionControl: false, // Remove attribution control
        zoomControl: false, // Remove default zoom controls
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution: "", // Ensure no attribution is added
        }
      ).addTo(this.map);

      const geojsonLayer = L.geoJSON(ceara_data, {
        onEachFeature: this.onEachFeature,
        style: function (feature) {
          return {
            color: '#1b3f82',
            weight: 0.5,
            opacity: 1,
            fillOpacity: 0.2,
          };
        },
      }).addTo(this.map);

      this.map.fitBounds(geojsonLayer.getBounds());

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            if (this.map) {
              this.map.setView([latitude, longitude], 12);
              L.marker([latitude, longitude], { icon: this.userIcon }).addTo(this.map)
              .bindPopup("<b>Usuário</b><br>Localização Aproximada");
            }
          },
          (error) => {
            console.error('Erro ao obter a localização do usuário:', error);
          }
        );
      } else {
        console.error("Geolocalização não é suportada neste navegador.");
      }

      this.handleResize();

      this.$refs.map.addEventListener('touchstart', () => {
        if (this.map) {
          this.map.scrollWheelZoom.disable();
        }
      });

      this.$refs.map.addEventListener('touchend', () => {
        if (this.map) {
          this.map.scrollWheelZoom.enable();
        }
      });

      this.addLegend();

      // Add custom zoom controls
      L.control.zoom({
        position: 'bottomleft', // Position zoom controls to bottom left
      }).addTo(this.map);
    },
    handleResize() {
      if (this.map) {
        this.map.invalidateSize();
      }
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
          console.log('Adicionando marcador de estação em:', coordinates);
          if (coordinates && coordinates.length === 2) {
            const marker = L.marker([coordinates[0], coordinates[1]], { icon: this.stationIcon }).addTo(this.map);
            marker.bindPopup(`<b>Nome:</b> ${station.Name}<br><b>Orgão:</b> ${station.Organ.Name} <a>[</a>${station.Code}<a>]</a><br><b>Et0:</b> ${station.Et0}`);
          } else {
            console.error('Coordenadas de Estações inválidas:', station);
          }
        });
      } else {
        console.error('Os dados das estações são inválidos');
      }

      if (this.pluviometers && Array.isArray(this.pluviometers)) {
        this.pluviometers.forEach((pluviometer) => {
          const coordinates = pluviometer.Location.Coordinates;
          console.log('Adicionando marcador de pluviômetro em:', coordinates);
          if (coordinates && coordinates.length === 2) {
            const marker = L.marker([coordinates[0], coordinates[1]], { icon: this.pluviometerIcon }).addTo(this.map);
            marker.bindPopup(`<b>Nome:</b> ${pluviometer.Name}<br><b>Orgão:</b> ${pluviometer.Organ.Name} <a>[</a>${pluviometer.Code}<a>]</a><br><b>Precipitação:</b> ${pluviometer.Precipitation}<a> mm</a>`);
          } else {
            console.error('Coordenadas do pluviômetro inválidas', pluviometer);
          }
        });
      } else {
        console.error('Os dados dos pluviômetros são inválidos');
      }
    },
    addLegend() {
      const legend = L.control({ position: 'bottomright' });

      legend.onAdd = () => {
        const div = L.DomUtil.create('div', 'info legend');
        console.log('Legenda adicionada com classes:', div.className); // Adicione este log
        div.innerHTML += '<i style="background: #02fa07; width: 20px; height: 18px; display: inline-block;"></i> <b>Estação</b><br>';
        div.innerHTML += '<i style="background: #d234eb; width: 20px; height: 18px; display: inline-block;"></i> <b>Pluviômetro</b><br>';
        return div;
      };

      legend.addTo(this.map);
    }
  },
};
</script>

<style>
.map-container {
  height: 60vh;
}

.leaflet-control-attribution {
  display: none;
}

.leaflet-bottom {
  bottom: 500px !important; /* Ajusta a distância da parte inferior */
}

.leaflet-control-zoom {
  bottom: 20px !important; /* Ajusta a distância do controle de zoom */
}

.info.legend {
  background-color: #1b3f82; /* Cor de fundo da legenda */
  color: white; /* Cor do texto da legenda */
  padding: 12px;
  border-radius: 5px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  bottom: 20px; /* Ajusta a distância da parte inferior */
  z-index: 9999; /* Garante que a legenda esteja sempre no topo */
}

.info.legend i {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 5px;
}
</style>

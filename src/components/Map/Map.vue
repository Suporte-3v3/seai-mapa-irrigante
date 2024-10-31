<template>
  <div ref="map" class="map-container" />
</template>

<script>
import L from "leaflet";
import axios from "axios";
import { data as ceara_data } from "@/assets/leaflet/cearaGeojson.js";
import { API_BASE_URL } from '../../services/config.js';
import { API_BASE_URL2 } from '../../services/config.js';
import { toast } from "vue3-toastify";

export default {
  name: "MapView",
  data() {
    return {
      stations: [],
      pluviometers: [],
      map: null,
      lastUpdatedAt: '',
      userLocation: null,
      stationMarkers: L.layerGroup(),
      pluviometerMarkers: L.layerGroup(),
      stationInactiveMarkers: L.layerGroup(),
      pluviometerInactiveMarkers: L.layerGroup(),
      stationIcon: L.icon({
        iconUrl: '/icon-station.png',
        iconSize: [25, 25],
        className: 'station-icon',
      }),
      pluviometerIcon: L.icon({
        iconUrl: '/icon-pluviometer.png',
        iconSize: [25, 25],
        className: 'pluviometer-icon',
      }),
      userIcon: L.icon({
        iconUrl: '/icon-user.png',
        iconSize: [25, 25],
        className: 'user-icon',
      }),
      stationDisableIcon: L.icon({
        iconUrl: '/icon-stationdisable.png',
        iconSize: [25, 25],
        className: 'station-disable-icon',
      }),
      pluviometerDisableIcon: L.icon({
        iconUrl: '/icon-pluviometerdisable.png',
        iconSize: [25, 25],
        className: 'pluviometer-disable-icon',
      }),
      showStations: true,
      showPluviometers: true,
      showInactiveStations: true,
      showInactivePluviometers: true,
      stationPolyline: null,
      pluviometerPolyline: null,
    };
  },
  async created() {
    try {
      const baseUrl = API_BASE_URL;
      const baseUrl2 = API_BASE_URL2;

      const [responseStation, responsePluviometer, responseUpdate] = await Promise.all([
        axios.get(`${baseUrl}/equipments/synchronized?type=station`),
        axios.get(`${baseUrl}/equipments/synchronized?type=pluviometer`),
        axios.get(`${baseUrl2}/equipments/last-updated-at`)
      ]);

      this.stations = responseStation.data.data || [];
      this.pluviometers = responsePluviometer.data ? responsePluviometer.data.data : [];
      this.lastUpdatedAt = this.formatDateTime(responseUpdate.data.data[0].Time);

      this.addMarkers();
    } catch (error) {
      toast.error('Erro ao mostrar dados de Estações e Pluviômetros');
      console.error('Erro ao buscar dados da API:', error);
    }
  },
  mounted() {
    this.setupMap();
    window.addEventListener("resize", this.handleResize);
    this.getUserLocation();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
    if (this.map) {
      this.map.remove();
    }
  },
  methods: {
    formatDateTime(dateString) {
      if (!dateString) return 'Data não disponível';

      const date = new Date(dateString);
      if (isNaN(date)) return 'Data inválida';

      const day = String(date.getUTCDate()).padStart(2, '0');
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const year = date.getUTCFullYear();
      const hours = String(date.getUTCHours()).padStart(2, '0');
      return `${day}/${month}/${year}`;
    },
    setupMap() {
      this.map = L.map(this.$refs.map, {
        scrollWheelZoom: true,
        attributionControl: false,
        zoomControl: false,
        minZoom: 6,
        maxBounds: [-180, 180] [180, -180],
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        { attribution: false }
      ).addTo(this.map);

      const geojsonLayer = L.geoJSON(ceara_data, {
        onEachFeature: this.onEachFeature,
        style: function (feature) {
          return {
            color: '#1b3f82',
            weight: 0.5,
            opacity: 1,
            fillOpacity: 0.2,
            className: 'leaflet-interactive'
          };
        },
      }).addTo(this.map);

      this.map.fitBounds(geojsonLayer.getBounds());
      this.handleResize();

      this.$refs.map.addEventListener('touchstart', () => {
        if (this.map) this.map.scrollWheelZoom.disable();
      });

      this.$refs.map.addEventListener('touchend', () => {
        if (this.map) this.map.scrollWheelZoom.enable();
      });

      this.addLegend();
      L.control.zoom({ position: 'topleft' }).addTo(this.map);
    },
    handleResize() {
      if (this.map) this.map.invalidateSize();
    },
    onEachFeature(feature, layer) {
      layer.on({
        mouseover: this.highlightFeature,
        mouseout: this.resetHighlight,
      });
    },
    highlightFeature(e) {},
    resetHighlight(e) {
      const geojsonLayer = e.target;
      geojsonLayer.resetStyle(e.target);
    },
    addMarkers() {
      const addMarker = (item, icon, popupContent) => {
        const coordinates = item.Location.Coordinates;
        if (coordinates && coordinates.length === 2) {
          const marker = L.marker([coordinates[0], coordinates[1]], { icon });
          marker.bindPopup(popupContent);

          marker.on('click', () => {
            this.$emit('station-selected', item);
          });

          return marker;
        } else {
          console.error('Coordenadas inválidas:', item);
          return null;
        }
      };

      const createPopupContent = (name, organName, code, dataText) => {
        return `<b>Nome:</b> ${name}<br><b>Orgão:</b> ${organName} [${code}]<br><b>Dados:</b> ${dataText}`;
      };

      if (this.stations && Array.isArray(this.stations)) {
        this.stations.forEach((station) => {
          const et0Text = (station.Et0 === null || station.Et0 === undefined) ? 'Sem Dados Coletados' : `${station.Et0} mm`;
          const icon = (station.Enable === false || station.Et0 === null || station.Et0 === undefined) ? this.stationDisableIcon : this.stationIcon;
          const popupContent = createPopupContent(station.Name, station.Organ.Name, station.Code, et0Text);
          const marker = addMarker(station, icon, popupContent);
          if (marker) {
            if (station.Enable === false || station.Et0 === null || station.Et0 === undefined) {
              this.stationInactiveMarkers.addLayer(marker);
            } else {
              this.stationMarkers.addLayer(marker);
            }
          }
        });
      }

      if (this.pluviometers && Array.isArray(this.pluviometers)) {
        this.pluviometers.forEach((pluviometer) => {
          const precipitationText = (pluviometer.Precipitation === null || pluviometer.Precipitation === undefined) ? 'Sem Dados Coletados' : `${pluviometer.Precipitation} mm`;
          const icon = (pluviometer.Enable === false || pluviometer.Precipitation === null || pluviometer.Precipitation === undefined) ? this.pluviometerDisableIcon : this.pluviometerIcon;
          const popupContent = createPopupContent(pluviometer.Name, pluviometer.Organ.Name, pluviometer.Code, precipitationText);
          const marker = addMarker(pluviometer, icon, popupContent);
          if (marker) {
            if (pluviometer.Enable === false || pluviometer.Precipitation === null || pluviometer.Precipitation === undefined) {
              this.pluviometerInactiveMarkers.addLayer(marker);
            } else {
              this.pluviometerMarkers.addLayer(marker);
            }
          }
        });
      }

      this.stationMarkers.addTo(this.map);
      this.pluviometerMarkers.addTo(this.map);
      this.stationInactiveMarkers.addTo(this.map);
      this.pluviometerInactiveMarkers.addTo(this.map);

      L.control.attribution({
        prefix: false,
      }).addAttribution(`Dados atualizados em: ${this.lastUpdatedAt}`).addTo(this.map);
    },
    addLegend() {
      const legend = L.control({ position: 'topright' });

      legend.onAdd = () => {
        const div = L.DomUtil.create('div', 'info legend');

        // Estação Ativa
        div.innerHTML += `<div id="legend-station-enable" style="cursor: pointer;">
          <i id="stationenable-legend" style="background: #EF760F; width: 20px; height: 18px; display: inline-block;"></i>
          <b>Estações Ativas</b>
        </div>`;

        // Pluviômetro Ativo
        div.innerHTML += `<div id="legend-pluviometer-enable" style="cursor: pointer;">
          <i id="pluviometerenable-legend" style="background: #9023A1; width: 20px; height: 18px; display: inline-block;"></i>
          <b>Pluviômetros Ativos</b>
        </div>`;

        // Estação Desativada
        div.innerHTML += `<div id="legend-station-disable" style="cursor: pointer;">
          <i id="stationdisabled-legend" style="background: #d8ab88; width: 20px; height: 18px; display: inline-block;"></i>
          <b>Estações Desativadas</b>
        </div>`;

        // Pluviômetro Desativado
        div.innerHTML += `<div id="legend-pluviometer-disable" style="cursor: pointer;">
          <i id="pluviometerdisabled-legend" style="background: #bcaacf; width: 20px; height: 18px; display: inline-block;"></i>
          <b>Pluviômetros Desativados</b>
        </div>`;

        return div;
      };

      legend.addTo(this.map);

      // Click events for legend
      L.DomEvent.on(L.DomUtil.get('legend-station-enable'), 'click', () => {
        this.toggleLayer(this.stationMarkers, 'Estação Ativa');
      });
      L.DomEvent.on(L.DomUtil.get('legend-pluviometer-enable'), 'click', () => {
        this.toggleLayer(this.pluviometerMarkers, 'Pluviômetro Ativo');
      });
      L.DomEvent.on(L.DomUtil.get('legend-station-disable'), 'click', () => {
        this.toggleLayer(this.stationInactiveMarkers, 'Estação Desativada');
      });
      L.DomEvent.on(L.DomUtil.get('legend-pluviometer-disable'), 'click', () => {
        this.toggleLayer(this.pluviometerInactiveMarkers, 'Pluviômetro Desativado');
      });
    },
    toggleLayer(layerGroup, layerName) {
      if (this.map.hasLayer(layerGroup)) {
        this.map.removeLayer(layerGroup);
        toast.info(`${layerName} ocultado.`);
      } else {
        this.map.addLayer(layerGroup);
        toast.info(`${layerName} mostrado.`);
      }
    },
    debounce(func, wait) {
      let timeout;
      return function (...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.userLocation = L.marker([lat, lng], { icon: this.userIcon }).addTo(this.map);
          this.map.setView([lat, lng], 10);
        });
      } else {
        toast.error('Geolocalização não suportada pelo navegador.');
      }
    }
  }
};
</script>

<style>

#map {
    height: 100%;
  }
  .station-icon, .pluviometer-icon, .station-disable-icon, .pluviometer-disable-icon, .user-icon {
    width: 25px;
    height: 25px;
  }

.map-container {
  height: 60vh;
}

.leaflet-control-attribution {
  display: block !important;
  opacity: 1 !important;
  color: black !important;
}

.leaflet-top.leaflet-left {
  top: 20px;
  left: 2px;
}

.leaflet-control-zoom {
  margin-top: 10px;
}

.info.legend {
  background-color: #1b3f82;
  color: white;
  padding: 12px;
  border-radius: 5px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  top: 20px;
  right: 2px;
}

.info.legend i {
  display: inline-block;
  width: 20px;
  height: 18px;
  margin-right: 5px;
  cursor: pointer;
}

.legend-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .leaflet-top.leaflet-left {
    top: 10px;
    left: 2px;
  }

  .info.legend {
    padding: 8px;
    font-size: 14px;
    top: 10px;
    right: 2px;
  }

  .info.legend i {
    width: 15px;
    height: 15px;
  }
}

.leaflet-interactive {
  cursor: grab;
}

.leaflet-marker-icon {
  cursor: pointer;
}
</style>

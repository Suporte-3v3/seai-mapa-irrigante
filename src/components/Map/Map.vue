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
      userLocation: null,
      stationMarkers: L.layerGroup(),
      pluviometerMarkers: L.layerGroup(),
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
      showStations: true,
      showPluviometers: true,
      stationPolyline: null,
      pluviometerPolyline: null,
    };
  },
  async created() {
    try {
      const responseStation = await axios.get('http://seai.3v3.farm/api/v1/equipments/activated?type=station');
      this.stations = responseStation.data.data || [];
      console.log('Dados das Estações:', this.stations);

      const responsePluviometer = await axios.get('http://seai.3v3.farm/api/v1/equipments/activated?type=pluviometer');
      this.pluviometers = responsePluviometer.data ? responsePluviometer.data.data : [];
      console.log('Dados dos Pluviômetros:', this.pluviometers);

      this.addMarkers();
    } catch (error) {
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
    setupMap() {
      this.map = L.map(this.$refs.map, {
        scrollWheelZoom: true,
        attributionControl: false,
        zoomControl: false,
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution: "",
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
            className: 'leaflet-interactive'
          };
        },
      }).addTo(this.map);

      this.map.fitBounds(geojsonLayer.getBounds());
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
      L.control.zoom({ position: 'topleft' }).addTo(this.map);
    },
    handleResize() {
      if (this.map) {
        this.map.invalidateSize();
      }
    },
    onEachFeature(feature, layer) {
      layer.on({
        mouseover: this.highlightFeature,
        mouseout: this.resetHighlight,
      });
    },
    highlightFeature(e) {
    },
    resetHighlight(e) {
      const geojsonLayer = e.target;
      geojsonLayer.resetStyle(e.target);
    },
    addMarkers() {
  if (this.stations && Array.isArray(this.stations)) {
    this.stations.forEach((station) => {
      const coordinates = station.Location.Coordinates;
      if (coordinates && coordinates.length === 2) {
        const marker = L.marker([coordinates[0], coordinates[1]], { icon: this.stationIcon });
        const et0Text = (station.Et0 === null || station.Et0 === undefined) ? 'Sem Dados Coletados' : station.Et0;
        marker.bindPopup(`<b>Nome:</b> ${station.Name}<br><b>Orgão:</b> ${station.Organ.Name} [${station.Code}]<br><b>Et0:</b> ${et0Text}`);
        this.stationMarkers.addLayer(marker);
      } else {
        console.error('Coordenadas de Estação inválidas:', station);
      }
        });
      } else {
        console.error('Dados das estações são inválidos');
      }

      if (this.pluviometers && Array.isArray(this.pluviometers)) {
  this.pluviometers.forEach((pluviometer) => {
    const coordinates = pluviometer.Location.Coordinates;
    if (coordinates && coordinates.length === 2) {
      const marker = L.marker([coordinates[0], coordinates[1]], { icon: this.pluviometerIcon });
      const precipitationText = (pluviometer.Precipitation === null || pluviometer.Precipitation === undefined) ? 'Sem Dados Coletados' : `${pluviometer.Precipitation} mm`;
      marker.bindPopup(`<b>Nome:</b> ${pluviometer.Name}<br><b>Orgão:</b> ${pluviometer.Organ.Name} [${pluviometer.Code}]<br><b>Precipitação:</b> ${precipitationText}`);
      this.pluviometerMarkers.addLayer(marker);
    } else {
      console.error('Coordenadas do Pluviômetro inválidas', pluviometer);
    }
        });
      } else {
        console.error('Dados dos pluviômetros são inválidos');
      }

      this.stationMarkers.addTo(this.map);
      this.pluviometerMarkers.addTo(this.map);
    },
    addLegend() {
      const legend = L.control({ position: 'topright' });

      legend.onAdd = () => {
        const div = L.DomUtil.create('div', 'info legend');
        div.innerHTML += '<div><i id="stationenable-legend" style="background: #EF760F; width: 20px; height: 18px; display: inline-block;"></i> <b>Estações Válidas</b></div>';
        div.innerHTML += '<div><i id="pluviometerenable-legend" style="background: #9023A1; width: 20px; height: 18px; display: inline-block;"></i> <b>Pluviômetros Válidos</b></div>';
        div.innerHTML += '<div><i id="stationdisabled-legend" style="background: #d8ab88; width: 20px; height: 18px; display: inline-block;"></i> <b>Estações Não-Válidas</b></div>';
        div.innerHTML += '<div><i id="pluviometerdisabled-legend" style="background: #bcaacf; width: 20px; height: 18px; display: inline-block;"></i> <b>Pluviômetros Não-Válidos</b></div>';
        return div;
      };

      legend.addTo(this.map);

      setTimeout(() => {
        document.getElementById('stationenable-legend').addEventListener('click', this.toggleStations);
        document.getElementById('pluviometerenable-legend').addEventListener('click', this.togglePluviometers);
      }, 100);
    },
    toggleStations() {
      const stationLegend = document.getElementById('stationenable-legend');
      if (this.showStations) {
        this.map.removeLayer(this.stationMarkers);
        if (this.stationPolyline) {
          this.map.removeLayer(this.stationPolyline);
        }
        stationLegend.classList.add('legend-disabled');
      } else {
        this.map.addLayer(this.stationMarkers);
        if (this.stationPolyline) {
          this.map.addLayer(this.stationPolyline);
        }
        stationLegend.classList.remove('legend-disabled');
      }
      this.showStations = !this.showStations;
    },
    togglePluviometers() {
      const pluviometerLegend = document.getElementById('pluviometerenable-legend');
      if (this.showPluviometers) {
        this.map.removeLayer(this.pluviometerMarkers);
        if (this.pluviometerPolyline) {
          this.map.removeLayer(this.pluviometerPolyline);
        }
        pluviometerLegend.classList.add('legend-disabled');
      } else {
        this.map.addLayer(this.pluviometerMarkers);
        if (this.pluviometerPolyline) {
          this.map.addLayer(this.pluviometerPolyline);
        }
        pluviometerLegend.classList.remove('legend-disabled');
      }
      this.showPluviometers = !this.showPluviometers;
    },
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.userLocation = [latitude, longitude];
            console.log('Localização do usuário:', this.userLocation);
            if (this.map) {
              this.map.setView(this.userLocation, 12);
              const userMarker = L.marker(this.userLocation, { icon: this.userIcon }).addTo(this.map)
                .bindPopup("<b>Usuário</b><br>Localização Aproximada");

              setTimeout(() => {
                this.addPolylines();
              }, 3000);
            }
          },
          (error) => {
            console.error('Erro ao obter a localização do usuário:', error);
          }
        );
      } else {
        console.error("Geolocalização não é suportada por este navegador.");
      }
    },
    addPolylines() {
    if (!this.userLocation) {
      console.error('Localização do usuário não definida');
      return;
    }

    let closestStation = null;
    let minStationDistance = Number.MAX_SAFE_INTEGER;
    this.stations.forEach((station) => {
      const stationCoords = station.Location.Coordinates;
      if (stationCoords && stationCoords.length === 2 && station.Enable && station.Et0 !== null && station.Et0 !== undefined) {
        const distance = L.latLng(this.userLocation[0], this.userLocation[1]).distanceTo(L.latLng(stationCoords[0], stationCoords[1]));
        if (distance < minStationDistance) {
          minStationDistance = distance;
          closestStation = stationCoords;
        }
      } else {
        console.error('Coordenadas de estação inválidas ou dados não habilitados para:', station);
      }
    });

    let closestPluviometer = null;
    let minPluviometerDistance = Number.MAX_SAFE_INTEGER;
    this.pluviometers.forEach((pluviometer) => {
      const pluviometerCoords = pluviometer.Location.Coordinates;
      if (pluviometerCoords && pluviometerCoords.length === 2 && pluviometer.Enable && pluviometer.Precipitation !== null && pluviometer.Precipitation !== undefined) {
        const distance = L.latLng(this.userLocation[0], this.userLocation[1]).distanceTo(L.latLng(pluviometerCoords[0], pluviometerCoords[1]));
        if (distance < minPluviometerDistance) {
          minPluviometerDistance = distance;
          closestPluviometer = pluviometerCoords;
        }
      } else {
        console.error('Coordenadas do pluviômetro inválidas ou dados não habilitados para:', pluviometer);
      }
    });

    if (closestStation) {
      this.stationPolyline = L.polyline([this.userLocation, closestStation], {
        color: '#EF760F',
        weight: 1,
        dashArray: '4,4',
      }).addTo(this.map);
      console.log('Polyline traçada para a estação mais próxima:', closestStation);
    } else {
      console.log('Nenhuma estação próxima encontrada');
    }

    setTimeout(() => {
      if (closestPluviometer) {
        this.pluviometerPolyline = L.polyline([this.userLocation, closestPluviometer], {
          color: '#9023A1',
          weight: 1,
          dashArray: '4,4',
        }).addTo(this.map);
        console.log('Polyline traçada para o pluviômetro mais próximo:', closestPluviometer);
      } else {
        console.log('Nenhum pluviômetro próximo encontrado');
      }
    }, 500);
    }
  }
};
</script>

<style>
.map-container {
  height: 60vh;
}

.leaflet-control-attribution {
  display: none;
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

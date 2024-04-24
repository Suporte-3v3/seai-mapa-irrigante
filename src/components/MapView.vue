<template>
  <div
    ref="map"
    class="map-container"
  />
</template>

<script>
import L from 'leaflet';
import { data as ceara_data } from '/Users/Naylton 3v3/Documents/seai-mapa-irrigante/src/cearaGeojson'

export default {
  name: 'MapView',
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
      // Criar o mapa
      this.map = L.map(this.$refs.map); // Não defina uma visualização padrão aqui

      // Adicionar camada de tile do OpenStreetMap
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: 'SEAI - Irrigante'
      }).addTo(this.map);

      // Adicionar o GeoJSON ao mapa
      const geojsonLayer = L.geoJSON(ceara_data, {
        onEachFeature: this.onEachFeature,
        style: function(feature) {
        return {color: "#1b3f82", // cor do traçado
            weight: 0.5, // largura do traçado
            opacity: 1, // opacidade do traçado
            fillOpacity: 0.2 // opacidade do preenchimento};
    };
  }
      }).addTo(this.map);

      // Ajustar o mapa para focar na área coberta pelo GeoJSON
      this.map.fitBounds(geojsonLayer.getBounds());

      // Ocultar apenas a atribuição do Leaflet
      const attributionControl = this.map.attributionControl;
      if (attributionControl) {
        const attributionElement = attributionControl.getContainer();
        if (attributionElement) {
          const leafletAttribution = attributionElement.querySelector('.leaflet-control-attribution.leaflet-control');
          if (leafletAttribution) {
            leafletAttribution.style.display = 'none';
          }
        }
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
    
          // Centralizar o mapa na localização do usuário
          this.map.setView([latitude, longitude], 7);
    
          // Adicionar marcador na localização do usuário
         /* L.marker([latitude, longitude]).addTo(this.map)*/
            /*.bindPopup('Você está aqui.')*/
            /*.openPopup();*/
        }, error => {
          console.error('Erro ao obter a localização do usuário:', error);
        });
      } else {
        console.error('Geolocalização não é suportada neste navegador.');
      }
    
      // Ajustar o tamanho do mapa para a tela
      this.handleResize();
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
</style>

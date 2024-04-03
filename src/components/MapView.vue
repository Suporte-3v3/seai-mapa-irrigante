<template>
    <div
      ref="map"
      class="map-container"
    />
  </template>
    
    <script>
    import L from 'leaflet';
    
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
          this.map = L.map(this.$refs.map).setView([0, 0], 2); // Defina uma visualização padrão
    
          // Adicionar camada de tile do OpenStreetMap
          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: 'SEAI - Irrigante | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);
  
          // Tentar obter a localização do usuário
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
              const { latitude, longitude } = position.coords;
    
              // Centralizar o mapa na localização do usuário
              this.map.setView([latitude, longitude], 13);
    
              // Adicionar marcador na localização do usuário
              L.marker([latitude, longitude]).addTo(this.map)
                .bindPopup('Você está aqui')
                .openPopup();
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
        }
      }
    };
    </script>
    
    <style scoped>
.map-container {
  height: 60vh; /* Define a altura do mapa para ocupar 70% da altura da tela */
}
</style>
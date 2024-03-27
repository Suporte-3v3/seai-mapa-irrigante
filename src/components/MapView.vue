<template>
    <div ref="map" class="map-container"></div>
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
        setTimeout(() => {
          this.map.invalidateSize();
        }, 100);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos para o contêiner do mapa */
  .map-container {
    position: fixed; /* Define a posição fixa */
    top: 0; /* Alinha o topo */
    left: 0; /* Alinha a esquerda */
    bottom: 0; /* Alinha a parte inferior */
    width: 40%; /* Largura desejada */
  }
  
  /* Remover margens e preenchimentos do corpo da página e esconder a barra de rolagem */
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  
  /* Estilos para o restante da página (lado direito) */
  .page-content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 40%; /* Largura do mapa */
    overflow-y: auto; /* Adicione rolagem vertical apenas ao lado direito, se necessário */
  }
  </style>
  
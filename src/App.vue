<template>
  <div id="app">
    <div class="map-container">
      <!-- Componente do mapa -->
      <MapView />
    </div>
    <div class="tab-container">
      <!-- Componente de tab -->
      <TabComponent />
    </div>
  </div>
</template>

<script>
import MapView from './components/MapView.vue'; // Importe o componente do mapa
import TabComponent from './components/TabComponent.vue'; // Importe o componente de tab

export default {
  name: 'App',
  components: {
    MapView,
    TabComponent
  }
};
</script>

<style>
/* Estilos para o contêiner do mapa */
.map-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 60%; /* Largura do mapa */
}

/* Estilos para o contêiner da tab */
.tab-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 60%; /* Largura da tab */
  background-color: #f0f0f0; /* Cor de fundo opcional */
  overflow-y: auto; /* Adicione rolagem vertical, se necessário */
}
</style>

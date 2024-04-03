<template>
  <div id="app">
    <div class="map-container">
      <MapView />
    </div>
    <div class="form-container">
      <TabComponent />
    </div>
  </div>
</template>

<script>
import MapView from './components/MapView.vue';
import TabComponent from './components/TabComponent.vue';

export default {
  name: 'App',
  components: {
    MapView,
    TabComponent
  }
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Faz o contêiner ocupar 100% da altura da viewport */
}

.map-container {
  flex: 1; /* Ocupa todo o espaço restante na vertical */
}

.form-container {
  height: 50%; /* Define a altura do formulário para ocupar 50% da altura da viewport */
  display: flex;
  justify-content: center; /* Centraliza o conteúdo do formulário verticalmente */
  align-items: center; /* Centraliza o conteúdo do formulário horizontalmente */
}
</style>

<template>
  <div id="app">
    <nav class="navbar">
      <div class="navbar-brand">
        <strong style="font-family: apple-system; font-size: 24px; color: #003c66; font-weight: bold;">SEAI - IRRIGANTE</strong>
      </div>
      <div class="user-info">
        <img src="/icones/user-icon.png" alt="user icon" class="user-icon">
        <span class="user-name" style="color: #527bff;">admin</span>
      </div>
    </nav>
    <MapView />
    <TabComponent />
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
/* Removendo espaçamento padrão do corpo da página */
body {
  margin: 0;
  padding: 0;
}

.navbar {
  background-color: #fff; /* Cor de fundo branca */
  border-bottom: 1px solid #ccc; /* Borda na parte inferior */
  display: flex;
  justify-content: space-between; /* Distribui os elementos horizontalmente */
  align-items: center; /* Centraliza verticalmente os elementos */
}

.navbar-brand {
  padding: 10px 20px; /* Espaçamento interno */
}

.user-info {
  display: flex;
  align-items: center; /* Centraliza verticalmente os elementos */
  margin-right: 20px; /* Espaço à direita */
}

.user-icon {
  width: 30px; /* Largura da figurinha do usuário */
  height: 30px; /* Altura da figurinha do usuário */
  margin-right: 10px; /* Espaço à direita */
}

.user-name {
  color: #527bff; /* Cor do nome do usuário */
  font-weight: bold;
}
</style>

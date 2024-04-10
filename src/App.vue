<template>
  <div id="app">
    <nav class="navbar">
      <div class="navbar-brand">
        <strong style="font-family: Scorno Semi Bold, sans-serif; font-size: 24px; color: #003c66; font-weight: bold;">SEAI - IRRIGANTE</strong>
      </div>
      <div class="user-info">
        <span class="user-name" style="color: #527bff; font-family: Scorno Semi Bold, sans-serif; font-weight: bold">admin</span>
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
/* Estilos para dispositivos maiores */
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

/* Estilos para dispositivos menores */
@media screen and (max-width: 768px) {
  .navbar {
    flex-direction: column; /* Altera a direção do flex para empilhar em coluna */
  }

  .user-info {
    margin-right: 0; /* Remove o espaço à direita */
    margin-top: 10px; /* Adiciona um espaço superior */
  }
}
</style>

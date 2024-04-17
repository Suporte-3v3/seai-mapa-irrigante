<template>
  <div id="app">
    <nav class="navbar">
      <div class="navbar-content">
        <strong class="navbar-brand">SEAI IRRIGANTE</strong>
      </div>
      <div class="tabs">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{ 'tab-button': true, active: activeTab === index }"
          @click="changeTab(index)"
        >
          {{ tab }}
        </div>
      </div>
    </nav>
    <div v-show="activeTab === 0">
      <MapView />
      <div class="recomendation-container">
        <RecomendationComponent />
      </div>
    </div>
    <div v-show="activeTab === 1">
      <NewsComponent />
    </div>
    <div v-show="activeTab === 2">
      <FaqComponent />
    </div>
  </div>
</template>

<script>
import MapView from './components/MapView.vue';
import RecomendationComponent from './components/RecomendationComponent.vue';
import NewsComponent from './components/NewsComponent.vue';
import FaqComponent from './components/FaqComponent.vue';


export default {
  name: 'App',
  components: {
    MapView,
    RecomendationComponent,
    NewsComponent,
    FaqComponent
    // Adicione outros componentes aqui conforme necessário
  },
  data() {
    return {
      activeTab: 0,
      tabs: ['💧 Lâmina', '📰 Notícias', '💬 FAQ', '👥 Login']
    };
  },
  methods: {
    changeTab(index) {
      this.activeTab = index;
    }
  }
};
</script>

<style scoped>
body {
  background-color: #bdc1c3 !important;
}
.navbar {
  background-color: #007bff;
  border: none;
  border-radius: 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  font-family: Scorno Semi Bold, sans-serif;
  font-size: 24px;
  color: #fff;
  font-weight: bold;
}

.tabs {
  display: flex;
}

.tab-button {
  cursor: pointer;
  padding: 10px;
  margin-left: 10px;
  border: 0px solid #fff;
  border-radius: 10px;
  font-size: 18px;
  font-family: "Scorno Semi Bold", sans-serif;
  font-weight: bold;
  color: #fff; /* Cor do texto dos tabs */
  text-align: center; /* Centraliza o texto horizontalmente */
}

.tab-button.active {
  background-color: #fff;
  color: #007bff; /* Cor do texto dos tabs quando ativo */
}

.recomendation-container {
  padding: 20px;
}
</style>

<template>
  <div class="tab-container">
    <div class="tabs">
      <div v-for="(tab, index) in tabs" :key="index" @click="changeTab(index)" :class="{ active: activeTab === index }">{{ tab }}</div>
    </div>
    <div v-show="activeTab === 0"> <!-- Recomendação de Lâmina -->
      <RecomendacaoComponent />
    </div>
    <div v-show="activeTab === 1"> <!-- Notícias -->
      <!-- Coloque o conteúdo da tab Notícias aqui -->
    </div>
    <div v-show="activeTab === 2"> <!-- Ajuda -->
      <!-- Coloque o conteúdo da tab Ajuda aqui -->
    </div>
    <div v-show="activeTab === 3"> <!-- Ajustes -->
      <!-- Coloque o conteúdo da tab Ajustes aqui -->
    </div>
  </div>
</template>

<script>
/*import RecomendacaoComponent from './RecomendacaoComponent.vue'; */

export default {
  /*name: 'TabComponent',*/
  components: {
    /*RecomendacaoComponent*/
  },
  data() {
    return {
      activeTab: 0,
      tabs: ['💧 Recomendação de Lâmina', '📰 Notícias', '📍 Ajuda', ' ⚙️ Ajustes']
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
.tabs div {
  flex: 1; /* Ocupa todo o espaço disponível horizontalmente */
  cursor: pointer;
  padding: 15px 50px 15px 50px; /* Reduzindo o espaçamento interno */
  border: 2px solid #ccc;
  border-radius: 10px;
  text-align: center; /* Centraliza o texto horizontalmente */
}

.tab-container {
  display: flex;
  flex-direction: column;
  height: 40vh; /* Ocupa toda a altura do pai (App.vue) */
}

.tabs {
  display: flex;
}

.tab-content {
  flex: 1; /* Ocupa todo o espaço disponível verticalmente */
  overflow-y: auto; /* Adiciona uma barra de rolagem se o conteúdo for maior que a tela */
}
</style>
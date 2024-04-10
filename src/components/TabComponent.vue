<template>
  <div class="tab-container">
    <div class="tabs">
      <div v-for="(tab, index) in tabs" :key="index" @click="changeTab(index)" :class="{ 'tab-button': true, active: activeTab === index }">{{ tab }}</div>
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
import RecomendacaoComponent from './RecomendacaoComponent.vue';

export default {
  name: 'TabComponent',
  components: {
    RecomendacaoComponent
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
.tabs {
  display: flex;
}

.tab-button {
  flex: 1; /* Ocupa todo o espaço disponível horizontalmente */
  cursor: pointer;
  padding: 15px 50px; /* Ajusta o espaçamento interno */
  border: 1px solid #007bff; /* Define a cor da borda */
  border-radius: 10px;
  text-align: center; /* Centraliza o texto horizontalmente */
  font-size: 18px; /* Ajusta o tamanho do texto */
  font-family: "Scorno Semi Bold", sans-serif; /* Define a fonte */
  font-weight: bold; /* Deixa o texto em negrito */
  transition: background-color 0.3s, box-shadow 0.3s; /* Adiciona transição suave */
}

.tab-button.active {
  background-color: #007bff; /* Altera a cor de fundo quando o tab está ativo */
  color: #fff; /* Altera a cor do texto quando o tab está ativo */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Adiciona uma sombra sutil */
}

.tab-container {
  display: flex;
  flex-direction: column;
  height: 40vh; /* Ocupa toda a altura do pai (App.vue) */
}

.tab-content {
  flex: 1; /* Ocupa todo o espaço disponível verticalmente */
  overflow-y: auto; /* Adiciona uma barra de rolagem se o conteúdo for maior que a tela */
}
</style>

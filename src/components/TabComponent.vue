<template>
  <div class="tab-component">
    <div class="tab-header">
      <div class="tab-buttons">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{ active: selectedTab === index }"
          @click="selectTab(index)"
        >
          {{ tab.title }}
        </button>
      </div>
      <div class="tab-line" />
    </div>
    <div class="tab-content">
      <div
        v-for="(tab, index) in tabs"
        v-show="selectedTab === index"
        :key="index"
      >
        <template v-if="index === 0">
          <!-- Verifica se é a aba 'Recomendação de Lâmina' -->
          <RecomendacaoComponent />
        </template>
        <template v-else>
          {{ tab.content }}
        </template>
      </div>
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
        selectedTab: 0, // Índice da aba selecionada
        tabs: [
          { title: '💧 Recomendação de Lâmina', content: '' },
          { title: '📰 Notícias', content: '' },
          { title: '💬 Ajuda', content: '' },
          { title: '⚙️ Ajustes', content: '' }
          // Adicione mais abas conforme necessário
        ]
      };
    },
    methods: {
      selectTab(index) {
        this.selectedTab = index;
      }
    }
  };
  </script>
  
  <style scoped>
/* Estilos para o componente de tab */
.tab-component {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white; /* Defina o fundo como branco */
}

.tab-header {
  display: flex;
  flex-direction: column;
}

.tab-buttons {
  display: flex;
  justify-content: space-around; /* Justifica os botões */
}

.tab-buttons button {
  padding: 10px;
  margin-right: 10px;
  background-color: white; /* Defina o fundo como branco */
  border: none;
  cursor: pointer;
  font-size: 18px; /* Tamanho da fonte */
}

.tab-buttons button.active {
  background-color: #ccc; /* Altere a cor de fundo da aba ativa */
}

.tab-buttons button:focus {
  outline: none;
}

.tab-line {
  height: 0.1px;
  width: 100%;
  background-color: #e2e8f0; /* Cor da linha de grade */
}
</style>

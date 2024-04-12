<template>
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
</template>

<script>
export default {
  name: 'TabComponent',
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
  margin-right: 20px; /* Adicione margem à direita para criar espaço entre as tabs e o nome "SEAI - IRRIGANTE" */
}

.tab-button {
  flex: 0 1 auto; /* Ajusta a largura automática dos botões das tabs */
  cursor: pointer;
  padding: 15px 20px; /* Reduz o espaçamento interno dos botões das tabs */
  margin-right: 10px; /* Adicione margem à direita para separar os botões */
  border: 1px solid #007bff;
  border-radius: 10px;
  text-align: center;
  font-size: 18px;
  font-family: "Scorno Semi Bold", sans-serif;
  font-weight: bold;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.tab-button.active {
  background-color: #007bff;
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

*/
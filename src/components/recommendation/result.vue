<template>
  <div class="results">
    <h3>Resultados</h3>
    <ul v-if="results">
      <li>Etc: {{ results.Etc }}</li>
      <li>Lâmina de Reposição: {{ results.RepositionBlade }}</li>
      <li>Tempo de Irrigação: {{ results.IrrigationTime }}</li>
      <li>Dias da Cultura: {{ results.CropDays }}</li>
      <li>ET0: {{ results.Et0 }}</li>
      <li>Precipitação: {{ results.Precipitation }}</li>
      <li>Kc: {{ results.Kc }}</li>
    </ul>
    <div v-else>Carregando resultados...</div>
  </div>
</template>

<script>
export default {
  name: "Resultados",
  props: {
    results: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: #eff4f7;
}
.result {
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
    font-size: 1.1em;
    background-color: #f8f9fa;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  li strong {
    color: #1b3f82;
  }
}
</style>

<template>
  <div>
    <h3>Resultados</h3>
    <ul>
      <li>Etc: {{ results.Etc }}</li>
      <li>Lâmina de Reposição: {{ results.RepositionBlade }}</li>
      <li>Tempo de Irrigação: {{ results.IrrigationTime }}</li>
      <li>Dias da Cultura: {{ results.CropDays }}</li>
      <li>ET0: {{ results.Et0 }}</li>
      <li>Precipitação: {{ results.Precipitation }}</li>
      <li>Kc: {{ results.Kc }}</li>
    </ul>
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

<style>
body {
  background-color: #eff4f7; /* Cor de fundo desejada */
}

.input-group-append {
  margin-right: 0px;
}

.checkbox-margin {
  margin-right: 8px; /* ou o valor que desejar */
}

.card {
    border-radius: 10px;
  }
  .list-group-item {
    font-size: 1.1em;
    background-color: #f8f9fa;
  }
  .list-group-item strong {
    color: #1b3f82;
  }
  .btn {
    font-size: 1.2em;
  }
  .shadow {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
</style>
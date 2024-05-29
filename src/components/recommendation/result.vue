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
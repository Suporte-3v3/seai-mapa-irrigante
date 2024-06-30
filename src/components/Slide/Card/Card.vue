<template>
  <div class="slide-card">
    <div class="slide-header d-flex justify-content-between">
      <h6>{{ card.title }}</h6>
      <div>
        <Checkbox v-model="card.selected" :binary="true" />
      </div>
    </div>
    <div class="slide-body">
      <div
        v-for="(body, i) in bodies"
        :key="i"
        class="d-flex justify-content-between"
      >
        <p>{{ body.title }}</p>
        <p>
          <strong>{{ body.item }}</strong>
        </p>
      </div>
    </div>
    <div class="slide-buttons d-flex flex-column gap-2">
      <Button class="btn-primary" label="Ver Recomendações"></Button>
      <Button
        class="btn-secondary"
        label="Editar"
        @click="onEditItem(card)"
      ></Button>
      <Button
        class="btn-danger"
        label="Excluir"
        @click="onDeleteItem(card.id)"
      ></Button>
    </div>
  </div>
</template>
<script>
export default {
  name: "SlideCardComponent",
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  emits: ["onDeleteItem", "onEditItem"],
  data() {
    return {
      bodies: [],
    };
  },
  mounted() {
    this.bodies = [
      {
        title: "Data de plantio: ",
        item: this.card.date,
      },
      {
        title: "Sistema de irrigação: ",
        item: this.card.system,
      },
      {
        title: "Cultura: ",
        item: this.card.title,
      },
      {
        title: "Data de criação: ",
        item: this.card.createdAt,
      },
    ];
  },
  methods: {
    onDeleteItem(id) {
      console.log(id);
      this.$emit("onDeleteItem", id);
    },
    onEditItem(item) {
      console.log(item);
      this.$emit("onEditItem", item);
    },
  },
};
</script>
<style lang="scss" scoped>
.slide-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24%;

  height: 374px;
  border: 1px solid #a1b5d8;
  border-radius: 9px;
  padding: 15px;
  .slide-header {
    color: #1b3f82;
    font-weight: 500;
  }
  .slide-body {
    p {
      margin-top: -10px;
      font-size: 14px;
    }
  }
}
@media (max-width: 1400px) {
  .slide-card {
    width: 32%;
  }
}
@media (max-width: 1200px) {
  .slide-card {
    min-width: 250px;
    width: 32%;
  }
}
@media (max-width: 990px) {
  .slide-card {
    width: 48.5%;
  }
}
@media (max-width: 768px) {
  .slide-card {
    min-width: 302px;
    width: 100%;
  }
}
</style>

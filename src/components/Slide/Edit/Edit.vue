<template>
  <div class="background-black">
    <div class="edit-form">
      <form @submit.prevent="onSaveItem" class="w-100 d-flex flex-column">
        <div class="w-100 d-flex justify-content-center">
          <h5>Editando {{ card.title }}</h5>
        </div>
        <div
          class="form-group form-group-text text-left p-float-label w-100 mt-4"
        >
          <InputText id="login" v-model="cards.title" class="w-100" required />
          <label for="login" class="font-weight-bold">Nome </label>
        </div>

        <div
          class="form-group form-group-text text-left mt-4 w-100 d-flex gap-2"
        >
          <Button
            label="Cancelar"
            class="w-50 btn-danger"
            @click="onCloseEditMode"
          />
          <Button label="Salvar" type="submit" class="w-50 btn-primary" />
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "SlideEditComponent",
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  emits: ["onSaveItem", "onCloseEditMode"],
  data() {
    return {
      cards: {},
    };
  },
  mounted() {
    this.cards = this.card;
  },
  methods: {
    onSaveItem(cards) {
      this.$emit("onSaveItem", cards);
    },
    onCloseEditMode() {
      this.$emit("onCloseEditMode");
    },
  },
};
</script>
<style lang="scss" scoped>
.background-black {
  background-color: rgba(0, 0, 0, 0.411);
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: end;
  .edit-form {
    background-color: white;
    width: 360px;
    height: 100vh;
    padding: 10px;
    h5 {
      color: #1b3f82;
    }
  }
}
</style>

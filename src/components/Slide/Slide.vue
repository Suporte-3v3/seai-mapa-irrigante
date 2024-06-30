<template>
  <EditCard
    v-if="currentCard"
    :card="currentCard"
    @onCloseEditMode="currentCard = null"
    @onSaveItem="editItem"
  />
  <div class="container content d-flex justify-content-between">
    <h4>Lâminas cadastradas</h4>
    <div class="d-flex gap-3">
      <Button
        class="btn-danger"
        title="Remover lâminas selecionadas"
        icon="pi pi-trash"
        @click="verifySelected()"
      >
      </Button>
      <Button class="btn-primary" label="Adicionar Lâmina" icon="pi pi-plus">
      </Button>
    </div>
  </div>
  <div
    class="container d-flex justify-content-center align-items-center spinner"
    v-if="loading"
  >
    <ProgressSpinner />
  </div>
  <div class="container mt-4 faq d-flex gap-3 flex-wrap" v-if="!loading">
    <SlideCard
      v-for="(card, i) in cards"
      :key="i"
      :card="card"
      @onDeleteItem="confirmDelete"
      @onEditItem="openEditMode"
    />
  </div>
  <div class="more container mt-4 faq d-flex gap-3 justify-content-center pb-4">
    <ProgressSpinner v-if="loadingMore" />

    <Button v-else class="btn-simple" label="Mostrar mais" @click="showMore">
    </Button>
  </div>
  <ConfirmDialog />
</template>

<script>
import SlideCard from "./Card/Card.vue";
import EditCard from "./Edit/Edit.vue";
import { toast } from "vue3-toastify";
import { useConfirm } from "primevue/useconfirm";

export default {
  name: "SlideComponent",
  components: { SlideCard, EditCard },
  data() {
    return {
      loading: false,
      loadingMore: false,
      cards: [
        {
          id: 1,
          title: "Cultura 1",
          date: "29/05/2024",
          system: "Aspergão",
          createdAt: "28/05/2024",
          selected: false,
        },
        {
          id: 2,
          title: "Cultura 2",
          date: "30/05/2024",
          system: "Fungicida",
          createdAt: "29/05/2024",
          selected: true,
        },
        {
          id: 3,
          title: "Cultura 3",
          date: "31/05/2024",
          system: "Bactérias",
          createdAt: "30/05/2024",
          selected: false,
        },
        {
          id: 4,
          title: "Cultura 4",
          date: "01/06/2024",
          system: "Micorrizas",
          createdAt: "31/05/2024",
          selected: true,
        },
        {
          id: 5,
          title: "Cultura 5",
          date: "02/06/2024",
          system: "Algas",
          createdAt: "01/06/2024",
          selected: false,
        },
        {
          id: 6,
          title: "Cultura 6",
          date: "03/06/2024",
          system: "Protozoários",
          createdAt: "02/06/2024",
          selected: false,
        },
        {
          id: 7,
          title: "Cultura 7",
          date: "04/06/2024",
          system: "Leveduras",
          createdAt: "03/06/2024",
          selected: true,
        },
        {
          id: 8,
          title: "Cultura 8",
          date: "05/06/2024",
          system: "Vírus",
          createdAt: "04/06/2024",
          selected: false,
        },
      ],
      currentCard: null,
      confirm: useConfirm(),
    };
  },
  mounted() {},
  methods: {
    verifySelected() {
      const total = this.cards.filter((card) => card.selected).length;
      if (total > 0) {
        const msg =
          total > 1
            ? "Lâminas selecionadas serão deletadas. Este processo não poderá ser desfeito!"
            : "Lâmina selecionada será deletada. Este processo não poderá ser desfeito!";
        this.confirmDelete(-1, msg);
      } else {
        toast.warning("Nenhuma lâmina selecionada!");
      }
    },
    removeSelected() {
      this.loading = true;
      this.cards = this.cards.filter((card) => !card.selected);
      setTimeout(() => {
        toast.success("Lâminas removidas!");

        this.loading = false;
      }, 200);
    },
    showMore() {
      this.loadingMore = true;

      setTimeout(() => {
        this.cards.push({
          id: this.cards.length + 1,
          title: "Cultura 10",
          date: "07/06/2024",
          system: "Actinomicetos",
          createdAt: "06/06/2024",
          selected: false,
        });
        this.loadingMore = false;
      }, 1000);
    },
    confirmDelete(
      id = -1,
      message = "Lâmina selecionada será deletada. Este processo não poderá ser desfeito!"
    ) {
      this.confirm.require({
        message: message,
        header: "Confirmar deleção",
        icon: "pi pi-exclamation-triangle",
        rejectClass: "p-button-secondary p-button-outlined",
        acceptClass: "btn-danger",
        rejectLabel: "Cancelar",
        acceptLabel: "Deletar",
        accept: () => {
          if (id > 0) {
            this.deleteItem(id);
          } else {
            this.removeSelected();
          }
        },
      });
    },
    deleteItem(id) {
      this.loading = true;
      this.cards = this.cards.filter((card) => card.id != id);
      setTimeout(() => {
        toast.success("Lâmina removida!");

        this.loading = false;
      }, 200);
    },
    openEditMode(item) {
      this.currentCard = item;
    },
    editItem(editedCard) {
      this.loading = true;
      this.currentCard = null;
      const index = this.cards.findIndex((card) => card.id === editedCard.id);
      if (index !== -1) {
        this.cards.splice(index, 1, editedCard);
      }
      setTimeout(() => {
        toast.success("Alteração feita com sucesso!");
        this.loading = false;
      }, 200);
    },
  },
};
</script>
<style lang="scss" scoped>
.spinner {
  margin-top: 100px;
}
.content {
  margin-top: 100px;
  color: #1b3f82;
}
.more {
  button {
    color: #002040;
  }
}
</style>

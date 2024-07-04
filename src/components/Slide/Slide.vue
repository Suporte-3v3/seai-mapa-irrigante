<template>
  <EditCard
    v-if="currentCard"
    :card="currentCard"
    :service="service"
    @onCloseEditMode="currentCard = null"
    @onSaveItem="editItem"
  />
  <div class="container content d-flex justify-content-between">
    <h4>Lâminas cadastradas</h4>
    <div class="d-flex gap-3">
      <Button
        class="btn-primary"
        label="Adicionar Lâmina"
        icon="pi pi-plus"
        @click="openEditMode(defaultCard)"
      >
      </Button>
    </div>
  </div>
  <div
    class="container d-flex justify-content-center align-items-center spinner"
    v-if="loading"
  >
    <ProgressSpinner />
  </div>
  <div class="container mt-4 faq d-flex gap-3 flex-wrap pb-4" v-if="!loading">
    <div v-if="cards.length === 0">Nenhuma lâmina cadastrada!</div>
    <SlideCard
      v-else
      v-for="(card, i) in cards"
      :key="i"
      :card="card"
      @onDeleteItem="confirmDelete"
      @onEditItem="openEditMode"
    />
  </div>
  <!-- <div class="more container mt-4 faq d-flex gap-3 justify-content-center pb-4">
    <ProgressSpinner v-if="loadingMore" />

    <Button v-else class="btn-simple" label="Mostrar mais" @click="showMore">
    </Button>
  </div> -->
  <ConfirmDialog />
</template>

<script>
import SlideCard from "./Card/Card.vue";
import EditCard from "./Edit/Edit.vue";
import { toast } from "vue3-toastify";
import { useConfirm } from "primevue/useconfirm";
import { SlideRest } from "../../services/slide.service";

export default {
  name: "SlideComponent",
  components: { SlideCard, EditCard },
  data() {
    return {
      loading: false,
      loadingMore: false,
      service: new SlideRest(),
      currentCard: null,
      confirm: useConfirm(),
      cards: [],
      defaultCard: {
        Name: "",
        System: {
          Type: "Aspersão",
          Measurements: {
            Precipitation: 1,
          },
        },
        CropId: null,
        PlantingDate: null,
        Pluviometer: {
          Id: null,
        },
        Station: {
          Id: null,
        },
      },
    };
  },
  mounted() {
    this.getAll();
  },
  methods: {
    getAll() {
      this.loading = true;
      this.service
        .getAll()
        .then((response) => {
          this.cards = response.data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
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
      console.log(id);
      this.service
        .deleteById(id)
        .then(() => {
          this.cards = this.cards.filter((card) => card.Id != id);
          toast.success("Lâmina removida!");
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    openEditMode(item) {
      this.currentCard = item;
    },
    editItem(editedCard) {
      this.loading = true;

      if (editedCard.Id) {
        this.service
          .update(editedCard.Id, editedCard)
          .then(() => {
            this.getAll();
          })
          .finally(() => {
            this.loading = false;
            this.currentCard = null;
          });
      } else {
        this.service
          .create(editedCard)
          .then(() => {
            this.getAll();
          })
          .finally(() => {
            this.loading = false;
            this.currentCard = null;
          });
      }
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

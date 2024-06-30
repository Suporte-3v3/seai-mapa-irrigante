<template>
  <div class="background-black">
    <div class="save-modal d-flex justify-content-center align-items-center">
      <div
        v-if="loading"
        class="d-flex justify-content-center flex-column gap-4"
      >
        <ProgressSpinner />
        <h3>Salvando...</h3>
      </div>
      <div
        v-else
        class="d-flex justify-content-center align-items-center flex-column gap-4 w-75"
      >
        <div
          class="header-login d-flex justify-content-center align-items-center gap-3 mt-8"
        >
          <i class="pi pi-info-circle" style="font-size: 30px"></i>
          <p>É necessário está logado para salvar recomendação de lâmina!</p>
        </div>

        <Login @on-confirm-login="verifyToken" />
      </div>
    </div>
  </div>
</template>
<script>
import Login from "../../Login/Login.vue";
import { SlideRest } from "../../../services/slide.service";
import { toast } from "vue3-toastify";
export default {
  name: "SaveModalComponent",
  components: {
    Login,
  },
  props: {
    results: {
      type: Object,
      required: true,
    },
  },
  emits: ["onCloseModal"],
  data() {
    return {
      bodies: [],
      loading: false,
      service: new SlideRest(),
    };
  },
  mounted() {
    this.verifyToken();
  },
  methods: {
    createBlade() {
      const [day, month, year] = this.results.PlantingDate.split("/");
      this.results.PlantingDate = new Date(`${year}-${month}-${day}`);
      this.service.create(this.results).then(() => {
        setTimeout(() => {
          toast.success("Lâmina salva sucesso!");
          this.closeModal();
        }, 1000);
      });
    },
    verifyToken() {
      const tkn = window.localStorage.getItem("tkn");
      if (tkn) {
        this.loading = true;
        setTimeout(() => {
          this.createBlade();
        }, 200);
      } else {
        this.loading = false;
      }
    },
    closeModal() {
      this.$emit("onCloseModal");
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
  z-index: 10002;
  display: flex;
  justify-content: center !important;
  align-items: center !important;
  .save-modal {
    background-color: white;
    min-width: 400px;
    min-height: 400px;
    border-radius: 8px;
    padding: 8px;
  }
}
.header-login {
  width: 300px;
  margin-top: 20px;
  margin-bottom: -60px;
  color: red;
  p {
    font-size: 12px;
    margin-top: 15px;
  }
}
</style>

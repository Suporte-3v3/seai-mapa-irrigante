<template>
  <div class="container content title-settings">
    <h4>Configurações</h4>
  </div>
  <div
    class="container d-flex justify-content-center align-items-center spinner"
    v-if="loading"
  >
    <ProgressSpinner />
  </div>
  <div class="container mt-4 d-flex flex-column gap-5" v-if="!loading">
    <Email />
    <Equipments />

    <!-- <div class="d-flex flex-column gap-4 ">
      <h5>Sair da conta</h5>
      <Button
        class="btn-danger"
        style="width: 120px"
        icon="pi pi-sign-out"
        label="Sair"
        @click="logout()"
      ></Button>
    </div> -->
  </div>
</template>

<script>
import { SettingsRest } from "@/services/settings.service";
import Equipments from "./Equipments.vue";
import Email from "./Email.vue";
export default {
  name: "SettingsComponent",
  components: {
    Equipments,
    Email
  },
  data() {
    return {
      loading: false,
      service: new SettingsRest(),
      equipments: [],
      faqs: [],
      params: {
        pageNumber: 1,
        limit: 100,
        id_category: 0,
      },
    };
  },
  mounted() {},
  methods: {
    logout() {
      localStorage.removeItem("tkn");
      location.href = "#/login";
    },
  },
};
</script>
<style lang="scss" scoped>
.spinner {
  margin-top: 100px;
}
.title-settings {
  margin-top: 100px;
  color: #1b3f82;
  padding-bottom: 10px;
  border-bottom: 1px solid #1B3F821C;

}
</style>

<template>
  <div class="background">
    <div class="container-fluid login d-flex h-100">
      <div class="login-content">
        <TabView
          :pt="{
            inkbar: () => ({
              id: 'myPanelHeader',
              style: {
                'background-color': '#99BDFF00',
              },
            }),
          }"
          v-model:activeIndex="activeTab"
        >
          <TabPanel header="Recuperação de senha">
            <ResetPasswordComponent />
          </TabPanel>
        </TabView>
      </div>
    </div>
  </div>
</template>

<script>
import { ref} from "vue";
import ResetPasswordComponent from "../../components/ResetPassword/ResetPassword.vue";

export default {
  name: "ResetPassword",
  components: { ResetPasswordComponent },
  setup() {
    const activeTab = ref(0);
    return {
      activeTab,
    };
  },
};
</script>

<style lang="scss">
.background {
  height: 100vh;
  background: linear-gradient(180deg, #1b3f82 0%, #112549 100%);
}
.login {
  justify-content: center;
  align-items: center;
}
.login-content {
  background-color: white;
  width: 30vw;
  max-width: 728px;
  min-height: 500px;
  min-width: 360px;
}
</style>

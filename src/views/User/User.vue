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
          @tab-change="onTabChange"
        >
          <TabPanel header="Entrar">
            <Login></Login>
          </TabPanel>
          <TabPanel header="Cadastrar">
            <Register></Register>
          </TabPanel>
        </TabView>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Login from "../../components/Login/Login.vue";
import Register from "../../components/Register/Register.vue";

export default {
  name: "User",
  components: { Login, Register },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const activeTab = ref(0);

    onMounted(() => {
      const type = route.params.type;

      if (type === "register") {
        activeTab.value = 1;
      } else {
        activeTab.value = 0; // Default to login if type is not recognized
      }
    });

    const onTabChange = (e) => {
      console.log("mudou");
      const selectedTab = e.index === 1 ? "register" : "login";
      router.push({ name: "login", params: { type: selectedTab } });
    };

    return {
      activeTab,
      onTabChange,
    };
  },
};
</script>

<style lang="scss">
.background {
  height: 100vh;
  background: linear-gradient(180deg, #1b3f82 0%, #112549 100%);
  min-height: 700px;
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

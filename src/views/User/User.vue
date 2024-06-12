<template>
    <div
      class="container-fluid mt-5 login d-flex h-100"
    >
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
  </template>
<script>
import Login from "../../components/Login/Login.vue"
import Register from "../../components/Register/Register.vue"
export default {
  name: "User",
  components: { Login, Register},
  data() {
    return {
      titles: ["Entrar", "Cadastrar"],
    };
  },
};
</script>


<style lang="scss">
.login {
  height: 94.7vh !important;
  background: linear-gradient(180deg, #1b3f82 0%, #112549 100%);
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

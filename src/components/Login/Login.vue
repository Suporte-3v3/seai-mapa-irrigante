<template>
  <div
    class="w-100 d-flex justify-content-center align-items-center flex-column"
  >
    <form @submit.prevent="login" class="w-50 d-flex flex-column">
      <div class="form-group form-group-text text-left p-float-label w-full">
        <InputText id="login" v-model="profile.login" class="w-100" required />
        <label for="login" class="font-weight-bold">Email ou Username*</label>
        <small v-if="submitted && !profile.login" class="p-error">{{
          requiredField
        }}</small>
      </div>

      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-100"
      >
        <Password
          id="password"
          v-model="profile.password"
          class="w-100"
          required
          toggleMask
          :feedback="false"
        />
        <label for="password" class="font-weight-bold">Senha*</label>
        <small v-if="submitted && !profile.password" class="p-error">{{
          requiredField
        }}</small>
      </div>

      <div class="form-group form-group-text text-left mt-4 w-100">
        <Button
          :disabled="disabledBtn"
          label="Entrar"
          type="submit"
          class="w-100 btn-login"
        />
      </div>
      <div
        class="form-group form-group-text text-left mt-4 w-100 d-flex w-100 justify-content-center"
      >
        <a>Esqueci a senha</a>
      </div>
    </form>
  </div>
</template>

<script>
import { UserRest } from "@/services/user.service";
import { useRouter } from "vue-router";

export default {
  name: "Login",
  emits: ["onConfirmLogin"],
  data() {
    return {
      profile: {
        login: "",
        password: "",
      },
      requiredField: "Campo obrigatório",
      submitted: false,
      disabledBtn: false,
      service: new UserRest(),
      router: useRouter(),
    };
  },
  methods: {
    login() {
      this.submitted = true;
      if (this.isValid()) {
        this.service.login(this.profile).then((res) => {
          localStorage.setItem("tkn", String(res.data.accessToken));
          // this.$emit("onConfirmLogin")
          location.href = "/"
        });
      }
    },

    isValid() {
      return this.profile.login && this.profile.password;
    },
  },
};
</script>

<style lang="scss">
form {
  gap: 15px;
  min-width: 320px;
  min-height: 450px;
  justify-content: center;
  .form-group {
    input {
      width: 100%;
      border: 2px solid #2c5ebb7d;
    }
    a {
      color: #163268 !important;
      text-decoration: underline !important;
    }
  }
}
.btn-login {
  background-color: #99bdff;
  border-color: #2c5ebb7d;
  color: #1b3f82;
  border-radius: 3px;
}
</style>

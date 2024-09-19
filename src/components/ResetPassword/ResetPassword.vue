<template>
  <div
    class="login w-100 d-flex justify-content-center align-items-center flex-column"
  >
    <form @submit.prevent="handleSubmit" class="w-50 d-flex flex-column">
      <div
        v-if="!code"
        class="form-group form-group-text text-left p-float-label w-full"
      >
        <InputText id="login" v-model="profile.email" class="w-100" required />
        <label for="login" class="font-weight-bold">E-mail*</label>
        <small v-if="submitted && !profile.email" class="p-error">{{
          requiredField
        }}</small>
        <small
          v-if="submitted && !this.validateEmail(this.profile.email)"
          class="p-error"
          >E-mail inválido</small
        >
      </div>

      <div v-else>
        <div class="form-group form-group-text text-left p-float-label w-full">
          <Password
            id="password"
            v-model="profile.password"
            class="w-100"
            required
            toggleMask
            :feedback="false"
          />
          <label for="password" class="font-weight-bold">Nova Senha*</label>
          <small v-if="submitted && !profile.password" class="p-error">{{
            requiredField
          }}</small>
        </div>

        <div
          class="form-group form-group-text text-left p-float-label w-full mt-4"
        >
          <Password
            id="confirmPassword"
            v-model="profile.confirmPassword"
            class="w-100"
            required
            toggleMask
            :feedback="false"
          />
          <label for="confirmPassword" class="font-weight-bold"
            >Confirmar Senha*</label
          >
          <small v-if="submitted && !profile.confirmPassword" class="p-error">{{
            requiredField
          }}</small>
          <small
            v-if="submitted && profile.password !== profile.confirmPassword"
            class="p-error"
            >As senhas não coincidem</small
          >
        </div>
      </div>

      <div class="form-group form-group-text text-left mt-4 w-100">
        <Button
          :disabled="disabledBtn"
          :label="!disabledBtn ? buttonText : buttonTextLoading"
          type="submit"
          class="w-100 btn-login"
        />
      </div>

      <div
        class="form-group form-group-text text-left mt-4 w-100 d-flex w-100 justify-content-center"
      >
        <router-link to="/login">Sair</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { UserRest } from "@/services/user.service";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "Login",
  data() {
    return {
      profile: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      requiredField: "Campo obrigatório",
      submitted: false,
      disabledBtn: false,
      service: new UserRest(),
      router: useRouter(),
      route: useRoute(),
      code: false,
    };
  },
  computed: {
    buttonText() {
      return this.code ? "Salvar" : "Enviar link de recuperação";
    },
    buttonTextLoading() {
      return this.code ? "Salvando" : "Enviando";
    },
  },
  mounted() {
    this.code = !!this.route.params.code;
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      if (this.isValid()) {
        if (this.code) {
          this.newPassword();
        } else {
          this.login();
        }
      }
    },
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    isValid() {
      if (this.code) {
        return (
          this.profile.password &&
          this.profile.confirmPassword &&
          this.profile.password === this.profile.confirmPassword
        );
      } else {
        return this.profile.email && this.validateEmail(this.profile.email);
      }
    },

    login() {
      this.disabledBtn = true;
      this.service
        .sendLink(this.profile)
        .then((res) => {
          location.href = "/login";
        })
        .finally(() => {
          this.disabledBtn = false;
        });
    },

    newPassword() {
      this.disabledBtn = true;
      this.service
        .savePassword(this.profile, this.route.params.code)
        .then((res) => {
          location.href = "#/login";
        })
        .finally(() => {
          this.disabledBtn = false;
        });
      this.disabledBtn = false;
    },
  },
};
</script>

<style lang="scss">
.login {
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
}
</style>

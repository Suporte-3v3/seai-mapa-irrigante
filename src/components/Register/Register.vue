<template>
  <div
    class="w-100 d-flex justify-content-center align-items-center flex-column"
  >
    <form @submit.prevent="register" class="w-50 d-flex flex-column">
      <div class="form-group form-group-text text-left p-float-label w-full">
        <InputText id="name" v-model="profile.name" class="w-full" required />
        <label for="cpf" class="font-weight-bold">Nome completo*</label>
        <small v-if="submitted && !profile.name" class="p-error">{{
          requiredField
        }}</small>
      </div>
      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-full"
      >
        <InputText id="cpf" v-model="profile.cpf" class="w-full" required />
        <label for="cpf" class="font-weight-bold">CPF*</label>
        <small v-if="submitted && !profile.cpf" class="p-error">{{
          requiredField
        }}</small>
      </div>

      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-full"
      >
        <InputText id="user" v-model="profile.login" class="w-full" required />
        <label for="cpf" class="font-weight-bold">Username*</label>
        <small v-if="submitted && !profile.login" class="p-error">{{
          requiredField
        }}</small>
      </div>

      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-100"
      >
        <InputText id="email" v-model="profile.email" class="w-100" required />
        <label for="cpf" class="font-weight-bold">E-mail</label>
        <small v-if="submitted && !profile.email" class="p-error">{{
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
        <label for="cpf" class="font-weight-bold">Senha</label>
        <small v-if="submitted && !profile.password" class="p-error">{{
          requiredField
        }}</small>
      </div>
      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-100"
      >
        <Password
          id="password_confirmation"
          v-model="profile.confirmPassword"
          class="w-100"
          required
          toggleMask
          :feedback="false"
        />
        <label for="password_confirmation" class="font-weight-bold"
          >Confirmar Senha</label
        >
        <small v-if="submitted && !profile.confirmPassword" class="p-error">{{
          requiredField
        }}</small>
        <small
          v-if="
            submitted &&
            profile.password &&
            profile.confirmPassword &&
            profile.password !== profile.confirmPassword
          "
          class="p-error"
          >As senhas não estão iguais.</small
        >
      </div>
      <div class="form-group form-group-text text-left mt-4 w-100">
        <Button label="Cadastrar" type="submit" class="w-100 btn-register" />
      </div>
    </form>
  </div>
</template>
<script>
import { UserRest } from "@/services/user.service";
import { toast } from "vue3-toastify";

export default {
  name: "Register",

  data() {
    return {
      profile: {
        name: "",
        login: "",
        email: "",
        password: "",
        confirmPassword: "",
        cpf: "",
      },
      requiredField: "Campo obrigatório",
      submitted: false,
      service: new UserRest(),
    };
  },
  methods: {
    register() {
      this.submitted = true;
      if (this.isValid()) {
        console.log("Profile data:", this.profile);
        this.service.create(this.profile).then((res) => {
          toast.success("Conta criada com sucesso!");
        });
      }
    },

    teste() {
      toast.success("Conta criada com sucesso!");
    },
    isValid() {
      return (
        this.profile.name &&
        this.profile.login &&
        this.profile.email &&
        this.profile.password &&
        this.profile.confirmPassword &&
        this.profile.password === this.profile.confirmPassword &&
        this.profile.cpf
      );
    },
  },
};
</script>
<style lang="scss">
form {
  gap: 15px;
  min-width: 320px;
  padding-bottom: 25px;
  .form-group {
    input {
      width: 100%;
      border: 2px solid #2c5ebb7d;
    }
  }
}
.btn-register {
  background-color: #99bdff;
  border-color: #2c5ebb7d;
  color: #1b3f82;
  border-radius: 3px;
}
</style>

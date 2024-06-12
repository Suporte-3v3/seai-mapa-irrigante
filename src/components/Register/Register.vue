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
        <InputText id="user" v-model="profile.user" class="w-full" required />
        <label for="cpf" class="font-weight-bold">Username*</label>
        <small v-if="submitted && !profile.user" class="p-error">{{
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
          v-model="profile.password_confirmation"
          class="w-100"
          required
          toggleMask
          :feedback="false"
        />
        <label for="password_confirmation" class="font-weight-bold"
          >Confirmar Senha</label
        >
        <small
          v-if="submitted && !profile.password_confirmation"
          class="p-error"
          >{{ requiredField }}</small
        >
        <small
          v-if="
            submitted &&
            profile.password &&
            profile.password_confirmation &&
            profile.password !== profile.password_confirmation
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
export default {
  name: "Register",

  data() {
    return {
      profile: {
        name: "",
        user: "",
        email: "",
        password: "",
        password_confirmation: "",
        cpf: "",
      },
      requiredField: "Campo obrigatório",
      submitted: false,
    };
  },
  methods: {
    register() {
      this.submitted = true;
      if (this.isValid()) {
        console.log("Profile data:", this.profile);
        // Adicione a lógica de registro aqui
      }
    },

    isValid() {
      return (
        this.profile.name &&
        this.profile.user &&
        this.profile.email &&
        this.profile.password &&
        this.profile.password_confirmation &&
        this.profile.password === this.profile.password_confirmation &&
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

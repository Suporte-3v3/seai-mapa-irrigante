<template>
  <div id="app">
    <div class="check-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
    </div>
    <h1>Cadastro realizado com sucesso!</h1>
    <Button
      @click="reload"
      class="btn-primary w-100 d-flex justify-content-center align-items-center"
    >
      Acessar SEAI
    </Button>
  </div>
</template>

<script>
export default {
  name: "RegisterSucess",
  methods: {
    reload() {
      window.location.reload();
    },
  },
};
</script>

<style scoped>
body {
  background-color: #1b3f82;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  font-family: sans-serif;
}

.check-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 10px solid #fff;
  margin-bottom: 10px;
}

.check-icon svg {
  width: 100px;
  height: 100px;
  fill: #fff;
}

h1 {
  margin-bottom: 100px;
  text-align: center;
}

a {
  text-decoration: none;
}

/* Animação para o check-icon */
.check-icon {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* Media query para dispositivos móveis */
@media (max-width: 600px) {
  h1 {
    font-size: 24px;
    margin-bottom: 50px;
    word-wrap: break-word;
  }

  .check-icon {
    margin-bottom: 20px;
  }

  button {
    font-size: 14px;
    padding: 10px 20px;
  }
}
</style>

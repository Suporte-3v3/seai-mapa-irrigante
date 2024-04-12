<template>
  <div>
    <div class="description">
      <label
        for="option1"
        class="tab-label"
      >Estação</label>
    </div>
    <div class="select-container">
      <select
        id="option1"
        v-model="selectedOption1"
        class="large-select"
      >
        <option value="opcao1">
          Selecione a Estação
        </option>
        <option value="opcao2">
          Maranguape (Funceme)
        </option>
        <option value="opcao3">
          Maracanaú (Funceme)
        </option>
      </select>
    </div>
    <br>
    <div class="description">
      <label
        for="option2"
        class="tab-label"
      >Pluviômetro</label>
    </div>
    <div class="select-container">
      <select
        id="option2"
        v-model="selectedOption2"
        class="large-select"
      >
        <option value="opcaoA">
          Selecione o Pluviômetro
        </option>
        <option value="opcaoB">
          Maranguape (Funceme)
        </option>
        <option value="opcaoC">
          Maracanaú (Funceme)
        </option>
      </select>
    </div>
    <br>
    <div class="description">
      <label
        for="option3"
        class="tab-label"
      >Cultura</label>
    </div>
    <div class="select-container">
      <select
        id="option3"
        v-model="selectedOption3"
        class="large-select"
      >
        <option value="opcaoX">
          Selecione a Cultura
        </option>
        <option value="opcaoY">
          Abacate
        </option>
        <option value="opcaoZ">
          Acerola
        </option>
      </select>
    </div>

    <!-- Inputs na mesma linha -->
    <div class="inputs-row">
      <div class="input-container">
        <div class="description">
          <label
            for="input1"
            class="tab-label"
          >Data de Plantio</label>
        </div>
        <input
          id="input1"
          type="text"
          class="large-input"
          placeholder="Digite a Data"
        >
      </div>
    </div>
    <div class="inputs-row">
      <div class="input-container">
        <div class="description">
          <label
            for="input2"
            class="tab-label"
          >Eficiência de Irrigação</label>
        </div>
        <input
          id="input2"
          type="text"
          class="large-input"
          placeholder="Digite a Eficiência"
        >
      </div>
    </div>
    <div class="inputs-row">
      <div class="input-container">
        <div class="description">
          <label
            for="input3"
            class="tab-label"
          >Taxa de Aplicação</label>
        </div>
        <input
          id="input3"
          type="text"
          class="large-input"
          placeholder="Digite a taxa"
        >
      </div>
    </div>

    <!-- Botão -->
    <button
      class="submit-button"
      @click="calcularRecomendacao"
    >
      Calcular Recomendação de Lâmina
    </button>
    
    <!-- Linha -->
    <hr class="line">
  </div>
</template>

<script>
export default {
  name: 'RecomendacaoComponent',
  data() {
    return {
      selectedOption1: 'opcao1',
      selectedOption2: 'opcaoA',
      selectedOption3: 'opcaoX'
    };
  }
};
</script>
<style>
body {
  background-color: #eff4f7; /* Cor de fundo desejada */
}
</style>

<style scoped>

.select-container {
  font-family: Arial, sans-serif;
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  color: #333;
  outline: none;
  transition: border-color 0.3s ease;
  }

        /* Estilize a seta do seletor */
        select::-ms-expand {
            display: none;
        }

        /* Quando o seletor estiver focado */

.large-select {
  font-size: 20px;
  width: 60%;
  height: 40px;
  border-radius: 5px;
}

.tab-label {
  font-size: 18px;
  font-family: Arial, sans-serif;
}

.description {
  font-size: 18px;
  font-family: Arial, sans-serif;
  font-weight: bold;
  margin-bottom: 5px;
}

/* Estilos para os inputs */
.input-container {
  font-family: Arial, sans-serif;
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  color: #333;
  outline: none;
  transition: border-color 0.3s ease;
}

.large-input {
  font-size: 20px;
  width: 60%;
  height: 40px;
  border-radius: 5px;
}

.inputs-row {
  display: flex;
  flex-direction: column; /* Coloca os inputs em coluna */
}

/* Estilos para o botão */
.submit-button {
  background-color: #007bff;
  color: white;
  font-weight: bold;
  font-size: 18px;
  padding: 15px 50px;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  display: block; /* Garante que o botão seja exibido como um bloco */
  margin: 20px auto; /* Centraliza o botão horizontalmente e adiciona margem acima e abaixo */
}

.line {
  border: none;
  border-top: 1px solid #ccc;
  margin-top: 20px;
}

.resultados {
  margin-top: 20px;
  width: 100%;
  height: 200px;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>

<template>
    <div>
      <div class="description">
        <label for="option1" class="tab-label">Estação</label>
      </div>
      <div class="select-container">
        <select v-model="selectedOption1" id="option1" class="large-select">
          <option value="opcao1">Selecione a Estação</option>
          <option value="opcao2">Maranguape (Funceme)</option>
          <option value="opcao3">Maracanaú (Funceme)</option>
        </select>
      </div>
      <br>
      <div class="description">
        <label for="option2" class="tab-label">Pluviômetro</label>
      </div>
      <div class="select-container">
        <select v-model="selectedOption2" id="option2" class="large-select">
          <option value="opcaoA">Selecione o Pluviômetro</option>
          <option value="opcaoB">Maranguape (Funceme)</option>
          <option value="opcaoC">Maracanaú (Funceme)</option>
        </select>
      </div>
      <br>
      <div class="description">
        <label for="option3" class="tab-label">Cultura</label>
      </div>
      <div class="select-container">
        <select v-model="selectedOption3" id="option3" class="large-select">
          <option value="opcaoX">Selecione a Cultura</option>
          <option value="opcaoY">Abacate</option>
          <option value="opcaoZ">Acerola</option>
        </select>
      </div>
      <!-- Inputs na mesma linha -->
      <div class="inputs-row">
        <div class="input-container">
          <div class="description">
            <label for="input1" class="tab-label">Data de Plantio</label>
          </div>
          <input type="text" id="input1" class="large-input" placeholder="Digite a Data">
        </div>
        <div class="input-container">
          <div class="description">
            <label for="input2" class="tab-label">Eficiência de Irrigação</label>
          </div>
          <input type="text" id="input2" class="large-input" placeholder="Digite a Eficiência">
        </div>
        <div class="input-container">
          <div class="description">
            <label for="input3" class="tab-label">Taxa de Aplicação</label>
          </div>
          <input type="text" id="input3" class="large-input" placeholder="Digite a taxa">
        </div>
      </div>
      <!-- Botão -->
      <button class="submit-button" @click="calcularRecomendacao">Calcular Recomendação de Lâmina</button>
    <!-- Linha -->
    <hr class="line">
    </div>
  </template>
  
  <script>
export default {
  name: 'RecomendacaoComponent',
  data() {
    return {
      selectedOption1: 'opcao1', // Defina o valor padrão para a primeira opção da estação
      selectedOption2: 'opcaoA', // Defina o valor padrão para a primeira opção do pluviômetro
      selectedOption3: 'opcaoX' // Defina o valor padrão para a primeira opção da cultura
    };
  }
};
</script>

<style scoped>
/* Estilos para os seletores */
.select-container {
  margin-bottom: 20px; /* Adicione espaço entre as opções */
  margin-left: 20px; /* Adicione margem à esquerda */
}

.large-select {
  font-size: 20px; /* Aumenta o tamanho da fonte dos seletores */
  width: 80%; /* Define a largura para ocupar toda a largura da página */
  height: 40px; /* Aumenta a altura das caixas de seleção */
  border-radius: 5px; /* Arredonda as bordas do select */
}

.tab-label {
  font-size: 18px; /* Tamanho da fonte igual ao das abas */
  font-family: inherit; /* Usa a mesma fonte que o restante do projeto */
}

.description {
  font-size: 18px; /* Tamanho da fonte igual ao das abas */
  font-family: "Helvetica"; /* Usa a mesma fonte que o restante do projeto */
  margin-bottom: 5px; /* Adicione espaço abaixo da descrição */
  margin-left: 20px; /* Adicione margem à esquerda */
}

/* Estilos para os inputs */
.input-container {
  margin-right: 50px; /* Adicione espaço entre os inputs */
  margin-left: 1px; /* Adicione margem à esquerda */
}

.large-input {
  font-size: 20px; /* Aumenta o tamanho da fonte dos inputs */
  width: 200px; /* Define uma largura fixa para os inputs */
  height: 40px; /* Aumenta a altura dos inputs */
  border-radius: 5px; /* Arredonda as bordas do input */
}

.inputs-row {
  display: flex; /* Coloca os inputs na mesma linha */
  margin-left: 20px; /* Adicione margem à esquerda */
}

/* Estilos para o botão */
.submit-button {
  margin-left: 20px; /* Adicione margem à esquerda */
  margin-top: 20px; /* Adicione margem acima */
  background-color: #26c9fc; /* Cor de fundo */
  color: white; /* Cor do texto */
  font-weight: bold; /* Texto em negrito */
  font-size: 18px; /* Tamanho da fonte */
  padding: 15px 210px; /* Espaçamento interno */
  border: none; /* Sem borda */
  cursor: pointer; /* Cursor do mouse */
  border-radius: 20px; /* Arredonda as bordas do botão */
}


.line {
  border: none; /* Remover a borda padrão */
  border-top: 1px solid #ccc; /* Adicionar uma borda superior */
  margin-top: 20px; /* Adicionar margem acima */
}

.resultados {
  margin-top: 20px; /* Adicione margem acima */
  width: 100%; /* Define a largura para ocupar toda a largura da página */
  height: 200px; /* Defina a altura do quadrado de resultados */
  background-color: #f2f2f2; /* Cor de fundo do quadrado de resultados */
  border: 1px solid #ccc; /* Adicione uma borda ao quadrado de resultados */
  border-radius: 5px; /* Arredonde as bordas do quadrado de resultados */
}
</style>

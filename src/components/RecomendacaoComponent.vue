<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="form-group mb-4">
            <label
              for="option1"
              class="tab-label"
            >Estação</label>
            <div class="input-group">
              <select
                id="option1"
                v-model="selectedOption1"
                class="form-control"
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
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group mb-4">
            <label
              for="option2"
              class="tab-label"
            >Pluviômetro</label>
            <div class="input-group">
              <select
                id="option2"
                v-model="selectedOption2"
                class="form-control"
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
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group mb-4">
            <label
              for="option3"
              class="tab-label"
            >Cultura</label>
            <div class="input-group">
              <select
                id="option3"
                v-model="selectedOption3"
                class="form-control"
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
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group mb-4">
            <label
              for="input1"
              class="tab-label"
            >Data de Plantio</label>
            <div class="input-group">
              <input
                id="input1"
                type="date"
                class="form-control"
                placeholder="Digite a Data"
              >
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group mb-4">
            <label
              for="option4"
              class="tab-label"
            >Sistema de Irrigação</label>
            <div class="input-group">
              <select
                id="option4"
                v-model="selectedOption4"
                class="form-control"
                @change="toggleAdditionalFields"
              >
                <option value="opcao1">
                  Selecione o Sistema de Irrigação
                </option>
                <option value="Aspersão">
                  Aspersão
                </option>
                <option value="MicroAspersão">
                  Microaspersão
                </option>
                <option value="Gotejamento">
                  Gotejamento
                </option>
                <option value="Pivô Central">
                  Pivô Central
                </option>
                <option value="Sulcos">
                  Sulcos
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group mb-4">
            <label
              for="input2"
              class="tab-label"
            >Eficiência de Irrigação</label>
            <div class="input-group">
              <input
                id="input2"
                type="text"
                class="form-control"
                placeholder="Digite a Eficiência"
                :disabled="isFieldDisabled"
              >
              <div class="input-group-append">
                <div class="input-group-text">
                  <input
                    v-model="useDefault"
                    type="checkbox"
                  > Usar padrão
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Campos adicionais -->
      <div
        v-if="showAdditionalFields"
        class="row"
      >
        <div
          v-if="selectedOption4 === 'Aspersão'"
          class="col-md-4"
        >
          <div class="form-group mb-4">
            <label
              class="tab-label"
              style="color: #007bff;"
            >Precipitação por Aspersor (mm/h)</label>
            <input
              type="text"
              class="form-control"
            >
          </div>
        </div>
        <div
          v-if="selectedOption4 === 'MicroAspersão'"
          class="col-md-4"
        >
          <div class="form-group mb-4">
            <label
              class="tab-label"
              style="color: #007bff;"
            >Vazão do Sistema (l/h)</label>
            <input
              type="text"
              class="form-control"
            >
          </div>
          <div class="form-group mb-4">
            <label
              class="tab-label"
              style="color: #007bff;"
            >Área Plantada (m²)</label>
            <input
              type="text"
              class="form-control"
            >
          </div>
          <div class="form-group mb-4">
            <label
              class="tab-label"
              style="color: #007bff;"
            >Área efetiva de cada planta (m²/planta)</label>
            <input
              type="text"
              class="form-control"
            >
          </div>
          <div class="form-group mb-4">
            <label
              class="tab-label"
              style="color: #007bff;"
            >Número de Plantas por área (plantas/m²)</label>
            <input
              type="text"
              class="form-control"
            >
          </div>
        </div>
        <div
          v-if="selectedOption4 === 'Gotejamento'"
          class="col-md-4"
        >
          <div class="form-group mb-4">
            <label
              class="tab-label"
              style="color: #007bff;"
            >Vazão do Sistema (l/h)</label>
            <input
              type="text"
              class="form-control"
            >
          </div>
          <div class="form-group mb-4">
            <label
              class="tab-label"
              style="color: #007bff;"
            >Área Plantada (m²)</label>
            <input
              type="text"
              class="form-control"
            >
          </div>
          <div class="form-group mb-4">
            <label
              class="tab-label"
              style="color: #007bff;"
            >Área efetiva de cada planta (m²/planta)</label>
            <input
              type="text"
              class="form-control"
            >
          </div>
          <div class="form-group mb-4">
            <label
              class="tab-label"
              style="color: #007bff;"
            >Número de Plantas por área (plantas/m²)</label>
            <input
              type="text"
              class="form-control"
            >
          </div>
        </div>
        <div
          v-if="selectedOption4 === 'Pivô Central'"
          class="col-md-4"
        >
          <div class="form-group mb-4">
            <label
              class="tab-label"
              style="color: #007bff;"
            >Precipitação por volta (mm/volta)</label>
            <input
              type="text"
              class="form-control"
            >
          </div>
        </div>
        <div
          v-if="selectedOption4 === 'Sulcos'"
          class="col-md-4"
        >
          <div class="form-group mb-4">
            <label
              class="tab-label"
              style="color: #007bff;"
            >Comprimento dos Sulcos (m)</label>
            <input
              type="text"
              class="form-control"
            >
          </div>
          <div class="form-group mb-4">
            <label
              class="tab-label"
              style="color: #007bff;"
            >Espaçamento entre os Sulcos (m)</label>
            <input
              type="text"
              class="form-control"
            >
          </div>
          <div class="form-group mb-4">
            <label
              class="tab-label"
              style="color: #007bff;"
            >Vazão por Sulco (l/h)</label>
            <input
              type="text"
              class="form-control"
            >
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <button
            class="btn btn-primary"
            @click="calcularRecomendacao"
          >
            Simular Lâmina
          </button>
          <button
            class="btn btn-danger mr-2"
            @click="limparCampos"
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
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
      selectedOption3: 'opcaoX',
      selectedOption4: 'opcao1',
      showAdditionalFields: false,
      useDefault: true
    };
  },
  computed: {
    isFieldDisabled() {
      return this.useDefault;
    }
  },
  methods: {
    calcularRecomendacao() {
      // Implementação do método de cálculo aqui
    },
    limparCampos() {
    this.selectedOption1 = 'opcao1';
    this.selectedOption2 = 'opcaoA';
    this.selectedOption3 = 'opcaoX';
    this.selectedOption4 = 'opcao1';
    this.input1 = '';
    this.input2 = '';
    // Limpar outros campos adicionais, se houver
  },
    toggleAdditionalFields() {
      this.showAdditionalFields = ['Aspersão', 'MicroAspersão', 'Gotejamento', 'Pivô Central', 'Sulcos'].includes(this.selectedOption4);
    }
    
  }
};
</script>

<style>
body {
  background-color: #eff4f7; /* Cor de fundo desejada */
}
</style>

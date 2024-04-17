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
                v-model="selectedEstation"
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
                v-model="selectedPluviometer"
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
                v-model="selectedCulture"
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
                v-model="selectedSystemIrrigation"
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
                v-model="validationIrrigationEfficiency"
                @input="validateNumberInput($event, 'validationIrrigationEfficiency')"
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
          v-if="selectedSystemIrrigation === 'Aspersão'"
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
              v-model="validationPrecipitationSprinkler"
            @input="validateNumberInput($event, 'validationPrecipitationSprinkler')"
            >
          </div>
        </div>
        <div
          v-if="selectedSystemIrrigation === 'MicroAspersão'"
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
              v-model="validationFlowSystem"
            @input="validateNumberInput($event, 'validationFlowSystem')"
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
              v-model="validationPlantedArea"
            @input="validateNumberInput($event, 'validationPlantedArea')"
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
              v-model="validationEffectiveArea"
            @input="validateNumberInput($event, 'validationEffectiveArea')"
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
              v-model="validationNumberPlants"
            @input="validateNumberInput($event, 'validationNumberPlants')"
            >
          </div>
        </div>
        <div
          v-if="selectedSystemIrrigation === 'Gotejamento'"
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
              v-model="validationFlowSystem"
            @input="validateNumberInput($event, 'validationFlowSystem')"
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
              v-model="validationPlantedArea"
            @input="validateNumberInput($event, 'validationPlantedArea')"
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
              v-model="validationEffectiveArea"
            @input="validateNumberInput($event, 'validationEffectiveArea')"
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
              v-model="validationNumberPlants"
            @input="validateNumberInput($event, 'validationNumberPlants')"
            >
          </div>
        </div>
        <div
          v-if="selectedSystemIrrigation === 'Pivô Central'"
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
              v-model="validationPrecipitationAround"
            @input="validateNumberInput($event, 'validationPrecipitationAround')"
            >
          </div>
        </div>
        <div
          v-if="selectedSystemIrrigation === 'Sulcos'"
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
              v-model="validationFurrowLength"
            @input="validateNumberInput($event, 'validationFurrowLength')"
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
              v-model="validationGrooveSpacing"
            @input="validateNumberInput($event, 'validationGrooveSpacing')"
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
              v-model="validationFlowGrooves"
            @input="validateNumberInput($event, 'validationFlowGrooves')"
            >
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <button
            class="btn btn-primary"
            @click="CalculateRecomendation"
          >
            Simular Lâmina
          </button>
          <button
            class="btn btn-danger mr-2"
            @click="ClearFields"
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
  name: 'RecomendationComponent',
  data() {
    return {
      selectedEstation: 'opcao1',
      selectedPluviometer: 'opcaoA',
      selectedCulture: 'opcaoX',
      selectedSystemIrrigation: 'opcao1',
      validationPrecipitationSprinkler:'',
      validationFlowSystem:'',
      validationPlantedArea:'',
      validationEffectiveArea:'',
      validationNumberPlants:'',
      validationPrecipitationAround:'',
      validationFurrowLength:'',
      validationGrooveSpacing:'',
      validationFlowGrooves:'',
      validationIrrigationEfficiency:'',
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
    CalculateRecomendation() {
      // Implementação do método de cálculo aqui
    },
    ClearFields() {
    this.selectedEstation = 'opcao1';
    this.selectedPluviometer = 'opcaoA';
    this.selectedCulture = 'opcaoX';
    this.selectedSystemIrrigation = 'opcao1';
    this.input1 = '';
    this.input2 = '';
    // Limpar outros campos adicionais, se houver
  },
    toggleAdditionalFields() {
      this.showAdditionalFields = ['Aspersão', 'MicroAspersão', 'Gotejamento', 'Pivô Central', 'Sulcos'].includes(this.selectedSystemIrrigation);
    },
    validateNumberInput(event, fieldName) {
      // Expressão regular para aceitar somente números e ponto
      const regex = /^[0-9.]*$/;
      // Verifica se o valor do campo corresponde à expressão regular
      if (!regex.test(event.target.value)) {
        // Se não corresponder, remove o último caractere inserido
        this[fieldName] = event.target.value.slice(0, -1);
      }
    },
  }
};
</script>

<style>
body {
  background-color: #eff4f7; /* Cor de fundo desejada */
}

.btn-primary {
  margin-right: 10px;
}
</style>

<template>
  <div class="container">
    <!-- Card para envolver os toogle switches -->
    <div class="card">
      <div class="card-body">
        <!-- Primeiro par de toogle switches -->
        <div class="row">
          <div class="col-md-4">
            <div class="form-check form-switch">
              <input
                id="toggleSwitch"
                v-model="toggleSwitchStation"
                class="form-check-input"
                type="checkbox"
              >
              <label
                class="form-check-label"
                for="toggleSwitch"
              >Utilizar ET0 Automática?</label>
            </div>
          </div>
        </div>
        <!-- Segundo par de toogle switches -->
        <div class="row mt-2">
          <div class="col-md-12">
            <div class="form-check form-switch">
              <input
                id="toggleSwitch"
                v-model="toggleSwitchPluviometer"
                class="form-check-input"
                type="checkbox"
              >
              <label
                class="form-check-label"
                for="toggleSwitch"
              >Utilizar Precipitação Automática?</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row mt-3">
      <div class="col-md-12">
        <div class="form-group mb-4">
          <label
            for="option1"
            class="tab-label"
          >Estação</label>
          <div class="input-group">
            <select
              id="option1"
              v-model="selectedStation"
              class="form-control"
              :disabled="!isStationDisabled"
            >
              <option value="">
                Selecione a Estação
              </option>
              <option
                v-for="equipment in stations" 
                :key="equipment.Id"
                :value="equipment.Id"
              >
                ({{ equipment.Organ.Name }}) - {{ equipment.Name }} - [Et0: {{ equipment.Et0 }}]
              </option>
            </select>
          </div>
          <p
            v-if="showError"
            style="color: red; font-size: 12px;"
          >
            * Campo Obrigatório
          </p>
        </div>
        <div
          v-if="!isStationDisabled"
          class="form-group mb-4"
        >
          <label
            for="newForm"
            class="tab-label"
            style="color: #bb4430;"
          >ET0 Manual</label>
          <input
            id="newForm"
            v-model="selectedET0Manual"
            class="form-control"
            type="number"
            placeholder="Digite o Valor da ET0"
          >
        </div>
      </div>
      <div class="col-md-12">
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
              :disabled="!isPluviometerDisabled"
            >
              <option value="">
                Selecione o Pluviômetro
              </option>
              <option
                v-for="equipment in pluviometers"
                :key="equipment.Id"
                :value="equipment.Id"
              >
                ({{ equipment.Organ.Name }}) - {{ equipment.Name }} - [Precipitação: {{ equipment.Precipitation }} mm]
              </option>
            </select>
          </div>
          <p
            v-if="showError"
            style="color: red; font-size: 12px;"
          >
            * Campo Obrigatório
          </p>
        </div>
        <div
          v-if="!isPluviometerDisabled"
          class="form-group mb-4"
        >
          <label
            for="newForm"
            class="tab-label"
            style="color: #bb4430;"
          >Precipitação Manual</label>
          <input
            id="newForm"
            v-model="selectedPrecipitationManual"
            class="form-control"
            type="number"
            placeholder="Digite o Valor da Precipitação"
          >
        </div>
        <div class="col-md-12">
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
                <option value="">
                  Selecione a Cultura
                </option>
                <option
                  v-for="crop in crops"
                  :key="crop.Id"
                  :value="crop.Id"
                >
                  {{ crop.Name }}
                </option>
              </select>
            </div>
            <p
              v-if="showError"
              style="color: red; font-size: 12px;"
            >
              * Campo Obrigatório
            </p>
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
                v-model="dateplanting"
                type="date"
                class="form-control"
                placeholder="Digite a Data"
              >
            </div>
            <p
              v-if="showError"
              style="color: red; font-size: 12px;"
            >
              * Campo Obrigatório
            </p>
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
                <option value="">
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
            <p
              v-if="showError"
              style="color: red; font-size: 12px;"
            >
              * Campo Obrigatório
            </p>
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
                v-model="validationIrrigationEfficiency"
                type="number"
                class="form-control"
                placeholder="Digite a Eficiência"
                :disabled="isFieldDisabled"
              >
              <div class="input-group-append">
                <div class="input-group-text">
                  <input
                    v-model="useDefault"
                    type="checkbox"
                    class="checkbox-margin"
                  > Usar padrão
                </div>
              </div>
            </div>
            <p
              v-if="showError"
              style="color: red; font-size: 12px;"
            >
              * Campo Obrigatório
            </p>
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
          class="col-md-12"
        >
          <div class="form-group mb-4">
            <label
              class="tab-label"
              style="color: #bb4430;"
            >Precipitação por Aspersor (mm/h)</label>
            <input
              v-model="validationPrecipitationSprinkler"
              type="number"
              class="form-control"
              placeholder="Digite a Precipitação por Aspersor"
            >
          </div>
        </div>
        <div
          v-if="selectedSystemIrrigation === 'MicroAspersão'"
          class="col-md-12"
        >
          <div class="form-group mb-4">
            <label
              class="tab-label"
              style="color: #bb4430;"
            >Vazão do Sistema (l/h)</label>
            <input
              v-model="validationFlowSystem"
              type="number"
              class="form-control"
              placeholder="Digite a Vazão do Sistema"
            >
          </div>
          <div class="form-group mb-4">
            <label
              class="tab-label"
              style="color: #bb4430;"
            >Área Plantada (m²)</label>
            <input
              v-model="validationPlantedArea"
              type="number"
              class="form-control"
              placeholder="Digite a Área Plantada"
            >
          </div>
          <div class="form-group mb-4">
            <label
              class="tab-label"
              style="color: #bb4430;"
            >Área efetiva de cada planta (m²/planta)</label>
            <input
              v-model="validationEffectiveArea"
              type="number"
              class="form-control"
              placeholder="Digite a Área efetiva de cada planta"
            >
          </div>
          <div class="form-group mb-4">
            <label
              class="tab-label"
              style="color: #bb4430;"
            >Número de Plantas por área (plantas/m²)</label>
            <input
              v-model="validationNumberPlants"
              type="number"
              class="form-control"
              placeholder="Digite o Número de Plantas por área"
            >
          </div>
        </div>
        <div
          v-if="selectedSystemIrrigation === 'Gotejamento'"
          class="col-md-12"
        >
          <div class="form-group mb-4">
            <label
              class="tab-label"
              style="color: #bb4430;"
            >Vazão do Sistema (l/h)</label>
            <input
              v-model="validationFlowSystem"
              type="number"
              class="form-control"
              placeholder="Digite a Vazão do Sistema"
            >
          </div>
          <div class="form-group mb-4">
            <label
              class="tab-label"
              style="color: #bb4430;"
            >Área Plantada (m²)</label>
            <input
              v-model="validationPlantedArea"
              type="number"
              class="form-control"
              placeholder="Digite a Área Plantada"
            >
          </div>
          <div class="form-group mb-4">
            <label
              class="tab-label"
              style="color: #bb4430;"
            >Área efetiva de cada planta (m²/planta)</label>
            <input
              v-model="validationEffectiveArea"
              type="number"
              class="form-control"
              placeholder="Digite a Área efetiva de cada planta"
            >
          </div>
          <div class="form-group mb-4">
            <label
              class="tab-label"
              style="color: #bb4430;"
            >Número de Plantas por área (plantas/m²)</label>
            <input
              v-model="validationNumberPlants"
              type="number"
              class="form-control"
              placeholder="Digite o Número de Plantas por área"
            >
          </div>
        </div>
        <div
          v-if="selectedSystemIrrigation === 'Pivô Central'"
          class="col-md-12"
        >
          <div class="form-group mb-4">
            <label
              class="tab-label"
              style="color: #bb4430;"
            >Precipitação por Volta (mm/volta)</label>
            <input
              v-model="validationPrecipitationAround"
              type="number"
              class="form-control"
              placeholder="Digite a Precipitação por Volta"
            >
          </div>
        </div>
        <div
          v-if="selectedSystemIrrigation === 'Sulcos'"
          class="col-md-12"
        >
          <div class="form-group mb-4">
            <label
              class="tab-label"
              style="color: #bb4430;"
            >Comprimento dos Sulcos (m)</label>
            <input
              v-model="validationFurrowLength"
              type="number"
              class="form-control"
              placeholder="Digite o Comprimento dos Sulcos"
            >
          </div>
          <div class="form-group mb-4">
            <label
              class="tab-label"
              style="color: #bb4430;"
            >Espaçamento entre os Sulcos (m)</label>
            <input
              v-model="validationGrooveSpacing"
              type="number"
              class="form-control"
              placeholder="Digite o Espaçamento entre os Sulcos"
            >
          </div>
          <div class="form-group mb-4">
            <label
              class="tab-label"
              style="color: #bb4430;"
            >Vazão por Sulco (l/h)</label>
            <input
              v-model="validationFlowGrooves"
              type="number"
              class="form-control"
              placeholder="Digite a Vazão por Sulco"
            >
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <button
            class="btn"
            style="background-color: #1b3f82; color: white; margin-right: 8px;"
            @click="calculateRecomendation"
          >
            Simular Lâmina
          </button>
          <button
            class="btn"
            style="background-color: #b1151f; color: white;"
            @click="ClearFields"
          >
            Limpar Campos
          </button>

          <div
            v-if="resultsVisible && results"
            class="card mt-4 shadow"
          >
            <div
              class="card-header text-white text-center"
              :style="{ backgroundColor: '#1b3f82' }"
            >
              <h3>Resultado Simulação de Lâmina</h3>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <strong>Etc:</strong> {{ results.etc }}
                </li>
                <li class="list-group-item">
                  <strong>Lâmina de Reposição:</strong> {{ results.laminaReposicao }}
                </li>
                <li class="list-group-item">
                  <strong>Tempo de Irrigação:</strong> {{ results.tempoIrrigacao }}
                </li>
                <li class="list-group-item">
                  <strong>Dias da Cultura:</strong> {{ results.diasCultura }}
                </li>
                <li class="list-group-item">
                  <strong>ET0:</strong> {{ results.et0 }}
                </li>
                <li class="list-group-item">
                  <strong>Precipitação:</strong> {{ results.precipitacao }}
                </li>
                <li class="list-group-item">
                  <strong>Kc:</strong> {{ results.kc }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RecomendationComponent',
  data() {
  return {
    selectedStation: '',
    showError: false,
    stations: [],
    pluviometers: [],
    crops: [],
    resultsVisible: false,
    results: {},
    response: '',
    selectedPluviometer: '',
    selectedCulture: '',
    selectedSystemIrrigation: '',
    dateplanting: '',
    validationIrrigationEfficiency: '',
    validationPrecipitationSprinkler: '',
    validationFlowSystem: '',
    validationPlantedArea: '',
    validationEffectiveArea: '',
    validationNumberPlants: '',
    validationPrecipitationAround: '',
    validationFurrowLength: '',
    validationGrooveSpacing: '',
    validationFlowGrooves: '',
    manualEt0: '', // Novo campo para ET0 manual
    manualPrecipitation: '', // Novo campo para precipitação manual
    showAdditionalFields: false,
    useDefault: true,
    toggleSwitchStation: true,
    toggleSwitchPluviometer: true,
    selectedET0Manual: '',
    selectedPrecipitationManual: ''
  };
},

  computed: {
    isFieldDisabled() {
      return this.useDefault;
    },
    isStationDisabled() {
      return this.toggleSwitchStation;
    },
    isPluviometerDisabled() {
      return this.toggleSwitchPluviometer;
    }
  },
  async created() {
    try {
      const responseStation = await axios.get('http://seai.3v3.farm/api/v1/equipments/activated?type=station');
      this.stations = responseStation.data.data;

      const responsePluviometer = await axios.get('http://seai.3v3.farm/api/v1/equipments/activated?type=pluviometer');
      this.pluviometers = responsePluviometer.data.data;

      const response = await axios.get('http://seai.3v3.farm/api/v2/management/crop');
      this.crops = response.data.data;

    } catch (error) {
      console.error(error);
    }
  },

  methods: {
     // Método para limpar os campos.
    ClearFields() {
    this.selectedStation = '';
    this.showError = false;
    this.selectedPluviometer = '';
    this.selectedCulture = '';
    this.selectedSystemIrrigation = '';
    this.input1 = '';
    this.input2 = '';
    this.dateplanting = '';
    this.response = '';
    this.validationIrrigationEfficiency = '';
    this.validationPrecipitationSprinkler = '';
    this.validationFlowSystem = '';
    this.validationPlantedArea = '';
    this.validationEffectiveArea = '';
    this.validationNumberPlants = '';
    this.validationPrecipitationAround = '';
    this.validationFurrowLength = '';
    this.validationGrooveSpacing = '';
    this.validationFlowGrooves = '';
    this.selectedPrecipitationManual = '';
    this.selectedET0Manual = '';
    this.toggleSwitchStation = true;
    this.toggleSwitchPluviometer = true;
    this.results = {};
    this.resultsVisible = false;

    // Limpar outros campos adicionais, se houver
  },

  validateFields(){
    const fields = ['selectedStation', 'selectedPluviometer', 'selectedCulture',
    'dateplanting', 'selectedSystemIrrigation', /*'validationIrrigationEfficiency', 
    'validationPrecipitationSprinkler', 'validationFlowSystem', 'validationPlantedArea',
    'validationEffectiveArea', 'validationNumberPlants', 'validationPrecipitationAround',
  'validationFurrowLength', 'validationGrooveSpacing', 'validationFlaqowGrooves'*/]; 

    for (let field of fields) {
      if (!this[field]) {
        this.showError = true;
        return field; // Retorna o nome do campo inválido
      }
    }

    // Se todos os campos forem válidos
    this.showError = false;
    return null;
  },
  calculateRecomendation() {
        // Aqui você adicionaria sua lógica de cálculo
        console.log('Calculando recomendação...');
        // Exemplo de lógica de validação
        if (!this.validateFields()) {
      return;
    }
    this.results = {
          etc: "equipment",
          laminaReposicao: "equipment",
          tempoIrrigacao: "equipment",
          diasCultura: "equipment",
          et0: "equipment",
          precipitacao: "equipment",
          kc: "equipment"
        };
        this.resultsVisible = true;

      },
    toggleAdditionalFields() {
      this.showAdditionalFields = ['Aspersão', 'MicroAspersão', 'Gotejamento', 'Pivô Central', 'Sulcos'].includes(this.selectedSystemIrrigation);
    },
    /*validateNumberInput(event, fieldName) {
      const regex = /^[0-9.]*$/;
      if (!regex.test(event.target.value)) {
        this[fieldName] = event.target.value.slice(0, -1);
      }
    },*/
  }
};
</script>

<style>
body {
  background-color: #eff4f7; /* Cor de fundo desejada */
}

.input-group-append{
  margin-right: 0px;
}

.checkbox-margin {
  margin-right: 8px; /* ou o valor que desejar */
}

.card {
    border-radius: 10px;
  }
  .list-group-item {
    font-size: 1.1em;
    background-color: #f8f9fa;
  }
  .list-group-item strong {
    color: #1b3f82;
  }
  .btn {
    font-size: 1.2em;
  }
  .shadow {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
</style>
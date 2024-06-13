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
              />
              <label class="form-check-label" for="toggleSwitch"
                >Utilizar ET0 Automática?</label
              >
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
              />
              <label class="form-check-label" for="toggleSwitch"
                >Utilizar Precipitação Automática?</label
              >
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
          <label for="option1" class="tab-label">Estação</label>
          <div class="input-group">
            <select
              id="option1"
              v-model="selectedStation"
              class="form-control"
              :disabled="!isStationDisabled"
            >
              <option value="">Selecione a Estação</option>
              <option
                v-for="equipment in stations"
                :key="equipment.Id"
                :value="equipment.Id"
              >
                ({{ equipment.Organ.Name }}) - {{ equipment.Name }} - [Et0:
                {{ equipment.Et0 }}]
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
        <div v-if="!isStationDisabled" class="form-group mb-4">
          <label for="newForm" class="tab-label" style="color: #bb4430"
            >ET0 Manual (mm)</label
          >
          <input
            id="newForm"
            v-model="selectedET0Manual"
            class="form-control"
            type="number"
            placeholder="Digite o Valor da ET0"
          />
        </div>
      </div>
      <div class="col-md-12">
        <div class="form-group mb-4">
          <label for="option2" class="tab-label">Pluviômetro</label>
          <div class="input-group">
            <select
              id="option2"
              v-model="selectedPluviometer"
              class="form-control"
              :disabled="!isPluviometerDisabled"
            >
              <option value="">Selecione o Pluviômetro</option>
              <option
                v-for="equipment in pluviometers"
                :key="equipment.Id"
                :value="equipment.Id"
              >
                ({{ equipment.Organ.Name }}) - {{ equipment.Name }} -
                [Precipitação: {{ equipment.Precipitation }} mm]
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
        <div v-if="!isPluviometerDisabled" class="form-group mb-4">
          <label for="newForm" class="tab-label" style="color: #bb4430"
            >Precipitação Manual (mm)</label
          >
          <input
            id="newForm"
            v-model="selectedPrecipitationManual"
            class="form-control"
            type="number"
            placeholder="Digite o Valor da Precipitação"
          />
        </div>
        <div class="col-md-12">
          <div class="form-group mb-4">
            <label for="option3" class="tab-label">Cultura</label>
            <div class="input-group">
              <select
                id="option3"
                v-model="selectedCulture"
                class="form-control"
              >
                <option value="">Selecione a Cultura</option>
                <option v-for="crop in crops" :key="crop.Id" :value="crop.Id">
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
            <label for="input1" class="tab-label">Data de Plantio</label>
            <div class="input-group">
              <input
              id="input1"
              v-model="dateplanting"
              type="date"
              class="form-control"
              placeholder="Digite a Data"
              :max="maxDate"
              @blur="validateDateplanting"
              />
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
            <label for="option4" class="tab-label">Sistema de Irrigação</label>
            <div class="input-group">
              <select
                id="option4"
                v-model="selectedSystemIrrigation"
                class="form-control"
                @change="toggleAdditionalFields"
              >
                <option value="">Selecione o Sistema de Irrigação</option>
                <option value="Aspersão">Aspersão</option>
                <option value="Microaspersão">Microaspersão</option>
                <option value="Gotejamento">Gotejamento</option>
                <option value="Pivô Central">Pivô Central</option>
                <option value="Sulcos">Sulcos</option>
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
            <label for="input2" class="tab-label"
              >Eficiência de Irrigação (%)</label
            >
            <div class="input-group">
              <input
              id="input2"
        v-model.number="validationIrrigationEfficiency"
        type="number"
        class="form-control"
        placeholder="Digite a Eficiência"
        :disabled="isFieldDisabled"
        min="0"
        max="100"
        @input="validateEfficiency"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <input
                    v-model="useDefault"
                    type="checkbox"
                    class="checkbox-margin"
                  />
                  Usar padrão
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
      <div v-if="showAdditionalFields" class="row">
        <div v-if="selectedSystemIrrigation === 'Aspersão'" class="col-md-12">
          <div class="form-group mb-4">
            <label class="tab-label" style="color: #bb4430"
              >Precipitação por Aspersor (mm/h)</label
            >
            <input
              v-model="validationPrecipitationSprinkler"
              type="number"
              class="form-control"
              placeholder="Digite a Precipitação por Aspersor"
            />
          </div>
        </div>
        <div
          v-if="selectedSystemIrrigation === 'Microaspersão'"
          class="col-md-12"
        >
          <div class="form-group mb-4">
            <label class="tab-label" style="color: #bb4430"
              >Vazão do Sistema (l/h)</label
            >
            <input
              v-model="validationFlowSystem"
              type="number"
              class="form-control"
              placeholder="Digite a Vazão do Sistema"
            />
          </div>
          <div class="form-group mb-4">
            <label class="tab-label" style="color: #bb4430"
              >Área Plantada (m²)</label
            >
            <input
              v-model="validationPlantedArea"
              type="number"
              class="form-control"
              placeholder="Digite a Área Plantada"
            />
          </div>
          <div class="form-group mb-4">
            <label class="tab-label" style="color: #bb4430"
              >Área efetiva de cada planta (m²/planta)</label
            >
            <input
              v-model="validationEffectiveArea"
              type="number"
              class="form-control"
              placeholder="Digite a Área efetiva de cada planta"
            />
          </div>
          <div class="form-group mb-4">
            <label class="tab-label" style="color: #bb4430"
              >Número de Plantas por área (plantas/m²)</label
            >
            <input
              v-model="validationNumberPlants"
              type="number"
              class="form-control"
              placeholder="Digite o Número de Plantas por área"
            />
          </div>
        </div>
        <div
          v-if="selectedSystemIrrigation === 'Gotejamento'"
          class="col-md-12"
        >
          <div class="form-group mb-4">
            <label class="tab-label" style="color: #bb4430"
              >Vazão do Sistema (l/h)</label
            >
            <input
              v-model="validationFlowSystem"
              type="number"
              class="form-control"
              placeholder="Digite a Vazão do Sistema"
            />
          </div>
          <div class="form-group mb-4">
            <label class="tab-label" style="color: #bb4430"
              >Área Plantada (m²)</label
            >
            <input
              v-model="validationPlantedArea"
              type="number"
              class="form-control"
              placeholder="Digite a Área Plantada"
            />
          </div>
          <div class="form-group mb-4">
            <label class="tab-label" style="color: #bb4430"
              >Área efetiva de cada planta (m²/planta)</label
            >
            <input
              v-model="validationEffectiveArea"
              type="number"
              class="form-control"
              placeholder="Digite a Área efetiva de cada planta"
            />
          </div>
          <div class="form-group mb-4">
            <label class="tab-label" style="color: #bb4430"
              >Número de Plantas por área (plantas/m²)</label
            >
            <input
              v-model="validationNumberPlants"
              type="number"
              class="form-control"
              placeholder="Digite o Número de Plantas por área"
            />
          </div>
        </div>
        <div
          v-if="selectedSystemIrrigation === 'Pivô Central'"
          class="col-md-12"
        >
          <div class="form-group mb-4">
            <label class="tab-label" style="color: #bb4430"
              >Precipitação por Volta (mm/volta)</label
            >
            <input
              v-model="validationPrecipitationAround"
              type="number"
              class="form-control"
              placeholder="Digite a Precipitação por Volta"
            />
          </div>
        </div>
        <div v-if="selectedSystemIrrigation === 'Sulcos'" class="col-md-12">
          <div class="form-group mb-4">
            <label class="tab-label" style="color: #bb4430"
              >Comprimento dos Sulcos (m)</label
            >
            <input
              v-model="validationFurrowLength"
              type="number"
              class="form-control"
              placeholder="Digite o Comprimento dos Sulcos"
            />
          </div>
          <div class="form-group mb-4">
            <label class="tab-label" style="color: #bb4430"
              >Espaçamento entre os Sulcos (m)</label
            >
            <input
              v-model="validationGrooveSpacing"
              type="number"
              class="form-control"
              placeholder="Digite o Espaçamento entre os Sulcos"
            />
          </div>
          <div class="form-group mb-4">
            <label class="tab-label" style="color: #bb4430"
              >Vazão por Sulco (l/h)</label
            >
            <input
              v-model="validationFlowGrooves"
              type="number"
              class="form-control"
              placeholder="Digite a Vazão por Sulco"
            />
          </div>
        </div>
      </div>
      <div class="row">
  <div class="col-md-12">
    <button
      class="btn"
      style="background-color: #1b3f82; color: white; margin-right: 8px"
      @click="calculateRecomendation"
    >
      Simular Lâmina
    </button>
    <button
      class="btn"
      style="background-color: #b1151f; color: white"
      @click="ClearFields"
    >
      Limpar Campos
    </button>
    <!-- Spinner de carregamento -->
  <div v-if="isLoading" class="loader"></div>
  <div v-if="resultsVisible && results" class="card mt-4 shadow">
    <div
      class="card-header text-white text-center"
      :style="{ backgroundColor: '#1b3f82' }"
    >

              <h3>Resultado Simulação de Lâmina</h3>
            </div>
            <div v-if="isLoading" class="loading">Carregando...</div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <strong>ET0:</strong> {{ results.data.Et0 }} {{ "mm" }}
                </li>
                <li class="list-group-item">
                  <strong>Precipitação:</strong> {{ results.data.Precipitation }} {{ "mm" }}
                </li>
                <li class="list-group-item">
                  <strong>Dias da Cultura:</strong> {{ results.data.CropDays }}
                </li>
                <li class="list-group-item">
                  <strong>Kc:</strong> {{ results.data.Kc }}
                </li>
                <li class="list-group-item">
                  <strong>Etc:</strong> {{ results.data.Etc }} {{ "mm" }}
                </li>
                <li class="list-group-item">
                  <strong>Lâmina de Reposição:</strong> {{ results.data.RepositionBlade }}
                </li>
                <li class="list-group-item">
                  <strong>Tempo de Irrigação:</strong> {{ results.data.IrrigationTime }}
                </li>
              </ul>
            </div>
          </div>
          <br> <br/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Resultados from "./result.vue";

export default {
  name: "RecomendationComponent",
  components: {
    Resultados
  },
  data() {
    return {
      selectedStation: '',
      isLoading: false,
      showError: false,
      stations: [],
      pluviometers: [],
      crops: [],
      resultsVisible: false,
      results: null,
      response: '',
      selectedPluviometer: '',
      selectedCulture: '',
      selectedSystemIrrigation: '',
      dateplanting: '',
      maxDate: new Date().toISOString().split('T')[0],
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
      selectedET0Manual: '', 
      selectedPrecipitationManual: '', 
      showAdditionalFields: false,
      useDefault: true,
      toggleSwitchStation: true,
      toggleSwitchPluviometer: true,
      anotherField: null,
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

      const responseCrop = await axios.get('http://seai.3v3.farm/api/v2/management/crops');
      this.crops = responseCrop.data.data;

    } catch (error) {
      console.error(error);
    }
  },
  mounted() {
      this.setMaxDate();
    },
    methods: {
      validateDateplanting() {
            if (this.dateplanting > this.maxDate) {
                this.showError = true;
                this.dateplanting = '';  // Limpa o campo se a data for inválida
            } else {
                this.showError = false;
            }
        },
      async calculateRecomendation() {
        this.isLoading = true;
    try {
        const formattedDate = this.dateplanting ? this.formatDate(this.dateplanting) : '';

        let measurements = {};

        // Verifica se o campo de eficiência está preenchido e adiciona ao objeto measurements se estiver
        if (this.isEfficiencyCheckboxChecked && this.validationIrrigationEfficiencyFromAPI) {
            measurements.Efficiency = parseFloat(this.validationIrrigationEfficiencyFromAPI);
        } else if (this.validationIrrigationEfficiency) {
            measurements.Efficiency = parseFloat(this.validationIrrigationEfficiency);
        }

        if (this.selectedSystemIrrigation === "Aspersão") {
            measurements.Precipitation = parseFloat(this.validationPrecipitationSprinkler);
        } else if (this.selectedSystemIrrigation === "Pivô Central") {
            measurements.Precipitation = parseFloat(this.validationPrecipitationAround);
        } else if (this.selectedSystemIrrigation === "Microaspersão" || this.selectedSystemIrrigation === "Gotejamento") {
            measurements.Flow = parseFloat(this.validationFlowSystem);
            measurements.Area = parseFloat(this.validationPlantedArea);
            measurements.EfectiveArea = parseFloat(this.validationEffectiveArea);
            measurements.PlantsQtd = parseFloat(this.validationNumberPlants);
        } else if (this.selectedSystemIrrigation === "Sulcos") {
            measurements.Flow = parseFloat(this.validationFlowGrooves);
            measurements.Length = parseFloat(this.validationFurrowLength);
            measurements.Spacing = parseFloat(this.validationGrooveSpacing);
        }

        const data = {
            Station: this.isStationDisabled
                ? {
                    Id: parseInt(this.selectedStation),
                    Et0: parseFloat(
                        this.stations.find(
                            (station) => station.Id === parseInt(this.selectedStation)
                        ).Et0
                    ),
                }
                : {
                    Id: null,
                    Et0: parseFloat(this.selectedET0Manual),
                },
            CropId: parseInt(this.selectedCulture),
            Pluviometer: this.isPluviometerDisabled
                ? {
                    Id: parseInt(this.selectedPluviometer),
                    Precipitation: parseFloat(
                        this.pluviometers.find(
                            (pluviometer) =>
                                pluviometer.Id === parseInt(this.selectedPluviometer)
                        ).Precipitation
                    ),
                }
                : {
                    Id: null,
                    Precipitation: parseFloat(this.selectedPrecipitationManual),
                },
            PlantingDate: formattedDate,
            System: {
                Type: this.selectedSystemIrrigation,
                Measurements: measurements
            },
        };

        console.log("Dados do formulário:", data);

    const responseBladeSuggestion = await axios.post(
      "http://seai.3v3.farm/api/v2/management/blade_suggestion",
      data
    );

    console.log("Resposta da API:", responseBladeSuggestion);
    this.results = responseBladeSuggestion.data;
    this.resultsVisible = true;
    console.log("Resultados Atualizados:", this.results);
    console.log("Resultados Visíveis:", this.resultsVisible);
  } catch (error) {
    console.error("Erro ao chamar a API:", error);
    console.log("Dados enviados:", data);
  }
  finally {
      this.isLoading = false; // Esconde o spinner
    }
},

validateEfficiency() {
      if (this.validationIrrigationEfficiency < 0) {
        this.validationIrrigationEfficiency = 0;
      } else if (this.validationIrrigationEfficiency > 100) {
        this.validationIrrigationEfficiency = 100;
      }
    },
// Função para formatar a data para DD/MM/YYYY
formatDate(date) {
  if (!date) return '';
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
},

preventTyping(event) {
      event.preventDefault(); // Previne a digitação no campo de data
    },

setMaxDate() {
        const today = new Date().toISOString().split('T')[0];
        this.maxDate = today;
      },
    ClearFields() {
      this.selectedStation = "";
      this.selectedPluviometer = "";
      this.selectedCulture = "";
      this.selectedSystemIrrigation = "";
      this.dateplanting = "";
      this.validationIrrigationEfficiency = "";
      this.validationPrecipitationSprinkler = "";
      this.validationFlowSystem = "";
      this.validationPlantedArea = "";
      this.validationEffectiveArea = "";
      this.validationNumberPlants = "";
      this.validationPrecipitationAround = "";
      this.validationFurrowLength = "";
      this.validationGrooveSpacing = "";
      this.validationFlowGrooves = "";
      this.selectedET0Manual = "";
      this.selectedPrecipitationManual = "";
      this.results = null;
      this.resultsVisible = false;
      this.showError = false;
    },
    toggleAdditionalFields() {
      this.showAdditionalFields = [
        "Aspersão",
        "Microaspersão",
        "Gotejamento",
        "Pivô Central",
        "Sulcos",
      ].includes(this.selectedSystemIrrigation);
    },
  },
};
</script>

<style>
body {
  background-color: #eff4f7;
}

.input-group-append {
  margin-right: 0px;
}

.checkbox-margin {
  margin-right: 8px;
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
    font-size: 1.0em;
  }
  .shadow {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .loader {
  width: 48px;
  height: 48px;
  border: 10px solid #FFF;
  border-radius: 50%;
  position: relative;
  transform: rotate(45deg);
  box-sizing: border-box;
}

.loader::before {
  content: "";
  position: absolute;
  box-sizing: border-box;
  inset: -10px;
  border-radius: 50%;
  border: 10px solid #1b3f82;
  animation: prixClipFix 2s infinite linear;
}

@keyframes prixClipFix {
  0% {
    clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
  }
  25% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
  }
  50% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
  }
  75% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
  }
  100% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
  }
}

</style>
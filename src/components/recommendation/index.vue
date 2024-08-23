<template>
<div class="container">
    <div
      class="container d-flex justify-content-end mb-3"
      v-if="generics.verifyToken()"
    >
      <router-link to="/laminas" style="color: #1b3f82">
        Lâminas cadastradas
      </router-link>
    </div>
    <div class="row mt-3">
      <div class="col-md-12">
        <div class="mb-4">
          <h5 style="color: #1b3f82; text-align: left;">Simulação de Lâmina</h5>
        </div>
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
                v-for="equipment in filteredStations"
                :key="equipment.Id"
                :value="equipment.Id"
              >
                ({{ equipment.Organ.Name }}) - {{ equipment.Name }} - [Et0: {{ equipment.Et0 }}]
              </option>
            </select>
            <div class="input-group-append">
              <div class="input-group-text">
                <input
                  id="toggleSwitchStation"
                  v-model="toggleSwitchStation"
                  class="form-check-input2"
                  type="checkbox"
                />
                <label class="form-check-label" for="toggleSwitchStation">
                  Dados Automáticos
                </label>
              </div>
            </div>
          </div>
          <p
            v-if="errors.selectedStation && toggleSwitchStation"
            style="color: red; font-size: 12px;"
          >
            * Campo Obrigatório
          </p>
      </div>

      <div v-if="!isStationDisabled" class="form-group mb-4">
        <label for="newFormET0" class="tab-label" style="color: #bb4430">ET0 Manual (mm)</label>
        <input
          id="newFormET0"
          v-model="selectedET0Manual"
          class="form-control"
          type="number"
          placeholder="Digite o Valor da ET0"
          @input="validateMinimum(selectedET0Manual, 'selectedET0Manual')"
        />
        <p v-if="errors.selectedET0Manual" style="color: red; font-size: 12px;">* Digite Valores acima de 0</p>
      </div>

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
              v-for="equipment in filteredPluviometer"
              :key="equipment.Id"
              :value="equipment.Id"
            >
              ({{ equipment.Organ.Name }}) - {{ equipment.Name }} - [Precipitação: {{ equipment.Precipitation }} mm]
            </option>
          </select>
          <div class="input-group-append">
            <div class="input-group-text">
              <input
                id="toggleSwitchPluviometer"
                v-model="toggleSwitchPluviometer"
                class="form-check-input2"
                type="checkbox"
              />
              <label class="form-check-label" for="toggleSwitchPluviometer">
                Dados Automáticos
              </label>
            </div>
          </div>
        </div>
        <p v-if="errors.selectedPluviometer && toggleSwitchPluviometer" style="color: red; font-size: 12px;">* Campo Obrigatório</p>
      </div>

      <div v-if="!isPluviometerDisabled" class="form-group mb-4">
        <label for="newFormPrecipitation" class="tab-label" style="color: #bb4430">Precipitação Manual (mm)</label>
        <input
          id="newFormPrecipitation"
          v-model="selectedPrecipitationManual"
          class="form-control"
          type="number"
          placeholder="Digite o Valor da Precipitação"
          @input="validateMinimum(selectedPrecipitationManual, 'selectedPrecipitationManual')"
        />
        <p v-if="errors.selectedPrecipitationManual" style="color: red; font-size: 12px;">* Digite Valores acima de 0</p>
      </div>

        <div class="form-group mb-4">
          <label for="option3" class="tab-label">Cultura</label>
          <div class="input-group">
            <select id="option3" v-model="selectedCulture" class="form-control">
              <option value="">Selecione a Cultura</option>
              <option v-for="crop in crops" :key="crop.Id" :value="crop.Id">
                {{ crop.Name }}
              </option>
            </select>
          </div>
          <p v-if="errors.selectedCulture" style="color: red; font-size: 12px">
            * Campo Obrigatório
          </p>
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
            <p v-if="errors.dateplanting" style="color: red; font-size: 12px">
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
              v-if="errors.selectedSystemIrrigation"
              style="color: red; font-size: 12px"
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
                v-model.number="IrrigationEfficiency"
                type="number"
                class="form-control"
                placeholder="Digite a Eficiência"
                :disabled="isFieldDisabled"
                min="1"
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
          </div>
        </div>
      </div>
      <div v-if="showAdditionalFields" ref="additionalFields">
        <div ref="scrollTarget"></div>
      </div>
      <div v-if="showAdditionalFields" class="row">
        <div v-if="selectedSystemIrrigation === 'Aspersão'" class="col-md-12">
          <div class="form-group mb-4">
            <label class="tab-label" style="color: #bb4430"
              >Precipitação por Aspersor (mm/h)</label
            >
            <input
              v-model.number="PrecipitationSprinkler"
              type="number"
              class="form-control"
              placeholder="Digite o valor da Precipitação por Aspersor"
              @input="
                validateMinimum(
                  PrecipitationSprinkler,
                  'PrecipitationSprinkler'
                )
              "
            />
            <p
              v-if="errors.PrecipitationSprinkler"
              style="color: red; font-size: 12px"
            >
              * Digite Valores acima de 0
            </p>
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
              v-model.number="FlowSystem"
              type="number"
              class="form-control"
              placeholder="Digite o valor da Vazão do Sistema"
              @input="validateMinimum(FlowSystem, 'FlowSystem')"
            />
            <p v-if="errors.FlowSystem" style="color: red; font-size: 12px">
              * Digite Valores acima de 0
            </p>
          </div>
          <div class="form-group mb-4">
            <label class="tab-label" style="color: #bb4430"
              >Área Plantada (m²)</label
            >
            <input
              v-model.number="PlantedArea"
              type="number"
              class="form-control"
              placeholder="Digite o valor da Área Plantada"
              @input="validateMinimum(PlantedArea, 'PlantedArea')"
            />
            <p v-if="errors.PlantedArea" style="color: red; font-size: 12px">
              * Digite Valores acima de 0
            </p>
          </div>
          <div class="form-group mb-4">
            <label class="tab-label" style="color: #bb4430"
              >Área efetiva de cada planta (m²/planta)</label
            >
            <input
              v-model.number="EffectiveArea"
              type="number"
              class="form-control"
              placeholder="Digite o valor da Área efetiva de cada planta"
              @input="validateMinimum(EffectiveArea, 'EffectiveArea')"
            />
            <p v-if="errors.EffectiveArea" style="color: red; font-size: 12px">
              * Digite Valores acima de 0
            </p>
          </div>
          <div class="form-group mb-4">
            <label class="tab-label" style="color: #bb4430"
              >Número de Plantas por Área (plantas/m²)</label
            >
            <input
              v-model.number="NumberPlants"
              type="number"
              class="form-control"
              placeholder="Digite o valor de Número de Plantas por Área"
              @input="validateMinimum(NumberPlants, 'NumberPlants')"
            />
            <p v-if="errors.NumberPlants" style="color: red; font-size: 12px">
              * Digite Valores acima de 0
            </p>
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
              v-model.number="FlowSystem"
              type="number"
              class="form-control"
              placeholder="Digite o valor da Vazão do Sistema"
              @input="validateMinimum(FlowSystem, 'FlowSystem')"
            />
            <p v-if="errors.FlowSystem" style="color: red; font-size: 12px">
              * Digite Valores acima de 0
            </p>
          </div>
          <div class="form-group mb-4">
            <label class="tab-label" style="color: #bb4430"
              >Área Plantada (m²)</label
            >
            <input
              v-model.number="PlantedArea"
              type="number"
              class="form-control"
              placeholder="Digite o valor da Área Plantada"
              @input="validateMinimum(PlantedArea, 'PlantedArea')"
            />
            <p v-if="errors.PlantedArea" style="color: red; font-size: 12px">
              * Digite Valores acima de 0
            </p>
          </div>
          <div class="form-group mb-4">
            <label class="tab-label" style="color: #bb4430"
              >Área efetiva de cada planta (m²/planta)</label
            >
            <input
              v-model.number="EffectiveArea"
              type="number"
              class="form-control"
              placeholder="Digite o valor da Área efetiva de cada planta"
              @input="validateMinimum(EffectiveArea, 'EffectiveArea')"
            />
            <p v-if="errors.EffectiveArea" style="color: red; font-size: 12px">
              * Digite Valores acima de 0
            </p>
          </div>
          <div class="form-group mb-4">
            <label class="tab-label" style="color: #bb4430"
              >Número de Plantas por Área (plantas/m²)</label
            >
            <input
              v-model.number="NumberPlants"
              type="number"
              class="form-control"
              placeholder="Digite o valor do Número de Plantas por Área"
              @input="validateMinimum(NumberPlants, 'NumberPlants')"
            />
            <p v-if="errors.NumberPlants" style="color: red; font-size: 12px">
              * Digite Valores acima de 0
            </p>
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
              v-model.number="PrecipitationAround"
              type="number"
              class="form-control"
              placeholder="Digite o valor da Precipitação por Volta"
              @input="
                validateMinimum(PrecipitationAround, 'PrecipitationAround')
              "
            />
            <p
              v-if="errors.PrecipitationAround"
              style="color: red; font-size: 12px"
            >
              * Digite Valores acima de 0
            </p>
          </div>
        </div>
        <div v-if="selectedSystemIrrigation === 'Sulcos'" class="col-md-12">
          <div class="form-group mb-4">
            <label class="tab-label" style="color: #bb4430"
              >Comprimento dos Sulcos (m)</label
            >
            <input
              v-model.number="FurrowLength"
              type="number"
              class="form-control"
              placeholder="Digite o valor do Comprimento por Sulcos"
              @input="validateMinimum(FurrowLength, 'FurrowLength')"
            />
            <p v-if="errors.FurrowLength" style="color: red; font-size: 12px">
              * Digite Valores acima de 0
            </p>
          </div>
          <div class="form-group mb-4">
            <label class="tab-label" style="color: #bb4430"
              >Espaçamento entre os Sulcos (m)</label
            >
            <input
              v-model.number="GrooveSpacing"
              type="number"
              class="form-control"
              placeholder="Digite o valor do Espaçamento entre os Sulcos"
              @input="validateMinimum(GrooveSpacing, 'GrooveSpacing')"
            />
            <p v-if="errors.GrooveSpacing" style="color: red; font-size: 12px">
              * Digite Valores acima de 0
            </p>
          </div>
          <div class="form-group mb-4">
            <label class="tab-label" style="color: #bb4430"
              >Vazão por Sulco (l/h)</label
            >
            <input
              v-model.number="FlowGrooves"
              type="number"
              class="form-control"
              placeholder="Digite o valor da Vazão por Sulco"
              @input="validateMinimum(FlowGrooves, 'FlowGrooves')"
            />
            <p v-if="errors.FlowGrooves" style="color: red; font-size: 12px">
              * Digite Valores acima de 0
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div
          class="col-md-12 d-flex flex-column justify-content-end gap-3 w-100 pb-2"
        >
          <div class="w-100 d-flex justify-content-end gap-2">
            <Button
              class="btn-danger"
              @click="ClearFields"
              label="Limpar Campos"
            >
            </Button>
            <Button
              class="btn-primary"
              @click="validateAndCalculate"
              label="Simular Lâmina"
            >
            </Button>
          </div>

          <ProgressSpinner v-if="isLoading" />
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
                  <strong>Precipitação:</strong>
                  {{ results.data.Precipitation }} {{ "mm" }}
                </li>
                <li class="list-group-item">
                  <strong>Eficiência de Irrigação:</strong>
                  {{ results.data.IrrigationEfficiency * 100 }} {{ "%" }}
                </li>
                <li class="list-group-item">
                  <strong>Dias da Cultura:</strong> {{ results.data.CropDays }}
                </li>
                <li class="list-group-item">
                  <strong>Estágio Fenológico:</strong> {{ results.data.Stage }}
                </li>
                <li class="list-group-item">
                  <strong>Kc:</strong> {{ results.data.Kc }}
                </li>
                <li class="list-group-item">
                  <strong>Etc:</strong> {{ results.data.Etc }} {{ "mm" }}
                </li>
                <li class="list-group-item">
                  <strong>Lâmina de Reposição:</strong>
                  {{ results.data.RepositionBlade }} {{ "mm" }}
                </li>
                <li class="list-group-item">
                  <strong>Tempo de Irrigação:</strong>
                  {{ results.data.IrrigationTime }}
                </li>
              </ul>
            </div>
          </div>
          <br />
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Resultados from "./result.vue";
import SaveModal from "../Slide/SaveModal.vue/SaveModal.vue";
import { Generics } from "../../utils/generics.utils";
import { API_BASE_URL } from '../../services/config.js';
import { API_BASE_URL2 } from '../../services/config.js';
import { toast } from "vue3-toastify";
import MapView from '../Map/Map.vue';

export default {
  name: "RecomendationComponent",
  components: {
    Resultados,
    SaveModal,
    MapView,
  },
  data() {
    return {
      selectedStation: "",
      isLoading: false,
      stations: [],
      pluviometers: [],
      crops: [],
      resultsVisible: false,
      results: null,
      response: "",
      responseBlade: null,
      selectedPluviometer: "",
      selectedCulture: "",
      selectedSystemIrrigation: "",
      dateplanting: "",
      maxDate: new Date().toISOString().split("T")[0],
      IrrigationEfficiency: "",
      PrecipitationSprinkler: "",
      FlowSystem: "",
      PlantedArea: "",
      EffectiveArea: "",
      NumberPlants: "",
      PrecipitationAround: "",
      FurrowLength: "",
      GrooveSpacing: "",
      FlowGrooves: "",
      selectedET0Manual: "",
      selectedPrecipitationManual: "",
      showAdditionalFields: false,
      useDefault: true,
      toggleSwitchStation: true,
      toggleSwitchPluviometer: true,
      anotherField: null,
      myField: "",
      errors: {
        selectedStation: false,
        selectedPluviometer: false,
        selectedCulture: false,
        dateplanting: false,
        selectedSystemIrrigation: false,
        PrecipitationSprinkler: false,
        FlowSystem: false,
        PlantedArea: false,
        EffectiveArea: false,
        NumberPlants: false,
        PrecipitationAround: false,
        FurrowLength: false,
        GrooveSpacing: false,
        FlowGrooves: false,
      },
      saveBlade: false,
      generics: new Generics(),
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
    },
    filteredStations() {
      return this.stations.filter(equipment => equipment.Enable && equipment.Et0 !== null && equipment.Et0 !== undefined);
    },
    filteredPluviometer(){
      return this.pluviometers.filter(equipment => equipment.Enable && equipment.Precipitation !== null && equipment.Precipitation !== undefined);
    }
  },
  async created() {
  const baseUrl = API_BASE_URL; 
  const baseUrl2 = API_BASE_URL2;

  try {
    const responseStation = await axios.get(`${baseUrl}/equipments/activated?type=station`);
    this.stations = responseStation.data.data;
  } catch (error) {
    toast.error('Erro ao buscar dados de Estações');
    console.error(error);
  }

  try {
    const responsePluviometer = await axios.get(`${baseUrl}/equipments/activated?type=pluviometer`);
    this.pluviometers = responsePluviometer.data.data;
  } catch (error) {
    toast.error('Erro ao buscar dados de Pluviômetros');
    console.error(error);
  }

  try {
    const responseCrop = await axios.get(`${baseUrl2}/management/crops`);
    this.crops = responseCrop.data.data;
  } catch (error) {
    toast.error('Erro ao buscar dados de Culturas');
    console.error(error);
  }
},

  mounted() {
    this.setMaxDate();
  },
  methods: {
    /*validateDateplanting() {
            if (this.dateplanting > this.maxDate) {
                this.showErrordp = true;
                this.dateplanting = '';
            } else {
                this.showErrordp = false;
            }
        },*/

        handleStationSelected(station) {
      this.selectedStation = station.Id; // Atualiza o v-model com a estação selecionada
    },
        validateAndCalculate() {
  console.log("Validando os dados...");
  this.errors.selectedStation = !this.selectedStation && this.isStationDisabled;
  this.errors.selectedET0Manual = !this.selectedET0Manual && !this.isStationDisabled;
  this.errors.selectedPluviometer = !this.selectedPluviometer && this.isPluviometerDisabled;
  this.errors.selectedPrecipitationManual = !this.selectedPrecipitationManual && !this.isPluviometerDisabled;
  this.errors.selectedCulture = !this.selectedCulture;
  this.errors.dateplanting = !this.dateplanting;
  this.errors.selectedSystemIrrigation = !this.selectedSystemIrrigation;

  switch (this.selectedSystemIrrigation) {
    case "Aspersão":
      this.errors.PrecipitationSprinkler =
        !this.PrecipitationSprinkler || this.PrecipitationSprinkler === 0;
      break;
    case "Pivô Central":
      this.errors.PrecipitationAround =
        !this.PrecipitationAround || this.PrecipitationAround === 0;
      break;
    case "Sulcos":
      this.errors.FurrowLength =
        !this.FurrowLength || this.FurrowLength === 0;
      this.errors.GrooveSpacing =
        !this.GrooveSpacing || this.GrooveSpacing === 0;
      this.errors.FlowGrooves = !this.FlowGrooves || this.FlowGrooves === 0;
      break;
    case "Gotejamento":
    case "Microaspersão":
      this.errors.FlowSystem = !this.FlowSystem || this.FlowSystem === 0;
      this.errors.PlantedArea = !this.PlantedArea || this.PlantedArea === 0;
      this.errors.EffectiveArea =
        !this.EffectiveArea || this.EffectiveArea === 0;
      this.errors.NumberPlants =
        !this.NumberPlants || this.NumberPlants === 0;
      break;
    default:
      toast.warning('Sistema de Irrigação não definido');
      console.log("Sistema de irrigação desconhecido.");
      break;
  }

  const hasError = Object.values(this.errors).some((error) => error);

  if (!hasError) {
    console.log(
      "Sem erros nos campos, Começando cálculo da Lâmina de Irrigação..."
    );
    this.results = null;
    this.resultsVisible = false;
    this.calculateRecomendation();
  }
},
async calculateRecomendation() {
  this.isLoading = true;
  try {
    const baseUrl2 = API_BASE_URL2;
    const formattedDate = this.dateplanting
      ? this.formatDate(this.dateplanting)
      : "";

    let measurements = {};

    if (
      this.isEfficiencyCheckboxChecked &&
      this.IrrigationEfficiencyFromAPI
    ) {
      measurements.Efficiency = parseFloat(this.IrrigationEfficiencyFromAPI);
    } else if (this.IrrigationEfficiency) {
      measurements.Efficiency = parseFloat(this.IrrigationEfficiency);
    }

    if (this.selectedSystemIrrigation === "Aspersão") {
      measurements.Precipitation = parseFloat(this.PrecipitationSprinkler);
    } else if (this.selectedSystemIrrigation === "Pivô Central") {
      measurements.Precipitation = parseFloat(this.PrecipitationAround);
    } else if (
      this.selectedSystemIrrigation === "Microaspersão" ||
      this.selectedSystemIrrigation === "Gotejamento"
    ) {
      measurements.Flow = parseFloat(this.FlowSystem);
      measurements.Area = parseFloat(this.PlantedArea);
      measurements.EfectiveArea = parseFloat(this.EffectiveArea);
      measurements.PlantsQtd = parseFloat(this.NumberPlants);
    } else if (this.selectedSystemIrrigation === "Sulcos") {
      measurements.Flow = parseFloat(this.FlowGrooves);
      measurements.Length = parseFloat(this.FurrowLength);
      measurements.Spacing = parseFloat(this.GrooveSpacing);
    }

    const stationData = this.isStationDisabled
      ? {
          Id: parseInt(this.selectedStation),
          Et0: parseFloat(
            this.stations.find(
              (station) => station.Id === parseInt(this.selectedStation)
            ).Et0
          ),
        }
      : {
          Et0: parseFloat(this.selectedET0Manual),
        };

    const pluviometerData = this.isPluviometerDisabled
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
          Precipitation: parseFloat(this.selectedPrecipitationManual),
        };

    const data = {
      Station: stationData,
      CropId: parseInt(this.selectedCulture),
      Pluviometer: pluviometerData,
      PlantingDate: formattedDate,
      System: {
        Type: this.selectedSystemIrrigation,
        Measurements: measurements,
      },
    };

    this.responseBlade = data;

    const responseBladeSuggestion = await axios.post(
      `${baseUrl2}/management/blade_suggestion`,
      data
    );

    console.log("Resposta da API:", responseBladeSuggestion);
    this.results = responseBladeSuggestion.data;
    this.resultsVisible = true;
    console.log("Resultados Atualizados:", this.results);
    console.log("Resultados Visíveis:", this.resultsVisible);
  } catch (error) {
    const errorMessage = error.response && error.response.data && error.response.data.error 
      ? error.response.data.error 
      : 'Erro ao realizar cálculo de lâmina';
    toast.error(errorMessage);
    console.error("Erro ao chamar a API:", error);
    console.log("Dados enviados:", data);
    this.results = null;
    this.resultsVisible = false;
  } finally {
    this.isLoading = false;
  }
},
    validateEfficiency() {
      if (this.IrrigationEfficiency < 1) {
        this.IrrigationEfficiency = 1;
      } else if (this.IrrigationEfficiency > 100) {
        this.IrrigationEfficiency = 100;
      }
    },

    validateMinimum(value, field) {
      if (value === "" || value === null || value === undefined) {
        this[field] = value;
      } else {
        const parsedValue = parseFloat(value);
        if (!isNaN(parsedValue) && parsedValue >= 0.0) {
          this[field] = parsedValue;
        } else {
          this[field] = 0.0;
        }
      }
    },
    formatDate(date) {
      if (!date) return "";
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },

    preventTyping(event) {
      event.preventDefault();
    },

    setMaxDate() {
      const today = new Date().toISOString().split("T")[0];
      this.maxDate = today;
    },

    CleanResults() {
      this.results = null;
    },

    ClearFields() {
      this.selectedStation = "";
      this.selectedPluviometer = "";
      this.selectedCulture = "";
      this.selectedSystemIrrigation = "";
      this.dateplanting = "";
      this.IrrigationEfficiency = "";
      this.PrecipitationSprinkler = "";
      this.FlowSystem = "";
      this.PlantedArea = "";
      this.EffectiveArea = "";
      this.NumberPlants = "";
      this.PrecipitationAround = "";
      this.FurrowLength = "";
      this.GrooveSpacing = "";
      this.FlowGrooves = "";
      this.selectedET0Manual = "";
      this.selectedPrecipitationManual = "";
      this.results = null;
      this.resultsVisible = false;
      this.errors.selectedStation = false;
      this.errors.selectedET0Manual = false;
      this.errors.selectedET0Manual = false;
      this.errors.selectedPluviometer = false;
      this.errors.selectedPrecipitationManual = false;
      this.errors.selectedCulture = false;
      this.errors.dateplanting = false;
      this.errors.selectedSystemIrrigation = false;
      this.errors.PrecipitationSprinkler = false;
      this.errors.PrecipitationAround = false;
      this.errors.FurrowLength = false;
      this.errors.GrooveSpacing = false;
      this.errors.FlowGrooves = false;
      this.errors.FlowSystem = false;
      this.errors.PlantedArea = false;
      this.errors.EffectiveArea = false;
      this.errors.NumberPlants = false;
    },
    toggleAdditionalFields() {
      const validSelections = [
        "Aspersão",
        "Microaspersão",
        "Gotejamento",
        "Pivô Central",
        "Sulcos",
      ];

      this.showAdditionalFields = validSelections.includes(
        this.selectedSystemIrrigation
      );

      this.$nextTick(() => {
        if (this.showAdditionalFields && this.$refs.additionalFields) {
          setTimeout(() => {
            this.$refs.additionalFields.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      });
    },
  },
};
</script>

<style>
body {
  background-color: #eff4f7;
}

.text-danger {
  color: red;
  font-size: 12px;
}

.input-group-append {
  margin-right: 0px;
}

.checkbox-margin {
  margin-right: 8px;
}

.form-check-input1 {
  margin-right: 8px;
  margin-left: 8px;
}

.form-check-input2 {
  margin-right: 8px;
}

.card {
  border-radius: 20px;
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

.loader {
  width: 48px;
  height: 48px;
  border: 10px solid #fff;
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

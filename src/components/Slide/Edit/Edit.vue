<template>
  <div class="background-black">
    <div class="edit-form">
      <div
        v-if="loading"
        class="loading w-100 h-100 d-flex justify-content-center align-items-center"
      >
        <ProgressSpinner />
      </div>

      <form
        v-else-if="!loading && !createUserMode"
        @submit.prevent="onSaveItem"
        class="w-100 d-flex flex-column"
      >
        <div class="w-100 d-flex justify-content-center">
          <h5>{{ card.Id ? `Editando ${card.Name}` : "Criando lâmina" }}</h5>
        </div>

        <div
          class="form-group form-group-text text-left p-float-label w-100 mt-4"
        >
          <InputText
            id="precipitationSprinkler"
            v-model="cards.Name"
            class="w-full"
          />
          <label for="login" class="font-weight-bold">Nome da lâmina </label>
        </div>
        <div
          class="form-group form-group-text text-left p-float-label w-100 mt-4"
        >
          <Dropdown
            v-model="selectedCrop"
            :options="crops"
            optionLabel="Name"
            placeholder="Selecionar cultura"
            class="w-100"
          />
          <label for="login" class="font-weight-bold">Cultura </label>
        </div>
        <div
          class="form-group form-group-text text-left p-float-label w-100 mt-4"
        >
          <Calendar
            dateFormat="dd/mm/yy"
            v-model="cards.PlantingDate"
            class="w-100"
            :maxDate="new Date()"
          />
          <label for="login" class="font-weight-bold">Data de plantio </label>
        </div>

        <div
          class="form-group form-group-text text-left p-float-label w-100 mt-4"
        >
          <Dropdown
            v-model="selectedSystem"
            :options="systemTypes"
            optionLabel="name"
            placeholder="Selecionar o sistema de irrigação"
            class="w-100"
          />
          <label for="login" class="font-weight-bold"
            >Sistema de irrigação
          </label>
        </div>
        <div
          v-if="selectedSystem.id === 2 || selectedSystem.id === 3"
          class="col-md-12"
        >
          <div
            class="form-group form-group-text text-left p-float-label w-100 mt-4"
          >
            <InputText
              id="flowSystem"
              v-model="cards.System.Measurements.Flow"
              type="number"
              class="w-full"
            />
            <label
              for="flowSystem"
              class="font-weight-bold"
              style="color: #bb4430"
              >Vazão do Sistema (l/h)</label
            >
          </div>
          <div
            class="form-group form-group-text text-left p-float-label w-100 mt-4"
          >
            <InputText
              id="plantedArea"
              v-model="cards.System.Measurements.Area"
              type="number"
              class="w-full"
            />
            <label
              for="plantedArea"
              class="font-weight-bold"
              style="color: #bb4430"
              >Área Plantada (m²)</label
            >
          </div>
          <div
            class="form-group form-group-text text-left p-float-label w-100 mt-4"
          >
            <InputText
              id="effectiveArea"
              v-model="cards.System.Measurements.EfectiveArea"
              type="number"
              class="w-full"
            />
            <label
              for="effectiveArea"
              class="font-weight-bold"
              style="color: #bb4430"
              >Área efetiva de cada planta (m²/planta)</label
            >
          </div>
          <div
            class="form-group form-group-text text-left p-float-label w-100 mt-4"
          >
            <InputText
              id="numberPlants"
              v-model="cards.System.Measurements.PlantsQtd"
              type="number"
              class="w-full"
            />
            <label
              for="numberPlants"
              class="font-weight-bold"
              style="color: #bb4430"
              >Número de Plantas por Área (plantas/m²)</label
            >
          </div>
        </div>
        <div
          v-if="selectedSystem.id === 1 || selectedSystem.id === 4"
          class="col-md-12"
        >
          <div
            class="form-group form-group-text text-left p-float-label w-100 mt-4"
          >
            <InputText
              id="precipitationAround"
              v-model="cards.System.Measurements.Precipitation"
              type="number"
              class="w-full"
            />
            <label
              for="precipitationAround"
              class="font-weight-bold"
              style="color: #bb4430"
            >
              {{
                selectedSystem.id === 1
                  ? "Precipitação por Aspersor (mm/h)"
                  : "Precipitação por Volta (mm/volta)"
              }}
            </label>
          </div>
        </div>
        <div v-if="selectedSystem.id === 5" class="col-md-12">
          <div
            class="form-group form-group-text text-left p-float-label w-100 mt-4"
          >
            <InputText
              id="furrowLength"
              v-model="cards.System.Measurements.Length"
              type="number"
              class="w-full"
            />
            <label
              for="furrowLength"
              class="font-weight-bold"
              style="color: #bb4430"
              >Comprimento dos Sulcos (m)</label
            >
          </div>
          <div
            class="form-group form-group-text text-left p-float-label w-100 mt-4"
          >
            <InputText
              id="grooveSpacing"
              v-model="cards.System.Measurements.Spacing"
              type="number"
              class="w-full"
            />
            <label
              for="grooveSpacing"
              class="font-weight-bold"
              style="color: #bb4430"
              >Espaçamento entre os Sulcos (m)</label
            >
          </div>
          <div
            class="form-group form-group-text text-left p-float-label w-100 mt-4"
          >
            <InputText
              id="flowGrooves"
              v-model="cards.System.Measurements.Flow"
              type="number"
              class="w-full"
            />
            <label
              for="flowGrooves"
              class="font-weight-bold"
              style="color: #bb4430"
              >Vazão por Sulco (l/h)</label
            >
          </div>
        </div>
        <div
          class="form-group form-group-text text-left mt-4 w-100 d-flex gap-2"
        >
          <Button
            label="Cancelar"
            class="w-50 btn-danger"
            @click="onCloseEditMode"
          />
          <Button label="Salvar" type="submit" class="w-50 btn-primary" />
        </div>
      </form>

      <div class="equipments-user" v-else-if="!loading && createUserMode">
        <div class="equipment-msg">
          <i class="pi pi-info-circle" style="font-size: 1rem"></i>

          <p>
            Você precisa pré-selecionar os equipamentos para realizar os
            cálculos
          </p>
        </div>
        <Equipments @on-save-equipments="getUserEquipments" />
      </div>
    </div>
    <div></div>
  </div>
</template>
<script>
import { SlideRest } from "../../../services/slide.service";
import { Generics } from "../../../utils/generics.utils";
import { SettingsRest } from "@/services/settings.service";
import Equipments from "../../SettingsComponent/Equipments.vue";

export default {
  name: "SlideEditComponent",
  components: {
    Equipments,
  },
  props: {
    card: {
      type: Object,
      required: true,
    },
    service: {
      type: SlideRest,
      required: true,
    },
  },
  emits: ["onSaveItem", "onCloseEditMode"],
  data() {
    return {
      cards: {},
      crops: [],
      selectedCrop: {
        Name: "",
        Id: "",
        LocationName: null,
      },
      selectedSystem: {
        id: 1,
        name: "Aspersão",
      },
      selectedSystemIrrigation: "",
      PrecipitationSprinkler: null,
      FlowSystem: null,
      PlantedArea: null,
      EffectiveArea: null,
      NumberPlants: null,
      PrecipitationAround: null,
      FurrowLength: null,
      GrooveSpacing: null,
      FlowGrooves: null,
      loading: true,
      generics: new Generics(),
      systemTypes: [
        { id: 1, name: "Aspersão" },
        { id: 2, name: "Microaspersão" },
        { id: 3, name: "Gotejamento" },
        { id: 4, name: "Pivô Central" },
        { id: 5, name: "Sulcos" },
      ],
      equipmentsServices: new SettingsRest(),
      createUserMode: false,
    };
  },

  mounted() {
    this.cards = this.card;
    if (typeof this.cards.PlantingDate === "string") {
      this.cards.PlantingDate =
        this.cards.PlantingDate === null
          ? new Date()
          : new Date(this.generics.convertDateString(this.cards.PlantingDate));
    }
    this.getUserEquipments();
  },
  methods: {
    getAllSystem() {
      this.selectedSystem = this.systemTypes.find(
        (type) => type.name === this.cards.System.Type
      );
    },
    getUserEquipments() {
      this.loading = true;
      this.equipmentsServices.getUserEquipments().then((res) => {
        this.userEquipments = res.data[0];
        if (this.userEquipments) {
          this.getAllCulture();
          this.getAllSystem();
        } else {
          this.createUserMode = true;
        }
      });
    },
    getAllCulture() {
      this.service
        .getAllCulture()
        .then((response) => {
          this.crops = response.data;
          this.selectedCrop.Name = this.cards.Crop;
          this.selectedCrop.Id = this.cards.CropId;
          const crop = this.crops.find((c) => c.Id === this.cards.CropId);
          if (crop) {
            this.selectedCrop.Name = crop.Name;
            this.selectedCrop.Id = crop.Id;
          }
        })
        .finally(() => (this.loading = false));
    },
    onSaveItem() {
      this.loading = true;
      this.cards.PlantingDate = this.generics.convertDate(
        this.cards.PlantingDate
      );
      this.cards.CropId = this.selectedCrop.Id;
      this.cards.System.Type = this.selectedSystem.name;
      this.$emit("onSaveItem", this.cards);
      this.resetForm();
    },
    onCloseEditMode() {
      this.$emit("onCloseEditMode");
    },
  },
};
</script>
<style lang="scss" scoped>
.background-black {
  background-color: rgba(0, 0, 0, 0.411);
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: end;
  .edit-form {
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
    min-width: 360px;
    height: 100vh;
    padding: 10px;
    .equipments-user {
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .equipment-msg {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        i {
          margin-top: -20px;
        }
      }
    }
    form {
      height: 100vh;
      display: flex;
      justify-content: center;
    }
    h5 {
      color: #1b3f82;
    }
  }
  .p-dropdown {
    border: 2px solid #2c5ebb7d;
  }
}
</style>

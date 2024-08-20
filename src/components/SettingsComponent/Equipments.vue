<template>
  <ProgressSpinner v-if="loading" />
  <form @submit.prevent="save" v-else class="form-equipments">
    <h5>Equipamentos</h5>
    <div class="equipments flex-column mt-4">
      <div
        :style="maxWidthStyle"
        class="form-group form-group-text teste text-left p-float-label mt-4"
      >
        <Dropdown
          v-model="selectedStation"
          :options="stations"
          optionLabel="label"
          placeholder="Selecionar estação"
          class="w-100"
          required
        />
        <label for="login" class="font-weight-bold">Estações</label>
      </div>
      <div
        :style="maxWidthStyle"
        class="form-group form-group-text text-left p-float-label mt-4"
      >
        <Dropdown
          v-model="selectedPluv"
          :options="pluvs"
          optionLabel="label"
          placeholder="Selecionar pluviômetro"
          class="w-100 teste"
          required
        />
        <label for="login" class="font-weight-bold">Pluviômetros</label>
      </div>
      <div
        class="form-button text-left p-float-label mt-4 d-flex justify-content-end"
      >
        <Button
          :disabled="loadingBtn"
          class="btn-primary w-100"
          :label="!loadingBtn ? 'Salvar' : 'Salvando'"
          type="submit"
        ></Button>
      </div>
    </div>
  </form>
</template>

<script>
import { SettingsRest } from "@/services/settings.service";
import { EquipmentsRest } from "@/services/equipments.service";
import { toast } from "vue3-toastify";

export default {
  name: "EquipmentsComponent",
  props: {
    maxWidth: {
      type: String,
      default: "",
    },
  },
  emits: ["onSaveEquipments"],
  data() {
    return {
      loading: true,
      loadingBtn: true,
      service: new SettingsRest(),
      equipmentsServices: new EquipmentsRest(),
      stations: [],
      pluvs: [],
      userEquipments: {},
      selectedStation: {},
      selectedPluv: {},
      params: {
        pageNumber: 1,
        limit: 100,
        id_category: 0,
      },
    };
  },
  computed: {
    maxWidthStyle() {
      return this.maxWidth ? { "max-width": this.maxWidth } : {};
    },
  },
  mounted() {
    this.getUserEquipments();
  },
  methods: {
    getUserEquipments() {
      this.loading = true;
      this.service
        .getUserEquipments()
        .then((res) => {
          this.userEquipments = res.data[0];
        })
        .finally(() => {
          this.getAllStations();
        });
    },
    getAllStations() {
      this.loading = true;
      this.equipmentsServices
        .getAllEquipmentsActivated("station")
        .then((res) => {
          this.stations = res.data;
          this.stations.forEach((station) => {
            station.label = this.createLabel(station);
            if (
              this.userEquipments &&
              station.Id === this.userEquipments.station_id
            ) {
              this.selectedStation = station;
            }
          });
          this.getAllPluv();
        });
    },
    getAllPluv() {
      this.loading = true;
      this.equipmentsServices
        .getAllEquipmentsActivated("pluviometer")
        .then((res) => {
          this.pluvs = res.data;
          this.pluvs.forEach((pluv) => {
            pluv.label = this.createLabel(pluv);
            if (
              this.userEquipments &&
              pluv.Id === this.userEquipments.pluviometer_id
            ) {
              this.selectedPluv = pluv;
            }
          });
        })
        .finally(() => {
          this.loading = false;
          this.loadingBtn = false;
        });
    },
    save() {
      this.loadingBtn = true;
      const data = {
        StationId: this.selectedStation.Id,
        PluviometerId: this.selectedPluv.Id,
      };
      if (this.userEquipments) {
        this.update(data);
      } else {
        this.create(data);
      }
    },
    update(data) {
      this.service
        .updateUserEquipments(data)
        .then(() => {
          this.$emit("onSaveEquipments");
          toast.success("Equipamentos salvos com sucesso!");
        })
        .finally(() => {
          this.loadingBtn = false;
        });
    },
    create(data) {
      this.service
        .createUserEquipments(data)
        .then(() => {
          this.$emit("onSaveEquipments");
          toast.success("Equipamentos salvos com sucesso!");
        })
        .finally(() => {
          this.loadingBtn = false;
        });
    },
    createLabel(item) {
      let msg =
        item.Type.Name === "station"
          ? `[ET0: ${item.Et0 ?? "-"}]`
          : `[Prec.: ${item.Precipitation ?? 0} mm]`;
      return `(${item.Organ.Name}) - ${item.Name} - ${msg}`;
    },
  },
};
</script>

<style lang="scss">
.form-equipments {
  flex-direction: column;
  border-bottom: 1px solid #1b3f821c;
  height: 400px !important;
  .equipments {
    display: flex;
    gap: 12px;
    min-height: 100px !important;
    flex-wrap: wrap;
    min-width: 300px;

    .form-group {
      height: 50px;
      display: flex;
      flex-direction: row;
      width: 43%;
      min-width: 300px;
    }
    .form-button {
      height: 50px;
      width: 10%;
      min-width: 100px;
      button {
        width: 100%;
      }
    }
  }
}
.max-width-class {
  max-width: 300px;
}

@media (max-width: 400px) {
  .form-group {
    height: 50px;
    display: flex;
    flex-direction: row;
    width: 43%;
    max-width: 300px;
  }
  .p-dropdown-items-wrapper {
    max-width: 300px !important;
    li {
      margin-left: -40px;
      font-size: 10px;
    }
  }
}
</style>

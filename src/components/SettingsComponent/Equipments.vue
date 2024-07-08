<template>
  <ProgressSpinner v-if="loading" />
  <form @submit.prevent="save" v-else class="form-equipments">
    <h4>Equipamentos</h4>
    <div class="equipments">
      <div
        class="form-group form-group-text text-left p-float-label w-100 mt-4"
      >
        <Dropdown
          v-model="selectedStation"
          :options="stations"
          optionLabel="label"
          placeholder="Selecionar estação"
          class="w-100"
          required
        />
        <label for="login" class="font-weight-bold">Estações </label>
      </div>
      <div
        class="form-group form-group-text text-left p-float-label w-100 mt-4"
      >
        <Dropdown
          v-model="selectedPluv"
          :options="pluvs"
          optionLabel="label"
          placeholder="Selecionar pluviômetro"
          class="w-100"
          required
        />
        <label for="login" class="font-weight-bold">Pluviômetros</label>
      </div>
      <div
        class="form-group form-group-text text-left p-float-label w-25 mt-4 d-flex justify-content-end"
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
  height: 240px !important;
  .equipments {
    display: flex;
    gap: 12px;
    height: 100px !important;
    flex-wrap: wrap;
    .form-group {
      height: 50px;
      display: flex;
      flex-direction: row;
    }
  }
}
@media (max-width: 766px) {
}
</style>

<template>
  <ProgressSpinner v-if="loading" />
  <div class="email-component" v-else>
    <h4>E-mail</h4>
    <div class="email-body w-50">
      <div class="email-item w-100">
        <div class="notification">
          <i class="pi pi-bell" style="font-size: 1.2rem"></i>
        </div>
        <div class="text w-75" style="width: 400px">
          <p>Receber recomendações de lâmina por e-mail</p>
        </div>
        <InputSwitch
          v-model="notification[1].Enabled"
          class="custom-switch"
          @change="updateNotifications(notification[1])"
        />
      </div>
      <div class="email-item">
        <div class="notification">
          <i class="pi pi-bell" style="font-size: 1.2rem"></i>
        </div>
        <div class="text w-75">
          <p>Receber notícias por e-mail</p>
        </div>
        <InputSwitch
          v-model="notification[0].Enabled"
          @change="updateNotifications(notification[0])"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { SettingsRest } from "@/services/settings.service";
import { EquipmentsRest } from "@/services/equipments.service";
import { toast } from "vue3-toastify";

export default {
  name: "EmailComponent",
  emits: ["onSaveEquipments"],
  data() {
    return {
      loading: true,
      service: new SettingsRest(),
      notification: [
        {
          ServiceId: 1,
          Service: "newsletter",
          Enabled: false,
        },
        {
          ServiceId: 2,
          Service: "irrigation",
          Enabled: true,
        },
      ],
    };
  },
  mounted() {
    this.getNotifications();
  },
  methods: {
    getNotifications() {
      this.service
        .getNotifications()
        .then((response) => {
          this.notification = response.data;
        })
        .finally(() => (this.loading = false));
    },
    updateNotifications(data) {
      this.service.updateNotifications(data.ServiceId, data).then(() => {
        toast.success("Configurações salvas com sucesso!");
      });
    },
  },
};
</script>
<style lang="scss">
.email-component {
  .email-body {
    display: flex;
    flex-direction: column;
    .email-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      height: 50px;
      gap: 30px;
      p {
        margin-top: 14px;
        font-size: 20px;
      }
      .notification {
        width: 40px;
        height: 40px;
        background-color: #1b3f82;
        color: white;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .p-inputswitch.p-component.p-highlight {
    .p-inputswitch-slider {
      background-color: #1b3f82;
    }
    .p-inputswitch-slider::before {
      background-color: white;
    }
  }
  .p-inputswitch.p-component {
    .p-inputswitch-slider::before {
      background-color: #1b3f82;
    }
    .p-inputswitch-slider {
      background-color: transparent;
      border: 1px solid #1b3f82;
    }
  }
}
</style>

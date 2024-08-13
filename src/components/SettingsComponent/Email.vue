<template>
  <ProgressSpinner v-if="loading" />
  <div class="email-component mt-2" v-else>
    <h5>E-mail</h5>
    <div class="email-body">
      <div class="email-item w-100">
        <div class="notification">
          <i class="pi pi-bell"></i>
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
          <i class="pi pi-bell"></i>
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
          if (!this.notification0) {
            this.setDefaultNotification();
          }
        })
        .finally(() => (this.loading = false));
    },
    updateNotifications(data) {
      this.service.updateNotifications(data.ServiceId, data).then(() => {
        toast.success("Configurações salvas com sucesso!");
      });
    },
    setDefaultNotification() {
      this.notification = [
        {
          ServiceId: 1,
          Service: "newsletter",
          Enabled: false,
        },
        {
          ServiceId: 2,
          Service: "irrigation",
          Enabled: false,
        },
      ];
    },
  },
};
</script>
<style lang="scss">
.email-component {
  border-bottom: 1px solid #1b3f821c;
  padding-bottom: 50px;
  .email-body {
    display: flex;
    flex-direction: column;
    min-width: 350px;
    width: 50%;
    .email-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 20px;
      height: 50px;
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
        i {
          font-size: 20px;
        }
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
@media (max-width: 992px) {
  .email-component {
    .email-body {
      width: 100%;
    }
  }
}
@media (max-width: 765px) {
  .email-component {
    .email-body {
      .email-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 20px;
        height: 50px;
        p {
          margin-top: 14px;
          font-size: 15px;
        }
        .notification {
          width: 30px;
          height: 30px;
          i {
            font-size: 15px;
          }
        }
      }
    }
  }
}
</style>

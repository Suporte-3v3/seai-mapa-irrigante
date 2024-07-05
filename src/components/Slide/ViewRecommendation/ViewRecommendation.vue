<template>
  <div class="background-black">
    <div class="recommendation-blade container">
      <div
        class="recommendation-header d-flex justify-content-center align-items-center w-100"
        :style="[
          { backgroundColor: `${error.isError ? '#DC3545' : '#1b3f82'}` },
        ]"
      >
        <h5>
          Recomendação para cultura <span>{{ card.Crop }}</span>
        </h5>
        <i class="pi pi-times close-btn" @click="onCloseViewMode()"></i>
      </div>
      <div class="d-flex recommendation-body">
        <ProgressSpinner v-if="loading" />
        <span class="w-100" v-else>
          <div
            v-if="error.isError"
            class="is-error d-flex flex-column gap-2 justify-content-center align-items-center text-center"
          >
            <i class="pi pi-info-circle" style="font-size: 30px"></i>
            <h5>{{ error.message }}</h5>
          </div>
          <div v-else class="recommendation-list">
            <div
              class="recommendation-item d-flex flex-column justify-content-center align-items-center"
              v-for="(item, i) in items"
              :key="i"
            >
              <h6>{{ item.title }}</h6>
              <p>{{ item.body }}</p>
            </div>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { SlideRest } from "../../../services/slide.service";
export default {
  name: "SlideEditComponent",
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
  emits: ["onCloseViewMode"],
  data() {
    return {
      recommendation: {},
      items: [],
      loading: true,
      error: {
        isError: false,
        message: "Não há dados das últimas medições da estação.",
      },
    };
  },

  mounted() {
    this.getRecommendations();
  },
  methods: {
    onCloseViewMode() {
      this.$emit("onCloseViewMode");
    },
    getItems() {
      this.items = [
        {
          title: "ETC:",
          body: this.recommendation.Etc ?? "x",
        },
        {
          title: "Lâmina de reposição:",
          body: this.recommendation.RepositionBlade ?? "x",
        },
        {
          title: "Tempo de irrigação:",
          body: this.recommendation.IrrigationTime ?? "x",
        },
        {
          title: "Dias de Cultura",
          body: this.recommendation.CropDays ?? "x",
        },
        {
          title: "ET0:",
          body: this.recommendation.Et0 ?? "x",
        },
        {
          title: "Preciptação:",
          body: this.recommendation.Precipitation ?? "x",
        },
        {
          title: "Kc:",
          body: this.recommendation.Kc ?? "x",
        },
      ];
      this.loading = false;
    },
    getRecommendations() {
      this.service
        .getRecommendations(this.card.Id)
        .then((res) => {
          this.recommendation = res.data;
          this.getItems();
        })
        .catch((err) => {
          this.error.isError = true;
          this.error.message = err.response.data.error;
        })
        .finally(() => {
          this.loading = false;
        });
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
  justify-content: center;
  align-items: center;
  padding: 10px;
  .recommendation-blade {
    background-color: white;
    height: 200px;
    padding: 0;
    .recommendation-header {
      background-color: #1b3f82;
      width: 100%;
      height: 40%;
      color: white;
      position: relative;
      .close-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        font-size: 18px;
      }
      span {
        text-transform: capitalize;
      }
    }
    .is-error {
      height: 120px;
      color: #dc3545;
    }
    .recommendation-item {
      width: 15%;
      min-height: 120px;
      border-right: 1px solid #dae5f8;
      text-align: center;
      h6 {
        height: 30px;
      }
    }
    .recommendation-list {
      display: flex;
      flex-direction: row;
    }
  }
}

@media (max-width: 991px) {
  .recommendation-item {
    h6 {
      font-size: 14px;
    }
  }
}
@media (max-width: 765px) {
  .recommendation-blade {
    height: 450px !important;
    .recommendation-header {
      width: 100%;
      height: 10% !important;
      color: white;
      h5 {
        font-size: 14px !important;
      }
    }
    .recommendation-list {
      flex-direction: column !important;
      padding: 20px;
      .recommendation-item {
        width: 100%;
        flex-direction: row !important;
        justify-content: space-between !important;
        text-align: center;
        align-items: center !important;
        min-height: 50px;
        border-right: 0px solid #dae5f8;
        border-bottom: 1px solid #dae5f8;

        h6 {
          margin-top: 5px;
          margin-bottom: -10px;
        }
        p {
          margin-top: 0px;
          margin-bottom: -10px;
        }
      }
    }
  }
}
</style>

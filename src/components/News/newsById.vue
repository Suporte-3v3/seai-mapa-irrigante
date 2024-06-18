<template>
  <div class="container content">
    <div class="d-flex w-100 flex-column content-cards" v-if="loading">
      <ProgressSpinner />
    </div>
    <div
      class="d-flex justify-content-between w-100 flex-column flex-lg-row"
      v-if="!loading"
    >
      <h4>Notícias</h4>
    </div>
    <div
      class="d-flex w-100 flex-column news-text"
      v-if="!loading"
    >
      <div class="mt-4">
        <h4>{{ news.Title }}</h4>
        <hr />
      </div>
      <small>{{ generics.convertDate(news.SendDate) }}</small>
      <h6 class="mt-4">{{ news.Description }}</h6>

      <p class="mt-4" v-html="news.Data"></p>
    </div>
    <button class="d-flex align-items-center" v-if="!loading" @click="goTo()">
      <InputIcon class="pi pi-angle-left"> </InputIcon>
      Voltar para todas as notícias
    </button>
  </div>
</template>
<script>
import { NewsRest } from "@/services/news.service";
import { useRouter } from "vue-router";
import { Generics } from "@/utils/generics.utils";
export default {
  name: "RecomendationComponent",
  data() {
    return {
      searchTerm: "",
      loading: true,
      service: new NewsRest(),
      currentId: 0,
      router: useRouter(),
      news: {},
      generics: new Generics(),
    };
  },
  mounted() {
    this.currentId = this.router.currentRoute.params.id;
    this.getNewsById();
  },
  methods: {
    getNewsById() {
      this.service.getById(this.currentId).then((res) => {
        this.news = res.data;
        this.convertBuffer(this.news.Data.data);
      });
    },
    convertBuffer(preBuffer) {
      const buffer = new Uint8Array(preBuffer);
      const decoder = new TextDecoder("utf-8");
      const result = decoder.decode(buffer);
      this.news.Data = result;
      this.loading = false;
    },
    goTo() {
      this.router.push({ name: "News" });
    },
  },
};
</script>
<style lang="scss" scoped>
.spinner {
  margin-top: 100px;
}
.content {
  margin-top: 100px;
  color: #1b3f82;
}
hr {
  margin-top: -5px;
  border: 1px solid #1b3f82;
}
small {
  font-size: 10px;
  margin-top: -10px;
  color: rgb(172, 172, 172);
}
h6 {
  color: #1b3f82b9;
}
p {
  font-size: 14px;
  color: black;
}
button {
  background-color: transparent;
  border: 0px;
  width: 300px;
  padding: 0px;
  text-align: start;
  gap: 8px;
  font-size: 14px;
  transition: 0.5s;
  &:hover{
    color: #1b3f82;
  }
}
.news-text{
    min-height: 75vh;
}
</style>

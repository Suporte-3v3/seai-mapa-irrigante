<template>
  <div class="container content">
    <div class="d-flex w-100 flex-column content-cards" v-if="loading">
      <ProgressSpinner />
    </div>
    <span v-if="items">
      <div
        class="d-flex justify-content-between w-100 flex-column flex-lg-row"
        v-if="!loading"
      >
        <h4>Notícias</h4>
        <div>
          <IconField>
            <InputText
              v-model="searchTerm"
              placeholder="Pesquisar por título"
              class="w-100"
              @input="searchItems"
            />
            <InputIcon class="pi pi-search"> </InputIcon>
          </IconField>
        </div>
      </div>
      <h4 class="mt-4" v-if="!loading">Todas as notícias</h4>

      <div
        class="d-flex w-100 flex-column content-cards scroll-style"
        v-if="!loading"
      >
        <ProgressSpinner v-if="loadingNews" />
        <div
          class="card"
          v-for="(item, i) in news"
          :key="i"
          v-else
          @click="goTo(item.Id, item.Title)"
        >
          <h6 :title="item.Title">{{ item.Title }}</h6>
          <p :title="item.Description">{{ item.Description }}</p>
          <small>{{ generics.convertDate(item.SendDate) }}</small>
        </div>
      </div>
      <Pagination
        :rows="numberResultsFound"
        :totalRecords="items?.TotalItems || 0"
        @onHandlePageChange="handlePageChange"
        v-if="!loading"
      />
    </span>
    <div v-else>
      Nenhuma notícia cadastrada
    </div>
  </div>
</template>
<script>
import { NewsRest } from "@/services/news.service";
import { Generics } from "@/utils/generics.utils";
import Pagination from "../pagination/pagination.vue";
import { useRouter } from "vue-router";

export default {
  name: "RecomendationComponent",
  components: { Pagination },
  data() {
    return {
      searchTerm: "",
      service: new NewsRest(),
      params: {
        pageNumber: 1,
        limit: 10,
      },
      generics: new Generics(),
      items: {},
      news: [],
      numberResultsFound: 0,
      loading: true,
      loadingNews: true,
      router: useRouter(),
    };
  },
  mounted() {
    this.getNews();
  },
  methods: {
    searchItems() {
      if (this.searchTerm.length >= 3 || this.searchItems.length === 0) {
        this.params.title =
          this.searchTerm.length >= 3 ? this.searchTerm : null;
        this.params.pageNumber = 0;
        this.getNews();
      }
    },
    getNews() {
      this.loadingNews = true;
      this.service
        .getAll(this.params)
        .then((res) => {
          this.items = res.data;
          this.news = res.data ? res.data.Items : [];
          this.numberResultsFound = this.news.length;
        })
        .finally(() => {
          this.loading = false;
          this.loadingNews = false;
        });
    },
    handlePageChange(page) {
      this.params.pageNumber = page;
      this.getNews();
    },
    goTo(id, name) {
      const result = this.adjustName(name);
      this.router.push({
        name: "NewsById",
        params: { id: id, name: result },
      });
    },
    adjustName(name) {
      let newStr = name.replace(/\s+/g, "-");
      newStr = newStr.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      newStr = newStr.toLowerCase();
      return newStr;
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
.card {
  cursor: pointer;
  background-color: white;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  height: 100px;
  border-radius: 5px;
  margin-top: 15px;

  padding: 20px;
  padding-bottom: 100px;
  transition: 0.5s;
  &:hover {
    background-color: rgb(241, 241, 241);
  }
  h6 {
    color: #1b3f82;
    cursor: pointer;
    &:hover {
      color: #2556b1;
    }
  }
  p {
    font-size: 14px;
  }
  small {
    font-size: 10px;
    color: rgb(172, 172, 172);
  }
}
.content-cards {
  height: 68vh;
  max-height: 1000px;
  overflow: auto;
  padding-right: 20px;
}
</style>

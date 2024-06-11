<template>
  <div class="container content">
    <h4>FAQ</h4>
  </div>
  <div
    class="container d-flex justify-content-center align-items-center spinner"
    v-if="loading"
  >
    <ProgressSpinner />
  </div>
  <div class="container mt-4" v-if="!loading">
    <TabView
      @tab-change="onTabChange"
      :pt="{
        inkbar: (options) => ({
          id: 'myPanelHeader',
          style: {
            'background-color': '#99BDFF00',
          },
        }),
      }"
      v-if="categories.length > 0"
    >
      <TabPanel
        v-for="(category, i) in categories"
        :key="i"
        :header="category.title"
      >
        <div
          v-if="loadingFaq"
          class="container d-flex justify-content-center align-items-center spinner"
        >
          <ProgressSpinner />
        </div>
        <div v-else-if="!loadingFaq && faqs.length === 0">Nada encontrado</div>
        <Accordion
          class="accordion-custom"
          v-else-if="!loadingFaq && faqs.length > 0"
        >
          <AccordionTab
            v-for="(faq, j) in faqs"
            :key="j"
            :header="faq.question"
          >
            <div>
              <p class="m-0">
                {{ faq.answer }}
              </p>
            </div>
          </AccordionTab>
        </Accordion>
      </TabPanel>
    </TabView>
    <div v-else>Nada encontrado</div>
  </div>
</template>

<script>
import { FAQRest } from "@/services/faq.service";
export default {
  name: "FaqComponent",

  data() {
    return {
      loading: true,
      loadingFaq: true,
      service: new FAQRest(),
      categories: [],
      faqs: [],
      params: {
        pageNumber: 1,
        limit: 100,
        id_category: 0,
      },
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      this.loading = true;
      this.service
        .getAllCategories()
        .then((res) => {
          this.categories = res.data;
          this.getFaqById(this.categories[0].id);
        })
        .catch(() => {
          this.loadingFaq = false;
          this.loading = false;
        });
    },
    onTabChange(event) {
      const selectedIndex = event.index;
      const selectedCategoryId = this.categories[selectedIndex].id;
      this.getFaqById(selectedCategoryId);
    },
    getFaqById(id) {
      this.params.id_category = id;
      this.loadingFaq = true;
      this.service
        .getAll(this.params)
        .then((res) => {
          this.faqs = res.data.Items;
        })
        .finally(() => {
          this.loadingFaq = false;
          this.loading = false;
        });
    },
  },
};
</script>
<style scoped>
.spinner {
  margin-top: 100px;
}
.content {
  margin-top: 100px;
  color: #1b3f82;
}
</style>

<template>
  <div class="">
    <Paginator
      :rows="rows"
      :totalRecords="totalRecords"
      :pageLinkSize="calculatePagesButtonsMax()"
      @page="handlePageChange"
    >
    </Paginator>
  </div>
</template>
<script>
export default {
  name: "Pagination",
  props: {
    rows: {
      type: Number,
      required: false,
      default: 1,
    },
    totalRecords: {
      type: Number,
      required: false,
      default: 1,
    },
    itemsName: {
      type: String,
      default: "items",
    },
  },
  emits: ["onHandlePageChange"],
  methods: {
    calculatePagesButtonsMax() {
      const screenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      if (screenWidth < 550) {
        return 3;
      } else if (screenWidth < 650) {
        return 5;
      } else if (screenWidth < 1070) {
        return 7;
      } else {
        return 9;
      }
    },

    handlePageChange(page) {
      this.$emit("onHandlePageChange", page.page + 1);
    },
  },
};
</script>
<style lang="scss">
.p-paginator {
  width: 104% !important;
  margin-left: -30px;
  background-color: transparent;
}
.p-paginator-page {
  min-width: 10px !important;
  width: 26px;
  height: 23px;
  padding: 0 !important;
  border-radius: 5px;
  color: #1b3f82;
}
.p-paginator-pages {
  .p-highlight {
    background-color: #1b3f82;
    color: white;
  }
}
</style>

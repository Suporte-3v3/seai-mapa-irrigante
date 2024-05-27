<template>
  <div class="topbar">
    <div class="container topbar-items">
      <div>
        <strong class="navbar-brand">SEAI IRRIGANTE</strong>
      </div>
      <div class="nav-buttons">
        <router-link
          :to="navLink.link"
          v-for="(navLink, i) in navLinks"
          :key="i"
        >
          <button :class="[navLink.active ? 'btn-white' : 'btn-simple']">
            <p class="">
              {{ navLink.title }}
            </p>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { useRoute } from "vue-router";
export default {
  name: "Topbar",
  data() {
    return {
      navLinks: [
        { title: "Lâmina", link: "/", active: true },
        { title: "Notícias", link: "/news", active: false },
        { title: "FAQ", link: "/faq", active: false },
      ],
      router: useRoute(),
    };
  },
  watch: {
    "$route.path"(newPath) {
      this.getActiveButtons(newPath);
    },
  },
  mounted() {
    this.getActiveButtons(this.$route.path);
  },
  methods: {
    getActiveButtons(path) {
      this.navLinks.forEach((link) => {
        link.active = link.link === path;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.topbar {
  background-color: #1b3f82;
  width: 100%;
  min-height: 30px;
  position: fixed !important;
  top: 0;
  left: 0;
  z-index: 10000;
  padding: 10px;

  .topbar-items {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .nav-buttons {
      display: flex;
      gap: 5px;
    }
  }
  .navbar-brand {
    color: white;
    font-size: 25px;
  }
}
@media (max-width: 500px) {
  .topbar-items {
    flex-direction: column;
  }
}
</style>

<template>
  <div class="topbar">
    <div class="container topbar-items">
      <router-link to="/">
        <div>
          <strong class="navbar-brand">SEAI</strong>
        </div>
      </router-link>

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
      <div class="hamburger-menu" @click="toggleMenu">
        <InputIcon class="pi pi-bars"> </InputIcon>
      </div>
    </div>
    <div class="mobile-nav" v-if="isMenuOpen">
      <div class="mobile-content">
        <div class="d-flex w-100 justify-content-between">
          <h6>SEAI</h6>
          <button @click="toggleMenu()">
            <i class="pi pi-times" style="font-size: 1rem"></i>
          </button>
        </div>
        <div class="links">
          <router-link
            :to="navLink.link"
            v-for="(navLink, i) in navLinks"
            :key="i"
            @click.native="toggleMenu"
          >
            <p class="">
              {{ navLink.title }}
            </p>
          </router-link>
        </div>
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
        { title: "Notícias", link: "/noticias", active: false },
        { title: "FAQ", link: "/faq", active: false },
      ],
      isMenuOpen: false,
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
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
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
  z-index: 1001;
  padding: 10px;

  .topbar-items {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .nav-buttons {
      display: flex;
      gap: 5px;
    }
    a {
      text-decoration: none;
    }
  }
  .navbar-brand {
    color: white;
    font-size: 25px;
  }

  .hamburger-menu {
    display: none;
    flex-direction: column;
    cursor: pointer;
    color: white;
  }

  .mobile-nav {
    transition: 1s;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    background-color: #00000046;
    width: 100%;
    z-index: 10001;
    height: 100vh;
    color: white;

    button {
      width: 20px;
      height: 20px;
      text-align: start;
      padding: 0px;
      border: 0px;
      background-color: transparent;
      color: white;
    }
    .mobile-content {
      background-color: #0d2d5c;
      width: 50%;
      min-width: 250px;
      height: 100%;
      padding: 10px;
      .links {
        margin-top: 50px;
        a {
          margin-top: -20px;
          color: white;
          text-align: start;
          text-decoration: none;
          &:hover {
            background-color: #1b3f82db;
          }
        }
      }
    }
  }
}

@media (max-width: 500px) {
  .topbar-items {
    .nav-buttons {
      display: none !important;
    }
    .hamburger-menu {
      display: flex;
    }
    .mobile-nav {
      display: flex;
    }
  }
}
</style>

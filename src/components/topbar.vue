<template>
  <div class="topbar">
    <div class="container topbar-items">
      <router-link to="/">
        <div>
          <strong class="navbar-brand">SEAI</strong>
        </div>
      </router-link>

      <div class="nav-buttons">
        <Button
          label="Irrigação"
          :class="[isLaminaRoute() ? 'btn-white' : 'btn-simple']"
          @click.stop="toggleLaminaMenu"
        >
        </Button>
        <div class="lamina-menu" ref="laminaMenu" v-if="laminaMenu">
          <router-link to="/" @click.native="toggleLaminaMenu">
            <img src="@/assets/icon.svg" alt="icon">

            <Button label="Simular Áreas de Plantio" class="btn-simple"> </Button>
          </router-link>
          <router-link to="/laminas" @click.native="toggleLaminaMenu">
            <Button
              icon="pi pi-bookmark-fill"
              label="Áreas de Plantio cadastradas"
              class="btn-simple"
            >

            </Button>
          </router-link>
        </div>
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
        <Button
          icon="pi pi-user"
          v-if="generics.verifyToken()"
          class="btn-simple"
          @click.stop="toggleLoginMenu"
        >
        </Button>
        <div
          class="login-menu"
          ref="loginMenu"
          v-if="loginMenu && generics.verifyToken()"
        >
          <router-link
            :to="navLink.link"
            v-for="(navLink, i) in navLinksLogin"
            :key="i"
            @click.native="toggleLoginMenu"
          >
            <Button
              :icon="navLink.icon"
              :label="navLink.title"
              class="btn-simple"
            >
            </Button>
          </router-link>
          <Button
            icon="pi pi-sign-out"
            v-if="generics.verifyToken()"
            class="btn-simple"
            label="Sair"
            @click="
              logout();
              toggleLoginMenu();
            "
          >
          </Button>
        </div>

        <!-- Novo Menu Lâmina -->
      </div>
      <div class="hamburger-menu" @click="toggleMenu">
        <InputIcon class="pi pi-bars"> </InputIcon>
      </div>
    </div>
    <div class="mobile-nav" v-if="isMenuOpen">
      <div class="mobile-content">
        <div class="d-flex w-100 justify-content-between">
          <h6>SEAI</h6>
          <button @click="toggleMenu">
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
          <router-link
            v-if="generics.verifyToken()"
            :to="navLink.link"
            v-for="(navLink, i) in navLinksLogin"
            :key="i"
            @click.native="toggleMenu"
          >
            <p class="">
              {{ navLink.title }}
            </p>
          </router-link>
          <p v-if="generics.verifyToken()" @click="logout()">Sair</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { Generics } from "../utils/generics.utils";
export default {
  name: "Topbar",
  data() {
    return {
      navLinks: [
        { title: "Notícias", link: "/noticias", active: false },
        { title: "Dúvidas", link: "/faq", active: false },
        { title: "Login", link: "/login", active: false },
      ],
      navLinksLogin: [
        { title: "Configurações", link: "/configuracoes", icon: "pi pi-cog" },
      ],
      isMenuOpen: false,
      loginMenu: false,
      laminaMenu: false,
      router: useRouter(),
      generics: new Generics(),
    };
  },
  watch: {
    "$route.path"(newPath) {
      this.getActiveButtons(newPath);
    },
  },
  mounted() {
    this.getActiveButtons(this.$route.path);
    if (this.generics.verifyToken()) {
      this.navLinks.pop();
    }
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
    logout() {
      localStorage.removeItem("tkn");
      location.href = "#/login";
      this.navLinks.push({ title: "Login", link: "/login", active: false });
    },
    toggleLoginMenu() {
      this.loginMenu = !this.loginMenu;
      this.laminaMenu = false;
      if (this.loginMenu) {
        document.addEventListener("click", this.handleClickOutside);
      } else {
        document.removeEventListener("click", this.handleClickOutside);
      }
    },
    toggleLaminaMenu() {
      this.laminaMenu = !this.laminaMenu;
      this.loginMenu = false;
      if (this.laminaMenu) {
        document.addEventListener("click", this.handleClickOutsideLamina);
      } else {
        document.removeEventListener("click", this.handleClickOutsideLamina);
      }
    },
    handleClickOutside(event) {
      const loginMenu = this.$refs.loginMenu;
      if (loginMenu && !loginMenu.contains(event.target)) {
        this.loginMenu = false;
        document.removeEventListener("click", this.handleClickOutside);
      }
    },
    isLaminaRoute() {
      const currentPath = this.$route.path;
      return currentPath === "/laminas" || currentPath === "/";
    },
    handleClickOutsideLamina(event) {
      const laminaMenu = this.$refs.laminaMenu;
      if (laminaMenu && !laminaMenu.contains(event.target)) {
        this.laminaMenu = false;
        document.removeEventListener("click", this.handleClickOutsideLamina);
      }
    },
    beforeDestroy() {
      document.removeEventListener("click", this.handleClickOutside);
      document.removeEventListener("click", this.handleClickOutsideLamina);
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
    position: relative;

    .login-menu {
      position: absolute;
      background-color: white;
      display: flex;
      flex-direction: column;
      top: 30px;
      right: 0px;
      padding: 10px;
      border-radius: 5px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      button {
        color: #0d2d5c !important;
        text-align: start;
      }
    }

    .lamina-menu {
      position: absolute;
      background-color: white;
      display: flex;
      flex-direction: column;
      top: 30px;
      right: 100px; /* Adjust as needed */
      padding: 10px;
      border-radius: 5px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      button {
        color: #0d2d5c !important;
        text-align: start;

      }
      img{
          margin-top: -20px;
          margin-left: 10px;
        }
    }

    .nav-buttons {
      display: flex;
      gap: 5px;
    }
    .btn-simple {
      padding: 10px;
      padding: 11px !important;
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

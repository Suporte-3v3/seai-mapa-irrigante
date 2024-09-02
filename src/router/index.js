// router/index.js
import { createRouter, createWebHashHistory } from "vue-router";
import FAQ from "../views/FAQ.vue";
import Home from "../views/Home.vue";
import News from "../views/News.vue";
import NewsById from "../views/NewsById.vue";
import Login from "../views/User/User.vue";
import ResetPassword from "../views/User/ResetPassword.vue";
import Activate from "../views/User/Activate.vue";
import Slide from "../views/Slide.vue";
import Settings from "../views/Settings.vue";

// Função simulada para verificar autenticação. Substitua com sua lógica real.
function isAuthenticated() {
  // Por exemplo, verificando um token no localStorage
  return localStorage.getItem("tkn") !== null;
}

// Guard de Autenticação
function authGuard(to, from, next) {
  if (isAuthenticated()) {
    next(); // Permite a navegação
  } else {
    next({ name: "login" }); // Redireciona para a página de login
  }
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/faq",
    name: "Faq",
    component: FAQ,
  },
  {
    path: "/noticias",
    name: "News",
    component: News,
  },
  {
    path: "/noticias/:id/:name?",
    name: "NewsById",
    component: NewsById,
  },
  {
    path: "/login/:type?",
    name: "login",
    component: Login,
  },
  {
    path: "/reset-password/:code?",
    name: "resetPassword",
    component: ResetPassword,
  },
  {
    path: "/activate/:code?",
    name: "activate",
    component: Activate,
  },
  {
    path: "/laminas",
    name: "slide",
    component: Slide,
    beforeEnter: authGuard, // Adiciona o guard de autenticação
  },
  {
    path: "/configuracoes",
    name: "settings",
    component: Settings,
    beforeEnter: authGuard, // Adiciona o guard de autenticação
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

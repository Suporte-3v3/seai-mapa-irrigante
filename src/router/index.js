import { createRouter, createWebHashHistory } from "vue-router";
import FAQ from "../views/FAQ.vue";
import Home from "../views/Home.vue";
import News from "../views/News.vue";
import NewsById from "../views/NewsById.vue";
import Login from "../views/User/User.vue";
import Slide from "../views/Slide.vue";

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
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/laminas",
    name: "slide",
    component: Slide,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

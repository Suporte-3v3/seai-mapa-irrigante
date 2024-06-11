import { createRouter, createWebHistory } from "vue-router";
import FAQ from "../views/FAQ.vue";
import Home from "../views/Home.vue";
import News from "../views/News.vue";
import NewsById from "../views/NewsById.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

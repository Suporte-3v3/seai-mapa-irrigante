import { createRouter, createWebHistory } from "vue-router";
import FAQ from "../views/FAQ.vue";
import Home from "../views/Home.vue";

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
    path: '/news',
    name: 'News',
    component: FAQ
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

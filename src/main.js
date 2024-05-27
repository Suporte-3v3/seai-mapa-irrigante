import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import 'leaflet/dist/leaflet.css';
import "primevue/resources/themes/aura-light-green/theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./style.scss";
import router from "./router";
import ProgressSpinner from 'primevue/progressspinner';

createApp(App)
  .use(PrimeVue)
  .use(router)
  .component("TabView", TabView)
  .component("TabPanel", TabPanel)
  .component("Accordion", Accordion)
  .component("AccordionTab", AccordionTab)
  .component("ProgressSpinner", ProgressSpinner)
  .mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import Paginator from "primevue/paginator";
import Button from "primevue/button";
import ProgressSpinner from "primevue/progressspinner";
import Checkbox from "primevue/checkbox";
import Password from "primevue/password";
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmationService from "primevue/confirmationservice";
import Dropdown from "primevue/dropdown";
import Dialog from "primevue/dialog";
import Calendar from "primevue/calendar";
import "leaflet/dist/leaflet.css";
import "primeicons/primeicons.css";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "vue3-toastify/dist/index.css";
import "./style.scss";
import router from "./router";

createApp(App)
  .use(PrimeVue)
  .use(router)
  .use(ConfirmationService)
  .component("InputText", InputText)
  .component("TabView", TabView)
  .component("TabPanel", TabPanel)
  .component("Accordion", Accordion)
  .component("AccordionTab", AccordionTab)
  .component("ProgressSpinner", ProgressSpinner)
  .component("IconField", IconField)
  .component("InputIcon", InputIcon)
  .component("Paginator", Paginator)
  .component("Button", Button)
  .component("Password", Password)
  .component("Checkbox", Checkbox)
  .component("ConfirmDialog", ConfirmDialog)
  .component("Dialog", Dialog)
  .component("Dropdown", Dropdown)
  .component("Calendar", Calendar)
  .mount("#app");

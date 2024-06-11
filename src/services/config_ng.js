import axios from "axios";
import { toast } from "vue3-toastify";

const extractBaseUrl = () => {
  const urlObj = new URL(window.location.href);

  return [
    urlObj.protocol,
    urlObj.hostname,
    `${urlObj.protocol}//${urlObj.hostname}`,
  ];
};

const urlBase = extractBaseUrl();
const serverUrlBase = urlBase[2];

const baseURL = `/api/`;

const httpClient = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("tkn")}`,
  },
});

httpClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status == 401) {
      toast.error("Sem permissão de acesso para este recurso");
    } else if (error.response.status == 404) {
      toast.error("Recurso não encontrado");
    }

    return Promise.reject(error);
  }
);

export default httpClient;

import axios from "axios";
import { toast } from "vue3-toastify";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_V1;
export const API_BASE_URL2 = import.meta.env.VITE_API_BASE_URL_V2;

const extractBaseUrl = () => {
  const urlObj = new URL(import.meta.env.VITE_API_BASE_URL);


  return [
    urlObj.protocol,
    urlObj.hostname,
    `${urlObj.protocol}//${urlObj.hostname}`,
    urlObj.port,
  ];
};

const urlBase = extractBaseUrl();
const serverUrlBase = urlBase[2];

const serverPort = urlBase[3];
// const serverPort = 4201;
const baseURL = `${serverUrlBase}:${serverPort}/api/`;

const httpClient = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("tkn")}`,
  },
});

httpClient.interceptors.response.use(
  function (response) {
    // Optional: Do something with response data
    return response;
  },
  function (error) {
    toast.error(error.response.data.error);
    return Promise.reject(error);
  }
);

export default httpClient;

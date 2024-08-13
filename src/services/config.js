import axios from "axios";
import { toast } from "vue3-toastify";

export const API_BASE_URL = "http://seai.3v3.farm/api/v1";
export const API_BASE_URL2 = "http://seai.3v3.farm/api/v2";

const extractBaseUrl = () => {
  // const urlObj = new URL(window.location.href);
  const urlObj = new URL("http://seai.3v3.farm");
  // const urlObj = new URL("http://localhost");

  return [
    urlObj.protocol,
    urlObj.hostname,
    `${urlObj.protocol}//${urlObj.hostname}`,
  ];
};

const urlBase = extractBaseUrl();
const serverUrlBase = urlBase[2];

const serverPort = 80;
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

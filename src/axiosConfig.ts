import axios from "axios";

const axiosURL = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  timeout: 20000, // temps d'attente en millisecondes avant d'annuler une requête
  headers: {
    "Content-type": "application/json",
  }
});

export default axiosURL;

import axios from "axios";

const api = axios.create({
   baseURL: "http://54.82.176.97:8000",
   headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
   },
});

export default api;

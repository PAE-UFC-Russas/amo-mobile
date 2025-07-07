import axios from "axios";

const api = axios.create({
  baseURL: "https://amo-backend-dev.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

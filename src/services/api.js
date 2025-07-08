import axios from "axios";

const api = axios.create({
  baseURL: "https://amo-backend-aa73.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

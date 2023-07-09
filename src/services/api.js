import axios from "axios";

const api = axios.create({
<<<<<<< HEAD
   baseURL: "http://192.168.1.103:8000",

=======
   baseURL: "https://amo-backend.onrender.com/",
>>>>>>> main
   headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
   },
});

export default api;

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://amo-mvp.herokuapp.com'
});

export default api;
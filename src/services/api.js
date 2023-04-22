import axios from 'axios';

const api = axios.create({
    baseURL: 'http://174.129.219.95:8000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});


export default api
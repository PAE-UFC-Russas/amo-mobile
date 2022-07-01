import { GetLoginToken } from '../util/StorageLogin';
import axios from 'axios';

console.log(async () => {return await GetLoginToken()}, 'dsadsadasz')

const api = axios.create({
    baseURL: 'https://amo-mvp.herokuapp.com',
    headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : `Bearer ${GetLoginToken()}`
    }
});

export default api;
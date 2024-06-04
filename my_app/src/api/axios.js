import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/';

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export default instance;

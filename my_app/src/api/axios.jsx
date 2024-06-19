// import axios from 'axios';
//
// const axiosInstance = axios.create({
//     baseURL: 'http://80.78.242.79:8000', // измените на ваш baseURL, если необходимо
//     headers: { 'Content-Type': 'application/json' }
// });
//
// export default axiosInstance;


import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://80.78.242.79:8000',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;


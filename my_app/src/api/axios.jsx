// import axios from 'axios';
//
// const axiosInstance = axios.create({
//     baseURL: 'http://80.78.242.79:8000', // измените на ваш baseURL, если необходимо
//     headers: { 'Content-Type': 'application/json' }
// });
//
// export default axiosInstance;


import axios from 'axios';

const API_BASE_URL = 'http://80.78.242.79:8000';

// Создаем инстанс axios
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

// Добавляем interceptor для всех запросов
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;

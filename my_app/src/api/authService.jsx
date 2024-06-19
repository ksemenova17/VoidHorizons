import axiosInstance from './axios';

const register = (username, email, password) => {
    return axiosInstance.post('/api/v1/auth/users/', { username, email, password });
};

const login = (username, password) => {
    return axiosInstance.post('/api/v1/auth/token/login/', { username, password });
};

const AuthService = {
    register,
    login
};

export default AuthService;

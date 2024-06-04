import axios from './axios';

const register = (username, email, password) => {
    return axios.post('/register', { username, email, password });
};

const login = (username, password) => {
    return axios.post('/login', { username, password });
};

const AuthService = {
    register,
    login
};

export default AuthService;

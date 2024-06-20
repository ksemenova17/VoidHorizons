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

const getArticles = () => {
    return axiosInstance.get('/articles/')
        .then(response => response.data);
};

const getArticleById = (id) => {
    return axiosInstance.get(`/articles/${id}/`)
        .then(response => response.data);
};

const getFavorites = () => {
    return axiosInstance.get('/favorites/')
        .then(response => response.data);
};

const addFavorite = (articleId) => {
    return axiosInstance.post(`/articles/${articleId}/add_to_favorites/`);
};

const deleteFavorite = (articleId) => {
    return axiosInstance.delete(`/favorites/${articleId}/`);
};

const getComments = (articleId) => {
    return axiosInstance.get(`/articles/${articleId}/comments/`)
        .then(response => response.data);
};

const addComment = (articleId, comment) => {
    return axiosInstance.post(`/articles/${articleId}/comments/`, comment)
        .then(response => response.data);
};

const deleteComment = (commentId) => {
    return axiosInstance.delete(`/comments/${commentId}/`);
};

const updateUserName = (name) => {
    return axiosInstance.patch('/api/v1/auth/users/me/', { name })
        .then(response => response.data);
};

const changePassword = (currentPassword, newPassword) => {
    return axiosInstance.post('/api/v1/auth/users/set_password/', {
        new_password: newPassword,
        current_password: currentPassword
    }).then(response => response.data);


};

export default {
    getArticles,
    getArticleById,
    getFavorites,
    addFavorite,
    deleteFavorite,
    getComments,
    addComment,
    deleteComment,
    updateUserName,
    changePassword
};

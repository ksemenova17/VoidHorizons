// import axios from 'axios';
// const API_URL = 'http://80.78.242.79:8000';
//
// class ArticlesService {
//     getArticles() {
//         const url = `${API_URL}/articles/`;
//         return axios.get(url).then(response => response.data);
//     }
//     getArticle(pk) {
//         const url = `${API_URL}/articles/${pk}/`;
//         return axios.get(url).then(response => response.data);
//     }
//     deleteFavorite(articleId) {
//         const url = `${API_URL}/favorites/${articleId}/`;
//         return axios.delete(url);
//     }
//     addFavorite(articleId) {
//         const url = `${API_URL}/favorites/`;
//         return axios.post(url, { id: articleId });
//     }
//     addComment(newComment) {
//         const url = `${API_URL}/comments/`;
//         return axios.post(url, newComment).then(response => response.data);
//     }
//     deleteComment(commentId) {
//         const url = `${API_URL}/comments/${commentId}/`;
//         return axios.delete(url);
//     }
// }
//
// export default new ArticlesService();

import axiosInstance from './axios';

class ArticlesService {
    getArticles() {
        const url = '/articles/';
        return axiosInstance.get(url).then(response => response.data);
    }

    getArticle(pk) {
        const url = `/articles/${pk}/`;
        return axiosInstance.get(url).then(response => response.data);
    }

    deleteFavorite(articleId) {
        const url = `/favorites/${articleId}/`;
        return axiosInstance.delete(url);
    }

    addFavorite(articleId) {
        const url = `/favorites/`;
        return axiosInstance.post(url, { id: articleId });
    }

    addComment(newComment) {
        const url = `/comments/`;
        return axiosInstance.post(url, newComment).then(response => response.data);
    }

    deleteComment(commentId) {
        const url = `/comments/${commentId}/`;
        return axiosInstance.delete(url);
    }
}

export default new ArticlesService();

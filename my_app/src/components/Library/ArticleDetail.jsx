// import React, { useState } from 'react';
// import axios from '../../api/axios.js';
// import './articleDetail.scss';
//
// const ArticleDetail = ({ article }) => {
//     const [comment, setComment] = useState('');
//     const [message, setMessage] = useState('');
//
//     const handleAddToFavorites = () => {
//         axios.post(`/favorites/${article.id}`)
//             .then(() => setMessage('Статья добавлена в избранное'))
//             .catch(error => setMessage('Ошибка при добавлении в избранное'));
//     };
//
//     const handleCommentSubmit = (e) => {
//         e.preventDefault();
//         axios.post(`/comments/${article.id}`, { text: comment })
//             .then(() => {
//                 setMessage('Комментарий добавлен');
//                 setComment('');
//             })
//             .catch(error => setMessage('Ошибка при добавлении комментария'));
//     };
//
//     return (
//         <div className="article-detail">
//             <h2>{article.title}</h2>
//             <img src={article.imageUrl} alt={article.title} />
//             <p>{article.description}</p>
//             <button onClick={handleAddToFavorites}>Добавить в избранное</button>
//             {message && <p className="message">{message}</p>}
//             <form onSubmit={handleCommentSubmit}>
//         <textarea
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             placeholder="Напишите комментарий"
//         ></textarea>
//                 <button type="submit">Отправить</button>
//             </form>
//         </div>
//     );
// };
//
// export default ArticleDetail;

import React, { useState } from 'react';
import './articleDetail.scss';

const ArticleDetail = ({ article }) => {
    const [comment, setComment] = useState('');
    const [message, setMessage] = useState('');

    const handleAddToFavorites = () => {
        setMessage('Статья добавлена в избранное (фиктивные данные)');
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        setMessage('Комментарий добавлен (фиктивные данные)');
        setComment('');
    };

    return (
        <div className="article-detail">
            <h2>{article.title}</h2>
            <img src={article.imageUrl} alt={article.title} />
            <p>{article.description}</p>
            <button onClick={handleAddToFavorites}>Добавить в избранное</button>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleCommentSubmit}>
        <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Напишите комментарий"
        ></textarea>
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
};

export default ArticleDetail;


import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GoComment, GoHeart, GoHeartFill, GoTrash } from "react-icons/go";
import ArticlesService from '../../api/ArticlesService';
import './library.scss';
import ConstellationList from '../../components/Library/ConstellationList';
import { useUserContext } from '../../api/UserContext';

const Library = () => {
    const { user } = useUserContext();
    const navigate = useNavigate();
    const { id } = useParams();
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [comment, setComment] = useState('');

    useEffect(() => {
        ArticlesService.getArticles()
            .then(data => {
                console.log('Data received:', data);
                setArticles(data);
                if (id) {
                    const selected = data.find(article => article.id === parseInt(id));
                    setSelectedArticle(selected);
                }
            })
            .catch(error => console.error('Ошибка при загрузке данных:', error));

        if (user) {
            ArticlesService.getFavorites()
                .then(data => setFavorites(data))
                .catch(error => console.error('Ошибка при загрузке избранного:', error));
        }
    }, [user, id]);

    const handleArticleSelect = (articleId) => {
        navigate(`/library/${articleId}`);
        const selected = articles.find(article => article.id === articleId);
        setSelectedArticle(selected);
        setShowComments(false);
    };

    const filteredArticles = articles.filter(article =>
        article.constellation_name && article.constellation_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddToFavorites = () => {
        if (selectedArticle) {
            if (favorites.some(fav => fav.id === selectedArticle.id)) {
                ArticlesService.deleteFavorite(selectedArticle.id)
                    .then(() => {
                        setFavorites(favorites.filter(fav => fav.id !== selectedArticle.id));
                    })
                    .catch(error => console.error('Ошибка при удалении из избранного:', error));
            } else {
                ArticlesService.addFavorite(selectedArticle.id)
                    .then(() => {
                        setFavorites([...favorites, selectedArticle]);
                    })
                    .catch(error => console.error('Ошибка при добавлении в избранное:', error));
            }
        }
    };

    const handleToggleComments = () => {
        setShowComments(!showComments);
    };

    const handleAddComment = () => {
        if (selectedArticle && user) {
            const newComment = {
                text: comment,
                article_id: selectedArticle.id,
                author: { name: user.name }
            };
            ArticlesService.addComment(newComment)
                .then(responseData => {
                    setSelectedArticle(prevArticle => ({
                        ...prevArticle,
                        comments: [...prevArticle.comments, responseData]
                    }));
                    setComment('');
                })
                .catch(error => console.error('Ошибка при добавлении комментария:', error));
        }
    };

    const handleDeleteComment = (commentId) => {
        if (selectedArticle) {
            ArticlesService.deleteComment(commentId)
                .then(() => {
                    setSelectedArticle(prevArticle => ({
                        ...prevArticle,
                        comments: prevArticle.comments.filter(comment => comment.id !== commentId)
                    }));
                })
                .catch(error => console.error('Ошибка при удалении комментария:', error));
        }
    };

    return (
        <div className="content-wrapper">
            <section className="home destinations">
                <div className="container">
                    <div className="header-section">
                        <h2 className="title">
                            01
                            <span className="subtitle">Библиотека созвездий</span>
                        </h2>
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Введите название созвездия:"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <p className="list">Список созвездий:</p>
                        <div className="article-list-wrapper">
                            <ConstellationList
                                articles={filteredArticles}
                                handleArticleSelect={handleArticleSelect}
                            />
                        </div>
                    </div>
                    {selectedArticle && (
                        <article className="details-section fade-in">
                            <h2 className="article-name">{selectedArticle.title}</h2>
                            <img
                                src={selectedArticle.image_url}
                                alt={selectedArticle.title}
                                title={selectedArticle.title}
                                className="article-image"
                            />
                            <p className="article-description">{selectedArticle.content}</p>
                            <div className="constellation-info">
                            </div>
                            <div className="actions">
                                <button className="favorite-button" onClick={handleAddToFavorites}>
                                    {favorites.some(fav => fav.id === selectedArticle.id) ? (
                                        <GoHeartFill className="icon filled" />
                                    ) : (
                                        <GoHeart className="icon" />
                                    )}
                                </button>
                                <button className="comments-button" onClick={handleToggleComments}>
                                    <GoComment className="icon" />
                                </button>
                            </div>
                            {showComments && (
                                <div className="comments-section-wrapper">
                                    <div className="comments-section">
                                        <h3>Комментарии</h3>
                                        {selectedArticle.comments && selectedArticle.comments.map((comment) => (
                                            <div key={comment.id} className="comment-item">
                                                <div className="comment-content">
                                                    <span className="author-name">{comment.author.name}</span>
                                                    <p>{comment.text}</p>
                                                    <div className="comment-actions">
                                                        <GoTrash className="icon" onClick={() => handleDeleteComment(comment.id)} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <input
                                        type="text"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Добавить комментарий"
                                    />
                                    <button onClick={handleAddComment}>Отправить</button>
                                </div>
                            )}
                        </article>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Library;



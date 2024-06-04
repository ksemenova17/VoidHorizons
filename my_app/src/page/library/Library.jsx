// import React, { useState, useEffect } from 'react';
// import ArticleList from '../../components/Library/ArticleList.jsx';
// import ArticleDetail from '../../components/Library/ArticleDetail.jsx';
// import axios from '../../api/axios.js';
// import './library.scss';
//
// const Library = () => {
//     const [articles, setArticles] = useState([]);
//     const [selectedArticle, setSelectedArticle] = useState(null);
//
//     useEffect(() => {
//         axios.get('/articles')
//             .then(response => setArticles(response.data))
//             .catch(error => console.error('Error fetching articles:', error));
//     }, []);
//
//     const handleArticleSelect = (article) => {
//         setSelectedArticle(article);
//     };
//
//     return (
//         <div className="library">
//             <ArticleList articles={articles} onArticleSelect={handleArticleSelect} />
//             {selectedArticle && <ArticleDetail article={selectedArticle} />}
//         </div>
//     );
// };
//
// export default Library;

// import React, { useState, useEffect } from 'react';
// import ArticleList from '../../components/Library/ArticleList.jsx';
// import ArticleDetail from '../../components/Library/ArticleDetail.jsx';
// import './library.scss';
//
// const Library = () => {
//     const [articles, setArticles] = useState([]);
//     const [selectedArticle, setSelectedArticle] = useState(null);
//
//     useEffect(() => {
//         // Используем фиктивные данные для статей
//         const mockArticles = [
//             { id: 1, title: 'Созвездие Орион', imageUrl: 'url1', description: 'Описание Ориона' },
//             { id: 2, title: 'Созвездие Большая Медведица', imageUrl: 'url2', description: 'Описание Большой Медведицы' },
//             // Добавьте больше фиктивных данных по мере необходимости
//         ];
//         setArticles(mockArticles);
//     }, []);
//
//     const handleArticleSelect = (article) => {
//         setSelectedArticle(article);
//     };
//
//     return (
//         <div className="library">
//             <ArticleList articles={articles} onArticleSelect={handleArticleSelect} />
//             {selectedArticle && <ArticleDetail article={selectedArticle} />}
//         </div>
//     );
// };
//
// export default Library;

import React, { useState, useEffect } from 'react';
import './library.scss';

const mockArticles = [
    { id: 1, title: 'Созвездие Орион', imageUrl: 'url1', description: 'Описание Ориона', distance: '384,400 KM', travelTime: '3 DAYS' },
    { id: 2, title: 'Созвездие Большая Медведица', imageUrl: 'url2', description: 'Описание Большой Медведицы', distance: '540,000 KM', travelTime: '5 DAYS' },
    // Добавьте больше фиктивных данных по мере необходимости
];

const Library = () => {
    const [articles, setArticles] = useState(mockArticles);
    const [selectedArticle, setSelectedArticle] = useState(mockArticles[0]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setArticles(mockArticles);
    }, []);

    const handleArticleSelect = (direction) => {
        const currentIndex = articles.findIndex(article => article.id === selectedArticle.id);
        const nextIndex = (currentIndex + direction + articles.length) % articles.length;
        setSelectedArticle(articles[nextIndex]);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="library">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for a constellation..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="article-container">
                <button className="arrow left" onClick={() => handleArticleSelect(-1)}>&#9664;</button>
                <div className="article-detail">
                    <h2>{selectedArticle.title}</h2>
                    <img src={selectedArticle.imageUrl} alt={selectedArticle.title} />
                    <p>{selectedArticle.description}</p>
                    <div className="article-info">
                        <div>
                            <h3>AVG. DISTANCE</h3>
                            <p>{selectedArticle.distance}</p>
                        </div>
                        <div>
                            <h3>EST. TRAVEL TIME</h3>
                            <p>{selectedArticle.travelTime}</p>
                        </div>
                    </div>
                </div>
                <button className="arrow right" onClick={() => handleArticleSelect(1)}>&#9654;</button>
            </div>
        </div>
    );
};

export default Library;



// import React from 'react';
// import './articleList.scss';
//
// const ArticleList = ({ articles, onArticleSelect }) => {
//     return (
//         <div className="article-list">
//             <h2>Список статей о созвездиях</h2>
//             <ul>
//                 {articles.map(article => (
//                     <li key={article.id} onClick={() => onArticleSelect(article)}>
//                         {article.title}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };
//
// export default ArticleList;

import React from 'react';
import './articleList.scss';

const ArticleList = ({ articles, onArticleSelect }) => {
    return (
        <div className="article-list">
            <h2>Список статей о созвездиях</h2>
            <ul>
                {articles.map(article => (
                    <li key={article.id} onClick={() => onArticleSelect(article)}>
                        {article.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArticleList;

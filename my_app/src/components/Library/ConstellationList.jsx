//
// import PropTypes from 'prop-types';
//
// const ConstellationList = ({ articles, selectedArticleIndex, handleArticleSelect }) => {
//     if (!articles.length) {
//         return <p>Нет статей для отображения.</p>;
//     }
//
//     return (
//         <ul className="constellation-list">
//             {articles.map((article, index) => (
//                 <li
//                     key={article.id}
//                     className={`article-item ${index === selectedArticleIndex ? 'selected' : ''}`}
//                     onClick={() => handleArticleSelect(index)}
//                 >
//                     {article.title}
//                 </li>
//             ))}
//         </ul>
//     );
// };
//
// ConstellationList.propTypes = {
//     articles: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.number.isRequired,
//             title: PropTypes.string.isRequired, // Изменено на title
//         })
//     ).isRequired,
//     selectedArticleIndex: PropTypes.number,
//     handleArticleSelect: PropTypes.func.isRequired,
// };
//
// export default ConstellationList;




// eslint-disable-next-line react/prop-types
const ConstellationList = ({ articles, handleArticleSelect }) => {
    // eslint-disable-next-line react/prop-types
    if (!articles.length) {
        return <p>Нет созвездий для отображения.</p>;
    }

    return (
        <ul className="constellation-list">
            {/* eslint-disable-next-line react/prop-types */}
            {articles.map((article) => (
                <li key={article.id} className="article-item">
                    <a href={`/library/${article.id}`} onClick={(e) => {
                        e.preventDefault();
                        handleArticleSelect(article.id);
                    }}>
                        {article.constellation_name}
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default ConstellationList;


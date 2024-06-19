import PropTypes from 'prop-types';

const ConstellationList = ({ articles, selectedArticleIndex, handleArticleSelect }) => {
    if (!articles.length) {
        return <p>Нет статей для отображения.</p>;
    }

    return (
        <ul className="constellation-list">
            {articles.map((article, index) => (
                <li
                    key={article.id}
                    className={`article-item ${index === selectedArticleIndex ? 'selected' : ''}`}
                    onClick={() => handleArticleSelect(index)}
                >
                    {article.title}
                </li>
            ))}
        </ul>
    );
};

ConstellationList.propTypes = {
    articles: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired, // Изменено на title
        })
    ).isRequired,
    selectedArticleIndex: PropTypes.number,
    handleArticleSelect: PropTypes.func.isRequired,
};

export default ConstellationList;

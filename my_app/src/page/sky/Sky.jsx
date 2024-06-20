import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';
// import ArticlesService from '../../api/ArticlesService.jsx'; // Assuming you have a similar service for articles
import './sky.scss';

const Sky = () => {
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [constellations, setConstellations] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleArticleSelect = (articleUrl) => {
        console.log('Selected article URL:', articleUrl); // Отладочный вывод

        // Извлекаем ID статьи из URL
        const articleIdMatch = articleUrl.match(/\/articles\/(\d+)\//);
        if (articleIdMatch && articleIdMatch[1]) {
            const articleId = articleIdMatch[1];
            console.log('Extracted article ID:', articleId); // Отладочный вывод
            navigate(`/library/${articleId}`);
        } else {
            console.error('Invalid article URL:', articleUrl);
        }
    };

    const isValidCoordinate = (coord) => {
        return coord !== '' && !isNaN(coord);
    };

    const handleCalculate = async () => {
        if (!isValidCoordinate(longitude) || !isValidCoordinate(latitude)) {
            setError('Пожалуйста, введите правильные числовые координаты.');
            return;
        }

        setError('');
        try {
            const response = await axiosInstance.post('/visible-constellations/', {
                latitude: parseFloat(longitude),
                longitude: parseFloat(latitude)

            });
            console.log('Constellations data received:', response.data); // Отладочный вывод
            setConstellations(response.data);
        } catch (error) {
            setError('Произошла ошибка при расчете созвездий. Попробуйте еще раз.');
        }
    };

    return (
        <div className="container">
            <div className={`wrapper ${error ? 'wrapper--error' : ''}`}>
                <div className="form-box">
                    <h1>Расчет созвездий</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            id="longitude"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                            placeholder="Введите долготу:"
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            id="latitude"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            placeholder="Введите широту:"
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button onClick={handleCalculate}>Рассчитать</button>
                </div>
            </div>
            {constellations.length > 0 && (
                <div className="result">
                    <h2>Найденные созвездия:</h2>
                    <ul>
                        {constellations.map((constellation, index) => (
                            <li key={index}>
                                <button
                                    className="constellation-link"
                                    onClick={() => handleArticleSelect(constellation.article_url)}
                                >
                                    {constellation.name_rus}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

    );
};

export default Sky;

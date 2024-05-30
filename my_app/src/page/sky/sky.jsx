// import React, { useState } from 'react';
// import './sky.scss';
//
// const ConstellationForm = () => {
//     const [latitude, setLatitude] = useState('');
//     const [longitude, setLongitude] = useState('');
//     const [constellation, setConstellation] = useState('');
//
//     const handleCalculate = async () => {
//         // Пример вызова API для получения названия созвездия
//         // Это нужно заменить на ваш реальный API вызов
//         const response = await fetch('/api/calculate-constellation', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ latitude, longitude }),
//         });
//
//         const data = await response.json();
//         setConstellation(data.constellation);
//     };
//     return (
//         <div className="wrapper">
//             <div className="form-box">
//                 <h1>Расчет созвездий</h1>
//                 <div className="input-box">
//                     <input
//                         type="text"
//                         id="latitude"
//                         value={latitude}
//                         onChange={(e) => setLatitude(e.target.value)}
//                         placeholder="Введите широту"
//                     />
//                 </div>
//                 <div className="input-box">
//                     <input
//                         type="text"
//                         id="longitude"
//                         value={longitude}
//                         onChange={(e) => setLongitude(e.target.value)}
//                         placeholder="Введите долготу"
//                     />
//                 </div>
//                 <button onClick={handleCalculate}>Рассчитать</button>
//                 {constellation && (
//                     <div className="result">
//                         <h2>Название созвездия:</h2>
//                         <p>{constellation}</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default ConstellationForm;
//
//

import React, { useState } from 'react';
import './sky.scss';

const ConstellationForm = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [constellations, setConstellations] = useState([]);
    const [error, setError] = useState('');

    const isValidCoordinate = (coord) => {
        // Проверка на пустое значение и на соответствие числовому формату
        return coord !== '' && !isNaN(coord);
    };

    const handleCalculate = async () => {
        if (!isValidCoordinate(latitude) || !isValidCoordinate(longitude)) {
            setError('Пожалуйста, введите правильные числовые координаты.');
            return;
        }

        setError('');
        try {
            const response = await fetch('/api/calculate-constellations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ latitude, longitude }),
            });

            const data = await response.json();
            setConstellations(data.constellations); // Предполагаем, что API возвращает массив созвездий
        } catch (error) {
            setError('Произошла ошибка при расчете созвездий. Попробуйте еще раз.');
        }
    };

    return (
        <div className={`wrapper ${error ? 'wrapper--error' : ''}`}>
            <div className="form-box">
                <h1>Расчет созвездий</h1>
                <div className="input-box">
                    <input
                        type="text"
                        id="latitude"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        placeholder="Введите широту:"
                    />
                </div>
                <div className="input-box">
                    <input
                        type="text"
                        id="longitude"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        placeholder="Введите долготу:"
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button onClick={handleCalculate}>Рассчитать</button>
                {constellations.length > 0 && (
                    <div className="result">
                        <h2>Найденные созвездия:</h2>
                        <ul>
                            {constellations.map((constellation, index) => (
                                <li key={index}>
                                    <a href={`/constellation/${constellation.id}`}>
                                        {constellation.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConstellationForm;


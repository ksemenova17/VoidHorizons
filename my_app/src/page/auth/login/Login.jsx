// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AuthService from '../../../api/authService.js';
// import { CiUser, CiLock, CiMail } from 'react-icons/ci';
// import './login.scss';
//
// function Login() {
//     const [action, setAction] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: ''
//     });
//
//     const navigate = useNavigate();
//
//     const registerLink = () => {
//         setAction(' active');
//         setError('');
//     };
//
//     const loginLink = () => {
//         setAction('');
//         setError('');
//     };
//
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');
//
//         const { username, email, password } = formData;
//
//         try {
//             if (action === ' active') {
//                 const response = await AuthService.register(username, email, password);
//                 setMessage('Регистрация прошла успешно');
//                 setAction('');
//             } else {
//                 const response = await AuthService.login(username, password);
//                 navigate('/profile', { state: { user: response.data } });
//             }
//         } catch (error) {
//             setError('Ошибка сети. Попробуйте еще раз.');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return (
//         <div className={`wrapper${action}`}>
//             <div className="form-box login">
//                 <form onSubmit={handleSubmit}>
//                     <h1>Вход</h1>
//                     {error && <p className="error">{error}</p>}
//                     <div className="input-box">
//                         <input
//                             type="text"
//                             name="username"
//                             placeholder="Username"
//                             required
//                             value={formData.username}
//                             onChange={handleInputChange}
//                         />
//                         <CiUser className="icon" />
//                     </div>
//                     <div className="input-box">
//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="Password"
//                             required
//                             value={formData.password}
//                             onChange={handleInputChange}
//                         />
//                         <CiLock className="icon" />
//                     </div>
//                     <button type="submit" disabled={loading}>
//                         {loading ? 'Загрузка...' : 'Войти'}
//                     </button>
//                     <div className="register-link">
//                         <p>
//                             Ещё нет аккаунта? <a href="#" onClick={registerLink}>Регистрация</a>
//                         </p>
//                     </div>
//                 </form>
//             </div>
//             <div className="form-box register">
//                 <form onSubmit={handleSubmit}>
//                     <h1>Регистрация</h1>
//                     {error && <p className="error">{error}</p>}
//                     <div className="input-box">
//                         <input
//                             type="text"
//                             name="username"
//                             placeholder="Username"
//                             required
//                             value={formData.username}
//                             onChange={handleInputChange}
//                         />
//                         <CiUser className="icon" />
//                     </div>
//                     <div className="input-box">
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Email"
//                             required
//                             value={formData.email}
//                             onChange={handleInputChange}
//                         />
//                         <CiMail className="icon" />
//                     </div>
//                     <div className="input-box">
//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="Password"
//                             required
//                             value={formData.password}
//                             onChange={handleInputChange}
//                         />
//                         <CiLock className="icon" />
//                     </div>
//                     <div className="agree">
//                         <label>
//                             <input type="checkbox" required />Я даю согласие на{' '}
//                             <a href="#">обработку персональных данных</a>
//                         </label>
//                     </div>
//                     <button type="submit" disabled={loading}>
//                         {loading ? 'Загрузка...' : 'Регистрация'}
//                     </button>
//                     <div className="register-link">
//                         <p>
//                             Уже есть аккаунт? <a href="#" onClick={loginLink}>Войти</a>
//                         </p>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }
//
// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiUser, CiLock, CiMail } from 'react-icons/ci';
import './login.scss';

function Login() {
    const [action, setAction] = useState('login');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const registerLink = () => {
        setAction('register');
        setError('');
    };

    const loginLink = () => {
        setAction('login');
        setError('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Использование фиктивных данных
        const mockResponse = {
            data: {
                username: formData.username,
                email: formData.email,
                favorites: [
                    { id: 1, title: 'Статья 1' },
                    { id: 2, title: 'Статья 2' },
                    { id: 3, title: 'Статья 3' }
                ]
            }
        };

        try {
            if (action === 'register') {
                // Имитируем успешную регистрацию
                console.log('Регистрация прошла успешно:', mockResponse.data);
                setError('Регистрация прошла успешно');
                setAction('login');
            } else {
                // Имитируем успешный вход
                console.log('Вход прошел успешно:', mockResponse.data);
                navigate('/profile', { state: { user: mockResponse.data } });
            }
        } catch (error) {
            setError('Ошибка сети. Попробуйте еще раз.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`wrapper ${action === 'register' ? 'active' : ''}`}>
            <div className={`form-box login`}>
                <form onSubmit={handleSubmit}>
                    <h1>Вход</h1>
                    {error && <p className="error">{error}</p>}
                    <div className="input-box">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            required
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                        <CiUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <CiLock className="icon" />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Загрузка...' : 'Войти'}
                    </button>
                    <div className="register-link">
                        <p>
                            Ещё нет аккаунта? <a href="#" onClick={registerLink}>Регистрация</a>
                        </p>
                    </div>
                </form>
            </div>
            <div className="form-box register">
                <form onSubmit={handleSubmit}>
                    <h1>Регистрация</h1>
                    {error && <p className="error">{error}</p>}
                    <div className="input-box">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            required
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                        <CiUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <CiMail className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <CiLock className="icon" />
                    </div>
                    <div className="agree">
                        <label>
                            <input type="checkbox" required /> Я даю согласие на{' '}
                            <a href="#" target="_blank" rel="noopener noreferrer">обработку персональных данных</a>
                        </label>
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Загрузка...' : 'Регистрация'}
                    </button>
                    <div className="register-link">
                        <p>
                            Уже есть аккаунт? <a href="#" onClick={loginLink}>Войти</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { CiUser, CiLock, CiMail } from 'react-icons/ci';
// import axiosInstance from '../../../api/axios';
// import './login.scss';
//
// function Login() {
//     const [action, setAction] = useState('login');
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
//         setAction('register');
//         setError('');
//     };
//
//     const loginLink = () => {
//         setAction('login');
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
//         try {
//             if (action === 'register') {
//                 const response = await axiosInstance.post('/api/v1/auth/users/', {
//                     username: formData.username,
//                     email: formData.email,
//                     password: formData.password
//                 });
//                 console.log('Регистрация прошла успешно:', response.data);
//                 setError('Регистрация прошла успешно');
//                 setAction('login');
//             } else {
//                 const response = await axiosInstance.post('/auth/token/login/', {
//                     username: formData.username,
//                     password: formData.password
//                 });
//                 console.log('Вход прошел успешно:', response.data);
//                 if (response.data && response.data.auth_token) {
//                     localStorage.setItem('token', response.data.auth_token);
//                     navigate('/profile', { state: { user: response.data } });
//                 } else {
//                     setError('Ошибка при получении токена аутентификации');
//                 }
//             }
//         } catch (error) {
//             if (error.response) {
//                 setError(`Ошибка: ${error.response.data.detail || error.response.statusText}`);
//             } else {
//                 setError('Ошибка сети. Попробуйте еще раз.');
//             }
//             console.error('Error:', error);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return (
//         <div className={`wrapper ${action === 'register' ? 'active' : ''}`}>
//             <div className={`form-box ${action === 'register' ? 'register' : 'login'}`}>
//                 <form onSubmit={handleSubmit}>
//                     <h1>{action === 'register' ? 'Регистрация' : 'Вход'}</h1>
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
//                     {action === 'register' && (
//                         <div className="input-box">
//                             <input
//                                 type="email"
//                                 name="email"
//                                 placeholder="Email"
//                                 required
//                                 value={formData.email}
//                                 onChange={handleInputChange}
//                             />
//                             <CiMail className="icon" />
//                         </div>
//                     )}
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
//                     {action === 'register' && (
//                         <div className="agree">
//                             <label>
//                                 <input type="checkbox" required /> Я даю согласие на{' '}
//                                 <a href="/Privacy_policy.pdf" target="_blank" rel="noopener noreferrer">обработку персональных данных</a>
//                             </label>
//                         </div>
//                     )}
//                     <button type="submit" disabled={loading}>
//                         {loading ? 'Загрузка...' : action === 'register' ? 'Регистрация' : 'Войти'}
//                     </button>
//                     {action === 'login' ? (
//                         <div className="register-link">
//                             <p>
//                                 Ещё нет аккаунта? <a href="#" onClick={registerLink}>Регистрация</a>
//                             </p>
//                         </div>
//                     ) : (
//                         <div className="register-link">
//                             <p>
//                                 Уже есть аккаунт? <a href="#" onClick={loginLink}>Войти</a>
//                             </p>
//                         </div>
//                     )}
//                 </form>
//             </div>
//         </div>
//     );
// }
//
// export default Login;
//
//
//
//
//
//
//
// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { CiUser, CiLock, CiMail } from 'react-icons/ci';
// // import './login.scss';
// // import { useUserContext } from '../../../api/UserContext.jsx';
// //
// // function Login() {
// //     const { setUser, setIsAuthenticated } = useUserContext();
// //     const [action, setAction] = useState('login');
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState('');
// //     const [formData, setFormData] = useState({
// //         username: '',
// //         email: '',
// //         password: ''
// //     });
// //
// //     const navigate = useNavigate();
// //
// //     const registerLink = () => {
// //         setAction('register');
// //         setError('');
// //     };
// //
// //     const loginLink = () => {
// //         setAction('login');
// //         setError('');
// //     };
// //
// //     const handleInputChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData({
// //             ...formData,
// //             [name]: value
// //         });
// //     };
// //
// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         setLoading(true);
// //         setError('');
// //
// //         // Использование фиктивных данных
// //         const mockResponse = {
// //             data: {
// //                 id: 1,
// //                 username: formData.username,
// //                 email: formData.email,
// //                 avatar: '/path/to/avatar.jpg',
// //                 favorites: [
// //                     { id: 1, title: 'Статья 1' },
// //                     { id: 2, title: 'Статья 2' },
// //                     { id: 3, title: 'Статья 3' }
// //                 ]
// //             }
// //         };
// //
// //         try {
// //             if (action === 'register') {
// //                 // Имитируем успешную регистрацию
// //                 console.log('Регистрация прошла успешно:', mockResponse.data);
// //                 setError('Регистрация прошла успешно');
// //                 setAction('login');
// //             } else {
// //                 // Имитируем успешный вход
// //                 console.log('Вход прошел успешно:', mockResponse.data);
// //                 setUser(mockResponse.data);
// //                 setIsAuthenticated(true);
// //                 navigate('/profile');
// //             }
// //         } catch (error) {
// //             setError('Ошибка сети. Попробуйте еще раз.');
// //         } finally {
// //             setLoading(false);
// //         }
// //     };
// //
// //     return (
// //         <div className={`wrapper ${action === 'register' ? 'active' : ''}`}>
// //             <div className={`form-box login`}>
// //                 <form onSubmit={handleSubmit}>
// //                     <h1>Вход</h1>
// //                     {error && <p className="error">{error}</p>}
// //                     <div className="input-box">
// //                         <input
// //                             type="text"
// //                             name="username"
// //                             placeholder="Username"
// //                             required
// //                             value={formData.username}
// //                             onChange={handleInputChange}
// //                         />
// //                         <CiUser className="icon" />
// //                     </div>
// //                     <div className="input-box">
// //                         <input
// //                             type="password"
// //                             name="password"
// //                             placeholder="Password"
// //                             required
// //                             value={formData.password}
// //                             onChange={handleInputChange}
// //                         />
// //                         <CiLock className="icon" />
// //                     </div>
// //                     <button type="submit" disabled={loading}>
// //                         {loading ? 'Загрузка...' : 'Войти'}
// //                     </button>
// //                     <div className="register-link">
// //                         <p>
// //                             Ещё нет аккаунта? <a href="#" onClick={registerLink}>Регистрация</a>
// //                         </p>
// //                     </div>
// //                 </form>
// //             </div>
// //             <div className="form-box register">
// //                 <form onSubmit={handleSubmit}>
// //                     <h1>Регистрация</h1>
// //                     {error && <p className="error">{error}</p>}
// //                     <div className="input-box">
// //                         <input
// //                             type="text"
// //                             name="username"
// //                             placeholder="Username"
// //                             required
// //                             value={formData.username}
// //                             onChange={handleInputChange}
// //                         />
// //                         <CiUser className="icon" />
// //                     </div>
// //                     <div className="input-box">
// //                         <input
// //                             type="email"
// //                             name="email"
// //                             placeholder="Email"
// //                             required
// //                             value={formData.email}
// //                             onChange={handleInputChange}
// //                         />
// //                         <CiMail className="icon" />
// //                     </div>
// //                     <div className="input-box">
// //                         <input
// //                             type="password"
// //                             name="password"
// //                             placeholder="Password"
// //                             required
// //                             value={formData.password}
// //                             onChange={handleInputChange}
// //                         />
// //                         <CiLock className="icon" />
// //                     </div>
// //                     <div className="agree">
// //                         <label>
// //                             <input type="checkbox" required /> Я даю согласие на{' '}
// //                             <a href="/Privacy_policy.pdf" target="_blank" rel="noopener noreferrer">обработку персональных данных</a>
// //                         </label>
// //                     </div>
// //                     <button type="submit" disabled={loading}>
// //                         {loading ? 'Загрузка...' : 'Регистрация'}
// //                     </button>
// //                     <div className="register-link">
// //                         <p>
// //                             Уже есть аккаунт? <a href="#" onClick={loginLink}>Войти</a>
// //                         </p>
// //                     </div>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // }
// //
// // export default Login;


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { CiUser, CiLock, CiMail } from 'react-icons/ci';
// import axiosInstance from '../../../api/axios';
// import './login.scss';
// import { useUserContext } from '../../../api/UserContext.jsx';
//
// function Login() {
//     const { setUser } = useUserContext();
//     const [action, setAction] = useState('login');
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
//         setAction('register');
//         setError('');
//     };
//
//     const loginLink = () => {
//         setAction('login');
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
//         try {
//             if (action === 'register') {
//                 const response = await axiosInstance.post('/api/v1/auth/users/', {
//                     username: formData.username,
//                     email: formData.email,
//                     password: formData.password
//                 });
//                 console.log('Регистрация прошла успешно:', response.data);
//                 setError('Регистрация прошла успешно');
//                 setAction('login');
//             } else {
//                 const response = await axiosInstance.post('/auth/token/login/', {
//                     username: formData.username,
//                     password: formData.password
//                 });
//                 console.log('Вход прошел успешно:', response.data);
//                 if (response.data && response.data.auth_token) {
//                     localStorage.setItem('token', response.data.auth_token);
//                     setUser({ auth_token: response.data.auth_token, ...formData }); // Устанавливаем данные пользователя в контексте
//                     navigate('/profile');
//                 } else {
//                     setError('Ошибка при получении токена аутентификации');
//                 }
//             }
//         } catch (error) {
//             if (error.response) {
//                 setError(`Ошибка: ${error.response.data.detail || error.response.statusText}`);
//             } else {
//                 setError('Ошибка сети. Попробуйте еще раз.');
//             }
//             console.error('Error:', error);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return (
//         <div className={`wrapper ${action === 'register' ? 'active' : ''}`}>
//             <div className={`form-box ${action === 'register' ? 'register' : 'login'}`}>
//                 <form onSubmit={handleSubmit}>
//                     <h1>{action === 'register' ? 'Регистрация' : 'Вход'}</h1>
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
//                     {action === 'register' && (
//                         <div className="input-box">
//                             <input
//                                 type="email"
//                                 name="email"
//                                 placeholder="Email"
//                                 required
//                                 value={formData.email}
//                                 onChange={handleInputChange}
//                             />
//                             <CiMail className="icon" />
//                         </div>
//                     )}
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
//                     {action === 'register' && (
//                         <div className="agree">
//                             <label>
//                                 <input type="checkbox" required /> Я даю согласие на{' '}
//                                 <a href="/Privacy_policy.pdf" target="_blank" rel="noopener noreferrer">обработку персональных данных</a>
//                             </label>
//                         </div>
//                     )}
//                     <button type="submit" disabled={loading}>
//                         {loading ? 'Загрузка...' : action === 'register' ? 'Регистрация' : 'Войти'}
//                     </button>
//                     {action === 'login' ? (
//                         <div className="register-link">
//                             <p>
//                                 Ещё нет аккаунта? <a href="#" onClick={registerLink}>Регистрация</a>
//                             </p>
//                         </div>
//                     ) : (
//                         <div className="register-link">
//                             <p>
//                                 Уже есть аккаунт? <a href="#" onClick={loginLink}>Войти</a>
//                             </p>
//                         </div>
//                     )}
//                 </form>
//             </div>
//         </div>
//     );
// }
//
// export default Login;!!!!!

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiUser, CiLock } from 'react-icons/ci';
import axiosInstance from '../../../api/axios';
import './login.scss';

function Login() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

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

        try {
            const response = await axiosInstance.post('/auth/token/login/', {
                username: formData.username,
                password: formData.password
            });
            const token = response.data.auth_token;
            localStorage.setItem('token', token);
            console.log('Вход прошел успешно:', response.data);
            navigate('/profile', { state: { user: response.data } });
        } catch (error) {
            setError('Ошибка сети. Попробуйте еще раз.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="wrapper">
            <div className="form-box login">
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
                </form>
            </div>
        </div>
    );
}

export default Login;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiUser, CiLock, CiMail } from 'react-icons/ci';
import axiosInstance from '../../../api/axios';
import './login.scss';
import { useUserContext } from '../../../api/UserContext.jsx';

function Login() {
    const { setUser } = useUserContext();
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

        try {
            if (action === 'register') {
                const response = await axiosInstance.post('/api/v1/auth/users/', {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                });
                console.log('Регистрация прошла успешно:', response.data);
                setError('Регистрация прошла успешно');
                setAction('login');
            } else {
                const response = await axiosInstance.post('/auth/token/login/', {
                    username: formData.username,
                    password: formData.password
                });
                console.log('Вход прошел успешно:', response.data);
                if (response.data && response.data.auth_token) {
                    const userData = { auth_token: response.data.auth_token, ...formData };
                    localStorage.setItem('token', response.data.auth_token);
                    setUser(userData);
                    navigate('/profile');
                } else {
                    setError('Ошибка при получении токена аутентификации');
                }
            }
        } catch (error) {
            if (error.response) {
                setError(`Ошибка: ${error.response.data.detail || error.response.statusText}`);
            } else {
                setError('Ошибка сети. Попробуйте еще раз.');
            }
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`wrapper ${action === 'register' ? 'active' : ''}`}>
            <div className={`form-box ${action === 'register' ? 'register' : 'login'}`}>
                <form onSubmit={handleSubmit}>
                    <h1>{action === 'register' ? 'Регистрация' : 'Вход'}</h1>
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
                    {action === 'register' && (
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
                    )}
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
                    {action === 'register' && (
                        <div className="agree">
                            <label>
                                <input type="checkbox" required /> Я даю согласие на{' '}
                                <a href="/Privacy_policy.pdf" target="_blank" rel="noopener noreferrer">обработку персональных данных</a>
                            </label>
                        </div>
                    )}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Загрузка...' : action === 'register' ? 'Регистрация' : 'Войти'}
                    </button>
                    {action === 'login' ? (
                        <div className="register-link">
                            <p>
                                Ещё нет аккаунта? <a href="#" onClick={registerLink}>Регистрация</a>
                            </p>
                        </div>
                    ) : (
                        <div className="register-link">
                            <p>
                                Уже есть аккаунт? <a href="#" onClick={loginLink}>Войти</a>
                            </p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Login;


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { CiUser, CiLock, CiMail } from 'react-icons/ci';
// import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
// import axiosInstance from '../../../api/axios';
// import { useUserContext } from '../../../api/UserContext.jsx';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import './login.scss';
//
// function Login() {
//     const { setUser } = useUserContext();
//     const [action, setAction] = useState('login');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [showPassword, setShowPassword] = useState(false); // Состояние для отображения пароля
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
//     const initialValues = {
//         username: '',
//         email: '',
//         password: ''
//     };
//
//     const validationSchema = Yup.object().shape({
//         username: Yup.string()
//             .matches(/^[a-zA-Z0-9]+$/, 'Только латинские буквы и цифры')
//             .required('Требуется имя пользователя'),
//         email: action === 'register' ? Yup.string().email('Invalid email').required('Email is required') : Yup.string(),
//         password: Yup.string()
//             .matches(/^[a-zA-Z0-9]+$/, 'Только латинские буквы и цифры')
//             .matches(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
//             .required('Требуется пароль')
//     });
//
//     const handleSubmit = async (values, { setSubmitting }) => {
//         setError('');
//         setLoading(true);
//
//         try {
//             if (action === 'register') {
//                 const response = await axiosInstance.post('/api/v1/auth/users/', {
//                     username: values.username,
//                     email: values.email,
//                     password: values.password
//                 });
//                 console.log('Регистрация прошла успешно:', response.data);
//                 setError('Регистрация прошла успешно');
//                 setAction('login');
//             } else {
//                 const response = await axiosInstance.post('/auth/token/login/', {
//                     username: values.username,
//                     password: values.password
//                 });
//                 console.log('Вход прошел успешно:', response.data);
//                 if (response.data && response.data.auth_token) {
//                     localStorage.setItem('token', response.data.auth_token);
//                     setUser({ auth_token: response.data.auth_token, ...values });
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
//             setSubmitting(false);
//         }
//     };
//
//     return (
//         <div className={`wrapper ${action === 'register' ? 'active' : ''}`}>
//             <div className={`form-box ${action === 'register' ? 'register' : 'login'}`}>
//                 <Formik
//                     initialValues={initialValues}
//                     validationSchema={validationSchema}
//                     onSubmit={handleSubmit}
//                 >
//                     {({ isSubmitting }) => (
//                         <Form>
//                             <h1>{action === 'register' ? 'Регистрация' : 'Вход'}</h1>
//                             {error && <p className="error">{error}</p>}
//                             <div className="input-box">
//                                 <Field
//                                     type="text"
//                                     name="username"
//                                     placeholder="Username"
//                                 />
//                                 <CiUser className="icon" />
//                                 <ErrorMessage name="username" component="div" className="error" />
//                             </div>
//                             {action === 'register' && (
//                                 <div className="input-box">
//                                     <Field
//                                         type="email"
//                                         name="email"
//                                         placeholder="Email"
//                                     />
//                                     <CiMail className="icon" />
//                                     <ErrorMessage name="email" component="div" className="error" />
//                                 </div>
//                             )}
//                             <div className="input-box password-box">
//                                 <Field
//                                     type={showPassword ? "text" : "password"} // Изменение типа поля для отображения пароля
//                                     name="password"
//                                     placeholder="Password"
//                                 />
//                                 <CiLock className="icon" />
//                                 {showPassword ? (
//                                     <AiFillEyeInvisible className="password-toggle" onClick={() => setShowPassword(false)} />
//                                 ) : (
//                                     <AiFillEye className="password-toggle" onClick={() => setShowPassword(true)} />
//                                 )}
//                                 <ErrorMessage name="password" component="div" className="error" />
//                             </div>
//                             {action === 'register' && (
//                                 <div className="agree">
//                                     <label>
//                                         <Field type="checkbox" name="agree" required /> Я даю согласие на{' '}
//                                         <a href="/Privacy_policy.pdf" target="_blank" rel="noopener noreferrer">обработку персональных данных</a>
//                                     </label>
//                                 </div>
//                             )}
//                             <button type="submit" disabled={isSubmitting || loading}>
//                                 {loading ? 'Загрузка...' : action === 'register' ? 'Регистрация' : 'Войти'}
//                             </button>
//                             {action === 'login' ? (
//                                 <div className="register-link">
//                                     <p>
//                                         Ещё нет аккаунта? <a href="#" onClick={registerLink}>Регистрация</a>
//                                     </p>
//                                 </div>
//                             ) : (
//                                 <div className="register-link">
//                                     <p>
//                                         Уже есть аккаунт? <a href="#" onClick={loginLink}>Войти</a>
//                                     </p>
//                                 </div>
//                             )}
//                         </Form>
//                     )}
//                 </Formik>
//             </div>
//         </div>
//     );
// }
//
// export default Login;

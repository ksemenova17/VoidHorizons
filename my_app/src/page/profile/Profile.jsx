// import React from 'react';
// import { CiTrash, CiCamera, CiHeart } from 'react-icons/ci';
// import './profile.scss';
//
// const ProfilePage = () => {
//     const user = {
//         NickName: 'lala',
//     };
//
//     return (
//         <div className="profile-page">
//             <div className="profile-container">
//                 <div className="profile-picture">
//                     <img src="https://via.placeholder.com/150" alt="User"/>
//                     <p>NickName</p>
//                     <button className="upload-button">
//                         <CiCamera/> Загрузить фото
//                     </button>
//                     <h3><span><CiHeart/></span>Избранные статьи</h3>
//                     <p>Текущий пароль</p>
//                     <input placeholder="Текущий пароль" type="password"/>
//                     <p>Новый пароль</p>
//                     <input placeholder="Новый пароль" type="password"/>
//                     <p>Подтвердите пароль</p>
//                     <input placeholder="Подтвердите пароль" type="password"/>
//                     {/*<button className="delete-button">*/}
//                     {/*    <CiTrash /> Удалить*/}
//                     {/*</button>*/}
//                 </div>
//                 {/*<div className="profile-form">*/}
//                 {/*    <button type="submit" className="save-button">*/}
//                 {/*        Сохранить изменения*/}
//                 {/*    </button>*/}
//                 {/*</div>*/}
//             </div>
//         </div>
//     );
// };
//
// export default ProfilePage;

// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from '../../api/axios';
// import { CiCamera, CiHeart } from 'react-icons/ci';
// import './profile.scss';
//
// const profile = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const user = location.state?.user;
//
//     if (!user) {
//         navigate('/login');
//         return null;
//     }
//
//     const favorites = [
//         { id: 1, title: 'Статья 1' },
//         { id: 2, title: 'Статья 2' },
//         { id: 3, title: 'Статья 3' }
//     ];
//
//     const [email, setEmail] = useState(user.email);
//     const [currentPassword, setCurrentPassword] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [message, setMessage] = useState('');
//
//     const handleLogout = () => {
//         console.log('Пользователь вышел из аккаунта');
//         navigate('/login');
//     };
//
//     const handleChangePassword = async () => {
//         if (newPassword !== confirmPassword) {
//             setMessage('Пароли не совпадают');
//             return;
//         }
//
//         try {
//             const response = await axios.post('/change-password', {
//                 email,
//                 currentPassword,
//                 newPassword,
//             });
//
//             if (response.status === 200) {
//                 setMessage('Инструкции по смене пароля отправлены на вашу почту');
//             } else {
//                 setMessage('Ошибка при смене пароля');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             setMessage('Ошибка при смене пароля');
//         }
//     };
//
//     return (
//         <div className="profile-page">
//             <div className="profile-container">
//                 <div className="profile-picture">
//                     <img src="https://via.placeholder.com/150" alt="User" />
//                     <p>{user.username}</p>
//                     <button className="upload-button">
//                         <CiCamera /> Загрузить фото
//                     </button>
//                     <button onClick={handleLogout} className="logout-button">Выйти</button>
//                 </div>
//                 <div className="profile-form">
//                     <h3>Смена пароля</h3>
//                     <div className="form-group">
//                         <input
//                             type="password"
//                             placeholder="Текущий пароль"
//                             value={currentPassword}
//                             onChange={(e) => setCurrentPassword(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="password"
//                             placeholder="Новый пароль"
//                             value={newPassword}
//                             onChange={(e) => setNewPassword(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="password"
//                             placeholder="Подтвердите пароль"
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                         />
//                     </div>
//                     <button onClick={handleChangePassword} className="save-button">
//                         Сменить пароль
//                     </button>
//                     {message && <p className="error-message">{message}</p>}
//                 </div>
//                 <div className="favorites">
//                     <h3><CiHeart /> Избранные статьи</h3>
//                     <ul>
//                         {favorites.map((article) => (
//                             <li key={article.id}>
//                                 <a href={`/library/${article.id}`}>{article.title}</a>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default profile;

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation, useParams } from 'react-router-dom';
// import { CiCamera, CiHeart } from 'react-icons/ci';
// import axios from 'axios';
// import './profile.scss';
//
// const Profile = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { uid, token } = useParams(); // Для подтверждения сброса пароля
//     const [user, setUser] = useState(location.state?.user || JSON.parse(localStorage.getItem('user')));
//     const [email, setEmail] = useState(user?.email || '');
//     const [username, setUsername] = useState(user?.username || '');
//     const [currentPassword, setCurrentPassword] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const [profileImage, setProfileImage] = useState(user?.profileImage || 'https://via.placeholder.com/150');
//     const [resetEmail, setResetEmail] = useState('');
//     const [favorites, setFavorites] = useState([]);
//
//     useEffect(() => {
//         if (!user) {
//             navigate('/Login');
//         } else {
//             axios.get(`/api/user/favorites/${user.id}`)
//                 .then(response => setFavorites(response.data))
//                 .catch(error => console.error('Error fetching favorites:', error));
//         }
//     }, [navigate, user]);
//
//     const handleLogout = () => {
//         axios.post('/api/logout')
//             .then(() => {
//                 localStorage.removeItem('user');
//                 navigate('/Login');
//             })
//             .catch(error => console.error('Error logging out:', error));
//     };
//
//     const handleDeleteAccount = () => {
//         axios.delete(`/api/user/${user.id}`)
//             .then(() => {
//                 localStorage.removeItem('user');
//                 navigate('/Login');
//             })
//             .catch(error => console.error('Error deleting account:', error));
//     };
//
//     const handleChangePassword = async () => {
//         if (newPassword !== confirmPassword) {
//             setMessage('Пароли не совпадают');
//             return;
//         }
//
//         try {
//             await axios.post('/api/change-password', {
//                 current_password: currentPassword,
//                 new_password: newPassword,
//             });
//             setMessage('Пароль успешно изменен.');
//         } catch (error) {
//             setMessage('Произошла ошибка. Попробуйте еще раз.');
//         }
//     };
//
//     const handlePasswordResetRequest = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('/api/auth/users/reset_password/', { email: resetEmail });
//             setMessage('Ссылка для сброса пароля отправлена на вашу почту.');
//         } catch (error) {
//             setMessage('Произошла ошибка. Попробуйте еще раз.');
//         }
//     };
//
//     const handlePasswordResetConfirm = async (e) => {
//         e.preventDefault();
//         if (newPassword !== confirmPassword) {
//             setMessage('Пароли не совпадают.');
//             return;
//         }
//         try {
//             await axios.post('/api/auth/users/reset_password_confirm/', {
//                 uid,
//                 token,
//                 new_password: newPassword,
//             });
//             setMessage('Пароль успешно сброшен.');
//             navigate('/Login');
//         } catch (error) {
//             setMessage('Произошла ошибка. Попробуйте еще раз.');
//         }
//     };
//
//     const handleImageUpload = (e) => {
//         const file = e.target.files[0];
//         const formData = new FormData();
//         formData.append('profile_image', file);
//
//         axios.post('/api/upload-profile-image', formData)
//             .then(response => setProfileImage(response.data.profileImage))
//             .catch(error => console.error('Error uploading profile image:', error));
//     };
//
//     return (
//         <div className="profile-page">
//             <div className="profile-container">
//                 <div className="profile-picture">
//                     <img src={profileImage} alt="User" />
//                     <p>{username}</p>
//                     <input type="file" onChange={handleImageUpload} />
//                     <button className="upload-button">
//                         <CiCamera /> Загрузить фото
//                     </button>
//                     <button onClick={handleLogout} className="logout-button">Выйти</button>
//                     <button onClick={handleDeleteAccount} className="delete-button">Удалить аккаунт</button>
//                 </div>
//                 <div className="profile-form">
//                     <h3>Смена пароля</h3>
//                     <div className="form-group">
//                         <input
//                             type="password"
//                             placeholder="Текущий пароль"
//                             value={currentPassword}
//                             onChange={(e) => setCurrentPassword(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="password"
//                             placeholder="Новый пароль"
//                             value={newPassword}
//                             onChange={(e) => setNewPassword(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="password"
//                             placeholder="Подтвердите пароль"
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                         />
//                     </div>
//                     <button onClick={handleChangePassword} className="save-button">
//                         Сменить пароль
//                     </button>
//                     {message && <p className="error-message">{message}</p>}
//                 </div>
//                 <div className="password-reset-request">
//                     <h3>Запрос на сброс пароля</h3>
//                     <form onSubmit={handlePasswordResetRequest}>
//                         <div className="form-group">
//                             <input
//                                 type="email"
//                                 placeholder="Введите ваш email"
//                                 value={resetEmail}
//                                 onChange={(e) => setResetEmail(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <button type="submit">Отправить ссылку для сброса</button>
//                     </form>
//                 </div>
//                 {uid && token && (
//                     <div className="password-reset-confirm-form">
//                         <h3>Подтверждение сброса пароля</h3>
//                         <form onSubmit={handlePasswordResetConfirm}>
//                             <div className="form-group">
//                                 <input
//                                     type="password"
//                                     placeholder="Новый пароль"
//                                     value={newPassword}
//                                     onChange={(e) => setNewPassword(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <input
//                                     type="password"
//                                     placeholder="Подтвердите новый пароль"
//                                     value={confirmPassword}
//                                     onChange={(e) => setConfirmPassword(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <button type="submit">Сбросить пароль</button>
//                         </form>
//                     </div>
//                 )}
//                 <div className="favorites">
//                     <h3><CiHeart /> Избранные статьи</h3>
//                     <ul>
//                         {favorites.map((article) => (
//                             <li key={article.id}>
//                                 <a href={`/library/${article.id}`}>{article.title}</a>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Profile;



import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { CiCamera, CiHeart } from 'react-icons/ci';
import axios from 'axios';
import './profile.scss';

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { uid, token } = useParams(); // Для подтверждения сброса пароля
    const [user, setUser] = useState(location.state?.user || JSON.parse(localStorage.getItem('user')));
    const [email, setEmail] = useState(user?.email || '');
    const [username, setUsername] = useState(user?.username || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [profileImage, setProfileImage] = useState(user?.profileImage || 'https://via.placeholder.com/150');
    const [resetEmail, setResetEmail] = useState('');
    const [favorites, setFavorites] = useState([]); // Инициализация как пустой массив

    useEffect(() => {
        if (!user) {
            navigate('/Login');
        } else {
            axios.get(`/api/user/favorites/${user.id}`)
                .then(response => setFavorites(response.data))
                .catch(error => console.error('Error fetching favorites:', error));
        }
    }, [navigate, user]);

    const handleLogout = () => {
        axios.post('/api/logout')
            .then(() => {
                localStorage.removeItem('user');
                navigate('/Login');
            })
            .catch(error => console.error('Error logging out:', error));
    };

    const handleDeleteAccount = () => {
        axios.delete(`/api/user/${user.id}`)
            .then(() => {
                localStorage.removeItem('user');
                navigate('/Login');
            })
            .catch(error => console.error('Error deleting account:', error));
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage('Пароли не совпадают');
            return;
        }

        try {
            await axios.post('/api/change-password', {
                current_password: currentPassword,
                new_password: newPassword,
            });
            setMessage('Пароль успешно изменен.');
        } catch (error) {
            setMessage('Произошла ошибка. Попробуйте еще раз.');
        }
    };

    const handlePasswordResetRequest = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/auth/users/reset_password/', { email: resetEmail });
            setMessage('Ссылка для сброса пароля отправлена на вашу почту.');
        } catch (error) {
            setMessage('Произошла ошибка. Попробуйте еще раз.');
        }
    };

    const handlePasswordResetConfirm = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('Пароли не совпадают.');
            return;
        }
        try {
            await axios.post('/api/auth/users/reset_password_confirm/', {
                uid,
                token,
                new_password: newPassword,
            });
            setMessage('Пароль успешно сброшен.');
            navigate('/login');
        } catch (error) {
            setMessage('Произошла ошибка. Попробуйте еще раз.');
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('profile_image', file);

        axios.post('/api/upload-profile-image', formData)
            .then(response => setProfileImage(response.data.profileImage))
            .catch(error => console.error('Error uploading profile image:', error));
    };

    if (!user) {
        return null;
    }

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-picture">
                    <img src={profileImage} alt="User" />
                    <p>{username}</p>
                    <input type="file" onChange={handleImageUpload} />
                    <button className="upload-button">
                        <CiCamera /> Загрузить фото
                    </button>
                    <button onClick={handleLogout} className="logout-button">Выйти</button>
                    <button onClick={handleDeleteAccount} className="delete-button">Удалить аккаунт</button>
                </div>
                <div className="profile-form">
                    <h3>Смена пароля</h3>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Текущий пароль"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Новый пароль"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Подтвердите пароль"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button onClick={handleChangePassword} className="save-button">
                        Сменить пароль
                    </button>
                    {message && <p className="error-message">{message}</p>}
                </div>
                <div className="password-reset-request">
                    <h3>Запрос на сброс пароля</h3>
                    <form onSubmit={handlePasswordResetRequest}>
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Введите ваш email"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Отправить ссылку для сброса</button>
                    </form>
                </div>
                {uid && token && (
                    <div className="password-reset-confirm-form">
                        <h3>Подтверждение сброса пароля</h3>
                        <form onSubmit={handlePasswordResetConfirm}>
                            <div className="form-group">
                                <input
                                    type="password"
                                    placeholder="Новый пароль"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    placeholder="Подтвердите новый пароль"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit">Сбросить пароль</button>
                        </form>
                    </div>
                )}
                <div className="favorites">
                    <h3><CiHeart /> Избранные статьи</h3>
                    <ul>
                        {Array.isArray(favorites) && favorites.map((article) => (
                            <li key={article.id}>
                                <a href={`/library/${article.id}`}>{article.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Profile;




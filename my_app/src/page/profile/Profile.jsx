// import { useState, useEffect } from 'react';
// import { useUserContext } from '../../api/UserContext';
// import ArticlesService from '../../api/ArticlesService';
// import './profile.scss';
// import { GoPencil, GoTrash } from 'react-icons/go';
//
// const Profile = () => {
//     const { user, setUser, logout } = useUserContext();
//     const [editingName, setEditingName] = useState(false);
//     const [newName, setNewName] = useState('');
//     const [passwords, setPasswords] = useState({
//         current: '',
//         new: '',
//         confirm: ''
//     });
//     const [passwordError, setPasswordError] = useState('');
//     const [favorites, setFavorites] = useState([]);
//
//     useEffect(() => {
//         if (user) {
//             setNewName(user.name || '');
//             fetchFavorites();
//         }
//     }, [user]);
//
//     const fetchFavorites = async () => {
//         try {
//             const response = await ArticlesService.getFavorites();
//             setFavorites(response);
//         } catch (error) {
//             console.error('Ошибка при загрузке избранного:', error);
//         }
//     };
//
//     const handleNameChange = (e) => {
//         setNewName(e.target.value);
//     };
//
//     const saveName = async () => {
//         if (newName && newName.trim() !== '') {
//             try {
//                 const response = await ArticlesService.updateUserName(newName);
//                 setUser(response); // Обновляем контекст пользователя
//                 setEditingName(false);
//             } catch (error) {
//                 console.error('Ошибка при обновлении имени:', error);
//             }
//         }
//     };
//
//     const handlePasswordChange = (e) => {
//         const { name, value } = e.target;
//         setPasswords(prevState => ({ ...prevState, [name]: value }));
//     };
//
//     const handlePasswordSubmit = async (e) => {
//         e.preventDefault();
//         if (passwords.new !== passwords.confirm) {
//             setPasswordError('Пароли не совпадают');
//         } else {
//             try {
//                 await ArticlesService.changePassword(passwords.current, passwords.new);
//                 setPasswordError('Пароль успешно изменен');
//                 setPasswords({
//                     current: '',
//                     new: '',
//                     confirm: ''
//                 });
//             } catch (error) {
//                 setPasswordError('Ошибка при изменении пароля');
//                 console.error('Ошибка при изменении пароля:', error);
//             }
//         }
//     };
//
//     const handleDeleteArticle = async (articleId) => {
//         try {
//             await ArticlesService.deleteFavorite(articleId);
//             setFavorites(favorites.filter(article => article.id !== articleId));
//         } catch (error) {
//             console.error('Ошибка при удалении статьи из избранного:', error);
//         }
//     };
//
//     if (!user) {
//         return <div>Loading...</div>;
//     }
//
//     return (
//         <div className="profile-container">
//             <h1 className="profile-title">Личный кабинет</h1>
//             <div className="profile-section">
//                 {editingName ? (
//                     <div className="username-edit">
//                         <input
//                             type="text"
//                             value={newName}
//                             onChange={handleNameChange}
//                             onBlur={saveName}
//                             autoFocus
//                         />
//                     </div>
//                 ) : (
//                     <div className="username-display">
//                         <span>{user.username}</span>
//                         <GoPencil onClick={() => setEditingName(true)} />
//                     </div>
//                 )}
//             </div>
//             <div className="profile-content">
//                 <div className="password-change">
//                     <h2>Изменение пароля</h2>
//                     <form onSubmit={handlePasswordSubmit}>
//                         <input
//                             type="password"
//                             name="current"
//                             value={passwords.current}
//                             onChange={handlePasswordChange}
//                             placeholder="Текущий пароль"
//                         />
//                         <input
//                             type="password"
//                             name="new"
//                             value={passwords.new}
//                             onChange={handlePasswordChange}
//                             placeholder="Новый пароль"
//                         />
//                         <input
//                             type="password"
//                             name="confirm"
//                             value={passwords.confirm}
//                             onChange={handlePasswordChange}
//                             placeholder="Подтвердите пароль"
//                         />
//                         {passwordError && <p className="error">{passwordError}</p>}
//                         <button type="submit">Изменить пароль</button>
//                     </form>
//                 </div>
//                 <div className="favorite-articles">
//                     <h2>Избранные статьи</h2>
//                     <ul>
//                         {favorites.map(article => (
//                             <li key={article.id}>
//                                 <a href={`/library/${article.id}`}>{article.title}</a>
//                                 <GoTrash onClick={() => handleDeleteArticle(article.id)} />
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//             <button className="logout" onClick={logout}>Выйти</button>
//         </div>
//     );
// };
//
// export default Profile;


import { useState, useEffect } from 'react';
import { useUserContext } from '../../api/UserContext';
import ArticlesService from '../../api/ArticlesService';
import './profile.scss';
import { GoPencil, GoTrash } from 'react-icons/go';

const Profile = () => {
    const { user, setUser, logout } = useUserContext();
    const [editingName, setEditingName] = useState(false);
    const [newName, setNewName] = useState('');
    const [passwords, setPasswords] = useState({
        new: '',
        current: ''
    });
    const [passwordError, setPasswordError] = useState('');
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (user) {
            setNewName(user.name || '');
            fetchFavorites();
        }
    }, [user]);

    const fetchFavorites = async () => {
        try {
            const response = await ArticlesService.getFavorites();
            setFavorites(response);
        } catch (error) {
            console.error('Ошибка при загрузке избранного:', error);
        }
    };

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const saveName = async () => {
        if (newName && newName.trim() !== '') {
            try {
                const response = await ArticlesService.updateUserName(newName);
                setUser(response); // Обновляем контекст пользователя
                setEditingName(false);
            } catch (error) {
                console.error('Ошибка при обновлении имени:', error);
            }
        }
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prevState => ({ ...prevState, [name]: value }));
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            await ArticlesService.changePassword(passwords.new, passwords.current);
            setPasswordError('Пароль успешно изменен');
            setPasswords({
                new: '',
                current: ''
            });
        } catch (error) {
            setPasswordError('Ошибка при изменении пароля');
            console.error('Ошибка при изменении пароля:', error);
        }
    };


    const handleDeleteArticle = async (articleId) => {
        try {
            await ArticlesService.deleteFavorite(articleId);
            setFavorites(favorites.filter(article => article.id !== articleId));
        } catch (error) {
            console.error('Ошибка при удалении статьи из избранного:', error);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h1 className="profile-title">Личный кабинет</h1>
            <div className="profile-section">
                {editingName ? (
                    <div className="username-edit">
                        <input
                            type="text"
                            value={newName}
                            onChange={handleNameChange}
                            onBlur={saveName}
                            autoFocus
                        />
                    </div>
                ) : (
                    <div className="username-display">
                        <span>{user.username}</span>
                        <GoPencil onClick={() => setEditingName(true)} />
                    </div>
                )}
            </div>
            <div className="profile-content">
                <div className="password-change">
                    <h2>Изменение пароля</h2>
                    <form onSubmit={handlePasswordSubmit}>
                        <input
                            type="password"
                            name="current"
                            value={passwords.new}
                            onChange={handlePasswordChange}
                            placeholder="Новый пароль"
                        />
                        <input
                            type="password"
                            name="new"
                            value={passwords.current}
                            onChange={handlePasswordChange}
                            placeholder="Текущий пароль"
                        />
                        <button type="submit">Изменить пароль</button>
                    </form>
                </div>
                <div className="favorite-articles">
                    <h2>Избранные статьи</h2>
                    <ul>
                        {favorites.map(article => (
                            <li key={article.id}>
                                <a href={`/library/${article.id}`}>{article.title || 'Без названия'}</a>
                                <GoTrash onClick={() => handleDeleteArticle(article.id)} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <button className="logout" onClick={logout}>Выйти</button>
        </div>
    );
};

export default Profile;

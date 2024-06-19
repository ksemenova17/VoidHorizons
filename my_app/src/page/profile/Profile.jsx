import { useState, useEffect } from 'react';
import { useUserContext } from '../../api/UserContext';
import axiosInstance from '../../api/axios';
import './profile.scss';
import { GoPencil, GoTrash } from 'react-icons/go';

const Profile = () => {
    const { user, setUser, logout } = useUserContext();
    const [editingName, setEditingName] = useState(false);
    const [newName, setNewName] = useState('');
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        if (user) {
            setNewName(user.name || '');
        }
    }, [user]);

    if (!user) {
        return <div>Loading...</div>;
    }

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const saveName = () => {
        if (newName && newName.trim() !== '') {
            axiosInstance.patch('/api/v1/auth/users/me/', { name: newName })
                .then(response => {
                    setUser(response.data);
                    setEditingName(false);
                })
                .catch(error => {
                    console.error('Ошибка при обновлении имени:', error);
                });
        }
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prevState => ({ ...prevState, [name]: value }));
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            setPasswordError('Пароли не совпадают');
        } else {
            axiosInstance.post('/api/v1/auth/password/change/', {
                old_password: passwords.current,
                new_password: passwords.new,
            })
                .then(() => {
                    setPasswordError('Пароль успешно изменен');
                    setPasswords({
                        current: '',
                        new: '',
                        confirm: ''
                    });
                })
                .catch(error => {
                    setPasswordError('Ошибка при изменении пароля');
                    console.error('Ошибка при изменении пароля:', error);
                });
        }
    };

    const handleDeleteArticle = (articleId) => {
        axiosInstance.delete(`/api/v1/favorites/${articleId}`)
            .then(() => {
                setUser(prevState => ({
                    ...prevState,
                    favorites: prevState.favorites.filter(article => article.id !== articleId)
                }));
            })
            .catch(error => console.error('Ошибка при удалении статьи из избранного:', error));
    };

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
                        <span>{user.name}</span>
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
                            value={passwords.current}
                            onChange={handlePasswordChange}
                            placeholder="Текущий пароль"
                        />
                        <input
                            type="password"
                            name="new"
                            value={passwords.new}
                            onChange={handlePasswordChange}
                            placeholder="Новый пароль"
                        />
                        <input
                            type="password"
                            name="confirm"
                            value={passwords.confirm}
                            onChange={handlePasswordChange}
                            placeholder="Подтвердите пароль"
                        />
                        {passwordError && <p className="error">{passwordError}</p>}
                        <button type="submit">Изменить пароль</button>
                    </form>
                </div>
                <div className="favorite-articles">
                    <h2>Избранные статьи</h2>
                    <ul>
                        {user.favorites && user.favorites.map(article => (
                            <li key={article.id}>
                                <a href={`/library/${article.id}`}>{article.title}</a>
                                <GoTrash onClick={() => handleDeleteArticle(article.id)} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <button onClick={logout}>Выйти</button>
        </div>
    );
};

export default Profile;

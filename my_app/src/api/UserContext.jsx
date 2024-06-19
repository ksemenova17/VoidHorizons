import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from './axios';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axiosInstance.get('/api/v1/auth/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setUser({ ...response.data, auth_token: token });
                })
                .catch(error => {
                    console.error('Ошибка при получении данных пользователя:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {loading ? <div className="loading-screen">Loading...</div> : children}
        </UserContext.Provider>
    );
};

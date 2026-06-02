import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

let profileRequest = null;
let profileCache = null;

const loadAuthenticatedUser = async (token) => {
    if (profileCache?.token === token) {
        return profileCache.user;
    }

    if (profileRequest?.token === token) {
        return profileRequest.promise;
    }

    const promise = api.get('/api/auth/profile')
        .then(({ data }) => {
            profileCache = { token, user: data };
            return data;
        })
        .finally(() => {
            profileRequest = null;
        });

    profileRequest = { token, promise };
    return promise;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const data = await loadAuthenticatedUser(token);
                    setUser(data);
                } catch (error) {
                    // Only clear the token if the server explicitly rejects it (401).
                    // Network errors or temporary server issues should not log the user out.
                    if (error.response?.status === 401) {
                        localStorage.removeItem('token');
                        setUser(null);
                    }
                }
            }
            setLoading(false);
        };
        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post('/api/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        setUser(data);
    };

    const register = async (name, email, password) => {
        const { data } = await api.post('/api/auth/register', { name, email, password });
        // Don't auto-login if verification is required, or handle accordingly
        // For now, we just return the data so the component can handle the redirect
        return data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        profileCache = null;
        profileRequest = null;
        setUser(null);
    };

    const updateUser = (userData) => {
        setUser((prev) => ({ ...prev, ...userData }));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Verify token and get user data
                    // We need to implement this endpoint in backend or just trust token for now if decoding locally
                    // Ideally: const { data } = await api.get('/api/auth/profile');
                    // For now, let's decode the token or just keep the session active
                    // To be fully secure, we should hit an endpoint.
                    // Let's assume /api/auth/profile exists or we create it.
                    // I'll leave it as a simple check for now but with intent to use real data.
                    const { data } = await api.get('/api/auth/profile');
                    setUser(data);
                } catch (error) {
                    localStorage.removeItem('token');
                    setUser(null);
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
        setUser(null);
    };

    const updateUser = (userData) => {
        setUser(userData);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

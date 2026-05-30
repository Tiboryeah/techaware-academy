import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const AdminRoute = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0c10]">
                <div className="h-10 w-10 rounded-full border-4 border-indigo-900 border-t-indigo-500 animate-spin" />
            </div>
        );
    }

    if (!user) return <Navigate to="/iniciar-sesion" replace />;
    if (user.role !== 'Admin') return <Navigate to="/" replace />;

    return <Outlet />;
};

export default AdminRoute;

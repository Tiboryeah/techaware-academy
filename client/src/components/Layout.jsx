import React, { useContext } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ThemeContext from '../context/ThemeContext';
import Chatbot from './Chatbot';
import { API_BASE_URL } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, LogOut, User as UserIcon, ShieldCheck, Settings } from 'lucide-react';
import logo from '../assets/logo_v2.png';

const Layout = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] flex flex-col transition-colors duration-500 font-sans">
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0a0c10]/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center gap-2 group">
                                <div className="group-hover:scale-110 transition-transform duration-300">
                                    <img src={logo} alt="Logo" className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500/20 shadow-lg" />
                                </div>
                                <span className="text-xl font-black bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                                    TechAware<span className="text-indigo-600 dark:text-indigo-400">Kids</span>
                                </span>
                            </Link>

                            <div className="hidden md:ml-12 md:flex md:space-x-1">
                                {[
                                    { name: 'Inicio', path: '/' },
                                    { name: 'Cursos', path: '/modules', protected: true },
                                    { name: 'Casos Reales', path: '/cases', protected: true },
                                ].map((item) => (
                                    (!item.protected || user) && (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive(item.path)
                                                ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleTheme}
                                className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:ring-2 hover:ring-indigo-500/30 transition-all border border-gray-200 dark:border-gray-700"
                                aria-label="Toggle Theme"
                            >
                                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                            </motion.button>

                            <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-800 mx-1" />

                            {user ? (
                                <div className="flex items-center gap-3">
                                    <Link
                                        to="/dashboard"
                                        className="flex items-center gap-2 p-1.5 pr-4 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-500/50 transition-all"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white overflow-hidden">
                                            {user.avatar ? (
                                                <img
                                                    src={user.avatar.startsWith('http') ? user.avatar : `${API_BASE_URL}${user.avatar}`}
                                                    alt="Avatar"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <UserIcon className="w-4 h-4" />
                                            )}
                                        </div>
                                        <span className="text-sm font-bold text-gray-700 dark:text-gray-200 hidden sm:inline">Mi Panel</span>
                                    </Link>
                                    <Link
                                        to="/profile"
                                        className="p-2.5 rounded-xl text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                                        title="Mi Perfil y Configuración"
                                    >
                                        <Settings className="w-5 h-5" />
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="p-2.5 rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                                        title="Cerrar Sesión"
                                    >
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-lg shadow-indigo-600/20 transition-all transform active:scale-95"
                                >
                                    Iniciar Sesión
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow">
                <Outlet />
            </main>

            <footer className="bg-white dark:bg-[#0a0c10] border-t border-gray-200 dark:border-gray-800 py-12">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
                            <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white">TechAware Kids</span>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">
                        &copy; 2026 TechAware Kids. Educando para un futuro digital más seguro.
                    </div>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="text-sm text-gray-400 hover:text-indigo-500 transition-colors uppercase tracking-widest font-bold text-[10px]">Política</Link>
                        <Link to="/terms" className="text-sm text-gray-400 hover:text-indigo-500 transition-colors uppercase tracking-widest font-bold text-[10px]">Términos</Link>
                        <Link to="/cases" className="text-sm text-gray-400 hover:text-indigo-500 transition-colors uppercase tracking-widest font-bold text-[10px]">Contacto</Link>
                    </div>
                </div>
            </footer>
            <Chatbot />
        </div>
    );
};

export default Layout;

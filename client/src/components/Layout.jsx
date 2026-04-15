import React, { useContext, useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ThemeContext from '../context/ThemeContext';
import Chatbot from './Chatbot';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, LogOut, User as UserIcon, Settings, Menu, X, LayoutDashboard, BookOpen, Shield } from 'lucide-react';
import logo from '../assets/logo_v2.png';
import avatarUrl from '../utils/avatarUrl';

const NAV_LINKS = [
    { name: 'Inicio',        path: '/',             Icon: LayoutDashboard, protected: false },
    { name: 'Cursos',        path: '/cursos',        Icon: BookOpen,        protected: true  },
    { name: 'Casos y guías', path: '/casos-y-guias', Icon: Shield,          protected: true  },
];

const Layout = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    // Cierra el menú al cambiar de ruta
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    const handleLogout = () => {
        logout();
        navigate('/iniciar-sesion');
    };

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        if (path === '/casos-y-guias') {
            return location.pathname === '/casos-y-guias' || location.pathname.startsWith('/casos/');
        }
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    };

    const isLessonPage = location.pathname.startsWith('/lecciones/');
    const visibleLinks = NAV_LINKS.filter((item) => !item.protected || user);

    return (
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] flex flex-col transition-colors duration-500 font-sans">
            <nav className={`${isLessonPage ? 'relative' : 'sticky top-0'} z-50 bg-white/80 dark:bg-[#0a0c10]/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 transition-colors duration-500`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 sm:h-20">

                        {/* Logo */}
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center gap-2 group">
                                <div className="group-hover:scale-110 transition-transform duration-300">
                                    <img src={logo} alt="Logo" className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-indigo-500/20 shadow-lg" />
                                </div>
                                <span className="text-lg sm:text-xl font-black bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                                    Kuxipilli
                                </span>
                            </Link>

                            {/* Links de escritorio */}
                            <div className="hidden md:ml-12 md:flex md:space-x-1">
                                {visibleLinks.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                            isActive(item.path)
                                                ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Acciones derecha */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleTheme}
                                className="p-2 sm:p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:ring-2 hover:ring-indigo-500/30 transition-all border border-gray-200 dark:border-gray-700"
                                aria-label="Cambiar tema"
                            >
                                {theme === 'light' ? <Moon className="w-4 h-4 sm:w-5 sm:h-5" /> : <Sun className="w-4 h-4 sm:w-5 sm:h-5" />}
                            </motion.button>

                            <div className="hidden sm:block h-8 w-[1px] bg-gray-200 dark:bg-gray-800 mx-1" />

                            {/* Acciones usuario — solo en escritorio */}
                            <div className="hidden md:flex items-center gap-3">
                                {user ? (
                                    <>
                                        <Link
                                            to="/panel"
                                            className="flex items-center gap-2 p-1.5 pr-4 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-500/50 transition-all"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white overflow-hidden">
                                                {user.avatar ? (
                                                    <img
                                                        src={avatarUrl(user.avatar)}
                                                        alt="Avatar"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <UserIcon className="w-4 h-4" />
                                                )}
                                            </div>
                                            <span className="text-sm font-bold text-gray-700 dark:text-gray-200">Mi Panel</span>
                                        </Link>
                                        <Link
                                            to="/perfil"
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
                                    </>
                                ) : (
                                    <Link
                                        to="/iniciar-sesion"
                                        className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-lg shadow-indigo-600/20 transition-all transform active:scale-95"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                )}
                            </div>

                            {/* Botón hamburguesa — solo en móvil */}
                            <motion.button
                                whileTap={{ scale: 0.92 }}
                                onClick={() => setMenuOpen((v) => !v)}
                                className="md:hidden p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 transition-all"
                                aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                            >
                                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Menú móvil desplegable */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                            className="md:hidden overflow-hidden border-t border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-[#0a0c10]/95 backdrop-blur-xl"
                        >
                            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                                {/* Links de navegación */}
                                {visibleLinks.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                                            isActive(item.path)
                                                ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                        }`}
                                    >
                                        <item.Icon className="w-4 h-4" />
                                        {item.name}
                                    </Link>
                                ))}

                                <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />

                                {/* Acciones de usuario */}
                                {user ? (
                                    <>
                                        {/* Avatar + nombre */}
                                        <div className="flex items-center gap-3 px-4 py-3">
                                            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white overflow-hidden flex-shrink-0">
                                                {user.avatar ? (
                                                    <img
                                                        src={avatarUrl(user.avatar)}
                                                        alt="Avatar"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <UserIcon className="w-4 h-4" />
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-gray-800 dark:text-white truncate">{user.name}</p>
                                                <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                            </div>
                                        </div>
                                        <Link
                                            to="/panel"
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                                        >
                                            <LayoutDashboard className="w-4 h-4" /> Mi Panel
                                        </Link>
                                        <Link
                                            to="/perfil"
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                                        >
                                            <Settings className="w-4 h-4" /> Mi Perfil
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                                        >
                                            <LogOut className="w-4 h-4" /> Cerrar Sesión
                                        </button>
                                    </>
                                ) : (
                                    <Link
                                        to="/iniciar-sesion"
                                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-lg shadow-indigo-600/20 transition-all"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <main className="flex-grow">
                <Outlet />
            </main>

            <footer className="bg-white dark:bg-[#0a0c10] border-t border-gray-200 dark:border-gray-800 py-8 sm:py-12">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-8 text-center md:text-left">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
                            <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white">Kuxipilli</span>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                        &copy; 2026 Kuxipilli. Educando para un futuro digital más seguro.
                    </div>
                    <div className="flex gap-4 sm:gap-6">
                        <Link to="/privacidad"  className="text-gray-400 hover:text-indigo-500 transition-colors uppercase tracking-widest font-bold text-[10px]">Política</Link>
                        <Link to="/terminos"    className="text-gray-400 hover:text-indigo-500 transition-colors uppercase tracking-widest font-bold text-[10px]">Términos</Link>
                        <Link to="/contactanos" className="text-gray-400 hover:text-indigo-500 transition-colors uppercase tracking-widest font-bold text-[10px]">Contáctanos</Link>
                    </div>
                </div>
            </footer>
            <Chatbot />
        </div>
    );
};

export default Layout;

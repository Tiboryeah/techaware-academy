import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ShieldCheck, ArrowRight } from 'lucide-react';
import logo from '../assets/logo_v2.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const { addToast } = useContext(ToastContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            addToast('¡Bienvenido de nuevo!', 'success');
            navigate('/dashboard');
        } catch (err) {
            addToast('Credenciales inválidas. Verifica tu correo y contraseña.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
            {/* Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full relative z-10"
            >
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center mb-6">
                        <img src={logo} alt="TechAware Kids Logo" className="w-40 h-40 object-cover rounded-full" />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
                        TechAware<span className="text-indigo-600 dark:text-indigo-400">Kids</span>
                    </h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400 font-medium italic">Tu centro de seguridad digital parental</p>
                </div>

                <div className="bg-white dark:bg-[#161b22] p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 transition-colors">
                    <div className="flex justify-center mb-10 p-1.5 bg-gray-50 dark:bg-[#0a0c10] rounded-2xl border border-gray-100 dark:border-gray-800">
                        <button className="flex-1 py-3 px-6 bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white rounded-xl shadow-sm font-black text-xs uppercase tracking-widest">
                            Entrar
                        </button>
                        <Link to="/register" className="flex-1 py-3 px-6 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-xl font-black text-xs uppercase tracking-widest text-center transition-colors">
                            Registro
                        </Link>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2 ml-1">Correo Electrónico</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-[#0a0c10] border-2 border-gray-100 dark:border-gray-800 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-600 transition-all font-medium"
                                        placeholder="ejemplo@correo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2 ml-1">Contraseña</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input
                                        type="password"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-[#0a0c10] border-2 border-gray-100 dark:border-gray-800 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-600 transition-all font-medium"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Buttons were already here */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-3 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-600/20 transition-all transform active:scale-95 disabled:opacity-50"
                        >
                            {loading ? 'Validando...' : (
                                <>Acceder al Panel <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>
                    </form>
                </div>

                <p className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm italic">
                    ¿Problemas para entrar? <Link to="/forgot-password" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Recuperar acceso</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;

import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../services/api';
import TermsModal from '../components/TermsModal';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, UserPlus, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import logo from '../assets/logo_v2.png';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [showTerms, setShowTerms] = useState(false);

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!acceptedTerms) {
            setError('Debes aceptar los Términos y Condiciones para registrarte.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            await api.post('/api/auth/register', { name, email, password });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al registrarse. Intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
            {/* Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px]" />
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
                        Únete a <span className="text-indigo-600 dark:text-indigo-400">TechAware</span>
                    </h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400 font-medium italic">Empieza a proteger a tu familia hoy mismo</p>
                </div>

                <div className="bg-white dark:bg-[#161b22] p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 transition-colors">
                    <div className="flex justify-center mb-10 p-1.5 bg-gray-50 dark:bg-[#0a0c10] rounded-2xl border border-gray-100 dark:border-gray-800">
                        <Link to="/login" className="flex-1 py-3 px-6 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-xl font-black text-xs uppercase tracking-widest text-center transition-colors">
                            Entrar
                        </Link>
                        <button className="flex-1 py-3 px-6 bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white rounded-xl shadow-sm font-black text-xs uppercase tracking-widest">
                            Registro
                        </button>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2 ml-1">Nombre Completo</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-[#0a0c10] border-2 border-gray-100 dark:border-gray-800 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-600 transition-all font-medium"
                                        placeholder="Tu nombre"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2 ml-1">Correo Electrónico</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-[#0a0c10] border-2 border-gray-100 dark:border-gray-800 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-600 transition-all font-medium"
                                        placeholder="padre@ejemplo.com"
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
                                        placeholder="Mínimo 8 caracteres"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-center gap-3 px-2">
                            <button
                                type="button"
                                onClick={() => setAcceptedTerms(!acceptedTerms)}
                                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${acceptedTerms ? 'bg-indigo-600 border-indigo-600' : 'border-gray-200 dark:border-gray-800'
                                    }`}
                            >
                                {acceptedTerms && <Check className="w-4 h-4 text-white" />}
                            </button>
                            <label className="text-xs text-gray-500 dark:text-gray-400 font-medium italic">
                                Acepto los{' '}
                                <button
                                    type="button"
                                    onClick={() => setShowTerms(true)}
                                    className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                                >
                                    Términos y Condiciones
                                </button>
                            </label>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-red-500 dark:text-red-400 text-xs font-bold text-center bg-red-500/5 py-2 rounded-lg border border-red-500/10 italic"
                            >
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !acceptedTerms}
                            className="w-full flex items-center justify-center gap-3 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-600/20 transition-all transform active:scale-95 disabled:opacity-50"
                        >
                            {loading ? 'Creando cuenta...' : (
                                <>Crear Mi Cuenta <UserPlus className="w-4 h-4" /></>
                            )}
                        </button>
                    </form>
                </div>

                <p className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm italic">
                    ¿Ya proteges a tu familia? <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Iniciar Sesión</Link>
                </p>
            </motion.div>

            <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
        </div>
    );
};

export default Register;

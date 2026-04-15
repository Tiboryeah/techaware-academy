import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import TermsModal from '../components/TermsModal';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus, Check, Eye, EyeOff } from 'lucide-react';
import logo from '../assets/logo_v2.png';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!acceptedTerms) {
            setError('Debes aceptar los Términos y Condiciones para registrarte.');
            return;
        }

        if (password.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const normalizedEmail = email.trim().toLowerCase();
            const { data } = await api.post('/api/auth/register', {
                name,
                email: normalizedEmail,
                password,
            });

            setSuccess(data.message || 'Registro exitoso. Te enviamos un código a tu correo para verificar tu cuenta.');

            setTimeout(() => {
                navigate('/verificar', { state: { email: normalizedEmail } });
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al registrarse. Intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const passwordHasMinLength = password.length >= 8;
    const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
    const isFormValid = name.trim() && email.trim() && passwordHasMinLength && passwordsMatch && acceptedTerms;

    return (
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full relative z-10"
            >
                <div className="text-center mb-6 sm:mb-10">
                    <div className="inline-flex items-center justify-center mb-4 sm:mb-6">
                        <img src={logo} alt="Logo de Kuxipilli" className="w-24 h-24 sm:w-40 sm:h-40 object-cover rounded-full" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
                        Únete a <span className="text-indigo-600 dark:text-indigo-400">Kuxipilli</span>
                    </h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400 font-medium italic">
                        Empieza a proteger a tu familia hoy mismo
                    </p>
                </div>

                <div className="bg-white dark:bg-[#161b22] p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 transition-colors">
                    <div className="flex justify-center mb-6 sm:mb-10 p-1.5 bg-gray-50 dark:bg-[#0a0c10] rounded-2xl border border-gray-100 dark:border-gray-800">
                        <Link
                            to="/iniciar-sesion"
                            className="flex-1 py-3 px-6 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-xl font-black text-xs uppercase tracking-widest text-center transition-colors"
                        >
                            Entrar
                        </Link>
                        <button className="flex-1 py-3 px-6 bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white rounded-xl shadow-sm font-black text-xs uppercase tracking-widest">
                            Registro
                        </button>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2 ml-1">
                                    Nombre Completo
                                </label>
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
                                <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2 ml-1">
                                    Correo Electrónico
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-[#0a0c10] border-2 border-gray-100 dark:border-gray-800 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-600 transition-all font-medium"
                                        placeholder="padre@ejemplo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onBlur={() => setEmail((prev) => prev.trim().toLowerCase())}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2 ml-1">
                                    Contraseña
                                </label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        className="w-full pl-12 pr-14 py-4 bg-gray-50 dark:bg-[#0a0c10] border-2 border-gray-100 dark:border-gray-800 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-600 transition-all font-medium"
                                        placeholder="Mínimo 8 caracteres"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                <p className={`mt-2 ml-1 text-[11px] font-semibold ${password.length === 0 ? 'text-gray-400 dark:text-gray-500' : passwordHasMinLength ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                    {passwordHasMinLength ? 'La contraseña cumple con el mínimo de 8 caracteres.' : 'Usa al menos 8 caracteres.'}
                                </p>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2 ml-1">
                                    Confirmar Contraseña
                                </label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        required
                                        className="w-full pl-12 pr-14 py-4 bg-gray-50 dark:bg-[#0a0c10] border-2 border-gray-100 dark:border-gray-800 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-600 transition-all font-medium"
                                        placeholder="Repite tu contraseña"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                        aria-label={showConfirmPassword ? 'Ocultar confirmación de contraseña' : 'Mostrar confirmación de contraseña'}
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                <p className={`mt-2 ml-1 text-[11px] font-semibold ${confirmPassword.length === 0 ? 'text-gray-400 dark:text-gray-500' : passwordsMatch ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                    {confirmPassword.length === 0 ? 'Confirma tu contraseña para evitar errores de captura.' : passwordsMatch ? 'Las contraseñas coinciden.' : 'Las contraseñas no coinciden.'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-2">
                            <button
                                type="button"
                                onClick={() => setAcceptedTerms(!acceptedTerms)}
                                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                                    acceptedTerms ? 'bg-indigo-600 border-indigo-600' : 'border-gray-200 dark:border-gray-800'
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
                                className="text-red-500 dark:text-red-400 text-xs font-bold text-center bg-red-500/5 py-3 rounded-xl border border-red-500/10 italic"
                            >
                                {error}
                            </motion.div>
                        )}

                        {success && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-indigo-600 dark:text-indigo-400 text-xs font-black text-center bg-indigo-500/5 py-4 px-4 rounded-2xl border border-indigo-500/10 flex items-center justify-center gap-2"
                            >
                                <Check className="w-4 h-4" />
                                {success}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !isFormValid}
                            className="w-full flex items-center justify-center gap-3 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-600/20 transition-all transform active:scale-95 disabled:opacity-50"
                        >
                            {loading ? 'Creando cuenta...' : (
                                <>
                                    Crear Mi Cuenta <UserPlus className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm italic">
                    ¿Ya proteges a tu familia?{' '}
                    <Link to="/iniciar-sesion" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
                        Iniciar Sesión
                    </Link>
                </p>
            </motion.div>

            <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
        </div>
    );
};

export default Register;

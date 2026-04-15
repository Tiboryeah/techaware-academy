import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import logo from '../assets/logo_v2.png';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            await api.put(`/api/auth/reset-password/${token}`, { password });
            setMessage('Contraseña actualizada exitosamente. Redirigiendo al login...');
            setTimeout(() => {
                navigate('/iniciar-sesion');
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al restablecer la contraseña. El enlace puede haber expirado.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full relative z-10"
            >
                <div className="text-center mb-6 sm:mb-10">
                    <img src={logo} alt="Logo de Kuxipilli" className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full mx-auto mb-3 sm:mb-4" />
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
                        Nueva Contraseña
                    </h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400 font-medium">
                        Ingresa tu nueva clave de acceso.
                    </p>
                </div>

                <div className="bg-white dark:bg-[#161b22] p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 transition-colors">
                    {!message ? (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2 ml-1">
                                    Nueva Contraseña
                                </label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        className="w-full pl-12 pr-14 py-4 bg-gray-50 dark:bg-[#0a0c10] border-2 border-gray-100 dark:border-gray-800 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-600 transition-all font-medium"
                                        placeholder="••••••••"
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
                                        placeholder="••••••••"
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
                            </div>

                            {error && (
                                <div className="text-red-500 dark:text-red-400 text-xs font-bold text-center bg-red-500/5 py-2 rounded-lg border border-red-500/10 italic">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-600/20 transition-all transform active:scale-95 disabled:opacity-50"
                            >
                                {loading ? 'Actualizando...' : (
                                    <>
                                        Restablecer Contraseña <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">¡Actualizado!</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">{message}</p>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default ResetPassword;

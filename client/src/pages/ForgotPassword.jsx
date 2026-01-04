import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, ArrowLeft, Key, Lock, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { ToastContext } from '../context/ToastContext';
import { useContext } from 'react';
import logo from '../assets/logo_v2.png';

const ForgotPassword = () => {
    const navigate = useNavigate();

    // Steps: 'request' (enter email) -> 'verify' (enter code & new pass) -> 'success'
    const [step, setStep] = useState('request');

    // Form Data
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // UI State
    const { addToast } = useContext(ToastContext);
    const [loading, setLoading] = useState(false);

    // STEP 1: Send Code
    const handleRequestCode = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/api/auth/forgot-password', { email });
            addToast('Código enviado a tu correo', 'info');
            setStep('verify');
        } catch (err) {
            addToast(err.response?.data?.message || 'Error al enviar el código. Verifica el correo.', 'error');
        } finally {
            setLoading(false);
        }
    };

    // STEP 2: Verify Code & Reset Password
    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            addToast('Las contraseñas no coinciden', 'error');
            return;
        }

        if (password.length < 6) {
            addToast('La contraseña debe tener al menos 6 caracteres', 'error');
            return;
        }

        setLoading(true);

        try {
            await api.post('/api/auth/reset-with-code', {
                email,
                code,
                newPassword: password
            });
            addToast('¡Contraseña restablecida correctamente!', 'success');
            setStep('success');
            // Optional: Auto redirect after few seconds
            setTimeout(() => {
                navigate('/login');
            }, 5000);
        } catch (err) {
            addToast(err.response?.data?.message || 'Código inválido o expirado.', 'error');
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
                {/* Header */}
                <div className="text-center mb-10">
                    <img src={logo} alt="TechAware Kids Logo" className="w-24 h-24 object-cover rounded-full mx-auto mb-4" />
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
                        Recuperar Acceso
                    </h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400 font-medium">
                        {step === 'request' && 'Ingresa tu correo para recibir un código.'}
                        {step === 'verify' && 'Revisa tu correo e ingresa el código.'}
                        {step === 'success' && '¡Contraseña restablecida!'}
                    </p>
                </div>

                <div className="bg-white dark:bg-[#161b22] p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 transition-colors">

                    {/* STEP 1: REQUEST CODE */}
                    {step === 'request' && (
                        <form className="space-y-6" onSubmit={handleRequestCode}>
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

                            {/* Error display removed for Toast */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-600/20 transition-all transform active:scale-95 disabled:opacity-50"
                            >
                                {loading ? 'Enviando...' : (
                                    <>Enviar Código <ArrowRight className="w-4 h-4" /></>
                                )}
                            </button>
                        </form>
                    )}

                    {/* STEP 2: VERIFY & RESET */}
                    {step === 'verify' && (
                        <form className="space-y-6" onSubmit={handleResetPassword}>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-4"
                            >
                                <div className="text-center mb-6">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 rounded-full text-xs font-bold">
                                        <Mail className="w-3 h-3" /> Enviado a {email}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2 ml-1">Código de 6 Dígitos</label>
                                    <div className="relative group">
                                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                        <input
                                            type="text"
                                            required
                                            maxLength="6"
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-[#0a0c10] border-2 border-gray-100 dark:border-gray-800 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-600 transition-all font-mono text-xl tracking-widest text-center"
                                            placeholder="000000"
                                            value={code}
                                            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2 ml-1">Nueva Contraseña</label>
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

                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2 ml-1">Confirmar Nueva</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                        <input
                                            type="password"
                                            required
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-[#0a0c10] border-2 border-gray-100 dark:border-gray-800 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-600 transition-all font-medium"
                                            placeholder="••••••••"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Error display handled by Toast */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-600/20 transition-all transform active:scale-95 disabled:opacity-50"
                            >
                                {loading ? 'Verificando...' : (
                                    <>Restablecer Contraseña <ArrowRight className="w-4 h-4" /></>
                                )}
                            </button>
                        </form>
                    )}

                    {/* STEP 3: SUCCESS */}
                    {step === 'success' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center space-y-6"
                        >
                            <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">¡Éxito!</h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Tu contraseña ha sido actualizada correctamente.
                                </p>
                            </div>
                            <Link
                                to="/login"
                                className="block w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-600/20 transition-all transform active:scale-95"
                            >
                                Iniciar Sesión Ahora
                            </Link>
                        </motion.div>
                    )}

                    <div className="mt-8 text-center border-t border-gray-100 dark:border-gray-800 pt-6">
                        {step === 'verify' ? (
                            <button onClick={() => setStep('request')} className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 font-bold text-xs uppercase tracking-widest transition-colors">
                                <ArrowLeft className="w-4 h-4" /> Cambiar Correo
                            </button>
                        ) : (
                            <Link to="/login" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 font-bold text-xs uppercase tracking-widest transition-colors">
                                <ArrowLeft className="w-4 h-4" /> Cancelar y Volver
                            </Link>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;

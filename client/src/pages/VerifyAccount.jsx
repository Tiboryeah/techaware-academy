import React, { useState } from 'react';
import { useNavigate, Link, useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2, ArrowRight, Mail, KeyRound, RefreshCw } from 'lucide-react';
import api from '../services/api';

const VerifyAccount = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Attempt to get email from navigation state (passed from Register page)
    const initialEmail = location.state?.email || '';

    const [email, setEmail] = useState(initialEmail);
    const [code, setCode] = useState(token || '');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');
    const [resendStatus, setResendStatus] = useState(''); // idle, loading, cooldown
    const [cooldown, setCooldown] = useState(0);
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedCode = code.trim();

    const handleVerify = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');
        try {
            const response = await api.post('/api/auth/verify', { email: normalizedEmail, code: normalizedCode });
            setStatus('success');
            setMessage(response.data.message || 'Cuenta verificada correctamente.');
        } catch (error) {
            setStatus('error');
            setMessage(error.response?.data?.message || 'Código incorrecto u ocurrido un error.');
        }
    };

    const handleResend = async () => {
        if (!normalizedEmail) {
            setMessage('Por favor, ingresa tu correo para reenviar el código.');
            setStatus('error');
            return;
        }

        setResendStatus('loading');
        try {
            await api.post('/api/auth/resend-verification', { email: normalizedEmail });
            setMessage('Nuevo código enviado. Revisa tu bandeja de entrada.');
            setStatus('idle'); // Reset main error state to show success message

            // Start 30 second cooldown
            setCooldown(30);
            setResendStatus('cooldown');

            const timer = setInterval(() => {
                setCooldown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setResendStatus('idle');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

        } catch (error) {
            setMessage(error.response?.data?.message || 'Error al reenviar el código.');
            setStatus('error');
            setResendStatus('idle');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#161b22] p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-gray-800 max-w-lg w-full text-center"
            >
                {status === 'success' ? (
                    <div className="space-y-6">
                        <div className="relative w-24 h-24 mx-auto">
                            <div className="absolute inset-0 bg-green-500 blur-xl opacity-20 rounded-full animate-pulse" />
                            <div className="relative bg-white dark:bg-[#0a0c10] border-4 border-green-500 rounded-full w-full h-full flex items-center justify-center">
                                <CheckCircle2 className="w-12 h-12 text-green-500" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">¡Identidad Confirmada!</h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                            Tu cuenta ha sido verificada con éxito. Ya estás listo para comenzar tu camino como Guardián Digital.
                        </p>
                        <button
                            onClick={() => navigate('/iniciar-sesion')}
                            className="mt-6 w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-indigo-500/20 active:scale-95"
                        >
                            Acceder a mi cuenta <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="w-16 h-16 bg-indigo-500/10 text-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <KeyRound className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">Activa tu Cuenta</h2>
                        <p className="text-gray-500 dark:text-gray-400 italic text-sm">
                            Introduce el código de 6 dígitos que enviamos a tu correo electrónico.
                        </p>

                        <form onSubmit={handleVerify} className="space-y-5 text-left">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 ml-1">Correo Electrónico</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onBlur={() => setEmail((prev) => prev.trim().toLowerCase())}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-[#0a0c10] border-2 border-gray-100 dark:border-gray-800 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-600 transition-all font-medium"
                                        placeholder="padre@ejemplo.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 ml-1">Código de 6 dígitos</label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        required
                                        maxLength="6"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                                        className="w-full px-4 py-4 text-center tracking-[1em] text-2xl font-monospace bg-gray-50 dark:bg-[#0a0c10] border-2 border-gray-100 dark:border-gray-800 rounded-2xl text-gray-900 dark:text-white placeholder-gray-300 focus:outline-none focus:border-indigo-600 transition-all font-bold"
                                        placeholder="000000"
                                    />
                                </div>
                            </div>

                            {message && (
                                <p className={`text-xs font-bold text-center p-3 rounded-xl ${status === 'error' ? 'text-red-500 bg-red-500/10' : 'text-indigo-500 bg-indigo-500/10'}`}>
                                    {message}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'loading' || normalizedCode.length !== 6 || !normalizedEmail}
                                className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-95 disabled:opacity-50 flex justify-center items-center gap-2"
                            >
                                {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verificar Código'}
                            </button>
                        </form>

                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={resendStatus !== 'idle'}
                                className={`text-xs font-bold flex items-center justify-center gap-2 mx-auto transition-colors ${resendStatus === 'cooldown'
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400'
                                    }`}
                            >
                                {resendStatus === 'loading' ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                    <RefreshCw className={`w-3.5 h-3.5 ${resendStatus === 'cooldown' ? '' : 'animate-none'}`} />
                                )}

                                {resendStatus === 'cooldown' ? `Reenviar disponible en ${cooldown}s` : 'Obtener nuevo código'}
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default VerifyAccount;

import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Home, Mail, Search, ShieldAlert } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const NotFound = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    const primaryLink = user
        ? { to: '/panel', label: 'Ir a mi panel', icon: Home }
        : { to: '/', label: 'Volver al inicio', icon: Home };

    const secondaryLinks = user
        ? [
            { to: '/cursos', label: 'Explorar cursos', icon: BookOpen },
            { to: '/contactanos', label: 'Contáctanos', icon: Mail },
        ]
        : [
            { to: '/iniciar-sesion', label: 'Iniciar sesión', icon: ArrowRight },
            { to: '/contactanos', label: 'Contáctanos', icon: Mail },
        ];

    const PrimaryIcon = primaryLink.icon;

    return (
        <div className="relative min-h-[calc(100vh-10rem)] overflow-hidden bg-[#fafafb] dark:bg-[#0a0c10] transition-colors duration-500">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 left-[-10%] h-[28rem] w-[28rem] rounded-full bg-indigo-500/10 blur-[120px]" />
                <div className="absolute bottom-[-8rem] right-[-8%] h-[24rem] w-[24rem] rounded-full bg-cyan-500/10 blur-[120px]" />
                <div className="absolute inset-x-0 top-20 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
            </div>

            <div className="relative max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-[3rem] border border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-[#161b22]/90 backdrop-blur-xl shadow-2xl overflow-hidden"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
                        <div className="p-8 sm:p-12 lg:p-14 space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 dark:border-indigo-500/20 bg-indigo-50 dark:bg-indigo-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                                <Search className="w-3.5 h-3.5" /> Enlace no encontrado
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-end gap-3">
                                    <span className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tighter text-gray-900 dark:text-white leading-none">
                                        404
                                    </span>
                                    <span className="mb-3 rounded-2xl border border-red-200/70 dark:border-red-500/20 bg-red-50 dark:bg-red-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-600 dark:text-red-300">
                                        Ruta inválida
                                    </span>
                                </div>

                                <h1 className="max-w-2xl text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-gray-900 dark:text-white leading-tight">
                                    La página que buscas no está disponible en Kuxipilli.
                                </h1>
                                <p className="max-w-2xl text-base sm:text-lg italic text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Puede que el enlace esté incompleto, haya cambiado o simplemente no exista.
                                    Te dejamos una ruta rápida para volver a un espacio útil.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Link
                                    to={primaryLink.to}
                                    className="group inline-flex items-center justify-center gap-3 rounded-[1.75rem] bg-indigo-600 px-6 py-5 text-xs font-black uppercase tracking-[0.2em] text-white shadow-2xl shadow-indigo-600/25 transition-all hover:bg-indigo-700"
                                >
                                    <PrimaryIcon className="w-4 h-4" />
                                    {primaryLink.label}
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>

                                {secondaryLinks.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.to}
                                            to={item.to}
                                            className="inline-flex items-center justify-center gap-3 rounded-[1.75rem] border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0a0c10] px-6 py-5 text-xs font-black uppercase tracking-[0.2em] text-gray-700 dark:text-gray-200 transition-all hover:border-indigo-400/40 hover:text-indigo-600 dark:hover:text-indigo-300"
                                        >
                                            <Icon className="w-4 h-4" />
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="relative border-t lg:border-t-0 lg:border-l border-gray-100 dark:border-gray-800 bg-[#f6f8ff] dark:bg-[#10141c] p-8 sm:p-12 lg:p-14">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 dark:border-indigo-500/20 bg-white/80 dark:bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">
                                    <ShieldAlert className="w-3.5 h-3.5" /> Ayuda para retomar
                                </div>

                                <div className="rounded-[2rem] border border-white/70 dark:border-white/5 bg-white/80 dark:bg-[#161b22] p-6 shadow-xl">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                                        Ruta solicitada
                                    </p>
                                    <p className="mt-3 break-all rounded-2xl bg-gray-50 dark:bg-[#0a0c10] px-4 py-4 text-sm font-bold text-gray-700 dark:text-gray-200">
                                        {location.pathname}
                                    </p>
                                </div>

                                <div className="grid gap-4">
                                    {[
                                        'Revisa si falta una letra en la dirección.',
                                        'Si venías desde un marcador viejo, vuelve a navegar desde el menú.',
                                        'Si el problema persiste, puedes escribirnos desde Contáctanos.',
                                    ].map((tip) => (
                                        <div
                                            key={tip}
                                            className="flex items-start gap-3 rounded-[1.75rem] border border-white/70 dark:border-white/5 bg-white/70 dark:bg-white/5 px-5 py-4"
                                        >
                                            <div className="mt-1 h-2.5 w-2.5 rounded-full bg-indigo-500" />
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{tip}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default NotFound;

import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    BadgeDollarSign,
    BookOpen,
    Clock,
    HeartPulse,
    LockKeyhole,
    MessageCircleWarning,
    ShieldCheck,
    SlidersHorizontal,
    UserCheck
} from 'lucide-react';

const GamesPlatformIcons = () => (
    <div className="flex items-center gap-1.5" aria-hidden="true">
        <svg className="w-4.5 h-4.5 text-slate-100" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.38 2.5 21.5 6.38 17.62 21.5 2.5 17.62 6.38 2.5Zm4.43 7.06-1.25 4.87 4.87 1.25 1.25-4.87-4.87-1.25Z" />
        </svg>
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" fill="#7a4a25" />
            <rect x="3" y="3" width="18" height="7" rx="2" fill="#4ade80" />
            <rect x="6" y="11" width="3" height="3" fill="#1f2937" />
            <rect x="15" y="11" width="3" height="3" fill="#1f2937" />
            <rect x="10.5" y="15" width="3" height="3" fill="#1f2937" />
            <rect x="7.5" y="18" width="3" height="3" fill="#1f2937" />
            <rect x="13.5" y="18" width="3" height="3" fill="#1f2937" />
        </svg>
    </div>
);

const SocialPlatformIcons = () => (
    <div className="flex items-center gap-1.5" aria-hidden="true">
        <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.6 5.82c1.2.88 2.64 1.39 4.17 1.44v3.2a8.3 8.3 0 0 1-4.08-1.05v5.9c0 3.73-2.76 6.36-6.35 6.36-3.33 0-6.1-2.37-6.1-5.82 0-3.57 2.86-5.97 6.35-5.97.39 0 .77.04 1.14.12v3.43a3.44 3.44 0 0 0-1.23-.22c-1.55 0-2.75 1.02-2.75 2.5 0 1.43 1.14 2.43 2.6 2.43 1.57 0 2.72-.97 2.72-2.94V2.33h3.53v3.49Z" />
        </svg>
        <svg className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.32 4.37A19.8 19.8 0 0 0 15.36 2.8l-.24.48c1.78.42 3.1 1.05 4.36 1.9a15.5 15.5 0 0 0-5.42-1.67 16.5 16.5 0 0 0-4.12 0 15.5 15.5 0 0 0-5.42 1.67 13.9 13.9 0 0 1 4.36-1.9l-.24-.48a19.8 19.8 0 0 0-4.96 1.57C.54 9.06-.33 13.62.1 18.1a20 20 0 0 0 6.08 3.08l.75-1.6a12.7 12.7 0 0 1-1.92-.92l.47-.36a14.2 14.2 0 0 0 13.04 0l.47.36c-.6.36-1.24.67-1.92.92l.75 1.6a20 20 0 0 0 6.08-3.08c.5-5.18-.85-9.7-3.58-13.73ZM8.02 15.33c-1.17 0-2.13-1.08-2.13-2.4s.94-2.4 2.13-2.4c1.2 0 2.16 1.09 2.13 2.4 0 1.32-.94 2.4-2.13 2.4Zm7.96 0c-1.17 0-2.13-1.08-2.13-2.4s.94-2.4 2.13-2.4c1.2 0 2.16 1.09 2.13 2.4 0 1.32-.94 2.4-2.13 2.4Z" />
        </svg>
        <svg className="w-4 h-4 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="16" height="16" x="4" y="4" rx="4" />
            <circle cx="12" cy="12" r="3.2" />
            <circle cx="17" cy="7" r=".6" fill="currentColor" stroke="none" />
        </svg>
    </div>
);

const StreamingPlatformIcons = () => (
    <div className="flex items-center gap-1.5" aria-hidden="true">
        <svg className="w-4.5 h-4.5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.58 7.19a2.77 2.77 0 0 0-1.95-1.96C17.91 4.77 12 4.77 12 4.77s-5.91 0-7.63.46a2.77 2.77 0 0 0-1.95 1.96A28.9 28.9 0 0 0 1.96 12c0 1.67.16 3.33.46 4.81a2.77 2.77 0 0 0 1.95 1.96c1.72.46 7.63.46 7.63.46s5.91 0 7.63-.46a2.77 2.77 0 0 0 1.95-1.96c.3-1.48.46-3.14.46-4.81s-.16-3.33-.46-4.81ZM10 15.27V8.73L15.67 12 10 15.27Z" />
        </svg>
        <svg className="w-4.5 h-4.5 text-purple-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.75 2.5 3.25 6.25v14h5v2.5h2.75l2.5-2.5h3.75l4.5-4.5V2.5h-17Zm15 12.25-2.5 2.5h-4.5l-2.5 2.5v-2.5h-4V4.5h13.5v10.25ZM15.5 8h2v5.5h-2V8Zm-5.5 0h2v5.5h-2V8Z" />
        </svg>
    </div>
);

const Modules = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await api.get('/api/content/courses');
                setCourses(data);
            } catch (err) {
                setError('Error al cargar los cursos. Inténtalo más tarde.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const getCourseTheme = (category) => {
        switch (category?.toLowerCase()) {
            case 'videojuegos':
                return {
                    icon: <GamesPlatformIcons />,
                    gradient: 'from-purple-600 to-cyan-500',
                    image: '/images/gaming.png',
                    accent: 'text-cyan-600 dark:text-cyan-400',
                    bgAccent: 'bg-cyan-500/10',
                    highlights: [
                        { icon: <LockKeyhole className="w-3.5 h-3.5" />, label: 'Configurar seguridad, privacidad y controles parentales' },
                        { icon: <BadgeDollarSign className="w-3.5 h-3.5" />, label: 'Prevenir compras no autorizadas, fraudes y contactos riesgosos' }
                    ]
                };
            case 'redes sociales':
                return {
                    icon: <SocialPlatformIcons />,
                    gradient: 'from-pink-600 to-blue-500',
                    image: '/images/social.png',
                    accent: 'text-pink-600 dark:text-pink-400',
                    bgAccent: 'bg-pink-500/10',
                    highlights: [
                        { icon: <UserCheck className="w-3.5 h-3.5" />, label: 'Gestionar privacidad, mensajes y huella digital' },
                        { icon: <MessageCircleWarning className="w-3.5 h-3.5" />, label: 'Reconocer ciberacoso, grooming, retos y presión social' }
                    ]
                };
            case 'streaming':
                return {
                    icon: <StreamingPlatformIcons />,
                    gradient: 'from-red-600 to-indigo-500',
                    image: '/images/streaming.png',
                    accent: 'text-red-600 dark:text-red-400',
                    bgAccent: 'bg-red-500/10',
                    highlights: [
                        { icon: <SlidersHorizontal className="w-3.5 h-3.5" />, label: 'Ajustar experiencias seguras en YouTube y Twitch' },
                        { icon: <HeartPulse className="w-3.5 h-3.5" />, label: 'Identificar publicidad, donaciones y contenido que afecta el bienestar' }
                    ]
                };
            default:
                return {
                    icon: <BookOpen className="w-6 h-6" />,
                    gradient: 'from-blue-600 to-indigo-500',
                    image: '/images/gaming.png',
                    accent: 'text-blue-600 dark:text-blue-400',
                    bgAccent: 'bg-blue-500/10',
                    highlights: [
                        { icon: <ShieldCheck className="w-3.5 h-3.5" />, label: 'Aprendizaje guiado para proteger mejor el entorno digital' }
                    ]
                };
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#fafafb] dark:bg-[#0a0c10]">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"
            />
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-[#fafafb] dark:bg-[#0a0c10]">
            <div className="text-center p-8 bg-red-500/10 border border-red-500/20 rounded-2xl">
                <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] text-gray-900 dark:text-gray-100 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8 sm:mb-16"
                >
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white transition-colors">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                            Cursos de Aprendizaje
                        </span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto italic">
                        Domina las herramientas necesarias para un entorno digital seguro y saludable.
                    </p>
                </motion.div>

                {courses.length === 0 ? (
                    <p className="text-center text-gray-500">No hay cursos disponibles en este momento.</p>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8">
                        <AnimatePresence>
                            {courses.map((course, index) => {
                                const theme = getCourseTheme(course.category);
                                return (
                                    <motion.div
                                        key={course._id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -10 }}
                                        className="group relative bg-white dark:bg-[#161b22] rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-gray-700 transition-all duration-500 shadow-xl dark:shadow-2xl flex flex-col h-full"
                                    >
                                        {/* Image Section */}
                                        <div className="relative h-56 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#161b22] to-transparent z-10" />
                                            <motion.img
                                                src={theme.image}
                                                alt={course.title}
                                                className="w-full h-full object-cover object-[50%_14%] group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className={`absolute top-4 left-4 z-20 p-2 rounded-xl bg-white/60 dark:bg-black/40 backdrop-blur-md border border-gray-100 dark:border-white/10 ${theme.accent}`}>
                                                {theme.icon}
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-5 sm:p-8 flex flex-col flex-grow">
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${theme.bgAccent} ${theme.accent}`}>
                                                    {course.category}
                                                </span>
                                                <div className="flex -space-x-2">
                                                    {course.platforms?.map((p, i) => (
                                                        <div key={i} className="w-6 h-6 rounded-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[8px] font-bold text-gray-500 dark:text-gray-400 shadow-sm">
                                                            {p[0]}
                                                        </div>
                                                    ))}
                                                </div>
                                                {course.duration && (
                                                    <div className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-widest border border-gray-200/50 dark:border-gray-700/50">
                                                        <Clock className="w-3 h-3 text-indigo-500" /> {course.duration}
                                                    </div>
                                                )}
                                            </div>

                                            <h2 className="text-2xl font-black mb-4 leading-tight text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-white transition-colors">
                                                {course.title}
                                            </h2>

                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 sm:mb-8 line-clamp-3 leading-relaxed italic">
                                                {course.description}
                                            </p>

                                            <div className="space-y-3.5 mb-5 sm:mb-8">
                                                {(theme.highlights || []).map((item, i) => (
                                                    <div key={i} className="flex items-start gap-2.5 text-xs text-gray-500 dark:text-gray-400">
                                                        <span className={`mt-0.5 shrink-0 ${theme.accent}`}>
                                                            {item.icon}
                                                        </span>
                                                        <span className="font-medium leading-relaxed">{item.label}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <Link
                                                to={`/cursos/${course._id}`}
                                                className={`mt-auto relative inline-flex items-center justify-center w-full px-6 py-4 font-black text-xs uppercase tracking-widest text-white transition-all duration-300 bg-gradient-to-r ${theme.gradient} rounded-2xl group shadow-lg shadow-indigo-600/20 active:scale-95`}
                                            >
                                                <span className="relative flex items-center gap-2">
                                                    Empezar Curso <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </span>
                                            </Link>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modules;

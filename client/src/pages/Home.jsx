import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../services/api';
import { API_BASE_URL } from '../constants';
import { motion } from 'framer-motion';
import {
    Shield,
    Lock,
    Eye,
    ArrowRight,
    Play,
    BookOpen,
    Clock,
    CheckCircle,
    Youtube,
    Users,
    Award,
    Zap,
    Target,
    BarChart3,
    ShieldCheck,
    MessageSquare,
    Search
} from 'lucide-react';

const Home = () => {
    const { user } = useContext(AuthContext);
    const [progress, setProgress] = useState({ completed: 0, total: 0 });
    const [nextItem, setNextItem] = useState(null);
    const [loadingNext, setLoadingNext] = useState(true);

    useEffect(() => {
        if (user) {
            api.get('/api/progress/summary/all')
                .then(res => {
                    if (res.data) {
                        const { completedLessons, totalLessons } = res.data;
                        setProgress({ completed: completedLessons || 0, total: totalLessons || 0 });
                    }
                })
                .catch(err => console.error("Error fetching progress:", err));

            api.get('/api/progress/next-step')
                .then(res => {
                    setNextItem(res.data);
                })
                .catch(err => console.error("Error fetching next item:", err))
                .finally(() => setLoadingNext(false));
        } else {
            setLoadingNext(false);
        }
    }, [user]);

    const percentage = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;

    // Authenticated Home View
    if (user) {
        let continueLink = "/modules";
        let continueText = "Continuar Aprendiendo";

        if (loadingNext) {
            continueText = "Cargando...";
        } else if (nextItem) {
            if (nextItem.type === 'lesson') {
                continueLink = `/lessons/${nextItem.id}`;
                continueText = `Continuar: ${nextItem.title}`;
            } else if (nextItem.type === 'quiz') {
                continueLink = `/quiz/${nextItem.id}`;
                continueText = `Examen: ${nextItem.title}`;
            } else if (nextItem.type === 'complete') {
                continueText = "¡Curso Completado!";
            }
        }

        return (
            <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-20">
                    {/* Hero / Progress Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="relative bg-white dark:bg-[#161b22] rounded-[3.5rem] p-12 shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-all group"
                    >
                        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 blur-[100px] -mr-40 -mt-40 transition-all group-hover:bg-indigo-500/15" />
                        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                            {/* Pro Avatar */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex-shrink-0 relative group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />
                                <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-[2.5rem] rotate-3 group-hover:rotate-0 transition-all duration-500 border-[6px] border-white dark:border-[#0a0c10] shadow-2xl overflow-hidden bg-white dark:bg-gray-800">
                                    {user.avatar ? (
                                        <img
                                            src={(user.avatar.startsWith('http') || user.avatar.startsWith('data:')) ? user.avatar : `${API_BASE_URL}${user.avatar}`}
                                            alt="Profile"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/50 text-5xl font-black text-indigo-500 dark:text-indigo-300 uppercase">
                                            {user.name?.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-white dark:bg-[#0a0c10] p-1.5 rounded-full">
                                    <div className="w-6 h-6 bg-green-500 rounded-full animate-pulse ring-4 ring-green-500/30" />
                                </div>
                            </motion.div>

                            <div className="flex-grow space-y-8 text-center lg:text-left">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                                        <Award className="w-3 h-3" /> Panel de Control
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight tracking-tighter">
                                        Bienvenido Pro, {user?.name ? user.name.split(' ')[0] : 'Usuario'}<br />
                                        <span className="text-indigo-600 dark:text-indigo-400">Tu blindaje avanza.</span>
                                    </h2>
                                </div>
                                <div className="space-y-4 max-w-xl mx-auto lg:mx-0">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                                        <span>Indice de Protección</span>
                                        <span className="text-indigo-600 dark:text-indigo-400">{percentage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-5 p-1 border border-gray-200 dark:border-gray-700">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percentage}%` }}
                                            transition={{ duration: 1.5, ease: "circOut" }}
                                            className="bg-indigo-600 h-full rounded-full shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                                        />
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center justify-center lg:justify-start gap-3 italic">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        Progreso: <span className="font-bold text-gray-900 dark:text-white">{progress.completed}</span> de {progress.total} lecciones dominadas.
                                    </p>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <Link
                                    to={continueLink}
                                    className="px-12 py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-[2rem] shadow-2xl shadow-indigo-600/30 transition-all flex items-center gap-4 active:scale-95 group"
                                >
                                    <Play className="w-4 h-4 fill-current group-hover:rotate-12 transition-transform" />
                                    {continueText}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Access Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <BarChart3 className="text-blue-500" />, title: "Mi Panel", desc: "Ver estadísticas detalladas de seguridad.", link: "/dashboard" },
                            { icon: <Target className="text-purple-500" />, title: "Explorar Cursos", desc: "Aprende nuevas técnicas de protección.", link: "/modules" },
                            { icon: <ShieldCheck className="text-indigo-500" />, title: "Casos Reales", desc: "Analiza incidentes cibernéticos verídicos.", link: "/cases" }
                        ].map((card, i) => (
                            <Link key={i} to={card.link}>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="p-8 bg-white dark:bg-[#161b22] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl hover:border-indigo-500/20 transition-all flex flex-col gap-4"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                                        {card.icon}
                                    </div>
                                    <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">{card.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">{card.desc}</p>
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                    {/* Multimedia Section */}
                    <div className="space-y-12">
                        <div className="flex items-center gap-4">
                            <div className="h-1 w-12 bg-indigo-600 rounded-full" />
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Educación Multimedia</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {[
                                { id: '4-V7vXkHkf0', title: 'Cómo ACTIVAR los CONTROLES PARENTALES en Roblox (2025)', channel: 'Resuelve En Un Click', time: '3min' },
                                { id: '6NB8NAFwis4', title: '¡Cuida tus hijos de internet! - MICROSOFT FAMILY SAFETY-', channel: 'Entorno Simple', time: '4 min' },
                                { id: 'tuoHAYJdetw', title: '¿Cómo CONFIGURAR YouTube PARA NIÑOS?', channel: 'Cómo hacer', time: '5 min' }
                            ].map((video, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * idx }}
                                    className="group bg-white dark:bg-[#161b22] rounded-[3rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-2xl transition-all hover:border-indigo-500/30"
                                >
                                    <div className="relative aspect-video">
                                        <iframe
                                            className="w-full h-full object-cover"
                                            src={`https://www.youtube.com/embed/${video.id}`}
                                            title={video.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <div className="bg-indigo-600 px-3 py-1 rounded-full text-[8px] font-black text-white uppercase tracking-widest shadow-lg">Featured</div>
                                        </div>
                                        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-white flex items-center gap-2 border border-white/10">
                                            <Clock className="w-3 h-3 text-indigo-400" /> {video.time}
                                        </div>
                                    </div>
                                    <div className="p-8 space-y-4">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight min-h-[3rem] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{video.title}</h3>
                                        <div className="flex items-center gap-3 text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-widest border-t border-gray-100 dark:border-gray-800 pt-6">
                                            <div className="p-2 bg-red-500/10 text-red-500 rounded-lg">
                                                <Youtube className="w-4 h-4" />
                                            </div>
                                            {video.channel}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Unauthenticated Landing Page
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#fafafb] dark:bg-[#0a0c10] transition-colors duration-500 pb-32">
            {/* Ambient Lighting FX */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[150px] opacity-50" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[150px] opacity-50" />
            </div>

            {/* Hero Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 sm:px-6 lg:px-8">
                <div className="text-center space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 px-8 py-2.5 rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-black text-[10px] tracking-[0.3em] uppercase shadow-lg shadow-indigo-500/5"
                    >
                        <ShieldCheck className="w-4 h-4" /> Inteligencia Digital para Familias
                    </motion.div>

                    <div className="space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className="text-7xl md:text-[10rem] font-black tracking-tighter text-gray-900 dark:text-white leading-[0.75]"
                        >
                            TechAware<br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-800 via-indigo-600 to-indigo-400 dark:from-indigo-600 dark:via-indigo-400 dark:to-indigo-200">
                                Academy
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-12 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400 leading-relaxed italic font-medium"
                        >
                            La primera plataforma profesional diseñada para convertir a padres y educadores en expertos en ciberseguridad infantil.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-16 flex flex-col sm:flex-row justify-center gap-8"
                    >
                        <Link to="/register" className="px-16 py-6 bg-indigo-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-[2rem] shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:bg-indigo-700 hover:-translate-y-2 transition-all active:scale-95">
                            Comenzar Ahora
                        </Link>
                        <Link to="/modules" className="px-16 py-6 bg-white dark:bg-[#161b22] text-gray-900 dark:text-white font-black text-xs uppercase tracking-[0.2em] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl hover:-translate-y-2 transition-all active:scale-95">
                            Ver Programas
                        </Link>
                    </motion.div>
                </div>

                {/* Trust Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-40 grid grid-cols-2 lg:grid-cols-4 gap-8 py-16 px-12 bg-white/50 dark:bg-[#161b22]/50 backdrop-blur-xl rounded-[4rem] border border-white/20 dark:border-gray-800 shadow-2xl"
                >
                    {[
                        { label: "Familias Protegidas", val: "1,200+", icon: <Users className="w-5 h-5" /> },
                        { label: "Casos Analizados", val: "500+", icon: <Search className="w-5 h-5" /> },
                        { label: "Modulos Expertos", val: "24", icon: <Zap className="w-5 h-5" /> },
                        { label: "Indice de Satisfacción", val: "99%", icon: <Award className="w-5 h-5" /> }
                    ].map((stat, i) => (
                        <div key={i} className="text-center space-y-2 group">
                            <div className="mx-auto w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 transition-transform group-hover:scale-110">
                                {stat.icon}
                            </div>
                            <div className="text-3xl font-black text-gray-900 dark:text-white tabular-nums tracking-tighter">{stat.val}</div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Main Pillars */}
                <div className="mt-40 space-y-24">
                    <div className="text-center space-y-4">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">Metodología TechAware</h2>
                        <h3 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">Los tres pilares del blindaje digital</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: <Play className="w-10 h-10 text-indigo-500" />,
                                title: 'Educación Proactiva',
                                desc: 'Entrenamiento basado en escenarios reales para anticipar riesgos antes de que ocurran.',
                                accent: "border-indigo-500/20"
                            },
                            {
                                icon: <BarChart3 className="w-10 h-10 text-purple-500" />,
                                title: 'Análisis de Riesgo',
                                desc: 'Herramientas de diagnóstico avanzadas para entender el nivel de exposición de tus hijos.',
                                accent: "border-purple-500/20"
                            },
                            {
                                icon: <ShieldCheck className="w-10 h-10 text-cyan-500" />,
                                title: 'Acción Inmediata',
                                desc: 'Guías paso a paso para configurar dispositivos y responder ante incidentes digitales.',
                                accent: "border-cyan-500/20"
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: (i * 0.1) }}
                                className={`bg-white dark:bg-[#161b22] p-12 rounded-[3.5rem] shadow-2xl border ${feature.accent} group hover:-translate-y-4 transition-all duration-500`}
                            >
                                <div className="mb-10 p-6 bg-gray-50 dark:bg-gray-800 w-fit rounded-[2rem] group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 shadow-xl group-hover:rotate-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight">{feature.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed italic font-medium">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Final Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-40 p-20 bg-gradient-to-br from-indigo-700 to-indigo-900 rounded-[5rem] text-center text-white space-y-10 shadow-[0_50px_100px_-20px_rgba(79,70,229,0.5)] relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-20 opacity-10 group-hover:scale-125 transition-transform duration-[2s]">
                        <Shield className="w-96 h-96 rotate-12" />
                    </div>
                    <div className="mx-auto w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center backdrop-blur-xl border border-white/20">
                        <MessageSquare className="w-10 h-10" />
                    </div>
                    <div className="space-y-6 max-w-2xl mx-auto relative z-10">
                        <h2 className="text-5xl font-black tracking-tighter leading-none">¿Líder en seguridad familiar?</h2>
                        <p className="text-indigo-100/70 text-xl italic font-medium">Únete a la comunidad de padres proactivos y comienza a proteger el futuro hoy mismo.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
                        <Link to="/register" className="px-16 py-6 bg-white text-indigo-700 font-black text-xs uppercase tracking-[0.2em] rounded-[2rem] hover:scale-105 transition-all shadow-2xl active:scale-95">
                            Obtener Acceso
                        </Link>
                    </div>
                </motion.div>

                {/* Small Footer Signature */}
                <div className="mt-24 pt-12 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-8 opacity-50">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-indigo-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">TechAware Systems v2.4</span>
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">Educating for an open and safe web.</div>
                </div>
            </div>
        </div>
    );
};

export default Home;

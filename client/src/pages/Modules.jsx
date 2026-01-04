import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Share2, Youtube, ArrowRight, Zap, Target, BookOpen } from 'lucide-react';

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
                    icon: <Shield className="w-6 h-6" />,
                    gradient: 'from-purple-600 to-cyan-500',
                    image: '/images/gaming.png',
                    accent: 'text-cyan-600 dark:text-cyan-400',
                    bgAccent: 'bg-cyan-500/10'
                };
            case 'redes sociales':
                return {
                    icon: <Share2 className="w-6 h-6" />,
                    gradient: 'from-pink-600 to-blue-500',
                    image: '/images/social.png',
                    accent: 'text-pink-600 dark:text-pink-400',
                    bgAccent: 'bg-pink-500/10'
                };
            case 'streaming':
                return {
                    icon: <Youtube className="w-6 h-6" />,
                    gradient: 'from-red-600 to-indigo-500',
                    image: '/images/streaming.png',
                    accent: 'text-red-600 dark:text-red-400',
                    bgAccent: 'bg-red-500/10'
                };
            default:
                return {
                    icon: <BookOpen className="w-6 h-6" />,
                    gradient: 'from-blue-600 to-indigo-500',
                    image: '/images/gaming.png',
                    accent: 'text-blue-600 dark:text-blue-400',
                    bgAccent: 'bg-blue-500/10'
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
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] text-gray-900 dark:text-gray-100 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white transition-colors">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                            Cursos de Especialidad
                        </span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto italic">
                        Domina las herramientas necesarias para un entorno digital seguro y saludable.
                    </p>
                </motion.div>

                {courses.length === 0 ? (
                    <p className="text-center text-gray-500">No hay cursos disponibles en este momento.</p>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                                                className="w-full h-full object-cover object-[50%_15%] group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className={`absolute top-4 left-4 z-20 p-2 rounded-xl bg-white/60 dark:bg-black/40 backdrop-blur-md border border-gray-100 dark:border-white/10 ${theme.accent}`}>
                                                {theme.icon}
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-8 flex flex-col flex-grow">
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
                                            </div>

                                            <h2 className="text-2xl font-black mb-4 leading-tight text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-white transition-colors">
                                                {course.title}
                                            </h2>

                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 line-clamp-3 leading-relaxed italic">
                                                {course.description}
                                            </p>

                                            <div className="space-y-4 mb-8">
                                                {course.riskAreas?.slice(0, 2).map((area, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                        <Zap className="w-3 h-3 text-yellow-600 dark:text-yellow-500" />
                                                        <span className="font-medium">{area}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <Link
                                                to={`/courses/${course._id}`}
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

import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle, Lock, Play, FileText, Trophy, ShieldCheck, Zap, ArrowLeft } from 'lucide-react';

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [course, setCourse] = useState(null);
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProgress = async () => {
        try {
            const { data: progressData } = await api.get(`/api/progress/course/${id}`);
            setProgress(progressData);
        } catch (err) {
            setProgress({ completedModules: [], completedLessons: [], isCourseCompleted: false });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: courseData } = await api.get(`/api/content/courses/${id}`);
                setCourse(courseData);
                await fetchProgress();
            } catch (error) {
                console.error("Error fetching course:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        const onFocus = () => {
            fetchProgress();
        };
        window.addEventListener('focus', onFocus);
        return () => window.removeEventListener('focus', onFocus);
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#fafafb] dark:bg-[#0a0c10]">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full" />
        </div>
    );
    if (!course) return <div className="text-center py-20 dark:text-white">Curso no encontrado.</div>;

    const allModulesCompleted = course.modules.every(m => progress?.completedModules.includes(m._id));
    const isAdmin = user?.role === 'admin';

    return (
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] text-[#1a1a1a] dark:text-gray-100 pb-20 transition-colors duration-500">
            {/* Header / Hero */}
            <div className="relative h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/20 to-transparent dark:to-[#0a0c10] z-10" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 dark:opacity-20" />

                <div className="relative z-20 max-w-7xl mx-auto px-4 h-full flex flex-col justify-end pb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-6"
                    >
                        <Link to="/modules" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors uppercase tracking-widest">
                            <ArrowLeft className="w-4 h-4" /> Volver a cursos
                        </Link>
                    </motion.div>

                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <div className="space-y-4 max-w-3xl">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-5xl font-black leading-tight text-gray-900 dark:text-white"
                            >
                                {course.title}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed italic"
                            >
                                {course.description}
                            </motion.p>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {course.riskAreas.map((area, idx) => (
                                    <span key={idx} className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-wider">
                                        {area}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <AnimatePresence>
                            {progress?.isCourseCompleted && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-3xl flex items-center gap-4 shadow-2xl shadow-yellow-500/10"
                                >
                                    <div className="p-3 bg-yellow-500 rounded-2xl shadow-lg shadow-yellow-500/30">
                                        <Trophy className="w-8 h-8 text-black" />
                                    </div>
                                    <div>
                                        <p className="text-yellow-600 dark:text-yellow-500 font-black text-xl uppercase tracking-tighter leading-tight">Curso Acreditado</p>
                                        <p className="text-yellow-600/70 dark:text-yellow-500/70 text-xs font-bold font-serif italic">Maestría Digital Alcanzada</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-8">
                    <h2 className="text-2xl font-black uppercase tracking-widest text-[#1a1a1a] dark:text-white flex items-center gap-3">
                        <Zap className="w-6 h-6 text-yellow-500" /> Plan de Estudios
                    </h2>

                    <div className="space-y-6">
                        {course.modules && course.modules.map((module, index) => {
                            const isModuleCompleted = progress?.completedModules.includes(module._id);

                            return (
                                <motion.div
                                    key={module._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className={`group bg-white dark:bg-[#161b22] rounded-[2rem] border transition-all overflow-hidden ${isModuleCompleted ? 'border-green-500/30 shadow-lg shadow-green-500/5' : 'border-gray-100 dark:border-gray-800'
                                        }`}
                                >
                                    <div className="p-8">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="space-y-1">
                                                <p className="text-indigo-600 dark:text-indigo-500 text-xs font-black uppercase tracking-[0.2em]">Módulo {index + 1}</p>
                                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
                                                    {module.title}
                                                </h3>
                                            </div>
                                            {isModuleCompleted && (
                                                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-600 dark:text-green-400 font-bold text-xs uppercase italic">
                                                    <ShieldCheck className="w-4 h-4" /> Acreditado
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 leading-relaxed italic">
                                            {module.description}
                                        </p>

                                        <div className="space-y-3 mb-8">
                                            {module.lessonOrder.map((lesson, lIdx) => {
                                                const isLessonCompleted = progress?.completedLessons.includes(lesson._id);
                                                return (
                                                    <Link
                                                        key={lesson._id}
                                                        to={`/lessons/${lesson._id}`}
                                                        state={{ courseId: course._id }}
                                                        className={`flex items-center p-4 rounded-2xl transition-all border ${isLessonCompleted
                                                            ? 'bg-transparent border-green-500/10 hover:bg-green-500/5'
                                                            : 'bg-gray-50 dark:bg-[#0a0c10]/40 border-transparent hover:border-indigo-500/30'
                                                            }`}
                                                    >
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 transition-colors ${isLessonCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                                                            }`}>
                                                            {lesson.type === 'video' ? <Play className="w-4 h-4 fill-current" /> : <FileText className="w-4 h-4" />}
                                                        </div>
                                                        <div className="flex-grow">
                                                            <p className={`text-sm font-bold ${isLessonCompleted ? 'text-gray-400 line-through decoration-green-500/50' : 'text-gray-800 dark:text-gray-200'}`}>
                                                                {lesson.title}
                                                            </p>
                                                            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-1">{lesson.type}</p>
                                                        </div>
                                                        {isLessonCompleted && <CheckCircle className="w-5 h-5 text-green-500 ml-4" />}
                                                        {!isLessonCompleted && <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-600 ml-4 group-hover:translate-x-1 transition-transform" />}
                                                    </Link>
                                                );
                                            })}
                                        </div>

                                        {/* Module Exam Button */}
                                        {module.quizId && (
                                            <div className="pt-4 mt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                                                {isModuleCompleted ? (
                                                    <div className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 rounded-2xl font-black text-xs uppercase tracking-widest cursor-not-allowed">
                                                        Examen Completado
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => navigate(`/quiz/${module.quizId}`)}
                                                        className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
                                                    >
                                                        Realizar Examen del Módulo
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white dark:bg-[#161b22] p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl transition-colors"
                    >
                        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest">Graduación</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 leading-relaxed italic">
                            Completa todos los módulos y lecciones para desbloquear tu certificación de experto en {course.category}.
                        </p>

                        {course.quizId ? (
                            <button
                                onClick={() => navigate(`/quiz/${course.quizId}`)}
                                disabled={!allModulesCompleted && !isAdmin}
                                className={`w-full py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] transition-all transform flex items-center justify-center gap-3 ${allModulesCompleted || isAdmin
                                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-xl shadow-green-500/20 active:scale-95'
                                    : 'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-600 border border-gray-100 dark:border-gray-700 cursor-not-allowed opacity-60'
                                    }`}
                            >
                                {allModulesCompleted ? (
                                    <>Comenzar Examen Final <Trophy className="w-5 h-5" /></>
                                ) : (
                                    <>Comenzar Examen {isAdmin ? '(Admin)' : <Lock className="w-5 h-5" />}</>
                                )}
                            </button>
                        ) : (
                            <div className="text-red-500 text-center font-bold">Error: No hay examen final asignado.</div>
                        )}

                        <div className="mt-10 space-y-6">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Requerimientos Técnicos</p>
                            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                <ShieldCheck className="w-4 h-4 text-indigo-500" /> 100% de lecciones vistas
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                <ShieldCheck className="w-4 h-4 text-indigo-500" /> Exámenes de módulo aprobados
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;

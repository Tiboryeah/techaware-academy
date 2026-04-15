import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle, Lock, Play, FileText, Trophy, ShieldCheck, Zap, ArrowLeft, Clock } from 'lucide-react';
import NotFound from './NotFound';
import { getLessonDisplayTitle, getLessonTypeLabel, getModuleDisplayTitle } from '../utils/lessonType';

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const [course, setCourse] = useState(null);
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [compactBackButton, setCompactBackButton] = useState(false);
    const [isChatbotOpen, setIsChatbotOpen] = useState(() => (
        typeof document !== 'undefined' && document.body.classList.contains('kuxibot-open')
    ));

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

    useEffect(() => {
        if (!course || !location.state?.scrollToLessonId) return;

        const timer = setTimeout(() => {
            const lessonCard = document.getElementById(`lesson-card-${location.state.scrollToLessonId}`);
            if (lessonCard) {
                lessonCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 150);

        return () => clearTimeout(timer);
    }, [course, location.state]);

    useEffect(() => {
        const handleScroll = () => {
            setCompactBackButton(window.scrollY > 120);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const syncChatbotState = (event) => {
            const nextOpenState = typeof event?.detail?.isOpen === 'boolean'
                ? event.detail.isOpen
                : document.body.classList.contains('kuxibot-open');

            setIsChatbotOpen(nextOpenState);
        };

        syncChatbotState();
        window.addEventListener('kuxibot:toggle', syncChatbotState);
        return () => window.removeEventListener('kuxibot:toggle', syncChatbotState);
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#fafafb] dark:bg-[#0a0c10]">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full" />
        </div>
    );
    if (!course) return <NotFound />;

    const allModulesCompleted = course.modules.every(m => progress?.completedModules.includes(m._id));
    const isAdmin = user?.role === 'Admin';

    return (
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] text-[#1a1a1a] dark:text-gray-100 pb-20 transition-colors duration-500">
            <div
                className={`mobile-chatbot-sensitive fixed top-[5.55rem] sm:top-24 left-3 sm:left-5 lg:left-8 z-[100] pointer-events-none transition-opacity duration-200 ${
                    isChatbotOpen ? 'opacity-0 pointer-events-none -translate-x-6 scale-95 sm:translate-x-0 sm:scale-100 sm:opacity-100 sm:pointer-events-auto' : 'opacity-100 translate-x-0 scale-100'
                }`}
            >
                <Link
                    to="/cursos"
                    aria-label="Volver a cursos"
                    className={`pointer-events-auto inline-flex items-center justify-center gap-0 text-gray-500 dark:text-gray-400 transition-colors duration-200 hover:text-indigo-600 dark:hover:text-indigo-400 sm:justify-start ${compactBackButton ? 'sm:gap-2' : 'sm:gap-2.5'} h-11 w-11 sm:h-auto sm:w-auto`}
                >
                    <ArrowLeft className={`${compactBackButton ? 'sm:w-[1.05rem] sm:h-[1.05rem]' : 'sm:w-[1.1rem] sm:h-[1.1rem]'} w-4 h-4`} />
                    <span className={`hidden sm:inline whitespace-nowrap font-black uppercase transition-all duration-200 ${compactBackButton ? 'text-[10px] tracking-[0.2em]' : 'text-[11px] tracking-[0.22em]'}`}>
                        Volver a cursos
                    </span>
                </Link>
            </div>

            {/* Header / Hero */}
            <div className="relative min-h-[340px] sm:min-h-0 sm:h-[340px] md:h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/20 to-transparent dark:to-[#0a0c10] z-10" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 dark:opacity-20" />

                <div className="relative z-20 max-w-7xl mx-auto px-4 h-full flex flex-col justify-end pt-24 pb-7 sm:pt-0 sm:pb-12">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <div className="space-y-4 max-w-3xl pr-2 sm:pr-0">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="max-w-[16ch] text-[2rem] leading-[0.98] tracking-tight sm:max-w-none sm:text-4xl sm:leading-tight md:text-5xl font-black text-gray-900 dark:text-white"
                            >
                                {course.title}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="max-w-[34rem] text-sm leading-6 italic text-gray-600 dark:text-gray-400 sm:text-lg sm:leading-relaxed"
                            >
                                {course.description}
                            </motion.p>
                            <div className="flex flex-col items-start gap-3 pt-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:pt-2">
                                <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-500/5 backdrop-blur-md">
                                    <Clock className="w-4 h-4 text-indigo-400" /> {course.duration || '3 horas'}
                                </div>
                                <div className="flex max-w-full flex-wrap gap-2">
                                    {course.riskAreas.map((area, idx) => (
                                        <span key={idx} className="px-2.5 py-1.5 sm:px-3 rounded-full bg-gray-500/10 border border-gray-500/20 text-gray-500 dark:text-gray-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] leading-none">
                                            {area}
                                        </span>
                                    ))}
                                </div>
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
            <div className="max-w-7xl mx-auto px-4 mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
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
                                    <div className="p-5 sm:p-8">
                                        <div className="flex justify-between items-start mb-4 sm:mb-6">
                                            <div className="space-y-1">
                                                <p className="text-indigo-600 dark:text-indigo-500 text-xs font-black uppercase tracking-[0.2em]">
                                                    Módulo {index + 1}
                                                </p>
                                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-colors">
                                                    {getModuleDisplayTitle(module.title)}
                                                </h3>
                                                {module.duration && (
                                                    <div className="flex items-center gap-1.5 text-indigo-500 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest mt-1">
                                                        <Clock className="w-3 h-3" /> Duración estimada: {module.duration}
                                                    </div>
                                                )}
                                            </div>
                                            {isModuleCompleted && (
                                                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-600 dark:text-green-400 font-bold text-xs uppercase italic">
                                                    <ShieldCheck className="w-4 h-4" /> Acreditado
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-5 sm:mb-8 leading-relaxed italic">
                                            {module.description}
                                        </p>

                                        <div className="space-y-3 mb-5 sm:mb-8">
                                            {module.lessonOrder.map((lesson, lIdx) => {
                                                const isLessonCompleted = progress?.completedLessons.includes(lesson._id);
                                                return (
                                                    <Link
                                                        key={lesson._id}
                                                        to={`/lecciones/${lesson._id}`}
                                                        state={{ courseId: course._id, returnToLessonId: lesson._id }}
                                                        id={`lesson-card-${lesson._id}`}
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
                                                                {getLessonDisplayTitle(lesson.title, lesson.type)}
                                                            </p>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest leading-none">{getLessonTypeLabel(lesson.type)}</p>
                                                                {lesson.duration && (
                                                                    <>
                                                                        <span className="w-0.5 h-0.5 rounded-full bg-gray-400" />
                                                                        <p className="text-[10px] text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-widest leading-none">{lesson.duration} min</p>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {isLessonCompleted && <CheckCircle className="w-5 h-5 text-green-500 ml-4" />}
                                                        {!isLessonCompleted && <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-600 ml-4 group-hover:translate-x-1 transition-transform" />}
                                                    </Link>
                                                );
                                            })}
                                        </div>

                                        {/* Module Exam Button */}
                                        {module.quizId && (
                                            <div className="pt-4 mt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-4">
                                                {isModuleCompleted && (
                                                    <button
                                                        onClick={() => navigate(`/evaluacion/${module.quizId}`)}
                                                        className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 dark:hover:bg-gray-700 transition-all font-inter"
                                                    >
                                                        Repetir Examen
                                                    </button>
                                                )}
                                                {!isModuleCompleted && (
                                                    <button
                                                        onClick={() => navigate(`/evaluacion/${module.quizId}`)}
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
                        className="bg-white dark:bg-[#161b22] p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl transition-colors"
                    >
                        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest">Graduación</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 leading-relaxed italic">
                            Completa todos los módulos y lecciones para desbloquear tu certificación de experto en {course.category}.
                        </p>

                        {course.quizId ? (
                            <div className="space-y-4">
                                <button
                                    onClick={() => navigate(`/evaluacion/${course.quizId}`)}
                                    disabled={!allModulesCompleted && !isAdmin}
                                    className={`w-full py-4 sm:py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] transition-all transform flex items-center justify-center gap-3 ${allModulesCompleted || isAdmin
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-xl shadow-green-500/20 active:scale-95'
                                        : 'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-600 border border-gray-100 dark:border-gray-700 cursor-not-allowed opacity-60'
                                        }`}
                                >
                                    {progress?.isCourseCompleted ? (
                                        <>Repetir Examen Final <Trophy className="w-5 h-5" /></>
                                    ) : allModulesCompleted ? (
                                        <>Comenzar Examen Final <Trophy className="w-5 h-5" /></>
                                    ) : (
                                        <>Comenzar Examen {isAdmin ? '(Administrador)' : <Lock className="w-5 h-5" />}</>
                                    )}
                                </button>
                                {progress?.isCourseCompleted && (
                                    <div className="flex items-center justify-center gap-2 p-3 bg-green-500/10 rounded-2xl border border-green-500/20 text-green-600 text-[10px] font-black uppercase tracking-widest italic">
                                        <Trophy className="w-3.5 h-3.5" /> Diplomado Obtenido
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                                El examen final de este curso todavía está en preparación.
                            </div>
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

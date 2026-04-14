import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, FileText, ChevronLeft, ChevronRight, CheckCircle, List, ArrowLeft, Youtube, Zap } from 'lucide-react';
import { getLessonDurationLabel, getLessonTypeLabel } from '../utils/lessonType';

const LessonView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [lesson, setLesson] = useState(null);
    const [moduleLessons, setModuleLessons] = useState([]);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [moduleQuizId, setModuleQuizId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            window.scrollTo(0, 0);
            try {
                const { data: lessonData } = await api.get(`/api/content/lessons/${id}`);
                setLesson(lessonData);

                const courseId = lessonData.courseId || location.state?.courseId;
                if (!courseId) return;

                const { data: courseData } = await api.get(`/api/content/courses/${courseId}`);
                const currentModule = courseData.modules.find(m => m._id === lessonData.moduleId);
                if (currentModule) {
                    setModuleLessons(currentModule.lessonOrder);
                    setModuleQuizId(currentModule.quizId);
                }

                try {
                    const { data: progressData } = await api.post(`/api/progress/lesson/${id}/complete`, {
                        courseId: courseId,
                        moduleId: lessonData.moduleId
                    });
                    setCompletedLessons(progressData.progress.completedLessons);
                } catch (completeError) {
                    const { data: progress } = await api.get(`/api/progress/course/${courseId}`);
                    setCompletedLessons(progress.completedLessons);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, location.state]);

    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#fafafb] dark:bg-[#0a0c10]">
            <motion.div 
                animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 1, 0.5]
                }} 
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} 
                className="flex flex-col items-center gap-4"
            >
                <Zap className="w-12 h-12 text-indigo-600 fill-current" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Cargando Lección</p>
            </motion.div>
        </div>
    );
    if (!lesson) return <div className="text-center py-20 dark:text-white">Lección no encontrada.</div>;

    const currentIndex = moduleLessons.findIndex(l => l._id === lesson._id);
    const prevLesson = currentIndex > 0 ? moduleLessons[currentIndex - 1] : null;
    const nextLesson = currentIndex < moduleLessons.length - 1 ? moduleLessons[currentIndex + 1] : null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
    };

    return (
        <div key={lesson._id} className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] text-gray-900 dark:text-gray-100 transition-colors duration-500 font-sans selection:bg-indigo-500/30">
            {/* Persistent Floating Back Button */}
            <div className="fixed top-6 left-6 z-[100] pointer-events-none">
                <Link 
                    to={`/cursos/${lesson.courseId}`}
                    state={{ scrollToLessonId: location.state?.returnToLessonId || lesson._id }}
                    className="pointer-events-auto group inline-flex items-center gap-2 p-2 pr-4 rounded-2xl bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-xl border border-gray-100 dark:border-white/5 text-indigo-600 dark:text-indigo-400 font-black text-[9px] tracking-[0.2em] uppercase hover:bg-indigo-600 hover:text-white transition-all shadow-xl active:scale-95"
                >
                    <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <ArrowLeft className="w-3.5 h-3.5" />
                    </div>
                    Volver al Curso
                </Link>
            </div>

            <div className="max-w-full 2xl:max-w-[1850px] mx-auto px-6 md:px-16 py-12">
                {/* Regular Header (not sticky) */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="mb-12 flex flex-col md:flex-row items-baseline md:items-center justify-between gap-8 pl-0 md:pl-32"
                >
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
                            {lesson.title}
                        </h1>
                        <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest opacity-60">
                            <span className="w-8 h-0.5 bg-indigo-600 rounded-full" />
                            {getLessonTypeLabel(lesson.type)} — {getLessonDurationLabel(lesson.type, lesson.duration)}
                        </div>
                    </div>
                    
                    <div className="px-6 py-3 rounded-2xl bg-white dark:bg-[#161b22] border border-gray-100 dark:border-white/5 flex items-center gap-4 shadow-sm">
                        <List className="w-4 h-4 text-indigo-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                            Lección <span className="text-indigo-600 dark:text-indigo-400 font-black text-xs">{currentIndex + 1}</span> de {moduleLessons.length}
                        </span>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Main Content Area */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-9 space-y-8"
                    >
                        <div className="relative bg-white dark:bg-[#161b22] rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-xl transition-all">
                            {lesson.type === 'video' ? (
                                <div className="flex flex-col">
                                    <div className="aspect-video w-full bg-black relative group">
                                        <iframe
                                            className="w-full h-full"
                                            src={`https://www.youtube.com/embed/${(() => {
                                                const url = lesson.videoUrl;
                                                if (!url) return '';
                                                const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                                                const match = url.match(regExp);
                                                return (match && match[2]) ? match[2] : '';
                                            })()}?rel=0&modestbranding=1&autoplay=0`}
                                            title={lesson.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                    <div className="p-6 bg-gradient-to-br from-indigo-50 via-transparent to-transparent dark:from-indigo-500/5 dark:via-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-gray-50 dark:border-white/5">
                                        <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase tracking-widest">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                                <Youtube className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-gray-400 dark:text-gray-500 mb-0.5">Tipo de Contenido</p>
                                                Video Tutorial {lesson.duration && `— ${lesson.duration} min`}
                                            </div>
                                        </div>
                                        <a href={lesson.videoUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-lg border border-indigo-600 text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all active:scale-95">
                                            Ver en YouTube
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-8 md:p-12 prose dark:prose-invert prose-indigo max-w-none transition-colors">
                                    {lesson.content ? lesson.content.split('\n').map((line, idx) => {
                                        const parseBold = (text) => {
                                            const parts = text.split(/(\*\*.*?\*\*)/g);
                                            return parts.map((part, i) => {
                                                if (part.startsWith('**') && part.endsWith('**')) {
                                                    return <strong key={i} className="font-bold text-indigo-600 dark:text-indigo-400">{part.slice(2, -2)}</strong>;
                                                }
                                                return part;
                                            });
                                        };
                                        const renderLine = (line, idx) => {
                                            if (line.match(/!\[(.*?)\]\((.*?)\)/)) {
                                                const match = line.match(/!\[(.*?)\]\((.*?)\)/);
                                                return (
                                                    <motion.div 
                                                        key={idx} 
                                                        variants={itemVariants}
                                                        className="my-10"
                                                    >
                                                        <img src={match[2]} alt={match[1]} className="rounded-2xl shadow-lg w-full border border-gray-100 dark:border-white/10" />
                                                        {match[1] && <p className="text-center text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mt-4 opacity-60">{match[1]}</p>}
                                                    </motion.div>
                                                );
                                            }
                                            if (line.startsWith('# ')) return <motion.h1 key={idx} variants={itemVariants} className="text-3xl md:text-5xl font-black mb-10 text-gray-900 dark:text-white tracking-tight leading-tight">{line.replace('# ', '')}</motion.h1>;
                                            if (line.startsWith('### ')) return <motion.h3 key={idx} variants={itemVariants} className="text-xl md:text-2xl font-black mt-12 mb-4 text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                                                <span className="w-8 h-1 bg-indigo-500 rounded-full" /> {line.replace('### ', '')}
                                            </motion.h3>;
                                            if (line.startsWith('## ')) return <motion.h2 key={idx} variants={itemVariants} className="text-2xl md:text-3xl font-black mt-16 mb-6 text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                                                <span className="w-10 h-1 bg-indigo-600 rounded-full" /> {line.replace('## ', '')}
                                            </motion.h2>;
                                            if (line.startsWith('* ')) return (
                                                <motion.li 
                                                    key={idx} 
                                                    variants={itemVariants}
                                                    className="ml-5 list-none mb-4 text-gray-700 dark:text-gray-300 pl-6 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-2 before:h-2 before:bg-indigo-600 before:rounded-full text-base lg:text-lg leading-relaxed font-medium"
                                                >
                                                    {parseBold(line.replace('* ', ''))}
                                                </motion.li>
                                            );
                                            if (line.match(/^\d+\. /)) {
                                                const number = line.match(/^(\d+)\. /)[1];
                                                return (
                                                    <motion.div 
                                                        key={idx} 
                                                        variants={itemVariants}
                                                        className="mb-6 p-6 bg-slate-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-2xl shadow-sm flex gap-6 items-start hover:shadow-md transition-all group"
                                                    >
                                                        <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-lg group-hover:scale-110 transition-all">{number}</span>
                                                        <div className="pt-1.5">
                                                            <p className="text-lg text-gray-800 dark:text-gray-100 font-bold tracking-tight leading-relaxed">{parseBold(line.replace(/^\d+\. /, ''))}</p>
                                                        </div>
                                                    </motion.div>
                                                );
                                            }
                                            if (line.startsWith('> ')) return (
                                                <motion.div 
                                                    key={idx} 
                                                    variants={itemVariants}
                                                    className="my-10 p-10 bg-slate-50 dark:bg-white/[0.03] border-l-8 border-indigo-600 rounded-r-3xl relative overflow-hidden group shadow-sm"
                                                >
                                                    <div className="absolute top-0 right-0 p-4 opacity-10 flex gap-2">
                                                        <Zap className="w-12 h-12 text-indigo-600" />
                                                    </div>
                                                    <p className="relative z-10 text-xl md:text-2xl font-bold italic leading-relaxed text-gray-800 dark:text-gray-100 pr-10">
                                                        "{parseBold(line.replace('> ', ''))}"
                                                    </p>
                                                </motion.div>
                                            );
                                            if (line.startsWith('---')) return <motion.hr key={idx} variants={itemVariants} className="my-12 border-gray-100 dark:border-white/5" />;
                                            if (line.trim() === '') return <div key={idx} className="h-2" />;
                                            return (
                                                <motion.p 
                                                    key={idx} 
                                                    variants={itemVariants}
                                                    className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300 text-base md:text-lg font-normal opacity-90"
                                                >
                                                    {parseBold(line)}
                                                </motion.p>
                                            );
                                        };
                                        return renderLine(line, idx);
                                    }) : <p className="text-center text-gray-500 py-20 uppercase tracking-widest font-black text-xs">Contenido no disponible.</p>}
                                </div>
                            )}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-6 pb-12">
                            {prevLesson ? (
                                <button
                                    onClick={() => navigate(`/lecciones/${prevLesson._id}`, { state: { courseId: lesson.courseId, returnToLessonId: location.state?.returnToLessonId || lesson._id } })}
                                    className="w-full sm:w-auto group flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-[#161b22] hover:bg-gray-50 dark:hover:bg-indigo-500/10 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md active:scale-95"
                                >
                                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Anterior
                                </button>
                            ) : <div />}

                            {nextLesson ? (
                                <button
                                    onClick={() => navigate(`/lecciones/${nextLesson._id}`, { state: { courseId: lesson.courseId, returnToLessonId: location.state?.returnToLessonId || lesson._id } })}
                                    className="w-full sm:w-auto group flex items-center justify-center gap-3 px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg active:scale-95 hover:translate-y-[-1px]"
                                >
                                    Siguiente Lección <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            ) : (
                                moduleQuizId && (
                                    <button
                                        onClick={() => navigate(`/evaluacion/${moduleQuizId}`)}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg active:scale-95 hover:translate-y-[-1px]"
                                    >
                                        Comenzar Examen <CheckCircle className="w-5 h-5" />
                                    </button>
                                )
                            )}
                        </div>
                    </motion.div>

                    <div className="lg:col-span-3 lg:sticky lg:top-8 h-fit">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            transition={{ delay: 0.3 }}
                            className="bg-white/90 dark:bg-[#111418]/90 backdrop-blur-xl rounded-3xl border border-gray-100 dark:border-white/5 overflow-hidden shadow-2xl transition-all"
                        >
                            <div className="p-8 border-b border-gray-50 dark:border-white/5 bg-slate-50/50 dark:bg-indigo-500/5 transition-colors relative overflow-hidden">
                                <h3 className="font-black text-sm text-gray-900 dark:text-white uppercase tracking-[0.2em] mb-4 transition-colors">Contenido</h3>
                                
                                <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-2">
                                    <span>Progreso del Módulo</span>
                                    <span>{Math.round((completedLessons.filter(id => moduleLessons.some(l => String(l._id) === String(id))).length / moduleLessons.length) * 100)}%</span>
                                </div>
                                <div className="w-full bg-indigo-100/50 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(completedLessons.filter(id => moduleLessons.some(l => String(l._id) === String(id))).length / moduleLessons.length) * 100}%` }}
                                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000"
                                    />
                                </div>
                            </div>

                            <div className="max-h-[500px] overflow-y-auto playlist-container transition-colors custom-scrollbar">
                                {moduleLessons.map((item, index) => {
                                    const isCompleted = completedLessons.some(id => String(id) === String(item._id));
                                    const isActive = item._id === lesson._id;

                                    return (
                                        <div
                                            key={item._id}
                                            onClick={() => navigate(`/lecciones/${item._id}`, { state: { courseId: lesson.courseId, returnToLessonId: location.state?.returnToLessonId || lesson._id } })}
                                            className={`group p-6 cursor-pointer flex items-center gap-5 transition-all border-b border-gray-50 dark:border-white/[0.01] ${isActive ? 'bg-indigo-600 scale-[1.02] shadow-xl z-10 relative rounded-xl mx-2 my-1' : 'hover:bg-indigo-500/5'
                                                }`}
                                        >
                                            <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                                isActive ? 'bg-white text-indigo-600' :
                                                isCompleted ? 'bg-green-500 text-white shadow-green-500/20 shadow-lg' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 group-hover:bg-indigo-600 group-hover:text-white'
                                                }`}>
                                                {isCompleted ? <CheckCircle className="w-5 h-5" /> : (item.type === 'video' ? <Play className="w-4 h-4 fill-current" /> : <FileText className="w-4 h-4" />)}
                                            </div>

                                            <div className="flex-grow">
                                                <p className={`text-sm font-black tracking-tight leading-snug transition-colors ${isActive ? 'text-white' : 'text-gray-900 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`}>
                                                    {item.title}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1.5 opacity-70">
                                                    <p className={`text-[8px] font-black uppercase tracking-[0.1em] leading-none ${isActive ? 'text-white' : 'text-gray-400 dark:text-gray-500'}`}>{getLessonTypeLabel(item.type)}</p>
                                                    <span className={`w-0.5 h-0.5 rounded-full ${isActive ? 'bg-white' : 'bg-gray-300 dark:bg-gray-700'}`} />
                                                    <p className={`text-[8px] font-black uppercase tracking-[0.1em] leading-none ${isActive ? 'text-white' : 'text-indigo-600 dark:text-indigo-400'}`}>{item.duration} min</p>
                                                </div>
                                            </div>

                                            {isActive && (
                                                <motion.div layoutId="active-dot" className="w-2 h-2 rounded-full bg-white shadow-lg" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {moduleQuizId && (
                                <div className="p-8 bg-indigo-50/20 dark:bg-black/20 transition-colors">
                                    <button
                                        onClick={() => navigate(`/evaluacion/${moduleQuizId}`)}
                                        className="w-full py-5 bg-white dark:bg-[#161b22] border border-gray-100 dark:border-white/5 hover:border-indigo-600 text-gray-400 hover:text-indigo-600 transition-all rounded-2xl font-black text-[9px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 group"
                                    >
                                        <Zap className="w-4 h-4" /> EXAMEN FINAL
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(79, 70, 229, 0.1);
                    border-radius: 10px;
                }
            `}} />
        </div>
    );
};

export default LessonView;

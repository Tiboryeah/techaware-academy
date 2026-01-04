import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, FileText, ChevronLeft, ChevronRight, CheckCircle, List, ArrowLeft, Youtube, Zap } from 'lucide-react';

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

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#fafafb] dark:bg-[#0a0c10]">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full" />
        </div>
    );
    if (!lesson) return <div className="text-center py-20 dark:text-white">Lección no encontrada.</div>;

    const currentIndex = moduleLessons.findIndex(l => l._id === lesson._id);
    const prevLesson = currentIndex > 0 ? moduleLessons[currentIndex - 1] : null;
    const nextLesson = currentIndex < moduleLessons.length - 1 ? moduleLessons[currentIndex + 1] : null;

    return (
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] text-gray-900 dark:text-gray-100 transition-colors duration-500">
            <div className="max-w-[1600px] mx-auto px-4 py-8">
                {/* Back to Course Header */}
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <Link to={`/courses/${lesson.courseId}`} className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm tracking-widest uppercase hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Volver al Curso
                    </Link>
                    <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                        <List className="w-4 h-4" /> Lección {currentIndex + 1} de {moduleLessons.length}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-8">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h1 className="text-3xl font-black mb-6 tracking-tight leading-none text-gray-900 dark:text-white">{lesson.title}</h1>

                            <div className="relative bg-white dark:bg-[#161b22] rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-xl dark:shadow-2xl transition-colors">
                                {lesson.type === 'video' ? (
                                    <div className="flex flex-col">
                                        <div className="aspect-video w-full bg-black">
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
                                        <div className="p-6 bg-indigo-50/50 dark:bg-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest">
                                                <Youtube className="w-5 h-5" /> Video Tutorial
                                            </div>
                                            <a href={lesson.videoUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-colors">
                                                Ver en YouTube Original
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
                                                        return <strong key={i} className="font-black text-gray-900 dark:text-white bg-indigo-500/10 px-1 rounded">{part.slice(2, -2)}</strong>;
                                                    }
                                                    return part;
                                                });
                                            };
                                            if (line.startsWith('# ')) return <h1 key={idx} className="text-3xl md:text-4xl font-black mb-8 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">{line.replace('# ', '')}</h1>;
                                            if (line.startsWith('## ')) return <h2 key={idx} className="text-xl md:text-2xl font-bold mt-10 mb-4 text-indigo-600 dark:text-indigo-400 flex items-center gap-2"><Zap className="w-5 h-5" /> {line.replace('## ', '')}</h2>;
                                            if (line.startsWith('* ')) return <li key={idx} className="ml-4 list-disc mb-3 text-gray-600 dark:text-gray-300 pl-2 marker:text-indigo-500 leading-relaxed font-serif italic">{parseBold(line.replace('* ', ''))}</li>;
                                            if (line.trim() === '') return <div key={idx} className="h-4" />;
                                            return <p key={idx} className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300 text-lg font-serif italic">{parseBold(line)}</p>;
                                        }) : <p className="text-center text-gray-500 py-20">Contenido no disponible.</p>}
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Navigation Buttons */}
                        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-800 gap-6">
                            {prevLesson ? (
                                <button
                                    onClick={() => navigate(`/lessons/${prevLesson._id}`, { state: { courseId: lesson.courseId } })}
                                    className="w-full sm:w-auto group flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all border border-gray-200 dark:border-transparent hover:border-gray-300 dark:hover:border-gray-700"
                                >
                                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Anterior
                                </button>
                            ) : <div />}

                            {nextLesson ? (
                                <button
                                    onClick={() => navigate(`/lessons/${nextLesson._id}`, { state: { courseId: lesson.courseId } })}
                                    className="w-full sm:w-auto group flex items-center justify-center gap-3 px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
                                >
                                    Siguiente Lección <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            ) : (
                                moduleQuizId && (
                                    <button
                                        onClick={() => navigate(`/quiz/${moduleQuizId}`)}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-green-600/20 active:scale-95"
                                    >
                                        Comenzar Examen <CheckCircle className="w-5 h-5" />
                                    </button>
                                )
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-[#111418] rounded-[2.5rem] border border-gray-100 dark:border-white/5 overflow-hidden shadow-xl transition-colors">
                            <div className="p-8 border-b border-gray-100 dark:border-white/5 bg-slate-50 dark:bg-indigo-500/10 transition-colors">
                                <h3 className="font-black text-lg text-gray-900 dark:text-indigo-300 uppercase tracking-widest mb-1 transition-colors">Tu Progreso</h3>
                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                                    <span>{completedLessons.filter(id => moduleLessons.some(l => String(l._id) === String(id))).length} de {moduleLessons.length} lecciones</span>
                                    <span>{Math.round((completedLessons.filter(id => moduleLessons.some(l => String(l._id) === String(id))).length / moduleLessons.length) * 100)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
                                    <div
                                        className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-1000"
                                        style={{ width: `${(completedLessons.filter(id => moduleLessons.some(l => String(l._id) === String(id))).length / moduleLessons.length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <div className="max-h-[500px] overflow-y-auto playlist-container transition-colors">
                                {moduleLessons.map((item, index) => {
                                    const isCompleted = completedLessons.some(id => String(id) === String(item._id));
                                    const isActive = item._id === lesson._id;

                                    return (
                                        <div
                                            key={item._id}
                                            onClick={() => navigate(`/lessons/${item._id}`, { state: { courseId: lesson.courseId } })}
                                            className={`group p-6 cursor-pointer flex items-center gap-4 transition-all border-b border-gray-50 dark:border-gray-800/50 ${isActive ? 'bg-indigo-50 dark:bg-indigo-600/10 border-indigo-200 dark:border-indigo-500/30' : 'hover:bg-gray-50 dark:hover:bg-gray-800/30'
                                                }`}
                                        >
                                            <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isCompleted ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'
                                                }`}>
                                                {isCompleted ? <CheckCircle className="w-4 h-4" /> : (item.type === 'video' ? <Play className="w-4 h-4 fill-current" /> : <FileText className="w-4 h-4" />)}
                                            </div>

                                            <div className="flex-grow">
                                                <p className={`text-sm font-bold transition-colors ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200'}`}>
                                                    {index + 1}. {item.title}
                                                </p>
                                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mt-1">{item.type}</p>
                                            </div>

                                            {isActive && (
                                                <motion.div layoutId="active-indicator" className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-500 shadow-lg shadow-indigo-600 dark:shadow-indigo-500" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {moduleQuizId && (
                                <div className="p-8 bg-gray-50 dark:bg-gray-900/50 transition-colors">
                                    <button
                                        onClick={() => navigate(`/quiz/${moduleQuizId}`)}
                                        className="w-full py-4 bg-transparent border border-gray-200 dark:border-gray-800 hover:border-indigo-500/50 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-white dark:hover:bg-indigo-500/5 flex items-center justify-center gap-3"
                                    >
                                        <FileText className="w-4 h-4" /> Examen de Módulo
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonView;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight,
    ChevronLeft,
    CheckCircle,
    AlertCircle,
    ShieldCheck,
    Target,
    Zap,
    BookOpen,
    Trophy,
    ShieldAlert,
    TrendingUp
} from 'lucide-react';

const QuizTaker = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const endpoint = id === 'diagnostic' ? '/api/quiz/diagnostic' : `/api/quiz/${id}`;
                const { data } = await api.get(endpoint);
                setQuiz(data);
            } catch (error) {
                console.error("Error fetching quiz:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [id]);

    const handleOptionSelect = (questionId, optionIndex) => {
        setAnswers({ ...answers, [questionId]: optionIndex });
    };

    const handleSubmit = async () => {
        try {
            const { data } = await api.post(`/api/quiz/${quiz._id}/submit`, { answers });
            setResult(data);
        } catch (error) {
            console.error("Submission error:", error);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#fafafb] dark:bg-[#0a0c10]">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full" />
        </div>
    );

    if (!quiz) return (
        <div className="min-h-screen flex items-center justify-center bg-[#fafafb] dark:bg-[#0a0c10] text-gray-900 dark:text-white">
            <div className="text-center space-y-4 px-4">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
                <h2 className="text-2xl font-black">Examen no encontrado</h2>
                <button onClick={() => navigate('/dashboard')} className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Volver al Panel</button>
            </div>
        </div>
    );

    if (result) {
        const isDiagnostic = id === 'diagnostic';
        return (
            <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] text-gray-900 dark:text-gray-100 py-12 px-4 transition-colors duration-500">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-3xl mx-auto bg-white dark:bg-[#161b22] rounded-[3rem] border border-gray-100 dark:border-gray-800 p-8 md:p-12 shadow-2xl overflow-hidden relative"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-indigo-500" />

                    <div className="text-center space-y-8">
                        <div className="relative inline-block">
                            <div className="w-32 h-32 rounded-full border-4 border-indigo-500/20 flex items-center justify-center font-bold">
                                <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400">{result.score}%</span>
                            </div>
                            {result.passed && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -bottom-2 -right-2 bg-green-500 p-3 rounded-full shadow-lg"
                                >
                                    <ShieldCheck className="w-6 h-6 text-white" />
                                </motion.div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                                {isDiagnostic ? 'Análisis de Vulnerabilidad Finalizado' : 'Resultados de la Evaluación'}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 font-medium italic">
                                {result.passed ? 'Has demostrado conocimientos sólidos de protección.' : 'Hay áreas críticas que necesitan tu atención inmediata.'}
                            </p>
                        </div>

                        {/* Diagnostic Feedback (Vulnerabilities or Mastery) */}
                        {isDiagnostic && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                                {result.score >= 90 ? (
                                    <div className="p-8 bg-indigo-500/5 border border-indigo-500/10 rounded-[2rem] space-y-4 col-span-2 text-center">
                                        <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/30">
                                            <Trophy className="text-white w-8 h-8" />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Blindaje Total Detectado</p>
                                            <p className="text-base text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                                                ¡Excelente desempeño! Has demostrado un dominio superior de la seguridad digital. No se han detectado brechas críticas en tu perfil actual.
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                                Para mantenerte en este nivel de "Leyenda", te recomendamos revisar los <strong className="text-indigo-500">Módulos Avanzados</strong> periódicamente.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-2xl space-y-2">
                                            <div className="flex items-center gap-2 mb-1">
                                                <ShieldAlert className="w-4 h-4 text-red-500" />
                                                <p className="text-[10px] font-black uppercase tracking-widest text-red-600 dark:text-red-400">Puntos de Atención</p>
                                            </div>
                                            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 italic list-disc pl-4">
                                                <li>Configuración de Privacidad</li>
                                                <li>Gestión de Identidad Digital</li>
                                                <li>Protección contra Ingeniería Social</li>
                                            </ul>
                                        </div>
                                        <div className="p-6 bg-green-500/5 border border-green-500/10 rounded-2xl space-y-2">
                                            <div className="flex items-center gap-2 mb-1">
                                                <TrendingUp className="w-4 h-4 text-green-500" />
                                                <p className="text-[10px] font-black uppercase tracking-widest text-green-600 dark:text-green-400">Fortalezas Consolidadas</p>
                                            </div>
                                            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 italic list-disc pl-4">
                                                <li>Detección de Enlaces Maliciosos</li>
                                                <li>Seguridad en Plataformas de Streaming</li>
                                                <li>Conciencia de Riesgos en Gaming</li>
                                            </ul>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        <div className="space-y-6 pt-8 border-t border-gray-100 dark:border-gray-800">
                            <h3 className="text-sm font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 flex items-center justify-center gap-2">
                                <Target className="w-4 h-4" /> Recomendaciones Personalizadas
                            </h3>
                            <div className="space-y-3">
                                <div className="p-4 bg-gray-50 dark:bg-[#0a0c10]/40 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center justify-between group hover:border-indigo-500/30 transition-all cursor-pointer" onClick={() => navigate('/modules')}>
                                    <div className="flex items-center gap-4 text-left">
                                        <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-400 font-bold"><BookOpen className="w-4 h-4" /></div>
                                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Completar curso: "Seguridad en Videojuegos"</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-700 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/dashboard')}
                            className="w-full py-5 bg-indigo-600 dark:bg-white text-white dark:text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-700 dark:hover:bg-indigo-500 dark:hover:text-white transition-all shadow-xl"
                        >
                            Continuar al Panel
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
    const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

    return (
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] text-gray-900 dark:text-gray-100 py-12 px-4 flex items-center justify-center transition-colors duration-500">
            <div className="max-w-4xl w-full space-y-12">
                {/* Progress Header */}
                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-indigo-600 dark:text-indigo-500 text-xs font-black uppercase tracking-[0.2em] mb-1">Evaluación en progreso</p>
                            <h1 className="text-3xl font-black text-gray-900 dark:text-white">{quiz.title}</h1>
                        </div>
                        <div className="text-right font-bold">
                            <span className="text-2xl font-black text-gray-900 dark:text-white">{currentQuestionIndex + 1}</span>
                            <span className="text-gray-400 dark:text-gray-600"> / {quiz.questions.length}</span>
                        </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-indigo-600 dark:bg-indigo-500"
                        />
                    </div>
                </div>

                {/* Question Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white dark:bg-[#161b22] p-8 md:p-12 rounded-[3rem] md:rounded-[3.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl min-h-[400px] flex flex-col transition-colors"
                    >
                        <div className="flex-grow space-y-10">
                            <div className="space-y-4">
                                {currentQuestion.platform && (
                                    <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-lg">
                                        Tópico: {currentQuestion.platform}
                                    </span>
                                )}
                                <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                                    {currentQuestion.text}
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {currentQuestion.options.map((opt, optIdx) => (
                                    <button
                                        key={optIdx}
                                        onClick={() => handleOptionSelect(currentQuestion._id, optIdx)}
                                        className={`flex items-center justify-between p-6 rounded-[1.5rem] border-2 transition-all group text-left ${answers[currentQuestion._id] === optIdx
                                            ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-500/5 text-gray-900 dark:text-white'
                                            : 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0a0c10]/40 text-gray-600 dark:text-gray-400 hover:border-indigo-200 dark:hover:border-gray-700'
                                            }`}
                                    >
                                        <span className="font-bold pr-4">{opt.text}</span>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${answers[currentQuestion._id] === optIdx
                                            ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-600 dark:bg-indigo-500'
                                            : 'border-gray-200 dark:border-gray-700'
                                            }`}>
                                            {answers[currentQuestion._id] === optIdx && <CheckCircle className="w-4 h-4 text-white dark:text-black fill-current" />}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Footer */}
                        <div className="flex flex-col sm:flex-row justify-between items-center pt-10 mt-10 border-t border-gray-100 dark:border-gray-800 gap-6">
                            <button
                                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                                disabled={currentQuestionIndex === 0}
                                className="flex items-center gap-2 text-gray-400 dark:text-gray-500 font-bold hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-0"
                            >
                                <ChevronLeft className="w-5 h-5" /> Anterior
                            </button>

                            {isLastQuestion ? (
                                <button
                                    onClick={handleSubmit}
                                    disabled={Object.keys(answers).length < quiz.questions.length}
                                    className="w-full sm:w-auto px-12 py-5 bg-indigo-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50"
                                >
                                    Enviar Resultados <Zap className="w-4 h-4 inline-block ml-2 fill-current" />
                                </button>
                            ) : (
                                <button
                                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                                    disabled={answers[currentQuestion._id] === undefined}
                                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-5 bg-white dark:bg-gray-100 text-gray-900 border border-gray-200 dark:border-transparent font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-all disabled:opacity-50"
                                >
                                    Siguiente <ChevronRight className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="flex flex-col sm:flex-row justify-center gap-8 md:gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 dark:text-gray-600 text-center">
                    <span className="flex items-center justify-center gap-2"><ShieldCheck className="w-3 h-3" /> Seguridad Certificada</span>
                    <span className="flex items-center justify-center gap-2"><Target className="w-3 h-3" /> Análisis de Riesgo</span>
                </div>
            </div>
        </div>
    );
};

export default QuizTaker;

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import {
    ChevronRight,
    ChevronLeft,
    CheckCircle,
    ShieldCheck,
    Target,
    Zap,
    BookOpen,
    Trophy,
    ShieldAlert,
    TrendingUp,
    Columns,
    Layers,
    ListOrdered,
    ArrowRightLeft,
    Type,
    Package,
    GripVertical,
    Check
} from 'lucide-react';
import { getLessonDisplayTitle } from '../utils/lessonType';
import NotFound from './NotFound';


const QuizTaker = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const isAdmin = user?.role === 'Admin';
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showResolvedReview, setShowResolvedReview] = useState(false);
    const [showReviewGuidance, setShowReviewGuidance] = useState(false);
    const navigate = useNavigate();

    const shuffleArray = (array) => {
        if (!array) return array;
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    };

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const isDiagnosticRoute = id === 'diagnostic' || id === 'diagnostico';
                const endpoint = isDiagnosticRoute ? '/api/quiz/diagnostic' : `/api/quiz/${id}`;
                const { data } = await api.get(endpoint);
                
                // US08: Ensure question items are NOT in a predictable order
                const shuffledQuestions = data.questions.map(q => {
                    const newQ = { ...q };
                    if (newQ.metadata) {
                        if (newQ.metadata.bank) newQ.metadata.bank = shuffleArray(newQ.metadata.bank);
                        if (newQ.metadata.items) newQ.metadata.items = shuffleArray(newQ.metadata.items);
                        if (newQ.metadata.right) newQ.metadata.right = shuffleArray(newQ.metadata.right);
                        if (newQ.metadata.options) {
                            const newOptions = {};
                            Object.keys(newQ.metadata.options).forEach(key => {
                                newOptions[key] = shuffleArray(newQ.metadata.options[key]);
                            });
                            newQ.metadata.options = newOptions;
                        }
                    }
                    if (newQ.options) newQ.options = shuffleArray(newQ.options);
                    return newQ;
                });
                
                setQuiz({ ...data, questions: shuffledQuestions });
            } catch (error) {
                console.error("Error fetching quiz:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [id]);

    useEffect(() => {
        if (quiz && quiz.questions[currentQuestionIndex]) {
            const currentQ = quiz.questions[currentQuestionIndex];
            if (currentQ.type === 'order_sequence' && !answers[currentQ._id]) {
                const shuffled = shuffleArray(currentQ.metadata.items);
                setAnswers(prev => ({ ...prev, [currentQ._id]: shuffled }));
            }
            if (currentQ.type === 'drag_drop' && !answers[`${currentQ._id}_order`]) {
                const values = currentQ.metadata.pairs.map(p => p.value);
                const shuffled = shuffleArray(values);
                const resultObj = {};
                currentQ.metadata.pairs.forEach((p, i) => {
                    resultObj[p.key] = shuffled[i];
                });
                setAnswers(prev => ({ 
                    ...prev, 
                    [`${currentQ._id}_order`]: shuffled,
                    [currentQ._id]: resultObj 
                }));
            }
        }
        window.scrollTo(0, 0);
    }, [currentQuestionIndex, quiz]);

    const handleOptionSelect = (questionId, optionId) => {
        setAnswers({ ...answers, [questionId]: optionId });
    };

    const handleMultiSelect = (questionId, optionId) => {
        const current = answers[questionId] || [];
        if (current.includes(optionId)) {
            setAnswers({ ...answers, [questionId]: current.filter(id => id !== optionId) });
        } else {
            setAnswers({ ...answers, [questionId]: [...current, optionId] });
        }
    };

    const handleComplexSelect = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
    };

    const isQuestionAnswered = (question, answer) => {
        if (!answer) return false;

        switch (question.type) {
            case 'multiple_selection':
                return Array.isArray(answer) && answer.length > 0;
            case 'drag_drop':
                return question.metadata.pairs.every(pair => !!answer[pair.key]);
            case 'fill_blanks':
                const blankCount = (question.metadata.sentence.match(/\[blank\d+\]/g) || []).length;
                const bank = (question.metadata.bank || []).map(b => b.toLowerCase());
                const currentAnswers = Object.values(answer || {});
                return currentAnswers.length === blankCount && 
                       currentAnswers.every(v => v && bank.includes(v.trim().toLowerCase()));
            case 'drop_down':
                const ddBlankCount = (question.metadata.sentence.match(/\[blank\d+\]/g) || []).length;
                const ddFilledCount = Object.values(answer).filter(v => !!v).length;
                return ddFilledCount === ddBlankCount;
            case 'order_sequence':
                return Array.isArray(answer) && answer.length === question.metadata.items.length;
            case 'match_columns':
                return question.metadata.right.every(item => 
                    Object.values(answer).some(assignedList => Array.isArray(assignedList) && assignedList.includes(item))
                );
            case 'categorize':
                return question.metadata.items.every(item => 
                    Object.values(answer).some(assignedList => Array.isArray(assignedList) && assignedList.includes(item))
                );
            case 'single_choice':
            case 'case_study':
            default:
                return !!answer;
        }
    };

    const isQuizComplete = quiz?.questions.every(q => isQuestionAnswered(q, answers[q._id]));

    const handleRetry = () => {
        setAnswers({});
        setCurrentQuestionIndex(0);
        setResult(null);
        setRecommendations(null);
        setShowResolvedReview(false);
        setShowReviewGuidance(false);
    };

    const formatAnswer = (ans) => {
        if (!ans) return "Sin respuesta";
        if (typeof ans === 'string') return ans;
        if (Array.isArray(ans)) return ans.join(", ");
        if (typeof ans === 'object') {
            return Object.entries(ans)
                .map(([k, v]) => {
                    // Hide internal 'blank' labels to be more human-readable
                    const label = k.toString().startsWith('blank') ? '' : `${k}: `;
                    const value = Array.isArray(v) ? v.join(", ") : v;
                    return `${label}${value}`;
                })
                .join(" | ");
        }
        return JSON.stringify(ans);
    };

    const normalizeSelectionValue = (value) => value?.toString?.() || String(value);

    const arraysMatchUnordered = (left = [], right = []) =>
        Array.isArray(left) &&
        Array.isArray(right) &&
        left.length === right.length &&
        right.every((value) => left.includes(value));

    const renderResolvedQuestionContent = (question, detail) => {
        if (!question) {
            return null;
        }

        const questionAnswer = answers[question._id];
        const correctAnswer = detail?.correctAnswer;
        const questionType = question.type || 'single_choice';

        if (['single_choice', 'multiple_choice', 'case_study', 'multiple_selection'].includes(questionType)) {
            const selectedValues = questionType === 'multiple_selection'
                ? (Array.isArray(questionAnswer) ? questionAnswer : []).map(normalizeSelectionValue)
                : questionAnswer ? [normalizeSelectionValue(questionAnswer)] : [];

            return (
                <div className="flex flex-col gap-4">
                    {(question.options || []).map((opt, optIdx) => {
                        const optionId = normalizeSelectionValue(opt._id);
                        const isSelected = selectedValues.includes(optionId);
                        const isCorrectOption = !!opt.isCorrect;
                        const toneClasses = isCorrectOption
                            ? 'border-green-300 dark:border-green-500/30 bg-green-50 dark:bg-green-500/10 text-green-900 dark:text-green-200'
                            : isSelected
                                ? 'border-red-300 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 text-red-900 dark:text-red-200'
                                : 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0a0c10]/40 text-gray-600 dark:text-gray-400';

                        return (
                            <div
                                key={optIdx}
                                className={`p-5 rounded-[1.5rem] border-2 ${toneClasses}`}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <span className="font-bold pr-4 text-sm leading-relaxed">{opt.text}</span>
                                    <div className="flex flex-wrap justify-end gap-2">
                                        {isSelected && (
                                            <span className="px-2.5 py-1 rounded-full bg-white/80 dark:bg-slate-950/50 text-[10px] font-black uppercase tracking-widest">
                                                Tu respuesta
                                            </span>
                                        )}
                                        {isCorrectOption && (
                                            <span className="px-2.5 py-1 rounded-full bg-green-600 text-white text-[10px] font-black uppercase tracking-widest">
                                                Correcta
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        }

        if (questionType === 'fill_blanks' || questionType === 'drop_down') {
            const expectedAnswers = typeof correctAnswer === 'object' && !Array.isArray(correctAnswer) ? correctAnswer : {};

            return (
                <div className="space-y-6">
                    <div className="p-6 md:p-8 bg-gray-50 dark:bg-[#0a0c10]/40 rounded-[2rem] border border-gray-100 dark:border-gray-800 leading-relaxed font-medium">
                        {question.metadata.sentence.split(/\[blank\d+\]/).map((part, i, arr) => {
                            const blankId = `blank${i + 1}`;
                            const userValue = questionAnswer?.[blankId] || '';
                            const expectedValue = expectedAnswers?.[blankId] || '';
                            const isBlankCorrect = userValue && userValue === expectedValue;

                            return (
                                <React.Fragment key={blankId}>
                                    {part}
                                    {i < arr.length - 1 && (
                                        <span
                                            className={`inline-flex items-center min-w-[100px] mx-2 px-3 py-1.5 rounded-xl border-2 text-sm font-bold translate-y-[-2px] ${isBlankCorrect
                                                ? 'border-green-300 dark:border-green-500/30 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-300'
                                                : 'border-red-300 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300'
                                                }`}
                                        >
                                            {userValue || 'Sin respuesta'}
                                        </span>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    {questionType === 'fill_blanks' && question.metadata.bank?.length > 0 && (
                        <div className="flex flex-wrap gap-2 justify-center">
                            {question.metadata.bank.map((word, idx) => (
                                <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-bold text-gray-500 select-none">
                                    {word}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        if (questionType === 'order_sequence') {
            const userOrder = Array.isArray(questionAnswer) ? questionAnswer : [];
            const expectedOrder = Array.isArray(correctAnswer) ? correctAnswer : [];

            return (
                <div className="space-y-3">
                    {userOrder.map((item, index) => {
                        const isPositionCorrect = expectedOrder[index] === item;

                        return (
                            <div
                                key={`${item}-${index}`}
                                className={`p-5 rounded-2xl border-2 flex items-center gap-4 ${isPositionCorrect
                                    ? 'border-green-200 dark:border-green-500/20 bg-green-50 dark:bg-green-500/10'
                                    : 'border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/10'
                                    }`}
                            >
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm ${isPositionCorrect
                                    ? 'bg-green-600 text-white'
                                    : 'bg-amber-500 text-white'
                                    }`}>
                                    {index + 1}
                                </div>
                                <span className="font-bold text-sm text-gray-800 dark:text-gray-200">{item}</span>
                            </div>
                        );
                    })}
                </div>
            );
        }

        if (questionType === 'drag_drop') {
            const expectedPairs = typeof correctAnswer === 'object' && !Array.isArray(correctAnswer) ? correctAnswer : {};

            return (
                <div className="grid grid-cols-1 gap-4">
                    {question.metadata.pairs.map((pair, index) => {
                        const userValue = questionAnswer?.[pair.key] || 'Sin respuesta';
                        const isPairCorrect = userValue === expectedPairs[pair.key];

                        return (
                            <div
                                key={`${pair.key}-${index}`}
                                className={`p-5 rounded-[1.75rem] border-2 ${isPairCorrect
                                    ? 'border-green-200 dark:border-green-500/20 bg-green-50 dark:bg-green-500/10'
                                    : 'border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/10'
                                    }`}
                            >
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{pair.key}</p>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">{userValue}</p>
                            </div>
                        );
                    })}
                </div>
            );
        }

        if (questionType === 'match_columns' || questionType === 'categorize') {
            const categories = questionType === 'match_columns' ? question.metadata.left : question.metadata.categories;
            const currentSelection = questionAnswer || {};
            const expectedSelection = typeof correctAnswer === 'object' && !Array.isArray(correctAnswer) ? correctAnswer : {};

            return (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {categories.map((category) => {
                        const userItems = currentSelection[category] || [];
                        const expectedItems = expectedSelection[category] || [];
                        const isCategoryCorrect = arraysMatchUnordered(userItems, expectedItems);

                        return (
                            <div
                                key={category}
                                className={`p-5 rounded-[2rem] border-2 min-h-[180px] ${isCategoryCorrect
                                    ? 'border-green-200 dark:border-green-500/20 bg-green-50 dark:bg-green-500/10'
                                    : 'border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/10'
                                    }`}
                            >
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-4">
                                    {category}
                                </p>
                                <div className="space-y-2">
                                    {userItems.length > 0 ? userItems.map((item) => (
                                        <div key={item} className="px-3 py-2 rounded-xl bg-white/80 dark:bg-slate-950/40 text-sm font-bold text-gray-700 dark:text-gray-200">
                                            {item}
                                        </div>
                                    )) : (
                                        <p className="text-sm italic text-gray-500 dark:text-gray-400">Sin elementos asignados.</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        }

        return (
            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-[#0a0c10]/40 border border-gray-100 dark:border-gray-800">
                <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{formatAnswer(questionAnswer)}</p>
            </div>
        );
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const { data } = await api.post(`/api/quiz/${quiz._id}/submit`, { answers });
            setResult(data);

            // Fetch expert recommendations (RF4)
            if (data.attemptId) {
                try {
                    const recRes = await api.get(`/api/quiz/recommendations/${data.attemptId}`);
                    setRecommendations(recRes.data);
                } catch (recErr) {
                    console.error("Error fetching recommendations:", recErr);
                }
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Hubo un problema al enviar tus resultados. Por favor, intenta de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (!result) {
            return;
        }

        const details = result.questionDetails || [];
        const firstIncorrectIndex = details.findIndex((detail) => !detail.isCorrect);

        setShowResolvedReview(false);
        setCurrentQuestionIndex(firstIncorrectIndex >= 0 ? firstIncorrectIndex : 0);
        setShowReviewGuidance(false);
    }, [result]);

    useEffect(() => {
        setShowReviewGuidance(false);
    }, [currentQuestionIndex, showResolvedReview]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#fafafb] dark:bg-[#0a0c10]">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full" />
        </div>
    );

    if (!quiz) return <NotFound />;

    if (result) {
        const isDiagnostic = id === 'diagnostic' || id === 'diagnostico';
        const questionDetails = result.questionDetails || [];
        const isAccreditationQuiz = quiz.scope === 'course';
        const totalQuestions = quiz.questions?.length || questionDetails.length || 0;
        const correctCount = typeof result.correctCount === 'number'
            ? result.correctCount
            : questionDetails.filter((detail) => detail.isCorrect).length;
        const incorrectCount = questionDetails.length > 0
            ? questionDetails.filter((detail) => !detail.isCorrect).length
            : Math.max(totalQuestions - correctCount, 0);
        const reviewAreas = recommendations?.areasToReview || [];
        const reviewPlatforms = recommendations?.platformsToReview || [];
        const canReviewResolvedExam = !isAccreditationQuiz && questionDetails.length > 0;
        const currentReviewQuestion = quiz.questions[currentQuestionIndex];
        const currentReviewDetail = questionDetails[currentQuestionIndex] || null;
        const currentReviewLessons = currentReviewDetail?.guidedLessons || [];
        const reviewProgress = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;
        const firstIncorrectDetail = questionDetails.find((detail) => !detail.isCorrect);
        const minimumScore = quiz.minPassing || 80;
        const performanceLevelMap = {
            Alto: {
                title: isDiagnostic ? 'Riesgo alto' : 'Requiere refuerzo',
                description: isDiagnostic
                    ? 'Hay varias areas sensibles por revisar.'
                    : 'Tu puntaje quedo lejos de la meta actual.',
            },
            Medio: {
                title: isDiagnostic ? 'Riesgo medio' : 'En progreso',
                description: isDiagnostic
                    ? 'Hay avances, pero aun conviene reforzar varios puntos.'
                    : 'Vas avanzando, pero aun hay temas por consolidar.',
            },
            Bajo: {
                title: isDiagnostic ? 'Riesgo bajo' : 'Buen dominio',
                description: isDiagnostic
                    ? 'El intento refleja una base de proteccion mas solida.'
                    : 'Tu resultado muestra un manejo solido de los temas.',
            },
        };
        const performanceLevel = performanceLevelMap[result.riskLevel] || {
            title: result.riskLevel || 'Sin dato',
            description: isDiagnostic
                ? 'Lectura general del nivel de riesgo.'
                : 'Lectura general del resultado.',
        };
        const resultStatusLabel = result.passed
            ? (isAccreditationQuiz ? 'Acreditado' : 'Aprobada')
            : (isAccreditationQuiz ? 'No acreditado' : 'Reforzar');
        const resultStatusMessage = result.passed
            ? incorrectCount === 0
                ? 'Respondiste correctamente todos los reactivos de este intento.'
                : `Superaste la meta de ${minimumScore}% y quedaron ${incorrectCount} reactivos que aun conviene revisar.`
            : `Obtuviste ${result.score}% y la meta es ${minimumScore}%. Antes del siguiente intento conviene reforzar ${incorrectCount} reactivos.`;
        const focusItems = [...reviewAreas, ...reviewPlatforms].slice(0, 4);
        const compactNextStep = canReviewResolvedExam
            ? 'Puedes abrir el examen resuelto para revisar cada reactivo.'
            : isAccreditationQuiz
                ? 'Este examen no muestra respuestas; usa las recomendaciones antes del siguiente intento.'
                : 'Continua con las lecciones sugeridas antes del siguiente intento.';

        if (showResolvedReview && canReviewResolvedExam && currentReviewQuestion && currentReviewDetail) {
            return (
                <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] text-gray-900 dark:text-gray-100 py-8 md:py-10 xl:py-12 px-4 sm:px-6 xl:px-8 transition-colors duration-500">
                    <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto w-full space-y-6 lg:space-y-0 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px] lg:gap-6 xl:gap-8 lg:items-start">
                        <div className="space-y-4 lg:col-span-2">
                            <div className="flex flex-col xl:flex-row xl:justify-between xl:items-end gap-5 mb-4">
                                <div className="flex-1 min-w-0 space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                                        Revision guiada
                                    </p>
                                    <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white leading-tight max-w-4xl">
                                        {quiz.title}
                                    </h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 italic max-w-3xl">
                                        Vuelves a ver el examen ya resuelto. Las respuestas quedan bloqueadas y puedes navegar entre reactivos sin paneles cargados.
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-3 xl:justify-end">
                                    <div className="px-4 py-3 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-gray-100 dark:border-gray-800 shadow-sm text-center min-w-[110px]">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Reactivo</p>
                                        <p className="text-lg font-black text-gray-900 dark:text-white">
                                            {currentQuestionIndex + 1}
                                            <span className="text-gray-400 dark:text-gray-600"> / {totalQuestions}</span>
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setShowResolvedReview(false)}
                                        className="px-5 py-3 rounded-2xl bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-black text-[10px] uppercase tracking-widest hover:border-indigo-400 transition-all"
                                    >
                                        Volver al resumen
                                    </button>
                                </div>
                            </div>

                            <div className="w-full bg-gray-200 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${reviewProgress}%` }}
                                    className="h-full bg-indigo-600 dark:bg-indigo-500"
                                />
                            </div>
                        </div>

                        <div className="bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl rounded-[2rem] border border-gray-100 dark:border-gray-800 p-5 shadow-lg shadow-indigo-500/5 space-y-5 lg:col-start-2 lg:row-start-2 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                                    Navegacion de revision
                                </p>
                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                                    Verde = correcta, rojo = por revisar
                                </p>
                            </div>

                            <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-3 gap-2">
                                {questionDetails.map((detail, index) => {
                                    const isCurrent = index === currentQuestionIndex;

                                    return (
                                        <button
                                            key={`${detail.questionId}-${index}`}
                                            onClick={() => setCurrentQuestionIndex(index)}
                                            aria-label={`Ir al reactivo ${index + 1}`}
                                            className={`h-12 rounded-2xl border-2 flex items-center justify-center gap-2 font-black text-sm transition-all ${isCurrent
                                                ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                                : detail.isCorrect
                                                    ? 'border-green-200 dark:border-green-500/20 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-300 hover:border-green-400'
                                                    : 'border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300 hover:border-red-400'
                                                }`}
                                        >
                                            <span>{index + 1}</span>
                                            {detail.isCorrect ? (
                                                <CheckCircle className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-green-500 dark:text-green-400'}`} />
                                            ) : (
                                                <ShieldAlert className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-red-500 dark:text-red-400'}`} />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-4 rounded-2xl bg-green-50/70 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-green-600 dark:text-green-400 mb-1">Correctas</p>
                                    <p className="text-xl font-black text-green-600 dark:text-green-300">{correctCount}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-red-50/70 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-red-600 dark:text-red-400 mb-1">Por revisar</p>
                                    <p className="text-xl font-black text-red-600 dark:text-red-300">{incorrectCount}</p>
                                </div>
                            </div>

                            <p className="text-[11px] text-gray-500 dark:text-gray-400 italic leading-relaxed">
                                Esta vista se habilita para evaluaciones formativas. El examen final acreditable del curso no muestra este desglose.
                            </p>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`review-${currentQuestionIndex}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[32px] xl:rounded-[40px] border border-gray-100 dark:border-gray-800 p-5 sm:p-6 xl:p-8 shadow-2xl shadow-indigo-500/5 min-h-[420px] xl:min-h-[calc(100vh-12rem)] flex flex-col lg:col-start-1 lg:row-start-2"
                            >
                                <div className="flex-1 flex-grow space-y-6">
                                    <div className="space-y-3">
                                        <div className="flex flex-wrap items-center gap-3">
                                            {currentReviewQuestion.platform && (
                                                <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-lg">
                                                    Topico: {currentReviewQuestion.platform}
                                                </span>
                                            )}
                                            <span className={`px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest ${currentReviewDetail.isCorrect
                                                ? 'bg-green-50 dark:bg-green-500/10 border-green-100 dark:border-green-500/20 text-green-600 dark:text-green-400'
                                                : 'bg-red-50 dark:bg-red-500/10 border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400'
                                                }`}>
                                                {currentReviewDetail.isCorrect ? 'Correcta' : 'Por revisar'}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
                                            {currentReviewQuestion.text}
                                        </h3>
                                    </div>

                                    {renderResolvedQuestionContent(currentReviewQuestion, currentReviewDetail)}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className={`p-5 rounded-2xl ${currentReviewDetail.isCorrect ? 'bg-green-50/60 dark:bg-green-500/5' : 'bg-red-50/60 dark:bg-red-500/5'}`}>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Tu respuesta</span>
                                            <p className={`text-sm font-bold leading-relaxed ${currentReviewDetail.isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                                                {formatAnswer(currentReviewDetail.userAnswer)}
                                            </p>
                                        </div>

                                        <div className="p-5 rounded-2xl bg-gray-50 dark:bg-[#0a0c10]/40">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2 block">
                                                {currentReviewDetail.isCorrect ? 'Resultado' : 'Respuesta esperada'}
                                            </span>
                                            <p className={`text-sm font-bold leading-relaxed ${currentReviewDetail.isCorrect ? 'text-green-700 dark:text-green-300' : 'text-gray-800 dark:text-gray-200'}`}>
                                                {currentReviewDetail.isCorrect
                                                    ? 'Tu respuesta coincide con la solucion esperada.'
                                                    : formatAnswer(currentReviewDetail.correctAnswer)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <button
                                            onClick={() => setShowReviewGuidance((prev) => !prev)}
                                            className="w-full flex items-center justify-between gap-3 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-500/10 bg-indigo-50/60 dark:bg-indigo-500/5 text-left hover:border-indigo-400 transition-all"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <Zap className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                                                <div className="min-w-0">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                                                        Guia de aprendizaje
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        {showReviewGuidance ? 'Ocultar explicacion y repaso sugerido.' : 'Ver explicacion y lecciones para repasar.'}
                                                    </p>
                                                </div>
                                            </div>
                                            <ChevronRight className={`w-4 h-4 text-indigo-500 transition-transform ${showReviewGuidance ? 'rotate-90' : ''}`} />
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {showReviewGuidance && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="p-5 bg-indigo-50/60 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/10 rounded-2xl space-y-5">
                                                        <div>
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">
                                                                Que aprender aqui
                                                            </p>
                                                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">
                                                                {currentReviewDetail.explanation || 'Esta respuesta no tiene comentarios adicionales.'}
                                                            </p>
                                                        </div>

                                                        {(currentReviewDetail.riskArea || currentReviewDetail.platform) && (
                                                            <div className="flex flex-wrap gap-2">
                                                                {currentReviewDetail.riskArea && (
                                                                    <span className="px-3 py-1 rounded-full bg-white/80 dark:bg-slate-950/40 text-indigo-600 dark:text-indigo-300 text-[10px] font-black uppercase tracking-widest border border-indigo-100 dark:border-indigo-500/10">
                                                                        {currentReviewDetail.riskArea}
                                                                    </span>
                                                                )}
                                                                {currentReviewDetail.platform && (
                                                                    <span className="px-3 py-1 rounded-full bg-white/80 dark:bg-slate-950/40 text-gray-700 dark:text-gray-200 text-[10px] font-black uppercase tracking-widest border border-gray-100 dark:border-gray-700">
                                                                        {currentReviewDetail.platform}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}

                                                        {currentReviewLessons.length > 0 ? (
                                                            <div className="space-y-3">
                                                                <p className="text-[9px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                                                                    Lecciones para repasar
                                                                </p>
                                                                <div className="space-y-2">
                                                                    {currentReviewLessons.map((lesson) => (
                                                                        <button
                                                                            key={lesson._id}
                                                                            onClick={() => navigate(`/lecciones/${lesson._id}`)}
                                                                            className="w-full p-4 rounded-2xl border border-indigo-100 dark:border-indigo-500/10 bg-white dark:bg-[#161b22] text-left hover:border-indigo-400 transition-all"
                                                                        >
                                                                            <div className="flex items-center justify-between gap-3">
                                                                                <div className="min-w-0">
                                                                                    <p className="text-sm font-bold text-gray-900 dark:text-white leading-snug">
                                                                                        {getLessonDisplayTitle(lesson.title, lesson.type)}
                                                                                    </p>
                                                                                    {lesson.duration ? (
                                                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                                                            {lesson.duration} min de repaso
                                                                                        </p>
                                                                                    ) : null}
                                                                                </div>
                                                                                <ChevronRight className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                                                                            </div>
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-950/30 border border-gray-100 dark:border-gray-800">
                                                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                                                    No hay una leccion vinculada directamente a este reactivo, pero puedes seguir con el repaso sugerido del intento.
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-between items-center pt-10 mt-10 border-t border-gray-100 dark:border-gray-800 gap-6">
                                    <button
                                        onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                                        disabled={currentQuestionIndex === 0}
                                        className="flex items-center gap-2 text-gray-400 dark:text-gray-500 font-bold hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-0"
                                    >
                                        <ChevronLeft className="w-5 h-5" /> Anterior
                                    </button>

                                    <button
                                        onClick={() => setCurrentQuestionIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                                        disabled={currentQuestionIndex === totalQuestions - 1}
                                        className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-5 bg-white dark:bg-gray-100 text-gray-900 border border-gray-200 dark:border-transparent font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-all disabled:opacity-50"
                                    >
                                        Siguiente <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] text-gray-900 dark:text-gray-100 py-8 sm:py-12 px-4 transition-colors duration-500">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-3xl mx-auto bg-white dark:bg-[#161b22] rounded-[2rem] sm:rounded-[3rem] border border-gray-100 dark:border-gray-800 p-6 sm:p-8 md:p-12 shadow-2xl overflow-hidden relative"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-indigo-500" />

                    <div className="text-center space-y-8">
                        {/* Score Header */}
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
                            <p className="text-sm font-medium italic text-gray-500">
                                {result.passed ? '¡Excelente trabajo! Has demostrado dominio del tema.' : 'No has alcanzado la calificación mínima. ¡No te rindas!'}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-4 px-6 bg-gray-50 dark:bg-gray-800/40 rounded-3xl border border-gray-100 dark:border-white/5">
                            <div className="text-center">
                                <p className="text-[10px] uppercase font-black tracking-widest text-gray-400">Aciertos</p>
                                <p className="text-xl font-black text-green-500">{correctCount}/{totalQuestions}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] uppercase font-black tracking-widest text-gray-400">Puntaje</p>
                                <p className="text-xl font-black text-indigo-500">{result.score}%</p>
                            </div>
                        </div>

                        {/* Diagnostic Feedback (Vulnerabilities or Mastery) */}
                        {isDiagnostic && (
                            /* ... diagnostic logic ... */
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                                {result.score >= 90 ? (
                                    <div className="p-8 bg-indigo-500/5 border border-indigo-500/10 rounded-[2rem] space-y-4 col-span-2 text-center">
                                        <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/30">
                                            <Trophy className="text-white w-8 h-8" />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Blindaje Total Detectado</p>
                                            <p className="text-base text-gray-700 dark:text-gray-300 font-medium leading-relaxed italic">
                                                ¡Excelente desempeño! Has demostrado un dominio superior de la seguridad digital.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-2xl space-y-2">
                                            <div className="flex items-center gap-2 mb-1">
                                                <ShieldAlert className="w-4 h-4 text-red-500" />
                                                <p className="text-[10px] font-black uppercase tracking-widest text-red-600 dark:text-red-400">Vulnerabilidades</p>
                                            </div>
                                            <ul className="text-[11px] text-gray-600 dark:text-gray-400 space-y-1 italic list-disc pl-4 font-serif">
                                                <li>Configuración de Privacidad</li>
                                                <li>Gestión de Identidad Digital</li>
                                            </ul>
                                        </div>
                                        <div className="p-6 bg-green-500/5 border border-green-500/10 rounded-2xl space-y-2">
                                            <div className="flex items-center gap-2 mb-1">
                                                <ShieldCheck className="w-4 h-4 text-green-500" />
                                                <p className="text-[10px] font-black uppercase tracking-widest text-green-600 dark:text-green-400">Estrategias Dominadas</p>
                                            </div>
                                            <ul className="text-[11px] text-gray-600 dark:text-gray-400 space-y-1 italic list-disc pl-4 font-serif">
                                                <li>Detección de Enlaces</li>
                                                <li>Conciencia de Riesgos</li>
                                            </ul>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        <div className="space-y-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                            {/* Recommendations if any */}
                            {recommendations?.recommendedLessons?.length > 0 && (
                                <div className="space-y-3">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-2">Repaso sugerido</h3>
                                    {recommendations.recommendedLessons.map((lesson) => (
                                        <div key={lesson._id} className="p-4 bg-gray-50 dark:bg-[#0a0c10]/40 rounded-2xl border border-gray-100 flex items-center justify-between group hover:border-indigo-500/30 transition-all cursor-pointer" onClick={() => navigate(`/lecciones/${lesson._id}`)}>
                                            <div className="flex items-center gap-4 text-left">
                                                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-600 font-bold"><BookOpen className="w-4 h-4" /></div>
                                                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{getLessonDisplayTitle(lesson.title, lesson.type)}</p>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-gray-400 transition-colors" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                                <div className="p-5 rounded-[2rem] bg-green-50/60 dark:bg-green-500/5 border border-green-100 dark:border-green-500/10">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-green-600 dark:text-green-400 mb-2">Dominadas</p>
                                    <p className="text-2xl font-black text-green-600 dark:text-green-400">{correctCount}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 italic">Reactivos resueltos correctamente.</p>
                                </div>
                                <div className="p-5 rounded-[2rem] bg-red-50/60 dark:bg-red-500/5 border border-red-100 dark:border-red-500/10">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-red-600 dark:text-red-400 mb-2">Por Revisar</p>
                                    <p className="text-2xl font-black text-red-600 dark:text-red-400">{incorrectCount}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 italic">Reactivos que conviene revisar a detalle.</p>
                                </div>
                                <div className="p-5 rounded-[2rem] bg-indigo-50/60 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/10">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">
                                        {isDiagnostic ? 'Nivel de riesgo' : 'Resultado general'}
                                    </p>
                                    <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{performanceLevel.title}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 italic">{performanceLevel.description}</p>
                                </div>
                            </div>

                            <div className="p-6 md:p-8 bg-gray-50/80 dark:bg-[#0a0c10]/50 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] space-y-6 text-left">
                                <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-5">
                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">Revision de resultados</p>
                                            <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white">Resumen</h3>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div className="min-w-0 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-500/10 bg-indigo-50/60 dark:bg-indigo-500/5">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-1">Estado</p>
                                                <p className="text-lg font-black text-gray-900 dark:text-white leading-tight break-words">{resultStatusLabel}</p>
                                            </div>
                                            <div className="min-w-0 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#161b22]">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Meta</p>
                                                <p className="text-lg font-black text-gray-900 dark:text-white leading-tight">{minimumScore}%</p>
                                            </div>
                                            <div className="min-w-0 p-4 rounded-2xl border border-red-100 dark:border-red-500/10 bg-red-50/60 dark:bg-red-500/5 sm:col-span-2">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-red-600 dark:text-red-400 mb-1">Pendientes</p>
                                                <p className="text-lg font-black text-gray-900 dark:text-white leading-tight">{incorrectCount} por revisar</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                                {resultStatusMessage}
                                            </p>

                                            {focusItems.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {focusItems.map((item) => (
                                                        <span key={item} className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 text-[10px] font-black uppercase tracking-widest border border-indigo-100 dark:border-indigo-500/10">
                                                            {item}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {recommendations?.message && incorrectCount > 0 && (
                                                <p className="text-sm text-gray-500 dark:text-gray-400 italic leading-relaxed">
                                                    {recommendations.message}
                                                </p>
                                            )}

                                            <p className="text-sm font-bold text-gray-800 dark:text-gray-200 leading-relaxed break-words">
                                                {compactNextStep}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-5 rounded-[2rem] bg-white dark:bg-[#161b22] border border-gray-100 dark:border-gray-800 space-y-4">
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">Revision</p>
                                            <h4 className="text-lg font-black text-gray-900 dark:text-white">
                                                {canReviewResolvedExam ? 'Ver examen resuelto' : 'Acreditacion protegida'}
                                            </h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 break-words">
                                                {canReviewResolvedExam
                                                    ? 'Navega por reactivos con tus respuestas bloqueadas.'
                                                    : 'No se muestra desglose por reactivo en este examen.'}
                                            </p>
                                        </div>

                                        {canReviewResolvedExam ? (
                                            <>
                                                <p className="text-sm font-bold text-gray-800 dark:text-gray-200 leading-relaxed break-words">
                                                    {firstIncorrectDetail
                                                        ? 'La revision abre en el primer reactivo pendiente.'
                                                        : 'La revision abre el intento completo.'}
                                                </p>

                                                <button
                                                    onClick={() => setShowResolvedReview(true)}
                                                    className="w-full py-4 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
                                                >
                                                    Abrir examen resuelto
                                                </button>
                                            </>
                                        ) : (
                                            <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20">
                                                <p className="text-sm font-bold text-amber-700 dark:text-amber-300 leading-relaxed">
                                                    Solo mostramos resumen, puntaje y recomendaciones. No se habilita la revision reactivo por reactivo.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Review Section */}
                            <div className="hidden space-y-6 text-left">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 text-center mb-6">Análisis Detallado Por Reactivo</h3>
                                <div className="space-y-6">
                                    {(result.questionDetails || []).map((detail, idx) => (
                                        <div key={idx} className={`p-8 rounded-[2rem] border-2 transition-all overflow-hidden relative ${detail.isCorrect 
                                            ? 'bg-white dark:bg-[#161b22] border-green-500/20' 
                                            : 'bg-white dark:bg-[#161b22] border-red-500/20 shadow-lg shadow-red-500/5'}`}>
                                            
                                            {/* Side indicator strip */}
                                            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${detail.isCorrect ? 'bg-green-500' : 'bg-red-500'}`} />

                                            <div className="space-y-6">
                                                <div className="flex justify-between items-start gap-4">
                                                    <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 leading-snug">
                                                        {idx + 1}. {detail.text}
                                                    </h4>
                                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${detail.isCorrect ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                                                        {detail.isCorrect ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className={`p-4 rounded-2xl ${detail.isCorrect ? 'bg-green-50/50 dark:bg-green-500/5' : 'bg-red-50/50 dark:bg-red-500/5'}`}>
                                                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Tu Respuesta</span>
                                                        <p className={`text-xs font-bold leading-relaxed ${detail.isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                                                            {formatAnswer(detail.userAnswer)}
                                                        </p>
                                                    </div>
                                                    {!detail.isCorrect && (
                                                        <div className="p-4 bg-green-50/50 dark:bg-green-500/5 rounded-2xl">
                                                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Respuesta Correcta</span>
                                                            <p className="text-xs font-bold text-green-700 dark:text-green-300 leading-relaxed">
                                                                {formatAnswer(detail.correctAnswer)}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                {!detail.isCorrect && detail.explanation && (
                                                    <div className="p-5 bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-100/50 dark:border-indigo-500/10 rounded-2xl">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Zap className="w-3.5 h-3.5 text-indigo-500" />
                                                            <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Tip de Aprendizaje</span>
                                                        </div>
                                                        <p className="text-xs text-gray-600 dark:text-gray-400 font-serif italic leading-relaxed">
                                                            {detail.explanation}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col md:flex-row gap-3 pt-6">
                            <button
                                onClick={handleRetry}
                                className="flex-1 py-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-gray-200 transition-all font-inter"
                            >
                                Reiniciar Examen
                            </button>
                            <button
                                onClick={() => navigate('/panel')}
                                className="flex-1 py-4 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 font-inter"
                            >
                                Continuar al Panel
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
    const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
    const showQuestionNavigator = (quiz.questions?.length || 0) > 1;
    const answeredCount = quiz.questions.filter((question) =>
        isQuestionAnswered(question, answers[question._id])
    ).length;
    const firstUnansweredIndex = quiz.questions.findIndex((question) =>
        !isQuestionAnswered(question, answers[question._id])
    );
    const currentQuestionAnswered = isQuestionAnswered(currentQuestion, answers[currentQuestion._id]);

    const navigateToQuestion = (targetIndex) => {
        if (targetIndex < 0 || targetIndex >= quiz.questions.length) {
            return;
        }

        setCurrentQuestionIndex(targetIndex);
    };

    return (
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] text-gray-900 dark:text-gray-100 py-8 md:py-10 xl:py-12 px-4 sm:px-6 xl:px-8 transition-colors duration-500">
            <div className={showQuestionNavigator
                ? 'max-w-7xl 2xl:max-w-[1500px] mx-auto w-full space-y-6 lg:space-y-0 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px] lg:gap-6 xl:gap-8 lg:items-start'
                : 'max-w-7xl 2xl:max-w-[1500px] mx-auto w-full space-y-6'
            }>
                {/* Progress Header */}
                <div className="space-y-4 lg:col-span-2">
                    <div className="flex flex-col xl:flex-row xl:justify-between xl:items-end gap-5 mb-4">
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-1">Evaluación en progreso</p>
                            <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white leading-tight max-w-4xl">
                                {quiz.title}
                            </h1>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 xl:justify-end">
                            <div className="px-4 py-3 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-gray-100 dark:border-gray-800 shadow-sm text-center min-w-[110px]">
                                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Pregunta</p>
                                <p className="text-lg font-black text-gray-900 dark:text-white">
                                    {currentQuestionIndex + 1}
                                    <span className="text-gray-400 dark:text-gray-600"> / {quiz.questions.length}</span>
                                </p>
                            </div>
                            <div className="px-4 py-3 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-gray-100 dark:border-gray-800 shadow-sm text-center min-w-[120px]">
                                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Respondidas</p>
                                <p className="text-lg font-black text-green-600 dark:text-green-400">{answeredCount}/{quiz.questions.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-indigo-600 dark:bg-indigo-500"
                        />
                    </div>
                </div>

                {showQuestionNavigator && (
                    <div className="bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl rounded-[2rem] border border-gray-100 dark:border-gray-800 p-5 shadow-lg shadow-indigo-500/5 space-y-4 lg:col-start-2 lg:row-start-2 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                                    Navegacion del examen
                                </p>
                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                                    {answeredCount} de {quiz.questions.length} preguntas respondidas
                                </p>
                            </div>

                            {firstUnansweredIndex >= 0 ? (
                                <button
                                    onClick={() => navigateToQuestion(firstUnansweredIndex)}
                                    className="w-full md:w-auto px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-300 font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all"
                                >
                                    Ir a la pendiente {firstUnansweredIndex + 1}
                                </button>
                            ) : (
                                <div className="w-full md:w-auto px-4 py-2 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 text-green-600 dark:text-green-300 font-black text-[10px] uppercase tracking-widest text-center">
                                    Todas respondidas
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-3 gap-2">
                            {quiz.questions.map((question, index) => {
                                const isCurrent = index === currentQuestionIndex;
                                const isAnswered = isQuestionAnswered(question, answers[question._id]);

                                return (
                                    <button
                                        key={question._id}
                                        onClick={() => navigateToQuestion(index)}
                                        aria-label={`Ir a la pregunta ${index + 1}`}
                                        className={`h-12 rounded-2xl border-2 flex items-center justify-center gap-2 font-black text-sm transition-all ${isCurrent
                                            ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                            : isAnswered
                                                ? 'border-green-200 dark:border-green-500/20 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-300 hover:border-green-400'
                                                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0c10]/60 text-gray-500 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-500/40'
                                            }`}
                                    >
                                        <span>{index + 1}</span>
                                        {isAnswered && (
                                            <CheckCircle className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-green-500 dark:text-green-400'}`} />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        <p className="text-[11px] text-gray-500 dark:text-gray-400 italic leading-relaxed">
                            En escritorio este panel permanece visible al costado derecho mientras haces scroll. El envio se habilita cuando todo el examen este contestado.
                        </p>
                    </div>
                )}

                {/* Question Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[32px] xl:rounded-[40px] border border-gray-100 dark:border-gray-800 p-5 sm:p-6 xl:p-8 shadow-2xl shadow-indigo-500/5 min-h-[420px] xl:min-h-[calc(100vh-12rem)] flex flex-col lg:col-start-1 lg:row-start-2"
                    >
                        <div className="flex-1 flex-grow space-y-6">
                            <div className="space-y-2 relative">
                                {isAdmin && (
                                    <div className="mb-4 px-3 py-1 w-fit bg-amber-500/10 border border-amber-500/20 text-amber-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full flex items-center gap-2 italic">
                                        <ShieldAlert className="w-3.5 h-3.5" /> Modo de revisión del administrador
                                    </div>
                                )}
                                {currentQuestion.platform && (
                                    <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-lg">
                                        Tópico: {currentQuestion.platform}
                                    </span>
                                )}
                                <h3 className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
                                    {currentQuestion.text}
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {currentQuestion.type === 'multiple_selection' ? (
                                    currentQuestion.options.map((opt, optIdx) => (
                                        <button
                                            key={optIdx}
                                            onClick={() => handleMultiSelect(currentQuestion._id, opt._id)}
                                            className={`flex items-center justify-between p-6 rounded-[1.5rem] border-2 transition-all text-left ${answers[currentQuestion._id]?.includes(opt._id)
                                                ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-500/5 text-gray-900 dark:text-white'
                                                : 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0a0c10]/40 text-gray-600 dark:text-gray-400 hover:border-indigo-200 dark:hover:border-gray-700'
                                                }`}
                                        >
                                            <span className="font-bold pr-4">{opt.text}</span>
                                            <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${answers[currentQuestion._id]?.includes(opt._id)
                                                ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-600 dark:bg-indigo-500'
                                                : 'border-gray-200 dark:border-gray-700'
                                                }`}>
                                                {answers[currentQuestion._id]?.includes(opt._id) && <CheckCircle className="w-4 h-4 text-white dark:text-black fill-current" />}
                                            </div>
                                        </button>
                                    ))
                                ) : currentQuestion.type === 'drag_drop' ? (
                                    <div className="space-y-4">
                                        <p className="text-center text-[10px] text-gray-500 italic mb-1">Desplaza hacia arriba o abajo las fichas de la derecha para alinearlas con su concepto.</p>
                                        <div className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] gap-3 items-start">
                                            {/* Fixed Labels */}
                                            <div className="space-y-3">
                                                {currentQuestion.metadata.pairs.map((pair, idx) => (
                                                    <div key={idx} className="min-h-[80px] h-auto p-4 bg-white dark:bg-[#0a0c10] border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-3xl flex items-center justify-center font-black text-[10px] uppercase tracking-widest text-indigo-600 dark:text-indigo-400 text-center">
                                                        {pair.key}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Connectors */}
                                            <div className="hidden md:flex flex-col space-y-3 justify-around py-4 h-full">
                                                {currentQuestion.metadata.pairs.map((_, idx) => (
                                                    <div key={idx} className="min-h-[80px] flex items-center justify-center text-gray-200"><ChevronRight className="w-6 h-6" /></div>
                                                ))}
                                            </div>
                                            {/* Swapable Definitions */}
                                            <div className="space-y-3 relative">
                                                {(answers[`${currentQuestion._id}_order`] || []).map((val, idx) => (
                                                    <motion.div
                                                        key={val}
                                                        layout
                                                        drag="y"
                                                        dragSnapToOrigin={true}
                                                        dragElastic={0}
                                                        animate={{ x: 0, y: 0 }}
                                                        onDragEnd={(e, info) => {
                                                            const height = 80 + 12; // card height + gap
                                                            const moveIndex = Math.round(info.offset.y / height);
                                                            const targetIndex = idx + moveIndex;
                                                            const order = [...(answers[`${currentQuestion._id}_order`] || [])];
                                                            
                                                            if (targetIndex >= 0 && targetIndex < order.length && targetIndex !== idx) {
                                                                const temp = order[idx];
                                                                order[idx] = order[targetIndex];
                                                                order[targetIndex] = temp;

                                                                const resultObj = {};
                                                                currentQuestion.metadata.pairs.forEach((p, i) => {
                                                                    resultObj[p.key] = order[i];
                                                                });

                                                                setAnswers(prev => ({
                                                                    ...prev,
                                                                    [`${currentQuestion._id}_order`]: order,
                                                                    [currentQuestion._id]: resultObj
                                                                }));
                                                            }
                                                        }}
                                                        whileDrag={{ 
                                                            zIndex: 50, 
                                                            scale: 1.05, 
                                                            boxShadow: "0px 20px 40px rgba(99, 102, 241, 0.2)" 
                                                        }}
                                                        className="min-h-[80px] h-auto p-4 bg-white dark:bg-[#161b22] border-2 border-indigo-500/20 rounded-3xl cursor-grab active:cursor-grabbing flex items-center gap-4 group shadow-lg shadow-indigo-500/5 hover:border-indigo-500 select-none"
                                                    >
                                                        <div className="p-2 bg-indigo-500/10 rounded-xl flex-shrink-0">
                                                            <Layers className="w-3 h-3 text-indigo-500" />
                                                        </div>
                                                        <span className="text-[11px] md:text-xs font-bold text-gray-800 dark:text-gray-200 leading-tight flex-1">
                                                            {val}
                                                        </span>
                                                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <GripVertical className="w-3 h-3 text-gray-400" />
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : currentQuestion.type === 'fill_blanks' ? (
                                    <div className="space-y-4 sm:space-y-8">
                                        <div className="p-5 sm:p-8 bg-gray-50 dark:bg-[#0a0c10]/40 rounded-[2rem] border border-gray-100 dark:border-gray-800 leading-relaxed font-medium">
                                            {currentQuestion.metadata.sentence.split(/\[blank\d+\]/).map((part, i, arr) => (
                                                <React.Fragment key={i}>
                                                    {part}
                                                    {i < arr.length - 1 && (() => {
                                                        const blankId = `blank${i + 1}`;
                                                        const val = answers[currentQuestion._id]?.[blankId] || "";
                                                        const bank = (currentQuestion.metadata.bank || []).map(b => b.toLowerCase());
                                                        const isValid = val.trim().length > 0 && bank.includes(val.trim().toLowerCase());
                                                        const isTyping = val.trim().length > 0 && !isValid;

                                                        return (
                                                            <input
                                                                key={blankId}
                                                                type="text"
                                                                value={val}
                                                                onChange={(e) => {
                                                                    const current = answers[currentQuestion._id] || {};
                                                                    handleComplexSelect(currentQuestion._id, { ...current, [blankId]: e.target.value });
                                                                }}
                                                                placeholder="..."
                                                                className={`inline-block mx-2 px-3 py-1 bg-white dark:bg-slate-950 border-2 rounded-xl text-center font-bold outline-none transition-all w-32 translate-y-[-2px]
                                                                    ${isValid ? 'border-green-500 text-green-600 shadow-lg shadow-green-500/10 scale-105' : 
                                                                      isTyping ? 'border-amber-400 text-amber-600' : 
                                                                      'border-gray-200 dark:border-gray-800 focus:border-indigo-500'}`}
                                                            />
                                                        );
                                                    })()}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            <p className="w-full text-center text-[10px] uppercase font-black tracking-widest text-gray-400 mb-2">Banco de palabras</p>
                                            {currentQuestion.metadata.bank.map((word, idx) => (
                                                <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-bold text-gray-500 select-none">
                                                    {word}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ) : (currentQuestion.type === 'match_columns' || currentQuestion.type === 'categorize') ? (() => {
                                    const categories = currentQuestion.type === 'match_columns' ? currentQuestion.metadata.left : currentQuestion.metadata.categories;
                                    const allItems = currentQuestion.type === 'match_columns' ? currentQuestion.metadata.right : currentQuestion.metadata.items;
                                    const currentSelection = answers[currentQuestion._id] || {};
                                    
                                    // Items already assigned elsewhere
                                    const assignedItems = Object.values(currentSelection).flat();
                                    const unassignedItems = allItems.filter(item => !assignedItems.includes(item));

                                    return (
                                        <div className="space-y-8">
                                            <div className="text-center space-y-2">
                                                <p className="text-[11px] font-black uppercase tracking-widest text-indigo-500">Clasificación de Conceptos</p>
                                                <p className="text-[10px] text-gray-500 italic">Asigna cada elemento a la categoría que corresponda utilizando el menú o tocando los elementos.</p>
                                            </div>
                                            
                                            {/* Target Zones Grid - Flexible and Responsive */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {categories.map(cat => (
                                                    <div 
                                                        key={cat}
                                                        className="bg-white dark:bg-slate-900/40 border-2 border-indigo-100 dark:border-gray-800 rounded-[2.5rem] p-5 min-h-[160px] flex flex-col shadow-sm transition-all hover:border-indigo-200 dark:hover:border-indigo-900/40"
                                                    >
                                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-5 text-center px-4 py-2 bg-indigo-50 dark:bg-indigo-500/5 rounded-full inline-block self-center">
                                                            {cat}
                                                        </h4>
                                                        <div className="space-y-3 flex-grow">
                                                            {(currentSelection[cat] || []).map(item => (
                                                                <motion.div
                                                                    key={item}
                                                                    layoutId={item}
                                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                                    animate={{ opacity: 1, scale: 1 }}
                                                                    className="p-4 bg-white dark:bg-[#161b22] border border-gray-100 dark:border-gray-800 rounded-2xl text-[11px] font-bold shadow-sm flex items-center justify-between group"
                                                                >
                                                                    <span className="leading-tight text-gray-800 dark:text-gray-200 pr-2">{item}</span>
                                                                    <button 
                                                                        onClick={() => {
                                                                            const newCatList = currentSelection[cat].filter(i => i !== item);
                                                                            handleComplexSelect(currentQuestion._id, { ...currentSelection, [cat]: newCatList });
                                                                        }}
                                                                        className="p-1.5 hover:bg-red-50 dark:hover:bg-red-500/10 text-red-400 rounded-lg transition-colors flex-shrink-0"
                                                                        title="Quitar"
                                                                    >
                                                                        <Check className="w-4 h-4" />
                                                                    </button>
                                                                </motion.div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Unassigned Items Pool */}
                                            {unassignedItems.length > 0 && (
                                                <div className="mt-6 sm:mt-12 p-5 sm:p-8 bg-gray-50 dark:bg-[#0a0c10]/40 border border-gray-100 dark:border-gray-800 rounded-[2rem] sm:rounded-[3rem]">
                                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6 text-center">Elementos Pendientes</h4>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        {unassignedItems.map(item => (
                                                            <div
                                                                key={item}
                                                                className="p-4 bg-white dark:bg-[#161b22] border-2 border-transparent rounded-[1.5rem] shadow-sm flex flex-col gap-3 group hover:border-indigo-500/30 transition-all"
                                                            >
                                                                <span className="text-[11px] font-bold text-gray-800 dark:text-gray-200 leading-tight">
                                                                    {item}
                                                                </span>
                                                                <div className="flex flex-wrap gap-1 mt-1 border-t border-gray-50 dark:border-gray-800 pt-3">
                                                                    {categories.map(cat => (
                                                                        <button
                                                                            key={cat}
                                                                            onClick={() => {
                                                                                const prevList = currentSelection[cat] || [];
                                                                                handleComplexSelect(currentQuestion._id, { 
                                                                                    ...currentSelection, 
                                                                                    [cat]: [...prevList, item] 
                                                                                });
                                                                            }}
                                                                            className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-all border border-indigo-100 dark:border-indigo-500/20"
                                                                        >
                                                                            {cat}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })() : currentQuestion.type === 'order_sequence' ? (
                                    <div className="space-y-6">
                                        <div className="text-center space-y-1">
                                            <p className="text-[10px] text-gray-500 italic">Desplaza los elementos para ordenarlos correctamente.</p>
                                            <p className="text-[9px] font-bold text-indigo-500 bg-indigo-500/5 py-1 px-3 rounded-full inline-block uppercase tracking-widest">Pista: Piensa en el camino que recorre tu información desde que tocas la consola.</p>
                                        </div>
                                        <div className="relative">
                                            {/* Vertical Connect Line */}
                                            <div className="absolute left-[34px] top-6 bottom-6 w-0.5 border-l-2 border-dashed border-gray-100 dark:border-gray-800 z-0" />
                                            
                                            <div className="flex justify-between items-center px-6 mb-4">
                                                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-indigo-400">Inicio</span>
                                                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-indigo-400">Meta</span>
                                            </div>

                                            <Reorder.Group
                                                axis="y"
                                                values={answers[currentQuestion._id] || currentQuestion.metadata.items}
                                                onReorder={(newOrder) => handleComplexSelect(currentQuestion._id, newOrder)}
                                                className="space-y-3 relative z-10"
                                            >
                                                {(answers[currentQuestion._id] || currentQuestion.metadata.items).map((item) => (
                                                    <Reorder.Item
                                                        key={item}
                                                        value={item}
                                                        className="p-5 bg-white dark:bg-[#161b22] border-2 border-gray-100 dark:border-gray-800 rounded-2xl cursor-grab active:cursor-grabbing flex items-center gap-4 group shadow-sm hover:border-indigo-500 transition-colors"
                                                    >
                                                        <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-black text-xs shadow-lg shadow-indigo-500/20">
                                                            {(answers[currentQuestion._id] || currentQuestion.metadata.items).indexOf(item) + 1}
                                                        </div>
                                                        <span className="font-bold flex-grow text-sm text-gray-700 dark:text-gray-200">{item}</span>
                                                        <GripVertical className="w-4 h-4 text-gray-300 group-hover:text-indigo-500" />
                                                    </Reorder.Item>
                                                ))}
                                            </Reorder.Group>
                                        </div>
                                    </div>
                                ) : currentQuestion.type === 'drop_down' ? (
                                    <div className="p-5 sm:p-8 bg-gray-50 dark:bg-[#0a0c10]/40 rounded-[2rem] border border-gray-100 dark:border-gray-800 leading-relaxed font-medium">
                                        {currentQuestion.metadata.sentence.split(/\[blank\d+\]/).map((part, i, arr) => (
                                            <React.Fragment key={i}>
                                                {part}
                                                {i < arr.length - 1 && (
                                                    <select
                                                        className={`inline-block mx-2 px-2 py-1 bg-white dark:bg-gray-800 border-2 rounded-lg font-bold outline-none transition-all translate-y-[-2px] ${answers[currentQuestion._id]?.[`blank${i + 1}`] ? 'border-green-500/50 dark:border-green-500/30 text-green-600 dark:text-green-400' : 'border-indigo-500/30 text-indigo-600 dark:text-indigo-400 focus:border-indigo-500'}`}
                                                        onChange={(e) => {
                                                            const current = answers[currentQuestion._id] || {};
                                                            handleComplexSelect(currentQuestion._id, { ...current, [`blank${i + 1}`]: e.target.value });
                                                        }}
                                                        value={answers[currentQuestion._id]?.[`blank${i + 1}`] || ""}
                                                    >
                                                        <option value="">...</option>
                                                        {currentQuestion.metadata.options[`blank${i + 1}`].map((opt, oi) => (
                                                            <option key={oi} value={opt}>{opt}</option>
                                                        ))}
                                                    </select>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                ) : (
                                    // Default single_choice / multiple_selection / case_study
                                    <div className="flex flex-col gap-4">
                                        {(currentQuestion.options || []).map((opt, optIdx) => {
                                            const isSelected = currentQuestion.type === 'multiple_selection'
                                                ? (answers[currentQuestion._id] || []).includes(opt._id)
                                                : answers[currentQuestion._id] === opt._id;

                                            return (
                                                <button
                                                    key={optIdx}
                                                    onClick={() => {
                                                        if (currentQuestion.type === 'multiple_selection') {
                                                            const current = answers[currentQuestion._id] || [];
                                                            if (current.includes(opt._id)) {
                                                                handleComplexSelect(currentQuestion._id, current.filter(id => id !== opt._id));
                                                            } else {
                                                                handleComplexSelect(currentQuestion._id, [...current, opt._id]);
                                                            }
                                                        } else {
                                                            handleOptionSelect(currentQuestion._id, opt._id);
                                                        }
                                                    }}
                                                    className={`flex items-center justify-between p-6 rounded-[1.5rem] border-2 transition-all group text-left ${isSelected
                                                        ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-500/5 text-gray-900 dark:text-white'
                                                        : 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0a0c10]/40 text-gray-600 dark:text-gray-400 hover:border-indigo-200 dark:hover:border-gray-700'
                                                        }`}
                                                >
                                                    <span className="font-bold pr-4 text-sm">{opt.text}</span>
                                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected
                                                        ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-600 dark:bg-indigo-500'
                                                        : 'border-gray-200 dark:border-gray-700'
                                                        }`}>
                                                        {isSelected && <CheckCircle className="w-4 h-4 text-white fill-current" />}
                                                    </div>
                                                </button>
                                        );
                                    })}
                                </div>
                            )}
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
                                    disabled={(!isAdmin && !isQuizComplete) || isSubmitting}
                                    className="w-full sm:w-auto px-12 py-5 bg-indigo-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                                    ) : (
                                        <>Enviar Resultados <Zap className="w-4 h-4 inline-block fill-current" /></>
                                    )}
                                </button>
                            ) : (
                                <button
                                    onClick={() => navigateToQuestion(currentQuestionIndex + 1)}
                                    disabled={isSubmitting}
                                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-5 bg-white dark:bg-gray-100 text-gray-900 border border-gray-200 dark:border-transparent font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-all disabled:opacity-50"
                                >
                                    Siguiente <ChevronRight className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="flex flex-col sm:flex-row justify-center xl:justify-start gap-8 md:gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 dark:text-gray-600 text-center lg:col-span-2">
                    <span className="flex items-center justify-center gap-2"><ShieldCheck className="w-3 h-3" /> Seguridad Certificada</span>
                    <span className="flex items-center justify-center gap-2"><Target className="w-3 h-3" /> Análisis de Riesgo</span>
                </div>
            </div>
        </div>
    );
};

export default QuizTaker;

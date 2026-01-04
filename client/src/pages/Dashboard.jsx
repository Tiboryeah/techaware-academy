import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../services/api';
import { API_BASE_URL } from '../constants';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import {
    LayoutDashboard,
    Trophy,
    Target,
    ShieldAlert,
    History,
    LogOut,
    Bell,
    ChevronRight,
    Star,
    Gamepad2,
    Users,
    Tv,
    TrendingUp,
    RotateCw,
    Download,
    Award
} from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [progressData, setProgressData] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const timestamp = Date.now();
            const [progressRes, coursesRes] = await Promise.all([
                api.get(`/api/progress/summary/all?t=${timestamp}`),
                api.get(`/api/content/courses?t=${timestamp}`)
            ]);
            console.log("[Dashboard] Summary Data:", progressRes.data);
            setProgressData(progressRes.data);
            setCourses(coursesRes.data);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onLogout = () => {
        logout();
        navigate('/login');
    };

    const generateCertificate = (courseName, category) => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // 1. Background (Parchment Color)
        doc.setFillColor(254, 253, 250); // Off-white/Cream
        doc.rect(0, 0, pageWidth, pageHeight, 'F');

        // 2. Decorative Borders
        doc.setDrawColor(30, 27, 75); // Indigo-950
        doc.setLineWidth(1.5);
        doc.rect(8, 8, pageWidth - 16, pageHeight - 16, 'D');

        doc.setDrawColor(180, 150, 50); // Gold-ish
        doc.setLineWidth(0.5);
        doc.rect(12, 12, pageWidth - 24, pageHeight - 24, 'D');

        // 3. Header
        doc.setTextColor(30, 27, 75);
        doc.setFontSize(30);
        doc.setFont('times', 'bold');
        doc.text('TECHAWARE ACADEMY CERTIFICATION', pageWidth / 2, 40, { align: 'center' });

        doc.setFontSize(12);
        doc.setFont('times', 'italic');
        doc.setTextColor(100, 100, 100);
        doc.text('Programa de Formación Profesional en Seguridad Digital', pageWidth / 2, 48, { align: 'center' });

        // 4. Distinction Title
        doc.setFillColor(30, 27, 75);
        doc.rect(pageWidth / 2 - 80, 55, 160, 12, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(`ESPECIALISTA EN SEGURIDAD: ${category?.toUpperCase() || 'GENERAL'}`, pageWidth / 2, 63, { align: 'center' });

        // 5. User Name
        doc.setTextColor(30, 27, 75);
        doc.setFontSize(16);
        doc.setFont('times', 'normal');
        doc.text('Por la presente se hace constar oficialmente que', pageWidth / 2, 85, { align: 'center' });

        doc.setFontSize(40);
        doc.setFont('times', 'bold');
        doc.text(user?.name?.toUpperCase() || 'GUARDIÁN DIGITAL', pageWidth / 2, 105, { align: 'center' });

        doc.setDrawColor(180, 150, 50);
        doc.setLineWidth(0.8);
        doc.line(pageWidth / 2 - 90, 110, pageWidth / 2 + 90, 110);

        // 6. Achievement Text
        doc.setFontSize(14);
        doc.setFont('times', 'italic');
        doc.setTextColor(50, 50, 50);
        doc.text('Ha completado satisfactoriamente los requisitos académicos del curso:', pageWidth / 2, 122, { align: 'center' });

        doc.setFontSize(20);
        doc.setFont('times', 'bold');
        doc.setTextColor(30, 27, 75);
        // Split long course names if needed
        const splitTitle = doc.splitTextToSize(courseName?.toUpperCase() || 'INTRODUCCIÓN A LA SEGURIDAD', 200);
        doc.text(splitTitle, pageWidth / 2, 135, { align: 'center' });

        // 7. Verified Competencies
        doc.setDrawColor(230, 230, 230);
        doc.setFillColor(245, 245, 245);
        doc.rect(40, 150, pageWidth - 80, 25, 'F');

        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(70, 70, 70);
        doc.text('ESTÁNDARES DE COMPETENCIA ALCANZADOS:', pageWidth / 2, 156, { align: 'center' });

        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');

        let competencies = [];
        const lowerCat = category?.toLowerCase() || '';

        if (lowerCat.includes('videojuego') || lowerCat.includes('game')) {
            competencies = [
                '• Prevención de Grooming en Chats de Juego',
                '• Gestión de Identidad y Avatares Seguros',
                '• Reconocimiento de Estafas (Free Nitro/Skins)',
                '• Balance de Tiempo y Bienestar Digital'
            ];
        } else if (lowerCat.includes('social') || lowerCat.includes('redes')) {
            competencies = [
                '• Configuración de Privacidad Avanzada',
                '• Identificación de Perfiles Falsos y Bots',
                '• Netiqueta y Prevención de Ciberacoso',
                '• Gestión Responsable de la Huella Digital'
            ];
        } else if (lowerCat.includes('stream') || lowerCat.includes('plataforma')) {
            competencies = [
                '• Protección de Datos de Identidad en Vivo',
                '• Moderación y Filtros de Seguridad en Chat',
                '• Pensamiento Crítico ante Creadores de Contenido',
                '• Seguridad en Transacciones y Donaciones'
            ];
        } else {
            competencies = [
                '• Análisis de Riesgos en el Entorno Digital',
                '• Implementación de Medidas Preventivas',
                '• Comportamiento Ético y Ciudadanía Digital',
                '• Resolución de Casos Prácticos de Seguridad'
            ];
        }

        doc.text(`${competencies[0]}  ${competencies[1]}`, pageWidth / 2, 163, { align: 'center' });
        doc.text(`${competencies[2]}  ${competencies[3]}`, pageWidth / 2, 168, { align: 'center' });

        // 8. Footer Info
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        const certCode = `CERT-${user?._id?.substring(0, 8).toUpperCase()}-${category?.substring(0, 3).toUpperCase()}`;
        doc.text(`CÓDIGO DE VERIFICACIÓN: ${certCode}`, 40, 185);
        doc.text(`FECHA DE EMISIÓN: ${new Date().toLocaleDateString()}`, 40, 190);

        // 9. Seals and signatures
        doc.setDrawColor(180, 150, 50);
        doc.setFillColor(212, 175, 55);
        doc.circle(pageWidth - 50, 170, 18, 'F');
        doc.setDrawColor(150, 120, 30);
        doc.circle(pageWidth - 50, 170, 16, 'D');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('CERTIFICADO', pageWidth - 50, 168, { align: 'center' });
        doc.text('OFICIAL', pageWidth - 50, 173, { align: 'center' });

        doc.setDrawColor(30, 27, 75);
        doc.line(pageWidth / 2 - 40, 185, pageWidth / 2 + 40, 185);
        doc.setFontSize(10);
        doc.setTextColor(30, 27, 75);
        doc.text('FIRMA AUTORIZADA', pageWidth / 2, 192, { align: 'center' });

        doc.save(`Certificado_TechAware_${category?.replace(/\s/g, '_')}.pdf`);
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#fafafb] dark:bg-[#0a0c10]">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full" />
        </div>
    );

    // Centralized Progress Calculation (New Weighted Logic)
    const diagScore = Number(progressData?.diagnostic?.score || 0);
    const hasDiag = !!progressData?.diagnostic;
    const diagBonus = diagScore >= 80 ? 20 : 0; // Binary Bonus (CU: +20% if pass, 0% if fail)

    const totalLessons = Number(progressData?.totalLessons || 0);
    const doneLessons = Number(progressData?.completedLessons || 0);
    const lessonProgress = totalLessons > 0 ? (doneLessons / totalLessons) * 100 : 0;

    const totalModules = Number(progressData?.totalModules || 0);
    const doneModules = Number(progressData?.completedModules || 0);
    const accreditationProgress = totalModules > 0 ? (doneModules / totalModules) * 100 : 0;

    // Formula: Diag Pass(20%) + Lessons(20%) + Modules(60%)
    const protectionIndex = Math.min(100, Math.round(
        diagBonus +
        (lessonProgress * 0.2) +
        (accreditationProgress * 0.6)
    ));

    const getRank = (idx) => {
        if (idx >= 90) return { label: 'Leyenda', icon: <TrendingUp className="text-indigo-500" />, sub: 'Protección Total' };
        if (idx >= 65) return { label: 'Centinela', icon: <TrendingUp className="text-green-500" />, sub: 'Nivel Avanzado' };
        if (idx >= 35) return { label: 'Guardián', icon: <TrendingUp className="text-blue-500" />, sub: 'Nivel Inicial' };
        return { label: 'Novato', icon: <TrendingUp className="text-gray-400" />, sub: 'Empezando' };
    };

    const rank = getRank(protectionIndex);

    const badges = courses.map(course => {
        const isCompleted = progressData?.completedCourseIds?.some(id => String(id) === String(course._id));
        let icon = <Trophy />;
        let color = "indigo";

        if (course.category?.toLowerCase() === 'videojuegos') {
            icon = <Gamepad2 />;
            color = "purple";
        } else if (course.category?.toLowerCase() === 'redes sociales') {
            icon = <Users />;
            color = "pink";
        } else if (course.category?.toLowerCase() === 'streaming') {
            icon = <Tv />;
            color = "red";
        }

        return { id: course._id, title: course.title, isCompleted, icon, color, category: course.category };
    });

    return (
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] text-gray-900 dark:text-gray-100 pb-20 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Area */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-gray-800 border-2 border-indigo-100 dark:border-gray-700 overflow-hidden shadow-lg flex-shrink-0">
                                {user.avatar ? (
                                    <img
                                        src={user.avatar.startsWith('http') ? user.avatar : `${API_BASE_URL}${user.avatar}`}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <LayoutDashboard className="text-indigo-500 w-8 h-8" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
                                    Mi Centro de Control
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium italic">Bienvenido de nuevo, {user?.name || 'Guardián Digital'}</p>
                            </div>

                            <div className="flex items-center gap-2 ml-4">
                                <motion.button
                                    whileHover={{ rotate: 180 }}
                                    transition={{ duration: 0.5 }}
                                    onClick={() => {
                                        setLoading(true);
                                        fetchData();
                                    }}
                                    className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 rounded-2xl hover:text-indigo-500 transition-colors"
                                    title="Sincronizar Datos"
                                >
                                    <RotateCw className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </div>

                        {hasDiag && (
                            <div className="mt-4 flex">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/quiz/diagnostic')}
                                    className="flex items-center gap-2 px-4 py-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all shadow-sm"
                                >
                                    <Target className="w-3.5 h-3.5" /> Recalibrar
                                </motion.button>
                            </div>
                        )}
                    </motion.div>

                    <div className="flex items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onLogout}
                            className="flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                        >
                            <LogOut className="w-4 h-4" /> Cerrar Sesión
                        </motion.button>
                    </div>
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Stats and Info */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* News Banner */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative group bg-white dark:bg-[#161b22] rounded-[2rem] p-8 border border-gray-100 dark:border-gray-800 overflow-hidden shadow-xl dark:shadow-2xl transition-all duration-500"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 dark:opacity-100 transition-opacity duration-500" />
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 dark:bg-white/5 blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/10 dark:group-hover:bg-white/10 transition-all duration-500" />
                            <div className="relative z-10 flex items-start gap-6">
                                <div className="p-4 bg-indigo-500 rounded-2xl shadow-lg shadow-indigo-500/30 font-bold">
                                    <Bell className="w-6 h-6 text-white animate-pulse" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-0.5 bg-indigo-500 text-[10px] font-black uppercase tracking-widest text-white rounded-md">Novedad</span>
                                        <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">Hace 2 horas</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">¡Nuevo módulo de seguridad!</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm italic leading-relaxed">
                                        Hemos añadido la lección sobre <strong className="text-indigo-600 dark:text-indigo-300">"Sincronización Familiar en Roblox"</strong>. Aprende a gestionar la cuenta de tus hijos desde tu propio dispositivo.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Diagnostic CTA - HIDDEN if completed */}
                        {!hasDiag && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white dark:bg-[#161b22] rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-xl dark:shadow-2xl flex flex-col md:flex-row justify-between items-center gap-10 transition-colors"
                            >
                                <div className="space-y-4">
                                    <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center font-bold">
                                        <Target className="text-yellow-600 dark:text-yellow-500 w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">¿Conoces tus debilidades?</h2>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-md italic">
                                        Realiza el examen diagnóstico completo para identificar brechas de seguridad en Gaming, Redes Sociales y Streaming.
                                    </p>
                                </div>
                                <button
                                    onClick={() => navigate('/quiz/diagnostic')}
                                    className="w-full md:w-auto px-10 py-5 bg-indigo-600 dark:bg-white text-white dark:text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-700 dark:hover:bg-indigo-500 dark:hover:text-white transition-all shadow-xl active:scale-95"
                                >
                                    Iniciar Diagnóstico
                                </button>
                            </motion.div>
                        )}

                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { icon: <Star className="text-yellow-500" />, label: 'Módulos', value: progressData?.completedModules || 0, sub: 'Acreditados' },
                                { icon: <Trophy className="text-indigo-500" />, label: 'Insignias', value: progressData?.completedCourses || 0, sub: 'Obtenidas' },
                                { icon: rank.icon, label: 'Estatus', value: rank.label, sub: rank.sub }
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                    className="bg-white dark:bg-[#161b22] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex items-center gap-6 shadow-sm dark:shadow-none transition-colors"
                                >
                                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl font-bold">{stat.icon}</div>
                                    <div>
                                        <p className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</p>
                                        <p className="text-[10px] uppercase font-black tracking-widest text-gray-500">{stat.label}</p>
                                        <p className="text-[9px] text-gray-400 italic">{stat.sub}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Activity Graph Placeholder or Recent Activity */}
                        <div className="bg-white dark:bg-[#161b22] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-xl dark:shadow-none transition-colors">
                            <h3 className="text-lg font-black uppercase tracking-widest text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                                <History className="w-5 h-5 text-indigo-500" /> Registro de Actividad
                            </h3>
                            <div className="space-y-6">
                                {progressData?.recentActivity && progressData.recentActivity.length > 0 ? (
                                    progressData.recentActivity.map((act, i) => {
                                        const timeAgo = (date) => {
                                            const seconds = Math.floor((new Date() - new Date(date)) / 1000);
                                            if (seconds < 60) return 'Hace un momento';
                                            const minutes = Math.floor(seconds / 60);
                                            if (minutes < 24 * 60) {
                                                if (minutes < 60) return `Hace ${minutes} min`;
                                                return `Hace ${Math.floor(minutes / 60)} h`;
                                            }
                                            return new Date(date).toLocaleDateString([], { day: '2-digit', month: 'short' });
                                        };

                                        return (
                                            <motion.div
                                                key={act.id || i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 * i }}
                                                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0a0c10]/40 rounded-2xl border border-gray-100 dark:border-white/5 transition-colors group hover:border-indigo-500/30"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-2 h-2 rounded-full ${act.type === 'DIAGNOSTIC' ? 'bg-indigo-500' : (act.passed ? 'bg-green-500' : 'bg-yellow-500')} shadow-lg`} />
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-800 dark:text-white">
                                                            {act.type === 'DIAGNOSTIC' ? 'Diagnóstico Realizado' : act.title}
                                                        </p>
                                                        <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">
                                                            {timeAgo(act.date)} • {act.type === 'DIAGNOSTIC' ? 'Evaluación Inicial' : `Puntaje: ${act.score}%`}
                                                        </p>
                                                    </div>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                                            </motion.div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-10 opacity-40">
                                        <p className="text-sm font-bold text-gray-400 italic">No hay actividad reciente aún.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Badges and Quick Links */}
                    <div className="lg:col-span-4 space-y-8">

                        {/* Risk Level Semi-Circle (Dynamic Protection Index) */}
                        <div className="bg-white dark:bg-[#161b22] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 text-center space-y-4 shadow-sm dark:shadow-2xl transition-all duration-500 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 dark:opacity-100" />

                            {(() => {
                                let levelLabel = "Vulnerable";
                                let levelColor = "red";
                                let levelText = "Tu entorno digital requiere atención inmediata.";

                                if (protectionIndex >= 90) {
                                    levelLabel = "Blindado";
                                    levelColor = "indigo";
                                    levelText = "Máximo nivel de protección alcanzado.";
                                } else if (protectionIndex >= 65) {
                                    levelLabel = "Seguro";
                                    levelColor = "green";
                                    levelText = "Nivel de seguridad óptimo para tu familia.";
                                } else if (protectionIndex >= 35) {
                                    levelLabel = "Mejorado";
                                    levelColor = "yellow";
                                    levelText = "Vas por buen camino, sigue acreditando módulos.";
                                }

                                if (!hasDiag) {
                                    levelLabel = "Incompleto";
                                    levelColor = "gray";
                                    levelText = "Realiza el diagnóstico inicial para ver tu índice.";
                                }

                                const strokeDash = `${protectionIndex}, 100`;
                                const colorPrimary = levelColor === 'gray' ? 'gray' : levelColor;

                                return (
                                    <>
                                        <div className="relative w-32 h-32 mx-auto">
                                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                                <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-100 dark:stroke-gray-800 stroke-[3]" />
                                                <motion.circle
                                                    cx="18" cy="18" r="16" fill="none"
                                                    initial={{ strokeDasharray: "0, 100" }}
                                                    animate={{ strokeDasharray: strokeDash }}
                                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                                    className={`stroke-${colorPrimary}-500 stroke-[3]`}
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className={`text-2xl font-black text-${colorPrimary}-600 dark:text-${colorPrimary}-400`}>
                                                    {!hasDiag ? (doneLessons > 0 ? '5%' : `${protectionIndex}%`) : `${protectionIndex}%`}
                                                </span>
                                            </div>
                                        </div>
                                        <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white flex items-center justify-center gap-2">
                                            <ShieldAlert className={`w-4 h-4 text-${colorPrimary}-500`} />
                                            Índice: <span className={`text-${colorPrimary}-500`}>{levelLabel}</span>
                                        </h4>
                                        <p className="text-[11px] text-gray-500 italic leading-tight px-4">{levelText}</p>
                                    </>
                                );
                            })()}
                        </div>

                        {/* Badges Awarded (CU07) */}
                        <div className="bg-white dark:bg-[#161b22] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-xl dark:shadow-none transition-colors">
                            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white mb-8">Mis Acreditaciones</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {badges.map(badge => {
                                    const colorStyles = {
                                        purple: {
                                            bg: 'bg-purple-500',
                                            border: 'border-purple-500/20',
                                            text: 'text-purple-600 dark:text-purple-400',
                                            shadow: 'shadow-purple-500/20',
                                            dot: 'bg-purple-500'
                                        },
                                        pink: {
                                            bg: 'bg-pink-500',
                                            border: 'border-pink-500/20',
                                            text: 'text-pink-600 dark:text-pink-400',
                                            shadow: 'shadow-pink-500/20',
                                            dot: 'bg-pink-500'
                                        },
                                        red: {
                                            bg: 'bg-red-500',
                                            border: 'border-red-500/20',
                                            text: 'text-red-600 dark:text-red-400',
                                            shadow: 'shadow-red-500/20',
                                            dot: 'bg-red-500'
                                        },
                                        indigo: {
                                            bg: 'bg-indigo-500',
                                            border: 'border-indigo-500/20',
                                            text: 'text-indigo-600 dark:text-indigo-400',
                                            shadow: 'shadow-indigo-500/20',
                                            dot: 'bg-indigo-500'
                                        }
                                    };

                                    const style = colorStyles[badge.color] || colorStyles.indigo;

                                    return (
                                        <div
                                            key={badge.id}
                                            className={`flex items-center justify-between gap-4 p-5 rounded-[2rem] border transition-all duration-300 ${badge.isCompleted
                                                ? `bg-white dark:bg-[#1c2128] ${style.border} shadow-sm hover:shadow-md dark:shadow-none`
                                                : 'bg-gray-50/50 dark:bg-gray-800/10 border-transparent grayscale opacity-50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${badge.isCompleted
                                                    ? `${style.bg} text-white shadow-lg ${style.shadow}`
                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                                                    }`}>
                                                    {React.cloneElement(badge.icon, { className: "w-6 h-6" })}
                                                </div>
                                                <div>
                                                    <p className="text-[13px] font-black leading-tight text-gray-900 dark:text-white mb-1">{badge.title}</p>
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${badge.isCompleted ? style.dot : 'bg-gray-400'}`} />
                                                        <p className={`text-[9px] font-black uppercase tracking-[0.2em] ${badge.isCompleted ? style.text : 'text-gray-500'}`}>
                                                            {badge.isCompleted ? 'Acreditado' : 'Pendiente'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {badge.isCompleted && (
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => generateCertificate(badge.title, badge.category)}
                                                    className={`p-3 rounded-xl ${style.bg} text-white shadow-lg ${style.shadow} hover:opacity-90 transition-opacity`}
                                                    title={`Descargar Certificado de ${badge.title}`}
                                                >
                                                    <Download className="w-4 h-4" />
                                                </motion.button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Quick Advice */}
                        <div className="p-8 bg-indigo-600 rounded-[2.5rem] shadow-2xl shadow-indigo-600/20 text-white space-y-4">
                            <h4 className="font-black text-xs uppercase tracking-widest opacity-60">Consejo Pro</h4>
                            <p className="text-sm font-serif italic leading-relaxed">
                                "La autenticación de dos factores (2FA) en Discord es la barrera más efectiva contra el robo de cuentas por 'regalos de Nitro' falsos."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

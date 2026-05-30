import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../services/api';
import avatarUrl from '../utils/avatarUrl';
import { motion } from 'framer-motion';
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

    TrendingUp,
    RotateCw,
    Download,
    Award,
    ShieldCheck,
    BookOpen
} from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [progressData, setProgressData] = useState(null);
    const [courses, setCourses] = useState([]);
    const [recommendations, setRecommendations] = useState(null);
    const [latestUpdate, setLatestUpdate] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const timestamp = Date.now();
            const [progressRes, coursesRes, recRes, latestRes] = await Promise.all([
                api.get(`/api/progress/summary/all?t=${timestamp}`),
                api.get(`/api/content/courses?t=${timestamp}`),
                api.get('/api/quiz/my-recommendations').catch(() => ({ data: null })),
                api.get(`/api/content/latest-update?t=${timestamp}`).catch(() => ({ data: null })),
            ]);
            console.log("[Dashboard] Summary Data:", progressRes.data);
            setProgressData(progressRes.data);
            setCourses(coursesRes.data);
            setRecommendations(recRes.data);
            setLatestUpdate(latestRes.data);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const syncDashboard = () => fetchData();
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                syncDashboard();
            }
        };

        window.addEventListener('focus', syncDashboard);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('focus', syncDashboard);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    const onLogout = () => {
        logout();
        navigate('/iniciar-sesion');
    };

    const generateCertificate = async (courseName, category) => {
        const pdfLibsPromise = Promise.all([
            import('html2canvas'),
            import('jspdf'),
        ]);
        const lowerCat = category?.toLowerCase() || '';
        let competencies = [];

        if (lowerCat.includes('videojuego') || lowerCat.includes('game')) {
            competencies = [
                'Configuración de cuentas y controles parentales',
                'Privacidad, chat y multijugador seguro',
                'Reconocimiento de ciberacoso, grooming y datos personales',
                'Compras digitales, estafas y descargas seguras',
            ];
        } else if (lowerCat.includes('social') || lowerCat.includes('redes')) {
            competencies = [
                'Privacidad, datos personales y huella digital',
                'Reconocimiento de ciberacoso y presión social',
                'Detección de grooming y contacto manipulador',
                'Pensamiento crítico ante contenido, publicidad y compras',
            ];
        } else if (lowerCat.includes('stream') || lowerCat.includes('plataforma')) {
            competencies = [
                'Comprensión de YouTube, Twitch y algoritmos',
                'Identificación de contenido inapropiado e interacción de riesgo',
                'Prevención de gastos, donaciones y publicidad engañosa',
                'Límites de pantalla, controles parentales y acompañamiento',
            ];
        } else {
            competencies = [
                'Identificación de riesgos digitales',
                'Uso de medidas preventivas',
                'Acompañamiento y comunicación familiar',
                'Pensamiento crítico ante contenido digital',
            ];
        }

        const escapeHtml = (value) => String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');

        const certCode = `CERT-${user?._id?.substring(0, 8).toUpperCase()}-${category?.substring(0, 3).toUpperCase()}`;
        const issueDate = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
        const userName = user?.name?.toUpperCase() || 'GUARDIÁN DIGITAL';
        const courseNameUpper = courseName?.toUpperCase() || 'INTRODUCCIÓN A LA SEGURIDAD';
        const categoryLabel = category?.toUpperCase() || 'GENERAL';
        const nameFontSize = userName.length > 28 ? 42 : userName.length > 18 ? 50 : 58;
        const courseFontSize = courseNameUpper.length > 46 ? 23 : 27;

        const competenciesHTML = competencies
            .map(c => `
                <div style="font-size:13px;color:#334155;line-height:1.4;">
                    <span style="color:#7c3aed;font-size:15px;margin-right:7px;">&#8226;</span>${escapeHtml(c)}
                </div>
            `)
            .join('');

        // Pre-cargar logo y recortarlo en círculo via canvas (html2canvas no soporta overflow:hidden + border-radius)
        let logoDataUrl = '';
        try {
            const logoRes = await fetch(window.location.origin + '/logo_v2.webp');
            const blob = await logoRes.blob();
            const rawDataUrl = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
            logoDataUrl = await new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    const SIZE = 80;
                    const offscreen = document.createElement('canvas');
                    offscreen.width = SIZE;
                    offscreen.height = SIZE;
                    const ctx = offscreen.getContext('2d');
                    ctx.beginPath();
                    ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.clip();
                    const scale = Math.max(SIZE / img.width, SIZE / img.height);
                    const w = img.width * scale;
                    const h = img.height * scale;
                    ctx.drawImage(img, (SIZE - w) / 2, (SIZE - h) / 2, w, h);
                    resolve(offscreen.toDataURL('image/png'));
                };
                img.onerror = () => resolve('');
                img.src = rawDataUrl;
            });
        } catch { /* si falla, el logo queda en blanco */ }

        const container = document.createElement('div');
        container.style.cssText = 'position:fixed;left:-9999px;top:-9999px;z-index:-1;';
        document.body.appendChild(container);

        container.innerHTML = `
            <div id="cert-render" style="
                width:1122px;height:794px;
                background:#f8fafc;
                font-family:'Segoe UI',Arial,sans-serif;
                position:relative;
                box-sizing:border-box;
                color:#111827;
                overflow:hidden;">

                    <div style="position:absolute;inset:22px;border:1.5px solid #c4b5fd;border-radius:24px;background:#ffffff;box-shadow:0 20px 60px rgba(49,46,129,0.12);overflow:hidden;">
                    <div style="position:absolute;left:0;top:0;width:100%;height:12px;background:linear-gradient(90deg,#4f46e5 0%,#7c3aed 55%,#0ea5e9 100%);"></div>
                    ${logoDataUrl
                        ? `<img src="${logoDataUrl}" alt="Kuxipilli" style="position:absolute;left:42px;top:36px;width:80px;height:80px;border-radius:50%;border:2px solid #e0e7ff;display:block;box-shadow:0 4px 16px rgba(79,70,229,0.15);" />`
                        : `<div style="position:absolute;left:42px;top:36px;width:80px;height:80px;border-radius:50%;background:#ede9fe;border:2px solid #e0e7ff;"></div>`
                    }

                    <div style="position:absolute;left:138px;top:42px;">
                        <div style="font-size:31px;font-weight:900;letter-spacing:6px;color:#111827;line-height:1;">KUXIPILLI</div>
                        <div style="margin-top:9px;font-size:11px;font-weight:700;letter-spacing:3px;color:#64748b;text-transform:uppercase;">Plataforma de seguridad digital para familias</div>
                    </div>

                    <div style="position:absolute;right:42px;top:46px;text-align:right;">
                        <div style="display:inline-block;border:1px solid #ddd6fe;border-radius:999px;padding:8px 17px;background:#f5f3ff;color:#5b21b6;font-size:11px;font-weight:800;letter-spacing:1.7px;text-transform:uppercase;">${escapeHtml(categoryLabel)}</div>
                        <div style="margin-top:13px;font-size:11px;color:#64748b;letter-spacing:1px;">Fecha de emisión: ${escapeHtml(issueDate)}</div>
                    </div>

                    <div style="position:absolute;left:42px;right:42px;top:142px;height:1px;background:linear-gradient(90deg,#ddd6fe,transparent 45%,#bae6fd);"></div>

                    <div style="position:absolute;left:70px;right:70px;top:177px;text-align:center;">
                        <div style="font-size:15px;font-weight:700;color:#64748b;letter-spacing:3px;text-transform:uppercase;">Constancia de finalización</div>
                        <div style="margin-top:22px;font-size:15px;color:#475569;letter-spacing:1px;">Kuxipilli hace constar que</div>
                        <div style="margin:13px auto 0;width:820px;max-width:820px;font-size:${nameFontSize}px;font-weight:900;color:#111827;line-height:1.05;letter-spacing:1px;text-align:center;word-break:break-word;">
                            ${escapeHtml(userName)}
                        </div>
                        <div style="margin:18px auto 0;width:430px;height:3px;border-radius:999px;background:linear-gradient(90deg,transparent,#7c3aed,#0ea5e9,transparent);"></div>
                        <div style="margin-top:22px;font-size:15px;color:#475569;letter-spacing:1px;">ha completado satisfactoriamente el curso</div>
                        <div style="margin:12px auto 0;max-width:900px;font-size:${courseFontSize}px;font-weight:900;color:#312e81;line-height:1.22;letter-spacing:1.4px;text-align:center;">
                            ${escapeHtml(courseNameUpper)}
                        </div>
                    </div>

                    <div style="position:absolute;left:70px;right:70px;bottom:128px;border:1px solid #e0e7ff;border-radius:18px;background:#f8fafc;padding:22px 28px;">
                        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
                            <div style="font-size:12px;font-weight:900;color:#4f46e5;letter-spacing:3px;text-transform:uppercase;">Competencias digitales acreditadas</div>
                            <div style="height:1px;background:#dbeafe;flex:1;margin-left:24px;"></div>
                        </div>
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px 42px;">
                            ${competenciesHTML}
                        </div>
                    </div>

                    <div style="position:absolute;left:70px;right:70px;bottom:54px;display:flex;align-items:flex-end;justify-content:space-between;">
                        <div style="width:275px;">
                            <div style="height:1px;background:#cbd5e1;margin-bottom:9px;"></div>
                            <div style="font-size:10px;color:#64748b;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;">Código de verificación</div>
                            <div style="margin-top:5px;font-size:12px;color:#0f172a;font-weight:800;letter-spacing:1px;">${escapeHtml(certCode)}</div>
                        </div>

                        <div style="text-align:center;">
                            <div style="font-size:11px;color:#64748b;letter-spacing:1px;">Esta constancia reconoce la finalización del contenido educativo y sus evaluaciones.</div>
                            <div style="margin:11px auto 0;width:180px;height:1px;background:linear-gradient(90deg,transparent,#7c3aed,transparent);"></div>
                            <div style="margin-top:7px;font-size:10px;font-weight:900;color:#4f46e5;letter-spacing:2.6px;text-transform:uppercase;">Programa educativo Kuxipilli</div>
                        </div>

                        <div style="width:106px;height:106px;border-radius:50%;border:2px solid #7c3aed;background:#f5f3ff;display:flex;align-items:center;justify-content:center;">
                            <div style="width:86px;height:86px;border-radius:50%;border:1px solid #c4b5fd;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;">
                                <div style="font-size:11px;font-weight:900;color:#312e81;letter-spacing:1.6px;">KUXIPILLI</div>
                                <div style="width:44px;height:2px;background:linear-gradient(90deg,#4f46e5,#0ea5e9);margin:7px 0;"></div>
                                <div style="font-size:9px;font-weight:900;color:#7c3aed;letter-spacing:2px;">CURSO</div>
                            </div>
                        </div>
                    </div>

                    <div style="position:absolute;left:0;bottom:0;width:100%;height:10px;background:linear-gradient(90deg,#4f46e5 0%,#7c3aed 55%,#0ea5e9 100%);"></div>
                </div>
            </div>
        `;

        const certEl = container.querySelector('#cert-render');
        const images = Array.from(certEl.querySelectorAll('img'));
        await Promise.all(images.map((img) => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve;
            });
        }));
        const [{ default: html2canvas }, jsPdfModule] = await pdfLibsPromise;
        const JsPDF = jsPdfModule.default || jsPdfModule.jsPDF;
        const canvas = await html2canvas(certEl, { scale: 2, useCORS: true, allowTaint: false, backgroundColor: '#ffffff' });
        document.body.removeChild(container);

        const imgData = canvas.toDataURL('image/png');
        const doc = new JsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        const pdfW = doc.internal.pageSize.getWidth();
        const pdfH = doc.internal.pageSize.getHeight();
        doc.addImage(imgData, 'PNG', 0, 0, pdfW, pdfH);

        const safeUserName = (user?.name || 'Usuario').split(' ')[0].normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9]/g, '');
        const safeCourseName = (courseName || 'Curso').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9]/g, '').substring(0, 15);
        doc.save(`${safeUserName}_${safeCourseName}.pdf`);
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

    const timeAgo = (date) => {
        if (!date) return 'Reciente';
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        if (seconds < 60) return 'Hace un momento';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 24 * 60) {
            if (minutes < 60) return `Hace ${minutes} min`;
            return `Hace ${Math.floor(minutes / 60)} h`;
        }
        return new Date(date).toLocaleDateString([], { day: '2-digit', month: 'short' });
    };

    const newsLabel = latestUpdate?.label || 'Novedad';
    const newsTitle = latestUpdate?.title || 'Contenido actualizado';
    const newsDescription = latestUpdate?.description || 'Explora el material más reciente agregado a Kuxipilli.';
    const newsDate = latestUpdate?.updatedAt || latestUpdate?.createdAt;

    const getActivityConfig = (activity) => {
        switch (activity?.kind) {
            case 'lesson_completed':
                return { dotClass: 'bg-cyan-500', detail: activity.subtitle || 'Lección completada' };
            case 'module_accredited':
                return { dotClass: 'bg-emerald-500', detail: activity.subtitle || 'Módulo acreditado' };
            case 'course_completed':
                return { dotClass: 'bg-purple-500', detail: activity.subtitle || 'Curso acreditado' };
            case 'diagnostic_attempt':
                return { dotClass: 'bg-indigo-500', detail: activity.subtitle || 'Evaluación inicial' };
            default:
                return {
                    dotClass: activity?.passed ? 'bg-green-500' : 'bg-yellow-500',
                    detail: activity?.subtitle || (typeof activity?.score === 'number' ? `Puntaje: ${activity.score}%` : 'Evaluación presentada'),
                };
        }
    };

    const badges = courses.map(course => {
        const isCompleted = progressData?.completedCourseIds?.some(id => String(id) === String(course._id));
        let imageColor = '/images/badge_videojuegos.webp';
        let imageGray  = '/images/badgegris_videojuegos.webp';
        let color = "indigo";

        if (course.category?.toLowerCase() === 'videojuegos') {
            imageColor = '/images/badge_videojuegos.webp';
            imageGray  = '/images/badgegris_videojuegos.webp';
            color = "purple";
        } else if (course.category?.toLowerCase() === 'redes sociales') {
            imageColor = '/images/badge_redes_sociales.webp';
            imageGray  = '/images/badgegris_redes.webp';
            color = "pink";
        } else if (course.category?.toLowerCase() === 'streaming') {
            imageColor = '/images/badge_streaming.webp';
            imageGray  = '/images/badgegris_streaming.webp';
            color = "red";
        }

        return { id: course._id, title: course.title, isCompleted, imageColor, imageGray, color, category: course.category };
    });

    return (
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] text-gray-900 dark:text-gray-100 pb-20 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Header Area */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 mb-6 sm:mb-12">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-indigo-50 dark:bg-gray-800 border-2 border-indigo-100 dark:border-gray-700 overflow-hidden shadow-lg flex-shrink-0">
                                {user.avatar ? (
                                    <img
                                        src={avatarUrl(user.avatar)}
                                        alt="Perfil"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <LayoutDashboard className="text-indigo-500 w-8 h-8" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
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
                                    onClick={() => navigate('/evaluacion/diagnostico')}
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">

                    {/* Left Column: Stats and Info */}
                    <div className="lg:col-span-8 space-y-5 sm:space-y-8">

                        {/* News Banner */}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={() => latestUpdate?.href && navigate(latestUpdate.href)}
                            disabled={!latestUpdate?.href}
                            className="relative group w-full text-left bg-white dark:bg-[#161b22] rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 border border-gray-100 dark:border-gray-800 overflow-hidden shadow-xl dark:shadow-2xl transition-all duration-500 disabled:cursor-default enabled:hover:border-indigo-300 dark:enabled:hover:border-indigo-500/40"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 dark:opacity-100 transition-opacity duration-500" />
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 dark:bg-white/5 blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/10 dark:group-hover:bg-white/10 transition-all duration-500" />
                            <div className="relative z-10 flex items-start gap-6">
                                <div className="p-4 bg-indigo-500 rounded-2xl shadow-lg shadow-indigo-500/30 font-bold">
                                    <Bell className="w-6 h-6 text-white animate-pulse" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-0.5 bg-indigo-500 text-[10px] font-black uppercase tracking-widest text-white rounded-md">{newsLabel}</span>
                                        <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">{timeAgo(newsDate)}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{newsTitle}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm italic leading-relaxed">
                                        {newsDescription}
                                    </p>
                                </div>
                            </div>
                        </motion.button>

                        {/* Diagnostic CTA - HIDDEN if completed */}
                        {!hasDiag && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white dark:bg-[#161b22] rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-10 border border-gray-100 dark:border-gray-800 shadow-xl dark:shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-10 transition-colors"
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
                                    onClick={() => navigate('/evaluacion/diagnostico')}
                                    className="w-full md:w-auto px-6 sm:px-10 py-4 sm:py-5 bg-indigo-600 dark:bg-white text-white dark:text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-700 dark:hover:bg-indigo-500 dark:hover:text-white transition-all shadow-xl active:scale-95"
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

                        {/* Recommended Lessons (RF4) */}
                        {recommendations?.suggestedLessons?.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-[#161b22] rounded-[1.5rem] sm:rounded-[2.5rem] p-5 sm:p-8 border border-indigo-100 dark:border-indigo-900/40 shadow-xl dark:shadow-none transition-colors"
                            >
                                <h3 className="text-lg font-black uppercase tracking-widest text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                                    <BookOpen className="w-5 h-5 text-indigo-500" /> Lecciones Recomendadas
                                </h3>
                                {recommendations.reason && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 italic mb-5">{recommendations.reason}</p>
                                )}
                                <div className="space-y-3">
                                    {recommendations.suggestedLessons.map((lesson, i) => (
                                        <motion.button
                                            key={lesson._id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.05 * i }}
                                            onClick={() => navigate(`/lecciones/${lesson._id}`)}
                                            className="w-full flex items-center justify-between gap-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800/30 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all group text-left"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-7 h-7 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                                                    <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                                                </div>
                                                <span className="text-sm font-bold text-gray-800 dark:text-gray-100">{lesson.title}</span>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 flex-shrink-0 transition-colors" />
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Activity Graph Placeholder or Recent Activity */}
                        <div className="bg-white dark:bg-[#161b22] rounded-[1.5rem] sm:rounded-[2.5rem] p-5 sm:p-8 border border-gray-100 dark:border-gray-800 shadow-xl dark:shadow-none transition-colors">
                            <h3 className="text-lg font-black uppercase tracking-widest text-gray-900 dark:text-white mb-5 sm:mb-8 flex items-center gap-3">
                                <History className="w-5 h-5 text-indigo-500" /> Registro de Actividad
                            </h3>
                            <div className="space-y-6">
                                {progressData?.recentActivity && progressData.recentActivity.length > 0 ? (
                                    progressData.recentActivity.map((act, i) => {
                                        const activityConfig = getActivityConfig(act);

                                        return (
                                            <motion.div
                                                key={act.id || i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 * i }}
                                                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0a0c10]/40 rounded-2xl border border-gray-100 dark:border-white/5 transition-colors group hover:border-indigo-500/30"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-2 h-2 rounded-full ${activityConfig.dotClass} shadow-lg`} />
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-800 dark:text-white">
                                                            {act.title}
                                                        </p>
                                                        <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">
                                                            {timeAgo(act.date)} � {activityConfig.detail}
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
                    <div className="lg:col-span-4 space-y-5 sm:space-y-8">

                        {/* Risk Level Premium Gauge (Dynamic Protection Index - RF4) */}
                        <div className="bg-white dark:bg-[#161b22] rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 border border-gray-100 dark:border-gray-800 text-center space-y-4 sm:space-y-6 shadow-xl dark:shadow-[0_0_50px_rgba(79,70,229,0.1)] relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 dark:opacity-100" />

                            {(() => {
                                let levelLabel = "Vulnerable";
                                let levelColor = "from-red-500 to-orange-500";
                                let levelText = "Tu entorno digital requiere atención inmediata. Completa los cursos para fortalecer tu escudo.";
                                let icon = <ShieldAlert className="w-6 h-6 text-red-500" />;

                                if (protectionIndex >= 90) {
                                    levelLabel = "Blindado";
                                    levelColor = "from-indigo-600 to-purple-600";
                                    levelText = "Nivel de seguridad digital avanzado. Ha completado satisfactoriamente los parámetros de formación técnica.";
                                    icon = <ShieldCheck className="w-6 h-6 text-indigo-500" />;
                                } else if (protectionIndex >= 65) {
                                    levelLabel = "Seguro";
                                    levelColor = "from-green-500 to-emerald-600";
                                    levelText = "Nivel de seguridad óptimo. Se recomienda el monitoreo continuo de nuevas lecciones.";
                                    icon = <ShieldCheck className="w-6 h-6 text-green-500" />;
                                } else if (protectionIndex >= 35) {
                                    levelLabel = "Mejorado";
                                    levelColor = "from-yellow-500 to-amber-600";
                                    levelText = "Progreso significativo detectado. Continúe acreditando módulos para optimizar el blindaje.";
                                    icon = <TrendingUp className="w-6 h-6 text-yellow-500" />;
                                }

                                if (!hasDiag) {
                                    levelLabel = "Incompleto";
                                    levelColor = "from-gray-400 to-gray-500";
                                    levelText = "Se requiere la realización del diagnóstico inicial para la generación del índice de protección.";
                                }

                                const radius = 70;
                                const circumference = 2 * Math.PI * radius;
                                const strokeDashOffset = circumference - (protectionIndex / 100) * circumference;

                                return (
                                    <>
                                        <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                                            {/* Outer Glow */}
                                            <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${levelColor} opacity-5 blur-2xl animate-pulse`} />

                                            <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]" viewBox="0 0 160 160">
                                                <circle cx="80" cy="80" r={radius} fill="none" className="stroke-gray-100 dark:stroke-gray-800/50 stroke-[8]" />
                                                <motion.circle
                                                    cx="80" cy="80" r={radius} fill="none"
                                                    initial={{ strokeDashoffset: circumference }}
                                                    animate={{ strokeDashoffset: strokeDashOffset }}
                                                    transition={{ duration: 2, ease: "circOut" }}
                                                    className={`stroke-current text-transparent bg-clip-border stroke-[10]`}
                                                    style={{
                                                        stroke: `url(#gradient-${levelLabel})`,
                                                        strokeDasharray: circumference,
                                                        strokeLinecap: 'round'
                                                    }}
                                                />
                                                <defs>
                                                    <linearGradient id={`gradient-Blindado`} x1="0%" y1="0%" x2="100%" y2="0%">
                                                        <stop offset="0%" stopColor="#4f46e5" />
                                                        <stop offset="100%" stopColor="#9333ea" />
                                                    </linearGradient>
                                                    <linearGradient id={`gradient-Seguro`} x1="0%" y1="0%" x2="100%" y2="0%">
                                                        <stop offset="0%" stopColor="#10b981" />
                                                        <stop offset="100%" stopColor="#059669" />
                                                    </linearGradient>
                                                    <linearGradient id={`gradient-Mejorado`} x1="0%" y1="0%" x2="100%" y2="0%">
                                                        <stop offset="0%" stopColor="#f59e0b" />
                                                        <stop offset="100%" stopColor="#d97706" />
                                                    </linearGradient>
                                                    <linearGradient id={`gradient-Vulnerable`} x1="0%" y1="0%" x2="100%" y2="0%">
                                                        <stop offset="0%" stopColor="#ef4444" />
                                                        <stop offset="100%" stopColor="#dc2626" />
                                                    </linearGradient>
                                                    <linearGradient id={`gradient-Incompleto`} x1="0%" y1="0%" x2="100%" y2="0%">
                                                        <stop offset="0%" stopColor="#9ca3af" />
                                                        <stop offset="100%" stopColor="#6b7280" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <motion.span
                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className={`text-5xl font-black bg-clip-text text-transparent bg-gradient-to-tr ${levelColor}`}
                                                >
                                                    {protectionIndex}%
                                                </motion.span>
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mt-1">Escudo</span>
                                            </div>
                                        </div>

                                        <div className="space-y-3 px-4 relative z-10">
                                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-50 dark:bg-gray-800/50 rounded-full border border-gray-100 dark:border-white/5">
                                                {icon}
                                                <span className="text-xs font-black uppercase tracking-widest text-gray-700 dark:text-gray-200">
                                                    Nivel {levelLabel}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 italic leading-relaxed font-medium">
                                                "{levelText}"
                                            </p>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>

                        {/* Badges Awarded (CU07) - Premium Redesign */}
                        <div className="bg-white dark:bg-[#161b22] rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 border border-gray-100 dark:border-gray-800 shadow-xl dark:shadow-none transition-colors">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-900 dark:text-white mb-6 sm:mb-10 flex items-center gap-3">
                                <Award className="w-5 h-5 text-indigo-500" /> Mis Logros Digitales
                            </h3>
                            <div className="grid grid-cols-1 gap-6">
                                {badges.map(badge => {
                                    const themes = {
                                        purple: {
                                            gradient: "from-purple-600 to-indigo-600",
                                            shadow: "shadow-purple-500/20",
                                            text: "text-purple-600 dark:text-purple-400"
                                        },
                                        pink: {
                                            gradient: "from-pink-600 to-rose-600",
                                            shadow: "shadow-pink-500/20",
                                            text: "text-pink-600 dark:text-pink-400"
                                        },
                                        red: {
                                            gradient: "from-red-600 to-orange-600",
                                            shadow: "shadow-red-500/20",
                                            text: "text-red-600 dark:text-red-400"
                                        },
                                        indigo: {
                                            gradient: "from-indigo-600 to-blue-600",
                                            shadow: "shadow-indigo-500/20",
                                            text: "text-indigo-600 dark:text-indigo-400"
                                        }
                                    };

                                    const theme = themes[badge.color] || themes.indigo;

                                    return (
                                        <motion.div
                                            key={badge.id}
                                            whileHover={badge.isCompleted ? { x: 8 } : {}}
                                            className={`relative flex items-center justify-between gap-6 p-6 rounded-[2.5rem] border transition-all duration-300 ${badge.isCompleted
                                                ? `bg-white dark:bg-[#1c2128] border-gray-100 dark:border-gray-700 shadow-lg hover:border-indigo-500/30`
                                                : 'bg-gray-50/50 dark:bg-gray-800/10 border-transparent grayscale opacity-30 shadow-inner'
                                                }`}
                                            style={{ backfaceVisibility: 'hidden', transformZ: 0 }}
                                        >
                                            {badge.isCompleted && (
                                                <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-[0.03] rounded-[2.5rem] pointer-events-none`} />
                                            )}

                                            <div className="flex items-center gap-6 relative z-10">
                                                <img
                                                    src={badge.isCompleted ? badge.imageColor : badge.imageGray}
                                                    alt={badge.title}
                                                    className="w-16 h-16 object-contain flex-shrink-0"
                                                />
                                                <div>
                                                    <p className={`text-base font-black leading-tight mb-1 ${badge.isCompleted ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                                                        {badge.title}
                                                    </p>
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${badge.isCompleted ? 'bg-indigo-500' : 'bg-gray-400'}`} />
                                                        <p className={`text-[9px] font-black uppercase tracking-[0.2em] ${badge.isCompleted ? theme.text : 'text-gray-500'}`}>
                                                            {badge.isCompleted ? 'Curso Completado' : 'Curso Pendiente'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {badge.isCompleted && (
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => generateCertificate(badge.title, badge.category)}
                                                    className={`p-4 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 border border-gray-100 dark:border-gray-800 shadow-sm transition-all relative z-10 group/btn`}
                                                    title={`Descargar constancia`}
                                                >
                                                    <Download className="w-5 h-5 group-hover/btn:animate-bounce" />
                                                </motion.button>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Quick Advice */}
                        <div className="p-5 sm:p-8 bg-indigo-600 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl shadow-indigo-600/20 text-white space-y-3 sm:space-y-4">
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



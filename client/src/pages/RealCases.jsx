import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Info,
    ArrowRight,
    ExternalLink,
    Lightbulb,
    X,
    CheckCircle2,
    UserX,
    AlertTriangle,
    ShieldCheck,
    Gamepad2,
    Video,
    MessageCircle,
    Instagram,
    Youtube,
    Tv,
    Mail,
} from 'lucide-react';
import api from '../services/api';

const caseIcons = {
    Ciberacoso: <UserX className="w-5 h-5" />,
    Fraudes: <AlertTriangle className="w-5 h-5" />,
    Grooming: <ShieldCheck className="w-5 h-5" />,
};

const guideIcons = {
    Roblox: <Gamepad2 className="w-6 h-6 text-red-500" />,
    Minecraft: <Gamepad2 className="w-6 h-6 text-green-600" />,
    TikTok: <Video className="w-6 h-6 text-pink-500" />,
    Discord: <MessageCircle className="w-6 h-6 text-indigo-500" />,
    Instagram: <Instagram className="w-6 h-6 text-purple-600" />,
    YouTube: <Youtube className="w-6 h-6 text-red-600" />,
    Twitch: <Tv className="w-6 h-6 text-purple-700" />,
};

const caseStyles = {
    red: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
    yellow: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
    indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
};

const guideDots = {
    red: 'bg-red-500',
    green: 'bg-green-500',
    pink: 'bg-pink-500',
    indigo: 'bg-indigo-500',
    purple: 'bg-purple-500',
};

const sectionTabs = [
    { key: 'casos', label: 'Casos reales' },
    { key: 'guias', label: 'Guías prácticas' },
];

const EmptyState = ({ message }) => (
    <div className="p-10 bg-white dark:bg-[#161b22] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400">
        {message}
    </div>
);

const RealCases = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [cases, setCases] = useState([]);
    const [guides, setGuides] = useState([]);
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState('');

    useEffect(() => {
        const loadResources = async () => {
            try {
                setLoading(true);
                const [casesRes, guidesRes] = await Promise.all([
                    api.get('/api/resources?type=case'),
                    api.get('/api/resources?type=guide'),
                ]);
                setCases(casesRes.data);
                setGuides(guidesRes.data);
                setLoadError('');
            } catch (error) {
                console.error('Error loading resources:', error);
                setLoadError('No fue posible cargar los recursos en este momento.');
            } finally {
                setLoading(false);
            }
        };

        loadResources();
    }, []);

    const normalizedCases = useMemo(
        () =>
            cases.map((item) => ({
                ...item,
                icon: caseIcons[item.category] || <Info className="w-5 h-5" />,
                style: caseStyles[item.color] || caseStyles.indigo,
            })),
        [cases]
    );

    const normalizedGuides = useMemo(
        () =>
            guides.map((item) => ({
                ...item,
                icon: guideIcons[item.platform] || <Info className="w-6 h-6 text-indigo-500" />,
                dotClass: guideDots[item.color] || guideDots.indigo,
            })),
        [guides]
    );

    const activeSection = searchParams.get('seccion') === 'guias' ? 'guias' : 'casos';

    const handleSectionChange = (section) => {
        const nextParams = new URLSearchParams(searchParams);
        if (section === 'guias') {
            nextParams.set('seccion', 'guias');
        } else {
            nextParams.delete('seccion');
        }
        setSearchParams(nextParams, { replace: true });
    };

    return (
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] text-gray-900 dark:text-gray-100 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 text-gray-900 dark:text-white">
                        Casos y <span className="text-indigo-600 dark:text-indigo-400">guías</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto italic font-medium">
                        Explora incidentes reales y rutas de protección práctica para acompañar mejor a tu familia en el entorno digital.
                    </p>
                </motion.div>

                <div className="flex justify-center mb-14">
                    <div className="inline-flex flex-wrap items-center justify-center gap-3 p-2 bg-white dark:bg-[#161b22] border border-gray-100 dark:border-gray-800 rounded-[2rem] shadow-xl">
                        {sectionTabs.map((tab) => {
                            const isActive = activeSection === tab.key;
                            const count = tab.key === 'casos' ? normalizedCases.length : normalizedGuides.length;

                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => handleSectionChange(tab.key)}
                                    className={`px-5 py-3 rounded-[1.25rem] font-black text-xs uppercase tracking-[0.2em] transition-all border ${
                                        isActive
                                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/20'
                                            : 'bg-transparent text-gray-500 dark:text-gray-400 border-transparent hover:border-indigo-200 dark:hover:border-gray-700 hover:text-indigo-600 dark:hover:text-white'
                                    }`}
                                >
                                    {tab.label}{' '}
                                    <span className={isActive ? 'text-indigo-100' : 'text-gray-400 dark:text-gray-500'}>
                                        ({count})
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {loading ? <div className="text-center py-20 text-gray-500 dark:text-gray-400">Cargando recursos...</div> : null}
                {loadError ? <div className="text-center py-20 text-red-500">{loadError}</div> : null}

                {!loading && !loadError ? (
                    <div className="space-y-24">
                        <AnimatePresence mode="wait">
                            {activeSection === 'casos' ? (
                                <motion.section
                                    key="casos"
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -14 }}
                                    className="space-y-10"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-0.5 w-12 bg-indigo-500" />
                                        <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                                            Casos reales
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                        {normalizedCases.length === 0 ? (
                                            <div className="lg:col-span-3">
                                                <EmptyState message="Aún no hay casos disponibles." />
                                            </div>
                                        ) : (
                                            normalizedCases.map((item, idx) => (
                                                <motion.div
                                                    key={item.slug}
                                                    initial={{ opacity: 0, scale: 0.96 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: idx * 0.08 }}
                                                    className="bg-white dark:bg-[#161b22] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden flex flex-col"
                                                >
                                                    <div className="p-8 flex-grow space-y-6">
                                                        <div className="flex justify-between items-center">
                                                            <div className={`p-3 rounded-2xl ${item.style}`}>{item.icon}</div>
                                                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${item.style}`}>
                                                                {item.category}
                                                            </span>
                                                        </div>
                                                        <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-sm italic text-gray-600 dark:text-gray-400 border-l-2 border-indigo-500/20 pl-4">
                                                            "{item.summary}"
                                                        </p>
                                                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                                            {item.content}
                                                        </p>
                                                        <div className="space-y-3 pt-4">
                                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                                                                <Lightbulb className="w-3 h-3" /> Recomendaciones
                                                            </h4>
                                                            <ul className="space-y-2">
                                                                {item.tips.map((tip, tipIdx) => (
                                                                    <li
                                                                        key={tipIdx}
                                                                        className="flex items-start gap-3 text-xs text-gray-500 dark:text-gray-400"
                                                                    >
                                                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                                                                        {tip}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="p-6 bg-gray-50 dark:bg-[#0a0c10]/40 border-t border-gray-100 dark:border-gray-800">
                                                        <button
                                                            onClick={() => navigate(`/casos/${item.slug}`)}
                                                            className="w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-colors"
                                                        >
                                                            Ver análisis completo <ArrowRight className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            ))
                                        )}
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="p-8 md:p-10 bg-white dark:bg-[#161b22] rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-2xl flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
                                    >
                                        <div className="space-y-3 max-w-2xl">
                                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20 text-[10px] font-black uppercase tracking-[0.2em]">
                                                <Mail className="w-3.5 h-3.5" /> Contacto separado
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900 dark:text-white">
                                                ¿Necesitas reportar un caso o pedir orientación?
                                            </h3>
                                            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 italic leading-relaxed">
                                                Ahora ese envío vive en una sección aparte para recibir mejor el contexto,
                                                revisar la situación con más detalle y dar seguimiento de forma más ordenada.
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => navigate('/contactanos?motivo=reporte')}
                                            className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-600/20 transition-all"
                                        >
                                            Ir a Contáctanos <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </motion.div>
                                </motion.section>
                            ) : (
                                <motion.section
                                    key="guias"
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -14 }}
                                    className="space-y-10"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-0.5 w-12 bg-indigo-500" />
                                        <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                                            Guías prácticas
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                        {normalizedGuides.length === 0 ? (
                                            <div className="lg:col-span-3">
                                                <EmptyState message="Aún no hay guías disponibles." />
                                            </div>
                                        ) : (
                                            normalizedGuides.map((guide) => (
                                                <motion.div
                                                    key={guide.slug}
                                                    initial={{ opacity: 0, scale: 0.96 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    className="bg-white dark:bg-[#161b22] p-8 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-2xl flex flex-col"
                                                >
                                                    <div className="flex-grow space-y-6">
                                                        <div className="flex justify-between items-start">
                                                            <div className="p-4 bg-gray-50 dark:bg-[#0a0c10] rounded-2xl border border-gray-100 dark:border-gray-800">
                                                                {guide.icon}
                                                            </div>
                                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 opacity-50">
                                                                Guía práctica
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <div className={`w-2 h-2 rounded-full ${guide.dotClass}`} />
                                                                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">
                                                                    {guide.platform}
                                                                </span>
                                                            </div>
                                                            <h3 className="text-xl font-black text-gray-900 dark:text-white leading-tight">
                                                                {guide.title}
                                                            </h3>
                                                            <p className="text-xs italic text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                                                                {guide.description}
                                                            </p>
                                                        </div>
                                                        <div className="space-y-3 pt-4 border-t border-gray-50 dark:border-white/5">
                                                            {guide.steps.map((step, stepIdx) => (
                                                                <div
                                                                    key={stepIdx}
                                                                    className="flex items-start gap-4 text-[10px] font-bold text-gray-600 dark:text-gray-400"
                                                                >
                                                                    <span className="flex-shrink-0 w-4 h-4 rounded-md bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-[8px] font-black">
                                                                        {stepIdx + 1}
                                                                    </span>
                                                                    <span className="flex-grow pt-0.5">{step}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => setSelectedGuide(guide)}
                                                        className="mt-8 w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-gray-50 dark:bg-[#0a0c10] hover:bg-indigo-600 hover:text-white dark:text-gray-300 dark:hover:text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl border border-gray-100 dark:border-gray-800 transition-all"
                                                    >
                                                        Ver detalles <ExternalLink className="w-3.5 h-3.5" />
                                                    </button>
                                                </motion.div>
                                            ))
                                        )}
                                    </div>
                                </motion.section>
                            )}
                        </AnimatePresence>
                    </div>
                ) : null}

                <AnimatePresence>
                    {selectedGuide ? (
                        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedGuide(null)}
                                className="fixed inset-0 bg-gray-900/80 backdrop-blur-md"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                className="relative w-full max-w-3xl bg-white dark:bg-[#161b22] rounded-[3.5rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 my-auto"
                            >
                                <button
                                    onClick={() => setSelectedGuide(null)}
                                    className="absolute top-8 right-8 p-3 text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-colors z-10"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                                <div className="p-8 sm:p-14 space-y-10">
                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                        <div className="p-6 bg-gray-50 dark:bg-[#0a0c10] rounded-3xl border border-gray-100 dark:border-gray-800">
                                            {selectedGuide.icon}
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                                                {selectedGuide.platform}
                                            </span>
                                            <h3 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight mt-2">
                                                {selectedGuide.title}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                        <div className="space-y-8">
                                            <div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-4 flex items-center gap-2">
                                                    <Info className="w-3.5 h-3.5" /> Por qué importa
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium italic">
                                                    "{selectedGuide.details?.fullContent}"
                                                </p>
                                            </div>
                                            <div className="p-6 bg-indigo-600/5 dark:bg-white/5 rounded-3xl border border-indigo-500/10">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-3">
                                                    Ruta de configuración
                                                </h4>
                                                <p className="text-sm font-black text-gray-800 dark:text-indigo-300">
                                                    {selectedGuide.details?.setupPath}
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-4 flex items-center gap-2">
                                                    <CheckCircle2 className="w-3.5 h-3.5" /> Pasos técnicos
                                                </h4>
                                                <div className="space-y-4">
                                                    {selectedGuide.steps.map((step, idx) => (
                                                        <div key={idx} className="flex items-start gap-4">
                                                            <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black">
                                                                {idx + 1}
                                                            </span>
                                                            <p className="text-xs font-bold text-gray-700 dark:text-gray-300 pt-2">
                                                                {step}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-8">
                                            <div className="p-8 bg-gray-900 dark:bg-[#0a0c10] rounded-[2.5rem] border border-gray-800 space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                                                        <Lightbulb className="w-5 h-5 text-yellow-500" />
                                                    </div>
                                                    <h4 className="text-xs font-black uppercase tracking-widest text-white">
                                                        Consejo del experto
                                                    </h4>
                                                </div>
                                                <p className="text-sm text-gray-400 italic leading-relaxed">
                                                    "{selectedGuide.details?.expertTip}"
                                                </p>
                                            </div>
                                            <div className="p-6 bg-green-500/5 rounded-3xl border border-green-500/20">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-4">
                                                    Riesgos que ayuda a reducir
                                                </h4>
                                                <p className="text-xs font-bold text-green-700 dark:text-green-400">
                                                    {selectedGuide.details?.riskAnalysis}
                                                </p>
                                            </div>
                                            <a
                                                href={selectedGuide.details?.officialLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center gap-4 w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-600/30 transition-all"
                                            >
                                                Ver página oficial <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ) : null}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default RealCases;

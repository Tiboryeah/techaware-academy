import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
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
    Skull,
    HeartCrack,
    EyeOff,
    Gamepad2,
    Mail,
} from 'lucide-react';
import { PlatformIcon } from '../components/PlatformIcons';
import api from '../services/api';

const caseIcons = {
    'Grooming fatal':      <Skull className="w-5 h-5" />,
    Suicidio:              <HeartCrack className="w-5 h-5" />,
    Ciberacoso:            <UserX className="w-5 h-5" />,
    Grooming:              <EyeOff className="w-5 h-5" />,
    'Explotación digital': <EyeOff className="w-5 h-5" />,
    'Retos virales':       <AlertTriangle className="w-5 h-5" />,
    'Violencia en vivo':   <AlertTriangle className="w-5 h-5" />,
    'Contenido camuflado': <AlertTriangle className="w-5 h-5" />,
    Fraudes:               <AlertTriangle className="w-5 h-5" />,
};

const KNOWN_PLATFORMS = ['Roblox', 'Minecraft', 'TikTok', 'Discord', 'Instagram', 'YouTube', 'Twitch'];

const PlatformBadgeIcon = ({ platform }) => {
    if (platform === 'Roblox') {
        return (
            <svg className="w-6 h-6 text-slate-700 dark:text-slate-100" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.38 2.5 21.5 6.38 17.62 21.5 2.5 17.62 6.38 2.5Zm4.43 7.06-1.25 4.87 4.87 1.25 1.25-4.87-4.87-1.25Z" />
            </svg>
        );
    }

    return KNOWN_PLATFORMS.includes(platform)
        ? <PlatformIcon platform={platform} className="w-6 h-6" />
        : <Gamepad2 className="w-6 h-6 text-cyan-500" />;
};

const caseStyles = {
    red: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
    yellow: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
    indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
};

const platformIconStyles = {
    TikTok:               'bg-gray-200 text-gray-700 border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-700',
    YouTube:              'bg-red-600/15 text-red-600 dark:text-red-400 border-red-500/30',
    Twitch:               'bg-purple-600/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
    Minecraft:            'bg-green-600/15 text-green-600 dark:text-green-400 border-green-500/30',
    Roblox:               'bg-blue-600/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
    Instagram:            'bg-pink-600/15 text-pink-600 dark:text-pink-400 border-pink-500/30',
    Discord:              'bg-indigo-600/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
    'Videojuegos en línea': 'bg-cyan-600/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
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

const visualCardImageClass =
    'absolute inset-0 w-full h-full object-cover opacity-[0.08] saturate-[0.35] brightness-[1.35] contrast-[0.72] dark:opacity-70 dark:saturate-100 dark:brightness-100 dark:contrast-100 transition-[filter,opacity] duration-500';

const visualModalImageClass =
    'absolute inset-0 w-full h-full object-cover opacity-[0.08] saturate-[0.35] brightness-[1.35] contrast-[0.72] dark:opacity-65 dark:saturate-100 dark:brightness-100 dark:contrast-100 transition-[filter,opacity] duration-500';

const guideIconShellClass = (platform) =>
    platform === 'Roblox'
        ? 'bg-slate-100 border-slate-200 text-slate-700 dark:bg-black/35 dark:border-white/10 dark:text-cyan-100'
        : 'bg-indigo-50 dark:bg-black/35 border-indigo-100 dark:border-white/10 text-indigo-700 dark:text-cyan-100';

const EmptyState = ({ message }) => (
    <div className="p-10 bg-white dark:bg-[#161b22] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400">
        {message}
    </div>
);

const PAGE_SIZE = 9;
const CASES_RETURN_POSITION_KEY = 'kuxipilli:cases-return-position';

const usePaginatedResources = (type) => {
    const [items, setItems]             = useState([]);
    const [page, setPage]               = useState(1);
    const [total, setTotal]             = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [loading, setLoading]         = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError]             = useState('');

    useEffect(() => {
        let cancelled = false;
        const fetchFirst = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/api/resources?type=${type}&page=1&limit=${PAGE_SIZE}`);
                if (!cancelled) {
                    setItems(res.data.data);
                    setTotal(res.data.total);
                    setHasNextPage(res.data.hasNextPage);
                    setPage(1);
                    setError('');
                }
            } catch {
                if (!cancelled) setError('No fue posible cargar los recursos en este momento.');
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        fetchFirst();
        return () => { cancelled = true; };
    }, [type]);

    const loadMore = async () => {
        if (loadingMore) return;
        const nextPage = page + 1;
        try {
            setLoadingMore(true);
            const res = await api.get(`/api/resources?type=${type}&page=${nextPage}&limit=${PAGE_SIZE}`);
            setItems((prev) => [...prev, ...res.data.data]);
            setTotal(res.data.total);
            setHasNextPage(res.data.hasNextPage);
            setPage(nextPage);
        } catch {
            // silently ignore — existing items remain visible
        } finally {
            setLoadingMore(false);
        }
    };

    const loadUntilPage = async (targetPage) => {
        if (loadingMore || targetPage <= page) return;

        try {
            setLoadingMore(true);
            let currentPage = page;
            let canLoadMore = hasNextPage;

            while (currentPage < targetPage && canLoadMore) {
                const nextPage = currentPage + 1;
                const res = await api.get(`/api/resources?type=${type}&page=${nextPage}&limit=${PAGE_SIZE}`);
                setItems((prev) => [...prev, ...res.data.data]);
                setTotal(res.data.total);
                setHasNextPage(res.data.hasNextPage);
                setPage(nextPage);
                currentPage = nextPage;
                canLoadMore = res.data.hasNextPage;
            }
        } catch {
            // Keep the already loaded items visible; manual scrolling still works.
        } finally {
            setLoadingMore(false);
        }
    };

    return { items, total, hasNextPage, loading, loadingMore, error, page, loadMore, loadUntilPage };
};

const RealCases = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedGuide, setSelectedGuide] = useState(null);

    const casesState  = usePaginatedResources('case');
    const guidesState = usePaginatedResources('guide');

    const normalizedCases = useMemo(() => {
        const extractYear = (dateStr) => {
            const years = (dateStr || '').match(/\d{4}/g);
            return years ? Math.max(...years.map(Number)) : 0;
        };
        return casesState.items
            .map((item) => ({
                ...item,
                icon: caseIcons[item.category] || <Info className="w-5 h-5" />,
                style: caseStyles[item.color] || caseStyles.indigo,
                platformStyle: platformIconStyles[item.platform] || caseStyles[item.color] || caseStyles.indigo,
            }))
            .sort((a, b) => extractYear(b.caseDate) - extractYear(a.caseDate));
    }, [casesState.items]);

    const normalizedGuides = useMemo(
        () =>
            guidesState.items.map((item) => ({
                ...item,
                icon: <PlatformBadgeIcon platform={item.platform} />,
                dotClass: guideDots[item.color] || guideDots.indigo,
            })),
        [guidesState.items]
    );

    const activeSection = searchParams.get('seccion') === 'guias' ? 'guias' : 'casos';

    const saveCaseReturnPosition = () => {
        window.sessionStorage.setItem(
            CASES_RETURN_POSITION_KEY,
            JSON.stringify({
                path: `${location.pathname}${location.search}`,
                section: activeSection,
                page: casesState.page,
                y: window.scrollY,
                at: Date.now(),
            })
        );
    };

    const handleSectionChange = (section) => {
        const nextParams = new URLSearchParams(searchParams);
        if (section === 'guias') {
            nextParams.set('seccion', 'guias');
        } else {
            nextParams.delete('seccion');
        }
        setSearchParams(nextParams, { replace: true });
    };

    useEffect(() => {
        const rawPosition = window.sessionStorage.getItem(CASES_RETURN_POSITION_KEY);
        if (!rawPosition || activeSection !== 'casos' || casesState.loading || guidesState.loading) return;

        let position;
        try {
            position = JSON.parse(rawPosition);
        } catch {
            window.sessionStorage.removeItem(CASES_RETURN_POSITION_KEY);
            return;
        }

        const isExpired = Date.now() - Number(position.at || 0) > 30 * 60 * 1000;
        const isSamePage = position.path === `${location.pathname}${location.search}`;
        if (isExpired || !isSamePage) {
            window.sessionStorage.removeItem(CASES_RETURN_POSITION_KEY);
            return;
        }

        if (position.page && casesState.page < position.page) {
            casesState.loadUntilPage(position.page);
            return;
        }

        window.sessionStorage.removeItem(CASES_RETURN_POSITION_KEY);
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
                window.scrollTo({ top: Number(position.y) || 0, behavior: 'auto' });
            });
        });
    }, [activeSection, casesState, guidesState.loading, location.pathname, location.search]);

    return (
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] text-gray-900 dark:text-gray-100 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
        <Helmet>
          <title>Casos reales y guías de prevención | Kuxipilli</title>
          <meta name="description" content="Casos documentados de grooming, ciberacoso y riesgos digitales en Roblox, TikTok, Instagram, Discord y YouTube. Guías prácticas para padres y tutores." />
          <meta name="keywords" content="casos grooming niños, ciberacoso real, riesgos TikTok menores, grooming Roblox, seguridad digital guías padres" />
          <link rel="canonical" href="https://kuxipilli.com/casos-y-guias" />
        </Helmet>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8 sm:mb-16"
                >
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4 text-gray-900 dark:text-white">
                        Casos y <span className="text-indigo-600 dark:text-indigo-400">guías</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto italic font-medium">
                        Explora incidentes reales y rutas de protección práctica para acompañar mejor a tu familia en el entorno digital.
                    </p>
                </motion.div>

                <div className="flex justify-center mb-8 sm:mb-14">
                    <div className="inline-flex flex-wrap items-center justify-center gap-3 p-2 bg-white dark:bg-[#161b22] border border-gray-100 dark:border-gray-800 rounded-[2rem] shadow-xl">
                        {sectionTabs.map((tab) => {
                            const isActive = activeSection === tab.key;
                            const count = tab.key === 'casos' ? casesState.total : guidesState.total;

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

                {(casesState.loading && activeSection === 'casos') || (guidesState.loading && activeSection === 'guias') ? (
                    <div className="text-center py-20 text-gray-500 dark:text-gray-400">Cargando recursos...</div>
                ) : null}
                {(casesState.error && activeSection === 'casos') || (guidesState.error && activeSection === 'guias') ? (
                    <div className="text-center py-20 text-red-500">
                        {activeSection === 'casos' ? casesState.error : guidesState.error}
                    </div>
                ) : null}

                {!casesState.loading && !guidesState.loading && !casesState.error && !guidesState.error ? (
                    <div className="space-y-12 sm:space-y-24">
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

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-10">
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
                                                    className="relative bg-white dark:bg-[#111827] rounded-[2.5rem] border border-gray-200/80 dark:border-white/10 shadow-xl shadow-gray-200/70 dark:shadow-black/30 overflow-hidden flex flex-col text-gray-900 dark:text-white"
                                                >
                                                    <img
                                                        src="/images/casosbaner.webp"
                                                        alt=""
                                                        className={visualCardImageClass}
                                                        draggable={false}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-b from-white/96 via-white/90 to-indigo-50/92 dark:from-black/55 dark:via-black/34 dark:to-black/78" />
                                                    <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/70 to-indigo-100/55 dark:from-black/45 dark:via-black/12 dark:to-black/25" />
                                                    <div className="relative z-10 p-5 sm:p-8 flex-grow space-y-6">
                                                        <div className="flex justify-between items-center">
                                                            <div className={`p-3 rounded-2xl border ${item.platformStyle}`}>{item.icon}</div>
                                                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${item.style}`}>
                                                                {item.category}
                                                            </span>
                                                        </div>
                                                        <h3 className="text-2xl font-black text-gray-950 dark:text-white leading-tight dark:drop-shadow-sm">
                                                            {item.title}
                                                        </h3>
                                                        {item.subLabel ? (
                                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-white/10 border border-indigo-100 dark:border-white/15 text-[10px] font-black uppercase tracking-widest text-indigo-700 dark:text-indigo-100">
                                                                {item.subLabel}
                                                            </div>
                                                        ) : null}
                                                        {item.ageRange ? (
                                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-white/10 border border-indigo-100 dark:border-white/15 text-[10px] font-black uppercase tracking-widest text-indigo-700 dark:text-indigo-100">
                                                                Edad: {item.ageRange}
                                                            </div>
                                                        ) : null}
                                                        {item.caseDate ? (
                                                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-white/10 border border-indigo-100 dark:border-white/15 text-[10px] font-black uppercase tracking-widest text-indigo-700/80 dark:text-indigo-100/80">
                                                                📅 {item.caseDate}
                                                            </div>
                                                        ) : null}
                                                        {item.platform ? (
                                                            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-gray-950/[0.04] dark:bg-black/35 border border-gray-200 dark:border-white/10 text-[10px] font-black uppercase tracking-widest text-indigo-700 dark:text-indigo-100">
                                                                <PlatformBadgeIcon platform={item.platform} />
                                                                {item.platform}
                                                            </div>
                                                        ) : null}
                                                        <p className="text-sm italic text-gray-600 dark:text-indigo-50/85 border-l-2 border-indigo-300/70 dark:border-indigo-300/50 pl-4">
                                                            "{item.summary}"
                                                        </p>
                                                        <p className="text-sm text-gray-700 dark:text-white leading-relaxed">
                                                            {item.content}
                                                        </p>
                                                        <div className="space-y-3 pt-4">
                                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-200 flex items-center gap-2">
                                                                <Lightbulb className="w-3 h-3" /> Recomendaciones
                                                            </h4>
                                                            <ul className="space-y-2">
                                                                {item.tips.map((tip, tipIdx) => (
                                                                    <li
                                                                        key={tipIdx}
                                                                        className="flex items-start gap-3 text-xs text-gray-600 dark:text-indigo-50/80"
                                                                    >
                                                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-300 flex-shrink-0" />
                                                                        {tip}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="relative z-10 p-6 bg-gray-950/[0.03] dark:bg-black/35 border-t border-gray-100 dark:border-white/10 backdrop-blur-sm">
                                                        <button
                                                            onClick={() => {
                                                                saveCaseReturnPosition();
                                                                navigate(`/casos/${item.slug}`);
                                                            }}
                                                            className="w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-700 hover:text-indigo-900 dark:text-indigo-100 dark:hover:text-white transition-colors"
                                                        >
                                                            Ver análisis completo <ArrowRight className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            ))
                                        )}
                                    </div>

                                    {casesState.hasNextPage ? (
                                        <div className="flex justify-center">
                                            <button
                                                onClick={casesState.loadMore}
                                                disabled={casesState.loadingMore}
                                                className="px-8 py-4 bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {casesState.loadingMore ? 'Cargando...' : 'Cargar más casos'}
                                            </button>
                                        </div>
                                    ) : null}

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="p-6 sm:p-8 md:p-10 bg-white dark:bg-[#161b22] rounded-[2rem] sm:rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-2xl flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 sm:gap-8"
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

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-10">
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
                                                    className="relative bg-white dark:bg-[#101820] p-5 sm:p-8 rounded-[2rem] sm:rounded-[3rem] border border-gray-200/80 dark:border-white/10 shadow-2xl shadow-gray-200/70 dark:shadow-black/30 flex flex-col overflow-hidden text-gray-900 dark:text-white"
                                                >
                                                    <img
                                                        src="/images/baner_guias.webp"
                                                        alt=""
                                                        className={visualCardImageClass}
                                                        draggable={false}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-b from-white/96 via-white/90 to-indigo-50/92 dark:from-black/50 dark:via-black/30 dark:to-black/75" />
                                                    <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/70 to-indigo-100/55 dark:from-black/40 dark:via-black/10 dark:to-black/20" />
                                                    <div className="relative z-10 flex-grow space-y-6">
                                                        <div className="flex justify-between items-start">
                                                            <div className={`p-4 rounded-2xl border ${guideIconShellClass(guide.platform)}`}>
                                                                {guide.icon}
                                                            </div>
                                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-indigo-100/70">
                                                                Guía práctica
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <div className={`w-2 h-2 rounded-full ${guide.dotClass}`} />
                                                                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-cyan-200">
                                                                    {guide.platform}
                                                                </span>
                                                            </div>
                                                            <h3 className="text-xl font-black text-gray-950 dark:text-white leading-tight dark:drop-shadow-sm">
                                                                {guide.title}
                                                            </h3>
                                                            <p className="text-xs italic text-gray-600 dark:text-indigo-50/80 mt-2 leading-relaxed">
                                                                {guide.description}
                                                            </p>
                                                        </div>
                                                        <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-white/10">
                                                            {guide.steps.map((step, stepIdx) => (
                                                                <div
                                                                    key={stepIdx}
                                                                    className="flex items-start gap-4 text-[10px] font-bold text-gray-700 dark:text-indigo-50/80"
                                                                >
                                                                    <span className="flex-shrink-0 w-4 h-4 rounded-md bg-indigo-100 dark:bg-indigo-400/20 text-indigo-700 dark:text-indigo-100 flex items-center justify-center text-[8px] font-black">
                                                                        {stepIdx + 1}
                                                                    </span>
                                                                    <span className="flex-grow pt-0.5">{step}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => setSelectedGuide(guide)}
                                                        className="relative z-10 mt-8 w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-gray-950 hover:bg-indigo-600 dark:bg-black/45 dark:hover:bg-indigo-600 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl border border-gray-950 dark:border-white/10 transition-all backdrop-blur-sm"
                                                    >
                                                        Ver detalles <ExternalLink className="w-3.5 h-3.5" />
                                                    </button>
                                                </motion.div>
                                            ))
                                        )}
                                    </div>

                                    {guidesState.hasNextPage ? (
                                        <div className="flex justify-center">
                                            <button
                                                onClick={guidesState.loadMore}
                                                disabled={guidesState.loadingMore}
                                                className="px-8 py-4 bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {guidesState.loadingMore ? 'Cargando...' : 'Cargar más guías'}
                                            </button>
                                        </div>
                                    ) : null}
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
                                className="relative w-full max-w-3xl bg-white dark:bg-[#101820] rounded-[2rem] sm:rounded-[3.5rem] shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10 my-auto text-gray-900 dark:text-white"
                            >
                                <img
                                    src="/images/baner_guias.webp"
                                    alt=""
                                    className={visualModalImageClass}
                                    draggable={false}
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-white/96 via-white/90 to-indigo-50/94 dark:from-black/48 dark:via-black/34 dark:to-black/82" />
                                <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/72 to-indigo-100/55 dark:from-black/45 dark:via-black/12 dark:to-black/24" />
                                <button
                                    onClick={() => setSelectedGuide(null)}
                                    className="absolute top-8 right-8 p-3 text-gray-500 hover:text-gray-900 dark:text-indigo-100/70 dark:hover:text-white transition-colors z-20"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                                <div className="relative z-10 p-6 sm:p-14 space-y-8 sm:space-y-10">
                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                        <div className={`p-6 rounded-3xl border ${guideIconShellClass(selectedGuide.platform)}`}>
                                            {selectedGuide.icon}
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black text-indigo-600 dark:text-cyan-200 uppercase tracking-widest">
                                                {selectedGuide.platform}
                                            </span>
                                            <h3 className="text-2xl sm:text-4xl font-black text-gray-950 dark:text-white tracking-tighter leading-tight mt-2 dark:drop-shadow-sm">
                                                {selectedGuide.title}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
                                        <div className="space-y-8">
                                            <div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-200 mb-4 flex items-center gap-2">
                                                    <Info className="w-3.5 h-3.5" /> Por qué importa
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-indigo-50/80 leading-relaxed font-medium italic">
                                                    "{selectedGuide.details?.fullContent}"
                                                </p>
                                            </div>
                                            <div className="p-6 bg-indigo-50 dark:bg-white/10 rounded-3xl border border-indigo-100 dark:border-white/10 backdrop-blur-sm">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-200 mb-3">
                                                    Ruta de configuración
                                                </h4>
                                                <p className="text-sm font-black text-gray-800 dark:text-indigo-50">
                                                    {selectedGuide.details?.setupPath}
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-200 mb-4 flex items-center gap-2">
                                                    <CheckCircle2 className="w-3.5 h-3.5" /> Pasos técnicos
                                                </h4>
                                                <div className="space-y-4">
                                                    {selectedGuide.steps.map((step, idx) => (
                                                        <div key={idx} className="flex items-start gap-4">
                                                            <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black">
                                                                {idx + 1}
                                                            </span>
                                                            <p className="text-xs font-bold text-gray-700 dark:text-indigo-50/85 pt-2">
                                                                {step}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-8">
                                            <div className="p-6 sm:p-8 bg-gray-950/[0.04] dark:bg-black/45 rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 dark:border-white/10 space-y-4 backdrop-blur-sm">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                                                        <Lightbulb className="w-5 h-5 text-yellow-500" />
                                                    </div>
                                                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-950 dark:text-white">
                                                        Consejo del experto
                                                    </h4>
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-indigo-50/75 italic leading-relaxed">
                                                    "{selectedGuide.details?.expertTip}"
                                                </p>
                                            </div>
                                            <div className="p-6 bg-emerald-50 dark:bg-emerald-500/10 rounded-3xl border border-emerald-100 dark:border-emerald-400/20 backdrop-blur-sm">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-200 mb-4">
                                                    Riesgos que ayuda a reducir
                                                </h4>
                                                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-200">
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

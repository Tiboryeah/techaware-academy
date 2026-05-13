// Maps lesson platforms and riskAreas to visual themes for article/guide banners.
// Replace gradientFrom/gradientTo with AI-generated image URLs when ready.

const PLATFORM_THEMES = {
    Roblox: {
        gradient: 'from-red-500 via-red-400 to-orange-400',
        bg: 'bg-red-500',
        icon: '🎮',
        label: 'Roblox',
        accent: '#ef4444',
    },
    Minecraft: {
        gradient: 'from-green-600 via-green-500 to-emerald-400',
        bg: 'bg-green-600',
        icon: '⛏️',
        label: 'Minecraft',
        accent: '#16a34a',
    },
    TikTok: {
        gradient: 'from-pink-500 via-fuchsia-500 to-purple-500',
        bg: 'bg-pink-500',
        icon: '🎵',
        label: 'TikTok',
        accent: '#ec4899',
    },
    Discord: {
        gradient: 'from-indigo-500 via-violet-500 to-purple-600',
        bg: 'bg-indigo-500',
        icon: '💬',
        label: 'Discord',
        accent: '#6366f1',
    },
    Instagram: {
        gradient: 'from-pink-500 via-rose-400 to-orange-400',
        bg: 'bg-pink-500',
        icon: '📸',
        label: 'Instagram',
        accent: '#f43f5e',
    },
    YouTube: {
        gradient: 'from-red-600 via-red-500 to-rose-400',
        bg: 'bg-red-600',
        icon: '▶️',
        label: 'YouTube',
        accent: '#dc2626',
    },
    Twitch: {
        gradient: 'from-purple-600 via-violet-500 to-purple-400',
        bg: 'bg-purple-600',
        icon: '📡',
        label: 'Twitch',
        accent: '#9333ea',
    },
};

const COURSE_BANNERS = [
    {
        platforms: ['Roblox', 'Minecraft'],
        image: '/lesson-banners/videojuegos/videojuegos.png',
    },
    {
        platforms: ['TikTok', 'Discord', 'Instagram'],
        image: '/lesson-banners/redes-sociales/redes.png',
    },
    {
        platforms: ['YouTube', 'Twitch'],
        image: '/lesson-banners/streaming/streaming.png',
    },
];

const RISK_THEMES = {
    'Seguridad de Cuenta':    { gradient: 'from-blue-600 via-blue-500 to-cyan-400',    icon: '🔐', label: 'Seguridad de Cuenta' },
    'Privacidad Avanzada':    { gradient: 'from-teal-600 via-teal-500 to-emerald-400', icon: '🛡️', label: 'Privacidad' },
    'Privacidad':             { gradient: 'from-teal-600 via-teal-500 to-emerald-400', icon: '🛡️', label: 'Privacidad' },
    'Gasto Controlado':       { gradient: 'from-amber-500 via-yellow-500 to-orange-400', icon: '💳', label: 'Gasto Controlado' },
    'Manipulación':           { gradient: 'from-orange-600 via-orange-500 to-red-400',  icon: '⚠️', label: 'Manipulación' },
    'Control parental':       { gradient: 'from-cyan-600 via-sky-500 to-blue-400',      icon: '👨‍👧', label: 'Control Parental' },
    'Desinformación':         { gradient: 'from-slate-600 via-slate-500 to-gray-400',   icon: '📰', label: 'Desinformación' },
    'Publicidad':             { gradient: 'from-violet-600 via-purple-500 to-fuchsia-400', icon: '📢', label: 'Publicidad' },
    'Monetización y publicidad': { gradient: 'from-violet-600 via-purple-500 to-fuchsia-400', icon: '💰', label: 'Monetización' },
    'Tiempo de pantalla':     { gradient: 'from-sky-600 via-blue-500 to-indigo-400',    icon: '⏱️', label: 'Tiempo de Pantalla' },
    'Salud Mental y Física':  { gradient: 'from-green-500 via-emerald-500 to-teal-400', icon: '🧠', label: 'Bienestar Digital' },
    'Uso digital':            { gradient: 'from-indigo-600 via-indigo-500 to-blue-400', icon: '📱', label: 'Uso Digital' },
    'Algoritmos':             { gradient: 'from-gray-700 via-gray-600 to-slate-500',    icon: '🔄', label: 'Algoritmos' },
};

const DEFAULT_THEME = {
    gradient: 'from-indigo-600 via-indigo-500 to-purple-500',
    icon: '📚',
    label: 'Lección',
};

export const getLessonTheme = (platforms = [], riskAreas = []) => {
    const uniquePlatforms = [...new Set(platforms)].filter(Boolean);
    const courseBanner = COURSE_BANNERS.find((banner) =>
        uniquePlatforms.some((platform) => banner.platforms.includes(platform))
    );
    const platformLabel = uniquePlatforms.join(' · ');

    // Priority: first matched platform, then first matched riskArea, then default
    for (const p of uniquePlatforms) {
        if (PLATFORM_THEMES[p]) return { ...PLATFORM_THEMES[p], label: platformLabel || PLATFORM_THEMES[p].label, image: courseBanner?.image };
    }
    for (const r of riskAreas) {
        if (RISK_THEMES[r]) return { ...RISK_THEMES[r], image: courseBanner?.image };
    }
    return { ...DEFAULT_THEME, image: courseBanner?.image };
};

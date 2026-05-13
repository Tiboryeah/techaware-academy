import React from 'react';

const iconClassName = 'w-4 h-4';

export const PlatformIcon = ({ platform, className = iconClassName }) => {
    switch (platform) {
        case 'Roblox':
            return (
                <svg className={`${className} text-slate-100`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M6.38 2.5 21.5 6.38 17.62 21.5 2.5 17.62 6.38 2.5Zm4.43 7.06-1.25 4.87 4.87 1.25 1.25-4.87-4.87-1.25Z" />
                </svg>
            );
        case 'Minecraft':
            return (
                <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" fill="#7a4a25" />
                    <rect x="3" y="3" width="18" height="7" rx="2" fill="#4ade80" />
                    <rect x="6" y="11" width="3" height="3" fill="#1f2937" />
                    <rect x="15" y="11" width="3" height="3" fill="#1f2937" />
                    <rect x="10.5" y="15" width="3" height="3" fill="#1f2937" />
                    <rect x="7.5" y="18" width="3" height="3" fill="#1f2937" />
                    <rect x="13.5" y="18" width="3" height="3" fill="#1f2937" />
                </svg>
            );
        case 'TikTok':
            return (
                <svg className={`${className} text-cyan-400`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16.6 5.82c1.2.88 2.64 1.39 4.17 1.44v3.2a8.3 8.3 0 0 1-4.08-1.05v5.9c0 3.73-2.76 6.36-6.35 6.36-3.33 0-6.1-2.37-6.1-5.82 0-3.57 2.86-5.97 6.35-5.97.39 0 .77.04 1.14.12v3.43a3.44 3.44 0 0 0-1.23-.22c-1.55 0-2.75 1.02-2.75 2.5 0 1.43 1.14 2.43 2.6 2.43 1.57 0 2.72-.97 2.72-2.94V2.33h3.53v3.49Z" />
                </svg>
            );
        case 'Discord':
            return (
                <svg className={`${className} text-indigo-400`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.32 4.37A19.8 19.8 0 0 0 15.36 2.8l-.24.48c1.78.42 3.1 1.05 4.36 1.9a15.5 15.5 0 0 0-5.42-1.67 16.5 16.5 0 0 0-4.12 0 15.5 15.5 0 0 0-5.42 1.67 13.9 13.9 0 0 1 4.36-1.9l-.24-.48a19.8 19.8 0 0 0-4.96 1.57C.54 9.06-.33 13.62.1 18.1a20 20 0 0 0 6.08 3.08l.75-1.6a12.7 12.7 0 0 1-1.92-.92l.47-.36a14.2 14.2 0 0 0 13.04 0l.47.36c-.6.36-1.24.67-1.92.92l.75 1.6a20 20 0 0 0 6.08-3.08c.5-5.18-.85-9.7-3.58-13.73ZM8.02 15.33c-1.17 0-2.13-1.08-2.13-2.4s.94-2.4 2.13-2.4c1.2 0 2.16 1.09 2.13 2.4 0 1.32-.94 2.4-2.13 2.4Zm7.96 0c-1.17 0-2.13-1.08-2.13-2.4s.94-2.4 2.13-2.4c1.2 0 2.16 1.09 2.13 2.4 0 1.32-.94 2.4-2.13 2.4Z" />
                </svg>
            );
        case 'Instagram':
            return (
                <svg className={`${className} text-pink-500`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="16" height="16" x="4" y="4" rx="4" />
                    <circle cx="12" cy="12" r="3.2" />
                    <circle cx="17" cy="7" r=".6" fill="currentColor" stroke="none" />
                </svg>
            );
        case 'YouTube':
            return (
                <svg className={`${className} text-red-500`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M21.58 7.19a2.77 2.77 0 0 0-1.95-1.96C17.91 4.77 12 4.77 12 4.77s-5.91 0-7.63.46a2.77 2.77 0 0 0-1.95 1.96A28.9 28.9 0 0 0 1.96 12c0 1.67.16 3.33.46 4.81a2.77 2.77 0 0 0 1.95 1.96c1.72.46 7.63.46 7.63.46s5.91 0 7.63-.46a2.77 2.77 0 0 0 1.95-1.96c.3-1.48.46-3.14.46-4.81s-.16-3.33-.46-4.81ZM10 15.27V8.73L15.67 12 10 15.27Z" />
                </svg>
            );
        case 'Twitch':
            return (
                <svg className={`${className} text-purple-500`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M4.75 2.5 3.25 6.25v14h5v2.5h2.75l2.5-2.5h3.75l4.5-4.5V2.5h-17Zm15 12.25-2.5 2.5h-4.5l-2.5 2.5v-2.5h-4V4.5h13.5v10.25ZM15.5 8h2v5.5h-2V8Zm-5.5 0h2v5.5h-2V8Z" />
                </svg>
            );
        default:
            return null;
    }
};

export const PlatformIconGroup = ({ platforms = [], className = '' }) => {
    const uniquePlatforms = [...new Set(platforms)].filter(Boolean);

    if (!uniquePlatforms.length) return null;

    return (
        <div className={`flex items-center gap-1.5 ${className}`} aria-label={uniquePlatforms.join(', ')}>
            {uniquePlatforms.map((platform) => (
                <span
                    key={platform}
                    title={platform}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-black/35 shadow-sm backdrop-blur-md"
                >
                    <PlatformIcon platform={platform} />
                </span>
            ))}
        </div>
    );
};

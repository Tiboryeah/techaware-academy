export const getLessonTypeLabel = (type) => {
    switch (type) {
        case 'article':
            return 'Artículo';
        case 'guide':
            return 'Guía';
        case 'video':
            return 'Video';
        default:
            return 'Lección';
    }
};

const lessonTitlePrefixPatterns = {
    article: [/^art[ií]culo\s+\d+\s*:\s*/i],
    video: [/^video\s+\d+\s*:\s*/i],
    guide: [
        /^gu[ií]a(?:\s+visual)?\s*:\s*/i,
        /^gu[ií]a\s+\d+\s*:\s*/i,
    ],
};

export const getLessonDisplayTitle = (title = '', type) => {
    if (!title) return '';

    const patterns = lessonTitlePrefixPatterns[type] || Object.values(lessonTitlePrefixPatterns).flat();
    let cleanTitle = title.trim();

    patterns.forEach((pattern) => {
        cleanTitle = cleanTitle.replace(pattern, '').trim();
    });

    return cleanTitle || title;
};

export const getModuleDisplayTitle = (title = '') => {
    if (!title) return '';

    return title
        .trim()
        .replace(/^m[oó]dulo\s+\d+\s*[:.-]\s*/i, '')
        .trim();
};

export const getLessonDurationLabel = (type, duration) => {
    if (!duration) return '';
    return type === 'video' ? `${duration} minutos` : `${duration} minutos de lectura`;
};

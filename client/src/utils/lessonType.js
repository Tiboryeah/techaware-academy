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

export const getLessonDurationLabel = (type, duration) => {
    if (!duration) return '';
    return type === 'video' ? `${duration} minutos` : `${duration} minutos de lectura`;
};

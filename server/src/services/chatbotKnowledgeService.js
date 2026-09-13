const chatbotKnowledge = require('../data/chatbotKnowledge');

const normalizeText = (value = '') => String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[¿?¡!.,;:()[\]{}"'`´]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const DEFINITION_PATTERNS = [
    'que es',
    'que significa',
    'definicion de',
    'definicion del',
    'definicion',
    'define',
    'que se entiende por',
];

const CONVERSATIONAL_INDICATORS = [
    'como',
    'ayuda',
    'consejo',
    'consejos',
    'pasos',
    'activar',
    'configurar',
    'bloquear',
    'eliminar',
    'hacer',
    'que hago',
    'mi hijo',
    'mi hija',
    'tengo',
    'creo que',
    'le paso',
    'le pasa',
    'sospecho',
    'porque',
    'por que',
    'donde',
    'cuando',
    'puedo',
    'debo',
    'deberia',
    'y en',
    'y si',
    'hola',
    'buenos dias',
    'buenas tardes',
];

const isDefinitionLike = (normalizedText) => {
    // If it contains conversational/troubleshooting markers, it's NOT a pure dictionary query
    const hasConversationalIndicator = CONVERSATIONAL_INDICATORS.some(
        (word) => normalizedText.startsWith(`${word} `) || normalizedText.includes(` ${word} `) || normalizedText === word
    );
    if (hasConversationalIndicator) {
        return false;
    }

    // Direct definition pattern: "que es grooming", "definicion ciberacoso"
    if (DEFINITION_PATTERNS.some((pattern) => normalizedText.startsWith(`${pattern} `) || normalizedText === pattern)) {
        return true;
    }

    // Exact term match (e.g. user just typed "grooming" or "sextorsion" with no extra words)
    const words = normalizedText.split(' ').filter(Boolean);
    if (words.length <= 2) {
        return chatbotKnowledge.some((entry) =>
            entry.terms.some((term) => normalizeText(term) === normalizedText)
        );
    }

    return false;
};

const scoreEntry = (normalizedText, entry) => {
    const terms = entry.terms.map(normalizeText);

    return terms.reduce((score, term) => {
        if (!term) return score;
        if (normalizedText === term) return Math.max(score, 100);
        if (normalizedText.startsWith(`${term} `)) return Math.max(score, 80);
        if (normalizedText.includes(` ${term} `) || normalizedText.endsWith(` ${term}`)) {
            return Math.max(score, 60);
        }
        if (normalizedText.includes(term)) return Math.max(score, 40);
        return score;
    }, 0);
};

const findKnowledgeEntry = (text) => {
    const normalizedText = normalizeText(text);
    if (!normalizedText || !isDefinitionLike(normalizedText)) {
        return null;
    }

    const bestMatch = chatbotKnowledge
        .map((entry) => ({ entry, score: scoreEntry(normalizedText, entry) }))
        .sort((a, b) => b.score - a.score)[0];

    return bestMatch?.score > 0 ? bestMatch.entry : null;
};

const formatSources = (sources = []) => sources
    .map((source) => `${source.label}: ${source.url}`)
    .join(' | ');

const getKnowledgeResponse = (text) => {
    const entry = findKnowledgeEntry(text);
    if (!entry) return null;

    return {
        entry,
        text: `${entry.answer}\n\n${entry.safetyNote}\nFuente: ${formatSources(entry.sources)}\nRevision: ${entry.reviewedAt}.`,
    };
};

/**
 * Returns a brief context snippet for AI prompt if any knowledge entry is relevant.
 */
const getRelevantKnowledgeSnippet = (text) => {
    const normalizedText = normalizeText(text);
    if (!normalizedText) return null;

    const matched = chatbotKnowledge
        .map((entry) => ({ entry, score: scoreEntry(normalizedText, entry) }))
        .filter((item) => item.score >= 40)
        .sort((a, b) => b.score - a.score)[0];

    if (!matched) return null;
    return `Información oficial verificada sobre ${matched.entry.id}: ${matched.entry.answer} Medidas de seguridad recomendadas: ${matched.entry.safetyNote}`;
};

module.exports = {
    findKnowledgeEntry,
    getKnowledgeResponse,
    getRelevantKnowledgeSnippet,
    normalizeText,
};


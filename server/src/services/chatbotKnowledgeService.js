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
    'definicion',
    'define',
    'explicame',
    'explica',
    'como funciona',
    'para que sirve',
    'que sabes',
];

const isDefinitionLike = (normalizedText) => {
    const wordCount = normalizedText.split(' ').filter(Boolean).length;
    return wordCount <= 6 || DEFINITION_PATTERNS.some((pattern) => normalizedText.includes(pattern));
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

module.exports = {
    findKnowledgeEntry,
    getKnowledgeResponse,
    normalizeText,
};

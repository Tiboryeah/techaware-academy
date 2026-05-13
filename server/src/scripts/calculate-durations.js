#!/usr/bin/env node
'use strict';

/**
 * calculate-durations.js
 *
 * Lee todos los seed files de lecciones, cuenta palabras en artículos/guías,
 * y recomienda duraciones con la fórmula:
 *   WPM: 150 (conservador, padres no técnicos leyendo contenido educativo)
 *   Bonus imagen: +0.5 min por imagen
 *   Mínimo artículo: 4 min | Mínimo guía: 3 min
 *   Videos: se mantienen tal cual (actualizar manualmente desde YouTube)
 */

const fs   = require('fs');
const path = require('path');

const WPM       = 150;
const IMG_BONUS = 0.5;
const COURSES_DIR = path.resolve(__dirname, 'seed/courses');

// ============================================================
// Utilidades de texto
// ============================================================
function stripMarkdown(md) {
    return md
        .replace(/```[\s\S]*?```/g, '')
        .replace(/!\[[^\]]*\]\([^\)]*\)/g, '')
        .replace(/\[([^\]]*)\]\([^\)]*\)/g, '$1')
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/\*{1,3}([^*\n]+)\*{1,3}/g, '$1')
        .replace(/_{1,2}([^_\n]+)_{1,2}/g, '$1')
        .replace(/`[^`\n]+`/g, '')
        .replace(/\|/g, ' ')
        .replace(/^[-: |]+$/gm, '')
        .replace(/^>\s*/gm, '')
        .replace(/^\s*[-*+]\s+/gm, '')
        .replace(/^\s*\d+\.\s+/gm, '')
        .replace(/---+/g, '')
        .replace(/\n+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function wc(md)  { return stripMarkdown(md).split(/\s+/).filter(Boolean).length; }
function ic(md)  { return (md.match(/!\[/g) || []).length; }

function recommend(content, type) {
    const words = wc(content);
    const imgs  = ic(content);
    const raw   = words / WPM + imgs * IMG_BONUS;
    const min   = type === 'guide' ? 3 : 4;
    return Math.max(min, Math.round(raw));
}

// ============================================================
// Extractor de template literal
// startPos = posición justo DESPUÉS del backtick de apertura
// ============================================================
function extractTL(text, startPos) {
    let pos = startPos, depth = 0;
    while (pos < text.length) {
        const ch = text[pos];
        if (ch === '\\')                         { pos += 2; continue; }
        if (ch === '`' && depth === 0)           { break; }
        if (ch === '$' && text[pos+1] === '{')   { depth++; pos += 2; continue; }
        if (ch === '}' && depth > 0)             { depth--; pos++; continue; }
        pos++;
    }
    return { content: text.slice(startPos, pos), endPos: pos };
}

// Cuenta de paréntesis/corchetes/llaves para encontrar el cierre
function findMatchingBracket(text, openPos, open, close) {
    let depth = 0, pos = openPos;
    while (pos < text.length) {
        const ch = text[pos];
        if (ch === '\\')  { pos += 2; continue; }
        if (ch === '`')   { pos++; const r = extractTL(text, pos); pos = r.endPos + 1; continue; }
        if (ch === "'")   { pos++; while (pos < text.length && text[pos] !== "'") { if (text[pos]==='\\') pos++; pos++; } pos++; continue; }
        if (ch === '"')   { pos++; while (pos < text.length && text[pos] !== '"') { if (text[pos]==='\\') pos++; pos++; } pos++; continue; }
        if (ch === open)  { depth++; }
        if (ch === close) { depth--; if (depth === 0) return pos; }
        pos++;
    }
    return -1;
}

// ============================================================
// PARSER A — Módulos de videojuegos (module1.js … module6.js)
// ============================================================
function parseGamesModuleFile(filePath) {
    const text      = fs.readFileSync(filePath, 'utf8');
    const LESSON_MK = 'getOrCreateLesson(';
    const CONT_MK   = 'content: `';
    const lessons   = [];
    let pos = 0;

    while (pos < text.length) {
        const lessonIdx = text.indexOf(LESSON_MK, pos);
        if (lessonIdx === -1) break;

        // El objeto config empieza en el primer { después del marcador
        const braceStart = text.indexOf('{', lessonIdx + LESSON_MK.length);
        if (braceStart === -1) break;

        const braceEnd = findMatchingBracket(text, braceStart, '{', '}');
        if (braceEnd === -1) break;

        const block = text.slice(braceStart, braceEnd + 1);

        const titleM = block.match(/title:\s*'([^']+)'/) || block.match(/title:\s*"([^"]+)"/);
        const typeM  = block.match(/type:\s*'([^']+)'/)  || block.match(/type:\s*"([^"]+)"/);
        const durM   = block.match(/duration:\s*(\d+)/);

        let content = '';
        const cIdx = block.indexOf(CONT_MK);
        if (cIdx !== -1) {
            content = extractTL(block, cIdx + CONT_MK.length).content;
        }

        if (titleM && typeM) {
            const type = typeM[1];
            lessons.push({
                title:               titleM[1].trim(),
                type,
                currentDuration:     durM ? parseInt(durM[1]) : 0,
                words:               content ? wc(content)  : 0,
                images:              content ? ic(content)  : 0,
                recommendedDuration: content ? recommend(content, type) : (durM ? parseInt(durM[1]) : 0),
                hasContent:          !!content,
            });
        }

        pos = braceEnd + 1;
    }

    const modTitleM = text.match(/title:\s*'(Módulo[^']+)'/);
    const modDurM   = text.match(/duration:\s*'([^']+)'/);

    return {
        file:                path.basename(filePath, '.js'),
        moduleTitle:         modTitleM ? modTitleM[1] : path.basename(filePath, '.js'),
        currentModuleDurStr: modDurM ? modDurM[1] : '?',
        lessons,
    };
}

// ============================================================
// PARSER B — Redes Sociales (courses/social/catalog.js)
// Contenido en: lessonOverrides.moduleNArticleM.content = `...`
// Blueprint:   ['título', 'tipo', duracion, 'clave']
// ============================================================
function parseSocialCatalog(filePath) {
    const text = fs.readFileSync(filePath, 'utf8');

    // 1. Mapa clave → contenido  (module1Article1 → markdown)
    const overrides = {};
    const ovKeyRe   = /(module\dArticle\d):\s*\{/g;
    let m;
    while ((m = ovKeyRe.exec(text)) !== null) {
        const key   = m[1];
        const after = text.indexOf('content: `', m.index);
        if (after === -1 || after - m.index > 4000) continue;
        overrides[key] = extractTL(text, after + 'content: `'.length).content;
    }

    // 2. Parsear moduleBlueprints
    const bpStart = text.indexOf('const moduleBlueprints = [');
    if (bpStart === -1) return [];
    const bpText = text.slice(bpStart);

    // Encontrar cada bloque de módulo: busca "title: '...', objective:"
    const modTitleRe = /title:\s*'([^']+)',\s*\n\s*objective:/g;
    const modules = [];
    let titleM;

    while ((titleM = modTitleRe.exec(bpText)) !== null) {
        const moduleTitle = titleM[1];

        // Encontrar "lessons: [" después de este título
        const lessonsLabel = 'lessons: [';
        const lessonsStart = bpText.indexOf(lessonsLabel, titleM.index);
        if (lessonsStart === -1) continue;

        // Usar conteo de corchetes para extraer el array completo
        const arrOpen = lessonsStart + lessonsLabel.length - 1; // posición del '['
        const arrClose = findMatchingBracket(bpText, arrOpen, '[', ']');
        if (arrClose === -1) continue;

        const lessonsText = bpText.slice(arrOpen + 1, arrClose);
        const lessons = [];

        // Cada lección es: ['titulo', 'tipo', N, 'clave']
        const lessonRe = /\[\s*'([^']+)',\s*'([^']+)',\s*(\d+),\s*'(\w+)'\s*\]/g;
        let lM;
        while ((lM = lessonRe.exec(lessonsText)) !== null) {
            const [, title, type, durStr, key] = lM;
            const content = overrides[key] || '';
            lessons.push({
                title,
                type,
                currentDuration:     parseInt(durStr),
                words:               content ? wc(content)  : 0,
                images:              content ? ic(content)  : 0,
                recommendedDuration: content ? recommend(content, type) : parseInt(durStr),
                hasContent:          !!content,
            });
        }

        if (lessons.length) modules.push({ moduleTitle, lessons });
    }

    return modules;
}

// ============================================================
// PARSER C — Streaming (courses/streaming/catalog.js)
// Contenido en: const moduleNArticleMContent = `...`
// Lecciones en: courseDefinitions[].lessons[]
// ============================================================
function parseStreamingCatalog(filePath) {
    const text = fs.readFileSync(filePath, 'utf8');

    // 1. Extraer variables de contenido: const module1Article1Content = `...`
    const contentVars = {};
    const varRe = /const\s+(module\d+Article\d+Content)\s*=\s*`/g;
    let m;
    while ((m = varRe.exec(text)) !== null) {
        const varName  = m[1];
        const startPos = m.index + m[0].length;
        contentVars[varName] = extractTL(text, startPos).content;
    }

    // 2. Parsear courseDefinitions
    const cdefsLabel = 'const courseDefinitions = [';
    const cdefsIdx   = text.indexOf(cdefsLabel);
    if (cdefsIdx === -1) return [];

    // Extraer el array completo con conteo de corchetes
    const arrOpen  = cdefsIdx + cdefsLabel.length - 1;
    const arrClose = findMatchingBracket(text, arrOpen, '[', ']');
    if (arrClose === -1) return [];

    const cdefsText = text.slice(arrOpen + 1, arrClose);

    // Encontrar cada módulo: title + lessons array
    // Los bloques de módulo son objetos { title: '...', ..., lessons: [...] }
    const modules = [];
    let pos = 0;

    while (pos < cdefsText.length) {
        // Buscar el inicio del objeto de módulo
        const objOpen = cdefsText.indexOf('{', pos);
        if (objOpen === -1) break;

        const objClose = findMatchingBracket(cdefsText, objOpen, '{', '}');
        if (objClose === -1) break;

        const moduleBlock = cdefsText.slice(objOpen + 1, objClose);

        // Extraer título del módulo
        const titleM = moduleBlock.match(/title:\s*'([^']+)'/);
        if (!titleM) { pos = objClose + 1; continue; }
        const moduleTitle = titleM[1];

        // Encontrar el array de lessons dentro del bloque
        const lessLabel  = 'lessons: [';
        const lessStart  = moduleBlock.indexOf(lessLabel);
        if (lessStart === -1) { pos = objClose + 1; continue; }

        const lArrOpen   = lessStart + lessLabel.length - 1;
        const lArrClose  = findMatchingBracket(moduleBlock, lArrOpen, '[', ']');
        if (lArrClose === -1) { pos = objClose + 1; continue; }

        const lessonsText = moduleBlock.slice(lArrOpen + 1, lArrClose);
        const lessons = [];

        // Cada lección es un objeto { title, type, duration, content?: varName | videoUrl }
        let lPos = 0;
        while (lPos < lessonsText.length) {
            const lObjOpen  = lessonsText.indexOf('{', lPos);
            if (lObjOpen === -1) break;
            const lObjClose = findMatchingBracket(lessonsText, lObjOpen, '{', '}');
            if (lObjClose === -1) break;

            const lBlock = lessonsText.slice(lObjOpen + 1, lObjClose);

            const lTitleM    = lBlock.match(/title:\s*'([^']+)'/);
            const lTypeM     = lBlock.match(/type:\s*'([^']+)'/);
            const lDurM      = lBlock.match(/duration:\s*(\d+)/);
            const lContentM  = lBlock.match(/content:\s*(module\d+Article\d+Content)/);

            if (lTitleM && lTypeM && lDurM) {
                const type       = lTypeM[1];
                const contentVar = lContentM ? lContentM[1] : null;
                const content    = contentVar ? (contentVars[contentVar] || '') : '';
                lessons.push({
                    title:               lTitleM[1].trim(),
                    type,
                    currentDuration:     parseInt(lDurM[1]),
                    words:               content ? wc(content)  : 0,
                    images:              content ? ic(content)  : 0,
                    recommendedDuration: content ? recommend(content, type) : parseInt(lDurM[1]),
                    hasContent:          !!content,
                });
            }

            lPos = lObjClose + 1;
        }

        if (lessons.length) modules.push({ moduleTitle, lessons });
        pos = objClose + 1;
    }

    return modules;
}

// ============================================================
// Formato de salida
// ============================================================
function formatCourse(totalMin) {
    const h = Math.floor(totalMin / 60), m = totalMin % 60;
    if (h === 0) return `${m} min`;
    if (m === 0) return `${h} hora${h > 1 ? 's' : ''}`;
    return `${h} hora${h > 1 ? 's' : ''} ${m} min`;
}

function printModuleReport(moduleTitle, currentDurStr, lessons) {
    console.log(`\n  📘 ${moduleTitle}`);
    console.log(`     Actual: '${currentDurStr}'`);
    let moduleTotal = 0;

    for (const l of lessons) {
        const tag    = `[${l.type.padEnd(7)}]`;
        const shortT = l.title.length > 68 ? l.title.slice(0, 65) + '...' : l.title;
        if (l.type === 'video') {
            console.log(`     ${tag} ${shortT}`);
            console.log(`                Actual: ${l.currentDuration} min  →  ⚠ actualizar manualmente desde YouTube`);
            moduleTotal += l.currentDuration;
        } else {
            const arrow = l.recommendedDuration !== l.currentDuration ? ' ◄ CAMBIO' : '';
            console.log(`     ${tag} ${shortT}`);
            console.log(`                Palabras: ${String(l.words).padStart(4)} | Imgs: ${l.images} | Actual: ${l.currentDuration} min → Rec: ${l.recommendedDuration} min${arrow}`);
            moduleTotal += l.recommendedDuration;
        }
    }
    console.log(`     ${'─'.repeat(60)}`);
    console.log(`     Total módulo: ${moduleTotal} min   →   duration: '${moduleTotal} min'`);
    return moduleTotal;
}

// ============================================================
// Main
// ============================================================
function main() {
    console.log('='.repeat(70));
    console.log('  CÁLCULO DE DURACIONES — Kuxipilli');
    console.log(`  WPM: ${WPM}  |  Bonus/imagen: ${IMG_BONUS} min`);
    console.log(`  Mín artículo: 4 min  |  Mín guía: 3 min  |  Videos: sin cambio`);
    console.log('='.repeat(70));

    // ── CURSO 1: Videojuegos ──
    console.log('\n\n══ CURSO 1: Videojuegos en Línea: Roblox y Minecraft ══');
    const gameFiles = ['module1','module2','module3','module4','module5','module6']
        .map(f => path.join(COURSES_DIR, 'games', `${f}.js`));
    let gameTotal = 0;
    for (const fp of gameFiles) {
        const { moduleTitle, currentModuleDurStr, lessons } = parseGamesModuleFile(fp);
        gameTotal += printModuleReport(moduleTitle, currentModuleDurStr, lessons);
    }
    console.log(`\n  ► TOTAL CURSO VIDEOJUEGOS: ${gameTotal} min  →  duration: '${formatCourse(gameTotal)}'`);

    // ── CURSO 2: Redes Sociales ──
    console.log('\n\n══ CURSO 2: Redes Sociales: TikTok, Discord e Instagram ══');
    const socialMods = parseSocialCatalog(path.join(COURSES_DIR, 'social', 'catalog.js'));
    let socialTotal = 0;
    for (const mod of socialMods) {
        socialTotal += printModuleReport(mod.moduleTitle, '? min', mod.lessons);
    }
    console.log(`\n  ► TOTAL CURSO REDES SOCIALES: ${socialTotal} min  →  duration: '${formatCourse(socialTotal)}'`);

    // ── CURSO 3: Streaming ──
    console.log('\n\n══ CURSO 3: Plataformas de Streaming: YouTube y Twitch ══');
    const streamMods = parseStreamingCatalog(path.join(COURSES_DIR, 'streaming', 'catalog.js'));
    let streamTotal = 0;
    for (const mod of streamMods) {
        streamTotal += printModuleReport(mod.moduleTitle, '? min', mod.lessons);
    }
    console.log(`\n  ► TOTAL CURSO STREAMING: ${streamTotal} min  →  duration: '${formatCourse(streamTotal)}'`);

    // ── Resumen global ──
    const grand = gameTotal + socialTotal + streamTotal;
    console.log('\n' + '='.repeat(70));
    console.log(`  TOTAL LOS 3 CURSOS: ${grand} min (${formatCourse(grand)})`);
    console.log('='.repeat(70));
    console.log('\nNOTA: Videos con duración 2 min = placeholder.');
    console.log('      Actualizar cada video manualmente con la duración real.\n');
}

main();

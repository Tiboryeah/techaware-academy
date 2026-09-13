const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Groq = require('groq-sdk');

const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const Resource = require('../models/Resource');
const { protect } = require('../middleware/authMiddleware');
const { getKnowledgeResponse, getRelevantKnowledgeSnippet } = require('../services/chatbotKnowledgeService');

const router = express.Router();

const GEMINI_MODELS = [
    process.env.GEMINI_MODEL?.trim(),
    'gemini-2.5-flash-lite',
    'gemini-2.5-flash',
    'gemini-3-flash-preview',
    'gemini-flash-latest',
].filter(Boolean);

const GROQ_MODELS = [
    process.env.GROQ_MODEL?.trim(),
    'groq/compound-mini',
    'openai/gpt-oss-20b',
    'qwen/qwen3.6-27b',
].filter(Boolean);

const ENRICHED_SYSTEM_INSTRUCTION = `Eres "Kuxibot", el asistente virtual pedagógico y compañero de seguridad digital infantil de la plataforma Kuxipilli.
Tu propósito es orientar, acompañar y brindar recomendaciones prácticas, humanas y tranquilizadoras a madres, padres y tutores sobre el bienestar y la protección de niñas, niños y adolescentes en internet, videojuegos (Roblox, Minecraft), redes sociales (TikTok, Discord, Instagram) y streaming (YouTube, Twitch).

REGLAS CRÍTICAS DE CONVERSACIÓN (MÁXIMA PRIORIDAD):
1. PROHIBIDO ALUCINAR PELIGROS O FORZAR SIGNIFICADOS SEXUALES:
   - Si el usuario pregunta por una palabra, número, jerga, meme, frase o modismo que repiten los niños (ejemplo: "six seven", memes virales, modas de TikTok, jerga gamer, frases que riman):
     * JAMÁS inventes que significa "sexo", "sexualidad", "sexting", "grooming" ni ningún delito. Inventar que una expresión infantil inofensiva tiene significado sexual o perverso alarma innecesariamente a las familias y es totalmente inaceptable.
     * Si no es una amenaza digital documentada, dilo con total honestidad, calma y naturalidad: explica que NO es un peligro de ciberseguridad, que suele tratarse de un juego de palabras o chiste infantil (como "Why was 6 afraid of 7? Because 7 ate 9"), un audio o meme de TikTok/YouTube, o una broma entre compañeros.
     * Aconseja a los padres preguntarle al menor con curiosidad relajada y sin regaños: "¿Dónde lo escuchaste?", para conversar con confianza.
2. ACEPTAR CORRECCIONES CON HUMILDAD:
   - Si el usuario te indica "No me refiero a eso", "No es eso" o aclara su intención, NUNCA insistas en tu respuesta previa ni te inventes otra teoría alarmista. Acepta la aclaración con simpatía e interés sincero y responde exactamente a lo que pide.
3. FLUIDEZ Y BREVEDAD (RESPUESTAS ÁGILES, NO TESTAMENTOS):
   - NUNCA generes respuestas kilométricas ni des conferencias no solicitadas. Evita listas automáticas de 6 pasos o párrafos interminables a menos que el usuario pida expresamente un manual o procedimiento paso a paso.
   - Mantén tus respuestas en 2 a 3 párrafos breves, conversacionales, directos al grano y fáciles de leer.
4. MEMORIA ACTIVA:
   - Presta atención a los mensajes previos del diálogo para no pedir datos que el usuario ya compartió.
5. PREVENCIÓN REAL Y SERIEDAD ANTE RIESGOS VERDADEROS:
   - Solo cuando haya indicios reales de grooming, sextorsión, ciberacoso u hostigamiento evidente: brinda pasos concretos (guardar capturas de pantalla, no culpar al menor, bloquear, reportar y buscar apoyo).
6. FORMATO VISUAL:
   - Usa negritas con moderación para destacar conceptos clave. Usa listas cortas solo cuando sea indispensable.`;

const STATIC_PLATFORM_CONTEXT = `Base de conocimiento de Kuxipilli:
Kuxipilli es una plataforma educativa para madres, padres y tutores sobre bienestar y seguridad digital infantil.
El nombre Kuxipilli une dos lenguas originarias de México: "kuXi" (vida) y "pilli" (niño): proteger la vida del menor detrás de cada pantalla.
Cursos: 1. Videojuegos en Línea (Roblox, Minecraft), 2. Redes Sociales (TikTok, Discord, Instagram), 3. Streaming (YouTube, Twitch).
Ofrece guías prácticas para cada plataforma y 10 casos reales publicados (grooming, ciberacoso, retos virales, sextorsión, estafas y contacto con desconocidos).`;

const compactText = (value = '', maxLength = 240) => {
    const text = String(value || '').replace(/\s+/g, ' ').trim();
    return text.length > maxLength ? `${text.slice(0, maxLength - 1)}...` : text;
};

const joinList = (items = []) => items.filter(Boolean).join(', ');

const buildSystemInstruction = (platformContext, extraKnowledge = '') => {
    let prompt = `${ENRICHED_SYSTEM_INSTRUCTION}\n\n${platformContext || STATIC_PLATFORM_CONTEXT}`;
    if (extraKnowledge) {
        prompt += `\n\nContexto verificado relevante para enriquecer tu respuesta:\n${extraKnowledge}`;
    }
    return prompt;
};

// Cache de contexto en memoria por 10 minutos para acelerar respuestas drásticamente
let cachedPlatformContext = null;
let lastContextCacheTime = 0;
const CONTEXT_CACHE_TTL = 10 * 60 * 1000;

const buildKuxipilliContext = async () => {
    const now = Date.now();
    if (cachedPlatformContext && (now - lastContextCacheTime < CONTEXT_CACHE_TTL)) {
        return cachedPlatformContext;
    }

    try {
        const [courses, resources] = await Promise.all([
            Course.find({ status: 'published' })
                .select('title description category platforms riskAreas duration')
                .sort({ createdAt: 1 })
                .lean(),
            Resource.find({ isPublished: true, type: { $in: ['case', 'guide'] } })
                .select('type title slug summary description category platform riskLevel')
                .sort({ type: 1, order: 1, createdAt: 1 })
                .lean(),
        ]);

        if (!courses.length && !resources.length) {
            cachedPlatformContext = STATIC_PLATFORM_CONTEXT;
            lastContextCacheTime = now;
            return STATIC_PLATFORM_CONTEXT;
        }

        const guides = resources.filter((resource) => resource.type === 'guide');
        const cases = resources.filter((resource) => resource.type === 'case');

        const lines = [
            STATIC_PLATFORM_CONTEXT,
            `Totales publicados: ${courses.length} cursos, ${cases.length} casos reales y ${guides.length} guias practicas.`,
            `Dato prioritario: si el usuario pregunta cuantos casos reales hay en Kuxipilli, responde que hay ${cases.length} casos reales publicados.`,
        ];

        courses.forEach((course, index) => {
            lines.push(`${index + 1}. Curso: ${course.title} (${course.category || 'general'}). Plataformas: ${joinList(course.platforms) || 'varias'}. ${compactText(course.description, 140)}`);
        });

        cachedPlatformContext = lines.join('\n');
        lastContextCacheTime = now;
        return cachedPlatformContext;
    } catch (error) {
        console.error('[Chatbot] Could not build Kuxipilli context:', error.message);
        return STATIC_PLATFORM_CONTEXT;
    }
};

// ---------------------------------------------------------------------------
// Expanded static fallback — covers all major topics so the chatbot remains
// useful even when both Gemini and Groq are unavailable.
// ---------------------------------------------------------------------------
const FALLBACK_RULES = [
    {
        match: ['cuantos casos', 'cuÃ¡ntos casos', 'cantidad de casos', 'numero de casos', 'nÃºmero de casos'],
        reply: 'Kuxipilli tiene 10 casos reales publicados. Cubren riesgos como grooming, ciberacoso, retos virales, sextorsion, estafas, bienestar emocional y contacto con desconocidos en plataformas como Roblox, Discord, Instagram, TikTok, YouTube y Twitch.',
    },
    {
        match: ['kuxipilli', 'kuxibot', 'que es kuxipilli', 'quÃ© es kuxipilli', 'cursos', 'modulos', 'mÃ³dulos', 'guias', 'guÃ­as', 'casos reales'],
        reply: 'Kuxipilli es una plataforma educativa para madres, padres y tutores sobre seguridad digital infantil. Ofrece cursos de videojuegos, redes sociales y streaming, con modulos, lecciones, evaluaciones, guias practicas, casos reales y Kuxibot para orientar dudas dentro de ese enfoque.',
    },
    // Saludo / presentación
    {
        match: ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'saludos'],
        reply: 'Puedo ayudarte con seguridad digital, control parental y prevención de riesgos en línea para niñas, niños y adolescentes.',
    },
    // Grooming
    {
        match: ['grooming', 'acoso sexual', 'adulto desconocido', 'pedófilo', 'pederasta'],
        reply: 'Si hay indicios de grooming, no borres conversaciones ni evidencia. Corta el contacto inmediatamente, reporta el perfil en la plataforma y busca apoyo de un adulto de confianza o autoridades si el menor está en riesgo.',
    },
    // Ciberacoso / bullying
    {
        match: ['ciberacoso', 'cyberbullying', 'acoso en línea', 'bullying digital', 'me amenazan', 'me insultan'],
        reply: 'Ante ciberacoso: guarda capturas de pantalla como evidencia, bloquea al agresor, reporta el contenido en la plataforma y comunícalo a un adulto de confianza o al centro escolar. No respondas a las provocaciones.',
    },
    // Privacidad / datos personales
    {
        match: ['privacidad', 'datos personales', 'información personal', 'contraseña', 'contraseñas'],
        reply: 'Evita compartir nombre completo, escuela, dirección o número de teléfono en redes sociales. Usa contraseñas largas y únicas para cada cuenta, y activa la verificación en dos pasos siempre que sea posible.',
    },
    // Control parental
    {
        match: ['control parental', 'monitoreo', 'vigilar', 'supervisar', 'aplicación para padres'],
        reply: 'Herramientas como Google Family Link, Microsoft Family Safety o los controles integrados de iOS permiten establecer límites de tiempo, filtrar contenido y revisar actividad. Lo más efectivo es combinarlas con conversaciones abiertas sobre seguridad digital.',
    },
    // Tiempo de pantalla
    {
        match: ['tiempo de pantalla', 'adicción', 'uso excesivo', 'horas en el celular', 'demasiado tiempo'],
        reply: 'Establece horarios claros para el uso de dispositivos, especialmente antes de dormir. Fomenta actividades fuera de pantalla y usa las herramientas de tiempo de pantalla del sistema operativo para fijar límites diarios.',
    },
    // Roblox
    {
        match: ['roblox'],
        reply: 'En Roblox activa el PIN parental, configura la privacidad del chat para "Solo amigos" y revisa el historial de compras. Supervisa con quién interactúa el menor y desactiva el chat si es menor de 10 años.',
    },
    // Minecraft
    {
        match: ['minecraft'],
        reply: 'En Minecraft usa el modo multijugador solo en servidores privados o de confianza. Activa la cuenta Microsoft para menores, configura los controles parentales y explica al menor que no comparta información personal en el juego.',
    },
    // TikTok
    {
        match: ['tiktok', 'tik tok'],
        reply: 'En TikTok configura la cuenta como privada, activa el "Modo seguridad familiar" para vincularla con la cuenta de un padre/madre, establece límites de tiempo y desactiva los mensajes directos para menores.',
    },
    // Instagram
    {
        match: ['instagram'],
        reply: 'En Instagram pon la cuenta en privado, desactiva "Mostrar actividad", revisa quién puede enviar mensajes directos y usa la función de supervisión parental para cuentas de menores de 16 años.',
    },
    // YouTube
    {
        match: ['youtube'],
        reply: 'Usa YouTube Kids para menores o activa el Modo restringido. Revisa el historial de reproducción regularmente y considera crear una cuenta de Google supervisada para que el contenido quede filtrado automáticamente.',
    },
    // Discord
    {
        match: ['discord'],
        reply: 'Discord requiere 13 años mínimo. Si tu hijo lo usa, configura "Escaneo seguro de contenido multimedia" al máximo, desactiva mensajes directos de desconocidos y supervisa los servidores a los que pertenece.',
    },
    // Twitch / streaming
    {
        match: ['twitch', 'streaming en vivo', 'stream'],
        reply: 'Si el menor hace streaming, nunca debe revelar su ubicación, escuela o rutina diaria. Activa el modo solo para seguidores en el chat y establece moderadores de confianza para filtrar comentarios.',
    },
    // Sexting / contenido inapropiado
    {
        match: ['sexting', 'fotos íntimas', 'nudes', 'contenido sexual', 'imágenes comprometedoras'],
        reply: 'Si el menor recibió o compartió imágenes íntimas, no hay que culparlo. Guarda evidencia, reporta el contenido en la plataforma y, si el material se difundió sin consentimiento, presenta una denuncia formal ante las autoridades.',
    },
    // Phishing / estafas
    {
        match: ['phishing', 'estafa', 'fraude', 'link sospechoso', 'enlace extraño', 'premio falso'],
        reply: 'Enseña a los menores a no hacer clic en enlaces desconocidos ni a ingresar datos en sitios no verificados. Ante un mensaje sospechoso, ciérralo sin interactuar y, si comprometió una cuenta, cambia la contraseña inmediatamente.',
    },
    // Redes sociales generales
    {
        match: ['redes sociales', 'facebook', 'snapchat', 'whatsapp'],
        reply: 'En cualquier red social: cuenta privada, no aceptar solicitudes de desconocidos, no compartir ubicación en tiempo real y revisar periódicamente la lista de contactos y los permisos de la aplicación.',
    },
];

const getFallbackResponse = (text) => {
    const lower = text.toLowerCase();

    for (const rule of FALLBACK_RULES) {
        if (rule.match.some((kw) => lower.includes(kw))) {
            return rule.reply;
        }
    }

    return 'Puedo orientarte sobre ciberseguridad, control parental y protección digital para niñas, niños y adolescentes. Cuéntame tu duda concreta.';
};

// ---------------------------------------------------------------------------
// Gemini
// ---------------------------------------------------------------------------
const isRetryableGeminiError = (error) => {
    const status = error?.status;
    return status === 429 || status === 500 || status === 503;
};

const generateGeminiReply = async ({ apiKey, chatHistory, text, platformContext, extraKnowledge }) => {
    const genAI = new GoogleGenerativeAI(apiKey);
    let lastError;

    for (const modelName of GEMINI_MODELS) {
        try {
            const model = genAI.getGenerativeModel({
                model: modelName,
                systemInstruction: buildSystemInstruction(platformContext, extraKnowledge),
                generationConfig: {
                    maxOutputTokens: 380,
                    temperature: 0.65,
                },
            });

            const chat = model.startChat({ history: chatHistory });
            const result = await chat.sendMessage(text);

            return {
                text: result.response.text(),
                modelName,
                provider: 'gemini',
            };
        } catch (error) {
            lastError = error;
            console.error(`[Chatbot] Gemini failed with ${modelName}:`, error.message);

            if (!isRetryableGeminiError(error)) {
                break;
            }
        }
    }

    throw lastError;
};

// ---------------------------------------------------------------------------
// Groq fallback (multi-model fallback)
// ---------------------------------------------------------------------------
const generateGroqReply = async ({ apiKey, chatHistory, text, platformContext, extraKnowledge }) => {
    const groq = new Groq({ apiKey });
    let lastError;

    // Convert Gemini-style history to OpenAI-style messages
    const messages = [
        { role: 'system', content: buildSystemInstruction(platformContext, extraKnowledge) },
        ...chatHistory.map((m) => ({
            role: m.role === 'model' ? 'assistant' : 'user',
            content: m.parts[0].text,
        })),
        { role: 'user', content: text },
    ];

    for (const modelName of GROQ_MODELS) {
        try {
            const completion = await groq.chat.completions.create({
                model: modelName,
                messages,
                max_tokens: 380,
                temperature: 0.65,
            });

            return {
                text: completion.choices[0].message.content,
                modelName,
                provider: 'groq',
            };
        } catch (error) {
            lastError = error;
            console.error(`[Chatbot] Groq failed with ${modelName}:`, error.message);
        }
    }

    throw lastError;
};

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

// GET /api/chatbot/history — Obtiene la conversación activa más reciente del usuario
router.get('/history', protect, async (req, res) => {
    try {
        const userId = req.user._id;
        const conversation = await Conversation.findOne({ userId }).sort({ lastActivityAt: -1, createdAt: -1 });
        if (!conversation) {
            return res.json({ conversationId: null, messages: [] });
        }

        const messages = await Message.find({ conversationId: conversation._id })
            .sort({ createdAt: 1 })
            .limit(50);

        return res.json({
            conversationId: conversation._id,
            messages,
        });
    } catch (error) {
        console.error('[Chatbot] Error fetching history:', error);
        return res.status(500).json({ message: 'Error al recuperar el historial del chat.' });
    }
});

// POST /api/chatbot/reset — Inicia una nueva conversación limpia para el usuario
router.post('/reset', protect, async (req, res) => {
    try {
        const userId = req.user._id;
        const conversation = await Conversation.create({ userId });
        return res.json({
            conversationId: conversation._id,
            message: 'Nueva conversación iniciada.',
        });
    } catch (error) {
        console.error('[Chatbot] Error resetting conversation:', error);
        return res.status(500).json({ message: 'Error al reiniciar la conversación.' });
    }
});

// POST /api/chatbot/message — Envía un mensaje al chatbot con memoria de contexto
router.post('/message', protect, async (req, res) => {
    const { text, conversationId } = req.body;
    const userId = req.user._id;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
        return res.status(400).json({ message: 'El mensaje no puede estar vacío.' });
    }

    if (text.length > 1000) {
        return res.status(400).json({ message: 'El mensaje no puede superar los 1000 caracteres.' });
    }

    const geminiKey = (process.env.GEMINI_API_KEY || '').trim();
    const groqKey   = (process.env.GROQ_API_KEY   || '').trim();
    const isMock = process.env.USE_MOCK_AI === 'true' || (!geminiKey || geminiKey === 'your_gemini_api_key');

    // Recuperar conversación existente o crear una nueva
    let conversation;
    if (conversationId) {
        conversation = await Conversation.findById(conversationId);
    }
    if (!conversation) {
        conversation = await Conversation.findOne({ userId }).sort({ lastActivityAt: -1, createdAt: -1 });
        if (!conversation) {
            conversation = await Conversation.create({ userId });
        }
    }

    const previousMessageCount = await Message.countDocuments({ conversationId: conversation._id });

    // Verificación de consulta directa de conocimiento verificado (RF2):
    // Solo intercepta como respuesta estática de diccionario si es una pregunta directa de definición
    // y no hay una conversación activa previa en curso.
    const knowledgeResult = getKnowledgeResponse(text);
    if (knowledgeResult && previousMessageCount === 0) {
        const userMsg = await Message.create({
            conversationId: conversation._id,
            sender: 'user',
            text,
        });

        const botMsg = await Message.create({
            conversationId: conversation._id,
            sender: 'bot',
            text: knowledgeResult.text,
        });

        conversation.lastActivityAt = Date.now();
        await conversation.save();

        return res.json({
            conversationId: conversation._id,
            userMessage: userMsg,
            botMessage: botMsg,
            provider: 'knowledge_base',
            sourceIds: [knowledgeResult.entry.id],
        });
    }

    // ── Modo Simulado / Sin claves de IA ────────────────────────────────────
    if (isMock) {
        const botText = getFallbackResponse(text);
        const botMsg = await Message.create({
            conversationId: conversation._id,
            sender: 'bot',
            text: botText,
        });

        conversation.lastActivityAt = Date.now();
        await conversation.save();

        return res.json({
            conversationId: conversation._id,
            botMessage: botMsg,
            isMock: true,
        });
    }

    // Guardar mensaje del usuario en producción con IA
    const userMsg = await Message.create({
        conversationId: conversation._id,
        sender: 'user',
        text,
    });

    const platformContext = await buildKuxipilliContext();
    const extraKnowledge = getRelevantKnowledgeSnippet(text) || (knowledgeResult ? knowledgeResult.entry.answer : '');

    // Construir historial de mensajes para memoria contextual de la IA (últimos 10 mensajes)
    const historyDocs = await Message.find({
        conversationId: conversation._id,
        _id: { $ne: userMsg._id },
    })
        .sort({ createdAt: -1 })
        .limit(10);

    const orderedHistory = historyDocs.reverse();
    const chatHistory = [];
    for (const msg of orderedHistory) {
        const role = msg.sender === 'user' ? 'user' : 'model';
        if (chatHistory.length > 0 && chatHistory[chatHistory.length - 1].role === role) {
            chatHistory[chatHistory.length - 1].parts[0].text += `\n${msg.text}`;
        } else {
            chatHistory.push({
                role,
                parts: [{ text: msg.text }],
            });
        }
    }

    // Gemini exige que el historial comience con un mensaje de 'user'
    while (chatHistory.length > 0 && chatHistory[0].role !== 'user') {
        chatHistory.shift();
    }

    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    const anonymizedText = text.replace(emailRegex, '[EMAIL]').replace(phoneRegex, '[TLF]');

    // ── Intentar Gemini → Groq → Fallback local ────────────────────────────
    try {
        const result = await generateGeminiReply({
            apiKey: geminiKey,
            chatHistory,
            text: anonymizedText,
            platformContext,
            extraKnowledge,
        });

        const botMsg = await Message.create({
            conversationId: conversation._id,
            sender: 'bot',
            text: result.text,
        });

        conversation.lastActivityAt = Date.now();
        await conversation.save();

        return res.json({
            conversationId: conversation._id,
            userMessage: userMsg,
            botMessage: botMsg,
            model: result.modelName,
            provider: result.provider,
        });
    } catch (geminiError) {
        console.error('[Chatbot] Gemini no disponible, intentando Groq:', geminiError.message);

        if (groqKey) {
            try {
                const result = await generateGroqReply({
                    apiKey: groqKey,
                    chatHistory,
                    text: anonymizedText,
                    platformContext,
                    extraKnowledge,
                });

                const botMsg = await Message.create({
                    conversationId: conversation._id,
                    sender: 'bot',
                    text: result.text,
                });

                conversation.lastActivityAt = Date.now();
                await conversation.save();

                return res.json({
                    conversationId: conversation._id,
                    userMessage: userMsg,
                    botMessage: botMsg,
                    model: result.modelName,
                    provider: result.provider,
                });
            } catch (groqError) {
                console.error('[Chatbot] Groq no disponible, recurriendo a fallback:', groqError.message);
            }
        }

        // Fallback estático de emergencia
        const botText = getFallbackResponse(text);
        const botMsg = await Message.create({
            conversationId: conversation._id,
            sender: 'bot',
            text: botText,
        });

        conversation.lastActivityAt = Date.now();
        await conversation.save();

        return res.json({
            conversationId: conversation._id,
            userMessage: userMsg,
            botMessage: botMsg,
            isFallback: true,
        });
    }
});

module.exports = router;

const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Groq = require('groq-sdk');

const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const GEMINI_MODELS = [
    process.env.GEMINI_MODEL?.trim(),
    'gemini-2.5-flash-lite',
    'gemini-2.5-flash',
    'gemini-3-flash-preview',
    'gemini-flash-latest',
].filter(Boolean);

// llama-3.3-70b-versatile has the most generous free quota on Groq
const GROQ_MODEL = process.env.GROQ_MODEL?.trim() || 'llama-3.3-70b-versatile';

const SYSTEM_INSTRUCTION = `Eres "Kuxibot", el asistente experto de Kuxipilli. Tu misión es orientar sobre seguridad digital infantil, ciberacoso y acompañamiento parental.

REGLAS CRÍTICAS:
1. Solo puedes responder temas relacionados con ciberseguridad, alfabetización digital y acompañamiento parental. Si el usuario pregunta sobre otros temas, redirígelo con amabilidad a los objetivos del sistema.
2. Tu tono debe ser profesional, empático y claro.
3. Siempre prioriza la seguridad física y emocional del menor.
4. Si detectas señales de grooming o peligro inminente, indica pasos de protección, recomienda no seguir interactuando con el sospechoso y sugiere buscar apoyo formal.
5. Responde siempre en español.
6. Tus respuestas deben ser breves y concisas: máximo 2 o 3 párrafos cortos.
7. No uses formato Markdown para títulos o negritas. Escribe en texto plano. Si necesitas enumerar, usa listas normales como "1. ", "2. ".
8. No te presentes ni saludes al inicio. Ve directo a la respuesta.`;

// ---------------------------------------------------------------------------
// Expanded static fallback — covers all major topics so the chatbot remains
// useful even when both Gemini and Groq are unavailable.
// ---------------------------------------------------------------------------
const FALLBACK_RULES = [
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

const generateGeminiReply = async ({ apiKey, chatHistory, text }) => {
    const genAI = new GoogleGenerativeAI(apiKey);
    let lastError;

    for (const modelName of GEMINI_MODELS) {
        try {
            const model = genAI.getGenerativeModel({
                model: modelName,
                systemInstruction: SYSTEM_INSTRUCTION,
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
// Groq fallback
// ---------------------------------------------------------------------------
const generateGroqReply = async ({ apiKey, chatHistory, text }) => {
    const groq = new Groq({ apiKey });

    // Convert Gemini-style history to OpenAI-style messages
    const messages = [
        { role: 'system', content: SYSTEM_INSTRUCTION },
        ...chatHistory.map((m) => ({
            role: m.role === 'model' ? 'assistant' : 'user',
            content: m.parts[0].text,
        })),
        { role: 'user', content: text },
    ];

    const completion = await groq.chat.completions.create({
        model: GROQ_MODEL,
        messages,
        max_tokens: 512,
        temperature: 0.7,
    });

    return {
        text: completion.choices[0].message.content,
        modelName: GROQ_MODEL,
        provider: 'groq',
    };
};

// ---------------------------------------------------------------------------
// Route
// ---------------------------------------------------------------------------
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

    console.log(`[Chatbot] Request from ${userId} | Mock: ${isMock} | Groq available: ${!!groqKey}`);

    // ── Mock / no API key ──────────────────────────────────────────────────
    if (isMock) {
        let conversation;
        if (conversationId) {
            conversation = await Conversation.findById(conversationId);
        } else {
            conversation = await Conversation.create({ userId });
        }

        const botText = getFallbackResponse(text);
        const botMsg = await Message.create({
            conversationId: conversation._id,
            sender: 'bot',
            text: botText,
        });

        return res.json({
            conversationId: conversation._id,
            botMessage: botMsg,
            isMock: true,
        });
    }

    // ── Build shared history ───────────────────────────────────────────────
    let conversation;
    if (conversationId) {
        conversation = await Conversation.findById(conversationId);
    } else {
        conversation = await Conversation.create({ userId });
    }

    const historyMessages = await Message.find({ conversationId: conversation._id })
        .sort({ createdAt: -1 })
        .limit(10);

    let chatHistory = historyMessages.reverse().map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
    }));

    while (chatHistory.length > 0 && chatHistory[0].role === 'model') {
        chatHistory.shift();
    }

    const cleanedHistory = [];
    chatHistory.forEach((msg, idx) => {
        if (idx === 0 || msg.role !== cleanedHistory[cleanedHistory.length - 1].role) {
            cleanedHistory.push(msg);
        }
    });
    chatHistory = cleanedHistory;

    const userMsg = await Message.create({
        conversationId: conversation._id,
        sender: 'user',
        text,
    });

    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    const anonymizedText = text.replace(emailRegex, '[EMAIL]').replace(phoneRegex, '[TLF]');

    // ── Try Gemini → Groq → static fallback ───────────────────────────────
    try {
        const result = await generateGeminiReply({
            apiKey: geminiKey,
            chatHistory,
            text: anonymizedText,
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
        console.error('[Chatbot] Gemini unavailable, trying Groq:', geminiError.message);

        if (groqKey) {
            try {
                const result = await generateGroqReply({
                    apiKey: groqKey,
                    chatHistory,
                    text: anonymizedText,
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
                console.error('[Chatbot] Groq unavailable, using static fallback:', groqError.message);
            }
        }

        // Static fallback
        const botText = getFallbackResponse(text);
        const botMsg = await Message.create({
            conversationId: conversation._id,
            sender: 'bot',
            text: botText,
        });

        return res.json({
            conversationId: conversation._id,
            userMessage: userMsg,
            botMessage: botMsg,
            isFallback: true,
        });
    }
});

module.exports = router;

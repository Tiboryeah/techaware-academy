const express = require('express');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

const GEMINI_MODELS = [
    process.env.GEMINI_MODEL?.trim(),
    'gemini-2.5-flash-lite',
    'gemini-2.5-flash',
    'gemini-3-flash-preview',
    'gemini-flash-latest',
].filter(Boolean);

const SYSTEM_INSTRUCTION = `Eres "Kuxibot", el asistente experto de Kuxipilli. Tu misión es ser un experto en seguridad digital infantil y ciberacoso.

REGLAS CRITICAS:
1. REGLA RN-07: Solo puedes responder temas relacionados con ciberseguridad, alfabetización digital y acompañamiento parental. Si el usuario pregunta cosas fuera de estos temas (cocina, deportes, tareas escolares generales, etc.), redirígelo cordialmente a los objetivos del sistema.
2. Tu tono es profesional, empático y experto.
3. Siempre prioriza la seguridad física y emocional del menor.
4. Si detectas señales de Grooming o peligro inminente: Indica pasos legales y recomienda no hablar más con el sospechoso.
5. Responde siempre en Español.
6. Tus respuestas DEBEN ser breves y muy concisas (máximo 2 o 3 párrafos cortos en total). Sé completo en la información pero ve directo al grano, sin dar explicaciones excesivamente largas.
7. ESTRICTAMENTE PROHIBIDO usar formato Markdown (como ###, **, *, _ o similares) para títulos o negritas. Escribe en texto completamente plano y limpio. Usa listas numeradas normales (ejemplo: "1. ", "2. ") si necesitas enlistar algo.
8. NO te presentes ni saludes al inicio de tus mensajes (NUNCA digas "Hola, soy Kuxibot..."). Ve directo a la respuesta, asume que el usuario ya sabe quién eres y están en medio de una plática.`;

// Simple rule-based logic (Fallback)
const getFallbackResponse = (text) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('hola')) return 'Hola. Puedo ayudarte con seguridad digital, control parental y riesgos en linea.';
    if (lowerText.includes('roblox')) return 'Para Roblox, activa el PIN parental, revisa restricciones de cuenta y confirma la edad configurada.';
    if (lowerText.includes('grooming')) return 'El grooming es grave. No borres evidencia, bloquea el contacto y reporta a la plataforma y autoridades.';
    return 'Puedo orientarte sobre ciberseguridad, control parental y proteccion digital para menores.';
};

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

router.post('/message', protect, async (req, res) => {
    const { text, conversationId } = req.body;
    const userId = req.user._id;

    const currentApiKey = (process.env.GEMINI_API_KEY || '').trim();
    const isMock = process.env.USE_MOCK_AI === 'true' || !currentApiKey || currentApiKey === 'your_gemini_api_key';

    console.log(`[Chatbot] Request from ${userId} | Mock: ${isMock} | Models: ${GEMINI_MODELS.join(', ')}`);

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

    try {
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

        const { text: botText, modelName } = await generateGeminiReply({
            apiKey: currentApiKey,
            chatHistory,
            text: anonymizedText,
        });

        const botMsg = await Message.create({
            conversationId: conversation._id,
            sender: 'bot',
            text: botText,
        });

        conversation.lastActivityAt = Date.now();
        await conversation.save();

        res.json({
            conversationId: conversation._id,
            userMessage: userMsg,
            botMessage: botMsg,
            model: modelName,
        });
    } catch (error) {
        console.error('Gemini API Error Detail:', error);

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

        res.json({
            conversationId: conversation._id,
            botMessage: botMsg,
            isFallback: true,
        });
    }
});

module.exports = router;

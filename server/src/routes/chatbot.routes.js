const express = require('express');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const router = express.Router();

// Initialize Gemini
const apiKey = (process.env.GEMINI_API_KEY || "").trim();
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `Eres el "Guardián Virtual" de TechAware Kids. Tu misión es ser un experto en seguridad digital infantil y ciberacoso.
        
        REGLAS CRÍTICAS:
        1. Tu tono es profesional, empático y experto.
        2. Siempre prioriza la seguridad física y emocional del menor.
        3. Si detectas señales de Grooming o peligro inminente: Indica pasos legales (no borrar evidencia, denunciar ante autoridades) y recomienda no hablar más con el sospechoso.
        4. No menciones que eres una IA de forma robótica, actúa como el guardián de la plataforma.
        5. Habla sobre: Roblox (PIN, restricciones), TikTok (Sincronización familiar), YouTube (Cuentas supervisadas), Twitch (Moderación), Ciberacoso, Grooming y bienestar digital.
        6. Si no sabes algo, remite a fuentes oficiales como UNICEF o centros de seguridad de las plataformas.
        7. Responde siempre en Español.`
});

// Simple rule-based logic (Fallback)
const getFallbackResponse = (text) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('hola')) return '¡Hola! Soy tu asistente de seguridad digital. ¿Cómo puedo ayudarte hoy?';
    if (lowerText.includes('roblox')) return 'Para Roblox, activa el PIN parental y revisa las restricciones de cuenta.';
    if (lowerText.includes('grooming')) return '🚨 El Grooming es grave. No borres evidencia y contacta a las autoridades.';
    return 'Entiendo. Como experto en seguridad, te recomiendo revisar nuestras guías de control parental en la sección de "Casos Reales".';
};

const { protect } = require('../middleware/authMiddleware');

// @desc    Send message to chatbot
// @route   POST /api/chatbot/message
// @access  Private
router.post('/message', protect, async (req, res) => {
    const { text, conversationId } = req.body;
    const userId = req.user._id;

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'tu_api_key_aqui') {
        console.error("[Chatbot] GEMINI_API_KEY not configured correctly.");
        return res.json({
            conversationId: conversationId,
            botMessage: { text: "⚠️ El sistema de IA no está configurado (falta la API Key en el servidor).", sender: 'bot' }
        });
    }

    try {
        let conversation;
        if (conversationId) {
            conversation = await Conversation.findById(conversationId);
        } else {
            conversation = await Conversation.create({ userId });
        }

        // 1. Get Conversation History for LLM Context
        const historyMessages = await Message.find({ conversationId: conversation._id })
            .sort({ createdAt: -1 })
            .limit(6);

        console.log(`[Chatbot] Found ${historyMessages.length} history messages.`);

        const chatHistory = historyMessages.reverse().map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
        }));

        // 2. Save current user message
        const userMsg = await Message.create({
            conversationId: conversation._id,
            sender: 'user',
            text,
        });

        // 3. Generate response using Gemini
        let botText;
        try {
            const chat = model.startChat({
                history: chatHistory,
            });
            const result = await chat.sendMessage(text);
            botText = result.response.text();
        } catch (apiError) {
            console.error("Gemini API Error:", apiError);
            botText = getFallbackResponse(text);
        }

        // 4. Save bot message
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
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

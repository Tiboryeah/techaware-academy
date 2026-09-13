import React, { useState, useRef, useEffect, useContext } from 'react';
import { MessageCircle, X, Send, ShieldCheck, Sparkles, User, Zap, RotateCcw, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import logo from '../assets/logo_v2_sm.webp';

const INITIAL_GREETING = {
    id: 1,
    text: "¡Hola! Soy **Kuxibot**, tu asistente y compañero en seguridad digital infantil. Mi misión es ayudarte a proteger a tus hijas e hijos en internet, videojuegos y redes sociales con consejos claros y empáticos.\n\n¿En qué plataforma o situación te gustaría que te oriente hoy?",
    sender: 'bot',
};

const SUGGESTED_PROMPTS = [
    { label: "🎮 Protección en Roblox", text: "¿Cómo configuro la privacidad y el PIN parental en Roblox?" },
    { label: "📱 Supervisión en TikTok", text: "¿Cómo funciona la Sincronización Familiar en TikTok?" },
    { label: "🛡️ Detectar ciberacoso", text: "¿Qué señales indican que un niño está sufriendo ciberacoso?" },
    { label: "💬 Hablar sobre riesgos", text: "¿Cómo puedo hablar de seguridad digital con mis hijos sin asustarlos?" },
];

const Chatbot = () => {
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([INITIAL_GREETING]);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [conversationId, setConversationId] = useState(null);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const chatContainerRef = useRef(null);

    // Cerrar el chat al presionar Escape o dar click fuera
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        const handleClickOutside = (e) => {
            if (chatContainerRef.current && !chatContainerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        const timer = setTimeout(() => {
            window.addEventListener('keydown', handleKeyDown);
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }, 50);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isOpen]);

    const scrollToNewestMessage = (isBot = false) => {
        if (!messagesContainerRef.current) return;

        const container = messagesContainerRef.current;
        if (isBot) {
            const messageDivs = container.querySelectorAll('.message-item');
            if (messageDivs.length > 0) {
                const lastMessage = messageDivs[messageDivs.length - 1];
                lastMessage.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        } else {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (messages.length > 1) {
            const lastMessage = messages[messages.length - 1];
            scrollToNewestMessage(lastMessage.sender === 'bot');
        }
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => scrollToNewestMessage(false), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        document.body.classList.toggle('kuxibot-open', isOpen);
        window.dispatchEvent(new CustomEvent('kuxibot:toggle', { detail: { isOpen } }));
    }, [isOpen]);

    useEffect(() => {
        return () => {
            document.body.classList.remove('kuxibot-open');
            window.dispatchEvent(new CustomEvent('kuxibot:toggle', { detail: { isOpen: false } }));
        };
    }, []);

    // Cargar historial previo de la conversación activa cuando el usuario está logueado
    useEffect(() => {
        const fetchHistory = async () => {
            if (!user) return;
            try {
                setIsLoadingHistory(true);
                const { data } = await api.get('/api/chatbot/history');
                if (data && data.messages && data.messages.length > 0) {
                    setConversationId(data.conversationId);
                    const formatted = data.messages.map((m) => ({
                        id: m._id || m.createdAt,
                        text: m.text,
                        sender: m.sender,
                    }));
                    setMessages(formatted);
                }
            } catch (err) {
                console.warn('[Chatbot] No se pudo cargar historial previo:', err.message);
            } finally {
                setIsLoadingHistory(false);
            }
        };

        if (isOpen && user) {
            fetchHistory();
        }
    }, [isOpen, user]);

    const handleSendMessage = async (e, overrideText = null) => {
        if (e) e.preventDefault();
        const textToSend = (overrideText || inputText).trim();
        if (!textToSend) return;

        const userMessage = { id: Date.now(), text: textToSend, sender: 'user' };
        setMessages((prev) => [...prev, userMessage]);
        setInputText("");
        setIsTyping(true);

        if (!user) {
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: Date.now() + 1,
                        text: "Para interactuar con el **Guardián Virtual Kuxibot** y tener memoria de tus conversaciones, es necesario que inicies sesión en tu cuenta. [Ir a Iniciar Sesión](/iniciar-sesion)",
                        sender: 'bot',
                    },
                ]);
                setIsTyping(false);
            }, 600);
            return;
        }

        try {
            const { data } = await api.post('/api/chatbot/message', {
                text: textToSend,
                conversationId: conversationId,
            });

            if (data.conversationId) {
                setConversationId(data.conversationId);
            }

            const botMessage = {
                id: data.botMessage?._id || Date.now() + 1,
                text: data.botMessage?.text || "No pude generar una respuesta en este momento.",
                sender: 'bot',
                provider: data.provider,
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    text: `⚠️ **Aviso:** ${errorMsg}`,
                    sender: 'bot',
                },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleResetConversation = async () => {
        try {
            setIsTyping(true);
            const { data } = await api.post('/api/chatbot/reset');
            if (data?.conversationId) {
                setConversationId(data.conversationId);
            } else {
                setConversationId(null);
            }
            setMessages([INITIAL_GREETING]);
        } catch (err) {
            setMessages([INITIAL_GREETING]);
            setConversationId(null);
        } finally {
            setIsTyping(false);
        }
    };

    const renderFormattedMessage = (text) => {
        if (!text) return null;
        const lines = text.split('\n');

        return lines.map((line, lineIdx) => {
            const trimmed = line.trim();

            // Encabezados tipo ###
            if (trimmed.startsWith('### ') || trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
                const headerText = trimmed.replace(/^#+\s*/, '');
                return (
                    <h4 key={lineIdx} className="font-black text-indigo-700 dark:text-indigo-300 mt-2.5 mb-1 text-xs sm:text-sm tracking-tight">
                        {headerText}
                    </h4>
                );
            }

            // Elementos de lista (viñetas * o -)
            if (/^[-*]\s+/.test(trimmed)) {
                const itemContent = trimmed.replace(/^[-*]\s+/, '');
                return (
                    <div key={lineIdx} className="flex items-start gap-2 my-1 pl-1">
                        <span className="text-indigo-500 font-bold leading-tight mt-0.5">•</span>
                        <div className="flex-1">
                            {renderInlineFormatting(itemContent)}
                        </div>
                    </div>
                );
            }

            // Elementos numerados (1. , 2. )
            const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
            if (numberedMatch) {
                const [, num, content] = numberedMatch;
                return (
                    <div key={lineIdx} className="flex items-start gap-2 my-1 pl-1">
                        <span className="flex-shrink-0 text-xs font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 rounded px-1.5 py-0.5 mt-0.5">
                            {num}.
                        </span>
                        <div className="flex-1">
                            {renderInlineFormatting(content)}
                        </div>
                    </div>
                );
            }

            // Párrafo normal o salto
            if (!trimmed) {
                return <div key={lineIdx} className="h-1.5" />;
            }

            return (
                <p key={lineIdx} className={lineIdx > 0 ? 'mt-1.5' : ''}>
                    {renderInlineFormatting(line)}
                </p>
            );
        });
    };

    const renderInlineFormatting = (content) => {
        // Parsear enlaces tipo [texto](url) y negritas **texto**
        const linkRegex = /\[(.*?)\]\((.*?)\)/g;
        const hasLinks = linkRegex.test(content);

        if (hasLinks) {
            const parts = [];
            let lastIndex = 0;
            let match;
            const regex = /\[(.*?)\]\((.*?)\)/g;

            while ((match = regex.exec(content)) !== null) {
                if (match.index > lastIndex) {
                    parts.push(content.substring(lastIndex, match.index));
                }
                parts.push(
                    <a
                        key={match.index}
                        href={match[2]}
                        target={match[2].startsWith('http') ? '_blank' : '_self'}
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 underline underline-offset-2 hover:text-indigo-800 transition-colors mx-1"
                    >
                        {match[1]} <Zap size={10} />
                    </a>
                );
                lastIndex = regex.lastIndex;
            }
            if (lastIndex < content.length) {
                parts.push(content.substring(lastIndex));
            }

            return parts.map((part, i) =>
                typeof part === 'string' ? renderBoldOnly(part, i) : part
            );
        }

        return renderBoldOnly(content, 0);
    };

    const renderBoldOnly = (text, keyPrefix) => {
        const segments = text.split('**');
        return segments.map((seg, j) =>
            j % 2 === 1 ? (
                <strong key={`${keyPrefix}-${j}`} className="font-black text-indigo-950 dark:text-indigo-200">
                    {seg}
                </strong>
            ) : (
                seg
            )
        );
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop que permite cerrar el chat dando clic afuera */}
                        <motion.div
                            key="chatbot-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[139] bg-black/20 sm:bg-black/10 backdrop-blur-[1px] cursor-pointer"
                            aria-label="Cerrar asistente al hacer clic afuera"
                        />

                        <motion.div
                            key="chatbot-window"
                            ref={chatContainerRef}
                            initial={{ opacity: 0, y: 16, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 16, scale: 0.98 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className="fixed bottom-3 left-3 right-3 z-[140] flex h-[calc(100vh-5.5rem)] max-h-[calc(100vh-5.5rem)] flex-col overflow-hidden rounded-[1.5rem] border border-gray-200/70 bg-white/98 shadow-[0_24px_70px_-28px_rgba(2,6,23,0.8)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0d1117]/98 sm:bottom-6 sm:left-auto sm:right-6 sm:h-[600px] sm:max-h-[calc(100vh-6rem)] sm:w-[440px] sm:rounded-[2.25rem]"
                        >
                        {/* Header */}
                        <div className="relative shrink-0 overflow-hidden border-b border-white/10 bg-[linear-gradient(135deg,#4f46e5_0%,#7c3aed_58%,#a21caf_100%)] px-4 py-3 text-white shadow-[inset_0_-1px_0_rgba(255,255,255,0.08)] sm:px-5 sm:py-4">
                            <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-white/15 blur-2xl pointer-events-none" />
                            <div className="absolute bottom-0 left-0 h-20 w-20 -translate-x-8 translate-y-6 rounded-full bg-fuchsia-300/20 blur-2xl pointer-events-none" />

                            <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm sm:h-11 sm:w-11">
                                        <img src={logo} alt="Kuxibot" className="h-full w-full scale-[1.65] object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.28)]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-base font-black leading-tight tracking-tight text-white sm:text-lg">KUXIBOT</h3>
                                            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white/90">IA Activa</span>
                                        </div>
                                        <div className="mt-0.5 flex items-center gap-1.5">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                                            </span>
                                            <span className="text-[10px] font-medium text-white/80">Con memoria de conversación</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <button
                                        type="button"
                                        onClick={handleResetConversation}
                                        title="Iniciar nueva conversación"
                                        className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/10 px-2.5 py-1.5 text-[11px] font-bold text-white transition-colors duration-200 hover:bg-white/20 active:scale-95"
                                    >
                                        <RotateCcw size={12} strokeWidth={2.5} />
                                        <span className="hidden sm:inline">Nueva</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        title="Cerrar chat"
                                        className="rounded-xl border border-white/10 bg-white/10 p-2 transition-colors duration-200 hover:bg-white/20 active:scale-95"
                                    >
                                        <X size={18} strokeWidth={2.5} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={messagesContainerRef}
                            className="flex-grow overflow-y-auto bg-[linear-gradient(180deg,rgba(79,70,229,0.02),transparent_18%)] px-3 py-3.5 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800 sm:px-5 sm:py-5"
                        >
                            {isLoadingHistory && (
                                <div className="flex items-center justify-center py-2 text-xs text-indigo-500 gap-1.5">
                                    <Sparkles size={13} className="animate-spin" /> Cargando mensajes anteriores...
                                </div>
                            )}

                            <div className="space-y-4 sm:space-y-5">
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} message-item`}
                                    >
                                        <div className={`flex max-w-[94%] gap-2.5 sm:max-w-[88%] sm:gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                            <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center transition-transform duration-300 sm:h-10 sm:w-10 ${
                                                msg.sender === 'user'
                                                    ? 'overflow-hidden rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-lg'
                                                    : 'rounded-2xl bg-white dark:bg-white/5 ring-1 ring-gray-200/80 dark:ring-white/10'
                                            }`}>
                                                {msg.sender === 'user' ? <User size={18} /> : <img src={logo} alt="Asistente" className="h-full w-full scale-[1.55] object-contain drop-shadow-md" />}
                                            </div>
                                            <div className={`p-4 rounded-[1.35rem] text-sm leading-relaxed shadow-[0_10px_30px_-25px_rgba(15,23,42,0.45)] transition-all duration-300 sm:rounded-[1.5rem] ${
                                                msg.sender === 'user'
                                                    ? 'rounded-tr-none bg-gradient-to-br from-indigo-600 to-violet-700 text-white'
                                                    : 'rounded-tl-none border border-slate-200/80 bg-slate-50 text-gray-800 dark:border-white/10 dark:bg-gray-800/40 dark:text-gray-100'
                                            }`}>
                                                {renderFormattedMessage(msg.text)}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="flex items-center gap-2 rounded-2xl rounded-tl-none border border-gray-200/80 bg-gray-50 px-4 py-3 dark:border-white/10 dark:bg-gray-800/50">
                                            <div className="flex gap-1">
                                                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                                                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                                                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                                            </div>
                                            <span className="text-[11px] font-semibold text-gray-400">Kuxibot está respondiendo...</span>
                                        </div>
                                    </div>
                                )}

                                {/* Sugerencias rápidas cuando la conversación inicia */}
                                {messages.length <= 1 && !isTyping && (
                                    <div className="pt-2">
                                        <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-2 flex items-center gap-1">
                                            <HelpCircle size={12} /> Preguntas frecuentes para empezar:
                                        </p>
                                        <div className="grid grid-cols-1 gap-1.5">
                                            {SUGGESTED_PROMPTS.map((prompt, idx) => (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    onClick={() => handleSendMessage(null, prompt.text)}
                                                    className="text-left text-xs px-3 py-2 rounded-xl border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/50 hover:bg-indigo-100/70 dark:bg-indigo-950/30 dark:hover:bg-indigo-900/50 text-indigo-900 dark:text-indigo-200 transition-all font-medium flex items-center justify-between group"
                                                >
                                                    <span>{prompt.label}</span>
                                                    <span className="text-indigo-400 group-hover:translate-x-0.5 transition-transform">→</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} className="relative shrink-0 border-t border-gray-200/70 bg-white/95 px-3 pb-3 pt-3 dark:border-white/5 dark:bg-[#0d1117]/98 sm:px-5 sm:pb-4 sm:pt-3">
                            <div className="relative group flex flex-col w-full rounded-[1.5rem] border border-gray-200/80 bg-gray-50 p-3 pb-2 shadow-inner transition-all duration-300 focus-within:border-indigo-400/50 focus-within:bg-white dark:border-white/10 dark:bg-[#0a0c10] dark:focus-within:bg-black">
                                <textarea
                                    value={inputText}
                                    onChange={(e) => {
                                        setInputText(e.target.value);
                                        e.target.style.height = 'auto';
                                        e.target.style.height = Math.min(e.target.scrollHeight, 140) + 'px';
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            if (inputText.trim()) {
                                                handleSendMessage(e);
                                                e.target.style.height = 'auto';
                                            }
                                        }
                                    }}
                                    placeholder="Escribe tu duda sobre la seguridad de tus hijos..."
                                    rows="1"
                                    className="min-h-[24px] w-full resize-none bg-transparent px-3 py-1 text-sm leading-relaxed outline-none transition-all duration-300 scrollbar-thin scrollbar-thumb-gray-300 dark:text-white dark:scrollbar-thumb-gray-700"
                                />
                                <div className="flex justify-between items-center mt-2 pr-1 pl-2">
                                    <span className="text-[10px] text-gray-400">Shift + Enter para salto de línea</span>
                                    <button
                                        type="submit"
                                        disabled={!inputText.trim() || isTyping}
                                        className="flex h-[38px] w-[38px] items-center justify-center rounded-[1rem] bg-gradient-to-r from-indigo-600 to-violet-600 text-white transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-90 disabled:opacity-30 disabled:grayscale"
                                    >
                                        <Send size={16} strokeWidth={2.5} className="ml-0.5" />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-2 space-y-1 px-2 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                    <div className="h-px w-8 bg-gray-200 dark:bg-gray-800" />
                                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400 flex items-center gap-1">
                                        <Sparkles size={11} className="text-indigo-400" /> Kuxibot • Orientación para Familias
                                    </p>
                                    <div className="h-px w-8 bg-gray-200 dark:bg-gray-800" />
                                </div>
                            </div>
                        </form>
                    </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-3 right-3 z-[140] group flex h-16 w-16 items-center justify-center bg-transparent transition-all duration-500 active:scale-90 sm:bottom-6 sm:right-6"
                    >
                        <img src={logo} alt="Abrir Kuxibot" className="h-full w-full scale-[1.3] object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-[1.45]" />
                        <span className="absolute right-2 top-2 h-4 w-4 rounded-full border-2 border-white bg-green-500 shadow-lg dark:border-gray-900" />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;


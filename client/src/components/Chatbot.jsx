import React, { useState, useRef, useEffect, useContext } from 'react';
import { MessageCircle, X, Send, ShieldCheck, Sparkles, User, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import logo from '../assets/logo_v2.png';

const Chatbot = () => {
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hola, soy tu **Asistente de Seguridad Digital**. Mi conocimiento proviene de fuentes oficiales para ayudarte a proteger a tu familia.", sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [conversationId, setConversationId] = useState(null);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

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

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const userText = inputText;
        const userMessage = { id: Date.now(), text: userText, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputText("");
        setIsTyping(true);

        if (!user) {
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    text: "Para interactuar con el **Guardián Virtual**, es necesario que inicies sesión en tu cuenta. Esto me permite recordar nuestras conversaciones y darte un seguimiento especializado. [Ir a Iniciar Sesión](/iniciar-sesion)",
                    sender: 'bot'
                }]);
                setIsTyping(false);
            }, 600);
            return;
        }

        try {
            const { data } = await api.post('/api/chatbot/message', {
                text: userText,
                conversationId: conversationId
            });

            setConversationId(data.conversationId);

            const botMessage = {
                id: data.botMessage._id || Date.now() + 1,
                text: data.botMessage.text,
                sender: 'bot'
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: `⚠️ **Error:** ${errorMsg}`,
                sender: 'bot'
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-3 left-3 right-3 z-[140] flex flex-col items-end sm:bottom-6 sm:left-auto sm:right-6">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 24, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.98 }}
                        className="flex h-[calc(100vh-8.25rem)] max-h-[calc(100vh-8.25rem)] w-full flex-col overflow-hidden rounded-[1.5rem] border border-gray-200/70 bg-white/98 shadow-[0_24px_70px_-28px_rgba(2,6,23,0.8)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0d1117]/98 sm:mb-6 sm:h-[580px] sm:max-h-[calc(100vh-6rem)] sm:w-[420px] sm:rounded-[2.25rem]"
                    >
                        {/* Header */}
                        <div className="relative shrink-0 overflow-hidden border-b border-white/10 bg-[linear-gradient(135deg,#4f46e5_0%,#7c3aed_58%,#a21caf_100%)] px-4 py-3 text-white shadow-[inset_0_-1px_0_rgba(255,255,255,0.08)] sm:px-5 sm:py-4.5">
                            <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-white/15 blur-2xl" />
                            <div className="absolute bottom-0 left-0 h-20 w-20 -translate-x-8 translate-y-6 rounded-full bg-fuchsia-300/20 blur-2xl" />

                            <div className="relative z-10 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm sm:h-12 sm:w-12">
                                    <img src={logo} alt="Kuxibot" className="h-full w-full scale-[1.65] object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.28)]" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-base font-black leading-tight tracking-tight text-white sm:text-lg">KUXIBOT</h3>
                                    <div className="mt-1 flex items-center gap-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                                        </span>
                                        <span className="text-[9px] font-black uppercase tracking-[0.18em] text-white/80">Sistema experto</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute right-4 top-3 z-10 rounded-2xl border border-white/10 bg-white/10 p-2 transition-colors duration-200 hover:bg-white/20 active:scale-95 sm:right-5 sm:top-4 sm:p-2.5"
                            >
                                <X size={20} strokeWidth={2.5} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={messagesContainerRef}
                            className="flex-grow overflow-y-auto bg-[linear-gradient(180deg,rgba(79,70,229,0.02),transparent_18%)] px-3 py-3.5 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800 sm:px-5 sm:py-5"
                        >
                            <div className="space-y-4 sm:space-y-5">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} message-item`}
                                >
                                    <div className={`flex max-w-[94%] gap-2.5 sm:max-w-[88%] sm:gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center transition-transform duration-300 sm:h-10 sm:w-10 ${msg.sender === 'user' ? 'overflow-hidden rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-lg' : 'rounded-2xl bg-white dark:bg-white/5 ring-1 ring-gray-200/80 dark:ring-white/10'}`}>
                                            {msg.sender === 'user' ? <User size={18} /> : <img src={logo} alt="Asistente" className="h-full w-full scale-[1.55] object-contain drop-shadow-md" />}
                                        </div>
                                        <div className={`p-4 rounded-[1.35rem] text-sm leading-relaxed shadow-[0_10px_30px_-25px_rgba(15,23,42,0.45)] transition-all duration-300 sm:rounded-[1.5rem] ${msg.sender === 'user'
                                            ? 'rounded-tr-none bg-gradient-to-br from-indigo-600 to-violet-700 text-white'
                                            : 'rounded-tl-none border border-slate-200/80 bg-slate-50 text-gray-800 dark:border-white/10 dark:bg-gray-800/40 dark:text-gray-100'
                                            }`}>
                                            {msg.text.split('\n').map((line, i) => {
                                                const cleanLine = line.replace(/^#+\s*/, '');
                                                return (
                                                    <p key={i} className={i > 0 ? 'mt-2' : ''}>
                                                        {cleanLine.split('**').map((part, j) =>
                                                            j % 2 === 1 ? <strong key={j} className="font-black">{part}</strong> : part
                                                        )}
                                                    </p>
                                                );
                                            })}
                                            {msg.text.includes('[') && msg.text.includes('](') && (
                                                <div className="mt-3 pt-3 border-t border-white/10">
                                                    <a
                                                        href={msg.text.match(/\[(.*?)\]\((.*?)\)/)[2]}
                                                        className="inline-flex items-center gap-2 text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-all"
                                                    >
                                                        {msg.text.match(/\[(.*?)\]\((.*?)\)/)[1]} <Zap size={10} />
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="rounded-2xl rounded-tl-none border border-gray-200/80 bg-gray-50 p-4 dark:border-white/10 dark:bg-gray-800/50">
                                        <div className="flex gap-1">
                                            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                                            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                                            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} className="relative shrink-0 border-t border-gray-200/70 bg-white/95 px-3 pb-3 pt-3 dark:border-white/5 dark:bg-[#0d1117]/98 sm:px-5 sm:pb-5 sm:pt-4">
                            <div className="relative group flex flex-col w-full rounded-[1.5rem] border border-gray-200/80 bg-gray-50 p-3 pb-2 shadow-inner transition-all duration-300 focus-within:border-indigo-400/50 focus-within:bg-white dark:border-white/10 dark:bg-[#0a0c10] dark:focus-within:bg-black">
                                <textarea
                                    value={inputText}
                                    onChange={(e) => {
                                        setInputText(e.target.value);
                                        e.target.style.height = 'auto';
                                        e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px';
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            if (inputText.trim()) {
                                                handleSendMessage(e);
                                                // Reset height after send
                                                e.target.style.height = 'auto';
                                            }
                                        }
                                    }}
                                    placeholder="Escribe tu duda de seguridad..."
                                    rows="1"
                                    className="min-h-[24px] w-full resize-none bg-transparent px-3 py-1 text-sm leading-relaxed outline-none transition-all duration-300 scrollbar-thin scrollbar-thumb-gray-300 dark:text-white dark:scrollbar-thumb-gray-700"
                                />
                                <div className="flex justify-end items-center mt-2 pr-1">
                                    <button
                                        type="submit"
                                        disabled={!inputText.trim()}
                                        className="flex h-[38px] w-[38px] items-center justify-center rounded-[1rem] bg-gradient-to-r from-indigo-600 to-violet-600 text-white transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-90 disabled:opacity-30 disabled:grayscale"
                                    >
                                        <Send size={16} strokeWidth={2.5} className="ml-0.5" />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-3 space-y-1.5 px-2 text-center sm:mt-4 sm:space-y-2">
                                <div className="flex items-center justify-center gap-1.5 group cursor-default">
                                    <div className="h-px w-8 bg-gray-200 dark:bg-gray-800" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-1.5 transition-colors group-hover:text-indigo-500">
                                        <Sparkles size={11} className="text-indigo-400 animate-pulse" /> Asistencia con IA
                                    </p>
                                    <div className="h-px w-8 bg-gray-200 dark:bg-gray-800" />
                                </div>
                                <p className="text-[9px] text-gray-400 font-medium italic opacity-80">
                                    Kuxibot puede cometer errores. Considera verificar la información.
                                </p>
                            </div>
                        </form>
                    </motion.div>
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
                        className="group relative flex h-16 w-16 items-center justify-center bg-transparent transition-all duration-500 active:scale-90"
                    >
                        <img src={logo} alt="Abrir Kuxibot" className="h-full w-full scale-[1.3] object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-[1.45]" />
                        <span className="absolute right-2 top-2 h-4 w-4 rounded-full border-2 border-white bg-red-500 shadow-lg dark:border-gray-900" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Chatbot;

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
                    text: "Para interactuar con el **Guardián Virtual**, es necesario que inicies sesión en tu cuenta. Esto me permite recordar nuestras conversaciones y darte un seguimiento especializado. [Ir a Iniciar Sesión](/login)",
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
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="bg-white dark:bg-[#0d1117] w-80 sm:w-[420px] h-[650px] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col border border-white/20 dark:border-gray-800 mb-6 overflow-hidden transition-all duration-500 backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-5 flex justify-between items-center text-white relative overflow-hidden shadow-lg">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-3xl -mr-16 -mt-16 rounded-full" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-400/20 blur-2xl -ml-12 -mb-12 rounded-full" />

                            <div className="flex items-center gap-4 relative z-10 pl-2">
                                <div className="relative group w-12 h-12 flex items-center justify-center">
                                    <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                    <img src={logo} alt="Kuxibot" className="relative w-full h-full object-contain scale-[1.8] drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-transform duration-500 group-hover:scale-[2]" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="font-black text-lg leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-indigo-100">KUXIBOT</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                                        </span>
                                        <span className="text-[9px] font-black text-indigo-50/80 uppercase tracking-[0.2em]">Sistema Experto</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2.5 bg-white/10 hover:bg-white/20 rounded-2xl transition-all duration-300 border border-white/10 hover:scale-110 active:scale-95 relative z-10"
                            >
                                <X size={20} strokeWidth={2.5} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={messagesContainerRef}
                            className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800"
                        >
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} message-item`}
                                >
                                    <div className={`flex gap-3 max-w-[88%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-110 ${msg.sender === 'user' ? 'bg-gradient-to-tr from-indigo-600 to-violet-600 text-white rounded-2xl shadow-lg overflow-hidden' : ''}`}>
                                            {msg.sender === 'user' ? <User size={20} /> : <img src={logo} alt="Bot" className="w-full h-full scale-[1.7] object-contain drop-shadow-md" />}
                                        </div>
                                        <div className={`p-4 rounded-[1.5rem] text-sm leading-relaxed shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-all duration-300 ${msg.sender === 'user'
                                            ? 'bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-tr-none shadow-indigo-200 dark:shadow-none'
                                            : 'bg-white dark:bg-gray-800/40 text-gray-800 dark:text-gray-100 border border-indigo-50/50 dark:border-gray-700/50 rounded-tl-none ring-1 ring-black/[0.02]'
                                            }`}>
                                            {msg.text.split('\n').map((line, i) => (
                                                <p key={i} className={i > 0 ? 'mt-2' : ''}>
                                                    {line.split('**').map((part, j) =>
                                                        j % 2 === 1 ? <strong key={j} className="font-black">{part}</strong> : part
                                                    )}
                                                </p>
                                            ))}
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
                                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-800">
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

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} className="p-6 bg-white dark:bg-[#0d1117] border-t border-gray-100 dark:border-gray-800/50 relative">
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Escribe tu duda de seguridad..."
                                    className="w-full pl-6 pr-14 py-4.5 bg-gray-50 dark:bg-[#0a0c10] border-2 border-transparent focus:border-indigo-500/50 focus:bg-white dark:focus:bg-black rounded-[1.5rem] text-sm outline-none transition-all duration-300 dark:text-white shadow-inner"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputText.trim()}
                                    className="absolute right-2 top-2 bottom-2 px-5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-[1.2rem] hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 disabled:opacity-30 disabled:grayscale transform active:scale-90 group-hover:translate-x-0.5"
                                >
                                    <Send size={18} strokeWidth={2.5} />
                                </button>
                            </div>
                            <div className="mt-5 space-y-2.5 px-2 text-center">
                                <div className="flex items-center justify-center gap-1.5 group cursor-default">
                                    <div className="h-px w-8 bg-gray-200 dark:bg-gray-800" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-1.5 transition-colors group-hover:text-indigo-500">
                                        <Sparkles size={11} className="text-indigo-400 animate-pulse" /> IA Gemini Flash
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
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 flex items-center justify-center transition-all duration-500 group relative active:scale-90 ${isOpen ? 'bg-gray-50 dark:bg-gray-800 text-gray-500 rotate-90 rounded-[1.8rem] shadow-xl' : 'bg-transparent'}`}
            >
                {isOpen ? (
                    <X size={28} />
                ) : (
                    <>
                        <img src={logo} alt="Abrir Kuxibot" className="w-full h-full scale-[1.3] object-contain drop-shadow-2xl group-hover:scale-[1.45] transition-transform duration-300" />
                        {!isOpen && (
                            <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 border-2 border-white dark:border-gray-900 rounded-full animate-bounce shadow-lg" />
                        )}
                    </>
                )}
            </motion.button>
        </div>
    );
};

export default Chatbot;

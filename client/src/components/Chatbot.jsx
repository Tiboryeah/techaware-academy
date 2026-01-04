import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ShieldCheck, Sparkles, User, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hola, soy tu **Asistente de Seguridad Digital**. Mi conocimiento proviene de fuentes oficiales para ayudarte a proteger a tu familia.", sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [conversationId, setConversationId] = useState(null); // Keep track of current chat
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const userText = inputText;
        const userMessage = { id: Date.now(), text: userText, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputText("");
        setIsTyping(true);

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
                        className="bg-white dark:bg-[#161b22] w-80 sm:w-[400px] h-[600px] rounded-[2.5rem] shadow-2xl flex flex-col border border-gray-100 dark:border-gray-800 mb-6 overflow-hidden transition-colors"
                    >
                        {/* Header */}
                        <div className="bg-indigo-600 p-6 flex justify-between items-center text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 blur-2xl -mr-12 -mt-12" />
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md">
                                    <ShieldCheck size={24} />
                                </div>
                                <div className="space-y-0.5">
                                    <h3 className="font-black text-sm uppercase tracking-widest">Guardián Virtual</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        <p className="text-[10px] font-bold text-indigo-100 uppercase tracking-widest">Activo ahora</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-xl transition-colors relative z-10"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 dark:bg-[#0a0c10]/40 scroll-smooth transition-colors">
                            {messages.map((msg) => (
                                <motion.div
                                    initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className="flex flex-col gap-1 max-w-[85%]">
                                        <div className={`p-4 rounded-[1.5rem] text-sm shadow-sm transition-colors ${msg.sender === 'user'
                                            ? 'bg-indigo-600 text-white rounded-br-none'
                                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700 rounded-bl-none'
                                            }`}>
                                            <div className="whitespace-pre-wrap leading-relaxed italic break-words overflow-hidden">
                                                {msg.text.split('\n').map((line, lineIdx) => {
                                                    const isListItem = line.trim().startsWith('* ') || line.trim().startsWith('- ');
                                                    return (
                                                        <div key={lineIdx} className={`${isListItem ? 'ml-4' : ''} min-h-[1.2rem] break-words overflow-hidden`}>
                                                            {line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g).map((part, i) => {
                                                                if (part.startsWith('**') && part.endsWith('**')) {
                                                                    return <strong key={i} className="font-black text-indigo-700 dark:text-indigo-400 bg-indigo-500/5 px-1 rounded">{part.slice(2, -2)}</strong>;
                                                                }
                                                                if (part.startsWith('[') && part.includes('](')) {
                                                                    const match = part.match(/\[(.*?)\]\((.*?)\)/);
                                                                    if (match) {
                                                                        return <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 font-bold underline break-all">
                                                                            {match[1]}
                                                                        </a>;
                                                                    }
                                                                }
                                                                return <span key={i} className="break-words">{part}</span>;
                                                            })}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-gray-400 ${msg.sender === 'user' ? 'justify-end pr-2' : 'justify-start pl-2'}`}>
                                            {msg.sender === 'user' ? <User size={10} /> : <Sparkles size={10} />}
                                            {msg.sender === 'user' ? 'Tú' : 'IA Guardián'}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-[1.5rem] rounded-bl-none border border-gray-100 dark:border-gray-700 shadow-sm flex space-x-2 items-center">
                                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-white dark:bg-[#161b22] border-t border-gray-100 dark:border-gray-800 transition-colors">
                            <form onSubmit={handleSendMessage} className="flex gap-3">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="¿En qué puedo ayudarte hoy?"
                                    className="flex-1 bg-gray-50 dark:bg-[#0a0c10] text-gray-900 dark:text-white border-2 border-transparent focus:border-indigo-600 rounded-2xl px-5 py-3 outline-none transition-all text-sm font-medium"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputText.trim()}
                                    className="bg-indigo-600 text-white p-3.5 rounded-2xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95 shadow-lg shadow-indigo-600/20"
                                >
                                    <Send size={20} className="fill-current" />
                                </button>
                            </form>
                            <div className="mt-4 flex justify-center gap-3">
                                <button onClick={() => setInputText("Roblox")} className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-indigo-600 transition-colors bg-gray-50 dark:bg-[#0a0c10] px-3 py-1 rounded-lg border border-gray-100 dark:border-gray-800">Roblox</button>
                                <button onClick={() => setInputText("TikTok")} className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-indigo-600 transition-colors bg-gray-50 dark:bg-[#0a0c10] px-3 py-1 rounded-lg border border-gray-100 dark:border-gray-800">TikTok</button>
                                <button onClick={() => setInputText("Grooming")} className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-indigo-600 transition-colors bg-gray-50 dark:bg-[#0a0c10] px-3 py-1 rounded-lg border border-gray-100 dark:border-gray-800">Grooming</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-indigo-600 text-white p-5 rounded-[2rem] shadow-2xl flex items-center justify-center relative group overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                            <X size={32} />
                        </motion.div>
                    ) : (
                        <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                            <MessageCircle size={32} />
                        </motion.div>
                    )}
                </AnimatePresence>
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white dark:border-[#0a0c10]" />
                    </span>
                )}
            </motion.button>
        </div>
    );
};

export default Chatbot;

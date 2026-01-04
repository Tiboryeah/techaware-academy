import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ShieldCheck, Zap, Info, ArrowRight, UserX, ExternalLink, Lightbulb, X, Send, CheckCircle2 } from 'lucide-react';
import api from '../services/api';
import { casesData } from '../data/casesData.jsx';
import { parentalGuides } from '../data/parentalGuides.jsx';

const RealCases = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGuide, setSelectedGuide] = useState(null); // New state for guides
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [formData, setFormData] = useState({
        title: '',
        category: 'Otro',
        description: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await api.post('/api/reports/submit', formData);
            setStatus('success');
            setTimeout(() => {
                setIsModalOpen(false);
                setStatus('idle');
                setFormData({ title: '', category: 'Otro', description: '' });
            }, 2500);
        } catch (error) {
            console.error("Error sending case:", error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    const guides = parentalGuides;

    return (
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] text-gray-900 dark:text-gray-100 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 text-gray-900 dark:text-white">
                        Casos <span className="text-indigo-600 dark:text-indigo-400">Reales</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto italic font-medium">
                        Aprende de experiencias verídicas para prevenir situaciones de riesgo en tu familia. La información es tu mejor defensa.
                    </p>
                </motion.div>

                <div className="space-y-32">
                    {/* Cases Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {casesData.map((c, idx) => {
                            const colorStyles = {
                                red: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
                                yellow: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
                                indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20"
                            };
                            const style = colorStyles[c.color] || colorStyles.indigo;

                            return (
                                <motion.div
                                    key={c.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white dark:bg-[#161b22] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl dark:shadow-2xl overflow-hidden hover:border-indigo-500/30 transition-all flex flex-col"
                                >
                                    <div className="p-8 flex-grow space-y-6">
                                        <div className="flex justify-between items-center">
                                            <div className={`p-3 rounded-2xl ${style.split(' ')[0]} ${style.split(' ')[1]}`}>
                                                {c.icon}
                                            </div>
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${style}`}>
                                                {c.category}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">{c.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed italic border-l-2 border-indigo-500/20 pl-4">
                                            "{c.summary}"
                                        </p>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                            {c.content}
                                        </p>

                                        <div className="pt-6 space-y-4">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                                                <Lightbulb className="w-3 h-3" /> Recomendaciones
                                            </h4>
                                            <ul className="space-y-2">
                                                {c.tips.map((tip, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-xs text-gray-500 dark:text-gray-400">
                                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                                                        {tip}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-gray-50 dark:bg-[#0a0c10]/40 border-t border-gray-100 dark:border-gray-800">
                                        <button
                                            onClick={() => navigate(`/cases/${c.id}`)}
                                            className="w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-colors"
                                        >
                                            Ver Análisis Completo <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Guides Section */}
                    <div className="space-y-12">
                        <div className="flex items-center gap-4">
                            <div className="h-0.5 w-12 bg-indigo-500" />
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Guías de Protección Directa</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {guides.map((g, idx) => (
                                <motion.div
                                    key={g.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="bg-white dark:bg-[#161b22] p-8 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-2xl transition-all group hover:border-indigo-500/30 flex flex-col"
                                >
                                    <div className="flex flex-col gap-6 flex-grow">
                                        <div className="flex justify-between items-start">
                                            <div className="p-4 bg-gray-50 dark:bg-[#0a0c10] rounded-2xl border border-gray-100 dark:border-gray-800 transition-colors group-hover:scale-110 duration-500">
                                                {g.icon}
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 opacity-50">Manual Oficial</span>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className={`w-2 h-2 rounded-full bg-${g.color}-500 shadow-lg`} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">{g.platform}</span>
                                                </div>
                                                <h3 className="text-xl font-black text-gray-900 dark:text-white leading-tight">{g.title}</h3>
                                                <p className="text-gray-500 dark:text-gray-400 text-xs italic mt-2 leading-relaxed">{g.description}</p>
                                            </div>

                                            <div className="space-y-3 pt-4 border-t border-gray-50 dark:border-white/5">
                                                {g.steps.map((step, i) => (
                                                    <div key={i} className="flex items-start gap-4 text-[10px] font-bold text-gray-600 dark:text-gray-400">
                                                        <span className="flex-shrink-0 w-4 h-4 rounded-md bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-[8px] font-black">{i + 1}</span>
                                                        <span className="flex-grow pt-0.5">{step}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setSelectedGuide(g)}
                                        className="mt-8 w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-gray-50 dark:bg-[#0a0c10] hover:bg-indigo-600 hover:text-white dark:text-gray-300 dark:hover:text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl border border-gray-100 dark:border-gray-800 transition-all active:scale-95 group"
                                    >
                                        Ver Detalles <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 p-12 bg-white dark:bg-[#161b22] rounded-[3.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl text-center space-y-6 group"
                >
                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-indigo-600/30 group-hover:rotate-12 transition-transform">
                        <Info className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">¿Tienes un caso que reportar?</h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto italic">
                        Tu experiencia puede ayudar a otros padres. Colabora con nosotros para seguir construyendo la biblioteca de seguridad más grande.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-12 py-5 bg-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all active:scale-95"
                    >
                        Enviar Información
                    </button>
                </motion.div>

                {/* Report Form Modal */}
                <AnimatePresence>
                    {isModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsModalOpen(false)}
                                className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative w-full max-w-2xl bg-white dark:bg-[#161b22] rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
                            >
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-6 right-6 p-3 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <div className="p-8 sm:p-12">
                                    {status === 'success' ? (
                                        <div className="py-12 text-center space-y-6">
                                            <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto">
                                                <CheckCircle2 className="w-10 h-10" />
                                            </div>
                                            <h3 className="text-3xl font-black text-gray-900 dark:text-white">¡Enviado con éxito!</h3>
                                            <p className="text-gray-500 dark:text-gray-400 italic">Gracias por colaborar con TechAwareKids.</p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="mb-10 text-center sm:text-left">
                                                <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">Compartir Experiencia</h3>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm italic">Tu reporte será revisado por nuestro equipo antes de ser publicado de forma anónima.</p>
                                            </div>

                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 ml-2">Título del Caso</label>
                                                        <input
                                                            required
                                                            type="text"
                                                            placeholder="Ej: Estafa en Marketplace"
                                                            value={formData.title}
                                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                            className="w-full px-6 py-4 bg-gray-50 dark:bg-[#0a0c10] border border-gray-100 dark:border-gray-800 rounded-2xl focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 ml-2">Categoría</label>
                                                        <select
                                                            value={formData.category}
                                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                            className="w-full px-6 py-4 bg-gray-50 dark:bg-[#0a0c10] border border-gray-100 dark:border-gray-800 rounded-2xl focus:border-indigo-500 outline-none transition-all text-sm font-medium appearance-none cursor-pointer"
                                                        >
                                                            <option value="Ciberacoso">Ciberacoso</option>
                                                            <option value="Fraudes">Fraudes</option>
                                                            <option value="Grooming">Grooming</option>
                                                            <option value="Privacidad">Privacidad</option>
                                                            <option value="Otro">Otro</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 ml-2">Describe lo ocurrido</label>
                                                    <textarea
                                                        required
                                                        rows="5"
                                                        placeholder="Cuéntanos los detalles para poder ayudar a otros padres..."
                                                        value={formData.description}
                                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                        className="w-full px-6 py-4 bg-gray-50 dark:bg-[#0a0c10] border border-gray-100 dark:border-gray-800 rounded-3xl focus:border-indigo-500 outline-none transition-all text-sm font-medium resize-none shadow-inner"
                                                    />
                                                </div>

                                                <button
                                                    disabled={status === 'sending'}
                                                    className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-3 active:scale-95"
                                                >
                                                    {status === 'sending' ? (
                                                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                                                    ) : (
                                                        <><Send className="w-4 h-4" /> Enviar Reporte</>
                                                    )}
                                                </button>

                                                {status === 'error' && (
                                                    <p className="text-center text-red-500 text-[10px] font-black uppercase tracking-widest animate-pulse">Error al enviar. Intenta de nuevo.</p>
                                                )}
                                            </form>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Guide Detailed Modal */}
                <AnimatePresence>
                    {selectedGuide && (
                        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedGuide(null)}
                                className="fixed inset-0 bg-gray-900/80 backdrop-blur-md"
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                className="relative w-full max-w-3xl bg-white dark:bg-[#161b22] rounded-[3.5rem] shadow-[0_0_100px_rgba(79,70,229,0.2)] overflow-hidden border border-gray-100 dark:border-gray-800 my-auto"
                            >
                                <button
                                    onClick={() => setSelectedGuide(null)}
                                    className="absolute top-8 right-8 p-3 text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-colors z-10"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <div className="p-8 sm:p-14">
                                    <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
                                        <div className={`p-6 bg-gray-50 dark:bg-[#0a0c10] rounded-3xl border border-gray-100 dark:border-gray-800 text-indigo-600 shadow-inner`}>
                                            {selectedGuide.icon}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`px-4 py-1.5 bg-${selectedGuide.color}-500/10 text-${selectedGuide.color}-600 dark:text-${selectedGuide.color}-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-${selectedGuide.color}-500/20`}>
                                                    {selectedGuide.platform}
                                                </span>
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Manual de Protección Directa</span>
                                            </div>
                                            <h3 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight">{selectedGuide.title}</h3>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                        <div className="space-y-8">
                                            <div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-4 flex items-center gap-2">
                                                    <Info className="w-3.5 h-3.5" /> ¿Por qué es importante?
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium italic">
                                                    "{selectedGuide.details.fullContent}"
                                                </p>
                                            </div>

                                            <div className="p-6 bg-indigo-600/5 dark:bg-white/5 rounded-3xl border border-indigo-500/10 space-y-3">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 flex items-center gap-2">
                                                    <Zap className="w-3.5 h-3.5" /> Ruta de Activación
                                                </h4>
                                                <p className="text-sm font-black text-gray-800 dark:text-indigo-300">
                                                    {selectedGuide.details.setupPath}
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-4 flex items-center gap-2">
                                                    <CheckCircle2 className="w-3.5 h-3.5" /> Pasos Técnicos
                                                </h4>
                                                <div className="space-y-4">
                                                    {selectedGuide.steps.map((step, i) => (
                                                        <div key={i} className="flex items-start gap-4">
                                                            <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black shadow-lg shadow-indigo-600/20">{i + 1}</span>
                                                            <p className="text-xs font-bold text-gray-700 dark:text-gray-300 pt-2">{step}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            <div className="p-8 bg-gray-900 dark:bg-[#0a0c10] rounded-[2.5rem] border border-gray-800 shadow-2xl space-y-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                                                        <Lightbulb className="w-5 h-5 text-yellow-500" />
                                                    </div>
                                                    <h4 className="text-xs font-black uppercase tracking-widest text-white">Consejo del Experto</h4>
                                                </div>
                                                <p className="text-sm text-gray-400 font-serif italic leading-relaxed">
                                                    "{selectedGuide.details.expertTip}"
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-4 flex items-center gap-2">
                                                    <ShieldCheck className="w-3.5 h-3.5" /> Análisis de Riesgos Reducidos
                                                </h4>
                                                <div className="p-6 bg-green-500/5 rounded-3xl border border-green-500/20">
                                                    <p className="text-xs font-bold text-green-700 dark:text-green-400">
                                                        {selectedGuide.details.riskAnalysis}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="pt-6">
                                                <a
                                                    href={selectedGuide.details.officialLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center gap-4 w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-600/30 transition-all active:scale-95 group"
                                                >
                                                    Página de Ayuda Oficial <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default RealCases;

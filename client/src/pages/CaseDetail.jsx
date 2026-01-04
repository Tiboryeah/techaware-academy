import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    ShieldCheck,
    Zap,
    AlertTriangle,
    Lightbulb,
    Calendar,
    Clock,
    Target,
    Shield,
    Users
} from 'lucide-react';
import { casesData } from '../data/casesData.jsx';

const CaseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const caseItem = casesData.find(c => c.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!caseItem) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0c10]">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-black dark:text-white">Caso no encontrado</h2>
                    <button
                        onClick={() => navigate('/cases')}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold"
                    >
                        Volver a Casos
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] text-gray-900 dark:text-gray-100 pb-20 transition-colors duration-500">
            {/* Top Navigation Bar */}
            <div className="sticky top-0 z-50 bg-white/80 dark:bg-[#0a0c10]/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/cases')}
                        className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-500 hover:text-indigo-600 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Volver a Casos
                    </button>
                    <div className="hidden md:flex items-center gap-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Analizando:</span>
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{caseItem.title}</span>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 pt-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left Sidebar - Visual Impact & Meta */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-4 space-y-8"
                    >
                        <div className="relative group">
                            <div className={`absolute inset-0 bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity`} />
                            <div className="relative p-10 bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-[3rem] text-white shadow-2xl overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Shield className="w-32 h-32 rotate-12" />
                                </div>
                                <div className="space-y-6 relative z-10">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                                        Nivel de Riesgo: {caseItem.riskLevel}
                                    </div>
                                    <h1 className="text-4xl font-black tracking-tighter leading-tight bg-clip-text text-white">
                                        {caseItem.title}
                                    </h1>
                                    <p className="text-indigo-100 text-lg italic leading-relaxed font-medium">
                                        "{caseItem.summary}"
                                    </p>
                                    <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                            <ShieldCheck className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase opacity-60 tracking-wider">Categoría</p>
                                            <p className="font-bold">{caseItem.category}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Critical Evidence Summary */}
                        <div className="p-8 bg-white dark:bg-[#161b22] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-6">
                            <h3 className="text-sm font-black uppercase tracking-widest text-indigo-500 flex items-center gap-2">
                                <Lightbulb className="w-4 h-4" /> Recomendaciones Clave
                            </h3>
                            <div className="space-y-4">
                                {caseItem.tips.map((tip, i) => (
                                    <div key={i} className="flex gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-50 dark:border-white/5 transition-colors hover:bg-white dark:hover:bg-white/10">
                                        <div className="w-6 h-6 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center flex-shrink-0">
                                            <ShieldCheck className="w-4 h-4" />
                                        </div>
                                        <p className="text-xs font-bold text-gray-600 dark:text-gray-300">{tip}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Content Area - Detailed Narrative */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-8 space-y-16"
                    >
                        {/* Narrative Section */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-1 bg-indigo-600 rounded-full" />
                                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Análisis Completo</h2>
                            </div>
                            <div className="prose prose-indigo dark:prose-invert max-w-none">
                                <p className="text-2xl font-bold dark:text-indigo-200 leading-tight mb-8">
                                    Un desglose de lo sucedido y cómo se gestionó la crisis digital.
                                </p>
                                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                                    {caseItem.fullContent}
                                </p>
                            </div>
                        </section>

                        {/* Immersive Timeline */}
                        <section className="relative">
                            <div className="flex items-center gap-3 mb-10">
                                <div className="w-8 h-1 bg-indigo-600 rounded-full" />
                                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 font-black">Cronología del Incidente</h2>
                            </div>

                            <div className="bg-white dark:bg-[#161b22] p-10 md:p-16 rounded-[4rem] border border-gray-100 dark:border-gray-800 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-indigo-500 to-transparent opacity-20" />

                                <div className="space-y-16 relative">
                                    {caseItem.timeline.map((step, i) => (
                                        <div key={i} className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                                            <div className="md:w-32 flex-shrink-0">
                                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 rounded-xl border border-indigo-600/20 font-black text-xs uppercase tracking-widest">
                                                    <Clock className="w-3 h-3" /> {step.time}
                                                </div>
                                            </div>

                                            <div className="flex-grow space-y-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-4 h-4 rounded-full border-4 border-indigo-600 bg-white dark:bg-[#0a0c10] z-10 shadow-[0_0_15px_rgba(79,70,229,0.5)]" />
                                                    <div className="h-px bg-gray-100 dark:bg-gray-800 flex-grow" />
                                                </div>
                                                <p className="text-xl md:text-2xl font-black text-gray-900 dark:text-white leading-tight">
                                                    {step.event}
                                                </p>
                                                <div className="h-4 w-px bg-gray-100 dark:bg-gray-800 ml-2" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Learning Outcomes */}
                        <section className="p-12 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 rounded-[3rem] border border-indigo-500/10 space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-white dark:bg-[#161b22] rounded-2xl flex items-center justify-center shadow-lg border border-indigo-500/10">
                                    <Zap className="w-8 h-8 text-indigo-500" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Lecciones Fundamentales</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">¿Qué podemos aprender para proteger el futuro?</p>
                                </div>
                            </div>

                            <div className="p-10 bg-white dark:bg-[#161b22] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl relative group">
                                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
                                <p className="text-2xl text-gray-700 dark:text-gray-200 font-bold italic leading-relaxed text-center">
                                    "{caseItem.lessons}"
                                </p>
                            </div>
                        </section>

                        {/* Action Call */}
                        <div className="flex flex-col sm:flex-row gap-6 p-6 bg-gray-50 dark:bg-white/5 rounded-3xl items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Users className="w-6 h-6 text-gray-400" />
                                <p className="text-sm font-bold text-gray-500 dark:text-gray-400">
                                    Comparte este análisis con otros padres para prevenir riesgos.
                                </p>
                            </div>
                            <button className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black text-xs uppercase tracking-widest rounded-2xl hover:scale-105 transition-transform">
                                Copiar Enlace
                            </button>
                        </div>

                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default CaseDetail;

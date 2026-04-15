import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Zap, Lightbulb, Clock, Shield, Users, UserX, AlertTriangle, Info } from 'lucide-react';
import NotFound from './NotFound';
import api from '../services/api';

const caseIcons = {
    Ciberacoso: <UserX className="w-5 h-5" />,
    Fraudes: <AlertTriangle className="w-5 h-5" />,
    Grooming: <ShieldCheck className="w-5 h-5" />,
};

const CaseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [caseItem, setCaseItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const loadCase = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/api/resources/${id}`);
                if (response.data.type !== 'case') {
                    setError('Caso no encontrado.');
                } else {
                    setCaseItem({
                        ...response.data,
                        icon: caseIcons[response.data.category] || <Info className="w-5 h-5" />,
                    });
                    setError('');
                }
            } catch (loadErr) {
                console.error('Error loading case detail:', loadErr);
                setError('Caso no encontrado.');
            } finally {
                setLoading(false);
            }
        };

        loadCase();
    }, [id]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0c10] text-gray-500 dark:text-gray-400">Cargando caso...</div>;
    }

    if (error || !caseItem) {
        return <NotFound />;
    }

    return (
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] text-gray-900 dark:text-gray-100 pb-20 transition-colors duration-500">
            <div className="sticky top-0 z-50 bg-white/80 dark:bg-[#0a0c10]/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <button onClick={() => navigate('/casos-y-guias?seccion=casos')} className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-500 hover:text-indigo-600 transition-colors group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Volver a casos y guías
                    </button>
                    <div className="hidden md:flex items-center gap-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Analizando:</span>
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{caseItem.title}</span>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 pt-8 sm:pt-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-4 space-y-8">
                        <div className="relative">
                            <div className="relative p-6 sm:p-10 bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-[2rem] sm:rounded-[3rem] text-white shadow-2xl overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Shield className="w-32 h-32 rotate-12" />
                                </div>
                                <div className="space-y-6 relative z-10">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                                        Nivel de riesgo: {caseItem.riskLevel}
                                    </div>
                                    <h1 className="text-2xl sm:text-4xl font-black tracking-tighter leading-tight text-white">{caseItem.title}</h1>
                                    <p className="text-indigo-100 text-lg italic leading-relaxed font-medium">"{caseItem.summary}"</p>
                                    <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                            {caseItem.icon}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase opacity-60 tracking-wider">Categoría</p>
                                            <p className="font-bold">{caseItem.category}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 sm:p-8 bg-white dark:bg-[#161b22] rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-6">
                            <h3 className="text-sm font-black uppercase tracking-widest text-indigo-500 flex items-center gap-2">
                                <Lightbulb className="w-4 h-4" /> Recomendaciones clave
                            </h3>
                            <div className="space-y-4">
                                {caseItem.tips.map((tip, idx) => (
                                    <div key={idx} className="flex gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-50 dark:border-white/5">
                                        <div className="w-6 h-6 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center flex-shrink-0">
                                            <ShieldCheck className="w-4 h-4" />
                                        </div>
                                        <p className="text-xs font-bold text-gray-600 dark:text-gray-300">{tip}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="lg:col-span-8 space-y-10 sm:space-y-16">
                        <section className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-1 bg-indigo-600 rounded-full" />
                                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Análisis completo</h2>
                            </div>
                            <div className="space-y-6">
                                <p className="text-2xl font-bold dark:text-indigo-200 leading-tight">Un desglose de lo sucedido y cómo se gestionó la crisis digital.</p>
                                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium">{caseItem.fullContent}</p>
                            </div>
                        </section>

                        <section className="space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-1 bg-indigo-600 rounded-full" />
                                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Cronología del incidente</h2>
                            </div>
                            <div className="bg-white dark:bg-[#161b22] p-5 sm:p-10 md:p-16 rounded-[2rem] sm:rounded-[3rem] md:rounded-[4rem] border border-gray-100 dark:border-gray-800 shadow-2xl">
                                <div className="space-y-8 sm:space-y-12">
                                    {caseItem.timeline.map((step, idx) => (
                                        <div key={idx} className="flex flex-col md:flex-row gap-8 items-start">
                                            <div className="md:w-32 flex-shrink-0">
                                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 rounded-xl border border-indigo-600/20 font-black text-xs uppercase tracking-widest">
                                                    <Clock className="w-3 h-3" /> {step.time}
                                                </div>
                                            </div>
                                            <div className="flex-grow space-y-3">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-4 h-4 rounded-full border-4 border-indigo-600 bg-white dark:bg-[#0a0c10]" />
                                                    <div className="h-px bg-gray-100 dark:bg-gray-800 flex-grow" />
                                                </div>
                                                <p className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 dark:text-white leading-tight">{step.event}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="p-6 sm:p-12 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 rounded-[2rem] sm:rounded-[3rem] border border-indigo-500/10 space-y-6 sm:space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-white dark:bg-[#161b22] rounded-2xl flex items-center justify-center shadow-lg border border-indigo-500/10">
                                    <Zap className="w-8 h-8 text-indigo-500" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Lecciones fundamentales</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Qué podemos aprender para proteger mejor el futuro.</p>
                                </div>
                            </div>
                            <div className="p-6 sm:p-10 bg-white dark:bg-[#161b22] rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl">
                                <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-200 font-bold italic leading-relaxed text-center">"{caseItem.lessons}"</p>
                            </div>
                        </section>

                        <div className="flex flex-col sm:flex-row gap-6 p-6 bg-gray-50 dark:bg-white/5 rounded-3xl items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Users className="w-6 h-6 text-gray-400" />
                                <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Comparte este análisis con otros padres para prevenir riesgos.</p>
                            </div>
                            <button className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black text-xs uppercase tracking-widest rounded-2xl">
                                Copiar enlace
                            </button>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default CaseDetail;

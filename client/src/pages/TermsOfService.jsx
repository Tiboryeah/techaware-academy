import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Globe, Target, Heart, Shield, Zap, Users, ShieldCheck, Handshake } from 'lucide-react';

const TermsOfService = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const values = [
        { title: "Responsabilidad familiar", desc: "Fomentamos la participación activa y consciente de los padres." },
        { title: "Seguridad", desc: "Protegemos la privacidad mediante prácticas seguras y responsables." },
        { title: "Innovación", desc: "Impulsamos el uso de tecnologías actuales para prevenir riesgos." },
        { title: "Compromiso social", desc: "Contribuimos al desarrollo de una cultura digital segura." },
        { title: "Colaboración", desc: "Trabajamos conjuntamente con instituciones y especialistas para ampliar el impacto social." }
    ];

    return (
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] text-gray-900 dark:text-gray-100 transition-colors duration-500 pb-20">
            {/* Header Section */}
            <div className="relative pt-24 pb-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 font-black text-[10px] tracking-[0.2em] uppercase"
                    >
                        <FileText className="w-3 h-3" /> Compromiso y Transparencia
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-black tracking-tighter"
                    >
                        Términos del <span className="text-indigo-600">Servicio</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 dark:text-gray-400 text-lg italic font-medium"
                    >
                        Principios y reglas de nuestra comunidad digital.
                    </motion.p>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-4 space-y-20">
                {/* Mission & Vision Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <motion.section
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-10 bg-white dark:bg-[#161b22] rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-6"
                    >
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600">
                            <Target className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black tracking-tighter uppercase text-sm tracking-widest">Nuestra Misión</h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic font-medium">
                            "Brindar a los padres de familia herramientas interactivas, accesibles y actualizadas que promuevan la conciencia y el acompañamiento activo de sus hijos en entornos digitales."
                        </p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-10 bg-white dark:bg-[#161b22] rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-6"
                    >
                        <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-600">
                            <Globe className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black tracking-tighter uppercase text-sm tracking-widest">Nuestra Visión</h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic font-medium">
                            "Consolidarnos como la plataforma líder en educación digital para padres en Latinoamérica, siendo un referente en innovación tecnológica, impacto social y compromiso con la protección infantil."
                        </p>
                    </motion.section>
                </div>

                {/* Values Section */}
                <section className="space-y-10">
                    <div className="text-center space-y-2">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">Nuestros Valores</h2>
                        <p className="text-3xl font-black tracking-tighter uppercase">Principios que nos definen</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {values.map((v, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-gray-50 dark:bg-white/5 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex items-start gap-4"
                            >
                                <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-lg">
                                    <ShieldCheck className="w-4 h-4" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-black text-gray-900 dark:text-white text-sm uppercase tracking-tight">{v.title}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium italic">{v.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Service Terms Content */}
                <section className="space-y-8 bg-white dark:bg-[#161b22] p-12 rounded-[3.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl">
                    <h2 className="text-3xl font-black tracking-tighter uppercase flex items-center gap-4">
                        <Zap className="w-8 h-8 text-indigo-600" /> Uso del Servicio
                    </h2>
                    <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed font-medium italic">
                        <p>
                            El acceso a TechAware Kids implica la aceptación de un uso responsable de nuestra infraestructura en la nube. Nuestro objetivo es proveer un servicio de IT confiable, seguro y eficiente que soporte la operación de la aplicación web, permitiendo concientizar y apoyar a los padres de familia a prevenir los riesgos digitales en niños de 6 a 12 años.
                        </p>
                        <p>
                            Integramos tecnologías de terceros para enriquecer la experiencia educativa. Esto incluye el uso de la API de **YouTube** para la visualización de contenido multimedia de apoyo y el motor de inteligencia artificial **Google Gemini** para facilitar interacciones informativas y asistencia técnica mediante nuestro chatbot.
                        </p>
                        <p>
                            Queda estrictamente prohibido el uso de la plataforma para fines maliciosos, la alteración del código o cualquier acción que comprometa la integridad de los datos protegidos bajo la norma ISO 27000. Nuestras operaciones se alinean con los objetivos estratégicos de la organización, optimizando recursos y fortaleciendo la gestión de riesgos basada en el marco de referencia COBIT.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 items-center pt-10 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-[#161b22] flex items-center justify-center text-[10px] font-black">
                                    TA
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                            Únete a las familias que ya confían en nuestra visión de seguridad.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default TermsOfService;

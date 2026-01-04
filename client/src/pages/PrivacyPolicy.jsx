import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, CheckCircle, Database, Globe, Scale, ShieldCheck } from 'lucide-react';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            icon: <Database className="w-6 h-6 text-indigo-500" />,
            title: "Infraestructura y Tratamiento de Información",
            content: "TechAware Kids opera sobre una infraestructura avanzada de servicios en la nube, diseñada para garantizar la disponibilidad, escalabilidad y accesibilidad continua de nuestra plataforma. Este despliegue tecnológico permite que los padres de familia accedan a herramientas de concientización sobre riesgos digitales desde cualquier dispositivo con conexión a internet, manteniendo la integridad operativa bajo los más altos estándares de IT."
        },
        {
            icon: <Shield className="w-6 h-6 text-indigo-500" />,
            title: "Seguridad Basada en Estándares Internacionales",
            content: "Nuestras prácticas de gestión de seguridad de la información se alinean estrictamente con la norma ISO 27000. Buscamos garantizar en todo momento la Confidencialidad, Integridad y Disponibilidad (Tríada CID) de sus datos. Implementamos controles robustos para la protección de la privacidad, asegurando que la información de las familias sea tratada de forma segura y responsable."
        },
        {
            icon: <Scale className="w-6 h-6 text-indigo-500" />,
            title: "Gobernanza de TI (COBIT)",
            content: "La gestión de nuestros recursos tecnológicos y riesgos se basa en el marco de referencia COBIT (Control Objectives for Information and Related Technologies). Este alineamiento nos permite optimizar los recursos, reducir costos operativos y fortalecer nuestra toma de decisiones estratégica, garantizando un servicio confiable y alineado a las mejores prácticas globales en gestión de TI."
        },
        {
            icon: <Zap className="w-6 h-6 text-indigo-500" />,
            title: "Integración de Servicios de Terceros (YouTube y Gemini)",
            content: "Para cumplir con nuestra misión de innovación y educación, integramos servicios externos mediante APIs. Utilizamos YouTube para proporcionar contenido visual educativo y Google Gemini para potenciar nuestro asistente de inteligencia artificial. El uso de estos servicios se realiza bajo estrictas medidas de seguridad para garantizar que la interacción del usuario sea privada y se alinee con nuestros objetivos de protección infantil."
        }
    ];

    return (
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] text-gray-900 dark:text-gray-100 transition-colors duration-500 pb-20">
            {/* Header Section */}
            <div className="relative pt-24 pb-16 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-black text-[10px] tracking-[0.2em] uppercase"
                    >
                        <Lock className="w-3 h-3" /> Transparencia Total
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-black tracking-tighter"
                    >
                        Política de <span className="text-indigo-600">Privacidad</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 dark:text-gray-400 text-lg italic font-medium"
                    >
                        Ultima actualización: 4 de Enero, 2026
                    </motion.p>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-4 space-y-16">
                {/* Intro Card */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-10 bg-white dark:bg-[#161b22] rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-xl"
                >
                    <div className="prose prose-indigo dark:prose-invert max-w-none space-y-6">
                        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 italic">
                            El servicio de IT de TechAware Kids se basa en el uso de infraestructura y servicios en la nube, que permite el despliegue, operación y mantenimiento de una aplicación web interactiva orientada a la concientización de los padres de familia sobre los riesgos digitales en niños de entre 6 y 12 años.
                        </p>
                        <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                            La nube proporciona los recursos tecnológicos necesarios para garantizar la disponibilidad, escalabilidad y accesibilidad del servicio, permitiendo que los usuarios accedan a la plataforma de manera continua desde diferentes dispositivos con conexión a internet.
                        </p>
                        <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                            El servicio de IT en la nube se alinea con los objetivos estratégicos de la organización al optimizar recursos tecnológicos, reducir los costos y fortalecer la gestión de riesgos, basado en el marco de referencia COBIT. Además de integrar prácticas de seguridad de la información basadas en la norma ISO 27000 buscando garantizar la confidencialidad, integridad y disponibilidad de los datos, así como la continuidad del servicio, por lo que la nube representa una herramienta indispensable para la operación de TechAware Kids permitiendo ofrecer un servicio confiable, seguro y que esté alineado a las mejores prácticas en la gestión de tecnologías de la información.
                        </p>
                    </div>
                </motion.section>

                {/* Detailed Sections */}
                <div className="space-y-10">
                    {sections.map((sec, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col md:flex-row gap-8 items-start p-8 rounded-[2.5rem] hover:bg-white dark:hover:bg-[#161b22] transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-800"
                        >
                            <div className="p-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex-shrink-0">
                                {sec.icon}
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white uppercase tracking-widest text-sm">{sec.title}</h2>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium italic">
                                    {sec.content}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Final Commitment */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="p-12 bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-[3rem] text-white text-center space-y-6 shadow-2xl"
                >
                    <ShieldCheck className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-3xl font-black tracking-tighter">Compromiso con el Bienestar Infantil</h3>
                    <p className="text-indigo-100/80 text-lg italic max-w-2xl mx-auto">
                        "Trabajamos para fomentar una cultura digital segura, responsable y orientada al bienestar de las nuevas generaciones."
                    </p>
                </motion.div>
            </main>
        </div>
    );
};

export default PrivacyPolicy;

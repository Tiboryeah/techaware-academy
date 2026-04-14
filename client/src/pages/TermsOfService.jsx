import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FileText,
    ShieldCheck,
    BookOpen,
    Users,
    AlertTriangle,
    Bot,
    Mail,
    Scale,
} from 'lucide-react';

const principles = [
    {
        title: 'Uso educativo',
        desc: 'La plataforma fue diseñada para orientar a madres, padres y tutores en temas de seguridad digital.',
    },
    {
        title: 'Uso responsable',
        desc: 'El usuario se compromete a utilizar el servicio de manera lícita, respetuosa y sin afectar a terceros.',
    },
    {
        title: 'Protección de datos',
        desc: 'El tratamiento de información debe mantenerse alineado con la política de privacidad y el enfoque de cuidado infantil.',
    },
    {
        title: 'Acompañamiento, no sustitución',
        desc: 'Kuxipilli apoya la toma de decisiones, pero no reemplaza la supervisión parental ni el criterio del adulto.',
    },
];

const TermsOfService = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] text-gray-900 dark:text-gray-100 transition-colors duration-500 pb-20">
            <div className="relative pt-24 pb-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 font-black text-[10px] tracking-[0.2em] uppercase"
                    >
                        <FileText className="w-3 h-3" /> Reglas del servicio
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
                        Última actualización: 11 de abril de 2026
                    </motion.p>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-4 space-y-20">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <motion.article
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-10 bg-white dark:bg-[#161b22] rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-5"
                    >
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black tracking-tighter uppercase text-sm tracking-widest">
                            Finalidad del servicio
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium italic">
                            Kuxipilli ofrece cursos, evaluaciones, guías, casos reales, asistente virtual y
                            recursos de acompañamiento digital para familias. Su propósito es
                            educativo y preventivo.
                        </p>
                    </motion.article>

                    <motion.article
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-10 bg-white dark:bg-[#161b22] rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-5"
                    >
                        <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-600">
                            <Users className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black tracking-tighter uppercase text-sm tracking-widest">
                            Público objetivo
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium italic">
                            La plataforma está pensada para madres, padres y tutores. El uso del
                            servicio debe orientarse al cuidado, formación y supervisión responsable
                            de menores en entornos digitales.
                        </p>
                    </motion.article>
                </section>

                <section className="space-y-10">
                    <div className="text-center space-y-2">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">
                            Principios de uso
                        </h2>
                        <p className="text-3xl font-black tracking-tighter uppercase">
                            Lo que esperamos de la comunidad
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {principles.map((item, index) => (
                            <motion.article
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className="p-8 bg-gray-50 dark:bg-white/5 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex items-start gap-4"
                            >
                                <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-lg">
                                    <ShieldCheck className="w-4 h-4" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-black text-gray-900 dark:text-white text-sm uppercase tracking-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium italic">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </section>

                <section className="space-y-8 bg-white dark:bg-[#161b22] p-12 rounded-[3.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl">
                    <h2 className="text-3xl font-black tracking-tighter uppercase flex items-center gap-4">
                        <Scale className="w-8 h-8 text-indigo-600" /> Condiciones principales
                    </h2>

                    <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                        <p>
                            <strong>1. Uso permitido.</strong> El usuario puede acceder a cursos,
                            exámenes, recursos, asistente virtual y herramientas de reporte con fines
                            educativos y de acompañamiento familiar. No está permitido usar la
                            plataforma para fines ilícitos, fraudulentos o de acoso.
                        </p>

                        <p>
                            <strong>2. Cuenta y acceso.</strong> El usuario es responsable de la
                            información registrada en su cuenta y del resguardo de sus credenciales.
                            La verificación por correo y la recuperación de acceso forman parte del
                            esquema normal de seguridad del servicio.
                        </p>

                        <p>
                            <strong>3. Contenido y recursos.</strong> Los materiales de la
                            plataforma tienen un propósito formativo. No sustituyen atención legal,
                            psicológica, médica ni intervención especializada cuando un caso lo
                            requiera.
                        </p>

                        <p>
                            <strong>4. Asistente virtual y servicios externos.</strong> El asistente digital
                            está orientado a temas de seguridad digital parental. Puede apoyarse en
                            servicios de terceros para generar respuestas o mostrar recursos, por lo
                            que el usuario debe evitar compartir datos personales sensibles de
                            menores.
                        </p>

                        <p>
                            <strong>5. Reportes y conducta.</strong> Los reportes enviados deben
                            realizarse de buena fe y con información suficiente para comprender el
                            contexto. No está permitido usar esta función para difamar, acosar o
                            compartir información innecesariamente sensible.
                        </p>

                        <p>
                            <strong>6. Limitación de responsabilidad.</strong> Kuxipilli es una
                            herramienta educativa de apoyo. Las decisiones sobre supervisión,
                            intervención y cuidado siguen correspondiendo al adulto responsable.
                        </p>

                        <p>
                            <strong>7. Cambios en el servicio.</strong> La plataforma puede
                            actualizar contenidos, diseño, proveedores tecnológicos o políticas para
                            mantener coherencia con el proyecto técnico y las necesidades de
                            seguridad digital.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pt-8 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
                            <Bot className="w-5 h-5" />
                            <Mail className="w-5 h-5" />
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                            Estos términos se interpretan junto con la política de privacidad y con
                            el enfoque educativo descrito en el documento técnico del proyecto.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default TermsOfService;

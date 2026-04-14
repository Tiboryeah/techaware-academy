import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Lock,
    Database,
    Shield,
    FileText,
    Bot,
    Mail,
    AlertTriangle,
    ShieldCheck,
} from 'lucide-react';

const sections = [
    {
        icon: <Database className="w-6 h-6 text-indigo-500" />,
        title: 'Qué datos tratamos',
        content: (
            <>
                <p>
                    Kuxipilli está dirigida a madres, padres y tutores. Para operar la cuenta y
                    personalizar la experiencia, la plataforma puede almacenar datos como nombre,
                    correo electrónico, contraseña protegida mediante hash, progreso académico,
                    resultados de evaluaciones, conversaciones del asistente virtual y reportes enviados por
                    el usuario.
                </p>
                <p>
                    La aplicación no está diseñada para que niñas, niños o adolescentes creen una
                    cuenta propia ni para recopilar de forma sistemática datos personales de
                    menores. Si un usuario decide incluir información sensible de un menor en el
                    asistente virtual o en un reporte, se recomienda omitir nombres completos, direcciones y
                    cualquier dato que permita identificarlo directamente.
                </p>
            </>
        ),
    },
    {
        icon: <Shield className="w-6 h-6 text-indigo-500" />,
        title: 'Para qué usamos la información',
        content: (
            <>
                <p>Usamos la información para:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>crear y proteger la cuenta del usuario,</li>
                    <li>permitir inicio de sesión, verificación y recuperación de acceso,</li>
                    <li>guardar avance, calificaciones y acreditaciones,</li>
                    <li>mostrar rutas de repaso y recomendaciones dentro de la plataforma,</li>
                    <li>mantener historial del asistente virtual y atender reportes enviados por familias.</li>
                </ul>
                <p>
                    No usamos los datos para vender perfiles de usuario ni para una explotación
                    comercial distinta al funcionamiento educativo de la plataforma.
                </p>
            </>
        ),
    },
    {
        icon: <Bot className="w-6 h-6 text-indigo-500" />,
        title: 'Servicios de terceros',
        content: (
            <>
                <p>
                    La aplicación puede apoyarse en servicios externos para funcionar correctamente,
                    entre ellos infraestructura de despliegue, base de datos, correo transaccional,
                    videos embebidos y el asistente conversacional basado en Gemini.
                </p>
                <p>
                    Cuando el usuario utiliza el asistente virtual o interactúa con recursos audiovisuales,
                    parte de la información necesaria para prestar ese servicio puede ser procesada
                    por proveedores tecnológicos vinculados a la operación de Kuxipilli. Ese uso se
                    limita al funcionamiento de la plataforma y al cumplimiento de sus fines
                    educativos.
                </p>
            </>
        ),
    },
    {
        icon: <Lock className="w-6 h-6 text-indigo-500" />,
        title: 'Medidas de seguridad',
        content: (
            <>
                <p>
                    Kuxipilli aplica medidas razonables de seguridad acordes con su arquitectura
                    técnica. Entre ellas se encuentran autenticación de usuarios, contraseñas
                    almacenadas mediante hash, control de acceso a rutas protegidas y separación
                    entre cliente, servidor y base de datos.
                </p>
                <p>
                    Aunque se adoptan buenas prácticas para reducir riesgos, ningún servicio web
                    puede garantizar seguridad absoluta. Por ello, también es importante que el
                    usuario proteja su cuenta, evite compartir credenciales y no publique datos
                    sensibles de terceros.
                </p>
            </>
        ),
    },
    {
        icon: <Mail className="w-6 h-6 text-indigo-500" />,
        title: 'Correos, reportes y contacto',
        content: (
            <>
                <p>
                    El correo electrónico se utiliza para verificación de cuenta, recuperación de
                    acceso y comunicaciones necesarias para el funcionamiento del servicio. Los
                    reportes enviados desde la plataforma también pueden contener información
                    proporcionada por el usuario para documentar una situación de riesgo digital.
                </p>
                <p>
                    Se recomienda que los reportes describan el caso sin exponer más datos
                    personales de los menores de los estrictamente necesarios para entender la
                    situación.
                </p>
            </>
        ),
    },
    {
        icon: <FileText className="w-6 h-6 text-indigo-500" />,
        title: 'Marco de referencia y derechos',
        content: (
            <>
                <p>
                    La política de privacidad se alinea con el enfoque académico y técnico del
                    proyecto, que contempla protección de datos, control de acceso y tratamiento
                    responsable de la información. También toma como referencia el marco normativo
                    citado en el documento técnico, incluida la legislación mexicana de protección de
                    datos personales.
                </p>
                <p>
                    Si en el futuro la plataforma incorpora nuevos tipos de datos o funcionalidades,
                    esta política deberá actualizarse para reflejar esos cambios de forma clara.
                </p>
            </>
        ),
    },
];

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] text-gray-900 dark:text-gray-100 transition-colors duration-500 pb-20">
            <div className="relative pt-24 pb-16 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-black text-[10px] tracking-[0.2em] uppercase"
                    >
                        <Lock className="w-3 h-3" /> Transparencia y cuidado
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
                        Última actualización: 11 de abril de 2026
                    </motion.p>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-4 space-y-16">
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-10 bg-white dark:bg-[#161b22] rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-xl"
                >
                    <div className="space-y-6 text-gray-600 dark:text-gray-300">
                        <p className="text-xl leading-relaxed italic">
                            Kuxipilli es una plataforma educativa para familias. Esta política
                            explica, en términos claros, qué información utiliza la aplicación,
                            para qué la necesita y qué cuidados se esperan tanto del sistema como
                            del propio usuario.
                        </p>
                        <div className="flex items-start gap-4 p-5 rounded-3xl bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20">
                            <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm leading-relaxed text-amber-800 dark:text-amber-200">
                                La plataforma está pensada para adultos responsables del cuidado de
                                menores. Por seguridad, evita compartir en chats, reportes o
                                formularios datos personales sensibles de niñas, niños o
                                adolescentes si no son estrictamente necesarios.
                            </p>
                        </div>
                    </div>
                </motion.section>

                <div className="space-y-10">
                    {sections.map((section, index) => (
                        <motion.section
                            key={section.title}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.06 }}
                            className="flex flex-col md:flex-row gap-8 items-start p-8 rounded-[2.5rem] hover:bg-white dark:hover:bg-[#161b22] transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-800"
                        >
                            <div className="p-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex-shrink-0">
                                {section.icon}
                            </div>
                            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                                <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white uppercase text-sm tracking-widest">
                                    {section.title}
                                </h2>
                                <div className="space-y-4 font-medium">{section.content}</div>
                            </div>
                        </motion.section>
                    ))}
                </div>

                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="p-12 bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-[3rem] text-white text-center space-y-6 shadow-2xl"
                >
                    <ShieldCheck className="w-12 h-12 mx-auto mb-2" />
                    <h3 className="text-3xl font-black tracking-tighter">
                        Compromiso con el uso responsable
                    </h3>
                    <p className="text-indigo-100/90 text-lg italic max-w-2xl mx-auto">
                        La privacidad no se cuida solo con tecnología. También se fortalece con
                        decisiones prudentes, supervisión familiar y un uso consciente de la
                        información que compartimos en línea.
                    </p>
                </motion.section>
            </main>
        </div>
    );
};

export default PrivacyPolicy;

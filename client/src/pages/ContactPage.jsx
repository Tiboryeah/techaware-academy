import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    BookOpen,
    CheckCircle2,
    ClipboardList,
    Lock,
    Mail,
    MessageSquareWarning,
    Send,
    ShieldAlert,
} from 'lucide-react';
import AuthContext from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';
import api from '../services/api';

const messageTypeOptions = [
    'Reporte de caso',
    'Solicitud de orientación',
    'Sugerencia',
    'Otro',
];

const ageRangeOptions = [
    'No aplica',
    'Menor de 9 años',
    '9 a 12 años',
    '13 a 15 años',
    '16 a 17 años',
    'Mayor de edad',
];

const preferredReplyOptions = [
    'Correo electrónico',
    'Respuesta dentro de la plataforma',
    'Sin preferencia',
];

const getInitialForm = (messageType) => ({
    messageType,
    title: '',
    category: 'Otro',
    platform: '',
    ageRange: 'No aplica',
    incidentDate: '',
    contactContext: '',
    description: '',
    actionsTaken: '',
    evidenceAvailable: false,
    evidenceDescription: '',
    preferredReply: 'Correo electrónico',
});

const actionCards = [
    {
        key: 'Reporte de caso',
        title: 'Reportar un caso',
        description: 'Si hubo una situación real, comparte qué pasó, en qué plataforma ocurrió y qué acciones ya realizaron.',
        icon: MessageSquareWarning,
        button: 'Abrir reporte',
    },
    {
        key: 'Solicitud de orientación',
        title: 'Pedir orientación',
        description: 'También puedes usar este espacio para dudas concretas, seguimiento o sugerencias sobre la plataforma.',
        icon: ClipboardList,
        button: 'Pedir orientación',
    },
];

const ContactPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { user, loading } = useContext(AuthContext);
    const { addToast } = useContext(ToastContext);
    const formRef = useRef(null);

    const defaultMessageType =
        searchParams.get('motivo') === 'reporte' ? 'Reporte de caso' : 'Solicitud de orientación';

    const [formData, setFormData] = useState(getInitialForm(defaultMessageType));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setFormData((prev) => ({ ...prev, messageType: defaultMessageType }));
    }, [defaultMessageType]);

    const isCaseReport = formData.messageType === 'Reporte de caso';

    const canSubmit = useMemo(() => {
        if (!user || loading || isSubmitting) return false;
        if (!formData.title.trim() || !formData.description.trim()) return false;
        if (isCaseReport && (!formData.platform.trim() || !formData.actionsTaken.trim())) return false;
        return true;
    }, [formData, isCaseReport, isSubmitting, loading, user]);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const openFormFor = (messageType) => {
        setSuccessMessage('');
        setFormData((prev) => ({ ...prev, messageType }));
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            navigate('/iniciar-sesion');
            return;
        }

        setIsSubmitting(true);
        setSuccessMessage('');

        try {
            const payload = {
                ...formData,
                title: formData.title.trim(),
                platform: formData.platform.trim(),
                contactContext: formData.contactContext.trim(),
                description: formData.description.trim(),
                actionsTaken: formData.actionsTaken.trim(),
                evidenceDescription: formData.evidenceDescription.trim(),
            };

            const { data } = await api.post('/api/reports/submit', payload);
            setSuccessMessage(data.message || 'Información enviada con éxito.');
            addToast('Tu mensaje fue enviado correctamente.', 'success');
            setFormData(getInitialForm(formData.messageType));
        } catch (error) {
            const message = error.response?.data?.message || 'No se pudo enviar la información.';
            addToast(message, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] text-gray-900 dark:text-gray-100 transition-colors duration-500 pb-20">
            <div className="relative pt-24 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />
                <div className="max-w-6xl mx-auto px-4 relative z-10 text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-black text-[10px] tracking-[0.2em] uppercase"
                    >
                        <Mail className="w-3 h-3" /> Contacto y seguimiento
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-black tracking-tighter"
                    >
                        Contáctanos
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 dark:text-gray-400 text-lg italic font-medium max-w-3xl mx-auto"
                    >
                        Separamos este espacio de la biblioteca de casos para recibir mejor cada situación,
                        entender el contexto y darte seguimiento de forma más ordenada.
                    </motion.p>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-4 space-y-12">
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {actionCards.map((card, index) => {
                        const Icon = card.icon;
                        const isActive = formData.messageType === card.key;

                        return (
                            <motion.button
                                key={card.key}
                                type="button"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => openFormFor(card.key)}
                                className={`p-8 text-left bg-white dark:bg-[#161b22] rounded-[2.5rem] border shadow-xl space-y-4 transition-all ${
                                    isActive
                                        ? 'border-indigo-500/40 ring-2 ring-indigo-500/10'
                                        : 'border-gray-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-500/20'
                                }`}
                            >
                                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h2 className="text-lg font-black text-gray-900 dark:text-white">{card.title}</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 italic">{card.description}</p>
                                <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                                    {card.button} <ArrowRight className="w-3.5 h-3.5" />
                                </div>
                            </motion.button>
                        );
                    })}

                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-8 bg-white dark:bg-[#161b22] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-4"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <h2 className="text-lg font-black text-gray-900 dark:text-white">Antes de enviar</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                            Evita compartir nombres completos, direcciones o datos sensibles de menores si no son indispensables.
                        </p>
                        <Link
                            to="/casos-y-guias?seccion=casos"
                            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400"
                        >
                            Volver a casos y guías <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </motion.article>
                </section>

                <section className="p-6 md:p-8 bg-amber-50 dark:bg-amber-500/10 rounded-[2.5rem] border border-amber-100 dark:border-amber-500/20 flex gap-4">
                    <ShieldAlert className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                    <div className="space-y-2">
                        <h3 className="text-lg font-black text-amber-900 dark:text-amber-200">Si el riesgo es inmediato</h3>
                        <p className="text-sm text-amber-800 dark:text-amber-100">
                            No esperes la revisión del formulario. Si un menor está en peligro, prioriza el bloqueo, la conservación de evidencia
                            y la búsqueda de apoyo inmediato con la escuela, la plataforma o las autoridades correspondientes.
                        </p>
                    </div>
                </section>

                <section className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.9fr] gap-8 items-start">
                    <motion.form
                        ref={formRef}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleSubmit}
                        className="p-8 md:p-10 bg-white dark:bg-[#161b22] rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-2xl space-y-8"
                    >
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Formulario de contacto</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                Mientras más claro sea el contexto, mejor podremos interpretar el caso o la consulta.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 ml-2">Tipo de mensaje</label>
                                <select
                                    value={formData.messageType}
                                    onChange={(e) => handleChange('messageType', e.target.value)}
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-[#0a0c10] border border-gray-100 dark:border-gray-800 rounded-2xl outline-none focus:border-indigo-500 text-sm font-medium"
                                >
                                    {messageTypeOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 ml-2">Categoría</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => handleChange('category', e.target.value)}
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-[#0a0c10] border border-gray-100 dark:border-gray-800 rounded-2xl outline-none focus:border-indigo-500 text-sm font-medium"
                                >
                                    <option value="Ciberacoso">Ciberacoso</option>
                                    <option value="Grooming">Grooming</option>
                                    <option value="Fraudes">Fraudes</option>
                                    <option value="Privacidad">Privacidad</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 ml-2">Título breve</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => handleChange('title', e.target.value)}
                                    placeholder="Ej. Contacto insistente en Roblox durante la noche"
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-[#0a0c10] border border-gray-100 dark:border-gray-800 rounded-2xl outline-none focus:border-indigo-500 text-sm font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 ml-2">Plataforma o espacio digital</label>
                                <input
                                    type="text"
                                    value={formData.platform}
                                    onChange={(e) => handleChange('platform', e.target.value)}
                                    placeholder="Ej. Roblox, Discord, WhatsApp, aula virtual"
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-[#0a0c10] border border-gray-100 dark:border-gray-800 rounded-2xl outline-none focus:border-indigo-500 text-sm font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 ml-2">Edad aproximada</label>
                                <select
                                    value={formData.ageRange}
                                    onChange={(e) => handleChange('ageRange', e.target.value)}
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-[#0a0c10] border border-gray-100 dark:border-gray-800 rounded-2xl outline-none focus:border-indigo-500 text-sm font-medium"
                                >
                                    {ageRangeOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 ml-2">Fecha o periodo aproximado</label>
                                <input
                                    type="text"
                                    value={formData.incidentDate}
                                    onChange={(e) => handleChange('incidentDate', e.target.value)}
                                    placeholder="Ej. Abril de 2026 o hace dos semanas"
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-[#0a0c10] border border-gray-100 dark:border-gray-800 rounded-2xl outline-none focus:border-indigo-500 text-sm font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 ml-2">Dónde ocurrió</label>
                                <input
                                    type="text"
                                    value={formData.contactContext}
                                    onChange={(e) => handleChange('contactContext', e.target.value)}
                                    placeholder="Ej. Chat privado, servidor, transmisión, grupo escolar"
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-[#0a0c10] border border-gray-100 dark:border-gray-800 rounded-2xl outline-none focus:border-indigo-500 text-sm font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 ml-2">Qué pasó</label>
                            <textarea
                                rows="6"
                                value={formData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                placeholder="Describe la situación con el mayor orden posible: cómo empezó, qué señales observaron y qué les preocupa."
                                className="w-full px-5 py-4 bg-gray-50 dark:bg-[#0a0c10] border border-gray-100 dark:border-gray-800 rounded-[2rem] outline-none focus:border-indigo-500 text-sm font-medium resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 ml-2">Qué acciones ya realizaron</label>
                            <textarea
                                rows="4"
                                value={formData.actionsTaken}
                                onChange={(e) => handleChange('actionsTaken', e.target.value)}
                                placeholder="Ej. Bloqueamos al usuario, guardamos capturas, hablamos con la escuela, cambiamos la contraseña."
                                className="w-full px-5 py-4 bg-gray-50 dark:bg-[#0a0c10] border border-gray-100 dark:border-gray-800 rounded-[2rem] outline-none focus:border-indigo-500 text-sm font-medium resize-none"
                            />
                        </div>

                        {isCaseReport ? (
                            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-sm text-indigo-800 dark:text-indigo-100">
                                Para reportes de caso necesitamos al menos la plataforma involucrada y las acciones que ya realizaron.
                            </div>
                        ) : null}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 ml-2">¿Cuentan con evidencia?</label>
                                <button
                                    type="button"
                                    onClick={() => handleChange('evidenceAvailable', !formData.evidenceAvailable)}
                                    className={`w-full px-5 py-4 rounded-2xl border text-left font-bold transition-all ${
                                        formData.evidenceAvailable
                                            ? 'bg-indigo-600 text-white border-indigo-600'
                                            : 'bg-gray-50 dark:bg-[#0a0c10] text-gray-600 dark:text-gray-300 border-gray-100 dark:border-gray-800'
                                    }`}
                                >
                                    {formData.evidenceAvailable ? 'Sí, tenemos evidencia' : 'No por ahora'}
                                </button>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 ml-2">Preferencia de respuesta</label>
                                <select
                                    value={formData.preferredReply}
                                    onChange={(e) => handleChange('preferredReply', e.target.value)}
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-[#0a0c10] border border-gray-100 dark:border-gray-800 rounded-2xl outline-none focus:border-indigo-500 text-sm font-medium"
                                >
                                    {preferredReplyOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {formData.evidenceAvailable ? (
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 ml-2">Qué tipo de evidencia tienen</label>
                                <textarea
                                    rows="3"
                                    value={formData.evidenceDescription}
                                    onChange={(e) => handleChange('evidenceDescription', e.target.value)}
                                    placeholder="Ej. Capturas de pantalla, nombres de usuario, fechas, enlaces, historial del chat."
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-[#0a0c10] border border-gray-100 dark:border-gray-800 rounded-[2rem] outline-none focus:border-indigo-500 text-sm font-medium resize-none"
                                />
                            </div>
                        ) : null}

                        {successMessage ? (
                            <div className="p-5 rounded-2xl bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                                <p className="text-sm text-green-800 dark:text-green-100 font-medium">{successMessage}</p>
                            </div>
                        ) : null}

                        {!user && !loading ? (
                            <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex items-start gap-3">
                                <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5" />
                                <div className="space-y-2">
                                    <p className="text-sm text-indigo-800 dark:text-indigo-100 font-medium">
                                        Para enviar el formulario necesitamos que inicies sesión en tu cuenta.
                                    </p>
                                    <Link
                                        to="/iniciar-sesion"
                                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300"
                                    >
                                        Ir a iniciar sesión <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        ) : null}

                        <button
                            type="submit"
                            disabled={!canSubmit}
                            className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-95 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Enviando...' : <><Send className="w-4 h-4" /> Enviar mensaje</>}
                        </button>
                    </motion.form>

                    <div className="space-y-6 xl:sticky xl:top-24 h-fit">
                        <motion.aside
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-8 bg-white dark:bg-[#161b22] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-5"
                        >
                            <h3 className="text-lg font-black text-gray-900 dark:text-white">Qué nos ayuda a analizar mejor</h3>
                            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                                <li>Qué plataforma estuvo involucrada y qué función se estaba usando.</li>
                                <li>Qué señales observaron y desde cuándo comenzaron.</li>
                                <li>Qué acciones ya hicieron y qué resultado tuvieron.</li>
                                <li>Si existen capturas, enlaces o nombres de usuario relevantes.</li>
                            </ul>
                        </motion.aside>

                        <motion.aside
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 }}
                            className="p-8 bg-white dark:bg-[#161b22] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-5"
                        >
                            <h3 className="text-lg font-black text-gray-900 dark:text-white">Te puede servir también</h3>
                            <div className="space-y-3">
                                <Link
                                    to="/casos-y-guias?seccion=casos"
                                    className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-[#0a0c10] border border-gray-100 dark:border-gray-800 hover:border-indigo-500/30 transition-all"
                                >
                                    <span className="font-bold text-sm text-gray-700 dark:text-gray-200">Ver casos reales</span>
                                    <ArrowRight className="w-4 h-4 text-indigo-500" />
                                </Link>
                                <Link
                                    to="/casos-y-guias?seccion=guias"
                                    className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-[#0a0c10] border border-gray-100 dark:border-gray-800 hover:border-indigo-500/30 transition-all"
                                >
                                    <span className="font-bold text-sm text-gray-700 dark:text-gray-200">Abrir guías prácticas</span>
                                    <ArrowRight className="w-4 h-4 text-indigo-500" />
                                </Link>
                            </div>
                        </motion.aside>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ContactPage;

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, LifeBuoy } from 'lucide-react';

const GovernanceRisk = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
        >
            <h2 className="text-3xl font-black tracking-tighter uppercase">Continuidad y Riesgo (ISO 27000)</h2>

            <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-indigo-500 text-center">Matriz de Riesgos CID</h3>
                <div className="overflow-x-auto rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-2xl">
                    <table className="w-full text-left bg-white dark:bg-[#161b22]">
                        <thead className="bg-[#161b22] text-white text-[10px] uppercase tracking-widest font-black">
                            <tr>
                                <th className="px-6 py-4">Activo / Amenaza</th>
                                <th className="px-6 py-4">C</th>
                                <th className="px-6 py-4">I</th>
                                <th className="px-6 py-4">D</th>
                                <th className="px-6 py-4">Riesgo Total</th>
                                <th className="px-6 py-4">Control Aplicado</th>
                            </tr>
                        </thead>
                        <tbody className="text-[11px] border-t border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800 font-black">
                            {[
                                { a: 'Infraestructura / Ataque DDoS', c: 2, i: 4, d: 5, r: 550, ctrl: 'Cloudflare WAF (Rate Limiting) + AWS Shield' },
                                { a: 'Base de Datos / Inyección SQL/NoSQL', c: 5, i: 5, d: 4, r: 800, ctrl: 'Validación de Inputs + Mongoose Schema Validation' },
                                { a: 'Usuarios / Robo de Identidad (Phishing)', c: 5, i: 5, d: 3, r: 750, ctrl: 'MFA (Futuro) + Alertas de Login Sospechoso' },
                                { a: 'Contenido / Inyección de Prompt (AI)', c: 3, i: 4, d: 3, r: 360, ctrl: 'Prompt Engineering (System Instructions) + Filtros de Salida' },
                                { a: 'Legal / Incumplimiento GDPR/COPPA', c: 5, i: 5, d: 5, r: 900, ctrl: 'Política de Privacidad Estricta + Consentimiento Parental' },
                                { a: 'API / Fallo de Servicio Gemini', c: 1, i: 1, d: 5, r: 125, ctrl: 'Fallback a Respuestas Predefinidas + Circuit Breaker' },
                                { a: 'Frontend / XSS (Cross Site Scripting)', c: 4, i: 5, d: 2, r: 320, ctrl: 'React Escaping Automático + CSP Headers' },
                                { a: 'Datos / Pérdida de Backups', c: 1, i: 5, d: 5, r: 625, ctrl: 'Backup Automático Diario en MongoDB Atlas (Retención 7 días)' },
                                { a: 'Sesión / Secuestro de Sesión (Hijacking)', c: 5, i: 4, d: 3, r: 600, ctrl: 'JWT con Expiración Corta + Secure HttpOnly Cookies' },
                                { a: 'Acceso / Fuerza Bruta Administración', c: 4, i: 3, d: 4, r: 480, ctrl: 'Bloqueo de IP tras 5 intentos fallidos' },
                            ].map((r, i) => (
                                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-indigo-500/5 transition-colors">
                                    <td className="px-6 py-4 text-indigo-500 uppercase">{r.a}</td>
                                    <td className="px-6 py-4 text-gray-400">{r.c}</td>
                                    <td className="px-6 py-4 text-gray-400">{r.i}</td>
                                    <td className="px-6 py-4 text-gray-400">{r.d}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full ${r.r >= 700 ? 'bg-red-500/10 text-red-500' : r.r >= 400 ? 'bg-orange-500/10 text-orange-500' : 'bg-green-500/10 text-green-500'}`}>
                                            {r.r}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 italic text-gray-500 font-medium">{r.ctrl}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="font-black uppercase text-xs tracking-widest flex items-center gap-2"><Clock className="w-4 h-4 text-orange-500" /> BIA (Análisis de Impacto)</h3>
                    <div className="p-8 bg-white dark:bg-[#161b22] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 space-y-4">
                        <div className="flex justify-between items-center"><span className="text-gray-400 font-bold uppercase text-[10px]">RTO (Tiempo Objetivo)</span> <span className="font-black text-orange-500">&lt; 1 Hora</span></div>
                        <div className="flex justify-between items-center"><span className="text-gray-400 font-bold uppercase text-[10px]">RPO (Punto Objetivo)</span> <span className="font-black text-orange-500">&lt; 1 Hora</span></div>
                        <div className="flex justify-between items-center"><span className="text-gray-400 font-bold uppercase text-[10px]">MAO (Tolerable)</span> <span className="font-black text-indigo-500">&lt; 2 Horas</span></div>
                        <div className="text-[10px] text-gray-400 italic">MBCO: Portal en modo "Solo Lectura" con servicios críticos habilitados.</div>
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="font-black uppercase text-xs tracking-widest flex items-center gap-2"><LifeBuoy className="w-4 h-4 text-indigo-500" /> Plan de Continuidad</h3>
                    <div className="flex flex-col gap-3">
                        {[
                            { t: '1. Equipo Respuesta', d: 'Director TI, Dev Leads y Especialistas Cloud.' },
                            { t: '2. Niveles Activación', d: 'Nivel 1 (Parcial), Nivel 2 (Servicio Caído), Nivel 3 (Total).' },
                            { t: '3. Estrategia Recup.', d: 'Restauración desatendida desde Atlas Cloud Backup.' },
                        ].map((step, i) => (
                            <div key={i} className="p-4 bg-white dark:bg-[#161b22] rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col gap-1">
                                <div className="font-black text-[10px] text-indigo-600 uppercase tracking-tighter">{step.t}</div>
                                <div className="text-[11px] font-medium text-gray-500 italic">{step.d}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default GovernanceRisk;

import React from 'react';
import { motion } from 'framer-motion';

const GovernanceBusinessCase = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
        >
            <h2 className="text-3xl font-black tracking-tighter uppercase text-center mb-8">Caso de Negocio</h2>

            <div className="p-8 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-8">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-4 mb-4">
                    <div className="flex justify-end">
                        <div className="bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-lg text-xs font-bold text-blue-800 dark:text-blue-300">
                            Fecha de elaboración: 03/10/2025
                        </div>
                    </div>
                </div>

                {/* 1. Información General */}
                <section className="space-y-4">
                    <h4 className="text-sm font-black uppercase text-red-500 tracking-widest">1. Información General del Proyecto de TI</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase text-gray-400">Nombre del Servicio</span>
                            <div className="font-bold text-gray-700 dark:text-gray-200">Almacenamiento en la Nube</div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase text-gray-400">Clave</span>
                            <div className="font-bold text-gray-700 dark:text-gray-200">ID</div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase text-gray-400">Fecha Propuesta de Inicio</span>
                            <div className="font-bold text-gray-700 dark:text-gray-200">25/09/2025</div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase text-gray-400">Fecha Fin Propuesta</span>
                            <div className="font-bold text-gray-700 dark:text-gray-200">07/01/2026</div>
                        </div>
                        <div className="space-y-1 md:col-span-2">
                            <span className="text-[10px] font-bold uppercase text-gray-400">Administrador del Proyecto</span>
                            <div className="font-bold text-gray-700 dark:text-gray-200">Esteban Martinez Lopez</div>
                        </div>
                    </div>
                </section>

                {/* 2. Antecedentes */}
                <section className="space-y-4">
                    <h4 className="text-sm font-black uppercase text-red-500 tracking-widest">2. Antecedentes</h4>
                    <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 text-justify text-xs font-medium text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
                        <p>
                            En los últimos años, el crecimiento exponencial de la información digital ha generado una necesidad urgente de soluciones de almacenamiento que sean seguras, escalables y accesibles desde cualquier ubicación. Las organizaciones mexicanas, especialmente las pequeñas y medianas empresas, han enfrentado limitaciones en infraestructura local, altos costos de mantenimiento y vulnerabilidades asociadas al almacenamiento físico.
                        </p>
                        <p>
                            El almacenamiento en la nube (Cloud Storage) ha emergido como una alternativa estratégica frente a los esquemas tradicionales, ya que permite administrar datos sin depender de dispositivos físicos costosos y con riesgo de obsolescencia. Adicionalmente, ofrece elasticidad para ajustar la capacidad según la demanda, integración con otras soluciones de cómputo en la nube, así como altos niveles de seguridad mediante cifrado, autenticación multifactor y cumplimiento de normas internacionales como ISO/IEC 27001 y GDPR.
                        </p>
                        <p>
                            A nivel nacional, la adopción de servicios de almacenamiento en la nube ha tenido un incremento significativo debido a políticas de digitalización, teletrabajo, educación a distancia y comercio electrónico. Sin embargo, aún existe una brecha tecnológica en muchas organizaciones que carecen de soluciones confiables y accesibles, lo que representa una oportunidad de implementar un servicio de Cloud Storage optimizado para el contexto local, con costos competitivos y soporte especializado.
                        </p>
                    </div>
                </section>

                {/* 1. Justificación Técnica */}
                <section className="space-y-4">
                    <h4 className="text-sm font-black uppercase text-red-500 tracking-widest">1. Justificación Técnica del Servicio</h4>
                    <div className="bg-gray-50 dark:bg-gray-800/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 text-justify text-xs font-medium text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
                        <p>
                            La implementación del servicio de Cloud Storage responde a la necesidad de contar con un sistema de almacenamiento de datos flexible, seguro y disponible 24/7. La infraestructura propuesta se basará en servidores distribuidos y redundantes que garanticen alta disponibilidad, recuperación ante desastres y escalabilidad.
                        </p>
                        <p>
                            Desde un punto de vista técnico, permitirá reducir la dependencia de dispositivos físicos, optimizar la continuidad de negocio y facilitar la colaboración en línea, integrando controles de seguridad avanzados como cifrado en tránsito y en reposo, copias de seguridad automáticas y monitoreo en tiempo real.
                        </p>
                    </div>
                </section>

                {/* 2. Alcance */}
                <section className="space-y-4">
                    <h4 className="text-sm font-black uppercase text-red-500 tracking-widest">2. Alcance</h4>
                    <div className="bg-gray-50 dark:bg-gray-800/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 text-justify text-xs font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
                        <p>
                            El servicio abarcará el diseño, implementación y operación de una plataforma de Cloud Storage para empresas y usuarios particulares, con acceso desde múltiples dispositivos, interfaz amigable, soporte técnico especializado y medidas de seguridad alineadas a estándares internacionales.
                        </p>
                    </div>
                </section>

                {/* 3. Objetivo */}
                <section className="space-y-4">
                    <h4 className="text-sm font-black uppercase text-red-500 tracking-widest">3. Objetivo</h4>
                    <div className="bg-gray-50 dark:bg-gray-800/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 text-justify text-xs font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
                        <p>
                            Implementar un servicio de Cloud Storage que garantice seguridad, accesibilidad y escalabilidad de datos, respondiendo a las necesidades de almacenamiento digital de empresas y usuarios.
                        </p>
                    </div>
                </section>

                {/* 4. Riesgos Clave */}
                <section className="space-y-4">
                    <h4 className="text-sm font-black uppercase text-red-500 tracking-widest">4. Riesgos Clave</h4>
                    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                        <table className="w-full text-left bg-white dark:bg-[#161b22]">
                            <thead className="bg-gray-200 dark:bg-gray-700 text-[10px] uppercase font-black text-gray-700 dark:text-gray-300">
                                <tr>
                                    <th className="px-4 py-2 border-r border-gray-300 dark:border-gray-600">Descripción del Riesgo</th>
                                    <th className="px-4 py-2 border-r border-gray-300 dark:border-gray-600">Impacto</th>
                                    <th className="px-4 py-2">Probabilidad</th>
                                </tr>
                            </thead>
                            <tbody className="text-[10px] divide-y divide-gray-200 dark:divide-gray-700 bg-blue-50/50 dark:bg-blue-900/10">
                                <tr>
                                    <td className="px-4 py-2 border-r border-gray-200 dark:border-gray-700 font-bold">Brechas de seguridad por ciberataques</td>
                                    <td className="px-4 py-2 border-r border-gray-200 dark:border-gray-700 text-gray-500 italic">En blanco por ahora</td>
                                    <td className="px-4 py-2 text-gray-500 italic">En blanco por ahora</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border-r border-gray-200 dark:border-gray-700 font-bold">Fallos en la infraestructura de servidores</td>
                                    <td className="px-4 py-2 border-r border-gray-200 dark:border-gray-700"></td>
                                    <td className="px-4 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border-r border-gray-200 dark:border-gray-700 font-bold">Falta de capacitación por parte del equipo para implementar servicios en la nube</td>
                                    <td className="px-4 py-2 border-r border-gray-200 dark:border-gray-700"></td>
                                    <td className="px-4 py-2"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 1. Beneficios Esperados */}
                <section className="space-y-4">
                    <h4 className="text-sm font-black uppercase text-red-500 tracking-widest">1. Beneficios Esperados</h4>
                    <div className="bg-blue-100 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800 text-justify text-xs font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
                        <p>
                            La implementación de almacenamiento en la nube permite reducir costos de infraestructura, garantizar la disponibilidad de la información crítica en cualquier lugar y ayuda a cumplir con normativas de protección de datos. Asimismo le permite a la empresa disponer de potencial de escalabilidad cuando sea necesario.
                        </p>
                    </div>
                </section>

                {/* 2. Planeación Alto Nivel */}
                <section className="space-y-4">
                    <h4 className="text-sm font-black uppercase text-red-500 tracking-widest">2. Planeación Alto Nivel</h4>

                    <div className="space-y-2 pt-4">
                        <h5 className="text-xs font-bold uppercase text-red-500">2.1 Dependencia con otros proveedores</h5>
                        <div className="flex border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div className="p-3 bg-white dark:bg-gray-800 w-1/3 border-r border-gray-300 dark:border-gray-700">
                                <span className="text-[10px] font-bold block mb-1">¿Existe dependencia con otros Proyectos?</span>
                                <span className="inline-block px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs font-bold rounded">NO</span>
                            </div>
                            <div className="p-3 w-2/3 bg-gray-100 dark:bg-gray-900/50 flex items-center">
                                <span className="text-[10px] font-bold mr-2">Describa con cuáles:</span>
                                <span className="text-xs">N/A</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 pt-4">
                        <h5 className="text-xs font-bold uppercase text-red-500">2.2 Personal Involucrado</h5>
                        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                            <table className="w-full text-center bg-white dark:bg-[#161b22]">
                                <thead className="bg-gray-200 dark:bg-gray-700 text-[10px] uppercase font-black text-gray-700 dark:text-gray-300">
                                    <tr>
                                        <th className="px-4 py-2 border-r border-gray-300 dark:border-gray-600">Perfil</th>
                                        <th className="px-4 py-2 border-r border-gray-300 dark:border-gray-600">Número</th>
                                        <th className="px-4 py-2">Tipo de Contratación</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[10px] bg-blue-100 dark:bg-blue-900/20">
                                    <tr>
                                        <td className="px-4 py-2 border-r border-gray-300 dark:border-gray-600 text-left">Roles, personas que requerimos para dar el servicio, (diseñadores, ingenieros)</td>
                                        <td className="px-4 py-2 border-r border-gray-300 dark:border-gray-600">Cuantos necesitamos</td>
                                        <td className="px-4 py-2">Por proyecto, honorarios, de base, etc</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* 1. Glosario Técnico */}
                <section className="space-y-4 pb-4">
                    <h4 className="text-sm font-black uppercase text-red-500 tracking-widest">1. Glosario Técnico</h4>
                    <div className="overflow-x-auto rounded-xl border border-blue-200 dark:border-blue-800">
                        <table className="w-full text-left bg-white dark:bg-[#161b22]">
                            <thead className="bg-gray-200 dark:bg-gray-700 text-[10px] uppercase font-black text-gray-700 dark:text-gray-300">
                                <tr>
                                    <th className="px-4 py-2 w-1/3 border-r border-gray-300 dark:border-gray-600">Concepto</th>
                                    <th className="px-4 py-2 w-2/3">Descripción</th>
                                </tr>
                            </thead>
                            <tbody className="text-[10px] bg-blue-100 dark:bg-blue-900/20 divide-y divide-blue-200 dark:divide-blue-800">
                                <tr>
                                    <td className="px-4 py-2 border-r border-blue-200 dark:border-blue-800 font-bold">Cloud storage</td>
                                    <td className="px-4 py-2">Servicio de almacenamiento de datos en servidores remotos accesibles por internet.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </motion.div>
    );
};

export default GovernanceBusinessCase;

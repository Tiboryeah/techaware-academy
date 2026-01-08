import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Activity, Lock, AlertTriangle, FileSpreadsheet, Info } from 'lucide-react';

const GovernanceRiskMatrix = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 pb-12"
        >
            <h2 className="text-3xl font-black tracking-tighter uppercase text-center mb-8">Matriz de Riesgos</h2>

            {/* TABLA 1: Valoración de Activos (Criticidad) */}
            <div className="p-6 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                        <Activity className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-black text-gray-700 dark:text-gray-200 uppercase tracking-widest">1. Valoración de Activos (Criticidad)</h3>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                    <table className="w-full text-center text-[10px] bg-white dark:bg-[#161b22]">
                        <thead className="bg-[#92D050] text-black font-black uppercase">
                            <tr>
                                <th colSpan="3" className="px-2 py-2 border-r border-black/10">Activo</th>
                                <th colSpan="7" className="px-2 py-2">Valoración</th>
                            </tr>
                            <tr className="bg-blue-200/50 dark:bg-blue-900/50 text-gray-800 dark:text-gray-200">
                                <th className="px-2 py-2 border-r border-gray-300 dark:border-gray-600">ID Proceso</th>
                                <th className="px-2 py-2 border-r border-gray-300 dark:border-gray-600">ID Activo</th>
                                <th className="px-2 py-2 border-r border-gray-300 dark:border-gray-600 w-1/4">Activo de Información</th>
                                <th className="px-2 py-2 border-r border-gray-300 dark:border-gray-600">Área Geog.</th>
                                <th className="px-2 py-2 border-r border-gray-300 dark:border-gray-600">Periodo Afect.</th>
                                <th className="px-2 py-2 border-r border-gray-300 dark:border-gray-600">Impacto</th>
                                <th className="px-2 py-2 border-r border-gray-300 dark:border-gray-600">Infra. Crít.</th>
                                <th className="px-2 py-2 border-r border-gray-300 dark:border-gray-600">Campos Afect.</th>
                                <th className="px-2 py-2 border-r border-gray-300 dark:border-gray-600">Interdep.</th>
                                <th className="px-2 py-2">Criticidad</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-medium">
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="py-2 border-r">TAW-OP-01</td>
                                <td className="py-2 border-r font-bold text-indigo-600">TAW-INF-01</td>
                                <td className="py-2 border-r text-left px-2">Infraestructura Cloud</td>
                                <td className="py-2 border-r">3</td>
                                <td className="py-2 border-r">3</td>
                                <td className="py-2 border-r font-bold text-red-500">5</td>
                                <td className="py-2 border-r">3</td>
                                <td className="py-2 border-r">3</td>
                                <td className="py-2 border-r">5</td>
                                <td className="py-2 font-black text-red-600 bg-red-100 dark:bg-red-900/20">V</td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="py-2 border-r">TAW-OP-01</td>
                                <td className="py-2 border-r font-bold text-indigo-600">TAW-SW-03</td>
                                <td className="py-2 border-r text-left px-2">Plataforma Web</td>
                                <td className="py-2 border-r">3</td>
                                <td className="py-2 border-r">2</td>
                                <td className="py-2 border-r font-bold text-orange-500">4</td>
                                <td className="py-2 border-r">2</td>
                                <td className="py-2 border-r">2</td>
                                <td className="py-2 border-r">3</td>
                                <td className="py-2 font-black text-orange-600 bg-orange-100 dark:bg-orange-900/20">IV</td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="py-2 border-r">TAW-OP-01</td>
                                <td className="py-2 border-r font-bold text-indigo-600">TAW-MON-01</td>
                                <td className="py-2 border-r text-left px-2">Sistema Monitoreo</td>
                                <td className="py-2 border-r">1</td>
                                <td className="py-2 border-r">2</td>
                                <td className="py-2 border-r font-bold text-yellow-500">2</td>
                                <td className="py-2 border-r">1</td>
                                <td className="py-2 border-r">1</td>
                                <td className="py-2 border-r">1</td>
                                <td className="py-2 font-black text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20">II</td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="py-2 border-r">TAW-SEG-02</td>
                                <td className="py-2 border-r font-bold text-indigo-600">TAW-DAT-02</td>
                                <td className="py-2 border-r text-left px-2">Base de Datos Usuarios</td>
                                <td className="py-2 border-r">3</td>
                                <td className="py-2 border-r">2</td>
                                <td className="py-2 border-r font-bold text-red-500">4</td>
                                <td className="py-2 border-r">3</td>
                                <td className="py-2 border-r">3</td>
                                <td className="py-2 border-r">5</td>
                                <td className="py-2 font-black text-red-600 bg-red-100 dark:bg-red-900/20">V</td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="py-2 border-r">TAW-SEG-02</td>
                                <td className="py-2 border-r font-bold text-indigo-600">TAW-SW-03</td>
                                <td className="py-2 border-r text-left px-2">Plataforma Web</td>
                                <td className="py-2 border-r">3</td>
                                <td className="py-2 border-r">2</td>
                                <td className="py-2 border-r font-bold text-orange-500">4</td>
                                <td className="py-2 border-r">2</td>
                                <td className="py-2 border-r">2</td>
                                <td className="py-2 border-r">3</td>
                                <td className="py-2 font-black text-orange-600 bg-orange-100 dark:bg-orange-900/20">IV</td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="py-2 border-r">TAW-SEG-02</td>
                                <td className="py-2 border-r font-bold text-indigo-600">TAW-ACC-02</td>
                                <td className="py-2 border-r text-left px-2">Control de Accesos</td>
                                <td className="py-2 border-r">3</td>
                                <td className="py-2 border-r">2</td>
                                <td className="py-2 border-r font-bold text-red-500">4</td>
                                <td className="py-2 border-r">3</td>
                                <td className="py-2 border-r">2</td>
                                <td className="py-2 border-r">4</td>
                                <td className="py-2 font-black text-red-600 bg-red-100 dark:bg-red-900/20">V</td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="py-2 border-r">TAW-SOP-03</td>
                                <td className="py-2 border-r font-bold text-indigo-600">TAW-PER-04</td>
                                <td className="py-2 border-r text-left px-2">Personal de IT</td>
                                <td className="py-2 border-r">2</td>
                                <td className="py-2 border-r">2</td>
                                <td className="py-2 border-r font-bold text-yellow-500">3</td>
                                <td className="py-2 border-r">2</td>
                                <td className="py-2 border-r">2</td>
                                <td className="py-2 border-r">3</td>
                                <td className="py-2 font-black text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20">III</td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="py-2 border-r">TAW-SOP-03</td>
                                <td className="py-2 border-r font-bold text-indigo-600">TAW-DOC-05</td>
                                <td className="py-2 border-r text-left px-2">Documentación Técnica</td>
                                <td className="py-2 border-r">1</td>
                                <td className="py-2 border-r">1</td>
                                <td className="py-2 border-r font-bold text-green-500">1</td>
                                <td className="py-2 border-r">1</td>
                                <td className="py-2 border-r">1</td>
                                <td className="py-2 border-r">1</td>
                                <td className="py-2 font-black text-green-600 bg-green-100 dark:bg-green-900/20">I</td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="py-2 border-r">TAW-SOP-03</td>
                                <td className="py-2 border-r font-bold text-indigo-600">TAW-TOOL-03</td>
                                <td className="py-2 border-r text-left px-2">Gestión Incidentes</td>
                                <td className="py-2 border-r">2</td>
                                <td className="py-2 border-r">1</td>
                                <td className="py-2 border-r font-bold text-yellow-500">2</td>
                                <td className="py-2 border-r">2</td>
                                <td className="py-2 border-r">2</td>
                                <td className="py-2 border-r">3</td>
                                <td className="py-2 font-black text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20">III</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* TABLAS 2 y 3: Referencias */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Tabla 2: Referencia Amenaza */}
                <div className="p-6 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-4">
                    <div className="flex items-center gap-3 justify-center mb-2">
                        <Info className="w-5 h-5 text-gray-400" />
                        <h3 className="text-sm font-black text-gray-700 dark:text-gray-200 uppercase tracking-widest">Referencia: Amenaza</h3>
                    </div>
                    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                        <table className="w-full text-[10px] bg-white dark:bg-[#161b22]">
                            <thead className="bg-white dark:bg-gray-900 border-b border-black">
                                <tr>
                                    <th colSpan="3" className="px-2 py-2  font-black uppercase text-center text-sm">AMENAZA</th>
                                </tr>
                            </thead>
                            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-black uppercase text-center">
                                <tr>
                                    <th className="px-2 py-2 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-[#161b22]"></th>
                                    <th className="px-2 py-2 border-r border-gray-200 dark:border-gray-700 border-t border-gray-300">Valor</th>
                                    <th className="px-2 py-2 border-t border-gray-300">Descripción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-medium">
                                {/* Capacidad */}
                                <tr>
                                    <td rowSpan="3" className="border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-2 text-center font-black uppercase writing-vertical-lr">Capacidad</td>
                                    <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-center font-bold text-lg">1</td>
                                    <td className="p-2">Poca o nula capacidad de realizar el ataque.</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-center font-bold text-lg">2</td>
                                    <td className="p-2">Capacidad moderada. Recursos limitados o conocimientos limitados.</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-center font-bold text-lg">3</td>
                                    <td className="p-2">Altamente capaz. Conocimientos, habilidades y recursos necesarios disponibles.</td>
                                </tr>
                                {/* Motivación */}
                                <tr className="border-t-2 border-gray-200 dark:border-gray-700">
                                    <td rowSpan="3" className="border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-2 text-center font-black uppercase writing-vertical-lr">Motivación</td>
                                    <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-center font-bold text-lg">1</td>
                                    <td className="p-2">Poca o nula motivación. No se está inclinado a actuar.</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-center font-bold text-lg">2</td>
                                    <td className="p-2">Nivel moderado de motivación. Se actuará si se le pide o provoca.</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-center font-bold text-lg">3</td>
                                    <td className="p-2">Altamente motivado. Casi seguro que intentará el ataque.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tabla 3: Referencia Probabilidad */}
                <div className="p-6 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-4">
                    <div className="flex items-center gap-3 justify-center mb-2">
                        <Info className="w-5 h-5 text-gray-400" />
                        <h3 className="text-sm font-black text-gray-700 dark:text-gray-200 uppercase tracking-widest">Referencia: Probabilidad</h3>
                    </div>
                    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                        <table className="w-full text-[10px] bg-white dark:bg-[#161b22]">
                            <thead className="bg-white dark:bg-gray-900 border-b border-black">
                                <tr>
                                    <th colSpan="3" className="px-2 py-2 font-black uppercase text-center text-sm">PROBABILIDAD</th>
                                </tr>
                            </thead>
                            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-black uppercase text-center">
                                <tr>
                                    <th className="px-2 py-2 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-[#161b22]"></th>
                                    <th className="px-2 py-2 border-r border-gray-200 dark:border-gray-700 border-t border-gray-300">Valor</th>
                                    <th className="px-2 py-2 border-t border-gray-300">Descripción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-medium">
                                <tr>
                                    <td rowSpan="3" className="border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-2 text-center font-black uppercase writing-vertical-lr w-8">
                                        Probabilidad de Ocurrencia
                                    </td>
                                    <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-center font-bold text-lg h-24">1</td>
                                    <td className="p-2">Baja, no hay historial y es raro que la amenazas ocurra.</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-center font-bold text-lg h-24">2</td>
                                    <td className="p-2">Media, se han presentado casos y puede ocurrrir la amenaza.</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-center font-bold text-lg h-24">3</td>
                                    <td className="p-2">Alta, se han presentado suficientes casos y la amenaza seguramente ocurrirá.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* TABLA 4: Análisis de Vulnerabilidades */}
                <div className="p-6 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm font-black text-gray-700 dark:text-gray-200 uppercase tracking-widest">2. Análisis de Vulnerabilidades</h3>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                        <table className="w-full text-center text-[10px]">
                            <thead className="bg-white dark:bg-gray-900 border-b border-black">
                                <tr>
                                    <th colSpan="4" className="px-2 py-2 font-black uppercase text-center text-sm">Análisis de vulnerabilidades</th>
                                </tr>
                            </thead>
                            <thead className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-black uppercase">
                                <tr>
                                    <th className="px-3 py-2 text-left w-1/2">Vulnerabilidades</th>
                                    <th className="px-3 py-2">Severidad</th>
                                    <th className="px-3 py-2">Exposición</th>
                                    <th className="px-3 py-2 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200">Valor 3</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-medium">
                                <tr>
                                    <td className="px-3 py-2 text-left">Inyección SQL y falta de cifrado (TAW_DAT_02)</td>
                                    <td className="px-3 py-2">3</td>
                                    <td className="px-3 py-2">3</td>
                                    <td className="px-3 py-2 font-black bg-blue-50 dark:bg-blue-900/20 text-blue-600">5</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 text-left">Privilegios excesivos y falta de MFA (TAW_ACC_02)</td>
                                    <td className="px-3 py-2">3</td>
                                    <td className="px-3 py-2">3</td>
                                    <td className="px-3 py-2 font-black bg-blue-50 dark:bg-blue-900/20 text-blue-600">5</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 text-left">Ausencia de redundancia geográfica (TAW_INF_01)</td>
                                    <td className="px-3 py-2">2</td>
                                    <td className="px-3 py-2">3</td>
                                    <td className="px-3 py-2 font-black bg-blue-50 dark:bg-blue-900/20 text-blue-600">4</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 text-left">Desactualización de parches de seguridad (TAW_SW_03 OP)</td>
                                    <td className="px-3 py-2">2</td>
                                    <td className="px-3 py-2">3</td>
                                    <td className="px-3 py-2 font-black bg-blue-50 dark:bg-blue-900/20 text-blue-600">4</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 text-left">Librerías vulnerables y fallos de sesión (TAW_SW_03 SEG)</td>
                                    <td className="px-3 py-2">2</td>
                                    <td className="px-3 py-2">2</td>
                                    <td className="px-3 py-2 font-black bg-blue-50 dark:bg-blue-900/20 text-blue-600">3</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 text-left">Inaccesibilidad remota de herramientas (TAW_TOOL_03)</td>
                                    <td className="px-3 py-2">2</td>
                                    <td className="px-3 py-2">2</td>
                                    <td className="px-3 py-2 font-black bg-blue-50 dark:bg-blue-900/20 text-blue-600">3</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 text-left">Falta de capacitación técnica especializada (TAW_PER_04)</td>
                                    <td className="px-3 py-2">2</td>
                                    <td className="px-3 py-2">2</td>
                                    <td className="px-3 py-2 font-black bg-blue-50 dark:bg-blue-900/20 text-blue-600">3</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 text-left">Umbrales de alerta mal configurados (TAW_MON_01)</td>
                                    <td className="px-3 py-2">1</td>
                                    <td className="px-3 py-2">2</td>
                                    <td className="px-3 py-2 font-black bg-blue-50 dark:bg-blue-900/20 text-blue-600">2</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 text-left">Inconsistencia en manuales operativos (TAW_DOC_05)</td>
                                    <td className="px-3 py-2">1</td>
                                    <td className="px-3 py-2">2</td>
                                    <td className="px-3 py-2 font-black bg-blue-50 dark:bg-blue-900/20 text-blue-600">2</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* TABLA 5: Análisis de Amenazas */}
                <div className="p-6 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600">
                            <ShieldAlert className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm font-black text-gray-700 dark:text-gray-200 uppercase tracking-widest">3. Análisis de Amenazas</h3>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                        <table className="w-full text-center text-[10px]">
                            <thead className="bg-white dark:bg-gray-900 border-b border-black">
                                <tr>
                                    <th colSpan="5" className="px-2 py-2 font-black uppercase text-center text-sm">Análisis de amenazas</th>
                                </tr>
                            </thead>
                            <thead className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-black uppercase">
                                <tr>
                                    <th className="px-3 py-2 text-left w-1/3">Amenazas</th>
                                    <th className="px-3 py-2 text-left w-1/3">Eventos de amenaza</th>
                                    <th className="px-2 py-2">Capacidad</th>
                                    <th className="px-2 py-2">Motivación</th>
                                    <th className="px-3 py-2 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200">Valor 4</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-medium">
                                <tr>
                                    <td className="px-3 py-2 text-left">Ciberdelito (Ataque dirigido)</td>
                                    <td className="px-3 py-2 text-left text-gray-500">Robo de identidad de menores (TAW_DAT_02)</td>
                                    <td className="px-2 py-2">3</td>
                                    <td className="px-2 py-2">3</td>
                                    <td className="px-3 py-2 font-black bg-blue-50 dark:bg-blue-900/20 text-blue-600">5</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 text-left">Suplantación de identidad</td>
                                    <td className="px-3 py-2 text-left text-gray-500">Acceso no autorizado (TAW_ACC_02)</td>
                                    <td className="px-2 py-2">2</td>
                                    <td className="px-2 py-2">3</td>
                                    <td className="px-3 py-2 font-black bg-blue-50 dark:bg-blue-900/20 text-blue-600">4</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 text-left">Denegación de Servicio (DoS)</td>
                                    <td className="px-3 py-2 text-left text-gray-500">Interrupción de plataforma (TAW_SW_03 OP)</td>
                                    <td className="px-2 py-2">2</td>
                                    <td className="px-2 py-2">3</td>
                                    <td className="px-3 py-2 font-black bg-blue-50 dark:bg-blue-900/20 text-blue-600">4</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 text-left">Ingeniería Social</td>
                                    <td className="px-3 py-2 text-left text-gray-500">Divulgación de credenciales (TAW_PER_04)</td>
                                    <td className="px-2 py-2">2</td>
                                    <td className="px-2 py-2">3</td>
                                    <td className="px-3 py-2 font-black bg-blue-50 dark:bg-blue-900/20 text-blue-600">4</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 text-left">Inyección de código malicioso</td>
                                    <td className="px-3 py-2 text-left text-gray-500">Alteración de contenidos (TAW_SW_03 SEG)</td>
                                    <td className="px-2 py-2">2</td>
                                    <td className="px-2 py-2">2</td>
                                    <td className="px-3 py-2 font-black bg-blue-50 dark:bg-blue-900/20 text-blue-600">3</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 text-left">Falla técnica de infraestructura</td>
                                    <td className="px-3 py-2 text-left text-gray-500">Caída del servicio cloud (TAW_INF_01)</td>
                                    <td className="px-2 py-2">2</td>
                                    <td className="px-2 py-2">2</td>
                                    <td className="px-3 py-2 font-black bg-blue-50 dark:bg-blue-900/20 text-blue-600">3</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 text-left">Interrupción de servicio externo</td>
                                    <td className="px-3 py-2 text-left text-gray-500">Incapacidad de gestión (TAW_TOOL_03)</td>
                                    <td className="px-2 py-2">2</td>
                                    <td className="px-2 py-2">2</td>
                                    <td className="px-3 py-2 font-black bg-blue-50 dark:bg-blue-900/20 text-blue-600">3</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 text-left">Error humano de operación</td>
                                    <td className="px-3 py-2 text-left text-gray-500">Pérdida de visibilidad (TAW_MON_01)</td>
                                    <td className="px-2 py-2">1</td>
                                    <td className="px-2 py-2">2</td>
                                    <td className="px-3 py-2 font-black bg-blue-50 dark:bg-blue-900/20 text-blue-600">2</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 text-left">Pérdida de conocimiento</td>
                                    <td className="px-3 py-2 text-left text-gray-500">Retraso en recuperación (TAW_DOC_05)</td>
                                    <td className="px-2 py-2">1</td>
                                    <td className="px-2 py-2">2</td>
                                    <td className="px-3 py-2 font-black bg-blue-50 dark:bg-blue-900/20 text-blue-600">2</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* TABLA 6: Riesgo con Controles */}
            <div className="p-6 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600">
                        <Lock className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-black text-gray-700 dark:text-gray-200 uppercase tracking-widest">4. Cálculo de Riesgo con Controles</h3>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                    <table className="w-full text-center text-[10px]">
                        <thead className="bg-white dark:bg-gray-900 border-b border-black">
                            <tr>
                                <th colSpan="5" className="px-2 py-2 font-black uppercase text-center text-sm">Riesgo con control = Amenaza x Vulnerabilidad x Probabilidad x Impacto</th>
                            </tr>
                        </thead>
                        <thead className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 font-black uppercase">
                            <tr>
                                <th className="px-6 py-3 border-r dark:border-gray-700 w-1/5 bg-blue-100/50 dark:bg-blue-900/20">Amenaza</th>
                                <th className="px-6 py-3 border-r dark:border-gray-700 w-1/5 bg-blue-100/50 dark:bg-blue-900/20">Vulnerabilidad</th>
                                <th className="px-6 py-3 border-r dark:border-gray-700 w-1/5">Probabilidad</th>
                                <th className="px-6 py-3 border-r dark:border-gray-700 w-1/5">Impacto</th>
                                <th className="px-6 py-3 w-1/5 bg-blue-200 dark:bg-blue-800">Riesgo Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-bold text-lg">
                            <tr className="bg-blue-100/50 dark:bg-blue-900/30">
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">5</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">5</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">2</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">11</td>
                                <td className="py-4 bg-blue-300 dark:bg-blue-700 text-black dark:text-white">550</td>
                            </tr>
                            <tr className="bg-blue-100/50 dark:bg-blue-900/30">
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">4</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">5</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">2</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">12</td>
                                <td className="py-4 bg-blue-300 dark:bg-blue-700 text-black dark:text-white">480</td>
                            </tr>
                            <tr className="bg-blue-100/50 dark:bg-blue-900/30">
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">4</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">4</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">2</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">8</td>
                                <td className="py-4 bg-blue-300 dark:bg-blue-700 text-black dark:text-white">256</td>
                            </tr>
                            <tr className="bg-blue-100/50 dark:bg-blue-900/30">
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">4</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">4</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">2</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">14</td>
                                <td className="py-4 bg-blue-300 dark:bg-blue-700 text-black dark:text-white">448</td>
                            </tr>
                            <tr className="bg-blue-100/50 dark:bg-blue-900/30">
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">3</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">3</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">2</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">12</td>
                                <td className="py-4 bg-blue-300 dark:bg-blue-700 text-black dark:text-white">216</td>
                            </tr>
                            <tr className="bg-blue-100/50 dark:bg-blue-900/30">
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">3</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">3</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">2</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">14</td>
                                <td className="py-4 bg-blue-300 dark:bg-blue-700 text-black dark:text-white">252</td>
                            </tr>
                            <tr className="bg-blue-100/50 dark:bg-blue-900/30">
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">3</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">3</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">2</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">9</td>
                                <td className="py-4 bg-blue-300 dark:bg-blue-700 text-black dark:text-white">162</td>
                            </tr>
                            <tr className="bg-blue-100/50 dark:bg-blue-900/30">
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">2</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">2</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">2</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">7</td>
                                <td className="py-4 bg-blue-300 dark:bg-blue-700 text-black dark:text-white">56</td>
                            </tr>
                            <tr className="bg-blue-100/50 dark:bg-blue-900/30">
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">2</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">2</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">2</td>
                                <td className="py-4 border-r dark:border-gray-700 text-black dark:text-white">10</td>
                                <td className="py-4 bg-blue-300 dark:bg-blue-700 text-black dark:text-white">80</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* TABLA 7: Matriz Consolidada de Riesgos y Controles */}
            <div className="p-6 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600">
                        <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-black text-gray-700 dark:text-gray-200 uppercase tracking-widest">5. Matriz Consolidada de Riesgos y Controles</h3>
                </div>
                <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                    <table className="w-full text-left text-[9px] bg-white dark:bg-[#161b22]">
                        <thead className="bg-[#92D050] text-black font-black uppercase text-center">
                            <tr>
                                <th colSpan="3" className="px-2 py-2 border-r border-black/10">Activo</th>
                                <th colSpan="6" className="px-2 py-2 border-r border-black/10">Valoración</th>
                                <th rowSpan="2" className="px-2 py-2 border-r border-black/10 bg-[#92D050]">Vulnerabilidades</th>
                                <th rowSpan="2" className="px-2 py-2 border-r border-black/10 bg-[#92D050]">Amenazas</th>
                                <th rowSpan="2" className="px-2 py-2 border-r border-black/10 bg-[#92D050]">Evento de Amenaza (Riesgo)</th>
                                <th rowSpan="2" className="px-2 py-2 bg-[#92D050]">Controles</th>
                            </tr>
                            <tr className="bg-blue-200/50 dark:bg-blue-900/50 text-gray-800 dark:text-gray-200">
                                <th className="px-2 py-2 border-r border-gray-300 dark:border-gray-600">ID_PROCESO</th>
                                <th className="px-2 py-2 border-r border-gray-300 dark:border-gray-600">ID_ACTIVO</th>
                                <th className="px-2 py-2 border-r border-gray-300 dark:border-gray-600 w-32">ACTIVO DE INFORMACIÓN</th>
                                <th className="px-1 py-1 border-r resize-x">C</th><th className="px-1 py-1 border-r">I</th><th className="px-1 py-1 border-r">D</th>
                                <th className="px-2 py-2 border-r border-gray-300 dark:border-gray-600 bg-blue-300 dark:bg-blue-700 text-black dark:text-white">TOTAL</th>
                                <th className="px-2 py-2 border-r border-gray-300 dark:border-gray-600 bg-blue-300 dark:bg-blue-700 text-black dark:text-white">VALOR 1</th>
                                <th className="px-2 py-2 border-r border-gray-300 dark:border-gray-600 bg-blue-300 dark:bg-blue-700 text-black dark:text-white">VALOR 2</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {/* Row 1 */}
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="p-2 border-r font-mono">TAW-OP-01</td>
                                <td className="p-2 border-r font-mono font-bold text-indigo-600">TAW-INF-01</td>
                                <td className="p-2 border-r">Infraestructura Cloud</td>
                                <td className="p-2 text-center border-r">2</td><td className="p-2 text-center border-r">4</td><td className="p-2 text-center border-r">5</td>
                                <td className="p-2 text-center border-r font-bold bg-blue-50 dark:bg-blue-900/20">11</td>
                                <td className="p-2 text-center border-r font-bold text-red-500 bg-blue-50 dark:bg-blue-900/20">Alto</td>
                                <td className="p-2 text-center border-r font-bold bg-blue-50 dark:bg-blue-900/20">3</td>
                                <td className="p-2 border-r text-gray-500">Mala configuración de red</td>
                                <td className="p-2 border-r text-gray-500">Falla técnica</td>
                                <td className="p-2 border-r font-medium">Interrupción del servicio</td>
                                <td className="p-2 bg-green-50/50 dark:bg-green-900/10 font-bold border-l-4 border-green-500">Multi-AZ, Load Balancing</td>
                            </tr>
                            {/* Row 2 */}
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="p-2 border-r font-mono">TAW-OP-01</td>
                                <td className="p-2 border-r font-mono font-bold text-indigo-600">TAW-SW-03</td>
                                <td className="p-2 border-r">Plataforma Web</td>
                                <td className="p-2 text-center border-r">3</td><td className="p-2 text-center border-r">4</td><td className="p-2 text-center border-r">5</td>
                                <td className="p-2 text-center border-r font-bold bg-blue-50 dark:bg-blue-900/20">12</td>
                                <td className="p-2 text-center border-r font-bold text-red-500 bg-blue-50 dark:bg-blue-900/20">Alto</td>
                                <td className="p-2 text-center border-r font-bold bg-blue-50 dark:bg-blue-900/20">3</td>
                                <td className="p-2 border-r text-gray-500">Código no sanitizado</td>
                                <td className="p-2 border-r text-gray-500">Inyección XSS</td>
                                <td className="p-2 border-r font-medium">Alteración de contenido</td>
                                <td className="p-2 bg-green-50/50 dark:bg-green-900/10 font-bold border-l-4 border-green-500">WAF, Auditoría código</td>
                            </tr>
                            {/* Row 3 */}
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="p-2 border-r font-mono">TAW-OP-01</td>
                                <td className="p-2 border-r font-mono font-bold text-indigo-600">TAW-MON-01</td>
                                <td className="p-2 border-r">Sistema Monitoreo</td>
                                <td className="p-2 text-center border-r">3</td><td className="p-2 text-center border-r">1</td><td className="p-2 text-center border-r">4</td>
                                <td className="p-2 text-center border-r font-bold bg-blue-50 dark:bg-blue-900/20">8</td>
                                <td className="p-2 text-center border-r font-bold text-orange-500 bg-blue-50 dark:bg-blue-900/20">Medio</td>
                                <td className="p-2 text-center border-r font-bold bg-blue-50 dark:bg-blue-900/20">2</td>
                                <td className="p-2 border-r text-gray-500">Alertas mal configuradas</td>
                                <td className="p-2 border-r text-gray-500">Falta de visibilidad</td>
                                <td className="p-2 border-r font-medium">Retraso en detección</td>
                                <td className="p-2 bg-green-50/50 dark:bg-green-900/10 font-bold border-l-4 border-green-500">Dashboard en tiempo real</td>
                            </tr>
                            {/* Row 4 */}
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="p-2 border-r font-mono">TAW-SEG-02</td>
                                <td className="p-2 border-r font-mono font-bold text-indigo-600">TAW-DAT-02</td>
                                <td className="p-2 border-r">Base de Datos Usuarios</td>
                                <td className="p-2 text-center border-r">5</td><td className="p-2 text-center border-r">5</td><td className="p-2 text-center border-r">4</td>
                                <td className="p-2 text-center border-r font-bold bg-blue-50 dark:bg-blue-900/20">14</td>
                                <td className="p-2 text-center border-r font-bold text-red-500 bg-blue-50 dark:bg-blue-900/20">Alto</td>
                                <td className="p-2 text-center border-r font-bold bg-blue-50 dark:bg-blue-900/20">3</td>
                                <td className="p-2 border-r text-gray-500">Falta cifrado</td>
                                <td className="p-2 border-r text-gray-500">Ciberdelito</td>
                                <td className="p-2 border-r font-medium">Exfiltración de datos</td>
                                <td className="p-2 bg-green-50/50 dark:bg-green-900/10 font-bold border-l-4 border-green-500">Argon2, AES-256</td>
                            </tr>
                            {/* Row 5 */}
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="p-2 border-r font-mono">TAW-SEG-02</td>
                                <td className="p-2 border-r font-mono font-bold text-indigo-600">TAW-SW-03</td>
                                <td className="p-2 border-r">Plataforma Web</td>
                                <td className="p-2 text-center border-r">3</td><td className="p-2 text-center border-r">4</td><td className="p-2 text-center border-r">5</td>
                                <td className="p-2 text-center border-r font-bold bg-blue-50 dark:bg-blue-900/20">12</td>
                                <td className="p-2 text-center border-r font-bold text-red-500 bg-blue-50 dark:bg-blue-900/20">Alto</td>
                                <td className="p-2 text-center border-r font-bold bg-blue-50 dark:bg-blue-900/20">3</td>
                                <td className="p-2 border-r text-gray-500">Sesiones inseguras</td>
                                <td className="p-2 border-r text-gray-500">Hijacking</td>
                                <td className="p-2 border-r font-medium">Suplantación de identidad</td>
                                <td className="p-2 bg-green-50/50 dark:bg-green-900/10 font-bold border-l-4 border-green-500">TLS 1.3, MFA</td>
                            </tr>
                            {/* Row 6 */}
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="p-2 border-r font-mono">TAW-SEG-02</td>
                                <td className="p-2 border-r font-mono font-bold text-indigo-600">TAW-ACC-02</td>
                                <td className="p-2 border-r">Control de Accesos</td>
                                <td className="p-2 text-center border-r">5</td><td className="p-2 text-center border-r">5</td><td className="p-2 text-center border-r">4</td>
                                <td className="p-2 text-center border-r font-bold bg-blue-50 dark:bg-blue-900/20">14</td>
                                <td className="p-2 text-center border-r font-bold text-red-500 bg-blue-50 dark:bg-blue-900/20">Alto</td>
                                <td className="p-2 text-center border-r font-bold bg-blue-50 dark:bg-blue-900/20">3</td>
                                <td className="p-2 border-r text-gray-500">Privilegios excesivos</td>
                                <td className="p-2 border-r text-gray-500">Escalación</td>
                                <td className="p-2 border-r font-medium">Acceso no autorizado</td>
                                <td className="p-2 bg-green-50/50 dark:bg-green-900/10 font-bold border-l-4 border-green-500">RBAC, IAM Policies</td>
                            </tr>
                            {/* Row 7 */}
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="p-2 border-r font-mono">TAW-SOP-03</td>
                                <td className="p-2 border-r font-mono font-bold text-indigo-600">TAW-PER-04</td>
                                <td className="p-2 border-r">Personal de IT</td>
                                <td className="p-2 text-center border-r">2</td><td className="p-2 text-center border-r">3</td><td className="p-2 text-center border-r">4</td>
                                <td className="p-2 text-center border-r font-bold bg-gray-50 dark:bg-gray-800/50">9</td>
                                <td className="p-2 text-center border-r font-bold text-orange-500 bg-gray-50 dark:bg-gray-800/50">Medio</td>
                                <td className="p-2 text-center border-r font-bold bg-gray-50 dark:bg-gray-800/50">2</td>
                                <td className="p-2 border-r text-gray-500">Falta de capacitación</td>
                                <td className="p-2 border-r text-gray-500">Error humano</td>
                                <td className="p-2 border-r font-medium">Mala administración</td>
                                <td className="p-2 bg-green-50/50 dark:bg-green-900/10 font-bold border-l-4 border-green-500">Capacitación APO07</td>
                            </tr>
                            {/* Row 8 */}
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="p-2 border-r font-mono">TAW-SOP-03</td>
                                <td className="p-2 border-r font-mono font-bold text-indigo-600">TAW-DOC-05</td>
                                <td className="p-2 border-r">Documentación Técnica</td>
                                <td className="p-2 text-center border-r">2</td><td className="p-2 text-center border-r">3</td><td className="p-2 text-center border-r">2</td>
                                <td className="p-2 text-center border-r font-bold bg-gray-50 dark:bg-gray-800/50">7</td>
                                <td className="p-2 text-center border-r font-bold text-orange-500 bg-gray-50 dark:bg-gray-800/50">Medio</td>
                                <td className="p-2 text-center border-r font-bold bg-gray-50 dark:bg-gray-800/50">2</td>
                                <td className="p-2 border-r text-gray-500">Versiones obsoletas</td>
                                <td className="p-2 border-r text-gray-500">Fuga información</td>
                                <td className="p-2 border-r font-medium">Error en recuperación</td>
                                <td className="p-2 bg-green-50/50 dark:bg-green-900/10 font-bold border-l-4 border-green-500">Git para documentos</td>
                            </tr>
                            {/* Row 9 */}
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="p-2 border-r font-mono">TAW-SOP-03</td>
                                <td className="p-2 border-r font-mono font-bold text-indigo-600">TAW-TOOL-03</td>
                                <td className="p-2 border-r">Gestión Incidentes</td>
                                <td className="p-2 text-center border-r">2</td><td className="p-2 text-center border-r">4</td><td className="p-2 text-center border-r">4</td>
                                <td className="p-2 text-center border-r font-bold bg-gray-50 dark:bg-gray-800/50">10</td>
                                <td className="p-2 text-center border-r font-bold text-orange-500 bg-gray-50 dark:bg-gray-800/50">Medio</td>
                                <td className="p-2 text-center border-r font-bold bg-gray-50 dark:bg-gray-800/50">2</td>
                                <td className="p-2 border-r text-gray-500">Inaccesibilidad remota</td>
                                <td className="p-2 border-r text-gray-500">Pérdida control</td>
                                <td className="p-2 border-r font-medium">Incapacidad respuesta</td>
                                <td className="p-2 bg-green-50/50 dark:bg-green-900/10 font-bold border-l-4 border-green-500">Hosting externo (SaaS)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* TABLA 8: Infraestructuras Críticas y Controles (Resumen) */}
            <div className="p-6 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600">
                        <Lock className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-black text-gray-700 dark:text-gray-200 uppercase tracking-widest">Resumen de Controles Críticos</h3>
                </div>
                <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                    <table className="w-full text-left text-[10px] bg-white dark:bg-[#161b22]">
                        <thead className="bg-[#92D050] text-black font-black uppercase">
                            <tr>
                                <th colSpan="3" className="px-4 py-2 border-b border-black/10 text-center">IDENTIFICACIÓN DE INFRAESTRUCTURAS CRÍTICAS</th>
                            </tr>
                            <tr>
                                <th className="px-4 py-3 border-r border-black/10 w-1/3">INFRAESTRUCTURAS CRÍTICAS DETECTADAS</th>
                                <th className="px-4 py-3 border-r border-black/10 w-1/6 text-center">GRADO DE CRITICIDAD</th>
                                <th className="px-4 py-3 w-1/2 text-center">CONTROLES A IMPLEMENTAR</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-medium text-xs">
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="p-4 border-r dark:border-gray-700">
                                    <span className="font-black text-indigo-600 block mb-1">TAW_INF_01:</span>
                                    Infraestructura en la nube
                                </td>
                                <td className="p-4 border-r dark:border-gray-700 text-center font-black text-black dark:text-gray-200">V</td>
                                <td className="p-4 text-justify">Despliegue en configuración Multi-AZ (Zonas de Disponibilidad) para garantizar redundancia física y activación de balanceadores de carga (Load Balancers) bajo el dominio DSS01.</td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="p-4 border-r dark:border-gray-700">
                                    <span className="font-black text-indigo-600 block mb-1">TAW_DAT_02:</span>
                                    Base de datos de usuarios
                                </td>
                                <td className="p-4 border-r dark:border-gray-700 text-center font-black text-black dark:text-gray-200">V</td>
                                <td className="p-4 text-justify">Implementación de cifrado AES-256 para datos en reposo, hashing de contraseñas mediante el algoritmo Argon2 y gestión de respaldos inmutables para mitigar riesgos de ciberdelito.</td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="p-4 border-r dark:border-gray-700">
                                    <span className="font-black text-indigo-600 block mb-1">TAW_ACC_02:</span>
                                    Sistema de control de accesos
                                </td>
                                <td className="p-4 border-r dark:border-gray-700 text-center font-black text-black dark:text-gray-200">V</td>
                                <td className="p-4 text-justify">Configuración de Políticas IAM basadas en el principio de menor privilegio (RBAC), implementación obligatoria de MFA (Multi-Factor Authentication) y auditoría de logs de acceso.</td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="p-4 border-r dark:border-gray-700">
                                    <span className="font-black text-indigo-600 block mb-1">TAW_SW_03:</span>
                                    Plataforma web
                                </td>
                                <td className="p-4 border-r dark:border-gray-700 text-center font-black text-black dark:text-gray-200">IV</td>
                                <td className="p-4 text-justify">Integración de un Web Application Firewall (WAF) para la mitigación de ataques XSS e Inyección SQL, junto con la implementación de certificados TLS 1.3 para el cifrado de datos en tránsito.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </motion.div>
    );
};

export default GovernanceRiskMatrix;

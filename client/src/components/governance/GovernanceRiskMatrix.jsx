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
                                <td className="py-2 border-r">TAW_OP_01</td>
                                <td className="py-2 border-r font-bold text-indigo-600">TAW_INF_01</td>
                                <td className="py-2 border-r text-left px-2">Infraestructura en la nube</td>
                                <td className="py-2 border-r">3</td>
                                <td className="py-2 border-r">3</td>
                                <td className="py-2 border-r font-bold text-red-500">5</td>
                                <td className="py-2 border-r">3</td>
                                <td className="py-2 border-r">3</td>
                                <td className="py-2 border-r">5</td>
                                <td className="py-2 font-black text-red-600 bg-red-100 dark:bg-red-900/20">V</td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="py-2 border-r">TAW_SEG_02</td>
                                <td className="py-2 border-r font-bold text-indigo-600">TAW_DAT_02</td>
                                <td className="py-2 border-r text-left px-2">Base de datos de usuarios</td>
                                <td className="py-2 border-r">3</td>
                                <td className="py-2 border-r">2</td>
                                <td className="py-2 border-r font-bold text-red-500">4</td>
                                <td className="py-2 border-r">2</td>
                                <td className="py-2 border-r">3</td>
                                <td className="py-2 border-r">4</td>
                                <td className="py-2 font-black text-red-600 bg-red-100 dark:bg-red-900/20">V</td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="py-2 border-r">TAW_SEG_02</td>
                                <td className="py-2 border-r font-bold text-indigo-600">TAW_SW_03</td>
                                <td className="py-2 border-r text-left px-2">Plataforma web</td>
                                <td className="py-2 border-r">3</td>
                                <td className="py-2 border-r">2</td>
                                <td className="py-2 border-r font-bold text-orange-500">4</td>
                                <td className="py-2 border-r">1</td>
                                <td className="py-2 border-r">2</td>
                                <td className="py-2 border-r">2</td>
                                <td className="py-2 font-black text-orange-600 bg-orange-100 dark:bg-orange-900/20">IV</td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="py-2 border-r">TAW_SOP_03</td>
                                <td className="py-2 border-r font-bold text-indigo-600">TAW_PER_04</td>
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
                                <td className="py-2 border-r">TAW_SOP_03</td>
                                <td className="py-2 border-r font-bold text-indigo-600">TAW_DOC_05</td>
                                <td className="py-2 border-r text-left px-2">Documentación técnica</td>
                                <td className="py-2 border-r">1</td>
                                <td className="py-2 border-r">1</td>
                                <td className="py-2 border-r font-bold text-green-500">1</td>
                                <td className="py-2 border-r">1</td>
                                <td className="py-2 border-r">1</td>
                                <td className="py-2 border-r">1</td>
                                <td className="py-2 font-black text-green-600 bg-green-100 dark:bg-green-900/20">I</td>
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
                                    <td rowSpan="3" className="border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-2 text-center font-black uppercase writing-vertical-lr rotate-180">Capacidad</td>
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
                                    <td rowSpan="3" className="border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-2 text-center font-black uppercase writing-vertical-lr rotate-180">Motivación</td>
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
                                    <td rowSpan="3" className="border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-2 text-center font-black uppercase writing-vertical-lr rotate-180 w-8">
                                        Probabilidad de ocurre
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                                    <td className="px-3 py-2 text-left">Ausencia de redundancia geográfica (TAW_INF_01)</td>
                                    <td className="px-3 py-2">2</td>
                                    <td className="px-3 py-2">3</td>
                                    <td className="px-3 py-2 font-black bg-blue-50 dark:bg-blue-900/20 text-blue-600">4</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 text-left">Librerías desactualizadas y XSS (TAW_SW_03)</td>
                                    <td className="px-3 py-2">2</td>
                                    <td className="px-3 py-2">2</td>
                                    <td className="px-3 py-2 font-black bg-blue-50 dark:bg-blue-900/20 text-blue-600">3</td>
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
                                    <td className="px-3 py-2 text-left text-gray-500">Robo de identidad de menores</td>
                                    <td className="px-2 py-2">3</td>
                                    <td className="px-2 py-2">3</td>
                                    <td className="px-3 py-2 font-black bg-blue-50 dark:bg-blue-900/20 text-blue-600">5</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 text-left">Denegación de Servicio (DoS)</td>
                                    <td className="px-3 py-2 text-left text-gray-500">Interrupción de plataforma</td>
                                    <td className="px-2 py-2">2</td>
                                    <td className="px-2 py-2">3</td>
                                    <td className="px-3 py-2 font-black bg-blue-50 dark:bg-blue-900/20 text-blue-600">4</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 text-left">Sabotaje de contenido</td>
                                    <td className="px-3 py-2 text-left text-gray-500">Alteración de material didáctico</td>
                                    <td className="px-2 py-2">2</td>
                                    <td className="px-2 py-2">2</td>
                                    <td className="px-3 py-2 font-black bg-blue-50 dark:bg-blue-900/20 text-blue-600">3</td>
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
                                <td className="p-2 border-r font-mono">TAW_OP_01</td>
                                <td className="p-2 border-r font-mono font-bold text-indigo-600">TAW_INF_01</td>
                                <td className="p-2 border-r">Infraestructura en la nube</td>
                                <td className="p-2 text-center border-r">2</td><td className="p-2 text-center border-r">4</td><td className="p-2 text-center border-r">5</td>
                                <td className="p-2 text-center border-r font-bold bg-blue-50 dark:bg-blue-900/20">11</td>
                                <td className="p-2 text-center border-r font-bold text-red-500 bg-blue-50 dark:bg-blue-900/20">Alto</td>
                                <td className="p-2 text-center border-r font-bold bg-blue-50 dark:bg-blue-900/20">3</td>
                                <td className="p-2 border-r text-gray-500">Falta de redundancia regional, config débil de red, falla técnica (proveedor)</td>
                                <td className="p-2 border-r text-gray-500">Ataque DDoS, Interrupción del servicio educativo digital.</td>
                                <td className="p-2 border-r font-medium">Interrupción del servicio educativo digital.</td>
                                <td className="p-2 bg-green-50/50 dark:bg-green-900/10 font-bold border-l-4 border-green-500">Implementación de Multi-AZ y Plan de Recuperación (DRP).</td>
                            </tr>
                            {/* Row 2 */}
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="p-2 border-r font-mono">TAW_SEG_02</td>
                                <td className="p-2 border-r font-mono font-bold text-indigo-600">TAW_DAT_02</td>
                                <td className="p-2 border-r">Base de datos de usuarios</td>
                                <td className="p-2 text-center border-r">5</td><td className="p-2 text-center border-r">5</td><td className="p-2 text-center border-r">4</td>
                                <td className="p-2 text-center border-r font-bold bg-blue-50 dark:bg-blue-900/20">14</td>
                                <td className="p-2 text-center border-r font-bold text-red-500 bg-blue-50 dark:bg-blue-900/20">Alto</td>
                                <td className="p-2 text-center border-r font-bold bg-blue-50 dark:bg-blue-900/20">3</td>
                                <td className="p-2 border-r text-gray-500">Inyección SQL, falta de cifrado en reposo.</td>
                                <td className="p-2 border-r text-gray-500">Ciberdelito, Robo de identidad de menores.</td>
                                <td className="p-2 border-r font-medium">Exfiltración de datos sensibles de usuarios.</td>
                                <td className="p-2 bg-green-50/50 dark:bg-green-900/10 font-bold border-l-4 border-green-500">Uso de Argon2 para passwords y cifrado AES-256.</td>
                            </tr>
                            {/* Row 3 */}
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="p-2 border-r font-mono">TAW_SEG_02</td>
                                <td className="p-2 border-r font-mono font-bold text-indigo-600">TAW_SW_03</td>
                                <td className="p-2 border-r">Plataforma web</td>
                                <td className="p-2 text-center border-r">3</td><td className="p-2 text-center border-r">4</td><td className="p-2 text-center border-r">3</td>
                                <td className="p-2 text-center border-r font-bold bg-blue-50 dark:bg-blue-900/20">12</td>
                                <td className="p-2 text-center border-r font-bold text-red-500 bg-blue-50 dark:bg-blue-900/20">Alto</td>
                                <td className="p-2 text-center border-r font-bold bg-blue-50 dark:bg-blue-900/20">3</td>
                                <td className="p-2 border-r text-gray-500">Librerías desactualizadas, vulnerabilidad XSS.</td>
                                <td className="p-2 border-r text-gray-500">Inyección de código malicioso, Sabotaje.</td>
                                <td className="p-2 border-r font-medium">Alteración de los contenidos didácticos.</td>
                                <td className="p-2 bg-green-50/50 dark:bg-green-900/10 font-bold border-l-4 border-green-500">Escaneo de vulnerabilidades y Hardening de software.</td>
                            </tr>
                            {/* Row 4 */}
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="p-2 border-r font-mono">TAW_SOP_03</td>
                                <td className="p-2 border-r font-mono font-bold text-indigo-600">TAW_PER_04</td>
                                <td className="p-2 border-r">Personal de IT</td>
                                <td className="p-2 text-center border-r">2</td><td className="p-2 text-center border-r">4</td><td className="p-2 text-center border-r">4</td>
                                <td className="p-2 text-center border-r font-bold bg-gray-50 dark:bg-gray-800/50">10</td>
                                <td className="p-2 text-center border-r font-bold text-orange-500 bg-gray-50 dark:bg-gray-800/50">Medio</td>
                                <td className="p-2 text-center border-r font-bold bg-gray-50 dark:bg-gray-800/50">2</td>
                                <td className="p-2 border-r text-gray-500">Alta rotación, falta de capacitación en seguridad cloud.</td>
                                <td className="p-2 border-r text-gray-500">Error humano, Ingeniería social.</td>
                                <td className="p-2 border-r font-medium">Configuración errónea de privilegios de acceso.</td>
                                <td className="p-2 bg-green-50/50 dark:bg-green-900/10 font-bold border-l-4 border-green-500">Capacitación bajo APO07 y planes de retención.</td>
                            </tr>
                            {/* Row 5 */}
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="p-2 border-r font-mono">TAW_SOP_03</td>
                                <td className="p-2 border-r font-mono font-bold text-indigo-600">TAW_DOC_05</td>
                                <td className="p-2 border-r">Documentación técnica</td>
                                <td className="p-2 text-center border-r">2</td><td className="p-2 text-center border-r">3</td><td className="p-2 text-center border-r">2</td>
                                <td className="p-2 text-center border-r font-bold bg-gray-50 dark:bg-gray-800/50">7</td>
                                <td className="p-2 text-center border-r font-bold text-orange-500 bg-gray-50 dark:bg-gray-800/50">Medio</td>
                                <td className="p-2 text-center border-r font-bold bg-gray-50 dark:bg-gray-800/50">2</td>
                                <td className="p-2 border-r text-gray-500">Documentación desactualizada o inaccesible.</td>
                                <td className="p-2 border-r text-gray-500">Pérdida de conocimiento institucional.</td>
                                <td className="p-2 border-r font-medium">Retraso en la resolución de incidentes (DSS02).</td>
                                <td className="p-2 bg-green-50/50 dark:bg-green-900/10 font-bold border-l-4 border-green-500">Control de versiones y repositorio centralizado.</td>
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
                                <td className="p-4 border-r dark:border-gray-700 text-center font-black text-red-600 bg-red-50 dark:bg-red-900/10">V (Crítico)</td>
                                <td className="p-4 text-justify">Implementación de esquemas de alta disponibilidad (Multi-AZ), balanceo de carga automatizado y un Plan de Recuperación ante Desastres (DRP) que garantice el 98% de disponibilidad.</td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="p-4 border-r dark:border-gray-700">
                                    <span className="font-black text-indigo-600 block mb-1">TAW_DAT_02:</span>
                                    Base de datos de usuarios
                                </td>
                                <td className="p-4 border-r dark:border-gray-700 text-center font-black text-red-600 bg-red-50 dark:bg-red-900/10">V (Crítico)</td>
                                <td className="p-4 text-justify">Aplicación de cifrado AES-256 para datos en reposo, hashing de credenciales mediante el algoritmo Argon2, y auditoría perimetral de accesos bajo el dominio DSS01 de COBIT.</td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                <td className="p-4 border-r dark:border-gray-700">
                                    <span className="font-black text-indigo-600 block mb-1">TAW_SW_03:</span>
                                    Plataforma web
                                </td>
                                <td className="p-4 border-r dark:border-gray-700 text-center font-black text-orange-500 bg-orange-50 dark:bg-orange-900/10">IV (Alto)</td>
                                <td className="p-4 text-justify">Despliegue de un Web Application Firewall (WAF) para mitigar ataques de inyección, implementación de certificados TLS 1.3 y escaneos de vulnerabilidades trimestrales.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </motion.div>
    );
};

export default GovernanceRiskMatrix;

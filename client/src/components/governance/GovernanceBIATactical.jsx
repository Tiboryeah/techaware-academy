import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, Layers, Link, CheckSquare, AlertTriangle, FileSpreadsheet } from 'lucide-react';

const GovernanceBIATactical = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 pb-12"
        >
            <h2 className="text-3xl font-black tracking-tighter uppercase text-center mb-8">Análisis de Impacto al Negocio (BIA)</h2>

            {/* INTRO Y OBJETIVO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                            <FileSpreadsheet className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm font-black text-gray-700 dark:text-gray-200 uppercase tracking-widest">1. Introducción</h3>
                    </div>
                    <p className="text-xs text-justify text-gray-600 dark:text-gray-300 leading-relaxed">
                        El Análisis de Impacto al Negocio (BIA) es el proceso de analizar actividades y el efecto que una interrupción del negocio pudiera tener en ellas.
                        <br /><br />
                        En conformidad con ISO 22301:2012, este documento establece la criticidad de los procesos operativos de TechAware Kids, identificando los tiempos máximos tolerables de interrupción y los recursos necesarios para garantizar la resiliencia de la plataforma educativa frente a incidentes que comprometan la infraestructura en la nube o la seguridad de los datos.
                    </p>
                </div>

                <div className="p-8 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600">
                            <TargetIcon className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm font-black text-gray-700 dark:text-gray-200 uppercase tracking-widest">2. Objetivo</h3>
                    </div>
                    <p className="text-xs text-justify text-gray-600 dark:text-gray-300 leading-relaxed">
                        Determinar los requisitos de recuperación y continuidad para el proceso de gestión de la plataforma educativa, estableciendo el Tiempo Objetivo de Recuperación (RTO) y el Periodo Máximo Tolerable de Interrupción (MTPD) necesarios para salvaguardar la reputación institucional y cumplir con los acuerdos de nivel de servicio (SLA) del 98% de disponibilidad definidos.
                    </p>
                </div>
            </div>

            {/* 3. PROCEDIMIENTO */}
            <div className="p-8 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-8">
                <div className="flex items-center gap-3 justify-center mb-4">
                    <h3 className="text-xl font-black text-gray-700 dark:text-gray-200 uppercase tracking-widest">3. Procedimiento</h3>
                </div>

                {/* 3.1 Identificación del Proceso */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h4 className="text-xs font-black uppercase text-gray-500 mb-4 tracking-wider">3.1. Identificación del proceso</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-xs">
                        <div className="flex flex-col">
                            <span className="font-bold text-gray-500 uppercase text-[10px]">Proceso</span>
                            <span className="font-bold text-lg text-indigo-600">Gestión y Entrega del Servicio Educativo Digital (TAW_OP_01)</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-gray-500 uppercase text-[10px]">Grupo de Productos y Servicios</span>
                            <span className="font-medium">Plataforma SaaS TechAware Kids / Suscripciones Premium</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-gray-500 uppercase text-[10px]">Responsable (Área/Función)</span>
                            <span className="font-medium">Gerencia de Operaciones de TI / CISO</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-gray-500 uppercase text-[10px]">Nombre del responsable</span>
                            <span className="font-medium">Martínez López Gerardo Esteban</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-gray-500 uppercase text-[10px]">Fecha de llenado</span>
                            <span className="font-medium">05/01/2026</span>
                        </div>
                    </div>
                </div>

                {/* 3.2 Matriz de Impacto */}
                <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase text-gray-500 tracking-wider">3.2. Tipo y nivel de impacto al negocio por la interrupción en el proceso</h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Valores: No aplica (N) | Bajo (B) | Medio (M) | Alto (A)</p>

                    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                        <table className="w-full text-center text-[10px]">
                            <thead className="bg-gray-100 dark:bg-gray-800 font-black uppercase text-gray-600 dark:text-gray-300">
                                <tr>
                                    <th className="px-4 py-3 text-left border-r dark:border-gray-700">Tipo de Impacto</th>
                                    <th className="px-2 py-3 border-r dark:border-gray-700">0-5 Min.</th>
                                    <th className="px-2 py-3 border-r dark:border-gray-700">5-15 Min.</th>
                                    <th className="px-2 py-3 border-r dark:border-gray-700">15-30 Min.</th>
                                    <th className="px-2 py-3 border-r dark:border-gray-700">30-60 Min.</th>
                                    <th className="px-2 py-3 border-r dark:border-gray-700">1-2 Horas</th>
                                    <th className="px-2 py-3 border-r dark:border-gray-700">2-5 Horas</th>
                                    <th className="px-2 py-3 border-r dark:border-gray-700">5-12 Horas</th>
                                    <th className="px-2 py-3 border-r dark:border-gray-700">12-24 Horas</th>
                                    <th className="px-2 py-3 border-r dark:border-gray-700">1-2 Días</th>
                                    <th className="px-2 py-3 border-r dark:border-gray-700">2-5 Días</th>
                                    <th className="px-2 py-3">&gt;5 Días</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-bold bg-white dark:bg-[#161b22]">
                                <tr>
                                    <td className="px-4 py-3 text-left border-r dark:border-gray-700">Pérdida económica</td>
                                    <td className="text-gray-400">N</td><td className="text-gray-400">N</td><td className="text-gray-400">N</td><td className="text-orange-500">B</td>
                                    <td className="text-orange-500">B</td><td className="text-yellow-500">M</td><td className="text-yellow-500">M</td><td className="text-red-500">A</td>
                                    <td className="text-red-500">A</td><td className="text-red-500">A</td><td className="text-red-500">A</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-left border-r dark:border-gray-700">Incumplimiento legal/regulatorio</td>
                                    <td className="text-gray-400">N</td><td className="text-gray-400">N</td><td className="text-gray-400">N</td><td className="text-orange-500">B</td>
                                    <td className="text-yellow-500">M</td><td className="text-yellow-500">M</td><td className="text-red-500">A</td><td className="text-red-500">A</td>
                                    <td className="text-red-500">A</td><td className="text-red-500">A</td><td className="text-red-500">A</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-left border-r dark:border-gray-700">Daño a la reputación/Imagen</td>
                                    <td className="text-orange-500">B</td><td className="text-orange-500">B</td><td className="text-yellow-500">M</td><td className="text-yellow-500">M</td>
                                    <td className="text-red-500">A</td><td className="text-red-500">A</td><td className="text-red-500">A</td><td className="text-red-500">A</td>
                                    <td className="text-red-500">A</td><td className="text-red-500">A</td><td className="text-red-500">A</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-left border-r dark:border-gray-700">Afectación del servicio al cliente</td>
                                    <td className="text-yellow-500">M</td><td className="text-red-500">A</td><td className="text-red-500">A</td><td className="text-red-500">A</td>
                                    <td className="text-red-500">A</td><td className="text-red-500">A</td><td className="text-red-500">A</td><td className="text-red-500">A</td>
                                    <td className="text-red-500">A</td><td className="text-red-500">A</td><td className="text-red-500">A</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-left border-r dark:border-gray-700">Pérdida de calidad</td>
                                    <td className="text-gray-400">N</td><td className="text-orange-500">B</td><td className="text-orange-500">B</td><td className="text-yellow-500">M</td>
                                    <td className="text-red-500">A</td><td className="text-red-500">A</td><td className="text-red-500">A</td><td className="text-red-500">A</td>
                                    <td className="text-red-500">A</td><td className="text-red-500">A</td><td className="text-red-500">A</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-left border-r dark:border-gray-700">Pérdida de productividad</td>
                                    <td className="text-orange-500">B</td><td className="text-yellow-500">M</td><td className="text-red-500">A</td><td className="text-red-500">A</td>
                                    <td className="text-red-500">A</td><td className="text-red-500">A</td><td className="text-red-500">A</td><td className="text-red-500">A</td>
                                    <td className="text-red-500">A</td><td className="text-red-500">A</td><td className="text-red-500">A</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-left border-r dark:border-gray-700">Pérdida de control</td>
                                    <td className="text-yellow-500">M</td><td className="text-red-500">A</td><td className="text-red-500">A</td><td className="text-red-500">A</td>
                                    <td className="text-red-500">A</td><td className="text-red-500">A</td><td className="text-red-500">A</td><td className="text-red-500">A</td>
                                    <td className="text-red-500">A</td><td className="text-red-500">A</td><td className="text-red-500">A</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* MTPoD & RTO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* MTPoD */}
                <div className="p-6 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <Clock className="w-5 h-5 text-indigo-500" />
                        <h4 className="text-xs font-black uppercase text-gray-700 dark:text-gray-200 tracking-wider">1.1. Máximo periodo de interrupción tolerable (MTPoD / MAO)</h4>
                    </div>
                    <p className="text-[10px] text-gray-500 mb-4">Tiempo que tomaría para que los impactos adversos sean inaceptables.</p>

                    <div className="grid grid-cols-4 gap-2 text-[9px] font-bold text-center">
                        {['< 5 Min', '< 15 Min', '< 30 Min', '< 1 Hrs', '< 2 Hrs', '< 5 Hrs', '< 12 Hrs'].map(time => (
                            <div key={time} className="p-2 border rounded bg-gray-50 dark:bg-gray-800 text-gray-400 border-gray-200 dark:border-gray-700">{time}</div>
                        ))}
                        <div className="p-2 border-2 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded relative">
                            {'< 24 Hrs'}
                            <div className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[8px]">X</div>
                        </div>
                        {['< 48 Hrs', '< 120 Hrs', 'Tiempo Específico'].map(time => (
                            <div key={time} className="p-2 border rounded bg-gray-50 dark:bg-gray-800 text-gray-400 border-gray-200 dark:border-gray-700">{time}</div>
                        ))}
                    </div>
                </div>

                {/* RTO */}
                <div className="p-6 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <Activity className="w-5 h-5 text-indigo-500" />
                        <h4 className="text-xs font-black uppercase text-gray-700 dark:text-gray-200 tracking-wider">1.2. Objetivo de Tiempo de Recuperación (RTO)</h4>
                    </div>
                    <p className="text-[10px] text-gray-500 mb-4">Periodo de tiempo después de un incidente en el que se debe reanudar la actividad.</p>

                    <div className="grid grid-cols-4 gap-2 text-[9px] font-bold text-center">
                        {['< 5 Min', '< 15 Min', '< 30 Min'].map(time => (
                            <div key={time} className="p-2 border rounded bg-gray-50 dark:bg-gray-800 text-gray-400 border-gray-200 dark:border-gray-700">{time}</div>
                        ))}
                        {['< 1 Hrs', '< 2 Hrs'].map(time => (
                            <div key={time} className="p-2 border rounded bg-gray-50 dark:bg-gray-800 text-gray-400 border-gray-200 dark:border-gray-700">{time}</div>
                        ))}
                        <div className="p-2 border-2 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded relative">
                            {'< 5 Hrs'}
                            <div className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[8px]">X</div>
                        </div>
                        {['< 12 Hrs', '< 24 Hrs', '< 48 Hrs', '< 120 Hrs', 'Tiempo Específico'].map(time => (
                            <div key={time} className="p-2 border rounded bg-gray-50 dark:bg-gray-800 text-gray-400 border-gray-200 dark:border-gray-700">{time}</div>
                        ))}
                    </div>
                </div>
            </div>

            {/* MBCO */}
            <div className="p-6 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-4">
                <div className="flex items-center gap-3">
                    <CheckSquare className="w-5 h-5 text-green-600" />
                    <h3 className="text-xs font-black text-gray-700 dark:text-gray-200 uppercase tracking-widest">1.3. Objetivo de continuidad del negocio mínimo (MBCO)</h3>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl text-xs font-medium text-gray-700 dark:text-gray-300 italic shadow-sm">
                    <span className="font-black text-green-700 not-italic">Objetivo MBCO: </span>
                    Restablecer el acceso al portal web (<span className="font-bold">TAW_SW_03</span>) en modo "Solo Lectura" permitiendo el inicio de sesión seguro (<span className="font-bold">TAW_DAT_02</span>) y la visualización de contenidos previamente cacheados, aunque las funciones de calificación, nuevos registros y pagos permanezcan inhabilitadas temporalmente.
                </div>
            </div>

            {/* Activities & Strategies */}
            <div className="p-6 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-8">
                <div className="flex items-center gap-3 justify-center mb-4">
                    <Layers className="w-5 h-5 text-gray-400" />
                    <h3 className="text-sm font-black text-gray-700 dark:text-gray-200 uppercase tracking-widest">Actividades de Soporte y Continuidad</h3>
                </div>

                {/* 1.1 Actividades */}
                <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase text-gray-500 tracking-wider">1.1. Actividades que soportan la operación de este proceso</h4>
                    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                        <table className="w-full text-[10px] text-left">
                            <thead className="bg-gray-100 dark:bg-gray-800 font-black uppercase text-gray-700 dark:text-gray-200">
                                <tr>
                                    <th className="p-2 border-r dark:border-gray-700 text-center w-12">ID</th>
                                    <th className="p-2">Actividades que soportan el proceso</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-medium bg-white dark:bg-[#161b22]">
                                <tr><td className="p-2 text-center border-r font-bold">1</td><td className="p-2">Autenticación y validación de credenciales (Seguridad TAW_SEG_02)</td></tr>
                                <tr><td className="p-2 text-center border-r font-bold">2</td><td className="p-2">Despliegue de infraestructura cloud y balanceo de carga (Operaciones TAW_OP_01)</td></tr>
                                <tr><td className="p-2 text-center border-r font-bold">3</td><td className="p-2">Conexión y consultas a la Base de Datos de Usuarios (Gestión de Datos TAW_DAT_02)</td></tr>
                                <tr><td className="p-2 text-center border-r font-bold">4</td><td className="p-2">Streaming y renderizado de material educativo digital (Frontend TAW_SW_03)</td></tr>
                                <tr><td className="p-2 text-center border-r font-bold">5</td><td className="p-2">Monitoreo de logs de seguridad y alertas de intrusión (SOC)</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 1.2 Estrategias */}
                <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase text-gray-500 tracking-wider">1.2. Opciones actuales de continuidad operacional</h4>
                    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                        <table className="w-full text-[10px] text-left">
                            <thead className="bg-gray-100 dark:bg-gray-800 font-black uppercase text-gray-700 dark:text-gray-200">
                                <tr>
                                    <th className="p-2 border-r dark:border-gray-700 text-center w-12">ID</th>
                                    <th className="p-2 border-r dark:border-gray-700 w-1/4">Actividad</th>
                                    <th className="p-2">Estrategia(s) / mecanismo(s) de continuidad operacional actual</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-medium bg-white dark:bg-[#161b22]">
                                <tr>
                                    <td className="p-2 text-center border-r font-bold">1</td>
                                    <td className="p-2 border-r font-bold">Infraestructura Cloud</td>
                                    <td className="p-2 text-justify">Failover Multi-Zona: Configuración de Auto Scaling Groups en al menos dos zonas de disponibilidad (AZ) para mitigar fallas físicas del proveedor.</td>
                                </tr>
                                <tr>
                                    <td className="p-2 text-center border-r font-bold">2</td>
                                    <td className="p-2 border-r font-bold">Base de Datos</td>
                                    <td className="p-2 text-justify">Respaldos Automatizados y Réplica de Lectura: Snapshots horarios en S3 y una instancia de Read-Replica para promover a Master en caso de falla.</td>
                                </tr>
                                <tr>
                                    <td className="p-2 text-center border-r font-bold">3</td>
                                    <td className="p-2 border-r font-bold">Acceso Administrativo</td>
                                    <td className="p-2 text-justify">Acceso Remoto Seguro (VPN): Capacidad del personal de IT (TAW_PER_04) para operar la consola de administración desde ubicaciones remotas seguras.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 1.3 Interdependencias */}
                <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase text-gray-500 tracking-wider">1.3. Interdependencia con otros procesos y/o actividades</h4>
                    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                        <table className="w-full text-[10px] text-left">
                            <thead className="bg-gray-100 dark:bg-gray-800 font-black uppercase text-gray-700 dark:text-gray-200">
                                <tr>
                                    <th className="p-2 border-r dark:border-gray-700 text-center w-12">ID</th>
                                    <th className="p-2">Proceso / actividad</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-medium bg-white dark:bg-[#161b22]">
                                <tr>
                                    <td className="p-2 text-center border-r font-bold">1</td>
                                    <td className="p-2">Proveedor de Servicios Cloud (AWS/Azure): Estado de salud de la infraestructura física y red global.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

// Simple Icon component helper if Target is not imported or needed distinct
const TargetIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </svg>
)

export default GovernanceBIATactical;

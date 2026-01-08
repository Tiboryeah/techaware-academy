import React from 'react';
import { motion } from 'framer-motion';

const GovernanceInventory = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
        >
            <h2 className="text-3xl font-black tracking-tighter uppercase text-center mb-8">Inventario de Activos</h2>

            <div className="p-8 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-8">

                {/* Header Information */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 dark:border-gray-800 pb-6 gap-4">
                    <div className="space-y-1">
                        <h3 className="text-sm font-black text-indigo-600 uppercase tracking-widest">Inventario de Activos de Información</h3>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-right">
                            <span className="text-[10px] uppercase font-bold text-gray-400 block">Fecha de elaboración</span>
                            <div className="flex gap-2 font-mono text-sm font-bold bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg">
                                <span>05</span><span className="text-gray-400">/</span>
                                <span>01</span><span className="text-gray-400">/</span>
                                <span>26</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* General Info Box */}
                <div className="grid grid-cols-1 gap-4 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 text-xs">
                    <div className="flex flex-col md:flex-row gap-4 items-center border-b border-gray-200 dark:border-gray-700 pb-4">
                        <span className="font-black uppercase text-gray-500 w-full md:w-1/4 text-center md:text-left">Área:</span>
                        <div className="w-full md:w-3/4 font-bold text-gray-800 dark:text-gray-200 bg-white dark:bg-[#161b22] p-2 rounded border border-gray-200 dark:border-gray-700">
                            Servicios en la Nube
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <span className="font-black uppercase text-gray-500 w-full md:w-1/4 text-center md:text-left">Nombre del servicio o sistema:</span>
                        <div className="w-full md:w-3/4 font-bold text-indigo-600 bg-white dark:bg-[#161b22] p-2 rounded border border-gray-200 dark:border-gray-700 italic">
                            TechAware Kids – Aplicación Web Educativa
                        </div>
                    </div>
                </div>

                {/* Table 1: Relación de procesos */}
                <div className="space-y-4">
                    <h4 className="text-sm font-black uppercase text-gray-700 dark:text-gray-300 tracking-widest pl-2 border-l-4 border-indigo-500">Relación de procesos</h4>
                    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                        <table className="w-full text-left bg-white dark:bg-[#161b22]">
                            <thead className="bg-gray-100 dark:bg-gray-800 text-[10px] uppercase font-black text-gray-600 dark:text-gray-400 text-center">
                                <tr>
                                    <th className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 w-1/4">Elementos:</th>
                                    <th className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 w-1/4">Proceso 1</th>
                                    <th className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 w-1/4">Proceso 2</th>
                                    <th className="px-4 py-3 w-1/4">Proceso 3</th>
                                </tr>
                            </thead>
                            <tbody className="text-[10px] divide-y divide-gray-200 dark:divide-gray-700">
                                {/* ID Proceso */}
                                <tr>
                                    <td className="px-4 py-3 font-bold border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30">
                                        Identificación del Proceso "Id. Proceso"
                                    </td>
                                    <td className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 font-mono text-indigo-600 font-bold text-center">TAW_OP_01</td>
                                    <td className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 font-mono text-indigo-600 font-bold text-center">TAW_SEG_02</td>
                                    <td className="px-4 py-3 font-mono text-indigo-600 font-bold text-center">TAW_SOP_03</td>
                                </tr>
                                {/* Nombre */}
                                <tr>
                                    <td className="px-4 py-3 font-bold border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30">
                                        Nombre del Proceso
                                    </td>
                                    <td className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 italic">Operación del servicio en la nube</td>
                                    <td className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 italic">Seguridad de la información</td>
                                    <td className="px-4 py-3 italic">Soporte y mantenimiento</td>
                                </tr>
                                {/* Descripción */}
                                <tr>
                                    <td className="px-4 py-3 font-bold border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30">
                                        Descripción
                                    </td>
                                    <td className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 text-justify">Asegura la disponibilidad, desempeño y funcionamiento continuo de la aplicación web TechAware Kids.</td>
                                    <td className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 text-justify">Protege los datos personales y la información sensible mediante controles de acceso, respaldo y monitoreo.</td>
                                    <td className="px-4 py-3 text-justify">Atiende incidentes, fallas técnicas y mantenimiento del servicio en la nube.</td>
                                </tr>
                                {/* Actividades Críticas */}
                                <tr>
                                    <td className="px-4 py-3 font-bold border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30">
                                        Actividades críticas
                                    </td>
                                    <td className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 align-top">
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>Monitoreo continuo del servicio en la nube</li>
                                            <li>Administración de recursos de cómputo y almacenamiento</li>
                                            <li>Verificación de la disponibilidad del servicio</li>
                                        </ul>
                                    </td>
                                    <td className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 align-top">
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>Gestión de accesos y permisos</li>
                                            <li>Respaldo y recuperación de información</li>
                                            <li>Monitoreo de incidentes de seguridad</li>
                                        </ul>
                                    </td>
                                    <td className="px-4 py-3 align-top">
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>Atención y registro de incidentes</li>
                                            <li>Mantenimiento preventivo y correctivo</li>
                                            <li>Actualización del sistema y componentes</li>
                                        </ul>
                                    </td>
                                </tr>
                                {/* Factores de Éxito */}
                                <tr>
                                    <td className="px-4 py-3 font-bold border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30">
                                        Factores de éxito
                                    </td>
                                    <td className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 align-top">
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>Alta disponibilidad del servicio</li>
                                            <li>Uso eficiente de recursos tecnológicos</li>
                                            <li>Respuesta oportuna ante fallas operativas</li>
                                        </ul>
                                    </td>
                                    <td className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 align-top">
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>Protección de la confidencialidad de la información</li>
                                            <li>Integridad y disponibilidad de los datos</li>
                                            <li>Cumplimiento de normas de seguridad</li>
                                        </ul>
                                    </td>
                                    <td className="px-4 py-3 align-top">
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>Reducción del tiempo de respuesta</li>
                                            <li>Continuidad del servicio</li>
                                            <li>Satisfacción de los usuarios internos</li>
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Table 2: Relación de activos de información */}
                <div className="space-y-4 pt-4">
                    <h4 className="text-sm font-black uppercase text-gray-700 dark:text-gray-300 tracking-widest pl-2 border-l-4 border-yellow-500">
                        Relación de <span className="bg-yellow-200 dark:bg-yellow-900/40 px-1 rounded text-yellow-800 dark:text-yellow-200">activos de información</span> de Infraestructura por proceso.
                    </h4>
                    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                        <table className="w-full text-left bg-white dark:bg-[#161b22]">
                            <thead className="bg-gray-100 dark:bg-gray-800 text-[10px] uppercase font-black text-gray-600 dark:text-gray-400 align-top">
                                <tr>
                                    <th className="px-4 py-3 border-r border-gray-200 dark:border-gray-700">Id. Proceso</th>
                                    <th className="px-4 py-3 border-r border-gray-200 dark:border-gray-700">Id. Activo</th>
                                    <th className="px-4 py-3 border-r border-gray-200 dark:border-gray-700">Activo de Información</th>
                                    <th className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 w-1/5">Descripción</th>
                                    <th className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 text-center">Clasificación<br /><span className="text-[8px] font-normal lowercase">(critico/no critico)</span></th>
                                    <th className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 text-center">Relación con otros activos<br /><span className="text-[8px] font-normal lowercase">(SI/No)</span></th>
                                    <th className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 break-words w-24">Especificar Id. del activo al cual esta relacionado</th>
                                    <th className="px-4 py-3">Nombre del Responsable</th>
                                </tr>
                            </thead>
                            <tbody className="text-[10px] divide-y divide-gray-200 dark:divide-gray-700">
                                {/* TAW_OP_01 Group */}
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/10">
                                    <td className="px-4 py-3 font-mono font-bold text-gray-400 align-top" rowSpan="3">TAW_OP_01</td>
                                    <td className="px-4 py-3 font-mono font-bold text-indigo-500">TAW_INF_01</td>
                                    <td className="px-4 py-3 font-bold">Infraestructura en la nube</td>
                                    <td className="px-4 py-3 text-gray-500">Servidores virtuales que alojan la aplicación web</td>
                                    <td className="px-4 py-3 text-center italic">SI</td>
                                    <td className="px-4 py-3 text-center italic">SI</td>
                                    <td className="px-4 py-3 font-mono text-gray-500 text-center">TAW_DAT_02</td>
                                    <td className="px-4 py-3 font-medium">Martinez López Gerardo Esteban</td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/10">
                                    <td className="px-4 py-3 font-mono font-bold text-indigo-500">TAW_SW_03</td>
                                    <td className="px-4 py-3 font-bold">Plataforma web</td>
                                    <td className="px-4 py-3 text-gray-500">Código y funcionalidades de TechAware Kids</td>
                                    <td className="px-4 py-3 text-center italic">SI</td>
                                    <td className="px-4 py-3 text-center italic">SI</td>
                                    <td className="px-4 py-3 font-mono text-gray-500 text-center">TAW_INF_01</td>
                                    <td className="px-4 py-3 font-medium">Martinez López Gerardo Esteban</td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/10 border-b-2 border-gray-200 dark:border-gray-700">
                                    <td className="px-4 py-3 font-mono font-bold text-indigo-500">TAW_MON_01</td>
                                    <td className="px-4 py-3 font-bold">Sistema de monitoreo del servicio</td>
                                    <td className="px-4 py-3 text-gray-500">Monitoreo del desempeño y disponibilidad del servicio en la nube</td>
                                    <td className="px-4 py-3 text-center italic">NO</td>
                                    <td className="px-4 py-3 text-center italic">SI</td>
                                    <td className="px-4 py-3 font-mono text-gray-500 text-center">TAW_INF_01</td>
                                    <td className="px-4 py-3 font-medium">Martinez López Gerardo Esteban</td>
                                </tr>

                                {/* TAW_SEG_02 Group */}
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/10">
                                    <td className="px-4 py-3 font-mono font-bold text-gray-400 align-top" rowSpan="3">TAW_SEG_02</td>
                                    <td className="px-4 py-3 font-mono font-bold text-indigo-500">TAW_DAT_02</td>
                                    <td className="px-4 py-3 font-bold">Base de datos de usuarios</td>
                                    <td className="px-4 py-3 text-gray-500">Información de cuentas y uso de la plataforma</td>
                                    <td className="px-4 py-3 text-center italic">SI</td>
                                    <td className="px-4 py-3 text-center italic">SI</td>
                                    <td className="px-4 py-3 font-mono text-gray-500 text-center">TAW_INF_01</td>
                                    <td className="px-4 py-3 font-medium">Rugerio Arceo Juan Alberto</td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/10">
                                    <td className="px-4 py-3 font-mono font-bold text-indigo-500">TAW_SW_03</td>
                                    <td className="px-4 py-3 font-bold">Plataforma web</td>
                                    <td className="px-4 py-3 text-gray-500">Código y funcionalidades de TechAware Kids</td>
                                    <td className="px-4 py-3 text-center italic">SI</td>
                                    <td className="px-4 py-3 text-center italic">SI</td>
                                    <td className="px-4 py-3 font-mono text-gray-500 text-center">TAW_INF_01</td>
                                    <td className="px-4 py-3 font-medium">Rugerio Arceo Juan Alberto</td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/10 border-b-2 border-gray-200 dark:border-gray-700">
                                    <td className="px-4 py-3 font-mono font-bold text-indigo-500">TAW_ACC_02</td>
                                    <td className="px-4 py-3 font-bold">Sistema de control de accesos</td>
                                    <td className="px-4 py-3 text-gray-500">Gestión de usuarios y permisos del sistema</td>
                                    <td className="px-4 py-3 text-center italic">SI</td>
                                    <td className="px-4 py-3 text-center italic">SI</td>
                                    <td className="px-4 py-3 font-mono text-gray-500 text-center">TAW_DAT_02</td>
                                    <td className="px-4 py-3 font-medium">Rugerio Arceo Juan Alberto</td>
                                </tr>

                                {/* TAW_SOP_03 Group */}
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/10">
                                    <td className="px-4 py-3 font-mono font-bold text-gray-400 align-top" rowSpan="3">TAW_SOP_03</td>
                                    <td className="px-4 py-3 font-mono font-bold text-indigo-500">TAW_PER_04</td>
                                    <td className="px-4 py-3 font-bold">Personal de IT</td>
                                    <td className="px-4 py-3 text-gray-500">Personal encargado de operación y soporte</td>
                                    <td className="px-4 py-3 text-center italic">NO</td>
                                    <td className="px-4 py-3 text-center italic">NO</td>
                                    <td className="px-4 py-3 font-mono text-gray-500 text-center"></td>
                                    <td className="px-4 py-3 font-medium">Sánchez Calderón Estefany Karina</td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/10">
                                    <td className="px-4 py-3 font-mono font-bold text-indigo-500">TAW_DOC_05</td>
                                    <td className="px-4 py-3 font-bold">Documentación técnica</td>
                                    <td className="px-4 py-3 text-gray-500">Manuales y procedimientos del servicio</td>
                                    <td className="px-4 py-3 text-center italic">NO</td>
                                    <td className="px-4 py-3 text-center italic">NO</td>
                                    <td className="px-4 py-3 font-mono text-gray-500 text-center"></td>
                                    <td className="px-4 py-3 font-medium">Sánchez Calderón Estefany Karina</td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/10">
                                    <td className="px-4 py-3 font-mono font-bold text-indigo-500">TAW_TOOL_03</td>
                                    <td className="px-4 py-3 font-bold">Herramienta de gestión de Incidentes</td>
                                    <td className="px-4 py-3 text-gray-500">Registro y seguimiento de Incidentes del</td>
                                    <td className="px-4 py-3 text-center italic">NO</td>
                                    <td className="px-4 py-3 text-center italic">NO</td>
                                    <td className="px-4 py-3 font-mono text-gray-500 text-center"></td>
                                    <td className="px-4 py-3 font-medium">Sánchez Calderón Estefany Karina</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default GovernanceInventory;

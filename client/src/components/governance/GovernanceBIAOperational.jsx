import React from 'react';
import { motion } from 'framer-motion';
import { Users, HardDrive, Building, Server, Cpu, FileText, Truck, DollarSign, Briefcase } from 'lucide-react';

const GovernanceBIAOperational = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 pb-12 pt-8 border-t border-gray-200 dark:border-gray-800"
        >
            <h2 className="text-3xl font-black tracking-tighter uppercase text-center mb-8">Análisis de Impacto al Negocio Operacional</h2>

            {/* 1. INTRODUCCIÓN Y 2. OBJETIVO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600">
                            <FileText className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm font-black text-gray-700 dark:text-gray-200 uppercase tracking-widest">1. Introducción</h3>
                    </div>
                    <p className="text-xs text-justify text-gray-600 dark:text-gray-300 leading-relaxed">
                        El Análisis de Impacto al Negocio (BIA) es el proceso de analizar actividades y el efecto que una interrupción del negocio pudiera tener en ellas.
                        <br /><br />
                        En conformidad con ISO 22301:2012, la Gerencia de Tecnología de TechAware Kids, a través del área de Operaciones y Seguridad, ha establecido, implementado y mantiene un proceso de evaluación para determinar prioridades de continuidad y recuperación de los recursos que soportan la plataforma educativa.
                    </p>
                </div>

                <div className="p-8 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600">
                            <Users className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm font-black text-gray-700 dark:text-gray-200 uppercase tracking-widest">2. Objetivo</h3>
                    </div>
                    <p className="text-xs text-justify text-gray-600 dark:text-gray-300 leading-relaxed">
                        Identificar, clasificar y priorizar los recursos operativos (personal, información, infraestructura y proveedores) necesarios para ejecutar las estrategias de recuperación definidas en el BIA Táctico, garantizando la disponibilidad del servicio educativo y la integridad de los datos de los menores conforme a las metas corporativas.
                    </p>
                </div>
            </div>

            {/* 3. PROCEDIMIENTO */}
            <div className="p-8 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-8">
                <div className="flex items-center gap-3 justify-center mb-4">
                    <h3 className="text-xl font-black text-gray-700 dark:text-gray-200 uppercase tracking-widest">3. Procedimiento</h3>
                </div>

                {/* 3.1 Identificación del grupo de Servicios */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h4 className="text-xs font-black uppercase text-gray-500 mb-4 tracking-wider">3.1. Identificación de grupo de Servicios.</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-xs">
                        <div className="flex flex-col">
                            <span className="font-bold text-gray-500 uppercase text-[10px]">Grupo de Productos y Servicios</span>
                            <span className="font-bold text-lg text-indigo-600">Plataforma Educativa SaaS / Servicio Premium</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-gray-500 uppercase text-[10px]">Responsable (Área/Función)</span>
                            <span className="font-medium">Dirección de Tecnología / CISO</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-gray-500 uppercase text-[10px]">Nombre del responsable</span>
                            <span className="font-medium">Martínez López Gerardo Esteban</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-gray-500 uppercase text-[10px]">Fecha de llenado</span>
                            <span className="font-medium">5 de enero 2026</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <h4 className="text-xs font-medium text-gray-500">1.1. Identificación de los recursos críticos y sus prioridades (1 indica la mayor prioridad y 3 la menor prioridad).</h4>
                </div>

                {/* TABLE: PERSONAL / GENTE */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <h4 className="text-xs font-black uppercase text-gray-700 dark:text-gray-200 tracking-wider">Personal / Gente</h4>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                        <table className="w-full text-[10px]">
                            <thead className="bg-gray-100 dark:bg-gray-800 font-black uppercase text-gray-700 dark:text-gray-200">
                                <tr>
                                    <th className="p-3 text-left w-1/3">Recurso de personal / gente</th>
                                    <th className="p-3 text-left w-1/3">Descripción</th>
                                    <th className="p-3 text-center border-l dark:border-gray-700 w-12">1</th>
                                    <th className="p-3 text-center border-l dark:border-gray-700 w-12">2</th>
                                    <th className="p-3 text-center border-l dark:border-gray-700 w-12">3</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-medium bg-white dark:bg-[#161b22]">
                                <tr>
                                    <td className="p-3">Administrador de Cloud / DevOps</td>
                                    <td className="p-3 text-gray-500">Responsable de la restauración de la infraestructura (TAW_INF_01) y ejecución del DRP.</td>
                                    <td className="p-3 text-center font-bold border-l dark:border-gray-700 text-indigo-600">X</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                </tr>
                                <tr>
                                    <td className="p-3">Administrador de Base de Datos (DBA)</td>
                                    <td className="p-3 text-gray-500">Encargado de la recuperación de la integridad de los datos de usuarios (TAW_DAT_02).</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                    <td className="p-3 text-center font-bold border-l dark:border-gray-700 text-indigo-600">X</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                </tr>
                                <tr>
                                    <td className="p-3">Soporte Técnico Nivel 2</td>
                                    <td className="p-3 text-gray-500">Personal de enlace para comunicación de incidentes a usuarios afectados y resolución de tickets.</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                    <td className="p-3 text-center font-bold border-l dark:border-gray-700 text-indigo-600">X</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* TABLE: INFORMACIÓN Y DATOS */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <HardDrive className="w-4 h-4 text-gray-500" />
                        <h4 className="text-xs font-black uppercase text-gray-700 dark:text-gray-200 tracking-wider">Información y Datos</h4>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                        <table className="w-full text-[10px]">
                            <thead className="bg-gray-100 dark:bg-gray-800 font-black uppercase text-gray-700 dark:text-gray-200">
                                <tr>
                                    <th className="p-3 text-left w-1/3">Información</th>
                                    <th className="p-3 text-left w-1/3">Formato (Electrónico, papel, etc.)</th>
                                    <th className="p-3 text-center border-l dark:border-gray-700 w-12">1</th>
                                    <th className="p-3 text-center border-l dark:border-gray-700 w-12">2</th>
                                    <th className="p-3 text-center border-l dark:border-gray-700 w-12">3</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-medium bg-white dark:bg-[#161b22]">
                                <tr>
                                    <td className="p-3">Administrador de Cloud / DevOps</td>
                                    <td className="p-3 text-gray-500">Responsable de la restauración de la infraestructura (TAW_INF_01) y ejecución del DRP.</td>
                                    <td className="p-3 text-center font-bold border-l dark:border-gray-700 text-indigo-600">X</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                </tr>
                                <tr>
                                    <td className="p-3">Administrador de Base de Datos (DBA)</td>
                                    <td className="p-3 text-gray-500">Encargado de la recuperación de la integridad de los datos de usuarios (TAW_DAT_02).</td>
                                    <td className="p-3 text-center font-bold border-l dark:border-gray-700 text-indigo-600">X</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                </tr>
                                <tr>
                                    <td className="p-3">Soporte Técnico Nivel 2</td>
                                    <td className="p-3 text-gray-500">Personal de enlace para comunicación de incidentes a usuarios afectados y resolución de tickets.</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                    <td className="p-3 text-center font-bold border-l dark:border-gray-700 text-indigo-600">X</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                </tr>
                                <tr>
                                    <td className="p-3">Desarrollador Full-Stack</td>
                                    <td className="p-3 text-gray-500">Personal para corrección de código (bugs) críticos en la plataforma web (TAW_SW_03).</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                    <td className="p-3 text-center font-bold border-l dark:border-gray-700 text-indigo-600">X</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl border border-yellow-200 dark:border-yellow-800 text-[10px] text-justify text-gray-600 dark:text-gray-300">
                    <span className="font-bold block mb-1">Identificación de punto de recuperación objetivo (RPO).</span>
                    (Punto en el que la información utilizada por una actividad debe ser reanudada para permitir que la actividad se pueda recuperar). (Desde otro punto de vista, la cantidad máxima de información que está dispuesto a perder en caso de una interrupción, esta información ayudará a la definición de las estrategias de respaldo).
                </div>

                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-xs text-center font-medium italic text-gray-500">
                    No se cuenta con aplicaciones que requieran respaldo y que en un determinado momento pudieran impactar en el Servicio.
                </div>

                {/* TABLE: EDIFICIOS Y AMBIENTE */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-500" />
                        <h4 className="text-xs font-black uppercase text-gray-700 dark:text-gray-200 tracking-wider">Edificios y Ambiente de Trabajo</h4>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                        <table className="w-full text-[10px]">
                            <thead className="bg-gray-100 dark:bg-gray-800 font-black uppercase text-gray-700 dark:text-gray-200">
                                <tr>
                                    <th className="p-3 text-left w-1/3">Edificios / Ambiente de trabajo</th>
                                    <th className="p-3 text-left w-1/3">Descripción</th>
                                    <th className="p-3 text-center border-l dark:border-gray-700 w-12">1</th>
                                    <th className="p-3 text-center border-l dark:border-gray-700 w-12">2</th>
                                    <th className="p-3 text-center border-l dark:border-gray-700 w-12">3</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-medium bg-white dark:bg-[#161b22]">
                                <tr>
                                    <td className="p-3">Acceso Remoto Seguro (VPN)</td>
                                    <td className="p-3 text-gray-500">Capacidad de conexión segura para administración remota de la infraestructura.</td>
                                    <td className="p-3 text-center font-bold border-l dark:border-gray-700 text-indigo-600">X</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                </tr>
                                <tr>
                                    <td className="p-3">Oficinas Administrativas</td>
                                    <td className="p-3 text-gray-500">Espacio físico para labores de finanzas y RRHH (no operativas críticas).</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                    <td className="p-3 text-center font-bold border-l dark:border-gray-700 text-indigo-600">X</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* TABLE: INSTALACIONES, MOBILIARIO... */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Server className="w-4 h-4 text-gray-500" />
                        <h4 className="text-xs font-black uppercase text-gray-700 dark:text-gray-200 tracking-wider">Instalaciones, Mobiliario, Equipamiento y Consumibles</h4>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                        <table className="w-full text-[10px]">
                            <thead className="bg-gray-100 dark:bg-gray-800 font-black uppercase text-gray-700 dark:text-gray-200">
                                <tr>
                                    <th className="p-3 text-left w-1/3">Instalaciones / Mobiliario / equipamiento / consumible</th>
                                    <th className="p-3 text-left w-1/3">Descripción</th>
                                    <th className="p-3 text-center border-l dark:border-gray-700 w-12">1</th>
                                    <th className="p-3 text-center border-l dark:border-gray-700 w-12">2</th>
                                    <th className="p-3 text-center border-l dark:border-gray-700 w-12">3</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-medium bg-white dark:bg-[#161b22]">
                                <tr>
                                    <td colSpan="5" className="px-3 py-1 bg-gray-50 dark:bg-gray-800 font-bold text-[9px] uppercase tracking-wide text-gray-500">- Instalaciones:</td>
                                </tr>
                                <tr>
                                    <td className="p-3">Centro de Datos (Cloud)</td>
                                    <td className="p-3 text-gray-500">Infraestructura física gestionada por el proveedor (AWS/Azure).</td>
                                    <td className="p-3 text-center font-bold border-l dark:border-gray-700 text-indigo-600">X</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                </tr>
                                <tr>
                                    <td colSpan="5" className="px-3 py-1 bg-gray-50 dark:bg-gray-800 font-bold text-[9px] uppercase tracking-wide text-gray-500">- Equipamiento:</td>
                                </tr>
                                <tr>
                                    <td className="p-3">Laptops de Administradores</td>
                                    <td className="p-3 text-gray-500">Equipos de cómputo con certificados de seguridad para acceso a consola.</td>
                                    <td className="p-3 text-center font-bold border-l dark:border-gray-700 text-indigo-600">X</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                </tr>
                                <tr>
                                    <td className="p-3">Tokens MFA (Hardware)</td>
                                    <td className="p-3 text-gray-500">Dispositivos físicos (YubiKey) para autenticación de doble factor.</td>
                                    <td className="p-3 text-center font-bold border-l dark:border-gray-700 text-indigo-600">X</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* TABLE: SISTEMAS DE INFORMACIÓN */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-gray-500" />
                        <h4 className="text-xs font-black uppercase text-gray-700 dark:text-gray-200 tracking-wider">Sistemas de Información y Comunicaciones</h4>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                        <table className="w-full text-[10px]">
                            <thead className="bg-gray-100 dark:bg-gray-800 font-black uppercase text-gray-700 dark:text-gray-200">
                                <tr>
                                    <th className="p-3 text-left w-1/3">Sistema o componente de TIC</th>
                                    <th className="p-3 text-left w-1/3">Descripción</th>
                                    <th className="p-3 text-center border-l dark:border-gray-700 w-12">1</th>
                                    <th className="p-3 text-center border-l dark:border-gray-700 w-12">2</th>
                                    <th className="p-3 text-center border-l dark:border-gray-700 w-12">3</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-medium bg-white dark:bg-[#161b22]">
                                <tr>
                                    <td className="p-3">Infraestructura Cloud (TAW_INF_01)</td>
                                    <td className="p-3 text-gray-500">Servidores, redes y balanceadores que soportan el servicio.</td>
                                    <td className="p-3 text-center font-bold border-l dark:border-gray-700 text-indigo-600">X</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                </tr>
                                <tr>
                                    <td className="p-3">Plataforma Web (TAW_SW_03)</td>
                                    <td className="p-3 text-gray-500">Portal de acceso y consumo de contenido para usuarios finales.</td>
                                    <td className="p-3 text-center font-bold border-l dark:border-gray-700 text-indigo-600">X</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                </tr>
                                <tr>
                                    <td className="p-3">Repositorio de Código (Git)</td>
                                    <td className="p-3 text-gray-500">Sistema de control de versiones para despliegues.</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                    <td className="p-3 text-center font-bold border-l dark:border-gray-700 text-indigo-600">X</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                </tr>
                                <tr>
                                    <td className="p-3">Sistema de Correo/Chats</td>
                                    <td className="p-3 text-gray-500">Herramientas de coordinación interna (Slack/Teams).</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                    <td className="p-3 text-center font-bold border-l dark:border-gray-700 text-indigo-600">X</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* TABLE: TRANSPORTACIÓN */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-gray-500" />
                        <h4 className="text-xs font-black uppercase text-gray-700 dark:text-gray-200 tracking-wider">Transportación</h4>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                        <table className="w-full text-[10px]">
                            <thead className="bg-gray-100 dark:bg-gray-800 font-black uppercase text-gray-700 dark:text-gray-200">
                                <tr>
                                    <th className="p-3 text-left w-1/3">Transporte</th>
                                    <th className="p-3 text-left w-1/3">Descripción</th>
                                    <th className="p-3 text-center border-l dark:border-gray-700 w-12">1</th>
                                    <th className="p-3 text-center border-l dark:border-gray-700 w-12">2</th>
                                    <th className="p-3 text-center border-l dark:border-gray-700 w-12">3</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-medium bg-white dark:bg-[#161b22]">
                                <tr>
                                    <td className="p-3">Servicio de transporte privado</td>
                                    <td className="p-3 text-gray-500">Requerido solo si el personal crítico debe trasladarse a un sitio alterno por falla de red doméstica.</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                    <td className="p-3 text-center font-bold border-l dark:border-gray-700 text-indigo-600">X</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* TABLE: FINANZAS */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <h4 className="text-xs font-black uppercase text-gray-700 dark:text-gray-200 tracking-wider">Finanzas</h4>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                        <table className="w-full text-[10px]">
                            <thead className="bg-gray-100 dark:bg-gray-800 font-black uppercase text-gray-700 dark:text-gray-200">
                                <tr>
                                    <th className="p-3 text-left w-1/3">Recurso Financiero</th>
                                    <th className="p-3 text-left w-1/3">Descripción</th>
                                    <th className="p-3 text-center border-l dark:border-gray-700 w-12">1</th>
                                    <th className="p-3 text-center border-l dark:border-gray-700 w-12">2</th>
                                    <th className="p-3 text-center border-l dark:border-gray-700 w-12">3</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-medium bg-white dark:bg-[#161b22]">
                                <tr>
                                    <td className="p-3">Fondo de Emergencia</td>
                                    <td className="p-3 text-gray-500">Presupuesto para contratación inmediata de recursos extra en nube.</td>
                                    <td className="p-3 text-center font-bold border-l dark:border-gray-700 text-indigo-600">X</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                </tr>
                                <tr>
                                    <td className="p-3">Nómina y Proveedores</td>
                                    <td className="p-3 text-gray-500">Cuentas bancarias para pagos regulares.</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                    <td className="p-3 text-center font-bold border-l dark:border-gray-700 text-indigo-600">X</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* TABLE: PROVEEDORES */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-gray-500" />
                        <h4 className="text-xs font-black uppercase text-gray-700 dark:text-gray-200 tracking-wider">Proveedores y Socios de Negocio</h4>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                        <table className="w-full text-[10px]">
                            <thead className="bg-gray-100 dark:bg-gray-800 font-black uppercase text-gray-700 dark:text-gray-200">
                                <tr>
                                    <th className="p-3 text-left w-1/3">Proveedor / socio de negocio</th>
                                    <th className="p-3 text-left w-1/3">Descripción</th>
                                    <th className="p-3 text-center border-l dark:border-gray-700 w-12">1</th>
                                    <th className="p-3 text-center border-l dark:border-gray-700 w-12">2</th>
                                    <th className="p-3 text-center border-l dark:border-gray-700 w-12">3</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-medium bg-white dark:bg-[#161b22]">
                                <tr>
                                    <td className="p-3">Proveedor Cloud (AWS/Azure)</td>
                                    <td className="p-3 text-gray-500">Socio estratégico de IaaS (Infraestructura como Servicio).</td>
                                    <td className="p-3 text-center font-bold border-l dark:border-gray-700 text-indigo-600">X</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                </tr>
                                <tr>
                                    <td className="p-3">Proveedor de Seguridad (WAF)</td>
                                    <td className="p-3 text-gray-500">Servicio de protección perimetral y mitigación DDoS.</td>
                                    <td className="p-3 text-center font-bold border-l dark:border-gray-700 text-indigo-600">X</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                </tr>
                                <tr>
                                    <td className="p-3">Pasarela de Pagos</td>
                                    <td className="p-3 text-gray-500">Socio para el procesamiento de cobros.</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                    <td className="p-3 text-center font-bold border-l dark:border-gray-700 text-indigo-600">X</td>
                                    <td className="p-3 text-center border-l dark:border-gray-700"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default GovernanceBIAOperational;

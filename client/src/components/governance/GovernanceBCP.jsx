import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ShieldCheck, Target, Users, Server, Database, Lock, Globe, RefreshCw, FileText, Bell, Play, ShieldAlert, CheckCircle, AlertTriangle, Code, Wrench, RotateCcw } from 'lucide-react';

const GovernanceBCP = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
        >
            {/* Header */}
            <div className="text-center space-y-4 pb-8 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-4xl font-black tracking-tighter uppercase text-gray-900 dark:text-white">
                    Plan de Continuidad del Negocio (BCP)
                </h2>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                        Proyecto: TechAware Kids
                    </span>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Alineado a ISO 22301 y COBIT 2019 (DSS04)
                    </span>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-[10px] font-mono text-gray-500">
                        <span>Fecha de actualización:</span>
                        <span className="font-bold text-gray-700 dark:text-gray-300">7 de enero de 2026</span>
                    </div>
                </div>
            </div>

            {/* 1. Introducción y Alcance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-8 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                            <Target className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-black text-gray-800 dark:text-gray-200 uppercase tracking-wide">
                            1.1. Propósito
                        </h3>
                    </div>
                    <p className="text-sm text-justify text-gray-600 dark:text-gray-300 leading-relaxed">
                        El presente Plan de Continuidad del Negocio (BCP) establece los procedimientos, roles y recursos necesarios para garantizar la resiliencia operativa de la plataforma <strong className="text-indigo-600 dark:text-indigo-400">TechAware Kids</strong>.
                        <br /><br />
                        Su objetivo principal es asegurar la recuperación de los procesos críticos en un tiempo no mayor al <strong className="text-gray-900 dark:text-white">RTO (Objetivo de Tiempo de Recuperación) de 4 horas</strong> y una pérdida de datos no mayor al <strong className="text-gray-900 dark:text-white">RPO (Objetivo de Punto de Recuperación) de 1 hora</strong>, minimizando el impacto financiero, legal y reputacional ante eventos disruptivos.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* 1.2 Marco de Referencia */}
                    <div className="p-8 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <BookOpen className="w-5 h-5 text-gray-400" />
                            <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest">
                                1.2. Marco de Referencia
                            </h3>
                        </div>
                        <ul className="space-y-3 text-xs text-gray-600 dark:text-gray-300">
                            <li className="flex gap-3 items-start">
                                <ShieldCheck className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>
                                    <strong className="block text-gray-800 dark:text-gray-200">ISO 22301:2019</strong>
                                    Seguridad y resiliencia - Sistemas de gestión de la continuidad del negocio.
                                </span>
                            </li>
                            <li className="flex gap-3 items-start">
                                <ShieldCheck className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>
                                    <strong className="block text-gray-800 dark:text-gray-200">COBIT 2019 (Dominio DSS04)</strong>
                                    Gestionar la continuidad, asegurando que TI pueda mantener la resiliencia empresarial.
                                </span>
                            </li>
                            <li className="flex gap-3 items-start">
                                <ShieldCheck className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>
                                    <strong className="block text-gray-800 dark:text-gray-200">ISO/IEC 27001</strong>
                                    Controles de seguridad de la información para la continuidad (A.17).
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* 1.3 Alcance */}
                    <div className="p-8 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Globe className="w-5 h-5 text-gray-400" />
                            <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest">
                                1.3. Alcance
                            </h3>
                        </div>
                        <div className="space-y-2 text-xs">
                            <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                <Database className="w-4 h-4 text-indigo-500" />
                                <span className="font-mono font-bold text-gray-700 dark:text-gray-200">TAW_DAT_02</span>
                                <span className="text-gray-500">Base de Datos de Usuarios</span>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                <Server className="w-4 h-4 text-indigo-500" />
                                <span className="font-mono font-bold text-gray-700 dark:text-gray-200">TAW_INF_01</span>
                                <span className="text-gray-500">Infraestructura en la Nube</span>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                <Globe className="w-4 h-4 text-indigo-500" />
                                <span className="font-mono font-bold text-gray-700 dark:text-gray-200">TAW_SW_03</span>
                                <span className="text-gray-500">Plataforma Web</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Estructura de Respuesta a Incidentes */}
            <div className="p-8 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-800 pb-4">
                    <Users className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                    <h3 className="text-xl font-black text-gray-800 dark:text-gray-200 uppercase tracking-wide">
                        2. Estructura de Respuesta a Incidentes (Gobierno)
                    </h3>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-black uppercase tracking-wider text-xs">
                            <tr>
                                <th className="p-4 w-1/4">Rol (techblue)</th>
                                <th className="p-4 w-1/4">Cargo</th>
                                <th className="p-4 w-1/2">Responsabilidad</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-[#0d1117]">
                            <tr>
                                <td className="p-4 font-bold text-yellow-600 dark:text-yellow-500 border-r dark:border-gray-700">
                                    Líder del Comité de Crisis (Gold)
                                </td>
                                <td className="p-4 font-medium text-gray-600 dark:text-gray-300 border-r dark:border-gray-700">
                                    CISO / Director de TI
                                </td>
                                <td className="p-4 text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                                    Toma la decisión de invocar el BCP y autoriza gastos de emergencia.
                                </td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold text-gray-500 border-r dark:border-gray-700">
                                    Coordinador de Recuperación (Silver)
                                </td>
                                <td className="p-4 font-medium text-gray-600 dark:text-gray-300 border-r dark:border-gray-700">
                                    Gerente de Operaciones
                                </td>
                                <td className="p-4 text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                                    Coordina la ejecución técnica del DRP y asigna recursos.
                                </td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold text-amber-700 dark:text-amber-600 border-r dark:border-gray-700">
                                    Equipo Técnico (Bronze)
                                </td>
                                <td className="p-4 font-medium text-gray-600 dark:text-gray-300 border-r dark:border-gray-700">
                                    Admin Cloud / DBA
                                </td>
                                <td className="p-4 text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                                    Ejecuta los scripts de recuperación y restauración de backups.
                                </td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold text-blue-600 dark:text-blue-400 border-r dark:border-gray-700">
                                    Comunicación
                                </td>
                                <td className="p-4 font-medium text-gray-600 dark:text-gray-300 border-r dark:border-gray-700">
                                    Soporte Nivel 2
                                </td>
                                <td className="p-4 text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                                    Informa a los usuarios (padres/tutores) sobre el estado del servicio.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 3. Estrategias de Continuidad */}
            <div className="p-8 bg-gradient-to-br from-gray-50 to-white dark:from-[#161b22] dark:to-[#0d1117] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-8">
                <div className="flex items-center gap-3 justify-center mb-6">
                    <RefreshCw className="w-6 h-6 text-indigo-500" />
                    <h3 className="text-xl font-black text-gray-800 dark:text-gray-200 uppercase tracking-wide">
                        3. Estrategias de Continuidad (Resiliencia)
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* 3.1 Datos */}
                    <div className="bg-white dark:bg-[#161b22] p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Database className="w-24 h-24 text-indigo-600" />
                        </div>
                        <h4 className="flex items-center gap-2 text-sm font-black uppercase text-gray-700 dark:text-gray-200 mb-4 z-10 relative">
                            <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded">3.1</span>
                            Estrategia de Datos
                            <span className="ml-auto text-[10px] bg-red-100 dark:bg-red-900/30 text-red-600 px-2 py-0.5 rounded-full">RPO &lt; 1 hora</span>
                        </h4>
                        <ul className="space-y-4 text-xs z-10 relative">
                            <li className="flex gap-3">
                                <span className="p-1 rounded bg-gray-100 dark:bg-gray-800 text-indigo-600 shrink-0 h-fit mt-0.5">
                                    <RefreshCw className="w-3 h-3" />
                                </span>
                                <div>
                                    <strong className="block text-gray-900 dark:text-white mb-1">Respaldos</strong>
                                    <span className="text-gray-500">Snapshots automatizados de PostgreSQL cada hora almacenados en AWS S3 (Inmutables).</span>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="p-1 rounded bg-gray-100 dark:bg-gray-800 text-indigo-600 shrink-0 h-fit mt-0.5">
                                    <Lock className="w-3 h-3" />
                                </span>
                                <div>
                                    <strong className="block text-gray-900 dark:text-white mb-1">Cifrado</strong>
                                    <span className="text-gray-500">Todas las copias de seguridad están cifradas con AES-256.</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* 3.2 Infraestructura */}
                    <div className="bg-white dark:bg-[#161b22] p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Server className="w-24 h-24 text-emerald-600" />
                        </div>
                        <h4 className="flex items-center gap-2 text-sm font-black uppercase text-gray-700 dark:text-gray-200 mb-4 z-10 relative">
                            <span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded">3.2</span>
                            Estrategia de Infraestructura
                            <span className="ml-auto text-[10px] bg-orange-100 dark:bg-orange-900/30 text-orange-600 px-2 py-0.5 rounded-full">RTO &lt; 4 horas</span>
                        </h4>
                        <ul className="space-y-4 text-xs z-10 relative">
                            <li className="flex gap-3">
                                <span className="p-1 rounded bg-gray-100 dark:bg-gray-800 text-emerald-600 shrink-0 h-fit mt-0.5">
                                    <Globe className="w-3 h-3" />
                                </span>
                                <div>
                                    <strong className="block text-gray-900 dark:text-white mb-1">Alta Disponibilidad</strong>
                                    <span className="text-gray-500">Despliegue en Multi-AZ (Zonas de Disponibilidad) para mitigar fallos físicos.</span>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="p-1 rounded bg-gray-100 dark:bg-gray-800 text-emerald-600 shrink-0 h-fit mt-0.5">
                                    <FileText className="w-3 h-3" />
                                </span>
                                <div>
                                    <strong className="block text-gray-900 dark:text-white mb-1">Infraestructura como Código (IaC)</strong>
                                    <span className="text-gray-500">Scripts de Terraform listos para redesplegar el entorno en una región secundaria en caso de desastre regional.</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 4. Plan de Activación y Respuesta */}
            <div className="p-8 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-800 pb-4">
                    <Play className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                    <h3 className="text-xl font-black text-gray-800 dark:text-gray-200 uppercase tracking-wide">
                        4. Plan de Activación y Respuesta
                    </h3>
                </div>

                <p className="text-sm text-gray-500 text-justify">
                    A continuación, se detalla el flujo de activación del plan ante un incidente crítico (Ej. Ataque de Ransomware o Caída de Proveedor Cloud).
                </p>

                <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                    <table className="w-full text-left text-[10px] md:text-xs">
                        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-black uppercase tracking-wider">
                            <tr>
                                <th className="p-3 w-1/5">Fase</th>
                                <th className="p-3 w-1/5">Responsable</th>
                                <th className="p-3 w-2/5">Acción</th>
                                <th className="p-3 w-1/5">Tiempo Objetivo</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-[#0d1117]">
                            <tr>
                                <td className="p-3 font-bold text-gray-700 dark:text-gray-300 border-r dark:border-gray-700">
                                    1. Detección y Alerta
                                </td>
                                <td className="p-3 font-medium text-indigo-600 dark:text-indigo-400 border-r dark:border-gray-700">
                                    SOC / Monitoreo
                                </td>
                                <td className="p-3 text-gray-600 dark:text-gray-400 border-r dark:border-gray-700">
                                    1. Identificar la caída del servicio o alerta de intrusión.<br />
                                    2. Clasificar el incidente (Severidad Alta/Crítica).<br />
                                    3. Notificar al Líder de Crisis.
                                </td>
                                <td className="p-3 font-mono font-bold text-red-600 dark:text-red-400">
                                    T + 15 min
                                </td>
                            </tr>
                            <tr>
                                <td className="p-3 font-bold text-gray-700 dark:text-gray-300 border-r dark:border-gray-700">
                                    2. Evaluación
                                </td>
                                <td className="p-3 font-medium text-yellow-600 dark:text-yellow-500 border-r dark:border-gray-700">
                                    Líder de Crisis
                                </td>
                                <td className="p-3 text-gray-600 dark:text-gray-400 border-r dark:border-gray-700">
                                    1. Evaluar si el tiempo estimado de resolución supera las 2 horas.<br />
                                    2. Si es afirmativo, <strong className="text-gray-900 dark:text-white">Declarar Desastre</strong> e invocar el BCP.
                                </td>
                                <td className="p-3 font-mono font-bold text-orange-600 dark:text-orange-400">
                                    T + 30 min
                                </td>
                            </tr>
                            <tr>
                                <td className="p-3 font-bold text-gray-700 dark:text-gray-300 border-r dark:border-gray-700">
                                    3. Contención
                                </td>
                                <td className="p-3 font-medium text-amber-600 dark:text-amber-500 border-r dark:border-gray-700">
                                    Equipo Técnico
                                </td>
                                <td className="p-3 text-gray-600 dark:text-gray-400 border-r dark:border-gray-700">
                                    1. Aislar los servidores afectados (Corte de red).<br />
                                    2. Cambiar credenciales de acceso administrativo.
                                </td>
                                <td className="p-3 font-mono font-bold text-yellow-600 dark:text-yellow-400">
                                    T + 1 hora
                                </td>
                            </tr>
                            <tr>
                                <td className="p-3 font-bold text-gray-700 dark:text-gray-300 border-r dark:border-gray-700">
                                    4. Recuperación (DRP)
                                </td>
                                <td className="p-3 font-medium text-blue-600 dark:text-blue-400 border-r dark:border-gray-700">
                                    Admin Cloud / DBA
                                </td>
                                <td className="p-3 text-gray-600 dark:text-gray-400 border-r dark:border-gray-700">
                                    1. Ejecutar script de failover a región secundaria o restaurar última imagen sana.<br />
                                    2. Restaurar Base de Datos (TAW_DAT_02) desde el último snapshot validado.<br />
                                    3. Verificar integridad de datos.
                                </td>
                                <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">
                                    T + 3 horas
                                </td>
                            </tr>
                            <tr>
                                <td className="p-3 font-bold text-gray-700 dark:text-gray-300 border-r dark:border-gray-700">
                                    5. Retorno
                                </td>
                                <td className="p-3 font-medium text-gray-600 dark:text-gray-400 border-r dark:border-gray-700">
                                    Coordinador
                                </td>
                                <td className="p-3 text-gray-600 dark:text-gray-400 border-r dark:border-gray-700">
                                    1. Realizar pruebas de QA en el entorno recuperado.<br />
                                    2. Redirigir tráfico DNS (Route53) al nuevo entorno.<br />
                                    3. Comunicar restablecimiento a usuarios.
                                </td>
                                <td className="p-3 font-mono font-bold text-green-600 dark:text-green-400">
                                    T + 4 horas (RTO)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 5. Procedimientos Técnicos Específicos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/30 space-y-4">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <h4 className="font-bold text-red-800 dark:text-red-200 uppercase text-xs">Escenario A: Falla de Servidor Cloud (TAW_INF_01)</h4>
                    </div>
                    <div className="text-xs space-y-2 text-red-900 dark:text-red-100">
                        <p className="font-bold">Síntoma: <span className="font-normal">Error 503 Service Unavailable o Latencia &gt; 5000ms.</span></p>
                        <ol className="list-decimal pl-4 space-y-1 marker:font-bold">
                            <li>Acceder a la consola de administración de AWS/Azure.</li>
                            <li>Verificar estado de las instancias EC2.</li>
                            <li>Si la instancia es irrecuperable, ejecutar <code className="bg-red-100 dark:bg-red-900/50 px-1 py-0.5 rounded font-mono text-[10px]">terraform apply -var=region=us-west-2</code> para levantar la infraestructura de contingencia.</li>
                            <li>Actualizar registros DNS para apuntar al nuevo Balanceador de Carga.</li>
                        </ol>
                    </div>
                </div>

                <div className="p-6 bg-orange-50 dark:bg-orange-900/10 rounded-2xl border border-orange-100 dark:border-orange-900/30 space-y-4">
                    <div className="flex items-center gap-2">
                        <Database className="w-5 h-5 text-orange-600" />
                        <h4 className="font-bold text-orange-800 dark:text-orange-200 uppercase text-xs">Escenario B: Corrupción de Base de Datos (TAW_DAT_02)</h4>
                    </div>
                    <div className="text-xs space-y-2 text-orange-900 dark:text-orange-100">
                        <p className="font-bold">Síntoma: <span className="font-normal">Inconsistencia de datos o alerta de integridad.</span></p>
                        <ol className="list-decimal pl-4 space-y-1 marker:font-bold">
                            <li>Detener el servicio de escritura en la aplicación web.</li>
                            <li>Localizar el <em>Point-in-Time Recovery</em> de 5 minutos antes del incidente.</li>
                            <li>Instanciar una nueva RDS con el backup seleccionado.</li>
                            <li>Modificar la cadena de conexión en las variables de entorno de la App.</li>
                        </ol>
                    </div>
                </div>
            </div>

            {/* 6. Pruebas y Mantenimiento */}
            <div className="p-8 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-4">
                <div className="flex items-center gap-3">
                    <Wrench className="w-5 h-5 text-gray-400" />
                    <h3 className="text-lg font-black text-gray-800 dark:text-gray-200 uppercase tracking-wide">
                        6. Pruebas y Mantenimiento (DSS04.05)
                    </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 space-y-2">
                        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                            <RotateCcw className="w-4 h-4" />
                            <strong className="uppercase font-bold">Frecuencia</strong>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 pl-6">Semestral.</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 space-y-2">
                        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                            <CheckCircle className="w-4 h-4" />
                            <strong className="uppercase font-bold">Tipo de Prueba</strong>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 pl-6">Simulacro de escritorio y restauración técnica de backup en entorno de Staging.</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 space-y-2">
                        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                            <Wrench className="w-4 h-4" />
                            <strong className="uppercase font-bold">Mantenimiento</strong>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 pl-6">El plan debe actualizarse cada vez que haya cambios significativos en la arquitectura (TAW_INF_01) o en el personal crítico (TAW_PER_04).</p>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default GovernanceBCP;

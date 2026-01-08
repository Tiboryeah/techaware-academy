import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const GovernanceServiceCharter = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
        >
            <h2 className="text-3xl font-black tracking-tighter uppercase text-center mb-8">Cédula de Servicio</h2>

            {/* Header IPN */}
            <div className="p-8 bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-8">


                <section className="space-y-6">
                    <h4 className="text-sm font-black uppercase text-gray-700 dark:text-gray-300 tracking-widest">1. Información general del servicio de IT</h4>

                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden text-xs">
                        {/* Row 1 */}
                        <div className="flex border-b border-gray-200 dark:border-gray-700">
                            <div className="w-1/3 bg-gray-200 dark:bg-gray-800 p-3 font-bold border-r border-gray-200 dark:border-gray-700 flex items-center">Nombre de la Empresa:</div>
                            <div className="w-2/3 p-3 font-medium bg-white dark:bg-[#161b22]">TechAware Kids</div>
                        </div>
                        {/* Row 2 */}
                        <div className="flex border-b border-gray-200 dark:border-gray-700">
                            <div className="w-1/3 bg-gray-200 dark:bg-gray-800 p-3 font-bold border-r border-gray-200 dark:border-gray-700 flex items-center">Departamento:</div>
                            <div className="w-2/3 p-3 font-medium bg-white dark:bg-[#161b22]">Cómputo</div>
                        </div>
                        {/* Row 3 */}
                        <div className="flex border-b border-gray-200 dark:border-gray-700">
                            <div className="w-1/3 bg-gray-200 dark:bg-gray-800 p-3 font-bold border-r border-gray-200 dark:border-gray-700 flex items-center">Nombre del servicio</div>
                            <div className="w-2/3 p-3 font-medium bg-white dark:bg-[#161b22]">Servicio de Nube Educativa</div>
                        </div>
                        {/* Row 4: Checkboxes */}
                        <div className="flex border-b border-gray-200 dark:border-gray-700">
                            <div className="w-1/3 bg-gray-200 dark:bg-gray-800 p-3 font-bold border-r border-gray-200 dark:border-gray-700 flex items-center">Tipo de servicio</div>
                            <div className="w-2/3 p-3 font-medium bg-white dark:bg-[#161b22] flex gap-4">
                                <span className="flex items-center gap-1">Nuevo: <span className="border p-1 w-6 h-6 flex items-center justify-center font-bold">X</span></span>
                                <span className="flex items-center gap-1">Cambio: <span className="border p-1 w-6 h-6"></span></span>
                                <span className="flex items-center gap-1">Retiro: <span className="border p-1 w-6 h-6"></span></span>
                                <span className="flex items-center gap-1">Activo: <span className="border p-1 w-6 h-6"></span></span>
                            </div>
                        </div>
                        {/* Row 5: Variants */}
                        <div className="flex border-b border-gray-200 dark:border-gray-700">
                            <div className="w-1/3 bg-gray-200 dark:bg-gray-800 p-3 font-bold border-r border-gray-200 dark:border-gray-700 flex items-center">Listado de la(s) variante(s) o sub-servicio(s)</div>
                            <div className="w-2/3 p-3 font-medium bg-white dark:bg-[#161b22]">
                                <ul className="list-disc pl-4 space-y-1">
                                    <li>Almacenamiento en la nube para materiales educativos</li>
                                    <li>Plataforma en la nube para publicación de contenido</li>
                                    <li>Respaldos automáticos</li>
                                    <li>Espacios virtuales para actividades interactivas</li>
                                    <li>Seguridad administrada para protección de datos de menores</li>
                                </ul>
                            </div>
                        </div>
                        {/* Row 6: Description */}
                        <div className="flex">
                            <div className="w-1/3 bg-gray-200 dark:bg-gray-800 p-3 font-bold border-r border-gray-200 dark:border-gray-700 flex items-center">Descripción y alcance del servicio</div>
                            <div className="w-2/3 p-3 font-medium bg-white dark:bg-[#161b22] text-justify">
                                <p className="mb-2">El Servicio de Nube Educativa permite a TechAware Kids almacenar, gestionar y distribuir contenido digital educativo a través de infraestructura en la nube. Incluye máquinas virtuales, almacenamiento, seguridad, respaldos automáticos y acceso para docentes, creadores de contenido y administradores.</p>
                                <p>El servicio soporta el lanzamiento de contenido actualizado trimestralmente y permite el crecimiento proyectado de usuarios de la plataforma.</p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Tables from Image 2 */}
                    {/* Objetivo */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden text-xs mt-4">
                        <div className="flex border-b border-gray-200 dark:border-gray-700">
                            <div className="w-1/3 bg-gray-200 dark:bg-gray-800 p-3 font-bold border-r border-gray-200 dark:border-gray-700 flex items-center">Objetivo del servicio</div>
                            <div className="w-2/3 p-3 font-medium bg-white dark:bg-[#161b22]">
                                Implementar una infraestructura en la nube que permita a TechAware Kids reducir costos en un 20% para el primer trimestre de 2026, mejorar la eficiencia operativa y asegurar la disponibilidad continua del contenido educativo.
                            </div>
                        </div>
                        <div className="flex border-b border-gray-200 dark:border-gray-700">
                            <div className="w-1/3 bg-gray-200 dark:bg-gray-800 p-3 font-bold border-r border-gray-200 dark:border-gray-700 flex items-center">Usuarios a quienes se brinda el servicio</div>
                            <div className="w-2/3 p-3 font-medium bg-white dark:bg-[#161b22]">
                                <ul className="list-disc pl-4">
                                    <li>Área de cómputo</li>
                                    <li>Creadoras y creadores de contenido educativo</li>
                                    <li>Docentes certificados por TechAware Kids</li>
                                    <li>Administradores de la plataforma</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex border-b border-gray-200 dark:border-gray-700">
                            <div className="w-1/3 bg-gray-200 dark:bg-gray-800 p-3 font-bold border-r border-gray-200 dark:border-gray-700 flex items-center">Beneficios del servicio</div>
                            <div className="w-2/3 p-3 font-medium bg-white dark:bg-[#161b22]">
                                <ul className="list-disc pl-4">
                                    <li>Reducción de costos operativos</li>
                                    <li>Aumento del 30% en usuarios activos para el segundo trimestre de 2026</li>
                                    <li>Disponibilidad continua (24/7/365)</li>
                                    <li>Seguridad reforzada para manejo de datos de menores</li>
                                    <li>Respaldos automáticos diarios</li>
                                    <li>Escalabilidad para nuevos cursos y actividades</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-1/3 bg-gray-200 dark:bg-gray-800 p-3 font-bold border-r border-gray-200 dark:border-gray-700 flex items-center">Demanda del servicio</div>
                            <div className="w-2/3 p-3 font-medium bg-white dark:bg-[#161b22]">
                                Alta debido al crecimiento continuo de usuarios educativos y a la necesidad de publicar contenido actualizado de forma trimestral.
                            </div>
                        </div>
                    </div>

                    {/* RACI Matrix from Service Charter */}
                    <div className="mt-8 space-y-4">
                        <h4 className="text-sm font-black uppercase text-gray-700 dark:text-gray-300 tracking-widest text-center">Responsables del servicio (Matriz RACI)</h4>
                        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                            <table className="w-full text-center bg-white dark:bg-[#161b22]">
                                <thead className="bg-gray-200 dark:bg-gray-700 text-[10px] uppercase font-black">
                                    <tr>
                                        <th className="px-4 py-2 border-r border-gray-300 dark:border-gray-600">Actividad/ROL</th>
                                        <th className="px-4 py-2 border-r border-gray-300 dark:border-gray-600">Desarrollador Web</th>
                                        <th className="px-4 py-2 border-r border-gray-300 dark:border-gray-600">Líder de Proyecto</th>
                                        <th className="px-4 py-2 border-r border-gray-300 dark:border-gray-600">Diseñador UX/UI</th>
                                        <th className="px-4 py-2 border-r border-gray-300 dark:border-gray-600">Analista de Requerimientos</th>
                                        <th className="px-4 py-2">Documentador</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[11px] font-bold">
                                    <tr>
                                        <td className="px-2 py-2 border-r text-left bg-gray-50 dark:bg-gray-800">Diseño de la arquitectura del servicio en la nube</td>
                                        <td className="border-r">A</td><td className="border-r">R</td><td className="border-r">C</td><td className="border-r">C</td><td></td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-2 border-r text-left bg-gray-50 dark:bg-gray-800">Implementación y configuración del servicio de nube</td>
                                        <td className="border-r">R</td><td className="border-r">A</td><td className="border-r"></td><td className="border-r">C</td><td></td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-2 border-r text-left bg-gray-50 dark:bg-gray-800">Documentación final del servicio (manual técnico y operativo)</td>
                                        <td className="border-r">C</td><td className="border-r">A</td><td className="border-r">I</td><td className="border-r">C</td><td>R</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* Contact Table Mini */}
                        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 mt-2">
                            <table className="w-full text-[10px] text-left">
                                <thead className="bg-gray-200 dark:bg-gray-700 font-black uppercase text-center">
                                    <tr>
                                        <th className="p-2 border-r border-gray-300 dark:border-gray-600">Rol</th>
                                        <th className="p-2 border-r border-gray-300 dark:border-gray-600">Nombre</th>
                                        <th className="p-2 border-r border-gray-300 dark:border-gray-600">Correo electrónico</th>
                                        <th className="p-2 border-r border-gray-300 dark:border-gray-600">Teléfono/extensión</th>
                                        <th className="p-2">Horario de atención</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-[#161b22] text-center">
                                    <tr>
                                        <td className="p-2 border-r font-bold bg-gray-50 dark:bg-gray-800">Líder de Proyecto / Analista de Requerimientos</td>
                                        <td className="p-2 border-r">Martínez López Gerardo Esteban</td>
                                        <td className="p-2 border-r text-blue-600">Gerardo_Martinez@gmail.com</td>
                                        <td className="p-2 border-r">5566778888</td>
                                        <td className="p-2">7:00 a 12:00</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border-r font-bold bg-gray-50 dark:bg-gray-800">Desarrollador Web</td>
                                        <td className="p-2 border-r">Rugerio Arceo Juan Alberto</td>
                                        <td className="p-2 border-r text-blue-600">Juan_Rugerio@gmail.com</td>
                                        <td className="p-2 border-r">5581992030</td>
                                        <td className="p-2">12:00 a 17:00</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border-r font-bold bg-gray-50 dark:bg-gray-800">Diseñador UX/UI / Documentador</td>
                                        <td className="p-2 border-r">Sánchez Calderón Estefany Karina</td>
                                        <td className="p-2 border-r text-blue-600">Estefany_Sanchez@gmail.com</td>
                                        <td className="p-2 border-r">5543127698</td>
                                        <td className="p-2">12:00 a 17:00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Condiciones Generales */}
                    <div className="mt-8 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-xs font-medium">
                        <h4 className="font-bold mb-2">Condiciones generales o requisitos para proporcionar el servicio</h4>
                        <ul className="list-disc pl-4 space-y-1">
                            <li>Conexión estable a internet</li>
                            <li>Contar con cuenta institucional TechAware Kids</li>
                            <li>Autenticación multifactor (MFA)</li>
                            <li>Solicitud del jefe de área</li>
                            <li>Dispositivo compatible con acceso seguro</li>
                        </ul>
                    </div>

                    {/* Arquitectura Breakdown */}
                    <div className="mt-8">
                        <h4 className="text-sm font-black uppercase text-center tracking-widest mb-4">Arquitectura Técnica del Servicio</h4>

                        {/* Simplified Architecture Visual Container */}
                        <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-x-auto flex justify-center">
                            <div className="min-w-[600px] flex flex-col items-center gap-6 text-[10px] font-bold">
                                {/* Users */}
                                <div className="flex gap-12">
                                    <div className="flex flex-col items-center"><Users className="w-6 h-6" /><span className="mt-1">Docente</span></div>
                                    <div className="flex flex-col items-center"><Users className="w-6 h-6" /><span className="mt-1">Área Cómputo</span></div>
                                    <div className="flex flex-col items-center"><Users className="w-6 h-6" /><span className="mt-1">Creador</span></div>
                                    <div className="flex flex-col items-center"><Users className="w-6 h-6" /><span className="mt-1">Admin</span></div>
                                </div>

                                <div className="h-4 border-l-2 border-dashed border-gray-400"></div>
                                <div className="px-4 py-1 rounded-full border border-gray-300 bg-white dark:bg-gray-800 shadow-sm">Internet / DNS</div>
                                <div className="h-4 border-l-2 border-dashed border-gray-400"></div>

                                <div className="flex gap-8 items-start">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="p-2 border rounded bg-white dark:bg-gray-900 w-32 text-center">WAF / Firewall App</div>
                                        <div className="h-4 border-l-2 border-dashed border-gray-400"></div>
                                        <div className="p-2 border rounded bg-white dark:bg-gray-900 w-32 text-center">Firewall de Red</div>
                                    </div>
                                    <div className="p-2 border rounded bg-white dark:bg-gray-900 w-32 text-center mt-8">Bastion / Consola</div>
                                </div>

                                <div className="h-4 border-l-2 border-dashed border-gray-400"></div>
                                <div className="p-2 border rounded bg-gray-100 dark:bg-gray-700 w-48 text-center shadow-md">Balanceador de Carga</div>
                                <div className="h-4 border-l-2 border-dashed border-gray-400"></div>

                                <div className="p-4 border-2 border-indigo-200 rounded-xl bg-indigo-50/50 dark:bg-indigo-900/20 w-3/4 shadow-lg">
                                    <div className="text-center mb-4 text-indigo-600 font-black uppercase">Cluster de Aplicación (Máquinas Virtuales)</div>
                                    <div className="flex justify-center gap-8">
                                        <div className="p-3 bg-white dark:bg-[#161b22] border rounded-lg shadow-sm text-center w-40">
                                            <div className="block text-xs mb-1">Frontend Web</div>
                                            <div className="text-[9px] text-gray-400">Portal Nube Educativa</div>
                                        </div>
                                        <div className="p-3 bg-white dark:bg-[#161b22] border rounded-lg shadow-sm text-center w-40">
                                            <div className="block text-xs mb-1">Backend / API</div>
                                            <div className="text-[9px] text-gray-400">Servicio Nube Educativa</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 gap-4 w-full px-8">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-4 border-l-2 border-dashed border-gray-400"></div>
                                        <div className="p-2 border rounded bg-white dark:bg-[#161b22] w-full text-center">Almacenamiento (S3)</div>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-4 border-l-2 border-dashed border-gray-400"></div>
                                        <div className="p-2 border rounded bg-white dark:bg-[#161b22] w-full text-center">Base de Datos (RDS)</div>
                                        <div className="h-2 border-l-2 border-dashed border-gray-400"></div>
                                        <div className="p-2 border rounded bg-gray-100 w-full text-center text-[9px]">Motor Respaldos</div>
                                        <div className="h-2 border-l-2 border-dashed border-gray-400"></div>
                                        <div className="p-2 border rounded bg-gray-100 w-full text-center text-[9px]">Almacenamiento Respaldos</div>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-4 border-l-2 border-dashed border-gray-400"></div>
                                        <div className="p-2 border rounded bg-white dark:bg-[#161b22] w-full text-center">BD Auditoría (Logs)</div>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-4 border-l-2 border-dashed border-gray-400"></div>
                                        <div className="p-2 border rounded bg-white dark:bg-[#161b22] w-full text-center">Identidad / IAM</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SLAs & OLAs */}
                    <div className="mt-8 grid grid-cols-1 gap-8">
                        {/* SLA Users */}
                        <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden text-[10px]">
                            <div className="bg-gray-900 dark:bg-gray-700 text-white p-2 font-black text-center uppercase tracking-widest">Niveles de servicio (SLA-acuerdos de servicios para los usuarios)</div>
                            <table className="w-full text-left bg-white dark:bg-[#161b22]">
                                <thead className="bg-gray-100 dark:bg-gray-800 font-black">
                                    <tr>
                                        <th className="p-2 border-r dark:border-gray-700">Tipo de nivel de servicio</th>
                                        <th className="p-2">Compromiso del nivel de servicio</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    <tr>
                                        <td className="p-2 font-bold border-r dark:border-gray-700">Disponibilidad</td>
                                        <td className="p-2">Brindar el servicio las 24 horas del día, los 365 días del año, garantizando una disponibilidad del 97%.</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 font-bold border-r dark:border-gray-700">Soporte vía remota y presencial:</td>
                                        <td className="p-2">Proporcionar soporte técnico remoto durante todo el día, y soporte presencial dentro del horario operativo del equipo.</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 font-bold border-r dark:border-gray-700">Confidencialidad</td>
                                        <td className="p-2">Proteger la información de los usuarios mediante autenticación multifactor, controles de acceso por roles y cifrado en tránsito y en reposo.</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 font-bold border-r dark:border-gray-700">Seguridad</td>
                                        <td className="p-2">Mantener la infraestructura protegida mediante monitoreo continuo, firewall administrado y políticas de seguridad actualizadas.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* OLA Internal - Detailed Table */}
                        <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden text-[10px]">
                            <div className="bg-gray-900 dark:bg-gray-700 text-white p-2 font-black text-center uppercase tracking-widest leading-tight">Niveles de servicio (OLA-acuerdos de servicios respecto a elementos de configuración de infraestructura, aplicaciones, etc.)</div>
                            <table className="w-full text-left bg-white dark:bg-[#161b22]">
                                <thead className="bg-[#A6A6A6] text-white font-black uppercase">
                                    <tr>
                                        <th className="p-2 border-r border-white w-1/4">Elementos de configuración</th>
                                        <th className="p-2 border-r border-white w-1/2">Tipo de nivel de servicio y compromiso del nivel de servicio</th>
                                        <th className="p-2 w-1/4">Métricas de los niveles de servicio</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {/* APLICACIONES */}
                                    <tr>
                                        <td className="p-2 font-black border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-[#161b22] uppercase align-middle">
                                            APLICACIONES
                                        </td>
                                        <td className="p-0 border-r border-gray-200 dark:border-gray-700">
                                            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                                <div className="p-2"><span className="font-bold">Capacidad:</span> Escalable bajo demanda</div>
                                                <div className="p-2"><span className="font-bold">Disponibilidad:</span> Disponible 24/7 con un porcentaje mínimo de 97%</div>
                                                <div className="p-2"><span className="font-bold">Seguridad:</span> Cifrado y firewall</div>
                                                <div className="p-2"><span className="font-bold">Respaldos:</span> Respaldos diarios</div>
                                                <div className="p-2"><span className="font-bold">Mantenimiento:</span> Mantenimiento trimestral</div>
                                                <div className="p-2"><span className="font-bold">Mantenibilidad:</span> Alta</div>
                                                <div className="p-2"><span className="font-bold">Soporte al cliente:</span> Personal certificado</div>
                                            </div>
                                        </td>
                                        <td className="p-0">
                                            <div className="divide-y divide-gray-100 dark:divide-gray-800 h-full">
                                                <div className="p-2">Uso de CPU, RAM y almacenamiento</div>
                                                <div className="p-2">Porcentaje mensual</div>
                                                <div className="p-2">Incidentes</div>
                                                <div className="p-2">Integridad del respaldo</div>
                                                <div className="p-2">Ventana de mantenimiento</div>
                                                <div className="p-2">MTTR</div>
                                                <div className="p-2">Tiempo de respuesta</div>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* SOFTWARE/APP Header */}
                                    <tr className="bg-[#A6A6A6] text-white font-black uppercase text-[9px]">
                                        <td colSpan="3" className="p-2">Niveles de servicio para software/aplicación (bases de datos, plataformas, sistemas, etc.):</td>
                                    </tr>
                                    {/* SOFTWARE Content */}
                                    <tr>
                                        <td className="p-2 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-[#161b22]"></td>
                                        <td className="p-0 border-r border-gray-200 dark:border-gray-700">
                                            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                                <div className="p-2"><span className="font-bold">Capacidad:</span> Escalable según el tráfico y la demanda del servicio.</div>
                                                <div className="p-2"><span className="font-bold">Disponibilidad:</span> Disponibilidad del 97% durante el año.</div>
                                                <div className="p-2"><span className="font-bold">Seguridad:</span> Cifrado, control de roles y autenticación MFA.</div>
                                                <div className="p-2"><span className="font-bold">Respaldos:</span> Respaldos diarios y semanales del contenido educativo.</div>
                                                <div className="p-2"><span className="font-bold">Mantenimiento:</span> Mantenimiento programado trimestral.</div>
                                                <div className="p-2"><span className="font-bold">Mantenibilidad:</span> Alta, con tiempos de recuperación rápidos.</div>
                                            </div>
                                        </td>
                                        <td className="p-0">
                                            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                                <div className="p-2">Uso máximo del 80% de CPU y memoria antes de escalar.</div>
                                                <div className="p-2">Tiempo máximo de inactividad permitido: 8.7 horas anuales.</div>
                                                <div className="p-2">0 incidentes críticos de seguridad reportados por mes.</div>
                                                <div className="p-2">Verificación de integridad del respaldo: 100% semanal.</div>
                                                <div className="p-2">Duración máxima por ventana de mantenimiento: 2 horas.</div>
                                                <div className="p-2">MTTR (tiempo promedio de recuperación) menor a 60 minutos.</div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </section>
            </div>
        </motion.div>
    );
};

export default GovernanceServiceCharter;

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const GovernanceStrategy = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
        >
            <h2 className="text-3xl font-black tracking-tighter uppercase">Alineación Estratégica (COBIT)</h2>

            <div className="space-y-6">
                <h3 className="text-xl font-bold uppercase tracking-tight text-indigo-600">METAS CORPORATIVAS</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Las metas corporativas de TechAware Kids son las siguientes:</p>
                <ul className="space-y-2 list-none pl-4">
                    {[
                        'Reducir costos al 20% para el primer trimestre de 2026',
                        'Aumentar en un 30% el número de usuarios activos para el segundo trimestre de 2026',
                        'Publicar contenido educativo actualizado cada trimestre',
                        'Mejorar la satisfacción del equipo en un 70% para el segundo trimestre de 2026'
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="space-y-4">
                <div className="overflow-x-auto rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
                    <table className="w-full text-left bg-white dark:bg-[#161b22]">
                        <thead className="bg-gray-50 dark:bg-gray-800 text-[10px] uppercase tracking-widest font-black text-gray-500">
                            <tr>
                                <th className="px-6 py-4">Dimensión</th>
                                <th className="px-6 py-4">Meta</th>
                                <th className="px-6 py-4">Indicador</th>
                                <th className="px-6 py-4">Objetivo</th>
                                <th className="px-6 py-4">Periodo</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs border-t border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800 font-medium text-gray-600 dark:text-gray-300">
                            {[
                                { d: 'Financiera', m: 'Reducir los costos', i: '% de reducción de costos', o: '20%', p: '1er trimestre 2026' },
                                { d: 'Cliente / Usuario', m: 'Aumentar el número de usuarios activos', i: '% de usuarios activos', o: '30%', p: '2do trimestre 2026' },
                                { d: 'Procesos Internos', m: 'Publicar contenido educativo actualizado periódicamente', i: 'Frecuencia de actualización', o: '1 actualización trimestral', p: '2026' },
                                { d: 'Aprendizaje y Crecimiento', m: 'Mejorar la satisfacción del equipo de trabajo', i: 'Nivel de satisfacción laboral', o: '70%', p: '2do trimestre 2026' },
                            ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-indigo-600 uppercase text-[10px] tracking-wide">{row.d}</td>
                                    <td className="px-6 py-4">{row.m}</td>
                                    <td className="px-6 py-4">{row.i}</td>
                                    <td className="px-6 py-4 font-bold text-gray-800 dark:text-white">{row.o}</td>
                                    <td className="px-6 py-4">{row.p}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-[10px] text-center text-gray-400 font-medium italic">
                    Tabla 1. Metas corporativas de TechAware Kids. Fuente: Elaboración propia.
                </p>
            </div>

            <div className="space-y-6 pt-8 border-t border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-bold uppercase tracking-tight text-indigo-600">METAS IT</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Las metas IT de TechAware Kids son las siguientes:</p>
                <ul className="space-y-2 list-none pl-4">
                    {[
                        'Optimizar el consumo de recursos del servicio en la nube en un 20% para el primer trimestre de 2026.',
                        'Garantizar la disponibilidad del servicio en la nube en un 98% para el tercer trimestre de 2026.',
                        'Reducir los incidentes del servicio en la nube en un 30% para el tercer trimestre de 2026.',
                        'Capacitar al 100% del equipo de IT en servicios en la nube para el segundo trimestre de 2026.'
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="space-y-4">
                <div className="overflow-x-auto rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
                    <table className="w-full text-left bg-white dark:bg-[#161b22]">
                        <thead className="bg-gray-50 dark:bg-gray-800 text-[10px] uppercase tracking-widest font-black text-gray-500">
                            <tr>
                                <th className="px-6 py-4">Dimensión</th>
                                <th className="px-6 py-4">Meta</th>
                                <th className="px-6 py-4">Indicador</th>
                                <th className="px-6 py-4">Objetivo</th>
                                <th className="px-6 py-4">Periodo</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs border-t border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800 font-medium text-gray-600 dark:text-gray-300">
                            {[
                                { d: 'Financiera', m: 'Optimizar el consumo de recursos del servicio en la nube', i: '% de ahorro de recursos de nube', o: '20%', p: '1er trimestre 2026' },
                                { d: 'Cliente / Usuario', m: 'Garantizar la disponibilidad del servicio en la nube', i: '% de disponibilidad', o: '98%', p: '3er trimestre 2026' },
                                { d: 'Procesos Internos', m: 'Reducir incidentes del servicio en la nube', i: '% de reducción de incidentes', o: '30%', p: '3er trimestre 2026' },
                                { d: 'Aprendizaje y Crecimiento', m: 'Capacitar al equipo de IT en servicios de la nube', i: '% de personal capacitado', o: '100%', p: '2do trimestre 2026' },
                            ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-indigo-600 uppercase text-[10px] tracking-wide">{row.d}</td>
                                    <td className="px-6 py-4">{row.m}</td>
                                    <td className="px-6 py-4">{row.i}</td>
                                    <td className="px-6 py-4 font-bold text-gray-800 dark:text-white">{row.o}</td>
                                    <td className="px-6 py-4">{row.p}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-[10px] text-center text-gray-400 font-medium italic">
                    Tabla 2. Metas IT de TechAware Kids. Fuente: Elaboración propia.
                </p>
            </div>

            <div className="space-y-6 pt-8 border-t border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-bold uppercase tracking-tight text-indigo-600">CASCADA DE METAS</h3>
                <div className="space-y-4">
                    <div className="overflow-x-auto rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
                        <table className="w-full text-left bg-white dark:bg-[#161b22]">
                            <thead className="bg-gray-50 dark:bg-gray-800 text-[10px] uppercase tracking-widest font-black text-gray-500">
                                <tr>
                                    <th className="px-6 py-4 w-1/3">Meta Corporativa</th>
                                    <th className="px-6 py-4 w-1/3">Meta de IT</th>
                                    <th className="px-6 py-4 w-1/3">Proceso COBIT</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs border-t border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800 font-medium text-gray-600 dark:text-gray-300">
                                {[
                                    { mc: 'Reducir costos al 20% para el primer trimestre de 2026', mi: 'Optimizar el consumo de recursos del servicio en la nube en un 20% para el primer trimestre de 2026', pc: 'APO05 – Gestión de portafolio' },
                                    { mc: 'Reducir costos al 20% para el primer trimestre de 2026', mi: 'Reducir los incidentes del servicio en la nube en un 30% para el tercer trimestre de 2026', pc: 'DSS02 – Gestión de incidentes' },
                                    { mc: 'Aumentar en un 30% el número de usuarios activos para el segundo trimestre de 2026', mi: 'Garantizar la disponibilidad del servicio en la nube en un 98% para el tercer trimestre de 2026', pc: 'DSS01 – Operaciones del servicio' },
                                    { mc: 'Publicar contenido actualizado cada trimestre', mi: 'Garantizar la disponibilidad del servicio en la nube en un 98% para el tercer trimestre de 2026', pc: 'DSS01 – Operaciones del servicio' },
                                    { mc: 'Mejorar la satisfacción del equipo en un 70% para el segundo trimestre de 2026', mi: 'Capacitar al 100% del equipo de IT en servicios en la nube para el segundo trimestre de 2026.', pc: 'APO07 – Gestión de recursos humanos de IT' },
                                ].map((row, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="px-6 py-4">{row.mc}</td>
                                        <td className="px-6 py-4">{row.mi}</td>
                                        <td className="px-6 py-4 font-bold text-indigo-600">{row.pc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-[10px] text-center text-gray-400 font-medium italic">
                        Tabla 3. Cascada de metas de TechAware Kids. Fuente: Elaboración propia.
                    </p>
                </div>

                {/* Figura 1: Visual Cascada */}
                <div className="space-y-4 pt-4">
                    <h4 className="font-black uppercase text-xs text-gray-400 tracking-widest text-center">Figura 1: Diagrama de Cascada</h4>
                    <div className="p-4 md:p-8 bg-white dark:bg-[#161b22] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-x-auto">
                        <div className="min-w-[700px] flex justify-between gap-4">

                            {/* RAMA 1: FINANCIERA (RED) - BRANCHING */}
                            <div className="flex flex-col items-center w-1/3 relative">
                                {/* Top Level */}
                                <div className="p-3 bg-red-200 dark:bg-red-900/30 rounded-xl text-[10px] font-bold text-center w-48 mb-8 relative z-10 border border-red-300">
                                    Reducir costos al 20% (1T 2026)
                                    {/* Connecting Lines for Branching */}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-4 bg-gray-300 dark:bg-gray-600"></div>
                                    <div className="absolute top-[calc(100%+16px)] left-1/2 -translate-x-1/2 w-40 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
                                    <div className="absolute top-[calc(100%+16px)] left-[calc(50%-80px)] w-0.5 h-4 bg-gray-300 dark:bg-gray-600"></div>
                                    <div className="absolute top-[calc(100%+16px)] right-[calc(50%-80px)] w-0.5 h-4 bg-gray-300 dark:bg-gray-600"></div>
                                </div>

                                {/* Middle Level (Split) */}
                                <div className="flex justify-between w-full gap-2 mb-8">
                                    <div className="flex flex-col items-center w-1/2">
                                        <div className="p-3 bg-pink-100 dark:bg-pink-900/20 rounded-xl text-[9px] font-bold text-center w-full min-h-[60px] flex items-center justify-center border border-pink-200 relative">
                                            Optimizar el consumo de recursos en la nube (20%)
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gray-300 dark:bg-gray-600">
                                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 border-l border-b border-gray-300 dark:border-gray-600 -rotate-45"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center w-1/2">
                                        <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl text-[9px] font-bold text-center w-full min-h-[60px] flex items-center justify-center border border-purple-200 relative">
                                            Reducir incidentes del servicio en la nube (30%)
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gray-300 dark:bg-gray-600">
                                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 border-l border-b border-gray-300 dark:border-gray-600 -rotate-45"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Level (COBIT) */}
                                <div className="flex justify-between w-full gap-2">
                                    <div className="w-1/2 flex justify-center">
                                        <div className="px-4 py-2 bg-pink-200 dark:bg-pink-900/40 rounded-lg text-[10px] font-black w-24 text-center border border-pink-300">APO05</div>
                                    </div>
                                    <div className="w-1/2 flex justify-center">
                                        <div className="px-4 py-2 bg-purple-200 dark:bg-purple-900/40 rounded-lg text-[10px] font-black w-24 text-center border border-purple-300">DSS02</div>
                                    </div>
                                </div>
                            </div>

                            {/* RAMA 2: USUARIOS/CONTENIDO (GREEN) - MERGING */}
                            <div className="flex flex-col items-center w-1/3 relative">
                                {/* Top Level (Split) */}
                                <div className="flex justify-between w-full gap-2 mb-8">
                                    <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-xl text-[9px] font-bold text-center w-1/2 min-h-[50px] flex items-center justify-center border border-green-200 relative">
                                        Aumentar usuarios activos en un 30% (T2 2026)
                                        {/* Connector Left */}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-4 bg-gray-300 dark:bg-gray-600"></div>
                                        <div className="absolute top-[calc(100%+16px)] left-1/2 w-[55%] h-0.5 bg-gray-300 dark:bg-gray-600"></div>
                                    </div>
                                    <div className="p-2 bg-lime-100 dark:bg-lime-900/20 rounded-xl text-[9px] font-bold text-center w-1/2 min-h-[50px] flex items-center justify-center border border-lime-200 relative">
                                        Publicar contenido educativo cada trimestre
                                        {/* Connector Right */}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-4 bg-gray-300 dark:bg-gray-600"></div>
                                        <div className="absolute top-[calc(100%+16px)] right-1/2 w-[55%] h-0.5 bg-gray-300 dark:bg-gray-600"></div>
                                    </div>
                                </div>

                                {/* Connector Down to Middle */}
                                <div className="w-0.5 h-4 bg-gray-300 dark:bg-gray-600 -mt-8 mb-4 relative z-0">
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 border-l border-b border-gray-300 dark:border-gray-600 -rotate-45"></div>
                                </div>

                                {/* Middle Level (Merged) */}
                                <div className="p-3 bg-cyan-100 dark:bg-cyan-900/20 rounded-xl text-[9px] font-bold text-center w-40 min-h-[60px] flex items-center justify-center border border-cyan-200 mb-8 relative">
                                    Garantizar la disponibilidad del servicio en la nube (98%)
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gray-300 dark:bg-gray-600">
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 border-l border-b border-gray-300 dark:border-gray-600 -rotate-45"></div>
                                    </div>
                                </div>

                                {/* Bottom Level */}
                                <div className="px-4 py-2 bg-cyan-200 dark:bg-cyan-900/40 rounded-lg text-[10px] font-black w-24 text-center border border-cyan-300">DSS01</div>
                            </div>

                            {/* RAMA 3: CRECIMIENTO (YELLOW) - LINEAR */}
                            <div className="flex flex-col items-center w-1/3 relative">
                                {/* Top Level */}
                                <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-xl text-[10px] font-bold text-center w-48 mb-8 border border-amber-200 relative">
                                    Mejorar la satisfacción del equipo en un 70% (T2 2026)
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gray-300 dark:bg-gray-600">
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 border-l border-b border-gray-300 dark:border-gray-600 -rotate-45"></div>
                                    </div>
                                </div>

                                {/* Middle Level */}
                                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl text-[9px] font-bold text-center w-40 min-h-[60px] flex items-center justify-center border border-yellow-200 mb-8 relative">
                                    Capacitar al 100% del equipo de IT en servicios en la nube
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gray-300 dark:bg-gray-600">
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 border-l border-b border-gray-300 dark:border-gray-600 -rotate-45"></div>
                                    </div>
                                </div>

                                {/* Bottom Level */}
                                <div className="px-4 py-2 bg-yellow-200 dark:bg-yellow-900/40 rounded-lg text-[10px] font-black w-24 text-center border border-yellow-300">APO07</div>
                            </div>

                        </div>
                    </div>
                    <p className="text-[10px] text-center text-gray-400 font-medium italic">
                        Figura 1. Cascada de metas de TechAware Kids. Fuente: Elaboración propia.
                    </p>
                </div>
            </div>

            <div className="space-y-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-bold uppercase tracking-tight text-indigo-600">MAPAS ESTRATÉGICOS</h3>

                {/* Figura 2: Mapa Metas Corporativas */}
                <div className="space-y-4">
                    <h4 className="font-black uppercase text-xs text-gray-400 tracking-widest text-center">Mapa Estratégico – Metas Corporativas</h4>
                    <div className="p-8 bg-white dark:bg-[#161b22] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden relative">
                        <div className="absolute inset-x-0 bottom-0 top-0 flex justify-center opacity-5 pointer-events-none">
                            <div className="w-2 h-full bg-gradient-to-t from-indigo-500 to-transparent"></div>
                        </div>

                        <div className="flex flex-col-reverse gap-8 relative z-10 w-full">
                            {/* Aprendizaje */}
                            <div className="flex flex-col items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900/10 rounded-2xl border border-dashed border-purple-200 dark:border-purple-800">
                                <span className="text-[10px] font-black uppercase text-purple-400 tracking-widest mb-2 w-full text-center">Aprendizaje y Crecimiento</span>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {['Guardería', 'Mobiliario', 'Home office', 'Seguro médico', 'Equipo cómputo', 'Capacitación Nube'].map(t => (
                                        <div key={t} className="px-3 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-[10px] font-bold text-gray-600 border border-purple-100 dark:border-purple-900/50">{t}</div>
                                    ))}
                                </div>
                                <ChevronRight className="w-5 h-5 text-purple-300 -rotate-90" />
                                <div className="px-4 py-1 bg-white dark:bg-gray-800 rounded-full text-xs font-black text-purple-600 shadow-sm border border-purple-200">Motivación</div>
                            </div>

                            {/* Interno */}
                            <div className="flex flex-col items-center gap-4 p-4 bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl border border-dashed border-indigo-200 dark:border-indigo-800">
                                <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mb-2 w-full text-center">Procesos Internos</span>
                                <ChevronRight className="w-5 h-5 text-indigo-300 -rotate-90" />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-center">
                                    <div className="p-2 bg-white dark:bg-gray-800 rounded-xl text-[10px] font-bold text-gray-600 shadow-sm border border-indigo-100">Mayor productividad</div>
                                    <div className="p-2 bg-white dark:bg-gray-800 rounded-xl text-[10px] font-bold text-gray-600 shadow-sm border border-indigo-100">Actualización capacidades equipo</div>
                                    <div className="p-2 bg-white dark:bg-gray-800 rounded-xl text-[10px] font-bold text-gray-600 shadow-sm border border-indigo-100">Optimización infraestructura</div>
                                </div>
                            </div>

                            {/* Cliente */}
                            <div className="flex flex-col items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-dashed border-blue-200 dark:border-blue-800">
                                <span className="text-[10px] font-black uppercase text-blue-400 tracking-widest mb-2 w-full text-center">Cliente / Usuario</span>
                                <ChevronRight className="w-5 h-5 text-blue-300 -rotate-90" />
                                <div className="flex flex-col items-center gap-2 w-full">
                                    <div className="p-2 bg-white dark:bg-gray-800 rounded-xl text-[10px] font-bold text-gray-600 shadow-sm border border-blue-100 w-2/3 text-center">Reducción de costos procesamiento datos</div>
                                    <ChevronRight className="w-4 h-4 text-blue-200 -rotate-90" />
                                    <div className="p-2 bg-white dark:bg-gray-800 rounded-xl text-[10px] font-bold text-gray-600 shadow-sm border border-blue-100 w-1/2 text-center">Reducción costo membresía</div>
                                </div>
                            </div>

                            {/* Financiera */}
                            <div className="flex flex-col items-center gap-4 p-4 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-dashed border-green-200 dark:border-green-800">
                                <span className="text-[10px] font-black uppercase text-green-400 tracking-widest mb-2 w-full text-center">Financiera</span>
                                <ChevronRight className="w-5 h-5 text-green-300 -rotate-90" />
                                <div className="p-3 bg-white dark:bg-gray-800 rounded-xl text-xs font-black text-green-600 shadow-md border border-green-200 w-3/4 text-center transform scale-110">
                                    Reducir costos al 20% (1T 2026)
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-[10px] text-center text-gray-400 font-medium italic">
                        Figura 2. Mapa estratégico – Metas corporativas de TechAware Kids. Fuente: Elaboración propia.
                    </p>
                </div>

                {/* Figura 3: Mapa Metas IT */}
                <div className="space-y-4">
                    <h4 className="font-black uppercase text-xs text-gray-400 tracking-widest text-center">Mapa Estratégico – Metas IT</h4>
                    <div className="p-8 bg-white dark:bg-[#161b22] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden relative">
                        <div className="flex flex-col-reverse gap-8 relative z-10 w-full">
                            {/* Aprendizaje */}
                            <div className="flex flex-col items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900/10 rounded-2xl border border-dashed border-purple-200 dark:border-purple-800">
                                <span className="text-[10px] font-black uppercase text-purple-400 tracking-widest mb-2 w-full text-center">Aprendizaje y Crecimiento</span>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-center">
                                    <div className="p-2 bg-white dark:bg-gray-800 rounded-xl text-[10px] font-bold text-gray-600 border border-purple-100">Buenas prácticas gestión</div>
                                    <div className="p-2 bg-white dark:bg-gray-800 rounded-xl text-[10px] font-bold text-gray-600 border border-purple-100">Herramientas monitoreo</div>
                                    <div className="p-2 bg-white dark:bg-gray-800 rounded-xl text-[10px] font-bold text-gray-600 border border-purple-100">Capacitación IT Nube</div>
                                </div>
                            </div>

                            {/* Interno */}
                            <div className="flex flex-col items-center gap-2 p-4 bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl border border-dashed border-indigo-200 dark:border-indigo-800">
                                <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mb-2 w-full text-center">Procesos Internos</span>
                                <ChevronRight className="w-5 h-5 text-indigo-300 -rotate-90" />
                                <div className="p-2 bg-white dark:bg-gray-800 rounded-xl text-[10px] font-bold text-gray-600 w-2/3 text-center border border-indigo-100">Automatización recursos</div>
                                <ChevronRight className="w-4 h-4 text-indigo-200 -rotate-90" />
                                <div className="p-2 bg-white dark:bg-gray-800 rounded-xl text-[10px] font-bold text-gray-600 w-2/3 text-center border border-indigo-100">Optimización capacidad</div>
                                <ChevronRight className="w-4 h-4 text-indigo-200 -rotate-90" />
                                <div className="p-2 bg-white dark:bg-gray-800 rounded-xl text-[10px] font-bold text-gray-600 w-2/3 text-center border border-indigo-100">Monitoreo consumo</div>
                            </div>

                            {/* Cliente */}
                            <div className="flex flex-col items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-dashed border-blue-200 dark:border-blue-800">
                                <span className="text-[10px] font-black uppercase text-blue-400 tracking-widest mb-2 w-full text-center">Cliente / Usuario</span>
                                <ChevronRight className="w-5 h-5 text-blue-300 -rotate-90" />
                                <div className="p-2 bg-white dark:bg-gray-800 rounded-xl text-[10px] font-bold text-gray-600 w-2/3 text-center border border-blue-100">Uso eficiente recursos cómputo</div>
                                <ChevronRight className="w-4 h-4 text-blue-200 -rotate-90" />
                                <div className="p-2 bg-white dark:bg-gray-800 rounded-xl text-[10px] font-bold text-gray-600 w-2/3 text-center border border-blue-100">Reducción costo infraestructura</div>
                            </div>

                            {/* Financiera */}
                            <div className="flex flex-col items-center gap-4 p-4 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-dashed border-green-200 dark:border-green-800">
                                <span className="text-[10px] font-black uppercase text-green-400 tracking-widest mb-2 w-full text-center">Financiera</span>
                                <ChevronRight className="w-5 h-5 text-green-300 -rotate-90" />
                                <div className="p-3 bg-white dark:bg-gray-800 rounded-xl text-xs font-black text-green-600 shadow-md border border-green-200 w-full text-center">
                                    Optimizar consumo recursos nube 20% (1T 2026)
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-[10px] text-center text-gray-400 font-medium italic">
                        Figura 3. Mapa estratégico – Metas IT de TechAware Kids. Fuente: Elaboración propia.
                    </p>
                </div>
            </div>



        </motion.div>
    );
};

export default GovernanceStrategy;

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap } from 'lucide-react';

const GovernanceIntro = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
        >
            <section className="space-y-6">
                <h2 className="text-3xl font-black tracking-tighter uppercase">Introducción</h2>
                <div className="p-8 bg-white dark:bg-[#161b22] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-6 text-justify">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm font-medium">
                        Hoy en día la transformación tecnológica ha cambiado la forma en que las personas interactuamos, nos comunicamos y aprendemos. La tecnología trajo un cambio significativo en la vida de todas las personas sin importar sus edades, un caso especial es el de niños, ya que la tecnología ha generado nuevas oportunidades de aprendizaje, pero también ha incrementado la exposición a riesgos como el ciberacoso, el acceso a contenido inapropiado, la sobreexposición en redes sociales y la vulneración de datos personales. Debido a los riesgos asociados a la exposición de menores a dispositivos tecnológicos a temprana edad surge la necesidad de fortalecer la educación digital no solo en los menores, sino principalmente en los padres de familia, quienes cumplen un papel fundamental en el acompañamiento y supervisión del uso de la tecnología.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm font-medium">
                        En el contexto actual donde menores se ven expuestos a dispositivos tecnológicos a edades tempranas y con el conocimiento de los riesgos y beneficios que puede aportar la tecnología en entornos del día a día surge una herramienta enfocada a la prevención de incidentes en entornos digitales. TechAware Kids surge como alternativa en la actualidad, ya que es una aplicación web diseñada para concientizar y orientar a los padres de familia sobre los riesgos digitales a los que pueden estar expuestos los niños de entre 6 y 12 años. La aplicación implementa contenido educativo y herramientas interactivas con la finalidad de promover el uso seguro, responsable y consciente de la tecnología, buscando contribuir al bienestar infantil y a la prevención de incidentes digitales.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm font-medium">
                        El presente reporte del proyecto tiene como finalidad documentar el desarrollo y la gestión del servicio de IT de TechAware Kids apoyándose de marcos de referencia como COBIT, ITIL y la ISO 27000. En el documento se desarrollarán los elementos estratégicos, operativos y de control necesarios para que el servicio de IT genere valor al proyecto, gestione los riesgos de manera adecuada y asegure la continuidad del servicio. Además de incluir herramientas necesarias que nos permitan evaluar de manera integral la alineación del servicio de IT con los objetivos corporativos y las necesidades de nuestros usuarios.
                    </p>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-[2.5rem] border border-indigo-100 dark:border-indigo-500/20 space-y-4 text-justify">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Target className="text-indigo-600" /> OBJETIVO
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Nuestro objetivo es proveer un servicio de IT en la nube que sea confiable, seguro y eficiente que soporte la operación de la aplicación web TechAware Kids, el cual permita concientizar y apoyar a los padres de familia a prevenir los riesgos digitales en niños de 6 a 12 años, buscando garantizar la disponibilidad del servicio, la protección de la información, la continuidad operativa y la alineación con los objetivos estratégicos de la organización tomando en cuenta el uso de las mejores prácticas de gobierno y gestión de las tecnologías de la información.
                    </p>
                </div>
                <div className="p-8 bg-purple-500/5 dark:bg-purple-500/10 rounded-[2.5rem] border border-purple-100 dark:border-purple-500/20 space-y-4 text-justify">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Zap className="text-purple-600" /> DESCRIPCIÓN
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        El servicio de IT de TechAware Kids se basa en el uso de infraestructura y servicios en la nube, que permite el despliegue, operación y mantenimiento de una aplicación web interactiva orientada a la concientización de los padres de familia sobre los riesgos digitales en niños de entre 6 y 12 años, en la cual la nube proporcionará los recursos tecnológicos necesarios para garantizar la disponibilidad, escalabilidad y accesibilidad del servicio, permitiendo que los usuarios accedan a la plataforma de manera continua desde diferentes dispositivos con conexión a internet.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm pt-2">
                        El servicio de IT en la nube se alinea con los objetivos estratégicos de la organización al optimizar recursos tecnológicos, reducir los costos y fortalecer la gestión de riesgos, basado en el marco de referencia COBIT. Además de integrar prácticas de seguridad de la información basadas en la norma ISO 27000 buscando garantizar la confidencialidad, integridad y disponibilidad de los datos, así como la continuidad del servicio, por lo que la nube representa una herramienta indispensable para la operación de TechAware Kids permitiendo ofrecer un servicio confiable, seguro y que esté alineado a las mejores prácticas en la gestión de tecnologías de la información.
                    </p>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-xl font-black uppercase tracking-widest text-gray-400 text-center">Nuestra Filosofía</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white dark:bg-[#161b22] rounded-3xl border border-gray-100 dark:border-gray-800 space-y-2 text-justify">
                        <div className="font-black uppercase text-xs tracking-tighter text-indigo-500">MISIÓN</div>
                        <p className="text-sm font-medium italic text-gray-600 dark:text-gray-300">
                            "La misión de TechAware Kids es brindar a los padres de familia herramientas interactivas, accesibles y actualizadas que promuevan la conciencia y el acompañamiento activo de sus hijos en entornos digitales, contribuyendo a la prevención de riesgos en línea y fomentando la seguridad, el bienestar y el uso adecuado de la tecnología."
                        </p>
                    </div>
                    <div className="p-6 bg-white dark:bg-[#161b22] rounded-3xl border border-gray-100 dark:border-gray-800 space-y-2 text-justify">
                        <div className="font-black uppercase text-xs tracking-tighter text-indigo-500">VISIÓN</div>
                        <p className="text-sm font-medium italic text-gray-600 dark:text-gray-300">
                            "En TechAware Kids nuestra visión es consolidarnos como la plataforma líder en educación digital para padres en Latinoamérica, siendo un referente en innovación tecnológica, impacto social y compromiso con la protección infantil, contribuyendo a la creación de entornos digitales más seguros, conscientes y responsables para las nuevas generaciones."
                        </p>
                    </div>
                </div>

                <div className="p-8 bg-white dark:bg-[#161b22] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-4">
                    <div className="font-black uppercase text-xs tracking-tighter text-indigo-500 text-center">VALORES</div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 text-center pb-4">
                        En TechAware Kids nos guiamos por principios que representan nuestras decisiones y acciones, que orienten nuestro trabajo diario y que fortalezcan nuestro compromiso con los padres de familia y la seguridad digital de los niños.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { t: 'Responsabilidad familiar', d: 'Fomentamos la participación activa y consciente de los padres de familia en la educación digital y el acompañamiento de sus hijos en entornos tecnológicos.' },
                            { t: 'Seguridad', d: 'Protegemos la privacidad y la información de nuestros usuarios mediante prácticas seguras y responsables en el entorno digital.' },
                            { t: 'Innovación', d: 'Impulsamos el uso de tecnologías actuales y emergentes para educar, prevenir riesgos y generar conciencia digital.' },
                            { t: 'Compromiso social', d: 'Contribuimos al desarrollo de una cultura digital segura, responsable y que esté orientada al bienestar infantil.' },
                            { t: 'Colaboración', d: 'Trabajamos de manera conjunta con instituciones educativas, especialistas y organizaciones que nos permitan ampliar el alcance y el impacto social de nuestro proyecto.' }
                        ].map((val, i) => (
                            <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                                <div className="font-bold text-indigo-600 text-xs uppercase mb-2">• {val.t}</div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 text-justify">{val.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default GovernanceIntro;

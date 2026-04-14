import React from 'react';

const TermsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Términos y Condiciones de Uso
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        aria-label="Cerrar términos"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto text-gray-700 dark:text-gray-300 space-y-4 text-sm leading-relaxed">
                    <p>
                        <strong>Última actualización: abril de 2026</strong>
                    </p>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">1. Finalidad de la plataforma</h3>
                    <p>
                        Kuxipilli es una herramienta educativa para madres, padres y tutores sobre
                        seguridad digital infantil. Su contenido busca orientar y acompañar, no
                        sustituir atención especializada ni la supervisión del adulto responsable.
                    </p>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">2. Uso responsable</h3>
                    <p>
                        El usuario se compromete a utilizar la plataforma de forma ética, legal y
                        respetuosa. No está permitido usar el servicio para acosar, difamar,
                        vulnerar cuentas o compartir información sensible de terceros sin cuidado.
                    </p>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">3. Cuenta, datos y seguridad</h3>
                    <p>
                        Para operar la cuenta, la plataforma puede tratar nombre, correo,
                        credenciales protegidas, progreso académico, resultados, conversaciones del
                        asistente virtual y reportes enviados por el usuario. Esta información se gestiona
                        conforme a la política de privacidad.
                    </p>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">4. Asistente virtual y recursos externos</h3>
                    <p>
                        Algunas funciones pueden apoyarse en servicios de terceros, como correo,
                        video o IA. Te recomendamos no compartir datos personales sensibles de
                        menores en chats o formularios.
                    </p>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">5. Cambios</h3>
                    <p>
                        Los términos pueden actualizarse para reflejar mejoras del sistema, cambios
                        funcionales o ajustes alineados con el documento técnico y la operación real
                        de la plataforma.
                    </p>
                </div>

                <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TermsModal;

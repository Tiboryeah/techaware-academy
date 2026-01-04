import React from 'react';

const TermsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Términos y Condiciones de Uso</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto text-gray-700 dark:text-gray-300 space-y-4 text-sm leading-relaxed">
                    <p><strong>Última actualización: Enero 2026</strong></p>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">1. Introducción</h3>
                    <p>Bienvenido a <strong>TechAware Kids</strong>. Al acceder y utilizar nuestra plataforma, aceptas cumplir con los siguientes Términos y Condiciones. Esta herramienta está diseñada con fines educativos para padres y tutores sobre seguridad digital.</p>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">2. Uso del Servicio</h3>
                    <p>TechAware Kids proporciona cursos, guías y herramientas de diagnóstico. El usuario se compromete a utilizar la plataforma de manera ética y legal. Está prohibido compartir cuentas o distribuir el contenido exclusivo sin autorización.</p>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">3. Privacidad y Datos</h3>
                    <p>Nos tomamos muy en serio tu privacidad. Recopilamos datos mínimos (nombre, correo) para gestionar tu progreso. No compartimos información personal con terceros sin tu consentimiento, salvo requerimiento legal. Consulta nuestro Aviso de Privacidad completo para más detalles.</p>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">4. Propiedad Intelectual</h3>
                    <p>Todo el contenido (textos, videos, logotipos, cuestionarios) es propiedad exclusiva de TechAware Kids o sus licenciantes. Se otorga una licencia limitada, no exclusiva e intransferible para uso personal y no comercial.</p>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">5. Limitación de Responsabilidad</h3>
                    <p>TechAware Kids es una herramienta educativa. No garantizamos que el uso de nuestros consejos prevenga todos los riesgos digitales. Los padres son responsables finales de la supervisión de sus hijos.</p>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">6. Modificaciones</h3>
                    <p>Podemos actualizar estos términos ocasionalmente. Te notificaremos sobre cambios importantes a través de la plataforma o por correo electrónico.</p>
                </div>

                <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors font-medium"
                    >
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TermsModal;

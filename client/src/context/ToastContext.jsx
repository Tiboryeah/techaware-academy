import React, { createContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'success') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto remove after 5 seconds
        setTimeout(() => {
            removeToast(id);
        }, 5000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            {/* Toast Container */}
            <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-4 w-full max-w-xs pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8, x: 20 }}
                            className="pointer-events-auto"
                        >
                            <div className={`
                                flex items-center gap-4 p-4 rounded-2xl shadow-2xl backdrop-blur-xl border
                                ${toast.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400' : ''}
                                ${toast.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400' : ''}
                                ${toast.type === 'info' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-700 dark:text-indigo-400' : ''}
                                bg-white/50 dark:bg-[#161b22]/80
                            `}>
                                <div className="flex-shrink-0">
                                    {toast.type === 'success' && <CheckCircle className="w-5 h-5" />}
                                    {toast.type === 'error' && <AlertCircle className="w-5 h-5" />}
                                    {toast.type === 'info' && <Info className="w-5 h-5" />}
                                </div>
                                <p className="text-sm font-bold flex-grow">{toast.message}</p>
                                <button
                                    onClick={() => removeToast(toast.id)}
                                    className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                                >
                                    <X className="w-4 h-4 opacity-50" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

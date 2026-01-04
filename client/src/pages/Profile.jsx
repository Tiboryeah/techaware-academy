import React, { useState, useContext, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Save, Shield, Camera, Upload } from 'lucide-react';
import axios from 'axios';
import api from '../services/api';
import { API_BASE_URL } from '../constants';
import AuthContext from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';

const Profile = () => {
    const { user, updateUser } = useContext(AuthContext);
    const { addToast } = useContext(ToastContext);

    // -- Personal Info State --
    const [name, setName] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isInfoLoading, setIsInfoLoading] = useState(false);

    // -- Password State --
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPassLoading, setIsPassLoading] = useState(false);

    const fileInputRef = useRef(null);

    // Initialize fields when user loads
    useEffect(() => {
        if (user) {
            setName(user.name || '');
            // If user has an avatar, construct the full URL
            if (user.avatar) {
                // Check if it's already a full URL or relative
                const avatarUrl = user.avatar.startsWith('http')
                    ? user.avatar
                    : `${API_BASE_URL}${user.avatar}`;
                setAvatarPreview(avatarUrl);
            }
        }
    }, [user]);

    // Handle File Selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setAvatarPreview(URL.createObjectURL(file)); // Show local preview
        }
    };

    // Update Personal Info (Name & Avatar)
    const handleInfoUpdate = async (e) => {
        e.preventDefault();
        setIsInfoLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', name);
            if (selectedFile) {
                formData.append('avatar', selectedFile);
            }

            const { data } = await api.put('/api/auth/update-profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            updateUser(data); // Context update
            addToast('¡Perfil actualizado correctamente!', 'success');
        } catch (err) {
            addToast(err.response?.data?.message || 'Error al actualizar el perfil', 'error');
        } finally {
            setIsInfoLoading(false);
        }
    };

    // Update Password
    const handlePasswordUpdate = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            addToast('Las nuevas contraseñas no coinciden', 'error');
            return;
        }

        if (newPassword.length < 6) {
            addToast('La contraseña nueva debe tener al menos 6 caracteres', 'error');
            return;
        }

        setIsPassLoading(true);

        try {
            await api.put(
                '/api/auth/update-password',
                { currentPassword, newPassword }
            );
            addToast('¡Contraseña actualizada con éxito!', 'success');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            addToast(err.response?.data?.message || 'Error al actualizar la contraseña', 'error');
        } finally {
            setIsPassLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto space-y-8"
            >
                {/* Header Profile Card */}
                <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-10 -translate-y-10">
                        <Shield className="w-64 h-64" />
                    </div>

                    <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">
                        {/* Avatar Display */}
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full border-4 border-white/30 shadow-xl overflow-hidden bg-indigo-800 flex items-center justify-center">
                                {avatarPreview ? (
                                    <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-5xl font-black text-white/50">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={() => fileInputRef.current.click()}
                                className="absolute bottom-0 right-0 p-2 bg-indigo-500 hover:bg-indigo-600 rounded-full shadow-lg border-2 border-white transition-colors"
                                title="Cambiar Foto"
                            >
                                <Camera className="w-5 h-5 text-white" />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                            />
                        </div>

                        <div className="text-center sm:text-left">
                            <h1 className="text-3xl font-bold">{user?.name}</h1>
                            <p className="text-indigo-200 flex items-center justify-center sm:justify-start gap-2 mt-1">
                                <User className="w-4 h-4" /> {user?.email}
                            </p>
                            <span className="inline-block mt-3 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider border border-white/20">
                                {user?.role || 'Usuario'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 1. PERSONAL INFO FORM */}
                <div className="bg-white dark:bg-[#161b22] rounded-3xl p-8 shadow-sm border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Información Personal</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Actualiza tu nombre y foto de perfil</p>
                        </div>
                    </div>

                    <form onSubmit={handleInfoUpdate} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nombre Completo</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0a0c10] border-2 border-gray-100 dark:border-gray-800 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors dark:text-white font-medium"
                                placeholder="Tu nombre"
                            />
                        </div>

                        {/* Buttons were already here */}

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={isInfoLoading}
                                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100"
                            >
                                {isInfoLoading ? 'Guardando...' : (
                                    <>
                                        <Save className="w-5 h-5" /> Guardar Perfil
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* 2. SECURITY FORM */}
                <div className="bg-white dark:bg-[#161b22] rounded-3xl p-8 shadow-sm border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
                            <Lock className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Seguridad</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Cambiar tu contraseña</p>
                        </div>
                    </div>

                    <form onSubmit={handlePasswordUpdate} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Contraseña Actual</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0a0c10] border-2 border-gray-100 dark:border-gray-800 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors dark:text-white"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nueva Contraseña</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0a0c10] border-2 border-gray-100 dark:border-gray-800 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors dark:text-white"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Confirmar Nueva</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0a0c10] border-2 border-gray-100 dark:border-gray-800 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors dark:text-white"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Buttons were already here */}

                        <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
                            <button
                                type="submit"
                                disabled={isPassLoading}
                                className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-indigo-600 hover:bg-gray-800 dark:hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100"
                            >
                                {isPassLoading ? 'Actualizando...' : (
                                    <>
                                        <Lock className="w-4 h-4" /> Actualizar Clave
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;

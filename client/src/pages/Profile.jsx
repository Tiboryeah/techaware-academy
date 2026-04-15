import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Camera,
    CheckCircle2,
    Lock,
    Mail,
    Move,
    RotateCcw,
    Save,
    ShieldCheck,
    Sparkles,
    User,
    X,
    ZoomIn,
} from 'lucide-react';
import api from '../services/api';
import avatarUrl from '../utils/avatarUrl';
import AuthContext from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';
import logo from '../assets/logo_v2.png';

const VIEWPORT = 320;
const EXPORT_SIZE = 600;
const roleLabels = { Parent: 'Padre', Admin: 'Administrador' };
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const readFileAsDataUrl = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('No fue posible leer la imagen.'));
        reader.readAsDataURL(file);
    });

const loadImage = (src) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('No fue posible cargar la imagen.'));
        image.src = src;
    });

const Profile = () => {
    const { user, updateUser } = useContext(AuthContext);
    const { addToast } = useContext(ToastContext);
    const fileInputRef = useRef(null);
    const previewUrlRef = useRef(null);

    const [name, setName] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isInfoLoading, setIsInfoLoading] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPassLoading, setIsPassLoading] = useState(false);
    const [cropSource, setCropSource] = useState(null);
    const [cropName, setCropName] = useState('avatar');
    const [cropSize, setCropSize] = useState({ width: 1, height: 1 });
    const [cropZoom, setCropZoom] = useState(1);
    const [cropX, setCropX] = useState(0);
    const [cropY, setCropY] = useState(0);
    const [isCropLoading, setIsCropLoading] = useState(false);

    const setManagedPreview = (value) => {
        if (previewUrlRef.current) {
            URL.revokeObjectURL(previewUrlRef.current);
            previewUrlRef.current = null;
        }
        if (typeof value === 'string' && value.startsWith('blob:')) previewUrlRef.current = value;
        setAvatarPreview(value);
    };

    useEffect(() => {
        if (!user) return;
        setName(user.name || '');
        if (user.avatar) {
            setManagedPreview(avatarUrl(user.avatar));
        } else {
            setManagedPreview(null);
        }
    }, [user]);

    useEffect(() => () => {
        if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    }, []);

    const cropMetrics = useMemo(() => {
        if (!cropSource) return null;
        const baseScale = Math.max(VIEWPORT / cropSize.width, VIEWPORT / cropSize.height);
        const width = cropSize.width * baseScale * cropZoom;
        const height = cropSize.height * baseScale * cropZoom;
        return {
            width,
            height,
            maxX: Math.max(0, (width - VIEWPORT) / 2),
            maxY: Math.max(0, (height - VIEWPORT) / 2),
        };
    }, [cropSource, cropSize, cropZoom]);

    useEffect(() => {
        if (!cropMetrics) return;
        setCropX((value) => clamp(value, -cropMetrics.maxX, cropMetrics.maxX));
        setCropY((value) => clamp(value, -cropMetrics.maxY, cropMetrics.maxY));
    }, [cropMetrics]);

    const roleLabel = roleLabels[user?.role] || 'Usuario';
    const accountStatus = user?.isVerified === false ? 'Correo pendiente' : 'Cuenta verificada';
    const cards = [
        ['Correo de acceso', user?.email || 'No disponible'],
        ['Rol de cuenta', roleLabel],
        ['Privacidad', 'Nombre, correo y foto opcional'],
    ];

    const closeCrop = () => {
        setCropSource(null);
        setCropName('avatar');
        setCropSize({ width: 1, height: 1 });
        setCropZoom(1);
        setCropX(0);
        setCropY(0);
        setIsCropLoading(false);
    };

    const pickAvatar = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            addToast('Selecciona una imagen válida.', 'error');
            return;
        }
        try {
            const src = await readFileAsDataUrl(file);
            const image = await loadImage(src);
            setCropSource(src);
            setCropName(file.name.replace(/\.[^.]+$/, '') || 'avatar');
            setCropSize({ width: image.width, height: image.height });
            setCropZoom(1);
            setCropX(0);
            setCropY(0);
        } catch (error) {
            addToast(error.message || 'No fue posible preparar la imagen.', 'error');
        }
    };

    const applyCrop = async () => {
        if (!cropSource) return;
        setIsCropLoading(true);
        try {
            const image = await loadImage(cropSource);
            const canvas = document.createElement('canvas');
            canvas.width = EXPORT_SIZE;
            canvas.height = EXPORT_SIZE;
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('No fue posible ajustar la imagen.');

            const baseScale = Math.max(EXPORT_SIZE / image.width, EXPORT_SIZE / image.height);
            const drawWidth = image.width * baseScale * cropZoom;
            const drawHeight = image.height * baseScale * cropZoom;
            const scale = EXPORT_SIZE / VIEWPORT;
            const dx = EXPORT_SIZE / 2 - drawWidth / 2 + cropX * scale;
            const dy = EXPORT_SIZE / 2 - drawHeight / 2 + cropY * scale;

            ctx.fillStyle = '#0a0c10';
            ctx.fillRect(0, 0, EXPORT_SIZE, EXPORT_SIZE);
            ctx.drawImage(image, dx, dy, drawWidth, drawHeight);

            const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.9));
            if (!blob) throw new Error('No fue posible exportar la imagen.');

            const file = new File([blob], `${cropName}.jpg`, { type: 'image/jpeg' });
            setSelectedFile(file);
            setManagedPreview(URL.createObjectURL(file));
            closeCrop();
            addToast('Foto lista. Guarda el perfil para aplicar el cambio.', 'success');
        } catch (error) {
            addToast(error.message || 'No fue posible ajustar la imagen.', 'error');
            setIsCropLoading(false);
        }
    };

    const handleInfoUpdate = async (e) => {
        e.preventDefault();
        setIsInfoLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name.trim());
            if (selectedFile) formData.append('avatar', selectedFile);
            const { data } = await api.put('/api/auth/update-profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            updateUser(data);
            setSelectedFile(null);
            addToast('¡Perfil actualizado correctamente!', 'success');
        } catch (err) {
            addToast(err.response?.data?.message || 'Error al actualizar el perfil.', 'error');
        } finally {
            setIsInfoLoading(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) return addToast('Las nuevas contraseñas no coinciden.', 'error');
        if (newPassword.length < 6) return addToast('La nueva contraseña debe tener al menos 6 caracteres.', 'error');
        setIsPassLoading(true);
        try {
            await api.put('/api/auth/update-password', { currentPassword, newPassword });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            addToast('¡Contraseña actualizada con éxito!', 'success');
        } catch (err) {
            addToast(err.response?.data?.message || 'Error al actualizar la contraseña.', 'error');
        } finally {
            setIsPassLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-8">
                <section className="relative overflow-hidden rounded-[2.75rem] bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 p-8 md:p-10 text-white shadow-2xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_42%)]" />
                    <div className="absolute right-[-5rem] top-[-3rem] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
                    <img src={logo} alt="" aria-hidden="true" className="absolute right-6 bottom-0 w-48 md:w-64 opacity-[0.08] object-contain pointer-events-none" />
                    <div className="relative z-10 space-y-8">
                        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full border-4 border-white/25 overflow-hidden bg-indigo-950/50 flex items-center justify-center shadow-xl">
                                        {avatarPreview ? <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" /> : <span className="text-5xl font-black text-white/55">{user?.name?.charAt(0)?.toUpperCase() || 'K'}</span>}
                                    </div>
                                    <button type="button" onClick={pickAvatar} className="absolute bottom-1 right-1 p-2.5 bg-white text-indigo-700 hover:bg-indigo-50 rounded-full shadow-lg border border-indigo-100">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="text-center sm:text-left space-y-3">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-100"><Sparkles className="w-3.5 h-3.5" /> Perfil de cuenta</div>
                                    <div>
                                        <h1 className="text-3xl md:text-4xl font-black tracking-tight">{user?.name}</h1>
                                        <p className="mt-2 text-indigo-100 flex items-center justify-center sm:justify-start gap-2 text-sm md:text-base"><Mail className="w-4 h-4" /> {user?.email}</p>
                                    </div>
                                    <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider">{roleLabel}</span>
                                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-300/20 text-xs font-bold"><ShieldCheck className="w-3.5 h-3.5" /> {accountStatus}</span>
                                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-300/20 text-xs font-bold"><Camera className="w-3.5 h-3.5" /> Foto opcional</span>
                                    </div>
                                </div>
                            </div>
                            <div className="max-w-sm rounded-[1.75rem] border border-white/15 bg-white/10 backdrop-blur-md p-5">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-100">Enfoque de privacidad</p>
                                <p className="mt-3 text-sm text-indigo-50 leading-relaxed">Este perfil solo muestra lo necesario para identificar la cuenta: nombre, correo y una foto opcional que puedes ajustar antes de guardarla.</p>
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3">
                            {cards.map(([label, value]) => <div key={label} className="rounded-[1.75rem] border border-white/15 bg-white/10 backdrop-blur-md px-5 py-4"><p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-100/80">{label}</p><p className="mt-2 text-sm font-bold break-all text-white">{value}</p></div>)}
                        </div>
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                </section>

                <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
                    <div className="space-y-8">
                        <section className="bg-white dark:bg-[#161b22] rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 border border-gray-200 dark:border-gray-800">
                            <div className="flex items-center gap-3 mb-6"><div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400"><User className="w-6 h-6" /></div><div><h2 className="text-xl font-bold text-gray-900 dark:text-white">Información personal</h2><p className="text-sm text-gray-500 dark:text-gray-400">Puedes actualizar tu nombre y preparar una foto mejor encuadrada.</p></div></div>
                            <form onSubmit={handleInfoUpdate} className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
                                    <div className="space-y-5">
                                        <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nombre visible</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0a0c10] border-2 border-gray-100 dark:border-gray-800 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors dark:text-white font-medium" placeholder="Tu nombre" /></div>
                                        <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Correo de acceso</label><input type="text" value={user?.email || ''} readOnly className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0a0c10] border-2 border-gray-100 dark:border-gray-800 rounded-xl text-gray-500 dark:text-gray-400 font-medium" /></div>
                                    </div>
                                    <div className="rounded-[2rem] border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0a0c10] p-5 space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-md bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">{avatarPreview ? <img src={avatarPreview} alt="Vista previa" className="w-full h-full object-cover" /> : <span className="text-3xl font-black text-indigo-400">{user?.name?.charAt(0)?.toUpperCase() || 'K'}</span>}</div>
                                            <div><p className="text-sm font-bold text-gray-900 dark:text-white">Foto de perfil</p><p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Puedes elegir una imagen y ajustarla antes de guardarla.</p></div>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            <button type="button" onClick={pickAvatar} className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-[0.18em] transition-all"><Camera className="w-4 h-4" /> Elegir foto</button>
                                            {selectedFile ? <span className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-bold"><CheckCircle2 className="w-4 h-4" /> Foto lista para guardar</span> : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end pt-2"><button type="submit" disabled={isInfoLoading} className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100">{isInfoLoading ? 'Guardando...' : <><Save className="w-5 h-5" /> Guardar perfil</>}</button></div>
                            </form>
                        </section>

                        <section className="bg-white dark:bg-[#161b22] rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 border border-gray-200 dark:border-gray-800">
                            <div className="flex items-center gap-3 mb-6"><div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400"><Lock className="w-6 h-6" /></div><div><h2 className="text-xl font-bold text-gray-900 dark:text-white">Seguridad</h2><p className="text-sm text-gray-500 dark:text-gray-400">Cambia tu contraseña cuando necesites reforzar el acceso a tu cuenta.</p></div></div>
                            <form onSubmit={handlePasswordUpdate} className="space-y-6">
                                <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Contraseña actual</label><input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0a0c10] border-2 border-gray-100 dark:border-gray-800 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors dark:text-white" placeholder="••••••••" /></div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nueva contraseña</label><input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0a0c10] border-2 border-gray-100 dark:border-gray-800 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors dark:text-white" placeholder="••••••••" /></div>
                                    <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Confirmar nueva</label><input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0a0c10] border-2 border-gray-100 dark:border-gray-800 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors dark:text-white" placeholder="••••••••" /></div>
                                </div>
                                <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800"><button type="submit" disabled={isPassLoading} className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-indigo-600 hover:bg-gray-800 dark:hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100">{isPassLoading ? 'Actualizando...' : <><Lock className="w-4 h-4" /> Actualizar clave</>}</button></div>
                            </form>
                        </section>
                    </div>

                    <aside className="space-y-8 xl:sticky xl:top-24 h-fit">
                        <section className="bg-white dark:bg-[#161b22] rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 border border-gray-200 dark:border-gray-800">
                            <div className="flex items-center gap-3 mb-5"><div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400"><ShieldCheck className="w-6 h-6" /></div><div><h3 className="text-lg font-bold text-gray-900 dark:text-white">Resumen de la cuenta</h3><p className="text-sm text-gray-500 dark:text-gray-400">Solo lo esencial para administrar tu acceso.</p></div></div>
                            <div className="space-y-4">
                                {[
                                    ['Rol visible', roleLabel],
                                    ['Estado del correo', accountStatus],
                                    ['Foto de perfil', avatarPreview ? 'Configurada' : 'Opcional'],
                                ].map(([label, value]) => <div key={label} className="rounded-[1.5rem] border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0a0c10] px-4 py-4"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">{label}</p><p className="mt-2 text-sm font-bold text-gray-800 dark:text-gray-200">{value}</p></div>)}
                            </div>
                        </section>

                        <section className="bg-white dark:bg-[#161b22] rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 border border-gray-200 dark:border-gray-800">
                            <div className="flex items-center gap-3 mb-5"><div className="p-3 bg-cyan-50 dark:bg-cyan-500/10 rounded-xl text-cyan-600 dark:text-cyan-400"><Sparkles className="w-6 h-6" /></div><div><h3 className="text-lg font-bold text-gray-900 dark:text-white">Privacidad mínima</h3><p className="text-sm text-gray-500 dark:text-gray-400">Diseñado para pedir la menor información posible.</p></div></div>
                            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                                <p>Kuxipilli conserva tu nombre, correo y foto opcional para que puedas identificar tu cuenta sin llenar un perfil extenso.</p>
                                <div className="rounded-[1.5rem] border border-cyan-100 dark:border-cyan-500/20 bg-cyan-50/70 dark:bg-cyan-500/10 px-5 py-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">Recomendación</p>
                                    <p className="mt-2 leading-relaxed">Si subes una foto, usa una imagen simple y revisa el encuadre antes de guardarla para evitar recortes extraños.</p>
                                </div>
                            </div>
                        </section>
                    </aside>
                </div>
            </motion.div>

            <AnimatePresence>
                {cropSource ? (
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm" onClick={closeCrop} />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="relative w-full max-w-4xl rounded-[2rem] sm:rounded-[2.5rem] border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161b22] shadow-2xl overflow-y-auto max-h-[92vh]">
                            <button type="button" onClick={closeCrop} className="absolute right-4 top-4 z-10 rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-[#0a0c10]/80 p-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-300"><X className="w-5 h-5" /></button>
                            <div className="grid lg:grid-cols-[1fr_0.95fr]">
                                <div className="p-5 sm:p-8 bg-[#f6f8ff] dark:bg-[#10141c] border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300 mb-2">Ajuste de imagen</p>
                                    <h3 className="text-lg sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">Ajusta tu foto</h3>
                                    <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed hidden sm:block">Mueve y acerca la imagen hasta que el recorte te guste. Se guardará en formato cuadrado.</p>
                                    <div className="mt-4 sm:mt-8 flex justify-center">
                                        <div className="relative h-52 w-52 sm:h-72 sm:w-72 rounded-[1.75rem] sm:rounded-[2.25rem] overflow-hidden border-4 border-white dark:border-[#161b22] shadow-2xl bg-[#0a0c10]">
                                            {cropMetrics ? <img src={cropSource} alt="Vista previa del recorte" className="pointer-events-none absolute top-1/2 left-1/2 max-w-none select-none" style={{ width: `${cropMetrics.width}px`, height: `${cropMetrics.height}px`, transform: `translate(calc(-50% + ${cropX}px), calc(-50% + ${cropY}px))` }} /> : null}
                                            <div className="absolute inset-0 border-[10px] border-white/15 rounded-[1.5rem] sm:rounded-[2rem]" />
                                            <div className="absolute inset-x-0 top-1/2 h-px bg-white/20" />
                                            <div className="absolute inset-y-0 left-1/2 w-px bg-white/20" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 sm:p-8 space-y-5">
                                    <div className="space-y-4">
                                        <div><label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 mb-2"><ZoomIn className="w-4 h-4" /> Zoom</label><input type="range" min="1" max="2.8" step="0.01" value={cropZoom} onChange={(e) => setCropZoom(Number(e.target.value))} className="w-full accent-indigo-600" /></div>
                                        <div><label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 mb-2"><Move className="w-4 h-4" /> Horizontal</label><input type="range" min={cropMetrics ? -cropMetrics.maxX : 0} max={cropMetrics ? cropMetrics.maxX : 0} step="1" value={cropX} onChange={(e) => setCropX(Number(e.target.value))} className="w-full accent-indigo-600" /></div>
                                        <div><label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 mb-2"><Move className="w-4 h-4" /> Vertical</label><input type="range" min={cropMetrics ? -cropMetrics.maxY : 0} max={cropMetrics ? cropMetrics.maxY : 0} step="1" value={cropY} onChange={(e) => setCropY(Number(e.target.value))} className="w-full accent-indigo-600" /></div>
                                    </div>
                                    <div className="rounded-[1.5rem] border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0a0c10] p-4"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">Consejo rápido</p><p className="mt-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">Procura que tu rostro quede al centro. Si se ve muy cerrado, baja el zoom.</p></div>
                                    <div className="flex flex-wrap justify-between gap-3">
                                        <button type="button" onClick={() => { setCropZoom(1); setCropX(0); setCropY(0); }} className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bold text-sm"><RotateCcw className="w-4 h-4" /> Recentrar</button>
                                        <button type="button" onClick={applyCrop} disabled={isCropLoading} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 disabled:opacity-50">{isCropLoading ? 'Procesando...' : <><CheckCircle2 className="w-4 h-4" /> Usar este encuadre</>}</button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
        </div>
    );
};

export default Profile;

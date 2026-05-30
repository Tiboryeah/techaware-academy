import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Camera,
    CheckCircle2,
    Eye,
    EyeOff,
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
import logo from '../assets/logo_v2.webp';

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

const getTouchDist = (t0, t1) =>
    Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);

const Profile = () => {
    const { user, updateUser } = useContext(AuthContext);
    const { addToast } = useContext(ToastContext);
    const fileInputRef = useRef(null);
    const previewUrlRef = useRef(null);
    const cropContainerRef = useRef(null);

    const [name, setName] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isInfoLoading, setIsInfoLoading] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPassLoading, setIsPassLoading] = useState(false);
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [cropSource, setCropSource] = useState(null);
    const [cropName, setCropName] = useState('avatar');
    const [cropSize, setCropSize] = useState({ width: 1, height: 1 });
    const [cropZoom, setCropZoom] = useState(1);
    const [cropX, setCropX] = useState(0);
    const [cropY, setCropY] = useState(0);
    const [isCropLoading, setIsCropLoading] = useState(false);

    const gestureRef = useRef({
        isDragging: false,
        lastX: 0,
        lastY: 0,
        isPinching: false,
        pinchStartDist: 0,
        pinchStartZoom: 1,
    });

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
        setManagedPreview(user.avatar ? avatarUrl(user.avatar) : null);
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

    const getViewportScale = () => {
        if (!cropContainerRef.current) return 1;
        return VIEWPORT / cropContainerRef.current.getBoundingClientRect().width;
    };

    const applyDragDelta = (clientX, clientY, metrics) => {
        const scale = getViewportScale();
        const dx = (clientX - gestureRef.current.lastX) * scale;
        const dy = (clientY - gestureRef.current.lastY) * scale;
        gestureRef.current.lastX = clientX;
        gestureRef.current.lastY = clientY;
        if (metrics) {
            setCropX((x) => clamp(x + dx, -metrics.maxX, metrics.maxX));
            setCropY((y) => clamp(y + dy, -metrics.maxY, metrics.maxY));
        }
    };

    const onMouseDown = (e) => {
        e.preventDefault();
        gestureRef.current.isDragging = true;
        gestureRef.current.lastX = e.clientX;
        gestureRef.current.lastY = e.clientY;
    };

    const onMouseMove = (e) => {
        if (!gestureRef.current.isDragging) return;
        applyDragDelta(e.clientX, e.clientY, cropMetrics);
    };

    const onMouseUp = () => {
        gestureRef.current.isDragging = false;
    };

    const onTouchStart = (e) => {
        if (e.touches.length === 1) {
            gestureRef.current.isDragging = true;
            gestureRef.current.isPinching = false;
            gestureRef.current.lastX = e.touches[0].clientX;
            gestureRef.current.lastY = e.touches[0].clientY;
        } else if (e.touches.length === 2) {
            gestureRef.current.isDragging = false;
            gestureRef.current.isPinching = true;
            gestureRef.current.pinchStartDist = getTouchDist(e.touches[0], e.touches[1]);
            gestureRef.current.pinchStartZoom = cropZoom;
        }
    };

    const onTouchMove = (e) => {
        if (e.touches.length === 1 && gestureRef.current.isDragging) {
            applyDragDelta(e.touches[0].clientX, e.touches[0].clientY, cropMetrics);
        } else if (e.touches.length === 2 && gestureRef.current.isPinching) {
            const dist = getTouchDist(e.touches[0], e.touches[1]);
            const ratio = dist / gestureRef.current.pinchStartDist;
            setCropZoom(clamp(gestureRef.current.pinchStartZoom * ratio, 1, 2.8));
        }
    };

    const onTouchEnd = (e) => {
        if (e.touches.length === 0) {
            gestureRef.current.isDragging = false;
            gestureRef.current.isPinching = false;
        } else if (e.touches.length === 1) {
            gestureRef.current.isPinching = false;
            gestureRef.current.isDragging = true;
            gestureRef.current.lastX = e.touches[0].clientX;
            gestureRef.current.lastY = e.touches[0].clientY;
        }
    };

    const roleLabel = roleLabels[user?.role] || 'Usuario';

    const closeCrop = () => {
        setCropSource(null);
        setCropName('avatar');
        setCropSize({ width: 1, height: 1 });
        setCropZoom(1);
        setCropX(0);
        setCropY(0);
        setIsCropLoading(false);
        gestureRef.current = {
            isDragging: false,
            lastX: 0,
            lastY: 0,
            isPinching: false,
            pinchStartDist: 0,
            pinchStartZoom: 1,
        };
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
            addToast('Selecciona una imagen valida.', 'error');
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
            addToast('Perfil actualizado correctamente.', 'success');
        } catch (err) {
            addToast(err.response?.data?.message || 'Error al actualizar el perfil.', 'error');
        } finally {
            setIsInfoLoading(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) return addToast('Las nuevas contrasenas no coinciden.', 'error');
        if (newPassword.length < 8) return addToast('La nueva contrasena debe tener al menos 8 caracteres.', 'error');
        setIsPassLoading(true);
        try {
            await api.put('/api/auth/update-password', { currentPassword, newPassword });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            addToast('Contrasena actualizada con exito.', 'success');
        } catch (err) {
            addToast(err.response?.data?.message || 'Error al actualizar la contrasena.', 'error');
        } finally {
            setIsPassLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f4f1ea] text-slate-950 dark:bg-[#080b10] dark:text-white">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />

            <section className="relative overflow-hidden border-b border-black/5 bg-[#0a0d14]">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(82,43,160,0.58),rgba(11,16,26,0.88)_44%,rgba(7,93,111,0.42))]" />
                <div className="absolute inset-0 opacity-45" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px,transparent 1px)', backgroundSize: '26px 26px' }} />
                <img src={logo} alt="" aria-hidden="true" className="absolute -right-10 top-2 h-56 w-56 object-contain opacity-[0.08] sm:right-10 sm:h-72 sm:w-72" />

                <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="max-w-3xl">
                        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-cyan-200/80">Centro de cuenta</p>
                        <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-5xl">Perfil y seguridad</h1>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                            Controla como aparece tu cuenta en Kuxipilli y manten tus credenciales al dia.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="grid gap-6 lg:grid-cols-[340px_1fr]">
                    <aside className="space-y-5 lg:sticky lg:top-24 lg:h-fit">
                        <section className="overflow-hidden rounded-2xl border border-white/70 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)] dark:border-white/[0.08] dark:bg-[#0f141c] dark:shadow-black/40">
                            <div className="h-20 bg-[linear-gradient(135deg,#312060,#111827_58%,#075d6f)]" />
                            <div className="px-6 pb-6">
                                <div className="-mt-12 flex items-end justify-between gap-4">
                                    <div className="relative">
                                        <div className="rounded-full bg-white p-1 shadow-2xl shadow-violet-950/20 dark:bg-[#0f141c]">
                                            <div className="h-24 w-24 overflow-hidden rounded-full border border-white/40 bg-[#171d2a]">
                                                {avatarPreview
                                                    ? <img src={avatarPreview} alt="Avatar" className="h-full w-full object-cover" />
                                                    : <div className="flex h-full w-full items-center justify-center text-4xl font-black text-white/35">{user?.name?.charAt(0)?.toUpperCase() || 'K'}</div>}
                                            </div>
                                        </div>
                                        <button type="button" onClick={pickAvatar} className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-slate-950 text-white shadow-lg transition hover:bg-cyan-600 active:scale-95 dark:border-white/15" aria-label="Cambiar foto">
                                            <Camera className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <span className="mb-1 rounded-full border border-cyan-500/20 bg-cyan-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300">
                                        {roleLabel}
                                    </span>
                                </div>

                                <div className="mt-5 min-w-0">
                                    <h2 className="truncate text-2xl font-black tracking-tight text-slate-950 dark:text-white">{user?.name}</h2>
                                    <p className="mt-2 flex min-w-0 items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                                        <Mail className="h-4 w-4 shrink-0" />
                                        <span className="truncate">{user?.email}</span>
                                    </p>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/[0.08] dark:bg-white/[0.03]">
                                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Estado</p>
                                        <p className="mt-1 text-sm font-black text-emerald-600 dark:text-emerald-400">Activa</p>
                                    </div>
                                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/[0.08] dark:bg-white/[0.03]">
                                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Datos</p>
                                        <p className="mt-1 text-sm font-black text-slate-900 dark:text-white">Minimos</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-2xl border border-cyan-900/10 bg-[#e9fbff] p-5 shadow-[0_18px_45px_rgba(8,47,73,0.08)] dark:border-cyan-400/15 dark:bg-cyan-400/[0.07]">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-600 text-white shadow-lg shadow-cyan-700/20">
                                    <Sparkles className="h-4 w-4" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-slate-950 dark:text-white">Privacidad minima</h3>
                                    <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">
                                        Kuxipilli solo conserva nombre, correo y foto opcional para identificar tu cuenta.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </aside>

                    <main className="space-y-6">
                        <section className="rounded-2xl border border-white/70 bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,0.10)] dark:border-white/[0.08] dark:bg-[#0f141c] dark:shadow-black/40 sm:p-6">
                            <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 dark:border-white/[0.08] sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white shadow-lg shadow-slate-950/15 dark:bg-white dark:text-slate-950">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-black tracking-tight text-slate-950 dark:text-white">Informacion personal</h2>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Nombre visible y foto principal.</p>
                                    </div>
                                </div>
                                {selectedFile && (
                                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                                        <CheckCircle2 className="h-4 w-4" /> Foto lista
                                    </span>
                                )}
                            </div>

                            <form onSubmit={handleInfoUpdate} className="mt-6 space-y-6">
                                <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
                                    <div className="space-y-2">
                                        <label className="block text-[11px] font-black uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Nombre visible</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-950 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
                                            placeholder="Tu nombre"
                                        />
                                    </div>

                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/[0.08] dark:bg-white/[0.03]">
                                        <div className="flex items-center gap-4">
                                            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-200 dark:bg-white/[0.08]">
                                                {avatarPreview
                                                    ? <img src={avatarPreview} alt="Vista previa" className="h-full w-full object-cover" />
                                                    : <div className="flex h-full w-full items-center justify-center text-xl font-black text-slate-400">{user?.name?.charAt(0)?.toUpperCase() || 'K'}</div>}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-black text-slate-950 dark:text-white">Foto de perfil</p>
                                                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">Usa una imagen clara y cuadrada.</p>
                                            </div>
                                        </div>
                                        <button type="button" onClick={pickAvatar} className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-xs font-black uppercase tracking-[0.14em] text-slate-800 transition hover:border-cyan-500 hover:text-cyan-700 active:scale-[0.99] dark:border-white/[0.1] dark:bg-white/[0.05] dark:text-white dark:hover:text-cyan-300">
                                            <Camera className="h-4 w-4" /> Elegir foto
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button type="submit" disabled={isInfoLoading} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#1b1235] px-6 text-xs font-black uppercase tracking-[0.16em] text-white shadow-xl shadow-violet-950/20 transition hover:bg-[#281b4d] active:scale-[0.98] disabled:opacity-50 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400">
                                        {isInfoLoading ? 'Guardando...' : <><Save className="h-4 w-4" /> Guardar perfil</>}
                                    </button>
                                </div>
                            </form>
                        </section>

                        <section className="rounded-2xl border border-white/70 bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] dark:border-white/[0.08] dark:bg-[#0f141c] dark:shadow-black/40 sm:p-6">
                            <div className="flex items-center gap-3 border-b border-slate-200 pb-5 dark:border-white/[0.08]">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1b1235] text-white shadow-lg shadow-violet-950/20 dark:bg-cyan-500 dark:text-slate-950">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-black tracking-tight text-slate-950 dark:text-white">Seguridad</h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Actualiza tu contrasena cuando lo necesites.</p>
                                </div>
                            </div>

                            <form onSubmit={handlePasswordUpdate} className="mt-6 space-y-5">
                                <div className="space-y-2">
                                    <label className="block text-[11px] font-black uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Contrasena actual</label>
                                    <div className="relative">
                                        <input type={showCurrent ? 'text' : 'password'} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pr-12 text-sm font-semibold text-slate-950 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white" placeholder="********" />
                                        <button type="button" onClick={() => setShowCurrent(v => !v)} className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-cyan-600 dark:hover:bg-white/[0.06] dark:hover:text-cyan-300" aria-label="Mostrar u ocultar contrasena actual">{showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                                    </div>
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="block text-[11px] font-black uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Nueva contrasena</label>
                                        <div className="relative">
                                            <input type={showNew ? 'text' : 'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pr-12 text-sm font-semibold text-slate-950 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white" placeholder="********" />
                                            <button type="button" onClick={() => setShowNew(v => !v)} className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-cyan-600 dark:hover:bg-white/[0.06] dark:hover:text-cyan-300" aria-label="Mostrar u ocultar nueva contrasena">{showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[11px] font-black uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Confirmar nueva</label>
                                        <div className="relative">
                                            <input type={showConfirm ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pr-12 text-sm font-semibold text-slate-950 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white" placeholder="********" />
                                            <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-cyan-600 dark:hover:bg-white/[0.06] dark:hover:text-cyan-300" aria-label="Mostrar u ocultar confirmacion">{showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 dark:border-white/[0.08] sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">Minimo 8 caracteres. El cambio se aplicara al guardar.</p>
                                    <button type="submit" disabled={isPassLoading} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-xs font-black uppercase tracking-[0.16em] text-white shadow-xl shadow-slate-950/15 transition hover:bg-slate-800 active:scale-[0.98] disabled:opacity-50 dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-100">
                                        {isPassLoading ? 'Actualizando...' : <><Lock className="h-4 w-4" /> Actualizar</>}
                                    </button>
                                </div>
                            </form>
                        </section>
                    </main>
                </motion.div>
            </div>

            <AnimatePresence>
                {cropSource ? (
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm" onClick={closeCrop} />
                        <motion.div initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 10 }} className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/15 bg-white shadow-2xl dark:bg-[#10151e]">
                            <button type="button" onClick={closeCrop} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/85 text-slate-500 transition hover:text-cyan-600 dark:border-white/[0.08] dark:bg-[#080b10]/85 dark:text-slate-300" aria-label="Cerrar">
                                <X className="h-5 w-5" />
                            </button>

                            <div className="grid lg:grid-cols-[1fr_0.95fr]">
                                <div className="border-b border-slate-200 bg-[#eef7f8] p-5 dark:border-white/[0.08] dark:bg-[#0b1119] sm:p-8 lg:border-b-0 lg:border-r">
                                    <p className="text-[11px] font-black uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">Ajuste de imagen</p>
                                    <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">Ajusta tu foto</h3>
                                    <p className="mt-2 hidden text-sm leading-6 text-slate-500 dark:text-slate-400 sm:block">Mueve y acerca la imagen hasta que el encuadre quede listo.</p>

                                    <div className="mt-6 flex justify-center">
                                        <div
                                            ref={cropContainerRef}
                                            className="relative h-64 w-64 cursor-grab select-none overflow-hidden rounded-2xl border-4 border-white bg-[#0a0c10] shadow-2xl active:cursor-grabbing sm:h-72 sm:w-72 dark:border-[#10151e]"
                                            style={{ touchAction: 'none' }}
                                            onMouseDown={onMouseDown}
                                            onMouseMove={onMouseMove}
                                            onMouseUp={onMouseUp}
                                            onMouseLeave={onMouseUp}
                                            onTouchStart={onTouchStart}
                                            onTouchMove={onTouchMove}
                                            onTouchEnd={onTouchEnd}
                                        >
                                            {cropMetrics ? (
                                                <img
                                                    src={cropSource}
                                                    alt="Vista previa del recorte"
                                                    draggable={false}
                                                    className="pointer-events-none absolute left-1/2 top-1/2 max-w-none select-none"
                                                    style={{
                                                        width: `${cropMetrics.width}px`,
                                                        height: `${cropMetrics.height}px`,
                                                        transform: `translate(calc(-50% + ${cropX}px), calc(-50% + ${cropY}px))`,
                                                    }}
                                                />
                                            ) : null}
                                            <div className="pointer-events-none absolute inset-0 rounded-[1rem] border-[10px] border-white/15" />
                                            <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-white/20" />
                                            <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-white/20" />
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-center lg:hidden">
                                        <div className="inline-flex items-center gap-3 rounded-xl border border-cyan-500/20 bg-cyan-50 px-4 py-2.5 text-xs text-cyan-800 dark:bg-cyan-500/10 dark:text-cyan-300">
                                            <Move className="h-3.5 w-3.5 shrink-0" /><span>Arrastra</span>
                                            <span className="h-3.5 w-px bg-cyan-300/70" />
                                            <ZoomIn className="h-3.5 w-3.5 shrink-0" /><span>Pellizca</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-5 p-5 sm:p-8">
                                    <div className="hidden space-y-4 lg:block">
                                        <div>
                                            <label className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"><ZoomIn className="h-4 w-4" /> Zoom</label>
                                            <input type="range" min="1" max="2.8" step="0.01" value={cropZoom} onChange={(e) => setCropZoom(Number(e.target.value))} className="w-full accent-cyan-600" />
                                        </div>
                                        <div>
                                            <label className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"><Move className="h-4 w-4" /> Horizontal</label>
                                            <input type="range" min={cropMetrics ? -cropMetrics.maxX : 0} max={cropMetrics ? cropMetrics.maxX : 0} step="1" value={cropX} onChange={(e) => setCropX(Number(e.target.value))} className="w-full accent-cyan-600" />
                                        </div>
                                        <div>
                                            <label className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"><Move className="h-4 w-4" /> Vertical</label>
                                            <input type="range" min={cropMetrics ? -cropMetrics.maxY : 0} max={cropMetrics ? cropMetrics.maxY : 0} step="1" value={cropY} onChange={(e) => setCropY(Number(e.target.value))} className="w-full accent-cyan-600" />
                                        </div>
                                    </div>

                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/[0.08] dark:bg-white/[0.04]">
                                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Consejo rapido</p>
                                        <p className="mt-1.5 text-sm leading-6 text-slate-600 dark:text-slate-300">Procura que tu rostro quede al centro. El recorte final se guardara cuadrado.</p>
                                    </div>

                                    <div className="flex flex-wrap justify-between gap-3">
                                        <button type="button" onClick={() => { setCropZoom(1); setCropX(0); setCropY(0); }} className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-600 transition hover:border-cyan-500 hover:text-cyan-700 dark:border-white/[0.1] dark:text-slate-300 dark:hover:text-cyan-300">
                                            <RotateCcw className="h-4 w-4" /> Recentrar
                                        </button>
                                        <button type="button" onClick={applyCrop} disabled={isCropLoading} className="inline-flex h-11 items-center gap-2 rounded-xl bg-cyan-600 px-5 text-sm font-black text-white shadow-lg shadow-cyan-700/20 transition hover:bg-cyan-700 disabled:opacity-50 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400">
                                            {isCropLoading ? 'Procesando...' : <><CheckCircle2 className="h-4 w-4" /> Usar encuadre</>}
                                        </button>
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

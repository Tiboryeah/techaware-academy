import React, { useState, useEffect, useCallback } from 'react';
import { Search, RefreshCw, UserCheck, UserX, Trash2, Mail, Shield, User } from 'lucide-react';
import api from '../../services/api';

const ROLE_LABELS = { Parent: 'Padre/Tutor', Admin: 'Admin' };

const AdminUsuarios = () => {
    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [actionLoading, setActionLoading] = useState(null);
    const [toast, setToast] = useState(null);

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/admin/users', {
                params: { page, limit: 15, search, status: statusFilter },
            });
            setUsers(data.users);
            setTotal(data.total);
            setPages(data.pages);
        } catch (err) {
            showToast('Error al cargar usuarios', 'error');
        } finally {
            setLoading(false);
        }
    }, [page, search, statusFilter]);

    useEffect(() => { fetchUsers(); }, [fetchUsers]);

    const handleToggleVerify = async (user) => {
        setActionLoading(user._id + '-verify');
        try {
            await api.patch(`/api/admin/users/${user._id}`, { isVerified: !user.isVerified });
            showToast(`Usuario ${user.isVerified ? 'desverificado' : 'verificado'}`);
            fetchUsers();
        } catch { showToast('Error al actualizar', 'error'); }
        finally { setActionLoading(null); }
    };

    const handleToggleRole = async (user) => {
        const newRole = user.role === 'Admin' ? 'Parent' : 'Admin';
        if (!window.confirm(`¿Cambiar rol de ${user.name} a ${ROLE_LABELS[newRole]}?`)) return;
        setActionLoading(user._id + '-role');
        try {
            await api.patch(`/api/admin/users/${user._id}`, { role: newRole });
            showToast(`Rol actualizado a ${ROLE_LABELS[newRole]}`);
            fetchUsers();
        } catch { showToast('Error al actualizar', 'error'); }
        finally { setActionLoading(null); }
    };

    const handleResend = async (user) => {
        setActionLoading(user._id + '-resend');
        try {
            await api.post(`/api/admin/users/${user._id}/resend-verification`);
            showToast('Correo reenviado');
        } catch (err) {
            showToast(err?.response?.data?.message || 'Error al reenviar', 'error');
        } finally { setActionLoading(null); }
    };

    const handleDelete = async (user) => {
        if (!window.confirm(`¿Eliminar permanentemente la cuenta de ${user.name}?`)) return;
        setActionLoading(user._id + '-delete');
        try {
            await api.delete(`/api/admin/users/${user._id}`);
            showToast('Usuario eliminado');
            fetchUsers();
        } catch { showToast('Error al eliminar', 'error'); }
        finally { setActionLoading(null); }
    };

    return (
        <div className="flex-1 flex flex-col">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-bold shadow-xl
                    ${toast.type === 'error' ? 'bg-red-900/90 text-red-200' : 'bg-green-900/90 text-green-200'}`}>
                    {toast.msg}
                </div>
            )}

            {/* Topbar */}
            <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b border-white/7 bg-[#0a0c10]/90 backdrop-blur-md">
                <div>
                    <h1 className="text-lg font-black">Usuarios</h1>
                    <p className="text-xs text-slate-500 mt-0.5">{total} usuarios registrados</p>
                </div>
                <button onClick={fetchUsers} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/7 bg-white/3 hover:bg-white/7 text-slate-400 text-xs font-bold transition-all">
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                    Actualizar
                </button>
            </header>

            <div className="p-6 space-y-4">
                {/* Filters */}
                <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 bg-[#111318] border border-white/7 rounded-xl px-3 py-2 flex-1 min-w-48">
                        <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <input
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            placeholder="Buscar por nombre o correo..."
                            className="bg-transparent text-sm text-slate-200 placeholder-slate-600 outline-none w-full"
                        />
                    </div>
                    <div className="flex gap-2">
                        {[['', 'Todos'], ['verified', 'Verificados'], ['unverified', 'Sin verificar']].map(([val, label]) => (
                            <button
                                key={val}
                                onClick={() => { setStatusFilter(val); setPage(1); }}
                                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all
                                    ${statusFilter === val
                                        ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25'
                                        : 'bg-white/3 text-slate-400 border-white/7 hover:bg-white/7'}`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="bg-[#111318] border border-white/7 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/7">
                                    <th className="text-left text-[9px] font-black uppercase tracking-widest text-slate-600 px-4 py-3">Usuario</th>
                                    <th className="text-left text-[9px] font-black uppercase tracking-widest text-slate-600 px-4 py-3">Estado</th>
                                    <th className="text-left text-[9px] font-black uppercase tracking-widest text-slate-600 px-4 py-3">Rol</th>
                                    <th className="text-left text-[9px] font-black uppercase tracking-widest text-slate-600 px-4 py-3">Progreso</th>
                                    <th className="text-left text-[9px] font-black uppercase tracking-widest text-slate-600 px-4 py-3">Registro</th>
                                    <th className="text-right text-[9px] font-black uppercase tracking-widest text-slate-600 px-4 py-3">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={6} className="text-center py-12 text-slate-600 text-sm">Cargando...</td></tr>
                                ) : users.length === 0 ? (
                                    <tr><td colSpan={6} className="text-center py-12 text-slate-600 text-sm">Sin resultados</td></tr>
                                ) : users.map((u) => (
                                    <tr key={u._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-indigo-900/40 flex items-center justify-center text-indigo-300 font-black text-sm flex-shrink-0">
                                                    {u.name?.charAt(0)?.toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-slate-200">{u.name}</div>
                                                    <div className="text-xs text-slate-500">{u.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full border
                                                ${u.isVerified
                                                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                    : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                                                {u.isVerified ? 'Verificado' : 'Sin verificar'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full border
                                                ${u.role === 'Admin'
                                                    ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                                    : 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                                                {ROLE_LABELS[u.role]}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm font-bold text-slate-300">
                                            {u.completedLessons} lec.
                                        </td>
                                        <td className="px-4 py-3 text-xs text-slate-500">
                                            {new Date(u.createdAt).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <ActionBtn
                                                    icon={u.isVerified ? UserX : UserCheck}
                                                    title={u.isVerified ? 'Desverificar' : 'Verificar'}
                                                    loading={actionLoading === u._id + '-verify'}
                                                    onClick={() => handleToggleVerify(u)}
                                                    color={u.isVerified ? 'hover:text-amber-400 hover:border-amber-500/30' : 'hover:text-green-400 hover:border-green-500/30'}
                                                />
                                                {!u.isVerified && (
                                                    <ActionBtn
                                                        icon={Mail}
                                                        title="Reenviar verificación"
                                                        loading={actionLoading === u._id + '-resend'}
                                                        onClick={() => handleResend(u)}
                                                        color="hover:text-blue-400 hover:border-blue-500/30"
                                                    />
                                                )}
                                                <ActionBtn
                                                    icon={u.role === 'Admin' ? User : Shield}
                                                    title={u.role === 'Admin' ? 'Quitar admin' : 'Hacer admin'}
                                                    loading={actionLoading === u._id + '-role'}
                                                    onClick={() => handleToggleRole(u)}
                                                    color="hover:text-violet-400 hover:border-violet-500/30"
                                                />
                                                <ActionBtn
                                                    icon={Trash2}
                                                    title="Eliminar usuario"
                                                    loading={actionLoading === u._id + '-delete'}
                                                    onClick={() => handleDelete(u)}
                                                    color="hover:text-red-400 hover:border-red-500/30"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {pages > 1 && (
                        <div className="flex items-center justify-between px-4 py-3 border-t border-white/7">
                            <span className="text-xs text-slate-500">Página {page} de {pages}</span>
                            <div className="flex gap-2">
                                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                                    className="px-3 py-1.5 rounded-lg border border-white/7 text-xs font-bold text-slate-400 hover:bg-white/5 disabled:opacity-30">
                                    ← Anterior
                                </button>
                                <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}
                                    className="px-3 py-1.5 rounded-lg border border-white/7 text-xs font-bold text-slate-400 hover:bg-white/5 disabled:opacity-30">
                                    Siguiente →
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ActionBtn = ({ icon: Icon, title, loading, onClick, color = '' }) => (
    <button
        title={title}
        onClick={onClick}
        disabled={loading}
        className={`w-7 h-7 flex items-center justify-center rounded-lg border border-white/7 bg-white/3 text-slate-500 transition-all ${color} disabled:opacity-40`}
    >
        {loading
            ? <div className="w-3 h-3 border-2 border-slate-600 border-t-slate-300 rounded-full animate-spin" />
            : <Icon className="w-3.5 h-3.5" />}
    </button>
);

export default AdminUsuarios;

import React, { useState, useEffect, useCallback } from 'react';
import { Search, RefreshCw, Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import api from '../../services/api';

const BLANK = { title: '', description: '', type: 'guide', platform: '', category: '', url: '', videoUrl: '' };
const TYPES = ['guide', 'article', 'video', 'infographic', 'tool', 'other'];

const AdminRecursos = () => {
    const [resources, setResources] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [modal, setModal] = useState(null);
    const [form, setForm] = useState(BLANK);
    const [editId, setEditId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [actionLoading, setActionLoading] = useState(null);
    const [toast, setToast] = useState(null);

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchResources = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/admin/resources', { params: { page, limit: 15, search, type: typeFilter } });
            setResources(data.resources);
            setTotal(data.total);
            setPages(data.pages);
        } catch { showToast('Error al cargar recursos', 'error'); }
        finally { setLoading(false); }
    }, [page, search, typeFilter]);

    useEffect(() => { fetchResources(); }, [fetchResources]);

    const openCreate = () => { setForm(BLANK); setEditId(null); setModal('create'); };
    const openEdit = (r) => {
        setForm({ title: r.title, description: r.description ?? '', type: r.type, platform: r.platform ?? '', category: r.category ?? '', url: r.url ?? '', videoUrl: r.videoUrl ?? '' });
        setEditId(r._id);
        setModal('edit');
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (modal === 'create') { await api.post('/api/admin/resources', form); showToast('Recurso creado'); }
            else { await api.patch(`/api/admin/resources/${editId}`, form); showToast('Recurso actualizado'); }
            setModal(null);
            fetchResources();
        } catch (err) { showToast(err?.response?.data?.message || 'Error', 'error'); }
        finally { setSaving(false); }
    };

    const handleDelete = async (r) => {
        if (!window.confirm(`¿Eliminar "${r.title}"?`)) return;
        setActionLoading(r._id);
        try {
            await api.delete(`/api/admin/resources/${r._id}`);
            showToast('Recurso eliminado');
            fetchResources();
        } catch { showToast('Error', 'error'); }
        finally { setActionLoading(null); }
    };

    const TYPE_COLORS = {
        guide: 'bg-green-500/10 text-green-400 border-green-500/20',
        article: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        video: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
        infographic: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        tool: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        other: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    };

    return (
        <div className="flex-1 flex flex-col">
            {toast && (
                <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-bold shadow-xl
                    ${toast.type === 'error' ? 'bg-red-900/90 text-red-200' : 'bg-green-900/90 text-green-200'}`}>
                    {toast.msg}
                </div>
            )}

            {modal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-[#111318] border border-white/10 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-5 border-b border-white/7">
                            <h2 className="font-black text-base">{modal === 'create' ? 'Nuevo recurso' : 'Editar recurso'}</h2>
                            <button onClick={() => setModal(null)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
                        </div>
                        <div className="p-5 space-y-4">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 block">Título</label>
                                <input value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500/50" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 block">Tipo</label>
                                    <select value={form.type} onChange={(e) => setForm(f => ({ ...f, type: e.target.value }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none">
                                        {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 block">Plataforma</label>
                                    <input value={form.platform} onChange={(e) => setForm(f => ({ ...f, platform: e.target.value }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 block">URL</label>
                                    <input value={form.url} onChange={(e) => setForm(f => ({ ...f, url: e.target.value }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 block">URL video</label>
                                    <input value={form.videoUrl} onChange={(e) => setForm(f => ({ ...f, videoUrl: e.target.value }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 block">Descripción</label>
                                <textarea value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                                    rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none resize-none" />
                            </div>
                            <div className="flex gap-3">
                                <button onClick={handleSave} disabled={saving}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold">
                                    <Save className="w-4 h-4" />{saving ? 'Guardando...' : 'Guardar'}
                                </button>
                                <button onClick={() => setModal(null)} className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-400 text-sm font-bold hover:bg-white/5">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b border-white/7 bg-[#0a0c10]/90 backdrop-blur-md">
                <div>
                    <h1 className="text-lg font-black">Recursos editoriales</h1>
                    <p className="text-xs text-slate-500 mt-0.5">{total} recursos</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={fetchResources} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/7 bg-white/3 hover:bg-white/7 text-slate-400 text-xs font-bold">
                        <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold">
                        <Plus className="w-3.5 h-3.5" /> Nuevo recurso
                    </button>
                </div>
            </header>

            <div className="p-6 space-y-4">
                <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 bg-[#111318] border border-white/7 rounded-xl px-3 py-2 flex-1 min-w-48">
                        <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            placeholder="Buscar recurso..." className="bg-transparent text-sm text-slate-200 placeholder-slate-600 outline-none w-full" />
                    </div>
                    <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
                        className="bg-[#111318] border border-white/7 rounded-xl px-3 py-2 text-sm text-slate-400 outline-none">
                        <option value="">Todos los tipos</option>
                        {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>

                <div className="bg-[#111318] border border-white/7 rounded-2xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/7">
                                {['Título', 'Tipo', 'Plataforma', ''].map((h) => (
                                    <th key={h} className="text-left text-[9px] font-black uppercase tracking-widest text-slate-600 px-4 py-3">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={4} className="text-center py-12 text-slate-600 text-sm">Cargando...</td></tr>
                            ) : resources.map((r) => (
                                <tr key={r._id} className="border-b border-white/5 hover:bg-white/2">
                                    <td className="px-4 py-3 text-sm font-medium text-slate-200 max-w-xs">
                                        <div className="line-clamp-1">{r.title}</div>
                                        <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">{r.description}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${TYPE_COLORS[r.type] ?? TYPE_COLORS.other}`}>
                                            {r.type}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-slate-500">{r.platform || '—'}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <button onClick={() => openEdit(r)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-white/7 bg-white/3 text-slate-500 hover:text-indigo-400 hover:border-indigo-500/30 transition-colors">
                                                <Edit2 className="w-3.5 h-3.5" />
                                            </button>
                                            <button onClick={() => handleDelete(r)} disabled={actionLoading === r._id}
                                                className="w-7 h-7 flex items-center justify-center rounded-lg border border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500/15 transition-colors">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {pages > 1 && (
                        <div className="flex items-center justify-between px-4 py-3 border-t border-white/7">
                            <span className="text-xs text-slate-500">Página {page} de {pages}</span>
                            <div className="flex gap-2">
                                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 rounded-lg border border-white/7 text-xs font-bold text-slate-400 hover:bg-white/5 disabled:opacity-30">← Anterior</button>
                                <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages} className="px-3 py-1.5 rounded-lg border border-white/7 text-xs font-bold text-slate-400 hover:bg-white/5 disabled:opacity-30">Siguiente →</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminRecursos;

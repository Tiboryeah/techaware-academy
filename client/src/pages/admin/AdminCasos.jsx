import React, { useState, useEffect, useCallback } from 'react';
import { Search, RefreshCw, Plus, Edit2, Trash2, X, Save, ExternalLink } from 'lucide-react';
import api from '../../services/api';

const BLANK = { title: '', summary: '', content: '', slug: '', platform: '', category: '', videoUrl: '' };

const AdminCasos = () => {
    const [cases, setCases] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
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

    const fetchCases = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/admin/cases', { params: { page, limit: 15, search } });
            setCases(data.cases);
            setTotal(data.total);
            setPages(data.pages);
        } catch { showToast('Error al cargar casos', 'error'); }
        finally { setLoading(false); }
    }, [page, search]);

    useEffect(() => { fetchCases(); }, [fetchCases]);

    const openCreate = () => { setForm(BLANK); setEditId(null); setModal('create'); };
    const openEdit = (c) => {
        setForm({ title: c.title, summary: c.summary ?? '', content: c.content ?? '', slug: c.slug ?? '', platform: c.platform ?? '', category: c.category ?? '', videoUrl: c.videoUrl ?? '' });
        setEditId(c._id);
        setModal('edit');
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (modal === 'create') { await api.post('/api/admin/cases', form); showToast('Caso creado'); }
            else { await api.patch(`/api/admin/cases/${editId}`, form); showToast('Caso actualizado'); }
            setModal(null);
            fetchCases();
        } catch (err) { showToast(err?.response?.data?.message || 'Error', 'error'); }
        finally { setSaving(false); }
    };

    const handleDelete = async (c) => {
        if (!window.confirm(`¿Eliminar el caso "${c.title}"?`)) return;
        setActionLoading(c._id);
        try {
            await api.delete(`/api/admin/cases/${c._id}`);
            showToast('Caso eliminado');
            fetchCases();
        } catch { showToast('Error', 'error'); }
        finally { setActionLoading(null); }
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
                    <div className="bg-[#111318] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-5 border-b border-white/7">
                            <h2 className="font-black text-base">{modal === 'create' ? 'Nuevo caso' : 'Editar caso'}</h2>
                            <button onClick={() => setModal(null)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
                        </div>
                        <div className="p-5 space-y-4">
                            {[
                                { key: 'title', label: 'Título', type: 'input' },
                                { key: 'slug', label: 'Slug (URL)', type: 'input' },
                                { key: 'platform', label: 'Plataforma', type: 'input' },
                                { key: 'category', label: 'Categoría', type: 'input' },
                                { key: 'videoUrl', label: 'URL de video (YouTube)', type: 'input' },
                                { key: 'summary', label: 'Resumen', type: 'textarea', rows: 2 },
                                { key: 'content', label: 'Contenido completo', type: 'textarea', rows: 5 },
                            ].map(({ key, label, type, rows }) => (
                                <div key={key}>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 block">{label}</label>
                                    {type === 'input'
                                        ? <input value={form[key] ?? ''} onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500/50" />
                                        : <textarea value={form[key] ?? ''} onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
                                            rows={rows} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500/50 resize-none" />
                                    }
                                </div>
                            ))}
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
                    <h1 className="text-lg font-black">Casos reales</h1>
                    <p className="text-xs text-slate-500 mt-0.5">{total} casos publicados</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={fetchCases} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/7 bg-white/3 hover:bg-white/7 text-slate-400 text-xs font-bold">
                        <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold">
                        <Plus className="w-3.5 h-3.5" /> Nuevo caso
                    </button>
                </div>
            </header>

            <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 bg-[#111318] border border-white/7 rounded-xl px-3 py-2 max-w-md">
                    <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        placeholder="Buscar caso..." className="bg-transparent text-sm text-slate-200 placeholder-slate-600 outline-none w-full" />
                </div>

                <div className="bg-[#111318] border border-white/7 rounded-2xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/7">
                                {['Título', 'Plataforma', 'Slug', 'Video', ''].map((h) => (
                                    <th key={h} className="text-left text-[9px] font-black uppercase tracking-widest text-slate-600 px-4 py-3">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={5} className="text-center py-12 text-slate-600 text-sm">Cargando...</td></tr>
                            ) : cases.length === 0 ? (
                                <tr><td colSpan={5} className="text-center py-12 text-slate-600 text-sm">No hay casos</td></tr>
                            ) : cases.map((c) => (
                                <tr key={c._id} className="border-b border-white/5 hover:bg-white/2">
                                    <td className="px-4 py-3 text-sm font-medium text-slate-200 max-w-xs">
                                        <div className="line-clamp-1">{c.title}</div>
                                        <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">{c.summary}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {c.platform && (
                                            <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                                {c.platform}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-xs text-slate-500 font-mono">{c.slug || '—'}</td>
                                    <td className="px-4 py-3">
                                        {c.videoUrl
                                            ? <a href={c.videoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-indigo-400 hover:underline">
                                                <ExternalLink className="w-3 h-3" /> Ver
                                              </a>
                                            : <span className="text-xs text-slate-600">—</span>}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <button onClick={() => openEdit(c)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-white/7 bg-white/3 text-slate-500 hover:text-indigo-400 hover:border-indigo-500/30 transition-colors">
                                                <Edit2 className="w-3.5 h-3.5" />
                                            </button>
                                            <button onClick={() => handleDelete(c)} disabled={actionLoading === c._id}
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

export default AdminCasos;

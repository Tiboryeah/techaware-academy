import React, { useState, useEffect, useCallback } from 'react';
import { Search, RefreshCw, Edit2, X, Save } from 'lucide-react';
import api from '../../services/api';

const TYPE_COLORS = {
    article: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    video: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    guide: 'bg-green-500/10 text-green-400 border-green-500/20',
};

const AdminLecciones = () => {
    const [lessons, setLessons] = useState([]);
    const [courses, setCourses] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [courseFilter, setCourseFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [editing, setEditing] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null);

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchLessons = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/admin/lessons', {
                params: { page, limit: 20, search, courseId: courseFilter, type: typeFilter },
            });
            setLessons(data.lessons);
            setTotal(data.total);
            setPages(data.pages);
        } catch { showToast('Error al cargar lecciones', 'error'); }
        finally { setLoading(false); }
    }, [page, search, courseFilter, typeFilter]);

    useEffect(() => { fetchLessons(); }, [fetchLessons]);

    useEffect(() => {
        api.get('/api/admin/courses').then(({ data }) => setCourses(data)).catch(() => {});
    }, []);

    const startEdit = async (lesson) => {
        try {
            const { data } = await api.get(`/api/admin/lessons/${lesson._id}`);
            setEditing(lesson._id);
            setEditForm({ title: data.title, type: data.type, order: data.order, videoUrl: data.videoUrl ?? '', content: data.content ?? '' });
        } catch { showToast('Error al cargar lección', 'error'); }
    };

    const saveEdit = async () => {
        setSaving(true);
        try {
            await api.patch(`/api/admin/lessons/${editing}`, editForm);
            showToast('Lección actualizada');
            setEditing(null);
            fetchLessons();
        } catch { showToast('Error al guardar', 'error'); }
        finally { setSaving(false); }
    };

    return (
        <div className="flex-1 flex flex-col">
            {toast && (
                <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-bold shadow-xl
                    ${toast.type === 'error' ? 'bg-red-900/90 text-red-200' : 'bg-green-900/90 text-green-200'}`}>
                    {toast.msg}
                </div>
            )}

            {/* Edit modal */}
            {editing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-[#111318] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-5 border-b border-white/7">
                            <h2 className="font-black text-base">Editar lección</h2>
                            <button onClick={() => setEditing(null)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:text-white">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="p-5 space-y-4">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 block">Título</label>
                                <input value={editForm.title ?? ''} onChange={(e) => setEditForm(f => ({ ...f, title: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500/50" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 block">Tipo</label>
                                    <select value={editForm.type ?? ''} onChange={(e) => setEditForm(f => ({ ...f, type: e.target.value }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500/50">
                                        <option value="article">Artículo</option>
                                        <option value="video">Video</option>
                                        <option value="guide">Guía</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 block">Orden</label>
                                    <input type="number" value={editForm.order ?? ''} onChange={(e) => setEditForm(f => ({ ...f, order: Number(e.target.value) }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500/50" />
                                </div>
                            </div>
                            {editForm.type === 'video' && (
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 block">URL de video</label>
                                    <input value={editForm.videoUrl ?? ''} onChange={(e) => setEditForm(f => ({ ...f, videoUrl: e.target.value }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500/50" />
                                </div>
                            )}
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 block">Contenido (Markdown)</label>
                                <textarea value={editForm.content ?? ''} onChange={(e) => setEditForm(f => ({ ...f, content: e.target.value }))}
                                    rows={8} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500/50 resize-none font-mono" />
                            </div>
                            <div className="flex gap-3">
                                <button onClick={saveEdit} disabled={saving}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-colors">
                                    <Save className="w-4 h-4" />
                                    {saving ? 'Guardando...' : 'Guardar cambios'}
                                </button>
                                <button onClick={() => setEditing(null)}
                                    className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-400 text-sm font-bold hover:bg-white/5">
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b border-white/7 bg-[#0a0c10]/90 backdrop-blur-md">
                <div>
                    <h1 className="text-lg font-black">Lecciones</h1>
                    <p className="text-xs text-slate-500 mt-0.5">{total} lecciones totales</p>
                </div>
                <button onClick={fetchLessons} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/7 bg-white/3 hover:bg-white/7 text-slate-400 text-xs font-bold transition-all">
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                    Actualizar
                </button>
            </header>

            <div className="p-6 space-y-4">
                <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 bg-[#111318] border border-white/7 rounded-xl px-3 py-2 flex-1 min-w-48">
                        <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            placeholder="Buscar lección..." className="bg-transparent text-sm text-slate-200 placeholder-slate-600 outline-none w-full" />
                    </div>
                    <select value={courseFilter} onChange={(e) => { setCourseFilter(e.target.value); setPage(1); }}
                        className="bg-[#111318] border border-white/7 rounded-xl px-3 py-2 text-sm text-slate-400 outline-none">
                        <option value="">Todos los cursos</option>
                        {courses.map((c) => <option key={c._id} value={c._id}>{c.title}</option>)}
                    </select>
                    <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
                        className="bg-[#111318] border border-white/7 rounded-xl px-3 py-2 text-sm text-slate-400 outline-none">
                        <option value="">Todos los tipos</option>
                        <option value="article">Artículo</option>
                        <option value="video">Video</option>
                        <option value="guide">Guía</option>
                    </select>
                </div>

                <div className="bg-[#111318] border border-white/7 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/7">
                                    {['Título', 'Tipo', 'Módulo', 'Orden', ''].map((h) => (
                                        <th key={h} className="text-left text-[9px] font-black uppercase tracking-widest text-slate-600 px-4 py-3">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={5} className="text-center py-12 text-slate-600 text-sm">Cargando...</td></tr>
                                ) : lessons.map((l) => (
                                    <tr key={l._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                                        <td className="px-4 py-3 text-sm font-medium text-slate-200 max-w-xs">
                                            <div className="line-clamp-1">{l.title}</div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${TYPE_COLORS[l.type] ?? 'bg-white/5 text-slate-500 border-white/10'}`}>
                                                {l.type}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-slate-500 max-w-xs">
                                            <div className="line-clamp-1">{l.moduleId?.title ?? '—'}</div>
                                        </td>
                                        <td className="px-4 py-3 text-sm font-black text-slate-400">{l.order}</td>
                                        <td className="px-4 py-3 text-right">
                                            <button onClick={() => startEdit(l)}
                                                className="w-7 h-7 flex items-center justify-center rounded-lg border border-white/7 bg-white/3 text-slate-500 hover:text-indigo-400 hover:border-indigo-500/30 transition-colors ml-auto">
                                                <Edit2 className="w-3.5 h-3.5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {pages > 1 && (
                        <div className="flex items-center justify-between px-4 py-3 border-t border-white/7">
                            <span className="text-xs text-slate-500">Página {page} de {pages}</span>
                            <div className="flex gap-2">
                                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                                    className="px-3 py-1.5 rounded-lg border border-white/7 text-xs font-bold text-slate-400 hover:bg-white/5 disabled:opacity-30">← Anterior</button>
                                <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}
                                    className="px-3 py-1.5 rounded-lg border border-white/7 text-xs font-bold text-slate-400 hover:bg-white/5 disabled:opacity-30">Siguiente →</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminLecciones;

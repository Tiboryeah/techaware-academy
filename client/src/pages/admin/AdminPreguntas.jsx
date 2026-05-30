import React, { useState, useEffect, useCallback } from 'react';
import { Search, RefreshCw, Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import api from '../../services/api';

const BLANK_FORM = {
    prompt: '', type: 'multiple_choice', options: ['', '', '', ''], correctAnswer: '',
    riskArea: '', platform: '', difficulty: 'medium', explanation: '',
};

const AdminPreguntas = () => {
    const [questions, setQuestions] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [modal, setModal] = useState(null); // null | 'create' | 'edit'
    const [form, setForm] = useState(BLANK_FORM);
    const [editId, setEditId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [actionLoading, setActionLoading] = useState(null);
    const [toast, setToast] = useState(null);

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchQuestions = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/admin/questions', {
                params: { page, limit: 20, search, type: typeFilter },
            });
            setQuestions(data.questions);
            setTotal(data.total);
            setPages(data.pages);
        } catch { showToast('Error al cargar preguntas', 'error'); }
        finally { setLoading(false); }
    }, [page, search, typeFilter]);

    useEffect(() => { fetchQuestions(); }, [fetchQuestions]);

    const openCreate = () => {
        setForm(BLANK_FORM);
        setEditId(null);
        setModal('create');
    };

    const openEdit = (q) => {
        setForm({
            prompt: q.prompt,
            type: q.type,
            options: q.options ?? ['', '', '', ''],
            correctAnswer: q.correctAnswer,
            riskArea: q.riskArea ?? '',
            platform: q.platform ?? '',
            difficulty: q.difficulty ?? 'medium',
            explanation: q.explanation ?? '',
        });
        setEditId(q._id);
        setModal('edit');
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (modal === 'create') {
                await api.post('/api/admin/questions', form);
                showToast('Pregunta creada');
            } else {
                await api.patch(`/api/admin/questions/${editId}`, form);
                showToast('Pregunta actualizada');
            }
            setModal(null);
            fetchQuestions();
        } catch (err) {
            showToast(err?.response?.data?.message || 'Error al guardar', 'error');
        } finally { setSaving(false); }
    };

    const handleDelete = async (q) => {
        if (!window.confirm(`¿Eliminar la pregunta "${q.prompt.substring(0, 60)}..."?`)) return;
        setActionLoading(q._id);
        try {
            await api.delete(`/api/admin/questions/${q._id}`);
            showToast('Pregunta eliminada');
            fetchQuestions();
        } catch { showToast('Error al eliminar', 'error'); }
        finally { setActionLoading(null); }
    };

    const setOption = (idx, val) => setForm(f => {
        const opts = [...(f.options ?? [])];
        opts[idx] = val;
        return { ...f, options: opts };
    });

    const showOptions = ['multiple_choice', 'true_false', 'ordering', 'fill_blank'].includes(form.type);

    return (
        <div className="flex-1 flex flex-col">
            {toast && (
                <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-bold shadow-xl
                    ${toast.type === 'error' ? 'bg-red-900/90 text-red-200' : 'bg-green-900/90 text-green-200'}`}>
                    {toast.msg}
                </div>
            )}

            {/* Modal */}
            {modal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-[#111318] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-5 border-b border-white/7">
                            <h2 className="font-black text-base">{modal === 'create' ? 'Nueva pregunta' : 'Editar pregunta'}</h2>
                            <button onClick={() => setModal(null)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:text-white">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="p-5 space-y-4">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 block">Enunciado</label>
                                <textarea value={form.prompt} onChange={(e) => setForm(f => ({ ...f, prompt: e.target.value }))}
                                    rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500/50 resize-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 block">Tipo</label>
                                    <select value={form.type} onChange={(e) => setForm(f => ({ ...f, type: e.target.value }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none">
                                        {['multiple_choice', 'true_false', 'ordering', 'fill_blank', 'image_choice',
                                          'scenario', 'risk_rating', 'drag_drop', 'hotspot', 'open_reflection'].map((t) => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 block">Dificultad</label>
                                    <select value={form.difficulty} onChange={(e) => setForm(f => ({ ...f, difficulty: e.target.value }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none">
                                        <option value="easy">Fácil</option>
                                        <option value="medium">Medio</option>
                                        <option value="hard">Difícil</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 block">Área de riesgo</label>
                                    <input value={form.riskArea} onChange={(e) => setForm(f => ({ ...f, riskArea: e.target.value }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 block">Plataforma</label>
                                    <input value={form.platform} onChange={(e) => setForm(f => ({ ...f, platform: e.target.value }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none" />
                                </div>
                            </div>
                            {showOptions && (
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 block">Opciones</label>
                                    <div className="space-y-2">
                                        {(form.options ?? []).map((opt, i) => (
                                            <input key={i} value={opt} onChange={(e) => setOption(i, e.target.value)}
                                                placeholder={`Opción ${i + 1}`}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-200 outline-none focus:border-indigo-500/50" />
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 block">Respuesta correcta</label>
                                <input value={form.correctAnswer} onChange={(e) => setForm(f => ({ ...f, correctAnswer: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500/50" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 block">Explicación</label>
                                <textarea value={form.explanation} onChange={(e) => setForm(f => ({ ...f, explanation: e.target.value }))}
                                    rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none resize-none" />
                            </div>
                            <div className="flex gap-3">
                                <button onClick={handleSave} disabled={saving}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-colors">
                                    <Save className="w-4 h-4" />
                                    {saving ? 'Guardando...' : 'Guardar'}
                                </button>
                                <button onClick={() => setModal(null)} className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-400 text-sm font-bold hover:bg-white/5">
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b border-white/7 bg-[#0a0c10]/90 backdrop-blur-md">
                <div>
                    <h1 className="text-lg font-black">Banco de preguntas</h1>
                    <p className="text-xs text-slate-500 mt-0.5">{total} preguntas</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={fetchQuestions} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/7 bg-white/3 hover:bg-white/7 text-slate-400 text-xs font-bold transition-all">
                        <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors">
                        <Plus className="w-3.5 h-3.5" /> Nueva pregunta
                    </button>
                </div>
            </header>

            <div className="p-6 space-y-4">
                <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 bg-[#111318] border border-white/7 rounded-xl px-3 py-2 flex-1 min-w-48">
                        <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            placeholder="Buscar por enunciado..." className="bg-transparent text-sm text-slate-200 placeholder-slate-600 outline-none w-full" />
                    </div>
                    <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
                        className="bg-[#111318] border border-white/7 rounded-xl px-3 py-2 text-sm text-slate-400 outline-none">
                        <option value="">Todos los tipos</option>
                        {['multiple_choice', 'true_false', 'ordering', 'fill_blank', 'image_choice',
                          'scenario', 'risk_rating', 'drag_drop', 'hotspot', 'open_reflection'].map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>

                <div className="bg-[#111318] border border-white/7 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/7">
                                    {['Enunciado', 'Tipo', 'Plataforma', 'Dificultad', 'Tasa error', ''].map((h) => (
                                        <th key={h} className="text-left text-[9px] font-black uppercase tracking-widest text-slate-600 px-4 py-3">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={6} className="text-center py-12 text-slate-600 text-sm">Cargando...</td></tr>
                                ) : questions.map((q) => (
                                    <tr key={q._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                                        <td className="px-4 py-3 text-sm text-slate-300 max-w-xs">
                                            <div className="line-clamp-2">{q.prompt}</div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10">
                                                {q.type}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-slate-500">{q.platform || '—'}</td>
                                        <td className="px-4 py-3">
                                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border
                                                ${q.difficulty === 'hard' ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                                : q.difficulty === 'easy' ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                                                {q.difficulty}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm font-bold">
                                            {q.failRate !== null
                                                ? <span className={q.failRate > 60 ? 'text-red-400' : q.failRate > 30 ? 'text-amber-400' : 'text-green-400'}>
                                                    {q.failRate}%
                                                  </span>
                                                : <span className="text-slate-600">—</span>}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <button onClick={() => openEdit(q)}
                                                    className="w-7 h-7 flex items-center justify-center rounded-lg border border-white/7 bg-white/3 text-slate-500 hover:text-indigo-400 hover:border-indigo-500/30 transition-colors">
                                                    <Edit2 className="w-3.5 h-3.5" />
                                                </button>
                                                <button onClick={() => handleDelete(q)} disabled={actionLoading === q._id}
                                                    className="w-7 h-7 flex items-center justify-center rounded-lg border border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500/15 transition-colors">
                                                    {actionLoading === q._id
                                                        ? <div className="w-3 h-3 border-2 border-red-700 border-t-red-400 rounded-full animate-spin" />
                                                        : <Trash2 className="w-3.5 h-3.5" />}
                                                </button>
                                            </div>
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

export default AdminPreguntas;

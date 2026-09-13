import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, RefreshCw, Edit2, X, FileText, Video, BookOpen, Filter } from 'lucide-react';
import api from '../../services/api';

const TYPE_META = {
    article: { label: 'Artículo', icon: FileText, color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/10', activeBg: 'bg-blue-500/20' },
    video:   { label: 'Video',    icon: Video,    color: 'text-violet-400', border: 'border-violet-500/30', bg: 'bg-violet-500/10', activeBg: 'bg-violet-500/20' },
    guide:   { label: 'Guía',     icon: BookOpen, color: 'text-green-400', border: 'border-green-500/30', bg: 'bg-green-500/10', activeBg: 'bg-green-500/20' },
};

const AdminLecciones = () => {
    const navigate = useNavigate();
    const [lessons, setLessons] = useState([]);
    const [courses, setCourses] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [courseFilter, setCourseFilter] = useState('');
    const [moduleFilter, setModuleFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [toast, setToast] = useState(null);

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const openEditor = (lesson) => navigate(`/admin/lecciones/${lesson._id}`);

    const fetchLessons = useCallback(async () => {
        setLoading(true);
        try {
            const params = { page, limit: 25, search, type: typeFilter };
            if (moduleFilter) params.moduleId = moduleFilter;
            else if (courseFilter) params.courseId = courseFilter;
            const { data } = await api.get('/api/admin/lessons', { params });
            setLessons(data.lessons);
            setTotal(data.total);
            setPages(data.pages);
        } catch { showToast('Error al cargar lecciones', 'error'); }
        finally { setLoading(false); }
    }, [page, search, courseFilter, moduleFilter, typeFilter]);

    useEffect(() => { fetchLessons(); }, [fetchLessons]);

    useEffect(() => {
        api.get('/api/admin/courses').then(({ data }) => setCourses(data)).catch(() => {});
    }, []);

    // Modules of selected course
    const selectedCourse = courses.find(c => c._id === courseFilter);
    const modules = selectedCourse?.modules ?? [];

    const handleCourseFilter = (id) => {
        setCourseFilter(id);
        setModuleFilter('');
        setPage(1);
    };

    const handleModuleFilter = (id) => {
        setModuleFilter(id);
        setPage(1);
    };

    const handleTypeFilter = (val) => {
        setTypeFilter(val);
        setPage(1);
    };

    const clearFilters = () => {
        setCourseFilter('');
        setModuleFilter('');
        setTypeFilter('');
        setSearch('');
        setPage(1);
    };

    const hasFilters = courseFilter || moduleFilter || typeFilter || search;

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {toast && (
                <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-bold shadow-xl
                    ${toast.type === 'error' ? 'bg-red-900/90 text-red-200' : 'bg-green-900/90 text-green-200'}`}>
                    {toast.msg}
                </div>
            )}

            {/* ── HEADER ── */}
            <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b border-white/7 bg-[#0a0c10]/90 backdrop-blur-md flex-shrink-0">
                <div>
                    <h1 className="text-lg font-black">Lecciones</h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                        {total} {hasFilters ? 'resultados' : 'lecciones totales'}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {hasFilters && (
                        <button onClick={clearFilters}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-bold hover:bg-amber-500/10 transition-all">
                            <X className="w-3 h-3" /> Limpiar filtros
                        </button>
                    )}
                    <button onClick={fetchLessons}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/7 bg-white/3 hover:bg-white/7 text-slate-400 text-xs font-bold transition-all">
                        <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                        Actualizar
                    </button>
                </div>
            </header>

            {/* ── FILTER BAR ── */}
            <div className="border-b border-white/7 bg-[#0d0f14] flex-shrink-0">

                {/* Search + type pills */}
                <div className="flex items-center gap-4 px-6 py-3 border-b border-white/5">
                    {/* Search */}
                    <div className="flex items-center gap-2 bg-white/5 border border-white/7 rounded-xl px-3 py-2 w-72 flex-shrink-0">
                        <Search className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                        <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            placeholder="Buscar lección..."
                            className="bg-transparent text-sm text-slate-200 placeholder-slate-600 outline-none w-full" />
                        {search && (
                            <button onClick={() => { setSearch(''); setPage(1); }}>
                                <X className="w-3 h-3 text-slate-500 hover:text-slate-300" />
                            </button>
                        )}
                    </div>

                    {/* Type pills */}
                    <div className="flex items-center gap-1">
                        <div className="flex items-center gap-1 mr-1 text-[10px] font-black uppercase tracking-widest text-slate-600">
                            <Filter className="w-3 h-3" /> Tipo:
                        </div>
                        {/* All */}
                        <button
                            onClick={() => handleTypeFilter('')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all
                                ${!typeFilter
                                    ? 'bg-white/10 text-slate-200 border-white/20'
                                    : 'bg-transparent text-slate-500 border-white/7 hover:bg-white/5 hover:text-slate-300'}`}>
                            Todos
                        </button>
                        {Object.entries(TYPE_META).map(([key, meta]) => {
                            const Icon = meta.icon;
                            const active = typeFilter === key;
                            return (
                                <button key={key} onClick={() => handleTypeFilter(key)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all
                                        ${active
                                            ? `${meta.activeBg} ${meta.color} ${meta.border}`
                                            : `bg-transparent text-slate-500 border-white/7 hover:${meta.bg} hover:${meta.color}`}`}>
                                    <Icon className="w-3 h-3" />
                                    {meta.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Course pills */}
                <div className="px-6 py-2.5 flex items-center gap-2 overflow-x-auto">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 flex-shrink-0 flex items-center gap-1">
                        <BookOpen className="w-3 h-3" /> Curso:
                    </span>
                    <button
                        onClick={() => handleCourseFilter('')}
                        className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all
                            ${!courseFilter
                                ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25'
                                : 'bg-transparent text-slate-500 border-white/7 hover:bg-white/5 hover:text-slate-300'}`}>
                        Todos los cursos
                    </button>
                    {courses.map((c) => (
                        <button key={c._id} onClick={() => handleCourseFilter(c._id)}
                            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all
                                ${courseFilter === c._id
                                    ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25'
                                    : 'bg-transparent text-slate-500 border-white/7 hover:bg-white/5 hover:text-slate-300'}`}>
                            {c.title}
                            <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-white/5">
                                {c.lessonCount ?? '—'}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Module pills — only when course is selected */}
                {courseFilter && modules.length > 0 && (
                    <div className="px-6 py-2.5 flex items-center gap-2 overflow-x-auto border-t border-white/5 bg-white/1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 flex-shrink-0">
                            Módulo:
                        </span>
                        <button
                            onClick={() => handleModuleFilter('')}
                            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all
                                ${!moduleFilter
                                    ? 'bg-violet-500/15 text-violet-300 border-violet-500/25'
                                    : 'bg-transparent text-slate-500 border-white/7 hover:bg-white/5 hover:text-slate-300'}`}>
                            Todos los módulos
                        </button>
                        {modules.map((m, i) => (
                            <button key={m._id} onClick={() => handleModuleFilter(m._id)}
                                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all
                                    ${moduleFilter === m._id
                                        ? 'bg-violet-500/15 text-violet-300 border-violet-500/25'
                                        : 'bg-transparent text-slate-500 border-white/7 hover:bg-white/5 hover:text-slate-300'}`}>
                                <span className="w-4 h-4 rounded bg-white/5 flex items-center justify-center text-[9px] font-black">{i + 1}</span>
                                {m.title}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* ── TABLE ── */}
            <div className="flex-1 overflow-auto">
                <table className="w-full">
                    <thead className="sticky top-0 bg-[#0d0f14] z-10">
                        <tr className="border-b border-white/7">
                            <th className="text-left text-[9px] font-black uppercase tracking-widest text-slate-600 px-5 py-3 w-12">#</th>
                            <th className="text-left text-[9px] font-black uppercase tracking-widest text-slate-600 px-4 py-3">Lección</th>
                            <th className="text-left text-[9px] font-black uppercase tracking-widest text-slate-600 px-4 py-3 w-24">Tipo</th>
                            <th className="text-left text-[9px] font-black uppercase tracking-widest text-slate-600 px-4 py-3">Módulo</th>
                            <th className="text-right text-[9px] font-black uppercase tracking-widest text-slate-600 px-4 py-3 w-16"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} className="text-center py-20 text-slate-600 text-sm">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-6 h-6 border-2 border-indigo-900 border-t-indigo-500 rounded-full animate-spin" />
                                    Cargando lecciones...
                                </div>
                            </td></tr>
                        ) : lessons.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-20 text-slate-600 text-sm">
                                No se encontraron lecciones con los filtros actuales
                            </td></tr>
                        ) : lessons.map((l, i) => {
                            const meta = TYPE_META[l.type];
                            const Icon = meta?.icon ?? FileText;
                            return (
                                <tr key={l._id} className="border-b border-white/5 hover:bg-white/2 transition-colors group">
                                    <td className="px-5 py-3 text-xs font-black text-slate-600">
                                        {(page - 1) * 25 + i + 1}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="font-medium text-slate-200 text-sm leading-tight">{l.title}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-lg border ${meta?.bg} ${meta?.color} ${meta?.border}`}>
                                            <Icon className="w-2.5 h-2.5" />
                                            {meta?.label ?? l.type}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-slate-500 max-w-xs">
                                        <div className="line-clamp-1">{l.moduleId?.title ?? '—'}</div>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <button onClick={() => openEditor(l)}
                                            className="w-7 h-7 flex items-center justify-center rounded-lg border border-white/7 bg-white/3 text-slate-500 hover:text-indigo-400 hover:border-indigo-500/30 transition-colors ml-auto opacity-0 group-hover:opacity-100">
                                            <Edit2 className="w-3.5 h-3.5" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* ── PAGINATION ── */}
            {pages > 1 && (
                <div className="flex items-center justify-between px-5 py-3 border-t border-white/7 bg-[#0d0f14] flex-shrink-0">
                    <span className="text-xs text-slate-500">{total} lecciones · Página {page} de {pages}</span>
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
    );
};

export default AdminLecciones;

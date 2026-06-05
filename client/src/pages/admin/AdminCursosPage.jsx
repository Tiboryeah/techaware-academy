import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Save, RefreshCw, ChevronRight, ChevronDown, Plus, Edit2,
    Trash2, X, Bold, Italic, Link, Image, List, Quote,
    Code, Heading2, Heading3, FileText, Video, BookOpen, GripVertical
} from 'lucide-react';
import api from '../../services/api';
import { renderMarkdown } from '../../utils/renderMarkdown';

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const TYPE_META = {
    article: { label: 'Artículo', icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/25', chip: 'bg-blue-500/15 text-blue-300 border-blue-500/30' },
    video:   { label: 'Video',    icon: Video,    color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/25', chip: 'bg-violet-500/15 text-violet-300 border-violet-500/30' },
    guide:   { label: 'Guía',     icon: BookOpen, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/25', chip: 'bg-green-500/15 text-green-300 border-green-500/30' },
};

const COURSE_ACCENTS = [
    { tag: 'Redes Sociales', tagColor: 'bg-violet-500/15 text-violet-300 border-violet-500/25', banner: 'from-[#130e1c] to-[#0f0e1a]' },
    { tag: 'Streaming',      tagColor: 'bg-red-500/15 text-red-300 border-red-500/25',          banner: 'from-[#0f1520] to-[#1a1028]' },
    { tag: 'Videojuegos',    tagColor: 'bg-green-500/15 text-green-300 border-green-500/25',     banner: 'from-[#150b1f] to-[#1f0f28]' },
];

/* ─────────────────────────────────────────────
   TOOLBAR
───────────────────────────────────────────── */
const TbBtn = ({ icon: Icon, label, onClick, text }) => (
    <button title={label} onClick={onClick}
        className="h-7 px-2 flex items-center justify-center rounded-md text-slate-500 hover:text-slate-200 hover:bg-white/8 transition-colors">
        {Icon ? <Icon className="w-3.5 h-3.5" /> : <span className="text-[11px] font-black">{text}</span>}
    </button>
);
const TbSep = () => <div className="w-px h-4 bg-white/10 mx-0.5 self-center" />;

/* ─────────────────────────────────────────────
   MODAL helpers
───────────────────────────────────────────── */
const Modal = ({ title, onClose, children }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="bg-[#111318] border border-white/10 rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-white/7">
                <h2 className="font-black text-sm">{title}</h2>
                <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:text-white">
                    <X className="w-3.5 h-3.5" />
                </button>
            </div>
            <div className="p-5">{children}</div>
        </div>
    </div>
);

const Field = ({ label, children }) => (
    <div className="space-y-1.5 mb-4">
        <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 block">{label}</label>
        {children}
    </div>
);

const Input = (props) => (
    <input {...props} className={`w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500/50 ${props.className ?? ''}`} />
);

const Textarea = (props) => (
    <textarea {...props} className={`w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500/50 resize-none ${props.className ?? ''}`} />
);

/* ─────────────────────────────────────────────
   TOAST
───────────────────────────────────────────── */
let _setToastGlobal = null;
const Toast = () => {
    const [toast, setToast] = useState(null);
    useEffect(() => {
        _setToastGlobal = (msg, type = 'success') => {
            setToast({ msg, type });
            setTimeout(() => setToast(null), 3000);
        };
        return () => { _setToastGlobal = null; };
    }, []);
    if (!toast) return null;
    return (
        <div className={`fixed top-4 right-4 z-[60] px-4 py-3 rounded-xl text-sm font-bold shadow-xl
            ${toast.type === 'error' ? 'bg-red-900/90 text-red-200' : 'bg-green-900/90 text-green-200'}`}>
            {toast.msg}
        </div>
    );
};
const showToast = (msg, type) => _setToastGlobal?.(msg, type);

/* ─────────────────────────────────────────────
   INSERT FORMAT (shared with editor)
───────────────────────────────────────────── */
function insertFormat(type, taRef, content, setContent) {
    const ta = taRef.current;
    if (!ta) return;
    const s = ta.selectionStart, e = ta.selectionEnd;
    const sel = content.slice(s, e);
    const before = content.slice(0, s), after = content.slice(e);
    let ins = '', cur = 0;
    switch (type) {
        case 'bold':   ins = `**${sel || 'texto'}**`; cur = sel ? s + ins.length : s + 2; break;
        case 'italic': ins = `*${sel || 'texto'}*`;   cur = sel ? s + ins.length : s + 1; break;
        case 'h2':     ins = `\n## ${sel || 'Subtítulo'}\n`; cur = s + ins.length; break;
        case 'h3':     ins = `\n### ${sel || 'Sección'}\n`; cur = s + ins.length; break;
        case 'link':   { const u = window.prompt('URL:'); if (!u) return; ins = `[${sel || 'texto'}](${u})`; cur = s + ins.length; break; }
        case 'image':  { const u = window.prompt('URL de imagen:'); if (!u) return; ins = `\n![alt](${u})\n`; cur = s + ins.length; break; }
        case 'list':   ins = `\n- ${sel || 'elemento'}\n`; cur = s + ins.length; break;
        case 'quote':  ins = `\n> ${sel || 'nota'}\n`; cur = s + ins.length; break;
        case 'code':   ins = sel.includes('\n') ? `\n\`\`\`\n${sel}\n\`\`\`\n` : `\`${sel || 'código'}\``; cur = s + ins.length; break;
        default: return;
    }
    const newVal = before + ins + after;
    setContent(newVal);
    requestAnimationFrame(() => { ta.focus(); ta.setSelectionRange(cur, cur); });
}

/* ═══════════════════════════════════════════
   COURSE LIST VIEW
═══════════════════════════════════════════ */
const CourseListView = ({ courses, loading, onRefresh, onNavigateModule, onNavigateCourse, onCourseCreated, onCourseUpdated, onModuleCreated, onModuleDeleted, onLessonCreated }) => {
    const [expandedCourses, setExpandedCourses] = useState({});
    const [modal, setModal] = useState(null); // {type: 'course'|'module'|'lesson', courseId?, moduleId?}
    const [form, setForm] = useState({});
    const [saving, setSaving] = useState(false);
    const [addingLesson, setAddingLesson] = useState(null); // moduleId

    const toggleCourse = (id) => setExpandedCourses(p => ({ ...p, [id]: !p[id] }));

    const openModal = (type, extra = {}) => {
        setForm({});
        setModal({ type, ...extra });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (modal.type === 'course') {
                if (!form.title) { showToast('El título es requerido', 'error'); return; }
                if (modal.courseId) {
                    await api.patch(`/api/admin/courses/${modal.courseId}`, form);
                    showToast('Curso actualizado');
                    onCourseUpdated();
                } else {
                    await api.post('/api/admin/courses', form);
                    showToast('Curso creado');
                    onCourseCreated();
                }
            } else if (modal.type === 'module') {
                if (!form.title) { showToast('El título es requerido', 'error'); return; }
                await api.post('/api/admin/modules', { courseId: modal.courseId, ...form });
                showToast('Módulo creado');
                onModuleCreated();
            }
            setModal(null);
        } catch (err) {
            showToast(err?.response?.data?.message || 'Error al guardar', 'error');
        } finally { setSaving(false); }
    };

    const handleDeleteModule = async (moduleId, moduleTitle) => {
        if (!window.confirm(`¿Eliminar el módulo "${moduleTitle}" y todas sus lecciones?`)) return;
        try {
            await api.delete(`/api/admin/modules/${moduleId}`);
            showToast('Módulo eliminado');
            onModuleDeleted();
        } catch { showToast('Error al eliminar módulo', 'error'); }
    };

    const handleAddLesson = async (moduleId, courseId, type) => {
        try {
            const title = type === 'video' ? 'Nuevo video' : type === 'guide' ? 'Nueva guía' : 'Nuevo artículo';
            const { data } = await api.post('/api/admin/lessons', { title, type, moduleId, courseId });
            showToast('Lección creada — redirigiendo al editor...');
            onLessonCreated(data.lesson._id);
        } catch { showToast('Error al crear lección', 'error'); }
    };

    if (loading) return (
        <div className="flex-1 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-indigo-900 border-t-indigo-500 rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Modal */}
            {modal && (
                <Modal title={modal.type === 'course' ? (modal.courseId ? 'Editar curso' : 'Nuevo curso') : 'Nuevo módulo'} onClose={() => setModal(null)}>
                    <Field label="Título">
                        <Input value={form.title ?? ''} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Título..." />
                    </Field>
                    <Field label="Descripción">
                        <Textarea rows={3} value={form.description ?? ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Descripción breve..." />
                    </Field>
                    <div className="flex gap-3 mt-2">
                        <button onClick={handleSave} disabled={saving}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-colors">
                            <Save className="w-4 h-4" />{saving ? 'Guardando...' : 'Guardar'}
                        </button>
                        <button onClick={() => setModal(null)} className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-400 text-sm font-bold hover:bg-white/5">
                            Cancelar
                        </button>
                    </div>
                </Modal>
            )}

            {/* Topbar */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-white/7 bg-[#0a0c10]/90 backdrop-blur-md flex-shrink-0">
                <div>
                    <h1 className="text-lg font-black">Cursos y módulos</h1>
                    <p className="text-xs text-slate-500 mt-0.5">{courses.length} cursos · {courses.reduce((a, c) => a + (c.modules?.length ?? 0), 0)} módulos · {courses.reduce((a, c) => a + (c.lessonCount ?? 0), 0)} lecciones</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={onRefresh} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/7 bg-white/3 hover:bg-white/7 text-slate-400 text-xs font-bold transition-all">
                        <RefreshCw className="w-3.5 h-3.5" /> Actualizar
                    </button>
                    <button onClick={() => openModal('course')}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20">
                        <Plus className="w-3.5 h-3.5" /> Nuevo curso
                    </button>
                </div>
            </header>

            {/* Course list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {courses.map((course, ci) => {
                    const accent = COURSE_ACCENTS[ci % COURSE_ACCENTS.length];
                    const isOpen = expandedCourses[course._id] !== false; // open by default

                    return (
                        <div key={course._id} className="rounded-2xl overflow-hidden border border-white/7">
                            {/* Course banner */}
                            <div className={`relative bg-gradient-to-br ${accent.banner} p-5 overflow-hidden`}>
                                {/* Course image */}
                                {course.image && (
                                    <img src={course.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.18] saturate-50 brightness-75" draggable={false} />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

                                <div className="relative z-10 flex items-start gap-4">
                                    <div className="flex-1 min-w-0">
                                        <span className={`inline-flex text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border mb-2 ${accent.tagColor}`}>
                                            {accent.tag}
                                        </span>
                                        <h2 className="text-lg font-black text-white leading-tight">{course.title}</h2>
                                        <p className="text-xs text-white/40 mt-1 line-clamp-2">{course.description}</p>
                                        <div className="flex items-center gap-4 mt-2 text-[10px] text-white/30 font-bold">
                                            <span>📦 {course.modules?.length ?? 0} módulos</span>
                                            <span>📝 {course.lessonCount ?? 0} lecciones</span>
                                            <span>👥 {course.enrolledCount ?? 0} usuarios</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <button onClick={() => onNavigateCourse(course._id)}
                                            title="Editar curso"
                                            className="w-8 h-8 rounded-lg border border-white/15 bg-white/8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 transition-all">
                                            <Edit2 className="w-3.5 h-3.5" />
                                        </button>
                                        <button onClick={() => toggleCourse(course._id)}
                                            className="w-8 h-8 rounded-lg border border-white/15 bg-white/8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 transition-all">
                                            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Module list */}
                            {isOpen && (
                                <div className="bg-[#111318]">
                                    <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/5">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">Módulos del curso</span>
                                        <button onClick={() => openModal('module', { courseId: course._id })}
                                            className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 bg-indigo-500/6 hover:bg-indigo-500/12 px-2.5 py-1 rounded-lg transition-all">
                                            <Plus className="w-3 h-3" /> Agregar módulo
                                        </button>
                                    </div>

                                    {(course.modules ?? []).map((mod, mi) => (
                                        <div key={mod._id}>
                                            <div className="flex items-center gap-3 px-5 py-2.5 border-b border-white/4 hover:bg-white/2 transition-colors group">
                                                <GripVertical className="w-3.5 h-3.5 text-slate-700 cursor-grab flex-shrink-0" />
                                                <div className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center text-[9px] font-black text-slate-600 flex-shrink-0">{mi + 1}</div>
                                                <span className="flex-1 text-sm font-medium text-slate-400 group-hover:text-slate-200 transition-colors truncate">{mod.title}</span>

                                                {/* Lesson type dots */}
                                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                                    {mod.lessonOrder?.length > 0 && (
                                                        <div className="flex gap-1">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" title="Artículos" />
                                                            <div className="w-1.5 h-1.5 rounded-full bg-violet-500/50" title="Videos" />
                                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" title="Guías" />
                                                        </div>
                                                    )}
                                                    <span className="text-[10px] text-slate-600 font-bold w-10 text-right">{mod.lessonOrder?.length ?? 0} lec.</span>
                                                </div>

                                                {/* Actions — visible on hover */}
                                                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                                    <button onClick={() => onNavigateModule(mod._id)}
                                                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-white/10 bg-white/4 hover:border-indigo-500/30 hover:bg-indigo-500/8 text-slate-500 hover:text-indigo-300 text-[10px] font-bold transition-all">
                                                        <Edit2 className="w-2.5 h-2.5" /> Editar
                                                    </button>
                                                    <div className="relative group/add">
                                                        <button onClick={() => setAddingLesson(addingLesson === mod._id ? null : mod._id)}
                                                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-white/10 bg-white/4 hover:border-green-500/30 hover:bg-green-500/6 text-slate-500 hover:text-green-300 text-[10px] font-bold transition-all">
                                                            <Plus className="w-2.5 h-2.5" /> Lección
                                                        </button>
                                                    </div>
                                                    <button onClick={() => handleDeleteModule(mod._id, mod.title)}
                                                        className="w-6 h-6 flex items-center justify-center rounded-lg border border-red-500/15 bg-red-500/5 text-red-600 hover:text-red-400 hover:bg-red-500/12 transition-all">
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Add lesson panel */}
                                            {addingLesson === mod._id && (
                                                <div className="flex items-center gap-3 px-14 py-2.5 bg-white/2 border-b border-white/4">
                                                    <span className="text-[10px] text-slate-600 font-bold">Tipo:</span>
                                                    {Object.entries(TYPE_META).map(([key, meta]) => {
                                                        const Icon = meta.icon;
                                                        return (
                                                            <button key={key}
                                                                onClick={() => { handleAddLesson(mod._id, course._id, key); setAddingLesson(null); }}
                                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all ${meta.bg} ${meta.color} ${meta.border} hover:opacity-80`}>
                                                                <Icon className="w-3 h-3" />{meta.label}
                                                            </button>
                                                        );
                                                    })}
                                                    <button onClick={() => setAddingLesson(null)} className="ml-auto text-slate-600 hover:text-slate-400">
                                                        <X className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}

                <div className="flex items-center justify-center gap-4 py-4 text-[10px] text-slate-700 font-semibold">
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500/40" /> Artículo</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-violet-500/40" /> Video</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500/40" /> Guía</div>
                    <div className="ml-4 flex items-center gap-1"><GripVertical className="w-3 h-3" /> Arrastra para reordenar módulos</div>
                </div>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════
   MODULE EDITOR VIEW
═══════════════════════════════════════════ */
const ModuleEditorView = ({ moduleId, courses, onRefreshCourses }) => {
    const navigate = useNavigate();
    const taRef = useRef(null);

    const [mod, setMod] = useState(null);
    const [form, setForm] = useState({ title: '', description: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(true);
    const [lessonsOpen, setLessonsOpen] = useState(true);
    const [expandedCourses, setExpandedCourses] = useState({});

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const { data } = await api.get(`/api/admin/modules/${moduleId}`);
                setMod(data);
                setForm({ title: data.title ?? '', description: data.description ?? '' });
                setSaved(true);
            } catch { showToast('No se pudo cargar el módulo', 'error'); }
            finally { setLoading(false); }
        };
        load();
    }, [moduleId]);

    // Auto-expand the course that contains this module
    useEffect(() => {
        if (!mod || !courses.length) return;
        const course = courses.find(c => c.modules?.some(m => m._id === moduleId));
        if (course) setExpandedCourses(p => ({ ...p, [course._id]: true }));
    }, [mod, courses, moduleId]);

    const setField = (key, val) => {
        setForm(f => ({ ...f, [key]: val }));
        setSaved(false);
    };

    const handleSave = useCallback(async () => {
        setSaving(true);
        try {
            await api.patch(`/api/admin/modules/${moduleId}`, form);
            setSaved(true);
            showToast('Módulo guardado');
            onRefreshCourses();
        } catch { showToast('Error al guardar', 'error'); }
        finally { setSaving(false); }
    }, [moduleId, form, onRefreshCourses]);

    useEffect(() => {
        const onKey = (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); handleSave(); } };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [handleSave]);

    const handleInsert = (type) => insertFormat(type, taRef, form.description, (v) => setField('description', v));

    const wordCount = useMemo(() => (form.description || '').trim().split(/\s+/).filter(Boolean).length, [form.description]);
    const previewHtml = useMemo(() => renderMarkdown(form.description), [form.description]);

    const currentCourse = courses.find(c => c.modules?.some(m => m._id === moduleId));

    if (loading) return (
        <div className="flex-1 flex items-center justify-center">
            <div className="w-7 h-7 border-2 border-indigo-900 border-t-indigo-500 rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="flex-1 flex overflow-hidden h-full">

            {/* ── TREE PANEL ── */}
            <div className="w-64 flex-shrink-0 border-r border-white/7 bg-[#0c0e13] flex flex-col overflow-hidden">
                <div className="px-4 py-3 border-b border-white/7 flex-shrink-0">
                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-2">Estructura de contenido</div>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                    {courses.map((course, ci) => {
                        const isOpen = expandedCourses[course._id];
                        return (
                            <div key={course._id} className="mb-1">
                                <button onClick={() => setExpandedCourses(p => ({ ...p, [course._id]: !p[course._id] }))}
                                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl hover:bg-white/4 transition-colors">
                                    <div className="w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center text-xs flex-shrink-0">
                                        {ci === 0 ? '💬' : ci === 1 ? '▶️' : '🎮'}
                                    </div>
                                    <span className="flex-1 text-left text-[11px] font-700 text-slate-500 truncate">{course.title}</span>
                                    {isOpen ? <ChevronDown className="w-3 h-3 text-slate-600" /> : <ChevronRight className="w-3 h-3 text-slate-600" />}
                                </button>
                                {isOpen && (
                                    <div className="ml-3 pl-3 border-l border-white/6 mt-0.5 space-y-0.5">
                                        {(course.modules ?? []).map((m, mi) => {
                                            const isActive = m._id === moduleId;
                                            return (
                                                <button key={m._id} onClick={() => navigate(`/admin/cursos/${m._id}`)}
                                                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all border-l-2
                                                        ${isActive ? 'bg-violet-500/10 border-l-violet-500 text-violet-300' : 'border-l-transparent text-slate-600 hover:bg-white/3 hover:text-slate-400'}`}>
                                                    <span className="w-4 h-4 rounded flex items-center justify-center text-[8px] font-black flex-shrink-0 bg-white/5">{mi + 1}</span>
                                                    <span className="flex-1 text-[11px] font-600 truncate">{m.title}</span>
                                                    <span className="text-[9px] font-bold flex-shrink-0 opacity-50">{m.lessonOrder?.length ?? 0}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── RIGHT: EDITOR ── */}
            <div className="flex-1 flex flex-col overflow-hidden">

                {/* Topbar */}
                <header className="flex items-center justify-between px-4 h-12 border-b border-white/7 bg-[#0a0c10]/95 backdrop-blur-md flex-shrink-0 gap-3">
                    <div className="flex items-center gap-2 min-w-0 text-xs text-slate-600">
                        <button onClick={() => navigate('/admin/cursos')}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/7 bg-white/3 hover:bg-white/7 text-slate-400 hover:text-slate-200 font-bold transition-all flex-shrink-0">
                            ← Cursos
                        </button>
                        <div className="w-px h-4 bg-white/10" />
                        <span className="truncate text-slate-400">{currentCourse?.title}</span>
                        <ChevronRight className="w-3 h-3 text-slate-700 flex-shrink-0" />
                        <span className="text-violet-300 font-semibold truncate">{form.title || 'Sin título'}</span>
                        <span className="flex-shrink-0 px-1.5 py-0.5 rounded-md border bg-violet-500/10 border-violet-500/25 text-violet-400 text-[9px] font-black uppercase tracking-widest">Módulo</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <div className={`flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-lg border
                            ${saved ? 'text-green-400 border-green-500/20 bg-green-500/5' : 'text-amber-400 border-amber-500/20 bg-amber-500/5'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${saved ? 'bg-green-400' : 'bg-amber-400 animate-pulse'}`} />
                            {saved ? 'Guardado' : 'Sin guardar'}
                        </div>
                        <button onClick={handleSave} disabled={saving}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 disabled:opacity-60">
                            {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                            Guardar
                        </button>
                    </div>
                </header>

                {/* Title row */}
                <div className="px-4 py-2 border-b border-white/7 bg-[#0d0f14] flex-shrink-0">
                    <div className="text-[8px] font-black uppercase tracking-widest text-slate-600 mb-0.5">Título del módulo</div>
                    <input value={form.title} onChange={e => setField('title', e.target.value)}
                        className="w-full bg-white/4 border border-white/7 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-200 outline-none focus:border-indigo-500/40 transition-all" />
                </div>

                {/* Split editor */}
                <div className="flex-1 grid grid-cols-2 overflow-hidden">

                    {/* Left: Markdown */}
                    <div className="flex flex-col border-r border-white/7 overflow-hidden">
                        <div className="flex items-center px-3 h-9 border-b border-white/7 bg-[#0d0f14] gap-0.5 flex-shrink-0 overflow-x-auto">
                            <div className="flex items-center gap-1.5 mr-1.5 flex-shrink-0">
                                <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">Descripción (Markdown)</span>
                            </div>
                            <TbSep />
                            <TbBtn icon={Bold}     label="Negrita"  onClick={() => handleInsert('bold')} />
                            <TbBtn icon={Italic}   label="Cursiva"  onClick={() => handleInsert('italic')} />
                            <TbSep />
                            <TbBtn icon={Heading2} label="H2"       onClick={() => handleInsert('h2')} />
                            <TbBtn icon={Heading3} label="H3"       onClick={() => handleInsert('h3')} />
                            <TbSep />
                            <TbBtn icon={Link}     label="Enlace"   onClick={() => handleInsert('link')} />
                            <TbBtn icon={Image}    label="Imagen"   onClick={() => handleInsert('image')} />
                            <TbSep />
                            <TbBtn icon={List}     label="Lista"    onClick={() => handleInsert('list')} />
                            <TbBtn icon={Quote}    label="Cita"     onClick={() => handleInsert('quote')} />
                            <TbBtn icon={Code}     label="Código"   onClick={() => handleInsert('code')} />
                        </div>
                        <textarea ref={taRef} value={form.description}
                            onChange={e => setField('description', e.target.value)}
                            spellCheck={false}
                            placeholder="## ¿Qué cubre este módulo?&#10;&#10;Escribe la descripción en Markdown..."
                            className="flex-1 bg-transparent resize-none outline-none p-4 font-mono text-[12.5px] leading-[1.8] text-slate-400 placeholder-slate-700 overflow-y-auto"
                            style={{ tabSize: 2 }} />
                    </div>

                    {/* Right: Preview */}
                    <div className="flex flex-col overflow-hidden bg-[#0c0e13]">
                        <div className="flex items-center justify-between px-4 h-9 border-b border-white/7 bg-[#0d0f14] flex-shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">Vista previa en tiempo real</span>
                            </div>
                            <span className="text-[9px] font-bold text-green-500 flex items-center gap-1">
                                <div className="w-1 h-1 rounded-full bg-green-500" /> Sincronizado
                            </span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-5"
                            dangerouslySetInnerHTML={{ __html: previewHtml || '<p style="color:#334155;font-size:13px;font-style:italic">La descripción renderizada aparecerá aquí...</p>' }} />
                    </div>
                </div>

                {/* Lessons panel */}
                <div className="border-t border-white/7 bg-[#0d0f14] flex-shrink-0">
                    <button onClick={() => setLessonsOpen(p => !p)}
                        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/2 transition-colors">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Lecciones del módulo</span>
                            <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                {mod?.lessons?.length ?? 0}
                            </span>
                        </div>
                        {lessonsOpen ? <ChevronDown className="w-3.5 h-3.5 text-slate-600" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-600" />}
                    </button>

                    {lessonsOpen && (
                        <div className="max-h-48 overflow-y-auto px-4 pb-3 space-y-1">
                            {(mod?.lessons ?? []).length === 0 ? (
                                <p className="text-xs text-slate-600 text-center py-4">Sin lecciones — agrégalas desde la vista de cursos</p>
                            ) : (mod?.lessons ?? []).map((l) => {
                                const meta = TYPE_META[l.type] ?? TYPE_META.article;
                                const Icon = meta.icon;
                                return (
                                    <button key={l._id} onClick={() => navigate(`/admin/lecciones/${l._id}`)}
                                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 hover:border-indigo-500/20 transition-all group text-left">
                                        <GripVertical className="w-3.5 h-3.5 text-slate-700 cursor-grab flex-shrink-0" />
                                        <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${meta.bg}`}>
                                            <Icon className={`w-3 h-3 ${meta.color}`} />
                                        </div>
                                        <span className="flex-1 text-xs font-medium text-slate-500 group-hover:text-slate-200 transition-colors truncate">{l.title}</span>
                                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${meta.chip}`}>{meta.label}</span>
                                        <Edit2 className="w-3 h-3 text-slate-700 group-hover:text-indigo-400 transition-colors flex-shrink-0" />
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Status bar */}
                <div className="flex items-center justify-between px-4 h-6 border-t border-white/7 bg-[#080a0d] flex-shrink-0 text-[10px] text-slate-600 font-semibold">
                    <div className="flex items-center gap-3">
                        <span>Módulo · {currentCourse?.title}</span>
                        <span>· {wordCount} palabras en descripción</span>
                        <span>· {mod?.lessons?.length ?? 0} lecciones</span>
                    </div>
                    <span>Ctrl+S para guardar</span>
                </div>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════
   COURSE EDITOR VIEW (split: form | preview)
═══════════════════════════════════════════ */
const CourseEditorView = ({ courseId, courses, onRefresh }) => {
    const navigate = useNavigate();
    const taRef = useRef(null);
    const [form, setForm] = useState({ title: '', description: '', image: '', category: '', platforms: [], status: 'published' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(true);

    useEffect(() => {
        const course = courses.find(c => c._id === courseId);
        if (course) {
            setForm({
                title: course.title ?? '',
                description: course.description ?? '',
                image: course.image ?? '',
                category: course.category ?? '',
                platforms: course.platforms ?? [],
                status: course.status ?? 'published',
            });
            setLoading(false);
        }
    }, [courseId, courses]);

    const setField = (key, val) => { setForm(f => ({ ...f, [key]: val })); setSaved(false); };

    const handleSave = useCallback(async () => {
        setSaving(true);
        try {
            await api.patch(`/api/admin/courses/${courseId}`, form);
            setSaved(true);
            showToast('Curso guardado');
            onRefresh();
        } catch { showToast('Error al guardar', 'error'); }
        finally { setSaving(false); }
    }, [courseId, form, onRefresh]);

    useEffect(() => {
        const onKey = (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); handleSave(); } };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [handleSave]);

    const handleInsert = (type) => insertFormat(type, taRef, form.description, (v) => setField('description', v));
    const previewHtml = useMemo(() => renderMarkdown(form.description), [form.description]);
    const wordCount = useMemo(() => (form.description || '').trim().split(/\s+/).filter(Boolean).length, [form.description]);
    const currentCourse = courses.find(c => c._id === courseId);

    if (loading) return <div className="flex-1 flex items-center justify-center"><div className="w-7 h-7 border-2 border-indigo-900 border-t-indigo-500 rounded-full animate-spin" /></div>;

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Topbar */}
            <header className="flex items-center justify-between px-4 h-12 border-b border-white/7 bg-[#0a0c10]/95 backdrop-blur-md flex-shrink-0 gap-3">
                <div className="flex items-center gap-2 min-w-0 text-xs text-slate-600">
                    <button onClick={() => navigate('/admin/cursos')}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/7 bg-white/3 hover:bg-white/7 text-slate-400 font-bold transition-all flex-shrink-0">
                        ← Cursos
                    </button>
                    <div className="w-px h-4 bg-white/10" />
                    <span className="text-indigo-300 font-semibold truncate">{form.title || 'Sin título'}</span>
                    <span className="flex-shrink-0 px-1.5 py-0.5 rounded-md border bg-indigo-500/10 border-indigo-500/25 text-indigo-400 text-[9px] font-black uppercase tracking-widest">Curso</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <div className={`flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-lg border
                        ${saved ? 'text-green-400 border-green-500/20 bg-green-500/5' : 'text-amber-400 border-amber-500/20 bg-amber-500/5'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${saved ? 'bg-green-400' : 'bg-amber-400 animate-pulse'}`} />
                        {saved ? 'Guardado' : 'Sin guardar'}
                    </div>
                    <button onClick={handleSave} disabled={saving}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 disabled:opacity-60">
                        {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                        Guardar
                    </button>
                </div>
            </header>

            {/* Meta fields row */}
            <div className="flex items-center gap-3 px-4 py-2 border-b border-white/7 bg-[#0d0f14] flex-shrink-0 overflow-x-auto">
                <div className="flex-1 min-w-0">
                    <div className="text-[8px] font-black uppercase tracking-widest text-slate-600 mb-0.5">Título</div>
                    <input value={form.title} onChange={e => setField('title', e.target.value)}
                        className="w-full bg-white/4 border border-white/7 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-200 outline-none focus:border-indigo-500/40 transition-all" />
                </div>
                <div className="w-px h-8 bg-white/7 flex-shrink-0" />
                <div className="w-72 flex-shrink-0">
                    <div className="text-[8px] font-black uppercase tracking-widest text-slate-600 mb-0.5">URL de imagen</div>
                    <input value={form.image} onChange={e => setField('image', e.target.value)}
                        placeholder="/images/tarjetaredes.webp"
                        className="w-full bg-white/4 border border-white/7 rounded-lg px-3 py-1.5 text-sm text-slate-200 outline-none focus:border-indigo-500/40 transition-all placeholder-slate-700 font-mono text-xs" />
                </div>
                <div className="w-px h-8 bg-white/7 flex-shrink-0" />
                <div className="w-28 flex-shrink-0">
                    <div className="text-[8px] font-black uppercase tracking-widest text-slate-600 mb-0.5">Estado</div>
                    <select value={form.status} onChange={e => setField('status', e.target.value)}
                        className="w-full bg-white/4 border border-white/7 rounded-lg px-2.5 py-1.5 text-sm text-slate-200 outline-none">
                        <option value="published">Publicado</option>
                        <option value="draft">Borrador</option>
                        <option value="archived">Archivado</option>
                    </select>
                </div>
            </div>

            {/* Split: Description editor | Preview */}
            <div className="flex-1 grid grid-cols-2 overflow-hidden">

                {/* Left: Markdown editor */}
                <div className="flex flex-col border-r border-white/7 overflow-hidden">
                    <div className="flex items-center px-3 h-9 border-b border-white/7 bg-[#0d0f14] gap-0.5 flex-shrink-0 overflow-x-auto">
                        <div className="flex items-center gap-1.5 mr-1.5 flex-shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">Descripción (Markdown)</span>
                        </div>
                        <TbSep />
                        <TbBtn icon={Bold}     label="Negrita"  onClick={() => handleInsert('bold')} />
                        <TbBtn icon={Italic}   label="Cursiva"  onClick={() => handleInsert('italic')} />
                        <TbSep />
                        <TbBtn icon={Heading2} label="H2"       onClick={() => handleInsert('h2')} />
                        <TbBtn icon={Heading3} label="H3"       onClick={() => handleInsert('h3')} />
                        <TbSep />
                        <TbBtn icon={Link}     label="Enlace"   onClick={() => handleInsert('link')} />
                        <TbBtn icon={Image}    label="Imagen"   onClick={() => handleInsert('image')} />
                        <TbSep />
                        <TbBtn icon={List}     label="Lista"    onClick={() => handleInsert('list')} />
                        <TbBtn icon={Quote}    label="Cita"     onClick={() => handleInsert('quote')} />
                    </div>
                    <textarea ref={taRef} value={form.description}
                        onChange={e => setField('description', e.target.value)}
                        spellCheck={false}
                        placeholder="Escribe la descripción del curso en Markdown..."
                        className="flex-1 bg-transparent resize-none outline-none p-4 font-mono text-[12.5px] leading-[1.8] text-slate-400 placeholder-slate-700 overflow-y-auto"
                        style={{ tabSize: 2 }} />
                </div>

                {/* Right: Course card preview */}
                <div className="flex flex-col overflow-hidden bg-[#0c0e13]">
                    <div className="flex items-center justify-between px-4 h-9 border-b border-white/7 bg-[#0d0f14] flex-shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">Vista previa del curso</span>
                        </div>
                        <span className="text-[9px] font-bold text-green-500 flex items-center gap-1">
                            <div className="w-1 h-1 rounded-full bg-green-500" /> Sincronizado
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        {/* Course card preview */}
                        <div className="rounded-2xl overflow-hidden border border-white/10 max-w-lg mx-auto shadow-2xl">
                            {/* Card image */}
                            <div className="relative h-52 bg-gradient-to-br from-indigo-950 to-violet-950 overflow-hidden">
                                {form.image ? (
                                    <img src={form.image} alt={form.title}
                                        className="w-full h-full object-cover opacity-90" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-700 text-sm font-bold">
                                        Sin imagen — agrega una URL arriba
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                {form.status === 'draft' && (
                                    <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[9px] font-black uppercase tracking-widest">
                                        Borrador
                                    </div>
                                )}
                            </div>

                            {/* Card body */}
                            <div className="bg-[#111318] p-5">
                                {/* Platforms */}
                                {form.platforms?.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {form.platforms.map(p => (
                                            <span key={p} className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{p}</span>
                                        ))}
                                    </div>
                                )}
                                <h3 className="text-base font-black text-slate-100 leading-tight mb-2">{form.title || 'Título del curso'}</h3>
                                {/* Rendered description */}
                                <div className="text-xs text-slate-400 leading-relaxed line-clamp-4"
                                    dangerouslySetInnerHTML={{ __html: previewHtml || '<p style="color:#475569;font-style:italic">La descripción aparecerá aquí...</p>' }} />

                                {/* Stats */}
                                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/7 text-[10px] text-slate-600 font-bold">
                                    <span>📦 {currentCourse?.modules?.length ?? 0} módulos</span>
                                    <span>📝 {currentCourse?.lessonCount ?? 0} lecciones</span>
                                    <span>👥 {currentCourse?.enrolledCount ?? 0} usuarios</span>
                                </div>
                            </div>
                        </div>

                        {/* Image url hint */}
                        {!form.image && (
                            <div className="mt-4 p-3 bg-amber-500/5 border border-amber-500/15 rounded-xl text-[10px] text-amber-600 font-medium max-w-lg mx-auto">
                                💡 Las imágenes de los cursos están en <code className="bg-white/5 px-1 rounded">/images/</code>.
                                Ejemplos: <code className="bg-white/5 px-1 rounded">/images/tarjetaredes.webp</code>,
                                <code className="bg-white/5 px-1 rounded">/images/tarjetastreaming.webp</code>,
                                <code className="bg-white/5 px-1 rounded">/images/tarjetajuegos.webp</code>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between px-4 h-6 border-t border-white/7 bg-[#080a0d] flex-shrink-0 text-[10px] text-slate-600 font-semibold">
                <div className="flex items-center gap-3">
                    <span>Curso · {form.category || 'Sin categoría'}</span>
                    <span>· {wordCount} palabras</span>
                    <span>· {currentCourse?.modules?.length ?? 0} módulos</span>
                </div>
                <span>Ctrl+S para guardar</span>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════
   ROOT — AdminCursosPage
═══════════════════════════════════════════ */
const AdminCursosPage = () => {
    const { moduleId, courseId } = useParams();
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCourses = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/admin/courses');
            setCourses(data);
        } catch { showToast('Error al cargar cursos', 'error'); }
        finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchCourses(); }, [fetchCourses]);

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <Toast />
            {courseId ? (
                <CourseEditorView courseId={courseId} courses={courses} onRefresh={fetchCourses} />
            ) : moduleId ? (
                <ModuleEditorView moduleId={moduleId} courses={courses} onRefreshCourses={fetchCourses} />
            ) : (
                <CourseListView
                    courses={courses}
                    loading={loading}
                    onRefresh={fetchCourses}
                    onNavigateModule={(id) => navigate(`/admin/cursos/${id}`)}
                    onNavigateCourse={(id) => navigate(`/admin/curso/${id}`)}
                    onCourseCreated={fetchCourses}
                    onCourseUpdated={fetchCourses}
                    onModuleCreated={fetchCourses}
                    onModuleDeleted={fetchCourses}
                    onLessonCreated={(lessonId) => navigate(`/admin/lecciones/${lessonId}`)}
                />
            )}
        </div>
    );
};

export default AdminCursosPage;

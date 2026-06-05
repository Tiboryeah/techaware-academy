import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Search, RefreshCw, Save, Bold, Italic, Link, Image,
    List, Quote, Code, Heading1, Heading2, Heading3,
    FileText, Video, BookOpen, X, ChevronRight
} from 'lucide-react';
import api from '../../services/api';
import { renderMarkdown } from '../../utils/renderMarkdown';

/* ─────────────────────────────────────────────
   TYPE META
───────────────────────────────────────────── */
const TYPE_META = {
    article: { label:'Artículo', short:'Art', icon:FileText, color:'text-blue-400', bg:'bg-blue-500/10', border:'border-blue-500/25', chip:'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    video:   { label:'Video',    short:'Vid', icon:Video,    color:'text-violet-400', bg:'bg-violet-500/10', border:'border-violet-500/25', chip:'bg-violet-500/20 text-violet-300 border-violet-500/30' },
    guide:   { label:'Guía',     short:'Guía', icon:BookOpen, color:'text-green-400', bg:'bg-green-500/10', border:'border-green-500/25', chip:'bg-green-500/20 text-green-300 border-green-500/30' },
};

/* ─────────────────────────────────────────────
   TOOLBAR BUTTON
───────────────────────────────────────────── */
const TbBtn = ({ icon:Icon, label, onClick, text }) => (
    <button title={label} onClick={onClick}
        className="h-7 px-2 flex items-center justify-center rounded-md text-slate-500 hover:text-slate-200 hover:bg-white/8 transition-colors">
        {Icon ? <Icon className="w-3.5 h-3.5"/> : <span className="text-[11px] font-black">{text}</span>}
    </button>
);
const TbSep = () => <div className="w-px h-4 bg-white/10 mx-0.5 self-center"/>;

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const AdminLeccionesPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const taRef = useRef(null);

    /* ── LIST STATE ── */
    const [lessons, setLessons] = useState([]);
    const [courses, setCourses] = useState([]);
    const [total, setTotal] = useState(0);
    const [listLoading, setListLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [courseFilter, setCourseFilter] = useState('');
    const [moduleFilter, setModuleFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');

    /* ── EDITOR STATE ── */
    const [form, setForm] = useState({ title:'', type:'article', videoUrl:'', content:'', moduleId:'' });
    const [editorLoading, setEditorLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(true);
    const [toast, setToast] = useState(null);

    const showToast = (msg, type='success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    /* ── FETCH COURSES ── */
    useEffect(() => {
        api.get('/api/admin/courses').then(({ data }) => setCourses(data)).catch(() => {});
    }, []);

    /* ── FETCH LESSONS LIST ── */
    const fetchLessons = useCallback(async () => {
        setListLoading(true);
        try {
            const params = { limit: 200, search, type: typeFilter };
            if (moduleFilter) params.moduleId = moduleFilter;
            else if (courseFilter) params.courseId = courseFilter;
            const { data } = await api.get('/api/admin/lessons', { params });
            setLessons(data.lessons);
            setTotal(data.total);
        } catch { /* silent */ }
        finally { setListLoading(false); }
    }, [search, courseFilter, moduleFilter, typeFilter]);

    useEffect(() => { fetchLessons(); }, [fetchLessons]);

    /* ── LOAD LESSON INTO EDITOR ── */
    useEffect(() => {
        if (!id) { setForm({ title:'', type:'article', videoUrl:'', content:'', moduleId:'' }); return; }
        const load = async () => {
            setEditorLoading(true);
            try {
                const { data } = await api.get(`/api/admin/lessons/${id}`);
                setForm({
                    title: data.title ?? '',
                    type: data.type ?? 'article',
                    videoUrl: data.videoUrl ?? '',
                    content: data.content ?? '',
                    moduleId: data.moduleId?._id ?? data.moduleId ?? '',
                });
                setSaved(true);
            } catch { showToast('No se pudo cargar la lección', 'error'); }
            finally { setEditorLoading(false); }
        };
        load();
    }, [id]);

    /* ── SELECT LESSON ── */
    const selectLesson = (lesson) => {
        if (!saved) {
            if (!window.confirm('Hay cambios sin guardar. ¿Cambiar de lección?')) return;
        }
        navigate(`/admin/lecciones/${lesson._id}`);
    };

    /* ── FORM FIELD ── */
    const setField = (key, val) => {
        setForm(f => ({ ...f, [key]: val }));
        setSaved(false);
    };

    /* ── SAVE ── */
    const handleSave = useCallback(async () => {
        if (!id) return;
        setSaving(true);
        try {
            await api.patch(`/api/admin/lessons/${id}`, form);
            setSaved(true);
            showToast('Lección guardada');
        } catch { showToast('Error al guardar', 'error'); }
        finally { setSaving(false); }
    }, [id, form]);

    /* ── CTRL+S ── */
    useEffect(() => {
        const onKey = (e) => { if ((e.ctrlKey||e.metaKey) && e.key==='s') { e.preventDefault(); handleSave(); } };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [handleSave]);

    /* ── TOOLBAR INSERT ── */
    const insertFormat = (type) => {
        const ta = taRef.current;
        if (!ta) return;
        const s = ta.selectionStart, e = ta.selectionEnd;
        const sel = form.content.slice(s, e);
        const before = form.content.slice(0, s), after = form.content.slice(e);
        let ins = '', cur = 0;
        switch(type) {
            case 'bold':   ins=`**${sel||'texto'}**`; cur=sel?s+ins.length:s+2; break;
            case 'italic': ins=`*${sel||'texto'}*`;   cur=sel?s+ins.length:s+1; break;
            case 'h1':     ins=`\n# ${sel||'Título'}\n`; cur=s+ins.length; break;
            case 'h2':     ins=`\n## ${sel||'Subtítulo'}\n`; cur=s+ins.length; break;
            case 'h3':     ins=`\n### ${sel||'Sección'}\n`; cur=s+ins.length; break;
            case 'link':   { const u=window.prompt('URL:'); if(!u)return; ins=`[${sel||'texto'}](${u})`; cur=s+ins.length; break; }
            case 'image':  { const u=window.prompt('URL de imagen:'); if(!u)return; ins=`\n![alt](${u})\n`; cur=s+ins.length; break; }
            case 'list':   ins=`\n- ${sel||'elemento'}\n`; cur=s+ins.length; break;
            case 'quote':  ins=`\n> ${sel||'cita'}\n`; cur=s+ins.length; break;
            case 'code':   ins=sel.includes('\n')?`\n\`\`\`\n${sel}\n\`\`\`\n`:`\`${sel||'código'}\``; cur=s+ins.length; break;
            default: return;
        }
        const newContent = before + ins + after;
        setField('content', newContent);
        requestAnimationFrame(() => { ta.focus(); ta.setSelectionRange(cur, cur); });
    };

    /* ── COMPUTED ── */
    const wordCount = useMemo(() => (form.content||'').trim().split(/\s+/).filter(Boolean).length, [form.content]);
    const readTime = Math.max(1, Math.round(wordCount/200));
    const previewHtml = useMemo(() => renderMarkdown(form.content), [form.content]);
    const allModules = courses.flatMap(c => (c.modules||[]).map(m => ({ ...m, courseName:c.title })));
    const currentModule = allModules.find(m => m._id===form.moduleId || m._id?.toString()===form.moduleId?.toString());
    const selectedCourse = courses.find(c => c._id===courseFilter);
    const filteredModules = selectedCourse?.modules ?? [];
    const hasFilters = courseFilter||moduleFilter||typeFilter||search;

    /* ── GROUP LESSONS BY MODULE (for list panel) ── */
    const groupedLessons = useMemo(() => {
        if (moduleFilter || courseFilter) return null; // flat list when filtered
        const groups = {};
        for (const l of lessons) {
            const key = l.moduleId?.title ?? 'Sin módulo';
            if (!groups[key]) groups[key] = [];
            groups[key].push(l);
        }
        return groups;
    }, [lessons, moduleFilter, courseFilter]);

    /* ── RENDER ── */
    return (
        <div className="flex-1 flex overflow-hidden h-full">

            {/* Toast */}
            {toast && (
                <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-bold shadow-xl
                    ${toast.type==='error'?'bg-red-900/90 text-red-200':'bg-green-900/90 text-green-200'}`}>
                    {toast.msg}
                </div>
            )}

            {/* ══════════════════════════════
                LEFT PANEL — Lesson list
            ══════════════════════════════ */}
            <div className="w-72 flex-shrink-0 flex flex-col border-r border-white/7 bg-[#0c0e13] overflow-hidden">

                {/* Panel header */}
                <div className="px-4 py-3 border-b border-white/7 flex-shrink-0">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black text-slate-300">Lecciones</span>
                        <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-slate-600 font-bold">{total}</span>
                            {hasFilters && (
                                <button onClick={() => { setCourseFilter(''); setModuleFilter(''); setTypeFilter(''); setSearch(''); }}
                                    className="flex items-center gap-0.5 text-[9px] font-black text-amber-500 hover:text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded-md">
                                    <X className="w-2.5 h-2.5"/> Limpiar
                                </button>
                            )}
                            <button onClick={fetchLessons} className="text-slate-600 hover:text-slate-400 transition-colors">
                                <RefreshCw className={`w-3 h-3 ${listLoading?'animate-spin':''}`}/>
                            </button>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="flex items-center gap-2 bg-white/5 border border-white/7 rounded-lg px-2.5 py-1.5 mb-2">
                        <Search className="w-3 h-3 text-slate-600 flex-shrink-0"/>
                        <input value={search} onChange={e => { setSearch(e.target.value); }}
                            placeholder="Buscar lección..."
                            className="bg-transparent text-xs text-slate-300 placeholder-slate-700 outline-none w-full"/>
                        {search && <button onClick={() => setSearch('')}><X className="w-2.5 h-2.5 text-slate-600 hover:text-slate-400"/></button>}
                    </div>

                    {/* Type filter pills */}
                    <div className="flex gap-1 mb-2 flex-wrap">
                        {[['', 'Todos'], ['article', 'Art'], ['video', 'Vid'], ['guide', 'Guía']].map(([val, lbl]) => (
                            <button key={val} onClick={() => { setTypeFilter(val); }}
                                className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-all
                                    ${typeFilter===val
                                        ? val==='' ? 'bg-white/10 text-slate-200 border-white/20'
                                          : `${TYPE_META[val]?.bg} ${TYPE_META[val]?.color} ${TYPE_META[val]?.border}`
                                        : 'bg-transparent text-slate-600 border-white/7 hover:border-white/15 hover:text-slate-400'}`}>
                                {lbl}
                            </button>
                        ))}
                    </div>

                    {/* Course filter */}
                    <select value={courseFilter} onChange={e => { setCourseFilter(e.target.value); setModuleFilter(''); }}
                        className="w-full bg-white/5 border border-white/7 rounded-lg px-2.5 py-1.5 text-xs text-slate-400 outline-none mb-1.5">
                        <option value="">Todos los cursos</option>
                        {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                    </select>

                    {/* Module filter — only when course selected */}
                    {courseFilter && filteredModules.length > 0 && (
                        <select value={moduleFilter} onChange={e => setModuleFilter(e.target.value)}
                            className="w-full bg-white/5 border border-white/7 rounded-lg px-2.5 py-1.5 text-xs text-slate-400 outline-none">
                            <option value="">Todos los módulos</option>
                            {filteredModules.map((m, i) => <option key={m._id} value={m._id}>{i+1}. {m.title}</option>)}
                        </select>
                    )}
                </div>

                {/* Lesson list */}
                <div className="flex-1 overflow-y-auto">
                    {listLoading ? (
                        <div className="flex items-center justify-center py-10 text-slate-700 text-xs">Cargando...</div>
                    ) : lessons.length === 0 ? (
                        <div className="flex items-center justify-center py-10 text-slate-700 text-xs">Sin resultados</div>
                    ) : groupedLessons ? (
                        /* Grouped by module */
                        Object.entries(groupedLessons).map(([modTitle, modLessons]) => (
                            <div key={modTitle}>
                                <div className="px-3 pt-3 pb-1 text-[9px] font-black uppercase tracking-widest text-slate-600 flex items-center gap-2">
                                    <div className="flex-1 h-px bg-white/4"/>
                                    <span className="flex-shrink-0">{modTitle}</span>
                                    <div className="flex-1 h-px bg-white/4"/>
                                </div>
                                {modLessons.map(l => <LessonItem key={l._id} lesson={l} active={id===l._id} onClick={() => selectLesson(l)} />)}
                            </div>
                        ))
                    ) : (
                        /* Flat list (filtered) */
                        lessons.map(l => <LessonItem key={l._id} lesson={l} active={id===l._id} onClick={() => selectLesson(l)} />)
                    )}
                </div>
            </div>

            {/* ══════════════════════════════
                RIGHT PANEL — Editor
            ══════════════════════════════ */}
            {!id ? (
                /* Empty state */
                <div className="flex-1 flex items-center justify-center text-slate-700">
                    <div className="text-center space-y-3">
                        <div className="text-5xl">📝</div>
                        <p className="text-sm font-bold text-slate-500">Selecciona una lección</p>
                        <p className="text-xs text-slate-700">Haz clic en cualquier lección de la lista para editarla</p>
                    </div>
                </div>
            ) : editorLoading ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-7 h-7 border-2 border-indigo-900 border-t-indigo-500 rounded-full animate-spin"/>
                </div>
            ) : (
                <div className="flex-1 flex flex-col overflow-hidden">

                    {/* ── TOPBAR ── */}
                    <header className="flex items-center justify-between px-4 h-12 border-b border-white/7 bg-[#0a0c10]/95 backdrop-blur-md flex-shrink-0 gap-3">
                        <div className="flex items-center gap-2 min-w-0 text-xs text-slate-600">
                            <span>Lecciones</span>
                            <ChevronRight className="w-3 h-3 text-slate-700"/>
                            <span className="text-slate-300 font-semibold truncate">{form.title||'Sin título'}</span>
                            <span className={`flex-shrink-0 px-1.5 py-0.5 rounded-md border text-[9px] font-black uppercase tracking-widest
                                ${form.type==='video'?'bg-violet-500/10 border-violet-500/25 text-violet-400'
                                :form.type==='guide'?'bg-green-500/10 border-green-500/25 text-green-400'
                                :'bg-blue-500/10 border-blue-500/25 text-blue-400'}`}>
                                {form.type==='video'?'Video':form.type==='guide'?'Guía':'Artículo'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <div className={`flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-lg border
                                ${saved?'text-green-400 border-green-500/20 bg-green-500/5':'text-amber-400 border-amber-500/20 bg-amber-500/5'}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${saved?'bg-green-400':'bg-amber-400 animate-pulse'}`}/>
                                {saved?'Guardado':'Sin guardar'}
                            </div>
                            <button onClick={handleSave} disabled={saving||!id}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-60">
                                {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin"/> : <Save className="w-3.5 h-3.5"/>}
                                Guardar
                            </button>
                        </div>
                    </header>

                    {/* ── META ROW ── */}
                    <div className="flex items-center gap-3 px-4 py-2 border-b border-white/7 bg-[#0d0f14] flex-shrink-0">
                        <div className="flex-1 min-w-0">
                            <div className="text-[8px] font-black uppercase tracking-widest text-slate-600 mb-0.5">Título</div>
                            <input value={form.title} onChange={e => setField('title', e.target.value)}
                                className="w-full bg-white/4 border border-white/7 rounded-lg px-2.5 py-1 text-sm text-slate-200 outline-none focus:border-indigo-500/40 transition-all"/>
                        </div>
                        {form.type === 'video' && (
                            <>
                                <div className="w-px h-8 bg-white/7 flex-shrink-0"/>
                                <div className="w-80 flex-shrink-0">
                                    <div className="text-[8px] font-black uppercase tracking-widest text-slate-600 mb-0.5">URL de YouTube</div>
                                    <input value={form.videoUrl} onChange={e => setField('videoUrl', e.target.value)}
                                        placeholder="https://youtube.com/watch?v=..."
                                        className="w-full bg-white/4 border border-white/7 rounded-lg px-2.5 py-1 text-sm text-slate-200 outline-none focus:border-indigo-500/40 transition-all placeholder-slate-700"/>
                                </div>
                            </>
                        )}
                    </div>

                    {/* ── EDITOR BODY ── */}
                    {form.type==='video' ? (
                        <VideoPreview url={form.videoUrl} />
                    ) : (
                        <div className="flex-1 grid grid-cols-2 overflow-hidden">
                            {/* Markdown editor */}
                            <div className="flex flex-col border-r border-white/7 overflow-hidden">
                                {/* Toolbar */}
                                <div className="flex items-center px-2 h-9 border-b border-white/7 bg-[#0d0f14] gap-0.5 flex-shrink-0 overflow-x-auto">
                                    <div className="flex items-center gap-1 mr-1.5 flex-shrink-0">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"/>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">Markdown</span>
                                    </div>
                                    <TbSep/>
                                    <TbBtn icon={Bold}     label="Negrita"   onClick={() => insertFormat('bold')}/>
                                    <TbBtn icon={Italic}   label="Cursiva"   onClick={() => insertFormat('italic')}/>
                                    <TbSep/>
                                    <TbBtn icon={Heading1} label="H1"        onClick={() => insertFormat('h1')}/>
                                    <TbBtn icon={Heading2} label="H2"        onClick={() => insertFormat('h2')}/>
                                    <TbBtn icon={Heading3} label="H3"        onClick={() => insertFormat('h3')}/>
                                    <TbSep/>
                                    <TbBtn icon={Link}     label="Enlace"    onClick={() => insertFormat('link')}/>
                                    <TbBtn icon={Image}    label="Imagen"    onClick={() => insertFormat('image')}/>
                                    <TbSep/>
                                    <TbBtn icon={List}     label="Lista"     onClick={() => insertFormat('list')}/>
                                    <TbBtn icon={Quote}    label="Cita"      onClick={() => insertFormat('quote')}/>
                                    <TbBtn icon={Code}     label="Código"    onClick={() => insertFormat('code')}/>
                                </div>
                                <textarea ref={taRef} value={form.content}
                                    onChange={e => setField('content', e.target.value)}
                                    spellCheck={false}
                                    placeholder="# Título&#10;&#10;Escribe el contenido aquí en Markdown..."
                                    className="flex-1 bg-transparent resize-none outline-none p-4 font-mono text-[12.5px] leading-[1.8] text-slate-400 placeholder-slate-700 overflow-y-auto"
                                    style={{ tabSize:2 }}/>
                            </div>
                            {/* Preview */}
                            <div className="flex flex-col overflow-hidden bg-[#0c0e13]">
                                <div className="flex items-center justify-between px-4 h-9 border-b border-white/7 bg-[#0d0f14] flex-shrink-0">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"/>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">Vista previa</span>
                                    </div>
                                    <span className="text-[9px] font-bold text-green-500 flex items-center gap-1">
                                        <div className="w-1 h-1 rounded-full bg-green-500"/>Sincronizado
                                    </span>
                                </div>
                                <div className="flex-1 overflow-y-auto p-5"
                                    dangerouslySetInnerHTML={{ __html: previewHtml||'<p style="color:#334155;font-size:13px;font-style:italic">El contenido renderizado aparecerá aquí...</p>' }}/>
                            </div>
                        </div>
                    )}

                    {/* ── STATUS BAR ── */}
                    <div className="flex items-center justify-between px-4 h-6 border-t border-white/7 bg-[#080a0d] flex-shrink-0 text-[10px] text-slate-600 font-semibold">
                        <div className="flex items-center gap-3">
                            <span>{form.type==='video'?'Video':form.type==='guide'?'Guía':'Artículo'}</span>
                            {currentModule && <span>· {currentModule.courseName} › {currentModule.title}</span>}
                            {form.type!=='video' && <><span>· {wordCount.toLocaleString()} palabras</span><span>· ~{readTime} min</span></>}
                        </div>
                        <span>Ctrl+S para guardar</span>
                    </div>
                </div>
            )}
        </div>
    );
};

/* ─────────────────────────────────────────────
   VIDEO PREVIEW
───────────────────────────────────────────── */
const getEmbedUrl = (url) => {
    if (!url) return null;
    const match = String(url).match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/\s]+)/);
    return match?.[1] ? `https://www.youtube.com/embed/${match[1]}` : null;
};

const VideoPreview = ({ url }) => {
    const embedUrl = getEmbedUrl(url);
    return (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8 bg-[#0c0e13]">
            {embedUrl ? (
                <div className="w-full max-w-3xl">
                    <div className="relative w-full rounded-2xl overflow-hidden border border-white/7 shadow-2xl"
                        style={{ paddingTop: '56.25%' }}>
                        <iframe
                            src={embedUrl}
                            className="absolute inset-0 w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Vista previa del video"
                        />
                    </div>
                    <p className="text-center text-xs text-slate-600 mt-3 font-mono">{url}</p>
                </div>
            ) : (
                <div className="text-center space-y-3">
                    <div className="text-5xl">🎬</div>
                    <p className="text-sm font-bold text-slate-500">Sin URL de video</p>
                    <p className="text-xs text-slate-700">Pega una URL de YouTube en el campo de arriba para ver la previsualización.</p>
                </div>
            )}
        </div>
    );
};

/* ─────────────────────────────────────────────
   LESSON ITEM (left panel)
───────────────────────────────────────────── */
const LessonItem = ({ lesson, active, onClick }) => {
    const meta = TYPE_META[lesson.type] ?? TYPE_META.article;
    const Icon = meta.icon;
    return (
        <button onClick={onClick} className={`w-full flex items-start gap-2.5 px-3 py-2.5 text-left transition-all border-b border-white/4 hover:bg-white/4 group
            ${active ? 'bg-indigo-500/10 border-l-2 border-l-indigo-500 pl-2.5' : 'border-l-2 border-l-transparent'}`}>
            <div className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-md flex items-center justify-center ${meta.bg}`}>
                <Icon className={`w-2.5 h-2.5 ${meta.color}`}/>
            </div>
            <div className="flex-1 min-w-0">
                <div className={`text-xs font-semibold leading-tight line-clamp-2 ${active?'text-indigo-200':'text-slate-400 group-hover:text-slate-200'}`}>
                    {lesson.title}
                </div>
            </div>
        </button>
    );
};

export default AdminLeccionesPage;

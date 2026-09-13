import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Save, Bold, Italic, Link, Image,
    List, Quote, Code, Heading1, Heading2, Heading3,
    RefreshCw, Eye, FileText
} from 'lucide-react';
import api from '../../services/api';

/* ─────────────────────────────────────────────
   MARKDOWN RENDERER (lightweight, no deps)
───────────────────────────────────────────── */
const esc = (s) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const inlineMd = (raw) => {
    let s = esc(raw);
    return s
        .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g,
            '<img src="$2" alt="$1" style="max-width:100%;border-radius:10px;margin:10px 0;border:1px solid rgba(255,255,255,0.07);display:block" />')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g,
            '<a href="$2" target="_blank" rel="noreferrer" style="color:#818cf8;text-decoration:underline">$1</a>')
        .replace(/\*\*([^*\n]+)\*\*/g,
            '<strong style="color:#e2e8f0;font-weight:700">$1</strong>')
        .replace(/\*([^*\n]+)\*/g,
            '<em style="color:#cbd5e1">$1</em>')
        .replace(/`([^`\n]+)`/g,
            '<code style="background:rgba(255,255,255,0.07);padding:1px 6px;border-radius:4px;font-family:monospace;font-size:0.88em;color:#a5b4fc">$1</code>');
};

function renderMarkdown(md) {
    if (!md) return '';
    const lines = md.split('\n');
    const out = [];
    let inCode = false;
    let codeLang = '';
    let codeLines = [];
    let inList = false;
    let listType = '';
    let listItems = [];

    const flushList = () => {
        if (!inList) return;
        const tag = listType === 'ul' ? 'ul' : 'ol';
        const style = 'padding-left:20px;margin:8px 0';
        out.push(`<${tag} style="${style}">${listItems.map(li =>
            `<li style="margin:4px 0;color:#94a3b8;font-size:13px;line-height:1.7">${li}</li>`
        ).join('')}</${tag}>`);
        inList = false;
        listItems = [];
    };

    for (const line of lines) {
        if (line.startsWith('```')) {
            if (!inCode) {
                flushList();
                inCode = true;
                codeLang = line.slice(3).trim();
                codeLines = [];
            } else {
                inCode = false;
                const code = esc(codeLines.join('\n'));
                out.push(`<pre style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px 16px;overflow-x:auto;margin:12px 0"><code style="font-family:monospace;font-size:12px;line-height:1.6;color:#94a3b8">${code}</code></pre>`);
            }
            continue;
        }
        if (inCode) { codeLines.push(line); continue; }

        // List items
        if (/^[-*+] /.test(line) || /^\d+\. /.test(line)) {
            const isUl = /^[-*+] /.test(line);
            const content = isUl ? line.slice(2) : line.replace(/^\d+\.\s+/, '');
            const newType = isUl ? 'ul' : 'ol';
            if (!inList) { inList = true; listType = newType; }
            else if (listType !== newType) { flushList(); inList = true; listType = newType; }
            listItems.push(inlineMd(content));
            continue;
        }

        flushList();

        if (line.startsWith('# ')) {
            out.push(`<h1 style="font-size:20px;font-weight:900;color:#f1f5f9;margin:4px 0 14px;letter-spacing:-0.4px;line-height:1.2">${inlineMd(line.slice(2))}</h1>`);
        } else if (line.startsWith('## ')) {
            out.push(`<h2 style="font-size:14px;font-weight:800;color:#a5b4fc;margin:20px 0 8px;padding-left:10px;border-left:2px solid #4f46e5;line-height:1.3">${inlineMd(line.slice(3))}</h2>`);
        } else if (line.startsWith('### ')) {
            out.push(`<h3 style="font-size:13px;font-weight:700;color:#94a3b8;margin:14px 0 5px">${inlineMd(line.slice(4))}</h3>`);
        } else if (line.startsWith('> ')) {
            out.push(`<blockquote style="border-left:3px solid #4f46e5;padding:10px 14px;margin:12px 0;background:rgba(79,70,229,0.07);border-radius:0 10px 10px 0"><p style="color:#818cf8;margin:0;font-style:italic;font-size:13px;line-height:1.7">${inlineMd(line.slice(2))}</p></blockquote>`);
        } else if (/^---+$/.test(line.trim())) {
            out.push('<hr style="border:none;border-top:1px solid rgba(255,255,255,0.07);margin:16px 0" />');
        } else if (line.trim() === '') {
            out.push('<div style="height:6px"></div>');
        } else {
            out.push(`<p style="color:#94a3b8;margin:0 0 10px;font-size:13px;line-height:1.75">${inlineMd(line)}</p>`);
        }
    }

    flushList();
    if (inCode && codeLines.length) {
        out.push(`<pre style="background:rgba(255,255,255,0.04);padding:14px;border-radius:10px"><code>${esc(codeLines.join('\n'))}</code></pre>`);
    }
    return out.join('');
}

/* ─────────────────────────────────────────────
   TOOLBAR BUTTON
───────────────────────────────────────────── */
const TbBtn = ({ icon: Icon, label, onClick, text }) => (
    <button
        title={label}
        onClick={onClick}
        className="h-7 px-2 flex items-center justify-center rounded-md text-slate-500 hover:text-slate-200 hover:bg-white/8 transition-colors"
    >
        {Icon ? <Icon className="w-3.5 h-3.5" /> : <span className="text-[11px] font-black">{text}</span>}
    </button>
);

const TbSep = () => <div className="w-px h-4 bg-white/10 mx-1 self-center" />;

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const AdminLeccionEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const taRef = useRef(null);

    const [lesson, setLesson] = useState(null);
    const [courses, setCourses] = useState([]);
    const [form, setForm] = useState({ title: '', type: 'article', videoUrl: '', content: '', moduleId: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(true);
    const [toast, setToast] = useState(null);
    const [activeTab, setActiveTab] = useState('editor'); // editor | preview

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Fetch lesson + courses
    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const [{ data: l }, { data: cs }] = await Promise.all([
                    api.get(`/api/admin/lessons/${id}`),
                    api.get('/api/admin/courses'),
                ]);
                setLesson(l);
                setForm({
                    title: l.title ?? '',
                    type: l.type ?? 'article',
                    videoUrl: l.videoUrl ?? '',
                    content: l.content ?? '',
                    moduleId: l.moduleId?._id ?? l.moduleId ?? '',
                });
                setCourses(cs);
            } catch {
                showToast('No se pudo cargar la lección', 'error');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    // Mark unsaved on form change
    const setField = (key, val) => {
        setForm(f => ({ ...f, [key]: val }));
        setSaved(false);
    };

    // Save
    const handleSave = useCallback(async () => {
        setSaving(true);
        try {
            await api.patch(`/api/admin/lessons/${id}`, form);
            setSaved(true);
            showToast('Lección guardada');
        } catch {
            showToast('Error al guardar', 'error');
        } finally {
            setSaving(false);
        }
    }, [id, form]);

    // Ctrl+S
    useEffect(() => {
        const onKey = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                handleSave();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [handleSave]);

    // Toolbar: insert format at cursor
    const insertFormat = (type) => {
        const ta = taRef.current;
        if (!ta) return;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const selected = form.content.slice(start, end);
        const before = form.content.slice(0, start);
        const after = form.content.slice(end);

        let insert = '';
        let cursorAfter = 0;

        switch (type) {
            case 'bold':
                insert = `**${selected || 'texto'}**`;
                cursorAfter = selected ? start + insert.length : start + 2;
                break;
            case 'italic':
                insert = `*${selected || 'texto'}*`;
                cursorAfter = selected ? start + insert.length : start + 1;
                break;
            case 'h1':
                insert = `\n# ${selected || 'Título principal'}\n`;
                cursorAfter = start + insert.length;
                break;
            case 'h2':
                insert = `\n## ${selected || 'Subtítulo'}\n`;
                cursorAfter = start + insert.length;
                break;
            case 'h3':
                insert = `\n### ${selected || 'Sección'}\n`;
                cursorAfter = start + insert.length;
                break;
            case 'link': {
                const url = window.prompt('URL del enlace:');
                if (!url) return;
                insert = `[${selected || 'texto'}](${url})`;
                cursorAfter = start + insert.length;
                break;
            }
            case 'image': {
                const url = window.prompt('URL de la imagen:');
                if (!url) return;
                insert = `\n![descripción de imagen](${url})\n`;
                cursorAfter = start + insert.length;
                break;
            }
            case 'list':
                insert = `\n- ${selected || 'elemento de lista'}\n`;
                cursorAfter = start + insert.length;
                break;
            case 'quote':
                insert = `\n> ${selected || 'cita o nota importante'}\n`;
                cursorAfter = start + insert.length;
                break;
            case 'code':
                if (selected.includes('\n')) {
                    insert = `\n\`\`\`\n${selected}\n\`\`\`\n`;
                } else {
                    insert = `\`${selected || 'código'}\``;
                }
                cursorAfter = start + insert.length;
                break;
            default: return;
        }

        const newContent = before + insert + after;
        setField('content', newContent);
        requestAnimationFrame(() => {
            ta.focus();
            ta.setSelectionRange(cursorAfter, cursorAfter);
        });
    };

    // Word count + reading time
    const wordCount = useMemo(() => {
        const words = (form.content ?? '').trim().split(/\s+/).filter(Boolean);
        return words.length;
    }, [form.content]);

    const readTime = Math.max(1, Math.round(wordCount / 200));

    // Preview HTML
    const previewHtml = useMemo(() => renderMarkdown(form.content), [form.content]);

    // Selected course + modules for module selector
    const allModules = courses.flatMap(c => (c.modules ?? []).map(m => ({ ...m, courseName: c.title })));
    const currentModule = allModules.find(m => m._id === form.moduleId || m._id?.toString() === form.moduleId?.toString());

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-indigo-900 border-t-indigo-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-bold shadow-xl
                    ${toast.type === 'error' ? 'bg-red-900/90 text-red-200' : 'bg-green-900/90 text-green-200'}`}>
                    {toast.msg}
                </div>
            )}

            {/* ── TOPBAR ── */}
            <header className="flex items-center justify-between px-5 h-12 border-b border-white/7 bg-[#0a0c10]/95 backdrop-blur-md flex-shrink-0 gap-4">
                <div className="flex items-center gap-3 min-w-0">
                    <button
                        onClick={() => navigate('/admin/lecciones')}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/7 bg-white/3 hover:bg-white/7 text-slate-400 hover:text-slate-200 text-xs font-bold transition-all flex-shrink-0">
                        <ArrowLeft className="w-3.5 h-3.5" /> Lecciones
                    </button>
                    <div className="w-px h-4 bg-white/10 flex-shrink-0" />
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-1.5 text-xs min-w-0 overflow-hidden">
                        <span className="text-slate-600 flex-shrink-0">Contenido</span>
                        <span className="text-slate-700 flex-shrink-0">/</span>
                        <span className="text-slate-600 flex-shrink-0">Lecciones</span>
                        <span className="text-slate-700 flex-shrink-0">/</span>
                        <span className="text-slate-300 font-semibold truncate">{form.title || 'Sin título'}</span>
                    </div>
                    {/* Type chip */}
                    <div className={`flex-shrink-0 flex items-center gap-1.5 px-2 py-1 rounded-md border text-[9px] font-black uppercase tracking-widest
                        ${form.type === 'video' ? 'bg-violet-500/10 border-violet-500/25 text-violet-400'
                        : form.type === 'guide' ? 'bg-green-500/10 border-green-500/25 text-green-400'
                        : 'bg-blue-500/10 border-blue-500/25 text-blue-400'}`}>
                        {form.type === 'video' ? '🎬' : form.type === 'guide' ? '📋' : '📄'}
                        {form.type === 'video' ? 'Video' : form.type === 'guide' ? 'Guía' : 'Artículo'}
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Save status */}
                    <div className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border
                        ${saved
                            ? 'text-green-400 border-green-500/20 bg-green-500/5'
                            : 'text-amber-400 border-amber-500/20 bg-amber-500/5'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${saved ? 'bg-green-400' : 'bg-amber-400 animate-pulse'}`} />
                        {saved ? 'Guardado' : 'Sin guardar'}
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-60">
                        {saving
                            ? <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            : <Save className="w-3.5 h-3.5" />}
                        {saving ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </header>

            {/* ── META ROW ── */}
            <div className="flex items-center gap-3 px-5 py-2.5 border-b border-white/7 bg-[#0d0f14] flex-shrink-0">
                {/* Title */}
                <div className="flex-1 min-w-0">
                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-1">Título</div>
                    <input
                        value={form.title}
                        onChange={(e) => setField('title', e.target.value)}
                        className="w-full bg-white/4 border border-white/7 rounded-lg px-3 py-1.5 text-sm text-slate-200 outline-none focus:border-indigo-500/40 focus:bg-white/6 transition-all"
                    />
                </div>
                <div className="w-px h-8 bg-white/7 flex-shrink-0" />
                {/* Type */}
                <div className="w-32 flex-shrink-0">
                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-1">Tipo</div>
                    <select
                        value={form.type}
                        onChange={(e) => setField('type', e.target.value)}
                        className="w-full bg-white/4 border border-white/7 rounded-lg px-3 py-1.5 text-sm text-slate-200 outline-none focus:border-indigo-500/40 transition-all">
                        <option value="article">Artículo</option>
                        <option value="video">Video</option>
                        <option value="guide">Guía</option>
                    </select>
                </div>
                <div className="w-px h-8 bg-white/7 flex-shrink-0" />
                {/* Module */}
                <div className="w-64 flex-shrink-0">
                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-1">Módulo</div>
                    <select
                        value={form.moduleId}
                        onChange={(e) => setField('moduleId', e.target.value)}
                        className="w-full bg-white/4 border border-white/7 rounded-lg px-3 py-1.5 text-sm text-slate-200 outline-none focus:border-indigo-500/40 transition-all">
                        <option value="">— Sin módulo —</option>
                        {courses.map((c) => (
                            <optgroup key={c._id} label={c.title}>
                                {(c.modules ?? []).map((m) => (
                                    <option key={m._id} value={m._id}>{m.title}</option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>
                {/* Video URL (only for video type) */}
                {form.type === 'video' && (
                    <>
                        <div className="w-px h-8 bg-white/7 flex-shrink-0" />
                        <div className="w-72 flex-shrink-0">
                            <div className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-1">URL de video</div>
                            <input
                                value={form.videoUrl}
                                onChange={(e) => setField('videoUrl', e.target.value)}
                                placeholder="https://youtube.com/watch?v=..."
                                className="w-full bg-white/4 border border-white/7 rounded-lg px-3 py-1.5 text-sm text-slate-200 outline-none focus:border-indigo-500/40 transition-all placeholder-slate-700"
                            />
                        </div>
                    </>
                )}
            </div>

            {/* ── EDITOR BODY ── */}
            {form.type === 'video' ? (
                /* Video lesson: no split editor, just a centered message */
                <div className="flex-1 flex items-center justify-center text-slate-600">
                    <div className="text-center space-y-2">
                        <div className="text-4xl">🎬</div>
                        <p className="text-sm font-bold">Lección de video</p>
                        <p className="text-xs">El contenido de esta lección es el video de YouTube indicado arriba.</p>
                    </div>
                </div>
            ) : (
                <div className="flex-1 grid grid-cols-2 overflow-hidden">

                    {/* LEFT: Markdown editor */}
                    <div className="flex flex-col border-r border-white/7 overflow-hidden">
                        {/* Toolbar */}
                        <div className="flex items-center px-3 h-9 border-b border-white/7 bg-[#0d0f14] gap-0.5 flex-shrink-0 overflow-x-auto">
                            <div className="flex items-center gap-0.5 mr-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 ml-1.5">Markdown</span>
                            </div>
                            <TbSep />
                            <TbBtn icon={Bold}    label="Negrita (Ctrl+B)"   onClick={() => insertFormat('bold')} />
                            <TbBtn icon={Italic}  label="Cursiva (Ctrl+I)"   onClick={() => insertFormat('italic')} />
                            <TbSep />
                            <TbBtn icon={Heading1} label="Título H1"         onClick={() => insertFormat('h1')} />
                            <TbBtn icon={Heading2} label="Subtítulo H2"      onClick={() => insertFormat('h2')} />
                            <TbBtn icon={Heading3} label="Sección H3"        onClick={() => insertFormat('h3')} />
                            <TbSep />
                            <TbBtn icon={Link}     label="Enlace"            onClick={() => insertFormat('link')} />
                            <TbBtn icon={Image}    label="Imagen (URL)"      onClick={() => insertFormat('image')} />
                            <TbSep />
                            <TbBtn icon={List}     label="Lista"             onClick={() => insertFormat('list')} />
                            <TbBtn icon={Quote}    label="Cita/Nota"         onClick={() => insertFormat('quote')} />
                            <TbBtn icon={Code}     label="Código"            onClick={() => insertFormat('code')} />
                        </div>

                        {/* Textarea */}
                        <textarea
                            ref={taRef}
                            value={form.content}
                            onChange={(e) => setField('content', e.target.value)}
                            spellCheck={false}
                            placeholder="# Título de la lección&#10;&#10;Escribe el contenido aquí en formato Markdown..."
                            className="flex-1 bg-transparent resize-none outline-none p-4 font-mono text-[12.5px] leading-[1.8] text-slate-400 placeholder-slate-700 overflow-y-auto"
                            style={{ tabSize: 2 }}
                        />
                    </div>

                    {/* RIGHT: Live preview */}
                    <div className="flex flex-col overflow-hidden bg-[#0c0e13]">
                        {/* Preview header */}
                        <div className="flex items-center justify-between px-4 h-9 border-b border-white/7 bg-[#0d0f14] flex-shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">Vista previa en tiempo real</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[9px] font-bold text-green-500">
                                <div className="w-1 h-1 rounded-full bg-green-500" />
                                Sincronizado
                            </div>
                        </div>

                        {/* Preview content */}
                        <div
                            className="flex-1 overflow-y-auto p-5"
                            dangerouslySetInnerHTML={{ __html: previewHtml || '<p style="color:#334155;font-size:13px;font-style:italic">El contenido renderizado aparecerá aquí...</p>' }}
                        />
                    </div>
                </div>
            )}

            {/* ── STATUS BAR ── */}
            <div className="flex items-center justify-between px-5 h-7 border-t border-white/7 bg-[#080a0d] flex-shrink-0">
                <div className="flex items-center gap-4 text-[10px] text-slate-600 font-semibold">
                    <span className="flex items-center gap-1">
                        <FileText className="w-2.5 h-2.5" />
                        {form.type === 'video' ? 'Video' : form.type === 'guide' ? 'Guía' : 'Artículo'}
                    </span>
                    {currentModule && <span>· {currentModule.courseName} › {currentModule.title}</span>}
                    {form.type !== 'video' && (
                        <>
                            <span>· {wordCount.toLocaleString()} palabras</span>
                            <span>· ~{readTime} min de lectura</span>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-4 text-[10px] text-slate-600 font-semibold">
                    {!saved && <span className="text-amber-500">⚠ Cambios sin guardar</span>}
                    <span>Ctrl+S para guardar</span>
                </div>
            </div>
        </div>
    );
};

export default AdminLeccionEditor;

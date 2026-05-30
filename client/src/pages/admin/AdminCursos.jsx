import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Users, RefreshCw } from 'lucide-react';
import api from '../../services/api';

const AdminCursos = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(null);
    const [editing, setEditing] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null);

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/admin/courses');
            setCourses(data);
        } catch { showToast('Error al cargar cursos', 'error'); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchCourses(); }, []);

    const startEdit = (course) => {
        setEditing(course._id);
        setEditForm({ title: course.title, description: course.description });
    };

    const saveEdit = async (courseId) => {
        setSaving(true);
        try {
            await api.patch(`/api/admin/courses/${courseId}`, editForm);
            showToast('Curso actualizado');
            setEditing(null);
            fetchCourses();
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

            <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b border-white/7 bg-[#0a0c10]/90 backdrop-blur-md">
                <div>
                    <h1 className="text-lg font-black">Cursos y módulos</h1>
                    <p className="text-xs text-slate-500 mt-0.5">{courses.length} cursos en la plataforma</p>
                </div>
                <button onClick={fetchCourses} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/7 bg-white/3 hover:bg-white/7 text-slate-400 text-xs font-bold transition-all">
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                    Actualizar
                </button>
            </header>

            <div className="p-6 space-y-4">
                {loading ? (
                    <div className="text-center py-16 text-slate-600 text-sm">Cargando...</div>
                ) : courses.map((course) => {
                    const isExpanded = expanded === course._id;
                    const isEditing = editing === course._id;

                    return (
                        <div key={course._id} className="bg-[#111318] border border-white/7 rounded-2xl overflow-hidden">
                            <div className="flex items-start gap-4 p-5">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                                    <BookOpen className="w-5 h-5 text-indigo-400" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    {isEditing ? (
                                        <div className="space-y-2">
                                            <input
                                                value={editForm.title}
                                                onChange={(e) => setEditForm(f => ({ ...f, title: e.target.value }))}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-200 outline-none focus:border-indigo-500/50"
                                            />
                                            <textarea
                                                value={editForm.description}
                                                onChange={(e) => setEditForm(f => ({ ...f, description: e.target.value }))}
                                                rows={2}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-200 outline-none focus:border-indigo-500/50 resize-none"
                                            />
                                            <div className="flex gap-2">
                                                <button onClick={() => saveEdit(course._id)} disabled={saving}
                                                    className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors">
                                                    {saving ? 'Guardando...' : 'Guardar'}
                                                </button>
                                                <button onClick={() => setEditing(null)}
                                                    className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-xs font-bold">
                                                    Cancelar
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <h3 className="font-black text-slate-100">{course.title}</h3>
                                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{course.description}</p>
                                            <div className="flex gap-4 mt-2 text-xs text-slate-500">
                                                <span>📦 {course.modules?.length ?? 0} módulos</span>
                                                <span>📝 {course.lessonCount ?? 0} lecciones</span>
                                                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {course.enrolledCount ?? 0} usuarios</span>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {!isEditing && (
                                    <div className="flex gap-2 flex-shrink-0">
                                        <button onClick={() => startEdit(course)}
                                            className="px-3 py-1.5 rounded-xl border border-white/7 bg-white/3 text-slate-400 text-xs font-bold hover:bg-white/7 transition-colors">
                                            Editar
                                        </button>
                                        <button onClick={() => setExpanded(isExpanded ? null : course._id)}
                                            className="w-8 h-8 flex items-center justify-center rounded-xl border border-white/7 bg-white/3 text-slate-400 hover:bg-white/7 transition-colors">
                                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {isExpanded && course.modules?.length > 0 && (
                                <div className="border-t border-white/7 divide-y divide-white/5">
                                    {course.modules.map((mod, idx) => (
                                        <div key={mod._id} className="flex items-center gap-3 px-5 py-3 hover:bg-white/2">
                                            <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-[11px] font-black text-slate-500 flex-shrink-0">
                                                {idx + 1}
                                            </div>
                                            <span className="text-sm text-slate-300 font-medium flex-1">{mod.title}</span>
                                            <span className="text-xs text-slate-600 font-bold">{mod.lessonOrder?.length ?? 0} lec.</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AdminCursos;

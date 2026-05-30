import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, CheckCircle, Trash2, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import api from '../../services/api';

const URGENCY = {
    'Reporte de caso': { label: 'Urgente', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
    'Solicitud de orientación': { label: 'Medio', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    'Sugerencia': { label: 'Bajo', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    'Otro': { label: 'Info', color: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
};

const AdminReportes = () => {
    const [reports, setReports] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('pendiente');
    const [expanded, setExpanded] = useState(null);
    const [actionLoading, setActionLoading] = useState(null);
    const [toast, setToast] = useState(null);

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchReports = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/admin/reports', {
                params: { page, limit: 15, status: statusFilter },
            });
            setReports(data.reports);
            setTotal(data.total);
            setPages(data.pages);
        } catch {
            showToast('Error al cargar reportes', 'error');
        } finally {
            setLoading(false);
        }
    }, [page, statusFilter]);

    useEffect(() => { fetchReports(); }, [fetchReports]);

    const handleResolve = async (report) => {
        const newStatus = report.status === 'pendiente' ? 'revisado' : 'pendiente';
        setActionLoading(report._id + '-status');
        try {
            await api.patch(`/api/admin/reports/${report._id}`, { status: newStatus });
            showToast(`Marcado como ${newStatus}`);
            fetchReports();
        } catch { showToast('Error', 'error'); }
        finally { setActionLoading(null); }
    };

    const handleDelete = async (report) => {
        if (!window.confirm('¿Eliminar este reporte permanentemente?')) return;
        setActionLoading(report._id + '-delete');
        try {
            await api.delete(`/api/admin/reports/${report._id}`);
            showToast('Reporte eliminado');
            fetchReports();
        } catch { showToast('Error', 'error'); }
        finally { setActionLoading(null); }
    };

    const urgencyOf = (r) => URGENCY[r.messageType] ?? URGENCY['Otro'];

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
                    <h1 className="text-lg font-black">Reportes de incidentes</h1>
                    <p className="text-xs text-slate-500 mt-0.5">{total} {statusFilter === 'pendiente' ? 'pendientes' : 'reportes'}</p>
                </div>
                <button onClick={fetchReports} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/7 bg-white/3 hover:bg-white/7 text-slate-400 text-xs font-bold transition-all">
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                    Actualizar
                </button>
            </header>

            <div className="p-6 space-y-4">
                {/* Filters */}
                <div className="flex gap-2">
                    {[['pendiente', 'Pendientes', 'text-amber-400'], ['revisado', 'Revisados', 'text-green-400'], ['', 'Todos', 'text-slate-400']].map(([val, label, cls]) => (
                        <button
                            key={val}
                            onClick={() => { setStatusFilter(val); setPage(1); }}
                            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all
                                ${statusFilter === val
                                    ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25'
                                    : `bg-white/3 border-white/7 hover:bg-white/7 ${cls}`}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Reports list */}
                <div className="space-y-3">
                    {loading ? (
                        <div className="text-center py-16 text-slate-600 text-sm">Cargando...</div>
                    ) : reports.length === 0 ? (
                        <div className="text-center py-16 text-slate-600">
                            <AlertTriangle className="w-10 h-10 mx-auto mb-3 opacity-30" />
                            <p className="text-sm">No hay reportes {statusFilter === 'pendiente' ? 'pendientes' : ''}</p>
                        </div>
                    ) : reports.map((r) => {
                        const urg = urgencyOf(r);
                        const isExpanded = expanded === r._id;

                        return (
                            <div key={r._id} className={`bg-[#111318] border rounded-2xl overflow-hidden transition-all
                                ${r.status === 'pendiente' ? 'border-amber-500/20' : 'border-white/7'}`}>

                                {/* Header */}
                                <div className="flex items-start gap-4 p-4">
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5
                                        ${r.status === 'pendiente' ? 'bg-amber-500/10' : 'bg-green-500/10'}`}>
                                        {r.status === 'pendiente'
                                            ? <AlertTriangle className="w-4 h-4 text-amber-400" />
                                            : <CheckCircle className="w-4 h-4 text-green-400" />}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap gap-2 mb-1.5">
                                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${urg.color}`}>
                                                {urg.label}
                                            </span>
                                            <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-slate-700 text-slate-500">
                                                {r.messageType}
                                            </span>
                                            {r.platform && (
                                                <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-indigo-500/20 text-indigo-400">
                                                    {r.platform}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-sm font-bold text-slate-200 line-clamp-1">{r.title}</h3>
                                        <div className="flex flex-wrap gap-3 mt-1 text-xs text-slate-500">
                                            <span>👤 {r.userId?.name ?? 'Usuario'} · {r.userId?.email}</span>
                                            <span>📅 {new Date(r.createdAt).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                            {r.category && <span>🏷 {r.category}</span>}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <button
                                            onClick={() => setExpanded(isExpanded ? null : r._id)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/7 bg-white/3 text-slate-500 hover:text-slate-300 transition-colors"
                                        >
                                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                        </button>
                                        <button
                                            onClick={() => handleResolve(r)}
                                            disabled={actionLoading === r._id + '-status'}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all
                                                ${r.status === 'pendiente'
                                                    ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20'
                                                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20'}`}
                                        >
                                            <CheckCircle className="w-3.5 h-3.5" />
                                            {r.status === 'pendiente' ? 'Resolver' : 'Reabrir'}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(r)}
                                            disabled={actionLoading === r._id + '-delete'}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500/15 transition-colors"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Expanded details */}
                                {isExpanded && (
                                    <div className="border-t border-white/7 p-4 space-y-3">
                                        <div>
                                            <div className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-1">Descripción</div>
                                            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{r.description}</p>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {[
                                                ['Edad del menor', r.ageRange],
                                                ['Fecha del incidente', r.incidentDate],
                                                ['Dónde ocurrió', r.contactContext],
                                                ['Acciones tomadas', r.actionsTaken],
                                                ['Evidencia disponible', r.evidenceAvailable ? 'Sí' : 'No'],
                                                ['Preferencia de respuesta', r.preferredReply],
                                            ].filter(([, v]) => v).map(([label, value]) => (
                                                <div key={label} className="bg-white/3 rounded-xl p-3">
                                                    <div className="text-[9px] font-black uppercase tracking-wider text-slate-600 mb-0.5">{label}</div>
                                                    <div className="text-xs text-slate-300 font-medium">{value}</div>
                                                </div>
                                            ))}
                                        </div>
                                        {r.evidenceDescription && (
                                            <div className="bg-white/3 rounded-xl p-3">
                                                <div className="text-[9px] font-black uppercase tracking-wider text-slate-600 mb-0.5">Detalle de evidencia</div>
                                                <div className="text-xs text-slate-300">{r.evidenceDescription}</div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Pagination */}
                {pages > 1 && (
                    <div className="flex items-center justify-between">
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
    );
};

export default AdminReportes;

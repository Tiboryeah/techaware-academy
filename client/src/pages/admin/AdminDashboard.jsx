import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Users, CheckCircle, AlertTriangle, BookOpen, HelpCircle,
    MessageSquare, TrendingUp, Activity, ArrowRight, RefreshCw
} from 'lucide-react';
import api from '../../services/api';

const KpiCard = ({ icon: Icon, label, value, sub, color, link }) => (
    <Link to={link ?? '#'} className={`block bg-[#111318] border border-white/7 rounded-2xl p-5 hover:border-white/15 transition-all group ${link ? 'cursor-pointer' : 'cursor-default'}`}>
        <div className="flex items-start justify-between mb-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
            </div>
            {link && <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />}
        </div>
        <div className="text-3xl font-black tracking-tight mb-1">{value ?? '—'}</div>
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</div>
        {sub && <div className="text-xs text-slate-600 mt-1">{sub}</div>}
    </Link>
);

const SectionCard = ({ title, children, action }) => (
    <div className="bg-[#111318] border border-white/7 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/7">
            <div className="flex items-center gap-2">
                <div className="w-1 h-4 rounded-full bg-gradient-to-b from-indigo-500 to-violet-500" />
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-300">{title}</h3>
            </div>
            {action}
        </div>
        {children}
    </div>
);

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchStats = async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        try {
            const { data } = await api.get('/api/admin/stats');
            setStats(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => { fetchStats(); }, []);

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="h-10 w-10 rounded-full border-4 border-indigo-900 border-t-indigo-500 animate-spin" />
            </div>
        );
    }

    const s = stats ?? {};

    return (
        <div className="flex-1 flex flex-col">
            {/* Topbar */}
            <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b border-white/7 bg-[#0a0c10]/90 backdrop-blur-md">
                <div>
                    <h1 className="text-lg font-black">Dashboard</h1>
                    <p className="text-xs text-slate-500 mt-0.5">Vista general de la plataforma</p>
                </div>
                <button
                    onClick={() => fetchStats(true)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/7 bg-white/3 hover:bg-white/7 text-slate-400 text-xs font-bold transition-all"
                >
                    <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                    Actualizar
                </button>
            </header>

            <div className="p-6 space-y-6">

                {/* KPIs */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <KpiCard
                        icon={Users}
                        label="Usuarios registrados"
                        value={s.users?.total?.toLocaleString()}
                        sub={`${s.users?.verified} verificados · ${s.users?.unverified} sin verificar`}
                        color="bg-indigo-500/10 text-indigo-400"
                        link="/admin/usuarios"
                    />
                    <KpiCard
                        icon={CheckCircle}
                        label="Lecciones completadas"
                        value={s.activity?.completedLessons?.toLocaleString()}
                        sub="Total acumulado de todos los usuarios"
                        color="bg-green-500/10 text-green-400"
                    />
                    <KpiCard
                        icon={AlertTriangle}
                        label="Reportes pendientes"
                        value={s.reports?.pending}
                        sub="Requieren revisión"
                        color="bg-red-500/10 text-red-400"
                        link="/admin/reportes"
                    />
                    <KpiCard
                        icon={MessageSquare}
                        label="Conversaciones Kuxibot"
                        value={s.activity?.chatbotConversations?.toLocaleString()}
                        sub="Total de sesiones de chat"
                        color="bg-cyan-500/10 text-cyan-400"
                    />
                </div>

                {/* Content stats + activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                    {/* Content overview */}
                    <SectionCard
                        title="Contenido de la plataforma"
                        action={
                            <Link to="/admin/cursos" className="text-xs text-indigo-400 font-bold hover:underline">
                                Gestionar →
                            </Link>
                        }
                    >
                        <div className="divide-y divide-white/5">
                            {[
                                { label: 'Cursos', value: s.content?.courses, icon: BookOpen, color: 'text-indigo-400', link: '/admin/cursos' },
                                { label: 'Lecciones', value: s.content?.lessons, icon: BookOpen, color: 'text-blue-400', link: '/admin/lecciones' },
                                { label: 'Preguntas en banco', value: s.content?.questions, icon: HelpCircle, color: 'text-amber-400', link: '/admin/preguntas' },
                                { label: 'Casos reales', value: s.content?.cases, icon: Activity, color: 'text-green-400', link: '/admin/casos' },
                                { label: 'Recursos editoriales', value: s.content?.resources, icon: BookOpen, color: 'text-purple-400', link: '/admin/recursos' },
                            ].map((item) => (
                                <Link key={item.label} to={item.link} className="flex items-center justify-between px-5 py-3 hover:bg-white/3 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <item.icon className={`w-4 h-4 ${item.color}`} />
                                        <span className="text-sm text-slate-300 font-medium">{item.label}</span>
                                    </div>
                                    <span className="text-sm font-black text-slate-200">{item.value ?? '—'}</span>
                                </Link>
                            ))}
                        </div>
                    </SectionCard>

                    {/* Users summary */}
                    <SectionCard
                        title="Resumen de usuarios"
                        action={
                            <Link to="/admin/usuarios" className="text-xs text-indigo-400 font-bold hover:underline">
                                Ver todos →
                            </Link>
                        }
                    >
                        <div className="p-5 space-y-4">
                            {[
                                { label: 'Total registrados', value: s.users?.total, pct: 100, color: 'bg-indigo-500' },
                                { label: 'Verificados', value: s.users?.verified, pct: s.users?.total ? Math.round((s.users.verified / s.users.total) * 100) : 0, color: 'bg-green-500' },
                                { label: 'Sin verificar', value: s.users?.unverified, pct: s.users?.total ? Math.round((s.users.unverified / s.users.total) * 100) : 0, color: 'bg-amber-500' },
                                { label: 'Registrados esta semana', value: s.users?.recentWeek, pct: s.users?.total ? Math.min(100, Math.round(((s.users.recentWeek ?? 0) / s.users.total) * 100)) : 0, color: 'bg-violet-500' },
                            ].map((item) => (
                                <div key={item.label}>
                                    <div className="flex justify-between text-xs font-bold mb-1.5">
                                        <span className="text-slate-400">{item.label}</span>
                                        <span className="text-slate-200">{item.value ?? '—'}</span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                </div>

                {/* Quick actions */}
                <SectionCard title="Acciones rápidas">
                    <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { label: 'Ver usuarios', icon: Users, link: '/admin/usuarios', color: 'bg-indigo-500/10 text-indigo-400' },
                            { label: 'Revisar reportes', icon: AlertTriangle, link: '/admin/reportes', color: 'bg-red-500/10 text-red-400' },
                            { label: 'Gestionar lecciones', icon: BookOpen, link: '/admin/lecciones', color: 'bg-blue-500/10 text-blue-400' },
                            { label: 'Banco de preguntas', icon: HelpCircle, link: '/admin/preguntas', color: 'bg-amber-500/10 text-amber-400' },
                        ].map((a) => (
                            <Link key={a.label} to={a.link}
                                className="flex items-center gap-3 p-3 rounded-xl border border-white/7 hover:border-white/15 hover:bg-white/3 transition-all group">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${a.color}`}>
                                    <a.icon className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-bold text-slate-400 group-hover:text-slate-200">{a.label}</span>
                            </Link>
                        ))}
                    </div>
                </SectionCard>

            </div>
        </div>
    );
};

export default AdminDashboard;

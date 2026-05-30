import React, { useContext, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Users, FileText, BookOpen, GraduationCap,
    HelpCircle, Search, Package, BarChart3, Bot, Settings,
    LogOut, ChevronRight, Bell, Menu, X, Shield
} from 'lucide-react';
import AuthContext from '../context/AuthContext';

const NAV = [
    {
        section: 'General',
        items: [
            { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
            { label: 'Usuarios', path: '/admin/usuarios', icon: Users, badge: null },
            { label: 'Reportes', path: '/admin/reportes', icon: FileText, badge: 'red' },
        ],
    },
    {
        section: 'Contenido',
        items: [
            { label: 'Cursos y módulos', path: '/admin/cursos', icon: BookOpen },
            { label: 'Lecciones', path: '/admin/lecciones', icon: GraduationCap },
            { label: 'Banco de preguntas', path: '/admin/preguntas', icon: HelpCircle },
            { label: 'Casos reales', path: '/admin/casos', icon: Search },
            { label: 'Recursos editoriales', path: '/admin/recursos', icon: Package },
        ],
    },
    {
        section: 'Sistema',
        items: [
            { label: 'Analytics', path: '/admin/analytics', icon: BarChart3, soon: true },
            { label: 'Kuxibot logs', path: '/admin/chatbot', icon: Bot, soon: true },
        ],
    },
];

const NavItem = ({ item, collapsed }) => {
    const location = useLocation();
    const isActive = item.exact
        ? location.pathname === item.path
        : location.pathname.startsWith(item.path);

    return (
        <Link
            to={item.soon ? '#' : item.path}
            onClick={(e) => item.soon && e.preventDefault()}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all
                ${isActive
                    ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/25'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}
                ${item.soon ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {!collapsed && (
                <>
                    <span className="flex-1">{item.label}</span>
                    {item.soon && (
                        <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-slate-700 text-slate-500">
                            Pronto
                        </span>
                    )}
                    {isActive && !item.soon && <ChevronRight className="w-3 h-3 opacity-50" />}
                </>
            )}
        </Link>
    );
};

const AdminLayout = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/iniciar-sesion');
    };

    return (
        <div className="flex min-h-screen bg-[#0a0c10] text-slate-100">

            {/* SIDEBAR */}
            <aside className={`${collapsed ? 'w-16' : 'w-64'} flex-shrink-0 flex flex-col border-r border-white/7 bg-[#0d1117] transition-all duration-200 sticky top-0 h-screen overflow-y-auto`}>

                {/* Logo */}
                <div className={`flex items-center gap-3 p-4 border-b border-white/7 ${collapsed ? 'justify-center' : ''}`}>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4 text-white" />
                    </div>
                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <div className="font-black text-sm">
                                Kuxi<span className="text-indigo-400">pilli</span>
                            </div>
                            <div className="text-[9px] font-black uppercase tracking-widest text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded w-fit">
                                Admin
                            </div>
                        </div>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/5 text-slate-500 hover:text-slate-300 flex-shrink-0"
                    >
                        {collapsed ? <Menu className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
                    {NAV.map((group) => (
                        <div key={group.section}>
                            {!collapsed && (
                                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 px-3 pb-1">
                                    {group.section}
                                </div>
                            )}
                            <div className="space-y-0.5">
                                {group.items.map((item) => (
                                    <NavItem key={item.path} item={item} collapsed={collapsed} />
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* User */}
                <div className={`p-3 border-t border-white/7 ${collapsed ? 'flex justify-center' : ''}`}>
                    {collapsed ? (
                        <button onClick={handleLogout} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400">
                            <LogOut className="w-4 h-4" />
                        </button>
                    ) : (
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-900 to-violet-900 flex items-center justify-center text-indigo-300 font-black text-sm flex-shrink-0 border border-indigo-500/30">
                                {user?.name?.charAt(0) ?? 'A'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs font-bold truncate">{user?.name}</div>
                                <div className="text-[10px] text-slate-500">Super Admin</div>
                            </div>
                            <button onClick={handleLogout} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400">
                                <LogOut className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    )}
                </div>
            </aside>

            {/* MAIN */}
            <div className="flex-1 flex flex-col min-w-0">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;

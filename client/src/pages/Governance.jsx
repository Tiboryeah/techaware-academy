import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Globe, Shield, Briefcase, FileText, Database, ShieldAlert, Activity, BookOpen } from 'lucide-react';

import GovernanceIntro from '../components/governance/GovernanceIntro';
import GovernanceStrategy from '../components/governance/GovernanceStrategy';
import GovernanceBusinessCase from '../components/governance/GovernanceBusinessCase';
import GovernanceServiceCharter from '../components/governance/GovernanceServiceCharter';

import GovernanceInventory from '../components/governance/GovernanceInventory';
import GovernanceRiskMatrix from '../components/governance/GovernanceRiskMatrix';
import GovernanceBIATactical from '../components/governance/GovernanceBIATactical';
import GovernanceBIAOperational from '../components/governance/GovernanceBIAOperational';
import GovernanceBCP from '../components/governance/GovernanceBCP';

const Governance = () => {
    const [activeSection, setActiveSection] = useState('intro');

    const sections = [
        { id: 'intro', name: 'Identidad y Alcance', icon: <Target className="w-5 h-5" /> },
        { id: 'strategy', name: 'Alineación Estratégica', icon: <Globe className="w-5 h-5" /> },
        { id: 'business_case', name: 'Caso de Negocio', icon: <Briefcase className="w-5 h-5" /> },
        { id: 'service_charter', name: 'Cédula de Servicio', icon: <FileText className="w-5 h-5" /> },
        { id: 'inventory', name: 'Inventario de Activos', icon: <Database className="w-5 h-5" /> },
        { id: 'risk_matrix', name: 'Matriz de Riesgos', icon: <ShieldAlert className="w-5 h-5" /> },
        { id: 'bia', name: 'BIA Táctico y Operacional', icon: <Activity className="w-5 h-5" /> },
        { id: 'bcp', name: 'Plan de Continuidad (BCP)', icon: <BookOpen className="w-5 h-5" /> },
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'intro':
                return <GovernanceIntro />;
            case 'strategy':
                return <GovernanceStrategy />;
            case 'business_case':
                return <GovernanceBusinessCase />;
            case 'service_charter':
                return <GovernanceServiceCharter />;
            case 'inventory':
                return <GovernanceInventory />;
            case 'risk_matrix':
                return <GovernanceRiskMatrix />;
            case 'bia':
                return (
                    <div className="space-y-4">
                        <GovernanceBIATactical />
                        <GovernanceBIAOperational />
                    </div>
                );
            case 'bcp':
                return <GovernanceBCP />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] text-gray-900 dark:text-gray-100 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12">

                {/* Lateral Sidebar */}
                <aside className="lg:w-80 flex-shrink-0">
                    <div className="sticky top-32 space-y-8">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-black tracking-tighter text-indigo-600 uppercase">Gobernanza</h1>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">TechAware Enterprise v1.5</p>
                        </div>

                        <nav className="flex flex-col gap-2">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-bold text-sm tracking-tight ${activeSection === section.id
                                        ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/30 translate-x-3'
                                        : 'text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-gray-100 dark:hover:border-gray-800'
                                        }`}
                                >
                                    {section.icon}
                                    {section.name}
                                </button>
                            ))}
                        </nav>

                        <div className="p-8 bg-white dark:bg-[#161b22] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-500">
                                <Shield className="w-4 h-4" /> Certificación
                            </div>
                            <p className="text-[11px] italic text-gray-400 leading-relaxed font-medium">Alineado con COBIT, ITIL e ISO 27000 para garantizar la excelencia operativa y seguridad de la información.</p>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-grow pt-8">
                    <AnimatePresence mode="wait">
                        <div key={activeSection}>
                            {renderContent()}
                        </div>
                    </AnimatePresence>
                </main>

            </div>
        </div>
    );
};

export default Governance;

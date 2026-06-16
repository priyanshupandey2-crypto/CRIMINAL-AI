import React from 'react';
import { Plus, MessageSquare, Users } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const { createNewConsultation } = useChat();
    const navigate = useNavigate();

    const handleNewConsultation = () => {
        createNewConsultation();
        navigate('/');
    };

    const menuItems = [
        { icon: MessageSquare, label: 'Chat', path: '/' },
        { icon: Users, label: 'Group Info', path: '/explorer' },
    ];

    return (
        <aside className="w-72 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex flex-col h-full transition-colors duration-300">
            <div className="p-4">
                <button 
                    onClick={handleNewConsultation}
                    className="w-full btn btn-primary gap-2 h-11 shadow-sm"
                >
                    <Plus size={18} />
                    <span>New Consultation</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-8">
                <div>
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">Navigation</h3>
                    <nav className="space-y-1">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.label}
                                to={item.path}
                                className={({ isActive }) => `
                                    flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                                    ${isActive 
                                        ? 'bg-white dark:bg-slate-800 text-primary-600 shadow-sm border border-slate-200 dark:border-slate-700' 
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'}
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon size={18} />
                                    <span>{item.label}</span>
                                </div>
                                {item.comingSoon && (
                                    <span className="text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-bold">SOON</span>
                                )}
                            </NavLink>
                        ))}
                    </nav>
                </div>


            </div>


        </aside>
    );
};

export default Sidebar;

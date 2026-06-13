import React from 'react';
import { Plus, MessageSquare, Search, FileText, Book, Info, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const history = [
        { id: '1', title: 'BNS Section 420 Analysis', date: '2 hours ago' },
        { id: '2', title: 'Property Dispute Resolution', date: 'Yesterday' },
        { id: '3', title: 'Contract Breach Penalties', date: '3 days ago' },
    ];

    const menuItems = [
        { icon: MessageSquare, label: 'Chat', path: '/' },
        { icon: Book, label: 'BNS Explorer', path: '/explorer' },
        { icon: FileText, label: 'Documents', path: '/documents', comingSoon: true },
        { icon: Search, label: 'Case Law', path: '/cases', comingSoon: true },
    ];

    return (
        <aside className="w-72 border-r border-slate-200 bg-slate-50/50 flex flex-col h-full bg-slate-50">
            <div className="p-4">
                <button className="w-full btn btn-primary gap-2 h-11 shadow-sm">
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
                                    ${isActive ? 'bg-white text-primary-600 shadow-sm border border-slate-200' : 'text-slate-600 hover:bg-slate-200/50'}
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

                <div>
                    <div className="flex items-center justify-between px-2 mb-4">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">History</h3>
                        <span className="text-[10px] text-primary-600 font-bold hover:underline cursor-pointer">View All</span>
                    </div>
                    <div className="space-y-1">
                        {history.map((item) => (
                            <button
                                key={item.id}
                                className="w-full flex flex-col items-start px-3 py-3 rounded-lg text-sm text-slate-600 hover:bg-slate-200/50 transition-colors border border-transparent hover:border-slate-200"
                            >
                                <span className="font-medium text-slate-900 truncate w-full text-left">{item.title}</span>
                                <span className="text-[11px] text-slate-400 mt-1">{item.date}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-slate-200 space-y-1">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors">
                    <Settings size={18} />
                    <span>Settings</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors">
                    <Info size={18} />
                    <span>Help & Support</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;

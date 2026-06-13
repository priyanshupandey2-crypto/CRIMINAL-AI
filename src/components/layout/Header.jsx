import React from 'react';
import { Scale, Moon, User, Bell } from 'lucide-react';

const Header = () => {
    return (
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 sticky top-0 z-50">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 agent-gradient rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Scale size={24} />
                </div>
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">LegalAI</h1>
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-primary-600 mt-1">Multi-Agent Intelligence</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
                    <Bell size={20} />
                </button>
                <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
                    <Moon size={20} />
                </button>
                <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-slate-900">Uday Bhardwaj</p>
                        <p className="text-xs text-slate-500">Legal Researcher</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

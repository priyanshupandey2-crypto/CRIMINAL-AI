import React from 'react';
import { Scale, Moon, Sun, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Header = ({ isDark, toggleDark }) => {
    const { user, logout } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = React.useState(false);

    return (
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6 sticky top-0 z-50 transition-colors duration-300">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 agent-gradient rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Scale size={24} />
                </div>
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">LegalAI</h1>
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-primary-600 mt-1">Multi-Agent Intelligence</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button 
                    onClick={toggleDark}
                    className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    aria-label="Toggle Theme"
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2"></div>
                <div className="relative">
                    <div 
                        className="flex items-center gap-3 pl-2 cursor-pointer group"
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">
                                {user?.username}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {user?.role}
                            </p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:border-primary-500 group-hover:text-primary-600 transition-all shadow-sm">
                            <User size={20} />
                        </div>
                    </div>

                    <AnimatePresence>
                        {isProfileOpen && (
                            <>
                                <div 
                                    className="fixed inset-0 z-40" 
                                    onClick={() => setIsProfileOpen(false)}
                                />
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
                                >
                                    <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Signed in as</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user?.username}</p>
                                    </div>
                                    <div className="p-2">
                                        <button 
                                            onClick={() => {
                                                setIsProfileOpen(false);
                                                logout();
                                            }}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                                <User size={16} />
                                            </div>
                                            Log Out
                                        </button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};

export default Header;

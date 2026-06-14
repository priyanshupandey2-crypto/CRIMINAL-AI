import React, { useState } from 'react';
import { BookOpen, Search, Globe, ChevronRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CitationPanel = ({ references }) => {
    const [activeTab, setActiveTab] = useState('bns');

    const tabs = [
        { id: 'bns', label: 'BNS', icon: BookOpen },
        { id: 'context', label: 'Context', icon: Search },
        { id: 'web', label: 'Web', icon: Globe },
    ];

    if (!references) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center italic">
                <Search size={32} className="mb-4 opacity-20" />
                <p className="text-sm">Select a response to view citations and retrieved sources.</p>
            </div>
        );
    }

    const filteredCitations = references.citations.filter(c => {
        if (activeTab === 'bns') return c.type === 'BNS';
        if (activeTab === 'context') return c.type === 'Case Law' || c.type === 'Qdrant';
        if (activeTab === 'web') return c.type === 'Web';
        return true;
    });

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b border-slate-200">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 mb-4">Reference Panel</h3>
                <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all
                                ${activeTab === tab.id 
                                    ? 'bg-white text-primary-600 shadow-sm border border-slate-200/50' 
                                    : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <tab.icon size={14} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence mode="wait">
                    {filteredCitations.length > 0 ? (
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-4"
                        >
                            {filteredCitations.map((cite) => (
                                <div key={cite.id} className="card p-4 hover:border-primary-200 transition-colors group cursor-pointer">
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight">
                                            {cite.title}
                                        </h4>
                                        <ExternalLink size={14} className="text-slate-300 group-hover:text-primary-400" />
                                    </div>
                                    <p className="text-[13px] text-slate-600 leading-relaxed line-clamp-3">
                                        {cite.snippet}
                                    </p>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-primary-500 bg-primary-50 px-1.5 py-0.5 rounded border border-primary-100 uppercase tracking-widest">
                                            {cite.type}
                                        </span>
                                        <button className="text-[11px] font-semibold text-slate-400 hover:text-slate-900 flex items-center gap-1 group/btn">
                                            View Source
                                            <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-12 text-slate-400 text-center"
                        >
                            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                                <Search size={20} />
                            </div>
                            <p className="text-xs">No {activeTab.toUpperCase()} citations found for this response.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CitationPanel;

import React from 'react';
import { Book, Construction, Hammer, Rocket } from 'lucide-react';

const Explorer = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-slate-50">
            <div className="w-24 h-24 bg-primary-100 text-primary-600 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
                <Construction size={48} className="animate-pulse" />
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">BNS Explorer</h2>
            <p className="text-slate-500 max-w-lg mb-10 leading-relaxed text-lg">
                We're currently indexing the complete <span className="font-bold text-slate-800">Bharatiya Nyaya Sanhita (2023)</span> codebase. 
                Soon you'll be able to browse sections, chapters, and amendments with cross-references to the IPC.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                {[
                    { icon: Hammer, label: 'Legal Cross-Refs', desc: 'Syncing IPC to BNS mappings' },
                    { icon: Rocket, label: 'Search Index', desc: 'Optimizing Qdrant vector search' },
                    { icon: Book, label: 'Case Database', desc: 'Extracting citations from SC reports' }
                ].map((item, idx) => (
                    <div key={idx} className="card p-6 bg-white flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4 text-slate-400">
                            <item.icon size={24} />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">{item.label}</h4>
                        <p className="text-xs text-slate-500 leading-normal">{item.desc}</p>
                    </div>
                ))}
            </div>

            <button className="mt-12 btn btn-primary gap-2 h-12 px-8 shadow-lg">
                Get Notified on Launch
            </button>
        </div>
    );
};

export default Explorer;

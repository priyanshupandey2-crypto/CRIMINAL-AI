import React from 'react';
import { CheckCircle2, Circle, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AgentTracePanel = ({ trace }) => {
    if (!trace || trace.length === 0) return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center italic">
            <Loader2 size={32} className="mb-4 opacity-20 animate-spin" />
            <p className="text-sm">Waiting for agent execution trace...</p>
        </div>
    );

    return (
        <div className="p-4 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 mb-6">Multi-Agent Execution</h3>
            
            <div className="space-y-6 relative before:absolute before:left-[1.65rem] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-200">
                <AnimatePresence mode="popLayout">
                    {trace.map((step, idx) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-4 relative z-10"
                        >
                            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 bg-white transition-all duration-500
                                ${step.status === 'completed' ? 'border-green-500 text-green-500' : 
                                  step.status === 'running' ? 'border-primary-500 text-primary-500 animate-pulse scale-110' : 
                                  step.status === 'failed' ? 'border-red-500 text-red-500' : 'border-slate-200 text-slate-300'}`}>
                                {step.status === 'completed' ? <CheckCircle2 size={16} /> : 
                                 step.status === 'running' ? <Loader2 size={14} className="animate-spin" /> : 
                                 step.status === 'failed' ? <AlertCircle size={16} /> : <Circle size={12} />}
                            </div>
                            
                            <div className="flex-1 pt-0.5">
                                <p className={`text-sm font-semibold transition-colors
                                    ${step.status === 'completed' ? 'text-slate-900' : 
                                      step.status === 'running' ? 'text-primary-600' : 
                                      step.status === 'failed' ? 'text-red-600' : 'text-slate-400'}`}>
                                    {step.name}
                                </p>
                                {step.status === 'running' && (
                                    <p className="text-[11px] text-primary-500 mt-0.5 font-medium animate-pulse">Processing agent logic...</p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            
            {trace.every(s => s.status === 'completed') && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-8 p-3 rounded-lg bg-green-50 border border-green-100 flex items-center gap-3"
                >
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <p className="text-[11px] font-bold text-green-700 uppercase tracking-wider">All Agents Verified</p>
                </motion.div>
            )}
        </div>
    );
};

export default AgentTracePanel;

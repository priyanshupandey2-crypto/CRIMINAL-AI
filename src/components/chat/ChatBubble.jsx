import React from 'react';
import { User, ShieldCheck, Scale } from 'lucide-react';
import { motion } from 'framer-motion';

const ChatBubble = ({ message }) => {
    const isAssistant = message.role === 'assistant';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex w-full mb-6 ${isAssistant ? 'justify-start' : 'justify-end'}`}
        >
            <div className={`flex max-w-[85%] ${isAssistant ? 'flex-row' : 'flex-row-reverse'} gap-4`}>
                <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center shadow-sm border
                    ${isAssistant ? 'agent-gradient text-white border-primary-400' : 'bg-white text-slate-600 border-slate-200'}`}>
                    {isAssistant ? <Scale size={18} /> : <User size={18} />}
                </div>

                <div className="flex flex-col gap-2">
                    <div className={`px-5 py-4 rounded-2xl shadow-sm border
                        ${isAssistant 
                            ? 'bg-white border-slate-200 text-slate-800 rounded-tl-none' 
                            : 'bg-primary-600 border-primary-500 text-white rounded-tr-none'}`}>
                        <div className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.content}
                        </div>
                        
                        {isAssistant && message.citations?.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                                {message.citations.map((cite, idx) => (
                                    <span key={idx} className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                                        <ShieldCheck size={12} className="text-primary-500" />
                                        {cite.type}: {cite.id}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <span className={`text-[10px] font-medium text-slate-400 px-1 ${isAssistant ? 'text-left' : 'text-right'}`}>
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default ChatBubble;

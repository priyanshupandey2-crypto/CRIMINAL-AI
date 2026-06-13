import React, { useState, useRef, useEffect } from 'react';
import { Send, Hash, Sparkles } from 'lucide-react';

const ChatInput = ({ onSend, disabled }) => {
    const [input, setInput] = useState('');
    const textareaRef = useRef(null);

    const handleSubmit = (e) => {
        e?.preventDefault();
        if (input.trim() && !disabled) {
            onSend(input);
            setInput('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [input]);

    return (
        <div className="p-4 bg-white border-t border-slate-200">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                    <Hash size={20} />
                </div>

                <textarea
                    ref={textareaRef}
                    rows="1"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    placeholder="Ask any legal question... (e.g. 'What is the punishment for cheating in BNS?')"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-24 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none max-h-48 scrollbar-hide"
                />

                <div className="absolute right-2.5 bottom-2.5 flex items-center gap-2">
                    <div className="text-[10px] font-bold text-slate-400 mr-2 uppercase tracking-widest hidden sm:block">
                        {input.length} / 2000
                    </div>
                    <button
                        type="submit"
                        disabled={!input.trim() || disabled}
                        className="btn btn-primary h-9 w-9 p-0 rounded-xl shadow-md hover:shadow-lg disabled:shadow-none transition-all"
                    >
                        {disabled ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <Send size={18} />
                        )}
                    </button>
                </div>

                <div className="mt-2 flex items-center justify-center gap-6">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                        <Sparkles size={12} className="text-amber-500" />
                        AI Legal Research Agent
                    </div>
                    <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                    <div className="text-[11px] text-slate-400 font-medium">Press Enter to Send</div>
                </div>
            </form>
        </div>
    );
};

export default ChatInput;

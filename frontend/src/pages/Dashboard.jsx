import React, { useRef, useEffect } from 'react';
import ChatBubble from '../components/chat/ChatBubble';
import ChatInput from '../components/chat/ChatInput';

import FeedbackBanner from '../components/feedback/FeedbackBanner';
import { useChat } from '../context/ChatContext';
import { Scale, MessageSquare } from 'lucide-react';

const Dashboard = () => {
    const { messages, sendMessage, isLoading, currentTrace, activeReferences } = useChat();
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="flex h-full overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-900 shadow-xl relative z-10 border-l border-slate-200 dark:border-slate-800 transition-colors duration-300">
                <FeedbackBanner status={isLoading ? 'validating' : (messages.length > 1 ? 'approved' : null)} />
                
                <div 
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-6 space-y-2 scroll-smooth"
                >
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
                            <div className="w-20 h-20 agent-gradient rounded-3xl flex items-center justify-center text-white shadow-2xl mb-8 animate-bounce">
                                <Scale size={40} />
                            </div>
                            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">AI Legal Assistant</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                                Powered by Multi-Agent Legal Intelligence. Get instant, cited answers to your complex legal queries.
                            </p>
                            <div className="grid grid-cols-2 gap-3 w-full">
                                {['BNS Section 420', 'Cheating punishment', 'Property law 2024', 'Evidence act updates'].map((hint) => (
                                    <button 
                                        key={hint}
                                        onClick={() => sendMessage(hint)}
                                        className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-200 dark:hover:border-primary-800 transition-all text-left shadow-sm uppercase tracking-wider"
                                    >
                                        {hint}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-4xl mx-auto w-full">
                            {messages.map((msg) => (
                                <ChatBubble key={msg.id} message={msg} />
                            ))}
                            {isLoading && (
                                <div className="flex justify-start mb-6">
                                    <div className="bg-slate-100 rounded-2xl rounded-tl-none px-5 py-4 flex gap-1 items-center">
                                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <ChatInput onSend={sendMessage} disabled={isLoading} />
            </div>
            
        </div>
    );
};

export default Dashboard;

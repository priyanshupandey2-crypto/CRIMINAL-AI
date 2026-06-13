import React, { useRef, useEffect } from 'react';
import ChatBubble from '../components/chat/ChatBubble';
import ChatInput from '../components/chat/ChatInput';
import AgentTracePanel from '../components/agent/AgentTracePanel';
import CitationPanel from '../components/citations/CitationPanel';
import FeedbackBanner from '../components/feedback/FeedbackBanner';
import { useChat } from '../context/ChatContext';
import { Scale, MessageSquare, Info } from 'lucide-react';

const Dashboard = () => {
    const { messages, sendMessage, isLoading, currentTrace, activeReferences } = useChat();
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="flex h-full overflow-hidden bg-slate-50">
            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col h-full bg-white shadow-xl relative z-10 border-x border-slate-200">
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
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">AI Legal Assistant</h2>
                            <p className="text-slate-500 mb-8 leading-relaxed">
                                Powered by Multi-Agent Legal Intelligence. Get instant, cited answers to your complex legal queries.
                            </p>
                            <div className="grid grid-cols-2 gap-3 w-full">
                                {['BNS Section 420', 'Cheating punishment', 'Property law 2024', 'Evidence act updates'].map((hint) => (
                                    <button 
                                        key={hint}
                                        onClick={() => sendMessage(hint)}
                                        className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-600 hover:text-primary-600 hover:border-primary-200 transition-all text-left shadow-sm uppercase tracking-wider"
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

            {/* Right Panel - Citations & Trace */}
            <div className="w-96 flex flex-col h-full bg-slate-50/80 backdrop-blur-sm overflow-hidden hidden xl:flex">
                <div className="flex-1 overflow-y-auto border-b border-slate-200 scrollbar-hide">
                    <CitationPanel references={activeReferences} />
                </div>
                <div className="h-1/2 overflow-y-auto scrollbar-hide bg-white/40">
                    <AgentTracePanel trace={isLoading ? currentTrace : activeReferences?.trace} />
                </div>
                <div className="p-4 bg-slate-100/50 border-t border-slate-200">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <Info size={14} />
                        Model: AI-LEGAL-v2.1 (Production)
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

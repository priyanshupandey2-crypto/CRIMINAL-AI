import React from 'react';
import { Users, GraduationCap, Code, BookOpen, Layers, Search, Cpu, ShieldCheck, Zap } from 'lucide-react';

const Explorer = () => {
    const groupMembers = [
        "Uday Bhardwaj",
        "Priyanshu*",
        "Priyanshu pandey",
        "shivam bhatt",
        "syed naqvi"
    ];

    const projectInfo = [
        {
            title: "Problem Statement & Motivation",
            icon: <ShieldCheck className="text-emerald-500" />,
            questions: [
                { q: "What is your project?", a: "Criminal-AI is an AI-powered legal research assistant that helps users obtain reliable answers related to Indian criminal laws. It combines RAG with a Multi-Agent Architecture grounded in the BNS, legal documents, and web research." },
                { q: "Why did you build this project?", a: "To simplify complex legal documents, reduce research time, and provide evidence-backed answers for students, lawyers, and citizens." },
                { q: "What problem does your project solve?", a: "It automates the retrieval of relevant legal provisions and performs web research to synthesize comprehensive answers with citations." }
            ]
        },
        {
            title: "Architecture & Flow",
            icon: <Layers className="text-blue-500" />,
            questions: [
                { q: "Explain your project architecture.", a: "Flow: User → React Frontend → FastAPI Backend → LangGraph Workflow → Orchestrator → RAG Agent (Qdrant) → Research Agent (Tavily) → Synthesis Agent → Reviewer Agent → Final Response." },
                { q: "Why Multi-Agent architecture?", a: "It separates responsibilities (Retrieval, Research, Synthesis, Review), improving accuracy and modularity over a single LLM approach." },
                { q: "What is LangGraph?", a: "A framework for building stateful AI workflows using graph structures, allowing multiple agents to communicate through shared state." }
            ]
        },
        {
            title: "Technical Implementation (RAG & Qdrant)",
            icon: <Cpu className="text-purple-500" />,
            questions: [
                { q: "What is RAG?", a: "Retrieval-Augmented Generation. It retrieves relevant documents from a vector database to provide context to the LLM, reducing hallucinations." },
                { q: "Why Qdrant?", a: "Fast similarity search, scalable storage, and easy metadata filtering for our vector embeddings." },
                { q: "What is stored in Qdrant?", a: "Legal document chunks, their vector embeddings, and metadata like source and section numbers." }
            ]
        },
        {
            title: "Agents & Research",
            icon: <Search className="text-amber-500" />,
            questions: [
                { q: "What agents exist?", a: "Orchestrator, RAG Agent, Research Agent, Synthesis Agent, and Reviewer Agent." },
                { q: "Why use Tavily?", a: "It provides real-time web search for latest judgments and amendments, structured specifically for AI agents." },
                { q: "How do you reduce hallucinations?", a: "Through RAG grounding, reviewer validation, and providing citations for every response." }
            ]
        }
    ];

    return (
        <div className="h-full overflow-y-auto bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-6xl mx-auto py-12 px-6">
                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="w-20 h-20 agent-gradient rounded-3xl flex items-center justify-center mb-6 shadow-2xl text-white">
                        <Users size={40} />
                    </div>
                    <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Project Group Info</h2>
                    <p className="text-primary-600 font-bold uppercase tracking-widest text-sm mb-8">FDE Team Activity – Criminal AI</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
                        {groupMembers.map((member, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm hover:border-primary-500 transition-all flex flex-col items-center">
                                <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center mb-3 text-primary-600">
                                    <Users size={18} />
                                </div>
                                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{member}</h4>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-tighter">Contributor</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Project Details / FAQ Sections */}
                <div className="space-y-8">
                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-3">
                            <BookOpen className="text-primary-500" />
                            Technical Overview & FAQ
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Foundational concepts and implementation details for evaluators</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projectInfo.map((section, sidx) => (
                            <div key={sidx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                                    {section.icon}
                                    <h4 className="font-bold text-slate-900 dark:text-white">{section.title}</h4>
                                </div>
                                <div className="space-y-6">
                                    {section.questions.map((item, qidx) => (
                                        <div key={qidx} className="group">
                                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 flex gap-2">
                                                <span className="text-primary-500">Q.</span>
                                                {item.q}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pl-6 border-l-2 border-slate-100 dark:border-slate-800 group-hover:border-primary-500 transition-colors">
                                                {item.a}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Section */}
                <div className="mt-16 p-8 bg-slate-900 dark:bg-black rounded-3xl text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Zap size={120} className="text-primary-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-center gap-2 relative z-10">
                        <Code size={24} />
                        Criminal-AI Framework
                    </h3>
                    <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed relative z-10">
                        Combining RAG, LangGraph, Qdrant, Tavily, Gemini, FastAPI, and React to build the future of Indian legal technology.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Explorer;

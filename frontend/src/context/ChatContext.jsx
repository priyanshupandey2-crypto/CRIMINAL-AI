import React, { createContext, useContext, useState, useEffect } from 'react';
import { chatWithAI } from "../services/api";

const ChatContext = createContext();

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([
        {
            id: '1',
            role: 'assistant',
            content: "Hello! I'm your AI Legal Assistant. How can I help you with your legal research today?",
            timestamp: new Date(),
            citations: [],
            trace: [
                { id: '1', name: 'Orchestrator Routing', status: 'completed' },
                { id: '2', name: 'Qdrant Retrieval', status: 'completed' },
                { id: '3', name: 'Context Assembly', status: 'completed' },
                { id: '4', name: 'Reviewer Evaluation', status: 'completed' },
                { id: '5', name: 'Final Response', status: 'completed' }
            ]
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentTrace, setCurrentTrace] = useState([]);
    const [activeReferences, setActiveReferences] = useState(null);

    const initialGreeting = [
        {
            id: '1',
            role: 'assistant',
            content: "Hello! I'm your AI Legal Assistant. How can I help you with your legal research today?",
            timestamp: new Date(),
            citations: [],
            trace: [
                { id: '1', name: 'Orchestrator Routing', status: 'completed' },
                { id: '2', name: 'Qdrant Retrieval', status: 'completed' },
                { id: '3', name: 'Context Assembly', status: 'completed' },
                { id: '4', name: 'Reviewer Evaluation', status: 'completed' },
                { id: '5', name: 'Final Response', status: 'completed' }
            ]
        }
    ];

    const createNewConsultation = () => {
        setMessages(initialGreeting);
        setActiveReferences(null);
        setCurrentTrace([]);
    };

    const sendMessage = async (content) => {

    const userMessage = {
        id: Date.now().toString(),
        role: "user",
        content,
        timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    setIsLoading(true);

    try {

        const response = await chatWithAI(content);

        const aiMessage = {

            id: (Date.now()+1).toString(),

            role: "assistant",

            content: response.data.response,

            timestamp: new Date(),

            citations: response.data.citations || [],

            trace: response.data.trace || []

        };

        setMessages(prev=>[...prev, aiMessage]);

        setActiveReferences(aiMessage);

    }

    catch(err){

        console.log(err);

        const errorMessage = {
            id: (Date.now()+1).toString(),
            role: "assistant",
            content: "I'm sorry, I'm having trouble connecting to the legal database right now. Please check your API configuration or try again later.",
            timestamp: new Date(),
            citations: [],
            trace: []
        };
        setMessages(prev => [...prev, errorMessage]);

    }

    finally{

        setIsLoading(false);

    }

};

    // const sendMessage = async (content) => {
    //     const newUserMessage = {
    //         id: Date.now().toString(),
    //         role: 'user',
    //         content,
    //         timestamp: new Date()
    //     };

    //     setMessages(prev => [...prev, newUserMessage]);
    //     setIsLoading(true);

    //     // Mock trace sequence
    //     const traceSteps = [
    //         { id: '1', name: 'Orchestrator Routing', status: 'running' },
    //         { id: '2', name: 'Qdrant Retrieval', status: 'pending' },
    //         { id: '3', name: 'Context Assembly', status: 'pending' },
    //         { id: '4', name: 'Reviewer Evaluation', status: 'pending' },
    //         { id: '5', name: 'Final Response', status: 'pending' }
    //     ];
    //     setCurrentTrace(traceSteps);

    //     // Simulate multi-agent workflow
    //     for (let i = 0; i < traceSteps.length; i++) {
    //         await new Promise(resolve => setTimeout(resolve, 800));
    //         traceSteps[i].status = 'completed';
    //         if (i < traceSteps.length - 1) {
    //             traceSteps[i + 1].status = 'running';
    //         }
    //         setCurrentTrace([...traceSteps]);
    //     }

    //     const newAssistantMessage = {
    //         id: (Date.now() + 1).toString(),
    //         role: 'assistant',
    //         content: `Based on the BNS (Bharatiya Nyaya Sanhita) and recent case law, here is the information regarding your query about "${content}". \n\nUnder Section 420 of the BNS, which deals with cheating and dishonestly inducing delivery of property, the punishment involves imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.\n\nRetrieved citations indicate that the essential ingredients of cheating remain consistent with the previous IPC framework.`,
    //         timestamp: new Date(),
    //         citations: [
    //             { id: 'c1', title: 'BNS Section 420', type: 'BNS', snippet: 'Cheating and dishonestly inducing delivery of property.' },
    //             { id: 'c2', title: 'Supreme Court Case Re: Section 420', type: 'Case Law', snippet: 'Essential ingredients include fraudulent or dishonest intent at the time of making the promise.' }
    //         ],
    //         trace: [...traceSteps]
    //     };

    //     setMessages(prev => [...prev, newAssistantMessage]);
    //     setActiveReferences(newAssistantMessage);
    //     setIsLoading(false);
    //     setCurrentTrace([]);
    // };

    const value = {
        messages,
        isLoading,
        currentTrace,
        activeReferences,
        setActiveReferences,
        sendMessage,
        createNewConsultation
    };

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

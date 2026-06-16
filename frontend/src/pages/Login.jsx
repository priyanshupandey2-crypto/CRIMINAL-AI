import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Scale, Lock, User, AlertCircle } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        const res = login(username, password);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 transition-colors duration-300">
            <div className="max-w-md w-full">
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 agent-gradient rounded-2xl text-white shadow-xl mb-4">
                        <Scale size={32} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">LegalAI</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-widest text-xs font-bold">Multi-Agent Intelligence</p>
                </div>

                {/* Login Card */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 transition-colors duration-300">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm border border-red-100 dark:border-red-900/50">
                                <AlertCircle size={18} />
                                <span className="font-medium">{error}</span>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Username</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <User size={18} />
                                </div>
                                <input 
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                                    placeholder="Enter username"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Password</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Lock size={18} />
                                </div>
                                <input 
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="w-full agent-gradient text-white py-4 rounded-xl font-bold text-sm shadow-xl hover:shadow-primary-500/20 active:scale-[0.98] transition-all transform tracking-widest uppercase mt-4"
                        >
                            Log In
                        </button>
                    </form>


                </div>

                <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-600">
                    &copy; 2024 LegalAI Research Platforms. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Login;

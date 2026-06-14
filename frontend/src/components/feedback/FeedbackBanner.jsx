import React from 'react';
import { ShieldCheck, AlertTriangle, RefreshCcw, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FeedbackBanner = ({ status }) => {
    if (!status) return null;

    const variants = {
        validating: {
            icon: RefreshCcw,
            text: 'System: Multi-agent reviewer is validating the legal response...',
            bg: 'bg-amber-50',
            border: 'border-amber-200',
            textCol: 'text-amber-800',
            iconCol: 'text-amber-500',
            animate: 'animate-spin'
        },
        regenerated: {
            icon: AlertTriangle,
            text: 'Alert: Response was regenerated due to insufficient confidence in legal retrieval.',
            bg: 'bg-indigo-50',
            border: 'border-indigo-200',
            textCol: 'text-indigo-800',
            iconCol: 'text-indigo-500'
        },
        approved: {
            icon: ShieldCheck,
            text: 'Verification: Response has been validated against BNS 2023 codebase.',
            bg: 'bg-green-50',
            border: 'border-green-200',
            textCol: 'text-green-800',
            iconCol: 'text-green-500'
        }
    };

    const config = variants[status];
    if (!config) return null;
    const Icon = config.icon;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className={`${config.bg} ${config.border} border-b overflow-hidden`}
            >
                <div className="max-w-4xl mx-auto px-6 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Icon size={16} className={`${config.iconCol} ${config.animate || ''}`} />
                        <span className={`text-xs font-bold uppercase tracking-wider ${config.textCol}`}>
                            {config.text}
                        </span>
                    </div>
                    <button className="text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest px-2 py-1">
                        Details
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default FeedbackBanner;

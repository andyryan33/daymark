'use client';

import { motion } from "framer-motion";
import { clsx } from "clsx";

export default function PreviewGrid() {
    const days = [
        { color: "bg-[#facc15]", type: "standard" }, 
        { color: "bg-[#4ade80]", type: "standard" }, 
        { color: "bg-[#94a3b8]", type: "standard" }, 
        { color: "bg-[#4ade80]", type: "standard" }, 
        { color: "bg-[#facc15]", type: "standard" }, 
        { color: "bg-[#4ade80]", type: "standard" }, 
        { color: "bg-[#94a3b8]", type: "daymark" }, 
        { color: "bg-[#475569]", type: "standard" }, 
        { color: "bg-[#94a3b8]", type: "standard" }, 
        { color: "bg-[#facc15]", type: "daymark"  },
        { color: "bg-[#4ade80]", type: "standard" }, 
        { color: "bg-[#0f172a]", type: "standard" }, 
        { color: "bg-[#4ade80]", type: "standard" }, 
        { color: "bg-[#4ade80]", type: "standard" },
        { color: "bg-[#facc15]", type: "standard" }, 
        { color: "bg-[#475569]", type: "standard" }, 
        { color: "bg-[#4ade80]", type: "standard" }, 
        { color: "bg-[#94a3b8]", type: "standard" }, 
        { color: "bg-[#475569]", type: "standard" }, 
        { color: "bg-[#facc15]", type: "standard" }, 
        { color: "bg-[#0f172a]", type: "standard" },
        { color: "bg-[#4ade80]", type: "standard" }, 
        { color: "bg-[#94a3b8]", type: "standard" }, 
        { color: "bg-[#4ade80]", type: "standard" }, 
        { color: "bg-[#facc15]", type: "standard" }, 
        { color: "bg-[#94a3b8]", type: "standard" }, 
        { color: "bg-[#4ade80]", type: "daymark" }, 
        { color: "bg-[#4ade80]", type: "standard" }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.02 }
        }
    };

    const item = {
        hidden: { opacity: 0, scale: 0.5 },
        show: { opacity: 1, scale: 1 }
    };

    return (
        <div className="relative group cursor-default">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-[2rem] shadow-2xl shadow-neutral-200/50 border border-neutral-100 p-6 md:p-8 relative z-10"
            >
                <div className="mb-4 text-center space-y-1">
                    <p className="text-[11px] text-neutral-400 uppercase tracking-wider">
                        Your year, at a glance
                    </p>
                </div>

                <div className="grid grid-cols-7 gap-3 mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                        <div key={i} className="text-[9px] font-bold text-neutral-300 text-center select-none">
                            {d}
                        </div>
                    ))}
                </div>

                <motion.div 
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-7 gap-3"
                >
                    {days.map((day, i) => {
                        return (
                            <motion.div 
                                key={i} 
                                variants={item}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="relative flex justify-center"
                            >
                                <div className={clsx(
                                    "aspect-square w-full rounded-full transition-all duration-300",
                                    day.type !== "empty" && day.color,
                                    day.type === 'daymark' 
                                        ? "ring-2 ring-slate-300 ring-offset-2 scale-105 z-10" 
                                        : "opacity-90 hover:opacity-100",
                                )} />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>

            <div className="absolute top-10 -right-10 w-32 h-32 bg-[#facc15]/25 blur-3xl rounded-full -z-10" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#4ade80]/25 blur-3xl rounded-full -z-10" />
        </div>
    );
}
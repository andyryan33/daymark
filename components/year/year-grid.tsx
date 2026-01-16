'use client';

import { useMemo } from "react";
import { MOODS } from "@/lib/mood";
import { Tooltip } from "@heroui/react";
import { motion } from "framer-motion";

export default function YearGrid({ year, entries }: { year: number, entries: any[] }) {
    const months = Array.from({ length: 12 }, (_, i) => i);

    const moodCounts = useMemo(() => {
        const counts: Record<number, number> = {};
        entries.forEach(entry => {
            counts[entry.mood] = (counts[entry.mood] || 0) + 1;
        });
        return counts;
    }, [entries]);

    const getMoodColor = (month: number, day: number) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const entry = entries.find(e => {
            const entryDate = new Date(e.date).toISOString().split('T')[0];
            return entryDate === dateStr;
        });
        if (!entry) return "bg-neutral-100";
        return MOODS.find(m => m.value === entry.mood)?.color || "bg-neutral-100";
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full space-y-8"
        >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {months.map(month => (
                    <div key={month} className="flex flex-col gap-2">
                        <span className="text-xs font-medium text-neutral-400 uppercase tracking-tighter">
                            {new Date(year, month).toLocaleString('default', { month: 'short' })}
                        </span>
                        <div className="grid grid-cols-7 gap-1">
                            {Array.from({ length: new Date(year, month + 1, 0).getDate() }, (_, i) => i + 1).map(day => (
                                <Tooltip 
                                    key={`${month}-${day}`} 
                                    content={`${new Date(year, month, day).toLocaleDateString()}`}
                                    delay={0}
                                    closeDelay={0}
                                    motionProps={{ variants: {} }} 
                                >
                                    <div 
                                        className={`aspect-square w-full rounded-[2px] ${getMoodColor(month, day)} transition-colors`} 
                                    />
                                </Tooltip>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-8 border-t border-neutral-200">
                <div className="flex flex-wrap justify-center gap-3">
                    {MOODS.map((m) => {
                        const count = moodCounts[m.value] || 0;
                        return (
                            <div 
                                key={m.value} 
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 bg-neutral-50/50"
                            >
                                <div className={`h-2.5 w-2.5 rounded-full ${m.color}`} />
                                
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-xs font-medium text-neutral-700">{m.label}</span>
                                    <span className="text-[10px] text-neutral-300">•</span>
                                    <span className="text-[10px] text-neutral-500 font-medium">
                                        {count}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}
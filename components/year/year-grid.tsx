'use client';

import { useMemo } from "react";
import { MOODS } from "@/lib/mood";
import { Tooltip } from "@heroui/react";

export default function YearGrid({ year, entries }: { year: number, entries: any[] }) {
    const months = Array.from({ length: 12 }, (_, i) => i);

    // Calculate totals for each mood
    const moodCounts = useMemo(() => {
        const counts: Record<number, number> = {};
        entries.forEach(entry => {
            counts[entry.mood] = (counts[entry.mood] || 0) + 1;
        });
        return counts;
    }, [entries]);

    // Helper to get color for a specific day
    const getMoodColor = (month: number, day: number) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        // Using a Map or object for lookups is faster than .find() inside a 365-loop, 
        // but for now, we'll stick to your logic with a minor fix for the date comparison.
        const entry = entries.find(e => {
            const entryDate = new Date(e.date).toISOString().split('T')[0];
            return entryDate === dateStr;
        });
        if (!entry) return "bg-neutral-100";
        return MOODS.find(m => m.value === entry.mood)?.color || "bg-neutral-100";
    };

    return (
        <div className="w-full space-y-8">
            
            {/* 12-Month Responsive Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {months.map(month => (
                    <div key={month} className="flex flex-col gap-2">
                        <span className="text-xs font-medium text-neutral-400 uppercase tracking-tighter">
                            {new Date(year, month).toLocaleString('default', { month: 'short' })}
                        </span>
                        
                        {/* The Month Grid (7 columns for days of week) */}
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

            {/* Enhanced Legend with Counts */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 pt-8 border-t border-neutral-200">
                {MOODS.map(m => {
                    const count = moodCounts[m.value] || 0;
                    return (
                        <div key={m.value} className="flex items-center gap-3">
                            <div className={`h-3 w-3 rounded-full ${m.color}`} />
                            <div className="flex flex-col -space-y-1">
                                <span className="text-xs font-medium text-neutral-700">{m.label}</span>
                                <span className="text-[10px] text-neutral-400">{count} {count === 1 ? 'day' : 'days'}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
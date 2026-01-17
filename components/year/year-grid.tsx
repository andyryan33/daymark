'use client';

import { useMemo } from "react";
import { MOODS } from "@/lib/mood";
import { Tooltip } from "@heroui/react";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { clsx } from "clsx"; // Assuming you have clsx or use template literals

// Helper for class names if you don't have clsx/tailwind-merge
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function YearGrid({ year, entries }: { year: number, entries: any[] }) {
    const months = Array.from({ length: 12 }, (_, i) => i);
    const today = new Date();
    
    // Normalize today to compare strings easily
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const moodCounts = useMemo(() => {
        const counts: Record<number, number> = {};
        entries.forEach(entry => {
            counts[entry.mood] = (counts[entry.mood] || 0) + 1;
        });
        return counts;
    }, [entries]);

    const getDayStyle = (month: number, day: number, isFuture: boolean, isToday: boolean) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        const entry = entries.find(e => {
            const entryDate = new Date(e.date).toISOString().split('T')[0];
            return entryDate === dateStr;
        });

        // Base shape and transition
        const base = "aspect-square w-full rounded-md transition-all duration-300 border box-border block";

        // 1. Future Days: Hollow/Ghostly
        if (isFuture) {
            return cn(base, "bg-neutral-100 border-neutral-100 cursor-default");
        }

        // 2. Data Entry Exists: Colored
        if (entry) {
            const moodColor = MOODS.find(m => m.value === entry.mood)?.color;
            // Use border-transparent to maintain sizing consistency with empty states
            return cn(base, moodColor, "border-transparent hover:ring-2 hover:ring-offset-2 hover:ring-neutral-200 hover:scale-110 hover:z-10");
        }

        // 3. Today (but empty): Highlighted
        if (isToday) {
            return cn(base, "bg-neutral-50 border-neutral-300 ring-1 ring-neutral-300 ring-offset-1 hover:bg-neutral-100");
        }

        // 4. Past (Empty): Solid Neutral
        return cn(base, "bg-neutral-100 border-transparent hover:bg-neutral-200");
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full space-y-10"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10">
                {months.map(month => {
                    const firstDayOfWeek = new Date(year, month, 1).getDay();
                    const daysInMonth = new Date(year, month + 1, 0).getDate();
                    const monthLabel = new Date(year, month).toLocaleString('default', { month: 'long' });

                    return (
                        <div key={month} className="flex flex-col gap-3 group">
                            {/* Month Header */}
                            <div className="flex items-baseline justify-between px-0.5">
                                <span className="text-sm font-semibold text-gray-700 tracking-tight">
                                    {monthLabel}
                                </span>
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-1.5">
                                {/* Weekday Headers - Crucial for UX alignment */}
                                {WEEKDAYS.map((day, i) => (
                                    <div key={day + i} className="text-[9px] font-medium text-neutral-400 text-center py-1">
                                        {day}
                                    </div>
                                ))}

                                {/* Ghost Days (Invisible spacers) */}
                                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                                    <div key={`empty-${month}-${i}`} className="aspect-square w-full pointer-events-none" />
                                ))}

                                {/* Actual Days */}
                                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                                    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                    const dateObj = new Date(year, month, day);
                                    
                                    // Use setHours to compare dates purely, ignoring time
                                    const now = new Date();
                                    now.setHours(0,0,0,0);
                                    const compareDate = new Date(year, month, day);
                                    
                                    const isFuture = compareDate > now;
                                    const isToday = dateStr === todayStr;

                                    return (
                                        <Tooltip 
                                            key={dateStr}
                                            content={
                                                <div className="px-1 py-0.5">
                                                    <div className="text-xs font-semibold text-neutral-700">
                                                        {dateObj.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                                                    </div>
                                                </div>
                                            }
                                            delay={100}
                                            closeDelay={0}
                                            offset={10}
                                            classNames={{
                                                content: "bg-white shadow-lg border border-neutral-100 rounded-lg"
                                            }}
                                            // FIX: Explicitly define animation to prevent scale(NaN) error
                                            motionProps={{
                                                variants: {
                                                    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.1, ease: "easeIn" } },
                                                    enter: { opacity: 1, scale: 1, transition: { duration: 0.15, ease: "easeOut" } },
                                                },
                                            }}
                                        >
                                            <NextLink
                                                href={isFuture ? "#" : `/home?date=${dateStr}`}
                                                prefetch={!isFuture}
                                                onClick={(e) => isFuture && e.preventDefault()}
                                                aria-label={`View entry for ${dateStr}`}
                                                className={getDayStyle(month, day, isFuture, isToday)}
                                            />
                                        </Tooltip>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
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
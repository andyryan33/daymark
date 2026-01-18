'use client';

import { motion } from "framer-motion";
import TimelineRow from "./timeline-row";
import { useMemo } from "react";

export default function TimelineList({ entries }: { entries: any[] }) {
    const months = useMemo(() => {
        const groups: Record<string, any[]> = {};
        
        entries.forEach(entry => {
            const date = new Date(entry.date);

            const key = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;
            if (!groups[key]) groups[key] = [];
            groups[key].push(entry);
        });

        return Object.entries(groups).sort((a, b) => {
            return new Date(b[1][0].date).getTime() - new Date(a[1][0].date).getTime();
        });
    }, [entries]);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-10 pb-12"
        >
            {months.map(([key, groupEntries]) => {
                const dateObj = new Date(groupEntries[0].date);
                
                const monthLabel = dateObj.toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric',
                    timeZone: 'UTC'
                });

                return (
                    <div key={key}>
                        <div className="sticky top-0 z-10 backdrop-blur-sm py-4 mb-2">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                                {monthLabel}
                            </h3>
                        </div>

                        <div className="flex flex-col">
                            {groupEntries.map((entry, index) => (
                                <TimelineRow
                                    key={entry.date.toString()}
                                    entry={entry}
                                    isLast={index === groupEntries.length - 1}
                                />
                            ))}
                        </div>
                    </div>
                );
            })}
        </motion.div>
    );
}
'use client';

import { useMemo, useState, useEffect, useRef, useTransition } from "react";
import { motion } from "framer-motion";
import { Spinner } from "@heroui/react";
import TimelineRow from "./timeline-row";
import { getDayEntries } from "@/lib/db/queries/day-entries";

type TimelineListProps = {
    initialEntries: any[];
    initialCursor: string | null;
}

export default function TimelineList({ initialEntries, initialCursor }: TimelineListProps) {
    const [entries, setEntries] = useState(initialEntries);
    const [cursor, setCursor] = useState<string | null>(initialCursor);
    const [isPending, startTransition] = useTransition();
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const loadMore = () => {
        if (!cursor || isPending) return;

        startTransition(async () => {
            const { data: newEntries, nextCursor } = await getDayEntries(cursor);
            
            setEntries((prev: any[]) => {
                const existingIds = new Set(prev.map(e => e.id));
                const uniqueNewEntries = newEntries.filter(e => !existingIds.has(e.id));
                
                return [...prev, ...uniqueNewEntries];
            });
            
            setCursor(nextCursor);
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && cursor && !isPending) {
                    loadMore();
                }
            },
            { threshold: 0.1, rootMargin: '100px' }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, [cursor, isPending]);

    const months = useMemo(() => {
        const groups: Record<string, any[]> = {};
        
        entries.forEach((entry: any) => {
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
                            {groupEntries.map((entry: any, index: number) => (
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

            <div ref={loadMoreRef} className="w-full flex items-center justify-center">
                {isPending && (
                    <Spinner size="sm" color="primary" label="Loading timeline..." labelColor="primary" />
                )}
                {!cursor && entries.length > 0 && (
                    <div className="text-sm text-neutral-400 italic">
                        No more entries
                    </div>
                )}
            </div>
        </motion.div>
    );
}
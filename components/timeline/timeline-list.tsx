'use client';

import { motion } from "framer-motion";
import TimelineRow from "./timeline-row"
import { groupByWeek } from "@/lib/utils";

export default function TimelineList({ entries }: { entries: any[] }) {
    const weeks = groupByWeek(entries);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-6"
        >
            {weeks.map((week, i) => (
                <div key={i}>
                    <p className="text-xs uppercase tracking-wide text-neutral-400 mb-2">
                        {new Date(week[0].date).toLocaleDateString(undefined, {
                            month: "long",
                        })}
                    </p>

                    <div className="flex flex-col divide-y divide-neutral-200">
                        {week.map(entry => (
                            <TimelineRow
                                key={entry.date.toString()}
                                entry={entry}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </motion.div>
    );
}
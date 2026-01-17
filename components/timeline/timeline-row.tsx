'use client';

import { useRouter } from "next/navigation";
import { MOODS } from "@/lib/mood";

export default function TimelineRow({ entry, isLast }: { entry: any, isLast: boolean }) {
    const router = useRouter();
    const mood = MOODS.find(m => m.value === entry.mood);
    const dateObj = new Date(entry.date);
    
    // Formatting: Explicitly use UTC to prevent timezone shifts
    const dayNum = dateObj.toLocaleDateString('en-US', { 
        day: 'numeric', 
        timeZone: 'UTC' 
    });
    
    const weekday = dateObj.toLocaleDateString('en-US', { 
        weekday: 'short', 
        timeZone: 'UTC' 
    });

    const handleNavigate = () => {
        // Since the DB date is likely UTC, toISOString().split('T')[0] 
        // will give us the exact YYYY-MM-DD string we need.
        const dateString = dateObj.toISOString().split('T')[0];
        router.push(`/home?date=${dateString}`);
    };

    return (
        <div 
            onClick={handleNavigate}
            className="group grid grid-cols-[3.5rem_1.5rem_1fr] gap-x-0 relative cursor-pointer"
        >
            {/* Column 1: Date */}
            <div className="flex flex-col items-end pt-1 pr-4 text-right">
                <span className="text-xl font-bold text-gray-700 leading-none tracking-tight">
                    {dayNum}
                </span>
                <span className="text-[10px] font-bold uppercase text-neutral-400 mt-0.5">
                    {weekday}
                </span>
            </div>

            {/* Column 2: Timeline Track */}
            <div className="relative flex justify-center">
                {/* The Vertical Line */}
                <div 
                    className={`absolute top-0 w-px bg-neutral-200 ${isLast ? 'h-4' : 'bottom-0'}`} 
                />
                
                {/* The Dot */}
                <div className={`
                    relative z-10 mt-1.5 h-3 w-3 rounded-full 
                    ring-2 ring-offset-1 ring-slate-200 transition-transform duration-200 group-hover:scale-125
                    ${mood?.color}
                `} />
            </div>

            {/* Column 3: Content */}
            <div className="pb-8 pl-4 pt-0.5 group-hover:translate-x-1 transition-transform duration-200 ease-out">
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-gray-700">
                        {mood?.label}
                    </span>
                    
                    {entry.notes && (
                        <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
                            {entry.notes}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
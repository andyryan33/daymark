'use client';

import { useRouter } from "next/navigation";
import { MOODS } from "@/lib/utils/mood";

export default function TimelineRow({ entry, isLast }: { entry: any, isLast: boolean }) {
    const router = useRouter();
    const mood = MOODS.find(m => m.value === entry.mood);
    const dateObj = new Date(entry.date);
    
    const dayNum = dateObj.toLocaleDateString('en-US', { 
        day: 'numeric', 
        timeZone: 'UTC' 
    });
    
    const weekday = dateObj.toLocaleDateString('en-US', { 
        weekday: 'short', 
        timeZone: 'UTC' 
    });

    const handleNavigate = () => {
        const dateString = dateObj.toISOString().split('T')[0];
        router.push(`/home?date=${dateString}`);
    };

    return (
        <div 
            onClick={handleNavigate}
            className="group grid grid-cols-[3.5rem_1.5rem_1fr] gap-x-0 relative cursor-pointer"
        >
            <div className="flex flex-col items-end pt-1 pr-4 text-right">
                <span className="text-xl font-bold text-gray-700 leading-none tracking-tight">
                    {dayNum}
                </span>
                <span className="text-[10px] font-bold uppercase text-neutral-400 mt-0.5">
                    {weekday}
                </span>
            </div>

            <div className="relative flex justify-center">
                <div 
                    className={`absolute top-0 w-px bg-neutral-200 ${isLast ? 'h-4' : 'bottom-0'}`} 
                />
                
                <div className={`
                    relative z-10 mt-1.5 h-3 w-3 rounded-full 
                    ${entry.isDaymark && `ring-2 ring-offset-2 ring-slate-300 scale-115`} transition-transform duration-200 group-hover:scale-125
                    ${mood?.color}
                `} />
            </div>

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
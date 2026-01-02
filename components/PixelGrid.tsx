// components/PixelGrid.tsx
'use client'

import { Tooltip, Card } from "@heroui/react";
import { useMemo } from "react";

interface Entry {
  date: string;
  mood: number;
  notes?: string | null;
}

const moodColors: Record<number, string> = {
  1: "bg-red-600 shadow-[0_0_8px_-2px_rgba(220,38,38,0.4)]",
  2: "bg-orange-500 shadow-[0_0_8px_-2px_rgba(249,115,22,0.4)]",
  3: "bg-yellow-400 shadow-[0_0_8px_-2px_rgba(250,204,21,0.4)]",
  4: "bg-lime-500 shadow-[0_0_8px_-2px_rgba(132,204,22,0.4)]",
  5: "bg-emerald-600 shadow-[0_0_8px_-2px_rgba(5,150,105,0.4)]",
};

export default function PixelGrid({ entries }: { entries: Entry[] }) {
  const currentYear = new Date().getFullYear();

  const entryMap = useMemo(() => {
    return new Map(entries.map((e) => [e.date, e]));
  }, [entries]);

  const weeks = useMemo(() => {
    const days: Date[] = [];
    const firstDayOfYear = new Date(currentYear, 0, 1);
    const lastDayOfYear = new Date(currentYear, 11, 31);
    
    const start = new Date(firstDayOfYear);
    start.setDate(start.getDate() - start.getDay());

    const end = new Date(lastDayOfYear);
    end.setDate(end.getDate() + (6 - end.getDay()));

    let current = new Date(start);
    while (current <= end) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    const result = [];
    for (let i = 0; i < days.length; i += 7) {
      result.push(days.slice(i, i + 7));
    }

    return result.filter(week => week[0].getFullYear() === currentYear || week[6].getFullYear() === currentYear);
  }, [currentYear]);

  return (
    <Card className="p-10 bg-content1 shadow-2xl border-none w-fit mx-auto overflow-visible">
      <div className="flex gap-2 relative">
        {/* Day Labels */}
        <div className="flex flex-col gap-1.5 mt-8 mr-2 text-[9px] text-default-300 font-bold uppercase select-none">
          <div className="h-4 flex items-center">Sun</div>
          <div className="h-4"></div>
          <div className="h-4 flex items-center">Tue</div>
          <div className="h-4"></div>
          <div className="h-4 flex items-center">Thu</div>
          <div className="h-4"></div>
          <div className="h-4 flex items-center">Sat</div>
        </div>

        {/* Weeks Container */}
        <div className="flex gap-1.5">
          {weeks.map((week, wIdx) => {
            const hasFirstOfMonth = week.find(day => day.getDate() === 1 && day.getFullYear() === currentYear);
            
            return (
              <div key={wIdx} className="flex flex-col gap-1.5 relative">
                {/* Month Label - Now uses a fixed height container to prevent clipping */}
                <div className="h-8 flex items-end justify-center">
                   {hasFirstOfMonth && (
                     <span className="text-[10px] font-black text-default-400 uppercase select-none pb-1">
                       {hasFirstOfMonth.toLocaleDateString(undefined, { month: 'short' })}
                     </span>
                   )}
                </div>
                
                {week.map((day) => {
                  const dateStr = day.toLocaleDateString('en-CA');
                  const entry = entryMap.get(dateStr);
                  const isDifferentYear = day.getFullYear() !== currentYear;

                  return (
                    <Tooltip
                      key={dateStr}
                      isDisabled={isDifferentYear}
                      showArrow
                      content={
                        <div className="px-2 py-1">
                          <p className="text-tiny font-bold">
                            {day.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </p>
                          {entry?.notes && <p className="text-[10px] text-default-500 italic mt-1 max-w-[150px]">"{entry.notes}"</p>}
                        </div>
                      }
                    >
                      <div
                        className={`w-4 h-4 rounded-[2px] transition-all duration-200 ${
                          isDifferentYear ? "bg-transparent pointer-events-none" : 
                          entry ? `${moodColors[entry.mood]} hover:scale-125 hover:z-50` : "bg-default-100 dark:bg-default-50 hover:bg-default-200 hover:scale-125 hover:z-50"
                        }`}
                      />
                    </Tooltip>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
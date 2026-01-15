'use client';

import { Skeleton } from "@heroui/react";

export default function YearGridSkeleton() {
    return (
        <div className="w-full space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        {/* Month Name */}
                        <Skeleton className="h-3 w-8 rounded-sm" />
                        
                        {/* Days Grid */}
                        <div className="grid grid-cols-7 gap-1">
                            {Array.from({ length: 30 }).map((_, j) => (
                                <Skeleton key={j} className="aspect-square w-full rounded-[2px]" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
             {/* Legend */}
             <div className="flex justify-center gap-4 pt-8 border-t border-neutral-100">
                <Skeleton className="h-4 w-64 rounded-full" />
            </div>
        </div>
    );
}
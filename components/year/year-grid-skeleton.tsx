'use client';

import { Skeleton } from "@heroui/react";

type YearGridSkeletonProps = {
    isCompact?: boolean;
}

export default function YearGridSkeleton({ isCompact = false }: YearGridSkeletonProps) {
    return (
        <div className="w-full space-y-10">
            <div className={`
                grid gap-x-6 gap-y-10 
                ${isCompact ? "grid-cols-2" : "grid-cols-1"} 
                md:grid-cols-3 lg:grid-cols-4
            `}>
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-3">
                        <Skeleton className="h-4 w-16 rounded-sm" />

                        <div className="grid grid-cols-7 gap-1.5">
                            {Array.from({ length: 7 }).map((_, k) => (
                                <div key={`h-${k}`} className="h-2 w-full" />
                            ))}
                            
                            {Array.from({ length: 30 }).map((_, j) => (
                                <Skeleton key={j} className="aspect-square w-full rounded-[2px]" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

             <div className="flex justify-center gap-4 pt-8 border-t border-neutral-100">
                <Skeleton className="h-4 w-64 rounded-full" />
            </div>
        </div>
    );
}
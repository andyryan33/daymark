'use client';

import { Skeleton } from "@heroui/react";

export default function TimelineSkeleton() {
    return (
        <div className="flex flex-col gap-8 w-full">
            {[1, 2].map((group) => (
                <div key={group}>
                    <Skeleton className="h-3 w-16 rounded-md mb-4" />

                    <div className="flex flex-col divide-y divide-neutral-100">
                        {[1, 2, 3].map((row) => ( 
                            <div key={row} className="flex items-center gap-4 py-4">

                                <div className="flex flex-col items-center gap-1">
                                    <Skeleton className="h-3 w-6 rounded-sm" />
                                    <Skeleton className="h-5 w-5 rounded-full" />
                                </div>

                                <div className="h-10 w-[2px] bg-neutral-100 mx-1" />

                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-1/4 rounded-md" />
                                    <Skeleton className="h-3 w-3/4 rounded-md" />
                                </div>
                                
                                <Skeleton className="h-3 w-3 rounded-full" />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
'use client';

import { Skeleton } from "@heroui/react";

export default function TimelineSkeleton() {
    return (
        <div className="w-full flex flex-col gap-10 pt-4">
            {[1, 2].map((group) => (
                <div key={group} className="relative">
                    {/* Header Skeleton */}
                    <Skeleton className="h-4 w-24 rounded-md mb-6" />

                    <div className="flex flex-col gap-6 pl-0 md:pl-0">
                        {[1, 2, 3].map((row) => ( 
                            <div key={row} className="flex gap-8 items-start">
                                {/* Date Column Skeleton */}
                                <div className="hidden md:flex flex-col items-center gap-1 min-w-[3rem]">
                                    <Skeleton className="h-5 w-6 rounded-md" />
                                    <Skeleton className="h-3 w-8 rounded-md" />
                                </div>

                                {/* Content Column Skeleton */}
                                <div className="flex-1 h-20 w-full rounded-xl bg-neutral-50/50 border border-neutral-100 p-4 flex flex-col justify-center gap-2">
                                    <Skeleton className="h-4 w-1/4 rounded-md" />
                                    <Skeleton className="h-3 w-3/4 rounded-md opacity-60" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
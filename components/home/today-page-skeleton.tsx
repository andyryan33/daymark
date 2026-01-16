'use client';

import { Skeleton } from "@heroui/react";

export default function TodayPageSkeleton() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="flex w-full max-w-md flex-col items-center gap-10">
                <div className="flex flex-col items-center gap-3 w-full">
                    <Skeleton className="h-8 w-48 rounded-lg" />
                    <Skeleton className="h-4 w-32 rounded-lg" />
                </div>

                <div className="flex items-center justify-center gap-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} className="h-14 w-14 rounded-full" />
                    ))}
                </div>
            </div>
        </div>
    );
}
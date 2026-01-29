'use client';

import { Skeleton, Card } from "@heroui/react";

export default function TodayPageSkeletonCard() {
    return (
        <div className="w-full max-w-md flex flex-col items-center">
            <Card className="w-full p-6 space-y-6">
                <div className="flex flex-col items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <Skeleton className="h-4 w-32 rounded-md" />
                    <Skeleton className="h-6 w-40 rounded-lg" />
                </div>

                <div className="space-y-3 pt-4">
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-5/6 rounded-md" />
                    <Skeleton className="h-4 w-4/6 rounded-md" />
                </div>
            </Card>
        </div>
    );
}
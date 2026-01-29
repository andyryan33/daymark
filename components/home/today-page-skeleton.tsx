'use client';

import TodayPageSkeletonCard from "./today-page-skeleton-card";

export default function TodayPageSkeleton() {
    return (
        <div className="flex-1 flex items-center justify-center px-6">
            <TodayPageSkeletonCard />
        </div>
    );
}
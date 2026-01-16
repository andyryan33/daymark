import { Suspense } from "react";
import { getDayEntries } from "@/lib/db/queries/day-entries";
import TimelineSkeleton from "@/components/timeline/timeline-skeleton";
import TimelineList from "@/components/timeline/timeline-list";

export default async function TimelinePage() {
    const entries = await getDayEntries();

    return (
        <>
            {entries?.length > 0 ? ( 
                <div className="px-6 py-8 w-full max-w-2xl mx-auto">
                    <Suspense fallback={<TimelineSkeleton />}>
                        <TimelineList entries={entries} />
                    </Suspense>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center px-6 text-center">
                    <p className="text-neutral-500 leading-relaxed mb-8">
                        Record how you're feeling today to start visualizing your journey.
                    </p>
                </div>
            )}
        </>
    );
}
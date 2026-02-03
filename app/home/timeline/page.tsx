import { Suspense } from "react";
import { getDayEntries } from "@/lib/db/queries/day-entries";
import TimelineSkeleton from "@/components/timeline/timeline-skeleton";
import TimelineList from "@/components/timeline/timeline-list";

export default async function TimelinePage() {
    const { data: initialEntries, nextCursor } = await getDayEntries();

    return (
        <>
            {initialEntries?.length > 0 ? ( 
                <div className="px-6 py-8 w-full max-w-2xl mx-auto">
                    <Suspense fallback={<TimelineSkeleton />}>
                        <TimelineList 
                            initialEntries={initialEntries} 
                            initialCursor={nextCursor}
                        />
                    </Suspense>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center px-6 text-center">
                    <div className="space-y-2 max-w-xs">
                        <h3 className="text-lg font-medium text-neutral-900">No entries yet</h3>
                        <p className="text-sm text-neutral-500 leading-relaxed">
                            Start recording your daily moods to build your personal timeline.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
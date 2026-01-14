import { getDayEntries } from "@/lib/db/queries/day-entries"
import TimelineList from "@/components/timeline/timeline-list"

export default async function TimelinePage() {
    const entries = await getDayEntries();

    return (
        <div className="px-6 py-8 w-full max-w-2xl mx-auto">
            <TimelineList entries={entries} />
        </div>
    );
}
import HistoryRow from "./history-row"
import { groupByWeek } from "@/lib/utils";

export default function HistoryList({ entries }: { entries: any[] }) {
    const weeks = groupByWeek(entries);

    return (
        <div className="flex flex-col gap-6">
            {weeks.map((week, i) => (
                <div key={i}>
                    <p className="text-xs uppercase tracking-wide text-neutral-400 mb-2">
                        {new Date(week[0].date).toLocaleDateString(undefined, {
                            month: "long",
                        })}
                    </p>

                    <div className="flex flex-col divide-y divide-neutral-200">
                        {week.map(entry => (
                            <HistoryRow
                                key={entry.date.toString()}
                                entry={entry}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
'use client'

import { useRouter } from "next/navigation"
import { MOODS } from "@/lib/mood"

export default function HistoryRow({ entry }: { entry: any }) {
    const router = useRouter()
    const mood = MOODS.find(m => m.value === entry.mood)

    return (
        <button
            onClick={() => router.push(`/home?date=${entry.date.toISOString()}`)}
            className="flex items-center gap-4 py-4 text-left hover:bg-neutral-50 transition rounded-lg px-2"
        >
            {/* Mood dot */}
            <span
                className={`h-3 w-3 rounded-full ${mood?.color}`}
                aria-hidden
            />

            {/* Date */}
            <div className="flex flex-col">
                <span className="text-sm font-medium text-neutral-700">
                    {new Date(entry.date).toLocaleDateString(undefined, {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                    })}
                </span>

                {entry.notes && (
                    <span className="text-xs text-neutral-400 truncate max-w-[220px]">
                        {entry.notes}
                    </span>
                )}
            </div>
        </button>
    )
}
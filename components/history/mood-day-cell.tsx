'use client';

import clsx from "clsx";
import { MoodValue, MOODS } from "@/lib/mood";

type Props = {
    date: Date;
    mood?: MoodValue;
};

const moodColorMap: Record<MoodValue, string> = Object.fromEntries(
    MOODS.map(m => [m.value, m.color])
) as Record<MoodValue, string>;

export default function MoodDayCell({ date, mood }: Props) {
    const isToday =
        date.toDateString() === new Date().toDateString();

    return (
        <button
            className={clsx(
                "h-6 w-6 rounded-sm transition",
                mood
                    ? moodColorMap[mood]
                    : "border border-neutral-200",
                isToday && "ring-2 ring-neutral-400"
            )}
            title={date.toDateString()}
            onClick={() => {
                // NEXT STEP: route to month detail / edit
                console.log(date);
            }}
        />
    );
}

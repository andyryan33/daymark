'use client';

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@heroui/react";
import MoodSelector from "@/components/mood-selector"
import NotesStep from "@/components/notes-step";
import TodayLoggedView from "@/components/today-logged-view";
import { MoodValue } from "@/lib/mood"
import { saveDayEntry } from "@/actions/save-day-entry";
import { getDayEntry } from "@/lib/db/queries/day-entries";

type TodayState = "loading" | "idle" | "notes" | "logged" | "editing"

export default function TodayPageContent() {
    const searchParams = useSearchParams();

    const selectedDateString = useMemo(() => {
    const param = searchParams.get("date");
    if (param) return param.split('T')[0]; // Ensure it's just YYYY-MM-DD
    
    // Default to today's date in local YYYY-MM-DD format
    const now = new Date();
    return now.toISOString().split('T')[0];
}, [searchParams]);

    const isToday = selectedDateString === new Date().toDateString();

    const isFuture = selectedDateString > new Date().toDateString();

    const [state, setState] = useState<TodayState>("loading");
    const [mood, setMood] = useState<MoodValue>();
    const [notes, setNotes] = useState("");

    const dateLabel = new Date(`${selectedDateString}T12:00:00`).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
});

    useEffect(() => {
        const fetchEntry = async () => {
            if (isFuture) {
                setState("idle")
                return
            }

            const result = await getDayEntry(selectedDateString);

            if (result.success && result.data) {
                setMood(result.data.mood)
                setNotes(result.data.notes || "")
                setState("logged")
            } else {
                setState("idle")
            }
        }

        fetchEntry()
    }, [selectedDateString, isFuture])

    const handleSave = async () => {
        if (!mood) {
            // FUTURE: Add a toast/alert here telling the user to pick a mood
            console.warn("Please select a mood first");
            return;
        }

        try {
            await saveDayEntry(mood, selectedDateString, notes);
            setState("logged");
        } catch (error) {
            // FUTURE: Add a toast/alert here telling the user what the error is
            console.log(error);
            setState("notes");
        }
    }

    // 3. Render Loading State
    if (state === "loading") {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center px-6">
                <Spinner color="default" size="lg" label="Checking your history..." />
            </main>
        )
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center px-6">
            <div className="flex w-full max-w-md flex-col items-center gap-10">

                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-medium text-gray-700">
                        {dateLabel}
                    </h1>
                    {!isFuture && state !== "logged" && (
                        <p className="text-neutral-500">
                            How did this day feel?
                        </p>
                    )}
                </div>

                {/* States */}
                {(state === "idle" || state === "editing") && !isFuture && (
                    <MoodSelector value={mood} onChange={(v) => {
                        setMood(v)
                        setState("notes")
                    }} />
                )}

                {state === "notes" && mood && (
                    <NotesStep
                        mood={mood}
                        notes={notes}
                        onChange={setNotes}
                        onSave={handleSave}
                        onSkip={handleSave}
                    />
                )}

                {state === "logged" && mood && (
                    <TodayLoggedView
                        mood={mood}
                        notes={notes}
                        onEdit={() => setState("editing")}
                    />
                )}

                {isFuture && (
                    <p className="text-sm text-neutral-400">
                        You can’t log future days.
                    </p>
                )}

            </div>
        </main>
    );
}
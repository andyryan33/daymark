'use client';

import NextLink from "next/link"; // Import this at the top
import { useState, useMemo, useEffect } from "react";
import { Button, Link } from "@heroui/react";
import { useRouter } from "next/navigation"; // Use router instead of window.location
import MoodSelector from "./mood-selector";
import NotesStep from "./notes-step";
import TodayLoggedView from "./today-logged-view";
import { MoodValue } from "@/lib/mood"
import { saveDayEntry } from "@/actions/save-day-entry";

type TodayState = "idle" | "notes" | "logged" | "editing"

interface Props {
    initialData: any;
    selectedDateString: string;
    todayString: string;
    isInitialDefault: boolean;
}

export default function TodayPageContent({ initialData, selectedDateString, todayString, isInitialDefault }: Props) {
const router = useRouter();

    // 1. Calculate the REAL "Today" for Woodbury, MN (or wherever the user is)
    const realTodayString = useMemo(() => {
        const now = new Date();
        // This format ensures YYYY-MM-DD in the local timezone
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }, []);

    // 2. Client-side Check: Did the server give us the wrong "Today"?
    // If the server gave us Jan 14, but Woodbury says it's Jan 13, we redirect immediately.
    useEffect(() => {
        if (isInitialDefault && selectedDateString !== realTodayString) {
            router.replace(`/home?date=${realTodayString}`);
        }
    }, [isInitialDefault, selectedDateString, realTodayString, router]);

    const isFuture = selectedDateString > realTodayString;

    // Initialize state directly from props
    const [state, setState] = useState<TodayState>(initialData ? "logged" : "idle");
    const [mood, setMood] = useState<MoodValue | undefined>(initialData?.mood);
    const [notes, setNotes] = useState(initialData?.notes || "");

    const dateLabel = new Date(`${selectedDateString}T12:00:00`).toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
    });

    const handleSave = async () => {
        if (!mood) return;
        try {
            await saveDayEntry(mood, selectedDateString, notes);
            setState("logged");
            router.refresh(); // Tells Next.js to update the server cache
        } catch (error) {
            console.error(error);
            setState("notes");
        }
    }

    return (
        <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="flex w-full max-w-md flex-col items-center gap-10">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-medium text-gray-700">{dateLabel}</h1>
                    {!isFuture && state !== "logged" && (
                        <p className="text-neutral-500">How did this day feel?</p>
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
                    <div className="text-center space-y-4">
                        <p className="text-sm text-neutral-400">You can’t log future days.</p>
                        <Button 
                            as={NextLink} // Use NextLink as the base
                            href="/home"  // Direct path
                            variant="flat"
                        >
                            Back to Today
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
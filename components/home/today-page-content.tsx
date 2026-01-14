'use client';

import NextLink from "next/link"; 
import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation"; 
import MoodSelector from "./mood-selector";
import NotesStep from "./notes-step";
import TodayLoggedView from "./today-logged-view";
import { MoodValue } from "@/lib/mood"
import { saveDayEntry } from "@/actions/save-day-entry";
import WelcomeModal from "@/components/home/welcome-modal";

type TodayState = "idle" | "notes" | "logged" | "editing"

interface Props {
    initialData: any;
    selectedDateString: string;
    todayString: string;
    showWelcome?: boolean;
}

export default function TodayPageContent({ initialData, selectedDateString, todayString, showWelcome = false }: Props) {
    const router = useRouter();
    const isFuture = selectedDateString > todayString;

    const [state, setState] = useState<TodayState>(initialData ? "logged" : "idle");
    const [mood, setMood] = useState<MoodValue | undefined>(initialData?.mood);
    const [notes, setNotes] = useState(initialData?.notes || "");

    const dateLabel = new Date(`${selectedDateString}T12:00:00`).toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
    });
    
    useEffect(() => {
         setState(initialData ? "logged" : "idle");
         setMood(initialData?.mood);
         setNotes(initialData?.notes || "");
    }, [initialData, selectedDateString]);

    const handleSave = async () => {
        if (!mood) return;
        try {
            await saveDayEntry(mood, selectedDateString, notes);
            setState("logged");
            router.refresh(); 
        } catch (error) {
            console.error(error);
            setState("notes");
        }
    }

    const handleBack = () => {
        if (initialData) {
            // EDIT FLOW: Reset to original data visual, stay in editing mode
            setMood(initialData.mood);
            setNotes(initialData.notes || "");
            setState("editing");
        } else {
            setState("idle");
        }
    };

    // NEW: Completely exit edit mode
    const handleCancel = () => {
        if (initialData) {
            setMood(initialData.mood);
            setNotes(initialData.notes || "");
            setState("logged"); // Go straight back to view mode
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center px-6">
            <WelcomeModal shouldShow={showWelcome} />
            
            <div className="flex w-full max-w-md flex-col items-center gap-10">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-medium text-gray-700">{dateLabel}</h1>
                    {!isFuture && state !== "logged" && (
                        <p className="text-neutral-500">How did this day feel?</p>
                    )}
                </div>

                {/* 1. Mood Selector */}
                {(state === "idle" || state === "editing") && !isFuture && (
                    <MoodSelector 
                        value={mood} 
                        onChange={(v) => {
                            setMood(v)
                            setState("notes")
                        }}
                        // Only pass onCancel if we are actually editing existing data
                        onCancel={state === "editing" ? handleCancel : undefined}
                    />
                )}

                {/* 2. Notes Step */}
                {state === "notes" && mood && (
                    <NotesStep
                        mood={mood}
                        notes={notes}
                        onChange={setNotes}
                        onSave={handleSave}
                        onSkip={handleSave}
                        onBack={handleBack} 
                    />
                )}

                {/* 3. Logged View */}
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
                            as={NextLink} 
                            href="/home" 
                            variant="light"
                            color="primary"
                        >
                            Back to Today
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
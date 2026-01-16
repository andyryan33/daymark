'use client';

import NextLink from "next/link";
import { useState, useEffect } from "react";
import { Button, addToast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import MoodSelector from "./mood-selector";
import NotesStep from "./notes-step";
import TodayLoggedView from "./today-logged-view";
import { MoodValue } from "@/lib/mood";
import { saveDayEntry } from "@/actions/save-day-entry";
import WelcomeModal from "@/components/home/welcome-modal";

type TodayState = "idle" | "notes" | "logged" | "editing";

type TodayPageContentProps = {
    initialData: any;
    selectedDateString: string;
    todayString: string;
    showWelcome?: boolean;
}

export default function TodayPageContent({ 
    initialData, 
    selectedDateString, 
    todayString, 
    showWelcome = false 
}: TodayPageContentProps) {
    const router = useRouter();

    const isToday = selectedDateString === todayString;
    const isFuture = selectedDateString > todayString;

    const getRelativeDate = (offset: number) => {
        const d = new Date(`${selectedDateString}T12:00:00`);
        d.setDate(d.getDate() + offset);

        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const prevDate = getRelativeDate(-1);
    const nextDate = getRelativeDate(1);

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
            addToast({
                title: "Day marked.",
                color: "primary",
                hideIcon: true,
                endContent: <Check size={18} />
            });
            router.refresh(); 
        } catch (error) {
            addToast({
                title: "Error. Please try again.",
                color: "danger",
            });
            setState("notes");
        }
    };

    const handleBack = () => {
        if (initialData) {
            setMood(initialData.mood);
            setNotes(initialData.notes || "");
            setState("editing");
        } else {
            setState("idle");
        }
    };

    const handleCancel = () => {
        if (initialData) {
            setMood(initialData.mood);
            setNotes(initialData.notes || "");
            setState("logged");
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center px-6">
            <WelcomeModal shouldShow={showWelcome} />
            
            <div className="flex w-full max-w-md flex-col items-center gap-10">
                <div className="text-center space-y-2 w-full">
                    <div className="flex items-center justify-between">
                        <Button
                            as={NextLink}
                            href={`/home?date=${prevDate}`}
                            prefetch={true}
                            isIconOnly
                            variant="light"
                            radius="full"
                            className="text-neutral-400 hover:text-neutral-700"
                            aria-label="Previous Day"
                        >
                            <ChevronLeft size={24} />
                        </Button>

                        <h1 className="text-2xl font-medium text-gray-700 min-w-[200px]">
                            {dateLabel}
                        </h1>

                        <Button
                            as={NextLink}
                            href={isToday ? "#" : `/home?date=${nextDate}`}
                            prefetch={!isToday}
                            isDisabled={isToday}
                            isIconOnly
                            variant="light"
                            radius="full"
                            className="text-neutral-400 hover:text-neutral-700 disabled:opacity-30"
                            aria-label="Next Day"
                        >
                            {!isToday ? <ChevronRight size={24} /> : <span className="w-6 h-6" /> }
                        </Button>
                    </div>

                    {!isFuture && state !== "logged" && (
                        <p className="text-neutral-500">How did this day feel?</p>
                    )}
                </div>

                {(state === "idle" || state === "editing") && !isFuture && (
                    <MoodSelector 
                        value={mood} 
                        onChange={(v) => {
                            setMood(v);
                            setState("notes");
                        }}
                        onCancel={state === "editing" ? handleCancel : undefined}
                    />
                )}

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
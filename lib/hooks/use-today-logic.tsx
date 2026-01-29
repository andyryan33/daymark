'use client';

import { useState, useEffect, useOptimistic, useTransition } from "react";
import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react"; 
import { MoodValue } from "@/lib/mood";
import { saveDayEntry } from "@/actions/save-day-entry";

export type ViewMode = "idle" | "notes" | "logged" | "editing";

export type DayEntry = {
    mood: MoodValue;
    notes: string;
} | null;

export type UseTodayLogicProps = {
    initialData: any;
    selectedDateString: string;
    todayString: string;
};

export function useTodayLogic({ 
    initialData, 
    selectedDateString, 
    todayString 
}: UseTodayLogicProps) {
    const router = useRouter();
    
    // 1. Transitions
    const [isSaving, startSaving] = useTransition();
    const [isNavigating, startNavigation] = useTransition();

    // 2. Optimistic State
    const [optimisticDate, setOptimisticDate] = useOptimistic<string, string>(
        selectedDateString,
        (_, newDate) => newDate
    );

    const [optimisticEntry, setOptimisticEntry] = useOptimistic<DayEntry, DayEntry>(
        initialData
            ? { mood: initialData.mood, notes: initialData.notes || "" }
            : null,
        (_, newValue) => newValue
    );

    // 3. Local Form State
    const [draftMood, setDraftMood] = useState<MoodValue | undefined>(optimisticEntry?.mood);
    const [draftNotes, setDraftNotes] = useState(optimisticEntry?.notes ?? "");
    
    const [viewMode, setViewMode] = useState<ViewMode>(
        optimisticEntry ? "logged" : "idle"
    );

    // 4. Computed Properties
    const isToday = optimisticDate === todayString;
    const isFuture = optimisticDate > todayString;
    const showNavigation = viewMode === "idle" || viewMode === "logged";

    const dateLabel = new Date(`${optimisticDate}T12:00:00`).toLocaleDateString(
        undefined, 
        { weekday: "long", month: "long", day: "numeric" }
    );

    const getRelativeDate = (offset: number) => {
        const d = new Date(`${optimisticDate}T12:00:00`);
        d.setDate(d.getDate() + offset);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    };

    const prevDate = getRelativeDate(-1);
    const nextDate = getRelativeDate(1);

    // 5. Sync Effect
    useEffect(() => {
        setDraftMood(initialData?.mood);
        setDraftNotes(initialData?.notes || "");
        setViewMode(initialData ? "logged" : "idle");
    }, [selectedDateString, initialData]);

    // 6. Actions
    const navigate = (targetDate: string) => {
        startNavigation(() => {
            setOptimisticDate(targetDate);
            setOptimisticEntry(null); 
            router.push(`/home?date=${targetDate}`);
        });
    };

    const save = async () => {
        if (!draftMood) return;

        setViewMode("logged");

        const payload = { mood: draftMood, notes: draftNotes };

        startSaving(async () => {
            setOptimisticEntry(payload);

            try {
                await saveDayEntry(draftMood, optimisticDate, draftNotes);
                
                addToast({
                    title: "Day marked.",
                    color: "primary",
                    hideIcon: true,
                    endContent: <Check size={18} />,
                });
                
                router.refresh();
            } catch (error) {
                setViewMode("notes");
                addToast({
                    title: "Error. Please try again.",
                    color: "danger",
                });
            }
        });
    };

    const cancel = () => {
        if (initialData) {
            setDraftMood(initialData.mood);
            setDraftNotes(initialData.notes || "");
            setViewMode("logged");
        }
    };

    const back = () => {
        if (initialData) {
            setDraftMood(initialData.mood);
            setDraftNotes(initialData.notes || "");
            setViewMode("editing");
        } else {
            setViewMode("idle");
        }
    };

    return {
        state: {
            optimisticDate,
            optimisticEntry,
            draftMood,
            draftNotes,
            viewMode,
            isNavigating,
            isSaving,
            isToday,
            isFuture,
            showNavigation,
            dateLabel,
            prevDate,
            nextDate,
        },
        actions: {
            setDraftMood,
            setDraftNotes,
            setViewMode,
            navigate,
            save,
            cancel,
            back
        }
    };
}
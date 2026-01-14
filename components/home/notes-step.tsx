'use client';

import { Button, Textarea } from "@heroui/react";
import { MoodValue, MOODS } from "@/lib/mood";

type Props = {
    mood: MoodValue
    notes: string
    onChange: (value: string) => void
    onSave: () => void
    onSkip: () => void
}

export default function NotesStep({
    mood,
    notes,
    onChange,
    onSave,
    onSkip,
}: Props) {
    const moodMeta = MOODS.find((m) => m.value === mood);

    return (
        <div className="w-full space-y-6">
            <p className="text-center text-sm text-neutral-500">
                Feeling <span className="font-medium">{moodMeta?.label}</span>
            </p>

            <div className="flex flex-col items-center">
                <div className={`h-16 w-16 rounded-full ${moodMeta?.color}`} />
            </div>

            <Textarea
                value={notes}
                onValueChange={onChange}
                placeholder="Anything you want to remember about today?"
                minRows={4}
            />

            <div className="flex justify-between">
                <Button variant="light" color="primary" onPress={onSkip}>
                    Skip
                </Button>
                <Button variant="light" color="primary" onPress={onSave}>
                    Save
                </Button>
            </div>
        </div>
    );
}
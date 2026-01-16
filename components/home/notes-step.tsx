'use client';

import { Button, Textarea } from "@heroui/react";
import { MoodValue, MOODS } from "@/lib/mood";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

type NotesStepProps = {
    mood: MoodValue
    notes: string
    onChange: (value: string) => void
    onSave: () => void
    onSkip: () => void
    onBack: () => void // New prop
}

export default function NotesStep({
    mood,
    notes,
    onChange,
    onSave,
    onSkip,
    onBack
}: NotesStepProps) {
    const moodMeta = MOODS.find((m) => m.value === mood);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full space-y-8"
        >

            <div className="flex flex-col items-center gap-3">
                <div className={`h-16 w-16 rounded-full ${moodMeta?.color} ring-4 ring-offset-2 ring-slate-200 shadow-lg shadow-neutral-200`} />
                <p className="text-center text-sm text-neutral-500">
                    Feeling <span className="font-bold text-neutral-700">{moodMeta?.label}</span>
                </p>
            </div>

            <Textarea
                value={notes}
                onValueChange={onChange}
                placeholder="Anything you want to remember about today?"
                minRows={4}
                size="lg"
            />

            <div className="flex items-center justify-between pt-2">
                <Button 
                    variant="light"
                    onPress={onBack}
                    startContent={<ChevronLeft size={20} />}
                    className="text-neutral-500"
                >
                    Back
                </Button>
                
                <div className="flex gap-2">
                    <Button 
                        color="primary"
                        variant="light"
                        onPress={onSkip} 
                    >
                        Skip
                    </Button>
                    <Button 
                        color="primary"
                        variant="light"
                        onPress={onSave}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
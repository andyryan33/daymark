'use client';

import { Button, Textarea } from "@heroui/react";
import { MoodValue, MOODS } from "@/lib/utils/mood";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

type NotesStepProps = {
    mood: MoodValue
    notes: string
    isDaymark?: boolean
    onChange: (value: string) => void
    onSave: () => void
    onSkip: () => void
    onBack: () => void
}

const MAX_CHARS = 500;

export default function NotesStep({
    mood,
    notes,
    isDaymark,
    onChange,
    onSave,
    onSkip,
    onBack
}: NotesStepProps) {
    const moodMeta = MOODS.find((m) => m.value === mood);
    const charCount = notes.length;
    const isNearLimit = charCount > MAX_CHARS * 0.9;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full space-y-8"
        >

            <div className="flex flex-col items-center gap-3">
                <div className={`h-16 w-16 rounded-full ${moodMeta?.color} ${isDaymark && "ring-4 ring-offset-3 ring-slate-200"} shadow-lg shadow-neutral-200`} />
                <p className="text-center text-sm text-neutral-500">
                    Feeling <span className="font-bold text-neutral-700">{moodMeta?.label}</span>
                </p>
            </div>

            <Textarea
                variant="faded"
                value={notes}
                onValueChange={onChange}
                placeholder="Anything you want to remember about today?"
                minRows={4}
                maxLength={MAX_CHARS}
                size="lg"
                isInvalid={isNearLimit}
                errorMessage={`${charCount} / ${MAX_CHARS}`}
                classNames={{
                    inputWrapper: "border-none hover:bg-default-200"
                }}
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
                        variant="flat"
                        onPress={onSave}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
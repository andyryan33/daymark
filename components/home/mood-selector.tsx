'use client';

import { motion } from "framer-motion"
import { Button } from "@heroui/react"
import clsx from "clsx"
import { MOODS, MoodValue } from "@/lib/mood"

type Props = {
    value?: MoodValue
    onChange: (value: MoodValue) => void
    onCancel?: () => void
}

export default function MoodSelector({ value, onChange, onCancel }: Props) {
    const handleSelection = (moodValue: MoodValue) => {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(15);
        }
        
        onChange(moodValue);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col items-center gap-8"
        >
            <div className="flex items-center justify-center gap-4">
                {MOODS.map((mood) => {
                    const selected = value === mood.value

                    return (
                        <motion.div
                            key={mood.value}
                            whileTap={{ scale: 0.94 }}
                        >
                            <Button
                                isIconOnly
                                onPress={() => handleSelection(mood.value)}
                                className={clsx(
                                    "relative h-14 w-14 rounded-full p-0",
                                    mood.color,
                                    "transition-all duration-300 ease-out",
                                    selected
                                    ? "scale-110 ring-4 ring-offset-2 ring-slate-200"
                                    : "opacity-40 hover:opacity-100 hover:scale-105"
                                )}
                            >
                                <span className="sr-only">{mood.label}</span>
                            </Button>
                        </motion.div>
                    )
                })}
            </div>
            
            <div className="flex flex-col items-center gap-4">
                <div className="h-6">
                    <motion.div
                        initial={false}
                        animate={value ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="font-medium text-neutral-600 text-center"
                    >
                        {MOODS.find((m) => m.value === value)?.label ?? "\u00A0"}
                    </motion.div>
                </div>

                {onCancel && (
                    <Button 
                        variant="light"
                        size="sm" 
                        onPress={onCancel}
                        className="text-neutral-500 mt-6"
                    >
                        Cancel Edit
                    </Button>
                )}
            </div>
        </motion.div>
    );
}
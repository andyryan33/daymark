'use client';

import { Button, Card, Switch } from "@heroui/react";
import { motion } from "framer-motion";
import { MoodValue, MOODS } from "@/lib/mood";
import { Pencil } from "lucide-react";

type TodayLoggedViewProps = {
    mood: MoodValue;
    notes?: string;
    isDaymark?: boolean;
    onToggleDaymark: () => void;
    onEdit: () => void;
}

export default function TodayLoggedView({ mood, notes, onEdit, isDaymark, onToggleDaymark }: TodayLoggedViewProps) {
    const moodMeta = MOODS.find((m) => m.value === mood)

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-md"
        >
            <Card className="relative w-full p-6">
                <div className="absolute top-4 left-4">
                    <Switch
                        size="sm"
                        color="primary"
                        isSelected={isDaymark}
                        onValueChange={onToggleDaymark}
                    />
                </div>

                <div className="absolute top-4 right-4">
                    <Button 
                        isIconOnly 
                        variant="light" 
                        size="sm"
                        radius="full"
                        onPress={onEdit}
                        className="text-neutral-300 hover:text-neutral-600"
                        aria-label="Edit Entry"
                    >
                        <Pencil size={16} />
                    </Button>
                </div>

                <div className="space-y-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                        <div className="relative h-16 w-16">

                            <motion.div
                                initial={false}
                                animate={{
                                    scale: isDaymark ? 1 : 0.85,
                                    opacity: isDaymark ? 1 : 0,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 22,
                                }}
                                className="absolute inset-0 rounded-full ring-4 ring-offset-3 ring-slate-300"
                            />

                            <motion.div
                                animate={{
                                    scale: isDaymark ? 1.02 : 1,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                }}
                                className={`relative h-full w-full rounded-full ${moodMeta?.color} shadow-lg shadow-neutral-200 ${
                                    isDaymark ? "animate-pulse" : ""
                                }`}
                            />
                        </div>
                        <p className="text-xs pt-2 uppercase tracking-wider text-neutral-500">
                            Today you felt
                        </p>
                        <p className="text-xl md:text-2xl font-semibold text-neutral-800">
                            {moodMeta?.label}
                        </p>
                    </div>

                    {notes && (
                        <div className="w-full pt-4 border-t border-neutral-200/50 mt-2">
                            <p className="text-neutral-600 leading-relaxed whitespace-pre-wrap font-serif text-md italic opacity-80">
                                "{notes}"
                            </p>
                        </div>
                    )}
                </div>
            </Card>
        </motion.div>
    );
}
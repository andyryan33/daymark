'use client';

import { Button, Card } from "@heroui/react";
import { motion } from "framer-motion";
import { MoodValue, MOODS } from "@/lib/mood";
import { Pencil } from "lucide-react";

type TodayLoggedViewProps = {
    mood: MoodValue
    notes?: string
    onEdit: () => void
}

export default function TodayLoggedView({ mood, notes, onEdit }: TodayLoggedViewProps) {
    const moodMeta = MOODS.find((m) => m.value === mood)

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-md"
        >
            <Card className="relative w-full p-6">
                {/* Minimal Edit Button in Top Right */}
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
                        <div
                            className={`h-16 w-16 rounded-full ${moodMeta?.color} ring-4 ring-offset-2 ring-slate-200 shadow-lg shadow-neutral-200`}
                        />
                        <p className="text-xs pt-2 uppercase tracking-wider text-neutral-500">
                            Today you felt
                        </p>
                        <p className="font-medium">
                            {moodMeta?.label}
                        </p>
                    </div>

                    {notes && (
                        <div className="relative">
                            <p className="text-sm text-neutral-600 whitespace-pre-wrap leading-relaxed italic">
                                {notes}
                            </p>
                        </div>
                    )}
                </div>
            </Card>
        </motion.div>
    );
}
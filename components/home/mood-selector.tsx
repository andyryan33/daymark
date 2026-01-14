'use client';

import { motion } from "framer-motion"
import { Button } from "@heroui/react"
import clsx from "clsx"
import { MOODS, MoodValue } from "@/lib/mood"

type Props = {
    value?: MoodValue
    onChange: (value: MoodValue) => void
}

export default function MoodSelector({ value, onChange }: Props) {
    return (
        <div className="flex flex-col items-center gap-4">
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
                                onPress={() => onChange(mood.value)}
                                className={clsx(
                                    "relative h-14 w-14 rounded-full p-0",
                                    mood.color,
                                    "transition-all duration-300 ease-out",
                                    selected
                                    ? "scale-105"
                                    : "opacity-40 hover:opacity-70"
                                )}
                            >
                                {selected && (
                                    <span
                                        className="absolute inset-0 rounded-full ring-8 ring-black/5"
                                        aria-hidden
                                    />
                                )}
                            </Button>
                        </motion.div>
                    )
                })}
            </div>
            <div className="h-5">
                <motion.div
                    initial={false}
                    animate={value ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="text-sm text-neutral-500 text-center"
                >
                    {MOODS.find((m) => m.value === value)?.label ?? "\u00A0"}
                </motion.div>
            </div>
        </div>
    );
}
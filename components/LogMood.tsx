'use client';

import { Button, Tooltip } from "@heroui/react";
import { useState } from "react";
import { logDayEntry } from "@/actions/entries";

const moods = [
  { value: 1, color: "bg-red-500", label: "Awful" },
  { value: 2, color: "bg-orange-400", label: "Bad" },
  { value: 3, color: "bg-yellow-400", label: "Okay" },
  { value: 4, color: "bg-lime-400", label: "Good" },
  { value: 5, color: "bg-emerald-500", label: "Great" },
];

interface LogMoodProps {
  onLog?: (mood: number) => void; // callback to update PixelGrid live
}

export default function LogMood({ onLog }: LogMoodProps) {
  const [loading, setLoading] = useState<number | null>(null);

  const handleLog = async (val: number) => {
    setLoading(val);
    await logDayEntry(val);
    setLoading(null);
    if (onLog) onLog(val);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-content1 rounded-2xl shadow-sm">
      <h3 className="text-lg font-medium">How is your day, Andy?</h3>
      <div className="flex gap-2">
        {moods.map((m) => (
          <Tooltip key={m.value} content={m.label}>
            <Button
              isIconOnly
              className={`${m.color} text-white transition-transform hover:scale-110`}
              isLoading={loading === m.value}
              onPress={() => handleLog(m.value)}
            />
          </Tooltip>
        ))}
      </div>
    </div>
  );
}

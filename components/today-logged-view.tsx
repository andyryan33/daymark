'use client'

import { Button } from "@heroui/react"
import { MoodValue, MOODS } from "@/lib/mood"

type Props = {
  mood: MoodValue
  notes?: string
  onEdit: () => void
}

export default function TodayLoggedView({ mood, notes, onEdit }: Props) {
  const moodMeta = MOODS.find((m) => m.value === mood)

  return (
    <div className="w-full space-y-6 text-center">
      <div className="flex flex-col items-center gap-2">
        <div
          className={`h-16 w-16 rounded-full ${moodMeta?.color}`}
        />
        <p className="text-sm text-neutral-500">
          Today you felt
        </p>
        <p className="font-medium">
          {moodMeta?.label}
        </p>
      </div>

      {notes && (
        <p className="text-sm text-neutral-600 whitespace-pre-wrap">
          {notes}
        </p>
      )}

      <Button variant="light" onPress={onEdit}>
        Edit
      </Button>
    </div>
  )
}
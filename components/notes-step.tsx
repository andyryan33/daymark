'use client'

import { Button, Textarea } from "@heroui/react"
import { MoodValue, MOODS } from "@/lib/mood"

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
  const label = MOODS.find((m) => m.value === mood)?.label

  return (
    <div className="w-full space-y-6">
      <p className="text-center text-sm text-neutral-500">
        Feeling <span className="font-medium">{label}</span>
      </p>

      <Textarea
        value={notes}
        onValueChange={onChange}
        placeholder="Anything you want to remember about today?"
        minRows={4}
      />

      <div className="flex justify-between">
        <Button variant="light" onPress={onSkip}>
          Skip
        </Button>
        <Button color="primary" onPress={onSave}>
          Save
        </Button>
      </div>
    </div>
  )
}
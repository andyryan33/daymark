export type MoodValue = 1 | 2 | 3 | 4 | 5

export const MOODS: {
    value: MoodValue
    label: string
    color: string
}[] = [
    { value: 1, label: "Heavy",  color: "bg-[#1f2937]" },
    { value: 2, label: "Low",    color: "bg-[#475569]" },
    { value: 3, label: "Okay",   color: "bg-[#a1a1aa]" },
    { value: 4, label: "Good",   color: "bg-[#4ade80]" },
    { value: 5, label: "Bright", color: "bg-[#facc15]" },
]
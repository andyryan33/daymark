export type MoodValue = 1 | 2 | 3 | 4 | 5

export const MOODS: {
    value: MoodValue
    label: string
    color: string
}[] = [
    { value: 1, label: "Heavy",  color: "bg-[#0f172a]" },
    { value: 2, label: "Low",    color: "bg-[#475569]" },
    { value: 3, label: "Okay",   color: "bg-[#94a3b8]" },
    { value: 4, label: "Good",   color: "bg-[#0BEA8D]" },
    { value: 5, label: "Bright", color: "bg-[#facc15]" },
]
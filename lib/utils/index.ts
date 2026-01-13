export function groupByWeek(entries: any[]) {
    const groups: Record<string, any[]> = {}

    entries.forEach(entry => {
        const d = new Date(entry.date)
        const weekKey = `${d.getFullYear()}-W${Math.ceil(d.getDate() / 7)}`
        if (!groups[weekKey]) groups[weekKey] = []
        groups[weekKey].push(entry)
    })

    return Object.values(groups)
}
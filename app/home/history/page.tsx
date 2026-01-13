'use client'

import { useEffect, useState } from "react"
import { Spinner } from "@heroui/react"
import { getDayEntries } from "@/lib/db/queries/day-entries"
import HistoryList from "@/components/history/history-list"

export default function HistoryPage() {
    const [entries, setEntries] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            const data = await getDayEntries();
            setEntries(data);
            setLoading(false);
        }
        load()
    }, [])

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <Spinner label="Loading your days…" />
            </main>
        )
    }

    return (
        <main className="px-6 py-8 max-w-md mx-auto">
            <h1 className="text-xl font-medium mb-6">History</h1>
            <HistoryList entries={entries} />
        </main>
    )
}
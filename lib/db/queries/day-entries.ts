'use server'

import db from "@/lib/db/prisma";
import { createClient } from "@/lib/supabase/server";
import { MoodValue } from "@/lib/mood";

type GetDayEntryResponse = {
    success: boolean;
    data?: {
        mood: MoodValue;
        notes: string | null;
    } | null;
};

export async function getDayEntry(dateString: string): Promise<GetDayEntryResponse> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { success: false };

    const entryDate = new Date(`${dateString}T00:00:00Z`);

    try {
        const entry = await db.dayEntry.findUnique({
            where: {
                userId_date: {
                    userId: user.id,
                    date: entryDate,
                },
            },
        });

        if (!entry) return { success: true, data: null };

        return { 
            success: true, 
            data: {
                mood: entry.mood as MoodValue,
                notes: entry.notes
            } 
        };

    } catch (error) {
        console.error("Failed to fetch entry:", error);
        return { success: false };
    }
}

export async function getDayEntries(limit = 30) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    return db.dayEntry.findMany({
        where: { userId: user.id },
        orderBy: { date: "desc" },
        take: limit,
        select: {
            date: true,
            mood: true,
            notes: true,
        },
    });
}

export async function getYearlyEntries(year: number) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const startDate = new Date(`${year}-01-01T00:00:00Z`);
    const endDate = new Date(`${year}-12-31T23:59:59Z`);

    return db.dayEntry.findMany({
        where: {
            userId: user.id,
            date: {
                gte: startDate,
                lte: endDate,
            },
        },
        select: {
            date: true,
            mood: true,
        },
    });
}
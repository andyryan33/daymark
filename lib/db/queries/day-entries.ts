'use server';

import db from "@/lib/db/prisma";
import { createClient } from "@/lib/supabase/server";
import { MoodValue } from "@/lib/mood";

type GetDayEntryResponse = {
    success: boolean;
    data?: {
        mood: MoodValue;
        notes: string | null;
        isDaymark: boolean;
    } | null;
};

type DayEntryListResponse = {
    data: {
        id: string;
        date: Date;
        mood: number;
        notes: string | null;
        isDaymark: boolean;
    }[];
    nextCursor: string | null;
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
                notes: entry.notes,
                isDaymark: entry.isDaymark,
            } 
        };

    } catch (error) {
        console.error("Failed to fetch entry:", error);
        return { success: false };
    }
}

export async function getDayEntries(cursor?: string, limit = 20): Promise<DayEntryListResponse> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { data: [], nextCursor: null };

    const entries = await db.dayEntry.findMany({
        where: { userId: user.id },
        orderBy: { date: "desc" },
        take: limit + 1,
        skip: cursor ? 1 : 0, 
        cursor: cursor ? { id: cursor } : undefined,
        select: {
            id: true,
            date: true,
            mood: true,
            notes: true,
            isDaymark: true,
        },
    });

    let nextCursor: string | null = null;

    if (entries.length > limit) {
        const nextItem = entries.pop();

        if (nextItem) {
            nextCursor = nextItem.id; 
        }
    }

    return {
        data: entries,
        nextCursor,
    };
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
            isDaymark: true,
        },
    });
}
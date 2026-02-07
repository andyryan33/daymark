'use server';

import db from "@/lib/db/prisma";
import { createClient } from "@/lib/supabase/server";
import { MoodValue } from "@/lib/utils/mood";
import { revalidatePath } from "next/cache";

type SaveDayEntryResponse = {
    success: boolean;
    message?: string;
    data?: any;
};

export async function saveDayEntry( mood: MoodValue, dateString: string, notes?: string ): Promise<SaveDayEntryResponse> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, message: "Unauthorized" };
    }

    const entryDate = new Date(`${dateString}T00:00:00Z`);

    try {
        const entry = await db.dayEntry.upsert({
            where: {
                userId_date: {
                    userId: user.id,
                    date: entryDate,
                },
            },
            update: { mood, notes },
            create: {
                userId: user.id,
                date: entryDate,
                mood,
                notes,
            },
        });

        revalidatePath("/home");
        
        return { 
            success: true,
            data: entry,
            message: "Entry saved successfully"
        };

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to save entry. Please try again."
        };
    }
}
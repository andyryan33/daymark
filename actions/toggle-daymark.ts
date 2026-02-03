'use server';

import db from "@/lib/db/prisma";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleDaymark(dateString: string, value: boolean) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, message: "Unauthorized" };
    }

    const entryDate = new Date(`${dateString}T00:00:00Z`);

    try {
        await db.dayEntry.update({
            where: {
                userId_date: {
                    userId: user.id,
                    date: entryDate,
                },
            },
            data: { isDaymark: value },
        });

        revalidatePath("/home");

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to save entry. Please try again."
        };
    }
}
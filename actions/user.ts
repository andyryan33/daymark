'use server';

import db from "@/lib/db/prisma";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function completeWalkthrough() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, message: "Unauthorized" };
    }

    try {
        await db.profile.upsert({
            where: { userId: user.id },
            create: {
                userId: user.id,
                hasSeenWelcome: true
            },
            update: {
                hasSeenWelcome: true
            }
        });

        revalidatePath("/home");
        return { success: true };
    } catch (error) {
        console.error("Failed to update walkthrough status:", error);
        return { success: false };
    }
}
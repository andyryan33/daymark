'use server'

import db from "@/lib/db/prisma";
import { createClient } from "@/lib/supabase/server";

export async function getProfileStatus() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { hasSeenWelcome: false };

    try {
        const profile = await db.profile.findUnique({
            where: { userId: user.id },
            select: { hasSeenWelcome: true }
        });

        // If no profile exists yet, they haven't seen it (default behavior)
        return { hasSeenWelcome: profile?.hasSeenWelcome ?? false };
    } catch (error) {
        return { hasSeenWelcome: false };
    }
}
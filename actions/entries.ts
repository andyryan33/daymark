'use server'

import db from "@/lib/db/prisma";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function logDayEntry(mood: number, notes?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const entry = await db.dayEntry.upsert({
    where: {
      userId_date: {
        userId: user.id,
        date: today,
      },
    },
    update: { mood, notes },
    create: {
      userId: user.id,
      date: today,
      mood,
      notes,
    },
  });

  revalidatePath("/home");
  return entry;
}
// app/home/page.tsx
import prisma from "@/lib/db/prisma";
import { createClient } from "@/lib/supabase/server";
import PixelGrid from "@/components/PixelGrid";
import LogMood from "@/components/LogMood";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const currentYear = new Date().getFullYear();

  const entries = await prisma.dayEntry.findMany({
    where: {
      userId: user.id,
      date: {
        gte: new Date(currentYear, 0, 1),
        lt: new Date(currentYear + 1, 0, 1),
      },
    },
    orderBy: { date: 'asc' }
  });

  const formattedEntries = entries.map(e => ({
    date: e.date.toLocaleDateString('en-CA'), 
    mood: e.mood,
    notes: e.notes
  }));

  return (
    <div className="flex flex-col items-center py-16 px-6 space-y-12 min-h-screen bg-background">
      <header className="text-center space-y-2">
        <h1 className="text-6xl font-black tracking-tighter text-foreground">
          {currentYear}
        </h1>
        <p className="text-default-500 text-lg font-medium">Your year in pixels.</p>
      </header>

      <section className="w-full max-w-xl">
        <LogMood />
      </section>

      {/* Main Grid Wrapper */}
      <section className="w-full flex flex-col items-center gap-6">
        <PixelGrid entries={formattedEntries} />
        
        {/* Legend */}
        <div className="mt-20 w-fit flex flex-wrap justify-center gap-8 p-6 bg-content1 rounded-3xl border border-default-100 shadow-sm">
          {[
            { mood: 5, label: "Great", color: "bg-emerald-600" },
            { mood: 4, label: "Good", color: "bg-lime-500" },
            { mood: 3, label: "Meh", color: "bg-yellow-400" },
            { mood: 2, label: "Bad", color: "bg-orange-500" },
            { mood: 1, label: "Awful", color: "bg-red-600" },
          ].map((m) => (
            <div key={m.mood} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${m.color}`} />
              <span className="text-[10px] font-bold text-default-400 uppercase tracking-tight">{m.label}</span>
              <span className="text-xs font-mono font-bold text-primary">
                {formattedEntries.filter(e => e.mood === m.mood).length}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
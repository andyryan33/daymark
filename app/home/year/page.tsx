import { Suspense } from "react";
import { getYearlyEntries } from "@/lib/db/queries/day-entries";
import YearGridSkeleton from "@/components/year/year-grid-skeleton";
import YearGrid from "@/components/year/year-grid";

export default async function YearPage() {
    const currentYear = new Date().getFullYear();
    const entries = await getYearlyEntries(currentYear);

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-xl font-medium mb-6">{currentYear}</h1>
            <Suspense fallback={<YearGridSkeleton />}>
                <YearGrid year={currentYear} entries={entries} />
            </Suspense>
        </div>
    );
}
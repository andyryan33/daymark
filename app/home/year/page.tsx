import { Suspense } from "react";
import { getYearlyEntries } from "@/lib/db/queries/day-entries";
import YearGridSkeleton from "@/components/year/year-grid-skeleton";
import YearView from "@/components/year/year-view"; // Import the wrapper

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function YearPage({ searchParams }: Props) {
    const params = await searchParams;
    
    const currentYear = new Date().getFullYear();
    const yearParam = typeof params.year === 'string' ? parseInt(params.year) : currentYear;
    const selectedYear = isNaN(yearParam) ? currentYear : yearParam;

    const entries = await getYearlyEntries(selectedYear);

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-8">
            <Suspense fallback={<YearGridSkeleton />}>
                <YearView year={selectedYear} entries={entries} />
            </Suspense>
        </div>
    );
}
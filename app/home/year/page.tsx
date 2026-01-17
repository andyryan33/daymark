import { Suspense } from "react";
import { getYearlyEntries } from "@/lib/db/queries/day-entries";
import YearGridSkeleton from "@/components/year/year-grid-skeleton";
import YearGrid from "@/components/year/year-grid";
import YearSelector from "@/components/year/year-selector";

type YearPageProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function YearPage({ searchParams }: YearPageProps) {
    const params = await searchParams;
    
    const currentYear = new Date().getFullYear();
    const yearParam = typeof params.year === 'string' ? parseInt(params.year) : currentYear;
    
    const selectedYear = isNaN(yearParam) ? currentYear : yearParam;

    const entries = await getYearlyEntries(selectedYear);

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-8">
            <YearSelector year={selectedYear} />
            
            <Suspense fallback={<YearGridSkeleton />}>
                <YearGrid year={selectedYear} entries={entries} />
            </Suspense>
        </div>
    );
}
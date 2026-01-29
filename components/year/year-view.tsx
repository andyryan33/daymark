'use client';

import { useState, useOptimistic, useTransition } from "react";
import { useRouter } from "next/navigation";
import YearSelector from "./year-selector";
import YearGrid from "./year-grid";
import YearGridSkeleton from "@/components/year/year-grid-skeleton"; 

type YearViewProps = {
    year: number;
    entries: any[];
}

export default function YearView({ year, entries }: YearViewProps) {
    const router = useRouter();
    const [isCompact, setIsCompact] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [optimisticYear, setOptimisticYear] = useOptimistic<number, number>(
        year,
        (_, newYear) => newYear
    );

    const handleNavigate = (targetYear: number) => {
        startTransition(() => {
            setOptimisticYear(targetYear);
            router.push(`/home/year?year=${targetYear}`);
        });
    };

    return (
        <div className="space-y-8">
            <YearSelector 
                year={optimisticYear} 
                isCompact={isCompact} 
                setIsCompact={setIsCompact}
                onNavigate={handleNavigate}
                isNavigating={isPending}
            />

            {isPending ? (
                <div className="animate-pulse">
                    <YearGridSkeleton isCompact={isCompact} />
                </div>
            ) : (
                <YearGrid 
                    year={year}
                    entries={entries} 
                    isCompact={isCompact} 
                />
            )}
        </div>
    );
}
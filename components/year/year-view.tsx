'use client';

import { useState } from "react";
import YearSelector from "./year-selector";
import YearGrid from "./year-grid";

interface YearViewProps {
    year: number;
    entries: any[];
}

export default function YearView({ year, entries }: YearViewProps) {
    const [isCompact, setIsCompact] = useState(false);

    return (
        <div className="space-y-8">
            <YearSelector 
                year={year} 
                isCompact={isCompact} 
                setIsCompact={setIsCompact} 
            />
            
            <YearGrid 
                year={year} 
                entries={entries} 
                isCompact={isCompact} 
            />
        </div>
    );
}
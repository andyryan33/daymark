'use client';

import { useState } from "react";
import YearSelector from "./year-selector";
import YearGrid from "./year-grid";

interface Props {
    year: number;
    entries: any[];
}

export default function YearView({ year, entries }: Props) {
    // Default to false (Single Column/Standard view) for better tap targets on mobile
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
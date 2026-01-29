'use client';

import { Button, Switch } from "@heroui/react";
import { ChevronLeft, ChevronRight, Grid2X2, Rows3 } from "lucide-react";

type YearSelectorProps = {
    year: number;
    isCompact: boolean;
    setIsCompact: (v: boolean) => void;
    onNavigate: (year: number) => void;
    isNavigating: boolean;
};

export default function YearSelector({
    year,
    isCompact,
    setIsCompact,
    onNavigate,
    isNavigating
}: YearSelectorProps) {
    const currentYear = new Date().getFullYear();
    const prevYear = year - 1;
    const nextYear = year + 1;
    const isFuture = nextYear > currentYear;

    return (
        <div className="grid grid-cols-[1fr_auto_1fr] items-center min-h-[40px]">
            {/* Left spacer */}
            <div />

            <div className="flex items-center gap-4">
                <Button
                    onPress={() => onNavigate(prevYear)}
                    isDisabled={isNavigating}
                    isIconOnly
                    variant="light"
                    radius="full"
                    className="text-neutral-400 hover:text-neutral-700"
                    aria-label="Previous Year"
                >
                    <ChevronLeft size={24} />
                </Button>

                <h1 className="text-2xl font-medium text-gray-700 select-none min-w-[60px] text-center tabular-nums">
                    {year}
                </h1>

                <Button
                    onPress={() => onNavigate(nextYear)}
                    isDisabled={isFuture || isNavigating}
                    isIconOnly
                    variant="light"
                    radius="full"
                    className={`text-neutral-400 hover:text-neutral-700 ${
                        isFuture ? "invisible pointer-events-none" : ""
                    }`}
                    aria-label="Next Year"
                >
                    <ChevronRight size={24} />
                </Button>
            </div>

            <div className="flex justify-end md:hidden">
                <Switch
                    color="primary"
                    thumbIcon={({ isSelected, className }) => 
                        isSelected ? (
                            <Grid2X2 className={className} size={14} />
                        ) : (
                            <Rows3 className={className} size={14} />
                        )
                    }
                    isSelected={isCompact}
                    onValueChange={setIsCompact}
                    aria-label="Toggle View"
                />
            </div>
        </div>
    );
}
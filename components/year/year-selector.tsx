'use client';

import { Button, Switch } from "@heroui/react";
import { ChevronLeft, ChevronRight, Grid2X2, Rows3 } from "lucide-react";
import NextLink from "next/link";

type YearSelectorProps = {
    year: number;
    isCompact: boolean;
    setIsCompact: (v: boolean) => void;
};

export default function YearSelector({
    year,
    isCompact,
    setIsCompact,
}: YearSelectorProps) {
    const currentYear = new Date().getFullYear();
    const prevYear = year - 1;
    const nextYear = year + 1;
    const isFuture = nextYear > currentYear;

    return (
        <div className="grid grid-cols-[1fr_auto_1fr] items-center min-h-[40px]">
            {/* Left spacer */}
            <div />

            {/* Centered Date Controls */}
            <div className="flex items-center gap-4">
                <Button
                    as={NextLink}
                    href={`/home/year?year=${prevYear}`}
                    prefetch
                    isIconOnly
                    variant="light"
                    radius="full"
                    className="text-neutral-400 hover:text-neutral-700"
                    aria-label="Previous Year"
                >
                    <ChevronLeft size={24} />
                </Button>

                <h1 className="text-2xl font-medium text-gray-700 select-none">
                    {year}
                </h1>

                <Button
                    as={NextLink}
                    href={isFuture ? "#" : `/home/year?year=${nextYear}`}
                    prefetch={!isFuture}
                    isDisabled={isFuture}
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

            {/* Right-aligned Toggle (Mobile Only) */}
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
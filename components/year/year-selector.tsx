'use client';

import { Button } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import NextLink from "next/link";

type YearSelectorProps = {
    year: number;
}

export default function YearSelector({ year }: YearSelectorProps) {
    const currentYear = new Date().getFullYear();
    const prevYear = year - 1;
    const nextYear = year + 1;
    const isFuture = nextYear > currentYear;

    return (
        <div className="flex items-center justify-center mb-8">
            <div className="flex items-center justify-between w-full max-w-[200px]">
                <Button
                    as={NextLink}
                    href={`/home/year?year=${prevYear}`}
                    prefetch={true}
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
                    className={`text-neutral-400 hover:text-neutral-700 disabled:opacity-30 ${isFuture ? "invisible pointer-events-none" : ""}`}
                    aria-label="Next Year"
                >
                    <ChevronRight size={24} />
                </Button>
            </div>
        </div>
    );
}
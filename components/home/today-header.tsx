'use client';

import { Button } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TodayHeader({label, 
    onPrev, 
    onNext, 
    showNav, 
    isFuture, 
    isToday, 
    isNavigating,
    viewMode 
}: any) {
    return (
        <div className="text-center space-y-2 w-full">
            <div className="flex items-center justify-between">
                <Button
                    onPress={onPrev}
                    isDisabled={isNavigating}
                    isIconOnly variant="light" radius="full"
                    className={`text-neutral-400 hover:text-neutral-700 ${!showNav || isFuture ? "invisible pointer-events-none" : ""}`}
                    aria-label="Previous Day"
                >
                    <ChevronLeft size={24} />
                </Button>

                <h1 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-700 min-w-[200px] transition-all">
                    {label}
                </h1>

                <Button
                    onPress={onNext}
                    isDisabled={isToday || isNavigating}
                    isIconOnly variant="light" radius="full"
                    className={`text-neutral-400 hover:text-neutral-700 ${!showNav || isToday || isFuture ? "invisible pointer-events-none" : ""}`}
                    aria-label="Next Day"
                >
                    <ChevronRight size={24} />
                </Button>
            </div>

            {!isFuture && viewMode !== "logged" && !isNavigating && (
                <p className="text-neutral-500 animate-in fade-in slide-in-from-bottom-2">
                    How did this day feel?
                </p>
            )}
        </div>
    );
}
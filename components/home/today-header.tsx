'use client';

import { Button, Popover, PopoverTrigger, PopoverContent, Calendar } from "@heroui/react";
import { CalendarDate } from "@internationalized/date";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type TodayHeaderProps = {
    label: string;
    selectedDateString: string;
    onPrev: () => void;
    onNext: () => void;
    onSelectDate: (dateString: string) => void;
    showNav: boolean;
    isFuture: boolean;
    isToday: boolean;
    isNavigating: boolean;
    viewMode: string;
};

export default function TodayHeader({
    label,
    selectedDateString,
    onPrev,
    onNext,
    onSelectDate,
    showNav,
    isFuture,
    isToday,
    isNavigating,
    viewMode
}: TodayHeaderProps) {
    const [isOpen, setIsOpen] = useState(false);

    function toCalendarDate(yyyyMmDd: string) {
        const [y, m, d] = yyyyMmDd.split("-").map(Number);
        return new CalendarDate(y, m, d);
    }

    return (
        <div className="text-center space-y-2 w-full">
            <div className="flex items-center justify-between">
                <Button
                    onPress={onPrev}
                    isDisabled={isNavigating}
                    isIconOnly
                    variant="light"
                    radius="full"
                    className={`text-neutral-400 hover:text-neutral-700 ${
                        !showNav || isFuture ? "invisible pointer-events-none" : ""
                    }`}
                    aria-label="Previous Day"
                >
                    <ChevronLeft size={24} />
                </Button>

                <Popover
                    isOpen={isOpen}
                    onOpenChange={setIsOpen}
                    placement="bottom"
                >
                    <PopoverTrigger>
                        <Button
                            variant="light"
                            className="text-lg sm:text-xl md:text-2xl font-medium text-gray-700 px-2"
                            isDisabled={isNavigating}
                        >
                            {label}
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className="p-2">
                        <Calendar
                            color="primary"
                            showMonthAndYearPickers
                            value={toCalendarDate(selectedDateString)}
                            maxValue={toCalendarDate(new Date().toLocaleDateString("en-CA"))}
                            onChange={(date) => {
                                setIsOpen(false);
                                onSelectDate(date.toString());
                            }}
                            classNames={{
                                cellButton: "text-foreground-900",
                                pickerItem: "text-foreground-900"
                            }}
                        />
                    </PopoverContent>
                </Popover>

                <Button
                    onPress={onNext}
                    isDisabled={isToday || isNavigating}
                    isIconOnly
                    variant="light"
                    radius="full"
                    className={`text-neutral-400 hover:text-neutral-700 ${
                        !showNav || isToday || isFuture
                            ? "invisible pointer-events-none"
                            : ""
                    }`}
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
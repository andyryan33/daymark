'use client';

import { Suspense } from "react";
import { Spinner } from "@heroui/react";
import TodayPageContent from "@/components/today-page-content";

export default function TodayPage() {
    return (
        <Suspense fallback={
            <main className="flex min-h-screen flex-col items-center justify-center px-6">
                <Spinner color="default" size="lg" label="Loading..." />
            </main>
        }>
            <TodayPageContent />
        </Suspense>
    );
}
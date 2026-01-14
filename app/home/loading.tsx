'use client';

import { Spinner } from "@heroui/react";

export default function Loading() {
    return (
        <div className="flex-1 flex items-center justify-center">
            <Spinner color="primary" size="lg" label="Loading your day…" />
        </div>
    );
}
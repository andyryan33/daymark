'use client';

import { HeroUIProvider, ToastProvider } from "@heroui/react";

type ProvidersProps = {
    children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <HeroUIProvider>
            <ToastProvider placement="bottom-right" />
            {children}
        </HeroUIProvider>
    );
}
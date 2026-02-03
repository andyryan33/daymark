'use client';

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { useIsMobile } from "@/lib/hooks/use-is-mobile";

type ProvidersProps = {
    children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
    const isMobile = useIsMobile();

    return (
        <HeroUIProvider>
            <ToastProvider placement={isMobile ? "bottom-center" : "bottom-right"} toastOffset={isMobile ? 80 : 0} />
            {children}
        </HeroUIProvider>
    );
}
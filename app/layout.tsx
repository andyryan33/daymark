import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { TimezoneSync } from "@/components/layout/timezone-sync";
import Providers from "./providers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "daymark",
    description: "how was your day?",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="bg-[#FAFAFA]">
            <body className={`${geistSans.className} ${geistMono.variable} antialiased`}>
                <Providers>
                    <TimezoneSync />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
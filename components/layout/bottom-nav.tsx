'use client';

import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { Home, Calendar, History } from "lucide-react"; // Install lucide-react if you haven't

export default function BottomNav() {
    const pathname = usePathname();

    const navLinks = [
        { label: "Today", href: "/home", icon: Home },
        { label: "Timeline", href: "/home/timeline", icon: History },
        { label: "Year", href: "/home/year", icon: Calendar },
    ];

    return (
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-[#FAFAFA]/75 backdrop-blur-md border-t border-neutral-200 pb-safe-area-inset-bottom z-50">
            <div className="flex justify-around items-center h-16">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <NextLink 
                            key={link.href} 
                            href={link.href}
                            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                                isActive ? "text-primary" : "text-neutral-400"
                            }`}
                        >
                            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-medium">{link.label}</span>
                        </NextLink>
                    );
                })}
            </div>
        </nav>
    );
}
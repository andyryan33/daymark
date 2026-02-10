'use client';

import { 
    Navbar, 
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
    Link, 
    Avatar, 
    Dropdown, 
    DropdownTrigger, 
    DropdownMenu, 
    DropdownItem, 
    DropdownSection,
    useDisclosure
} from "@heroui/react";
import clsx from "clsx";
import { LogOut, Info, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import NextLink from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/lib/hooks/use-user";
import AboutModal from "../landing/about-modal";

export default function Header() {
    const { fullName, avatarUrl } = useUser();
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();
    const aboutDisclosure = useDisclosure();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    };

    const navLinks = [
        { label: "Today", href: "/home" },
        { label: "Timeline", href: "/home/timeline" },
        { label: "Year", href: "/home/year" },
    ];

    return (
        <>
            <Navbar 
                maxWidth="xl" 
                className="bg-primary-background backdrop-blur-md"
                classNames={{
                    item: [
                        "flex", "relative", "h-full", "items-center",
                        "data-[active=true]:after:content-['']",
                        "data-[active=true]:after:absolute",
                        "data-[active=true]:after:bottom-0",
                        "data-[active=true]:after:left-0",
                        "data-[active=true]:after:right-0",
                        "data-[active=true]:after:h-[2px]",
                        "data-[active=true]:after:rounded-[2px]",
                        "data-[active=true]:after:bg-primary",
                    ],
                }}
            >
                <NavbarBrand>
                    <Link as={NextLink} href="/home" className="text-primary font-bold text-xl tracking-tighter">
                        daymark
                    </Link>
                </NavbarBrand>

                <NavbarContent className="hidden sm:flex gap-8" justify="center">
                    {navLinks.map((link) => (
                        <NavbarItem key={link.href} isActive={pathname === link.href}>
                            <Link
                                as={NextLink}
                                href={link.href}
                                className={clsx(
                                    "text-sm font-medium transition-colors",
                                    pathname === link.href
                                        ? "text-primary"
                                        : "text-primary-900 hover:text-primary"
                                )}
                            >
                                {link.label}
                            </Link>
                        </NavbarItem>
                    ))}
                </NavbarContent>

                <NavbarContent justify="end">
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                color="primary"
                                classNames={{
                                    base: "ring-offset-primary-foreground",
                                    
                                }}
                                name={fullName}
                                size="sm"
                                src={avatarUrl}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="faded" disabledKeys={["user"]}>
                            <DropdownSection title="Signed in as">
                                <DropdownItem key="user" textValue={fullName} startContent={<User size={18} />} className="text-foreground-900">
                                    {fullName}
                                </DropdownItem>
                            </DropdownSection>

                            <DropdownSection title="Application">
                                <DropdownItem 
                                className="text-foreground-900"
                                    key="about" 
                                    onPress={aboutDisclosure.onOpen}
                                    startContent={<Info size={18} />}
                                >
                                    About
                                </DropdownItem>
                                <DropdownItem 
                                className="text-foreground-900"
                                    key="logout" 
                                    color="danger"
                                    startContent={<LogOut size={18} />}
                                    onPress={handleLogout}
                                >
                                    Log Out
                                </DropdownItem>
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </Navbar>

            <AboutModal 
                isOpen={aboutDisclosure.isOpen} 
                onOpenChange={aboutDisclosure.onOpenChange} 
                isExternal={true} 
            />
        </>
    );
}
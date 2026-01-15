'use client';

import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Divider } from "@heroui/react";
import { Info, Github, Twitter, Instagram, Mail, ShieldCheck } from "lucide-react";

interface AboutModalProps {
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    isExternal?: boolean; // New prop to toggle between button or controlled mode
}

export default function AboutModal({ isOpen: extOpen, onOpenChange: extChange, isExternal = false }: AboutModalProps) {
    const internal = useDisclosure();
    const currentYear = new Date().getFullYear();

    // Decide which state to use
    const isOpen = isExternal ? extOpen : internal.isOpen;
    const onOpenChange = isExternal ? extChange : internal.onOpenChange;

    return (
        <>
            {/* Show the Info button ONLY if it's not being controlled by the Header */}
            {!isExternal && (
                <Button
                    isIconOnly
                    variant="light"
                    radius="full"
                    onPress={internal.onOpen}
                    aria-label="About daymark"
                    className="text-neutral-400 hover:text-[#708ea5]"
                >
                    <Info size={18} />
                </Button>
            )}

            <Modal 
                isOpen={isOpen} 
                onOpenChange={onOpenChange}
                backdrop="blur"
                placement="center"
                hideCloseButton
                className="mx-4"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center pt-10">
                                <span className="text-2xl font-bold tracking-tighter text-[#708ea5]">daymark</span>
                            </ModalHeader>

                            <ModalBody className="pb-10">
                                <div className="flex flex-col items-center text-center gap-6">
                                    <p className="text-sm text-neutral-500 max-w-[85%] leading-relaxed">
                                        A minimal space to record how you feel. Designed to help you notice the light in your journey, one day at a time.
                                    </p>

                                    <Divider className="opacity-50" />

                                    <div className="space-y-4">
                                        <p className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Privacy & Cookies</p>
                                        <div className="flex items-start gap-3 text-left bg-neutral-50 p-3 rounded-xl">
                                            <ShieldCheck size={18} className="text-[#708ea5] shrink-0 mt-0.5" />
                                            <p className="text-[12px] text-neutral-600 leading-snug">
                                                This app uses a single, functional cookie to remember your local timezone so your entries align with your day. It does not track you or sell your data.
                                            </p>
                                        </div>
                                    </div>

                                    <Divider className="opacity-50" />
                                    
                                    <div className="flex flex-col items-center gap-4">
                                        <p className="text-sm font-medium text-neutral-800">
                                            Created by Andy Ryan
                                        </p>
                                        <div className="flex gap-6">
                                            <SocialLink href="https://twitter.com/YoBoyPaste" icon={<Twitter size={20} />} />
                                            <SocialLink href="https://www.instagram.com/yoboypaste/" icon={<Instagram size={20} />} />
                                            <SocialLink href="https://github.com/andyryan33" icon={<Github size={20} />} />
                                            <SocialLink href="mailto:andyryan33@gmail.com" icon={<Mail size={20} />} />
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-300">
                                            © {currentYear} daymark
                                        </p>
                                    </div>
                                    
                                    <Button size="sm" variant="light" color="primary" onPress={onClose} className="mt-2 text-neutral-500">
                                        Close
                                    </Button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

function SocialLink({ href, icon }: { href: string, icon: React.ReactNode }) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-neutral-400 transition-all duration-200 hover:text-[#708ea5] hover:scale-110 active:scale-95"
        >
            {icon}
        </a>
    );
}
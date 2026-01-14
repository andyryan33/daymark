'use client';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@heroui/react";
import { useEffect } from "react";
import { MOODS } from "@/lib/mood";
import clsx from "clsx";
import { completeWalkthrough } from "@/actions/user";

interface Props {
    shouldShow: boolean;
}

export default function WelcomeModal({ shouldShow }: Props) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    useEffect(() => {
        if (shouldShow) {
            onOpen();
        }
    }, [shouldShow, onOpen]);

    const handleDismiss = () => {
        onClose();
    };

    const handleComplete = async () => {
        onClose(); // Close immediately for better UX
        await completeWalkthrough();
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            backdrop="blur"
            placement="center"
            hideCloseButton
            isDismissable={false}
            className="mx-6 max-w-sm"
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 text-center pt-8">
                    <span className="text-xl font-medium text-gray-800">Welcome to <span className="text-primary font-bold tracking-tighter">daymark</span></span>
                </ModalHeader>

                <ModalBody className="pb-6">
                    <div className="flex flex-col items-center text-center gap-6">
                        <p className="text-sm text-neutral-500 leading-relaxed">
                            Tracking your days should be simple. <br/>
                            Select the color that matches your vibe.
                        </p>

                        <div className="grid gap-3 w-full px-4">
                            {MOODS.map((mood) => (
                                <div key={mood.value} className="flex items-center gap-4 p-2 rounded-xl hover:bg-neutral-50 transition-colors">
                                    <div className={clsx("w-8 h-8 rounded-full shadow-sm", mood.color)} />
                                    <div className="flex flex-col items-start">
                                        <span className="text-sm font-medium text-gray-700">{mood.label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter className="flex-col gap-2 pb-6 pt-0">
                    <Button 
                        fullWidth 
                        color="primary"
                        variant="light"
                        onPress={handleComplete}
                        className="font-medium"
                    >
                        Got it
                    </Button>
                    <Button 
                        fullWidth 
                        variant="light" 
                        color="default" 
                        onPress={handleDismiss}
                        className="text-neutral-400"
                    >
                        Remind me later
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
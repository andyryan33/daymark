'use client';

import { Modal, ModalContent, Button, useDisclosure, Switch } from "@heroui/react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MOODS } from "@/lib/utils/mood";
import { completeWalkthrough } from "@/actions/user";
import { ChevronRight, Check } from "lucide-react";
import clsx from "clsx";

type WelcomeModalProps = {
    shouldShow: boolean;
}

export default function WelcomeModal({ shouldShow }: WelcomeModalProps) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [step, setStep] = useState(0);
    const [demoMood, setDemoMood] = useState(MOODS[2].value);
    const [demoDaymark, setDemoDaymark] = useState(false);

    useEffect(() => {
        if (shouldShow) onOpen();
    }, [shouldShow, onOpen]);

    const handleComplete = async () => {
        onClose();
        setTimeout(() => completeWalkthrough(), 300);
    };

    const nextStep = () => setStep((s) => s + 1);

    const steps = [
        {
            title: (<div>Welcome to <span className="text-primary font-bold tracking-tighter">daymark</span></div>),
            subtitle: "A quiet space to record your journey, one day at a time.",
            content: (
                <div className="flex justify-center py-8">
                    <div className="h-24 w-24 bg-[#708EA5] rounded-full flex items-center justify-center shadow-xl shadow-blue-900/10 ring-4 ring-slate-200 ring-offset-3" />
                </div>
            )
        },
        {
            title: "Track your light",
            subtitle: "Every day has a color. Select the orb that fits how you feel.",
            content: (
                <div className="py-6 flex flex-col items-center gap-6">
                    <div className="w-full bg-neutral-50 border border-neutral-100 p-4 rounded-xl flex items-center gap-4 transition-colors duration-300">
                        <div className={clsx(
                            "h-12 w-12 rounded-full transition-all duration-300 ring-4 ring-offset-2 ring-slate-200 shadow-sm",
                            MOODS.find(m => m.value === demoMood)?.color
                        )} />
                        <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase text-neutral-400 tracking-wider">Preview</span>
                            <span className="font-medium text-neutral-800">
                                {MOODS.find(m => m.value === demoMood)?.label}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {MOODS.map(m => (
                            <button
                                key={m.value}
                                onClick={() => setDemoMood(m.value)}
                                className={clsx(
                                    "h-6 w-6 rounded-full transition-transform hover:scale-110",
                                    m.color,
                                    demoMood === m.value ? "ring-2 ring-offset-1 ring-slate-200 scale-110" : "opacity-50"
                                )}
                            />
                        ))}
                    </div>
                </div>
            )
        },
        {
            title: "Mark the days that matter.",
            subtitle: "Daymark moments you want to remember.",
            content: (
                <div className="flex flex-col items-center py-6 h-full">
                    <div className="relative w-48 bg-white border border-neutral-200 shadow-xl shadow-neutral-200/50 rounded-2xl p-6 flex flex-col items-center gap-4 transition-all duration-300">

                        <div className="absolute top-3 left-3">
                            <Switch
                                size="sm"
                                onValueChange={() => setDemoDaymark(!demoDaymark)}
                            />
                             {!demoDaymark && (
                                <span className="absolute -top-1 -right-2 flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#facc15] opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#facc15]"></span>
                                </span>
                             )}
                        </div>

                        <motion.div
                            layout
                            className={clsx(
                                "h-16 w-16 bg-[#facc15] shadow-sm transition-all duration-300",
                                demoDaymark 
                                    ? "rounded-full ring-4 ring-offset-2 ring-slate-200" 
                                    : "rounded-full"
                            )}
                        />

                        <div className="space-y-1.5 text-center w-full flex flex-col items-center opacity-50">
                            <div className="h-1.5 w-16 bg-neutral-200 rounded-full" />
                            <div className="h-1.5 w-10 bg-neutral-200 rounded-full" />
                        </div>
                    </div>
                    
                    <motion.p 
                        key={demoDaymark ? "marked" : "normal"}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 text-[10px] font-bold text-neutral-400 uppercase tracking-widest"
                    >
                        {demoDaymark ? "Daymarked!" : "Unmarked"}
                    </motion.p>
                </div>
            )
        },
        {
            title: "Your timeline awaits",
            subtitle: "Over time, you will see patterns, memories, and growth.",
            content: (
                <div className="py-8 grid grid-cols-7 gap-2">
                     {Array.from({ length: 14 }).map((_, i) => (
                        <div 
                            key={i} 
                            className={clsx(
                                "aspect-square transition-all duration-500", 
                                i === 3 && demoDaymark ? "rounded-full ring-2 ring-offset-2 ring-slate-300" : "rounded-full",
                                i % 3 === 0 ? "bg-[#facc15]" : i % 2 === 0 ? "bg-[#0BEA8D]" : "bg-[#94a3b8]"
                            )} 
                        />
                     ))}
                </div>
            )
        }
    ];

    return (
        <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            backdrop="blur"
            placement="center"
            hideCloseButton
            isDismissable={false}
            classNames={{
                base: "bg-white",
                backdrop: "bg-neutral-900/20 backdrop-blur-sm"
            }}
        >
            <ModalContent className="p-0 overflow-hidden max-w-[360px]">
                <div className="p-6 flex flex-col relative">
                    <div className="flex justify-center gap-1.5 mb-8">
                        {steps.map((_, i) => (
                            <motion.div 
                                key={i}
                                className="h-1.5 rounded-full bg-neutral-200"
                                animate={{ 
                                    width: step === i ? 24 : 6,
                                    backgroundColor: step === i ? "#708ea5" : "#e5e5e5"
                                }}
                            />
                        ))}
                    </div>

                    <div className="flex-1 relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col items-center text-center h-full"
                            >
                                <h2 className="text-xl font-bold text-neutral-800 mb-2">
                                    {steps[step].title}
                                </h2>
                                <p className="text-sm text-neutral-500 leading-relaxed max-w-[260px]">
                                    {steps[step].subtitle}
                                </p>
                                
                                <div className="flex-1 w-full flex flex-col justify-center">
                                    {steps[step].content}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="mt-auto pt-4">
                        <div className="flex flex-col gap-2">
                            {step < steps.length - 1 ? (
                                <Button 
                                    fullWidth 
                                    className="bg-neutral-900 text-white"
                                    onPress={nextStep}
                                    endContent={<ChevronRight size={18} />}
                                >
                                    Continue
                                </Button>
                            ) : (
                                <>
                                    <Button 
                                        fullWidth
                                        variant="solid"
                                        color="primary"
                                        onPress={handleComplete}
                                        startContent={<Check size={18} />}
                                    >
                                        Get Started
                                    </Button>
                                    <Button 
                                        fullWidth 
                                        variant="light" 
                                        color="default" 
                                        onPress={() => onClose()}
                                        className="text-neutral-400"
                                    >
                                        Remind me later
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    );
}
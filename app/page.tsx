'use client';

import { Button } from "@heroui/react";
import { signInWithGoogle } from "@/lib/supabase/client";
import { LogIn, Heart, Calendar, LineChart } from "lucide-react";
import AboutModal from "@/components/landing/about-modal"; // Ensure path is correct
import PreviewGrid from "@/components/landing/preview-grid";
import { motion } from "framer-motion";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#FAFAFA] flex flex-col overflow-x-hidden relative selection:bg-[#708ea5]/20">
            
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            <nav className="relative z-10 px-6 py-6 md:py-8 flex justify-between items-center max-w-7xl mx-auto w-full">
                    <div className="text-xl md:text-2xl font-bold tracking-tighter text-[#708ea5]">
                        daymark
                    </div>
                <Button 
                    variant="light"
                    color="primary"
                    onPress={signInWithGoogle}
                >
                    Login
                </Button>
            </nav>

            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center pt-16 md:pt-24 pb-16">
                <div className="space-y-8 max-w-4xl flex flex-col items-center">
                    
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#708ea5]/10 text-[#708ea5] text-xs font-semibold uppercase tracking-wider">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#708ea5] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#708ea5]"></span>
                        </span>
                        Your Daily Mood
                    </div>

                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-neutral-900 leading-[0.9]">
                        mark your days, <br />
                        <span className="text-primary">track your light.</span>
                    </h1>
                    
                    <p className="text-lg text-neutral-500 max-w-lg mx-auto leading-relaxed">
                        A mindful space to record your daily emotions and visualize your year in color.
                    </p>

                    <div className="pt-4">
                        <Button 
                            size="lg" 
                            onPress={signInWithGoogle}
                            className="bg-[#2c2c2c] text-white font-medium"
                            startContent={<LogIn size={20} />}
                        >
                            On your mark
                        </Button>
                    </div>
                </div>

                <div className="mt-20 w-full max-w-2xl px-4 pointer-events-none select-none">
                    <PreviewGrid />
                </div>
            </main>

            <section className="relative z-10 bg-white border-y border-neutral-200 py-16 md:py-24 px-6 mt-20">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard 
                        icon={<Heart size={24} />} 
                        title="Mindful Logging" 
                        desc="Fast, friction-less entry for your daily mood and thoughts." 
                    />
                    <FeatureCard 
                        icon={<LineChart size={24} />} 
                        title="Visual Insights" 
                        desc="See your month and year at a glance with beautiful color grids." 
                    />
                    <FeatureCard 
                        icon={<Calendar size={24} />} 
                        title="Timeline" 
                        desc="A scrolling history of your journey, exactly how you remember it." 
                    />
                </div>
            </section>

            <footer className="py-10 flex flex-col items-center gap-2">
                <AboutModal />
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest">
                    &copy; {new Date().getFullYear()} daymark
                </p>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="space-y-3 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-[#708ea5]">
                {icon}
            </div>
            <h3 className="font-semibold text-neutral-800">{title}</h3>
            <p className="text-sm text-neutral-500 max-w-[250px]">{desc}</p>
        </div>
    );
}
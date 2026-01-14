'use client';

import { Button } from "@heroui/react";
import { signInWithGoogle } from "@/lib/supabase/client";
import { LogIn, Heart, Calendar, LineChart } from "lucide-react";
import PreviewGrid from "@/components/landing/preview-grid";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#FAFAFA] flex flex-col overflow-x-hidden">
            {/* Simple Nav */}
            <nav className="px-6 py-6 md:py-8 flex justify-between items-center max-w-7xl mx-auto w-full">
                <div className="text-xl md:text-2xl font-bold tracking-tighter text-[#708ea5]">
                    daymark
                </div>
                <Button 
                    variant="light"
                    color="primary" 
                    size="sm"
                    onPress={signInWithGoogle}
                    className="font-medium md:hidden"
                >
                    Login
                </Button>
                <Button 
                    variant="light"
                    color="primary"
                    onPress={signInWithGoogle}
                    className="font-medium hidden md:flex"
                >
                    Login
                </Button>
            </nav>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col items-center justify-center px-6 text-center pt-10 md:pt-0">
                <div className="space-y-4 md:space-y-6 max-w-3xl">
                    <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-neutral-800">
                        mark your days, <br />
                        <span className="text-[#708ea5]">track your light.</span>
                    </h1>
                    
                    <p className="text-base md:text-lg text-neutral-500 max-w-md mx-auto leading-relaxed px-4">
                        A calm, minimal space to record how you feel — and see your emotional patterns over time.
                    </p>

                    <div className="pt-6 md:pt-8 px-4">
                        <Button 
                            size="lg" 
                            onPress={signInWithGoogle}
                            className="bg-[#708ea5] text-white font-semibold w-full md:w-auto px-8 h-14 text-lg shadow-lg shadow-blue-900/10"
                            startContent={<LogIn size={20} />}
                        >
                            Continue with Google
                        </Button>
                    </div>
                </div>

                {/* Preview Grid Component */}
                <div className="mt-16 md:mt-24 w-full max-w-md px-4 pointer-events-none">
                    <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-4">Your year in color</p>
                    <PreviewGrid />
                </div>
            </main>

            {/* Features Row */}
            <section className="bg-white border-t border-neutral-100 py-16 md:py-24 px-6 mt-20">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
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

            <footer className="py-10 text-center text-[10px] text-neutral-400 uppercase tracking-widest">
                &copy; {new Date().getFullYear()} daymark
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
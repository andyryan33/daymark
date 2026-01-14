import Header from "@/components/layout/header";
import BottomNav from "@/components/layout/bottom-nav";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-dvh bg-[#FAFAFA]">
            <Header />
            
            <main className="flex-1 flex flex-col pb-20 sm:pb-0">
                {children}
            </main>
            <BottomNav />
        </div>
    );
}
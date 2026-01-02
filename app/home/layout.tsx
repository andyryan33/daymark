import Header from "@/components/layout/header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main className="px-6 py-8">
                {children}
            </main>
        </>
    );
}
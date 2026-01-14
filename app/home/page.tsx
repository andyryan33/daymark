import { getDayEntry } from "@/lib/db/queries/day-entries";
import TodayPageContent from "@/components/home/today-page-content";

type TodayPageProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function TodayPage({ searchParams }: TodayPageProps) {
    const params = await searchParams;
    const dateParam = typeof params.date === 'string' ? params.date : null;

    // Fetch the specific date if provided, otherwise fetch the "Server Today" as a fallback
    // (The client will override this if it's different)
    const fallbackDate = new Date().toISOString().split('T')[0];
    const targetDate = dateParam || fallbackDate;

    const entryResult = await getDayEntry(targetDate);
    const initialData = entryResult.success ? entryResult.data : null;

    return (
        <TodayPageContent 
            key={targetDate} // Key forces a remount on date change
            initialData={initialData} 
            selectedDateString={targetDate}
            isInitialDefault={!dateParam} // Tells the client this was a guess
        />
    );
}
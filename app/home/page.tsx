import { getDayEntry } from "@/lib/db/queries/day-entries";
import TodayPageContent from "@/components/home/today-page-content";

type TodayPageProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function TodayPage({ searchParams }: TodayPageProps) {
    const params = await searchParams;
    const dateParam = typeof params.date === 'string' ? params.date : null;
    
    const now = new Date();
    const todayString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const selectedDate = dateParam || todayString;

    const entryResult = await getDayEntry(selectedDate);
    const initialData = entryResult.success ? entryResult.data : null;

    return (
            <TodayPageContent 
                key={selectedDate}
                initialData={initialData} 
                selectedDateString={selectedDate}
                todayString={todayString}
            />
    );
}
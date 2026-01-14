import { cookies } from 'next/headers';
import { getDayEntry } from "@/lib/db/queries/day-entries";
import TodayPageContent from "@/components/home/today-page-content";

type TodayPageProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function TodayPage({ searchParams }: TodayPageProps) {
const params = await searchParams;
    const dateParam = typeof params.date === 'string' ? params.date : null;
    
    // 1. Get timezone from cookie, default to UTC if not set yet
    const cookieStore = await cookies();
    const userTz = cookieStore.get('user-tz')?.value || 'UTC';

    // 2. Calculate "Today" based on that timezone
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-CA', { // en-CA gives YYYY-MM-DD
        timeZone: userTz,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    
    const todayString = formatter.format(now); 
    const selectedDate = dateParam || todayString;

    // 3. Fetch data
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
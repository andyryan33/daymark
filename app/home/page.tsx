import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { getDayEntry } from "@/lib/db/queries/day-entries";
import { getProfileStatus } from "@/lib/db/queries/user";
import TodayPageSkeleton from '@/components/home/today-page-skeleton';
import TodayPageContent from "@/components/home/today-page-content";

type TodayPageProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function TodayPage({ searchParams }: TodayPageProps) {
    const params = await searchParams;
    const dateParam = typeof params.date === 'string' ? params.date : null;

    const cookieStore = await cookies();
    const userTz = cookieStore.get('user-tz')?.value || 'UTC';

    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-CA', { 
        timeZone: userTz,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    
    const todayString = formatter.format(now); 
    const selectedDate = dateParam || todayString;

    const [entryResult, profileStatus] = await Promise.all([
        getDayEntry(selectedDate),
        getProfileStatus()
    ]);
    
    const initialData = entryResult.success ? entryResult.data : null;
    const showWelcome = !profileStatus.hasSeenWelcome;

    return (
        <Suspense fallback={<TodayPageSkeleton />}>
            <TodayPageContent 
                key={selectedDate}
                initialData={initialData} 
                selectedDateString={selectedDate}
                todayString={todayString}
                showWelcome={showWelcome}
            />
        </Suspense>
    );
}
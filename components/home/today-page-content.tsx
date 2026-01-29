'use client';

import { Button } from "@heroui/react";
import TodayPageSkeletonCard from "./today-page-skeleton-card";
import MoodSelector from "./mood-selector";
import NotesStep from "./notes-step";
import TodayLoggedView from "./today-logged-view";
import WelcomeModal from "@/components/home/welcome-modal";
import TodayHeader from "./today-header";
import { UseTodayLogicProps, useTodayLogic } from "@/lib/hooks/use-today-logic";

type TodayPageContentProps = UseTodayLogicProps & {
    showWelcome?: boolean;
};

export default function TodayPageContent(props: TodayPageContentProps) {
    const { state, actions } = useTodayLogic(props);

    const { 
        viewMode, draftMood, draftNotes, optimisticEntry, 
        isNavigating, isFuture, dateLabel, prevDate, nextDate, 
        showNavigation, isToday 
    } = state;

    const renderContent = () => {
        if (isNavigating) return <TodayPageSkeletonCard />;
        
        if (isFuture) {
            return (
                <div className="text-center space-y-4">
                    <p className="text-sm text-neutral-400">
                        You can’t log future days.
                    </p>
                    <Button 
                        variant="light" 
                        color="primary"
                        onPress={() => { 
                            actions.navigate(props.todayString); 
                        }}
                    >
                        Back to Today
                    </Button>
                </div>
            );
        }

        switch (viewMode) {
            case "idle":
            case "editing":
                return (
                    <MoodSelector
                        value={draftMood}
                        onChange={(v) => { 
                            actions.setDraftMood(v); 
                            actions.setViewMode("notes"); 
                        }}
                        onCancel={viewMode === "editing" ? actions.cancel : undefined}
                    />
                );
            case "notes":
                return (
                    <NotesStep
                        mood={draftMood!}
                        notes={draftNotes}
                        onChange={actions.setDraftNotes}
                        onSave={actions.save}
                        onSkip={actions.save}
                        onBack={actions.back}
                    />
                );
            case "logged":
                if (!optimisticEntry?.mood) return <TodayPageSkeletonCard />;
                return (
                    <TodayLoggedView
                        mood={optimisticEntry.mood}
                        notes={optimisticEntry.notes}
                        onEdit={() => actions.setViewMode("editing")}
                    />
                );
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center px-6">
            <WelcomeModal shouldShow={props.showWelcome ?? false} />

            <div className="flex w-full max-w-md flex-col items-center gap-10">
                <TodayHeader 
                    label={dateLabel}
                    selectedDateString={props.selectedDateString}
                    onPrev={() => actions.navigate(prevDate)}
                    onNext={() => actions.navigate(nextDate)}
                    onSelectDate={(dateString) => actions.navigate(dateString)}
                    showNav={showNavigation}
                    isFuture={isFuture}
                    isToday={isToday}
                    isNavigating={isNavigating}
                    viewMode={viewMode}
                />

                <div className="w-full min-h-[300px] flex flex-col items-center">
                   {renderContent()}
                </div>
            </div>
        </div>
    );
}
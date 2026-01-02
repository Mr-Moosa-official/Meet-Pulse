'use client';

import { Mic, Square, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type MeetingControlsProps = {
  isRecording: boolean;
  isLoading: boolean;
  onToggleRecording: () => void;
};

export function MeetingControls({ isRecording, isLoading, onToggleRecording }: MeetingControlsProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 rounded-lg bg-card border shadow-sm">
      <h2 className="text-xl font-semibold text-center">Meeting Controls</h2>
      <p className="text-muted-foreground text-center max-w-sm text-sm">
        {isRecording
          ? 'Your meeting is being transcribed in real-time...'
          : 'Ready to start? Click the button below to begin.'}
      </p>
      <Button
        onClick={onToggleRecording}
        disabled={isLoading}
        size="lg"
        className="rounded-full w-40 h-16 text-lg font-semibold transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1 data-[recording=true]:bg-accent data-[recording=true]:hover:bg-accent/90"
        data-recording={isRecording}
      >
        {isLoading ? (
          <LoaderCircle className="animate-spin" />
        ) : isRecording ? (
          <>
            <Square className="mr-2" /> Stop
          </>
        ) : (
          <>
            <Mic className="mr-2" /> Start
          </>
        )}
      </Button>
    </div>
  );
}

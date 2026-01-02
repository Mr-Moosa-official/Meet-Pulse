import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot } from 'lucide-react';

type TranscriptViewProps = {
  transcript: string;
  isRecording: boolean;
};

export function TranscriptView({ transcript, isRecording }: TranscriptViewProps) {
  return (
    <div className="bg-card border rounded-lg shadow-sm flex flex-col h-full min-h-[300px] lg:min-h-[400px]">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Live Transcript</h2>
      </div>
      <ScrollArea className="flex-1 p-4">
        {transcript ? (
          <p className="whitespace-pre-wrap text-foreground/90 leading-relaxed text-sm">
            {transcript}
            {isRecording && <span className="inline-block w-2 h-4 ml-1 bg-primary rounded-full animate-pulse" />}
          </p>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4">
            <Bot size={48} />
            <p className="text-center text-sm">Transcription will appear here once the meeting starts.</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

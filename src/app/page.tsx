'use client';

import { useState, useTransition, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Header } from '@/components/meeting-ai/header';
import { MeetingControls } from '@/components/meeting-ai/meeting-controls';
import { TranscriptView } from '@/components/meeting-ai/transcript-view';
import { AnalysisDashboard } from '@/components/meeting-ai/analysis-dashboard';
import { processTranscript, type AnalysisResult } from '@/app/actions';
import { mockTranscript } from '@/lib/mock-data';

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiData, setAiData] = useState<AnalysisResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRecording) {
      setTranscript('');
      setAiData(null);
      const words = mockTranscript.split(' ');
      let wordIndex = 0;
      interval = setInterval(() => {
        if (wordIndex < words.length) {
          setTranscript((prev) => prev + words[wordIndex] + ' ');
          wordIndex++;
        } else {
          clearInterval(interval);
          handleToggleRecording(); // Auto-stop when mock transcript finishes
        }
      }, 120);
    }
    return () => {
      if(interval) clearInterval(interval)
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording]);

  const handleToggleRecording = () => {
    if (isRecording) {
      // Stop recording and process
      setIsRecording(false);
      
      startTransition(async () => {
        try {
          if (transcript.trim().length < 50) { 
            toast({
              variant: "destructive",
              title: "Recording too short",
              description: "Please record for a longer duration to get a meaningful analysis.",
            });
            return;
          }
          const result = await processTranscript(transcript);
          setAiData(result);
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Analysis Failed",
            description: error instanceof Error ? error.message : "An unknown error occurred.",
          });
        }
      });
    } else {
      // Start recording
      setIsRecording(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="grid gap-8 lg:grid-cols-5 max-w-7xl mx-auto">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <MeetingControls
              isRecording={isRecording}
              isLoading={isPending}
              onToggleRecording={handleToggleRecording}
            />
            <TranscriptView transcript={transcript} isRecording={isRecording && !isPending} />
          </div>
          <div className="lg:col-span-3">
            <AnalysisDashboard data={aiData} isLoading={isPending} />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground border-t">
        Powered by Google GenAI. Designed with Material 3.
      </footer>
    </div>
  );
}

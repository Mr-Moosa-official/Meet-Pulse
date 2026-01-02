'use server';

import { extractActionItems } from '@/ai/flows/extract-action-items';
import { generateMeetingSummary } from '@/ai/flows/generate-meeting-summary';
import { detectKeywords } from '@/ai/flows/detect-keywords';
import { analyzeSentiment } from '@/ai/flows/perform-sentiment-analysis';

export interface AnalysisResult {
  summary: string;
  actionItems: string[];
  sentiment: string;
  keywords: string[];
}

export async function processTranscript(transcript: string): Promise<AnalysisResult> {
  if (!transcript.trim()) {
    throw new Error('Transcript is empty');
  }

  try {
    const [summaryResult, actionItemsResult, sentimentResult, keywordsResult] = await Promise.all([
      generateMeetingSummary({ transcript }),
      extractActionItems({ transcript }),
      analyzeSentiment({ text: transcript }),
      detectKeywords({ transcript }),
    ]);

    return {
      summary: summaryResult.summary,
      actionItems: actionItemsResult.actionItems,
      sentiment: sentimentResult.sentiment,
      keywords: keywordsResult.keywords,
    };
  } catch (error) {
    console.error("AI processing failed:", error);
    throw new Error("Failed to analyze the meeting transcript. Please try again.");
  }
}

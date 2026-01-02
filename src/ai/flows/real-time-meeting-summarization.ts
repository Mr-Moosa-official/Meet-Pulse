'use server';
/**
 * @fileOverview A real-time meeting summarization AI agent.
 *
 * - realTimeMeetingSummarization - A function that handles the real-time meeting summarization process.
 * - RealTimeMeetingSummarizationInput - The input type for the realTimeMeetingSummarization function.
 * - RealTimeMeetingSummarizationOutput - The return type for the realTimeMeetingSummarization function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RealTimeMeetingSummarizationInputSchema = z.object({
  transcript: z.string().describe('The real-time meeting transcript.'),
});
export type RealTimeMeetingSummarizationInput = z.infer<typeof RealTimeMeetingSummarizationInputSchema>;

const RealTimeMeetingSummarizationOutputSchema = z.object({
  summary: z.string().describe('The real-time summary of the meeting.'),
  progress: z.string().describe('The summarization progress.'),
});
export type RealTimeMeetingSummarizationOutput = z.infer<typeof RealTimeMeetingSummarizationOutputSchema>;

export async function realTimeMeetingSummarization(
  input: RealTimeMeetingSummarizationInput
): Promise<RealTimeMeetingSummarizationOutput> {
  return realTimeMeetingSummarizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'realTimeMeetingSummarizationPrompt',
  input: {schema: RealTimeMeetingSummarizationInputSchema},
  output: {schema: RealTimeMeetingSummarizationOutputSchema},
  prompt: `You are an AI assistant summarizing a meeting in real time.\n  Provide a concise summary of the key points discussed in the following transcript.\n  Transcript: {{{transcript}}}`,
});

const realTimeMeetingSummarizationFlow = ai.defineFlow(
  {
    name: 'realTimeMeetingSummarizationFlow',
    inputSchema: RealTimeMeetingSummarizationInputSchema,
    outputSchema: RealTimeMeetingSummarizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      ...output,
      progress: 'Generated a real-time summary of the meeting transcript.',
    };
  }
);

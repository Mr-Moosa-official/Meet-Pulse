'use server';

/**
 * @fileOverview A meeting summarization AI agent.
 *
 * - generateMeetingSummary - A function that handles the meeting summarization process.
 * - GenerateMeetingSummaryInput - The input type for the generateMeetingSummary function.
 * - GenerateMeetingSummaryOutput - The return type for the generateMeetingSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMeetingSummaryInputSchema = z.object({
  transcript: z
    .string()
    .describe('The transcript of the meeting.'),
});
export type GenerateMeetingSummaryInput = z.infer<typeof GenerateMeetingSummaryInputSchema>;

const GenerateMeetingSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the meeting.'),
});
export type GenerateMeetingSummaryOutput = z.infer<typeof GenerateMeetingSummaryOutputSchema>;

export async function generateMeetingSummary(input: GenerateMeetingSummaryInput): Promise<GenerateMeetingSummaryOutput> {
  return generateMeetingSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMeetingSummaryPrompt',
  input: {schema: GenerateMeetingSummaryInputSchema},
  output: {schema: GenerateMeetingSummaryOutputSchema},
  prompt: `You are an AI assistant that summarizes meetings.

  Generate a concise summary of the meeting, highlighting key decisions and action items.

  Meeting Transcript: {{{transcript}}}`,
});

const generateMeetingSummaryFlow = ai.defineFlow(
  {
    name: 'generateMeetingSummaryFlow',
    inputSchema: GenerateMeetingSummaryInputSchema,
    outputSchema: GenerateMeetingSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

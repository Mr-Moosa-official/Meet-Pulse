'use server';
/**
 * @fileOverview Identifies primary discussion keywords from a meeting transcript.
 *
 * - detectKeywords - A function that handles the keyword detection process.
 * - DetectKeywordsInput - The input type for the detectKeywords function.
 * - DetectKeywordsOutput - The return type for the detectKeywords function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectKeywordsInputSchema = z.object({
  transcript: z.string().describe('The transcript of the meeting.'),
});
export type DetectKeywordsInput = z.infer<typeof DetectKeywordsInputSchema>;

const DetectKeywordsOutputSchema = z.object({
  keywords: z.array(z.string()).describe('The primary keywords discussed in the meeting.'),
});
export type DetectKeywordsOutput = z.infer<typeof DetectKeywordsOutputSchema>;

export async function detectKeywords(input: DetectKeywordsInput): Promise<DetectKeywordsOutput> {
  return detectKeywordsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectKeywordsPrompt',
  input: {schema: DetectKeywordsInputSchema},
  output: {schema: DetectKeywordsOutputSchema},
  prompt: `You are an AI assistant specializing in identifying keywords from meeting transcripts.

  Given the following meeting transcript, identify the primary keywords discussed. Return a list of keywords that best represent the topics covered in the meeting. 

  Transcript: {{{transcript}}}
  `,
});

const detectKeywordsFlow = ai.defineFlow(
  {
    name: 'detectKeywordsFlow',
    inputSchema: DetectKeywordsInputSchema,
    outputSchema: DetectKeywordsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

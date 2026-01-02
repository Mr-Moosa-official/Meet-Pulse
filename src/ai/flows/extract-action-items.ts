'use server';

/**
 * @fileOverview A flow to extract action items from meeting transcripts.
 *
 * - extractActionItems - A function that handles the action item extraction process.
 * - ExtractActionItemsInput - The input type for the extractActionItems function.
 * - ExtractActionItemsOutput - The return type for the extractActionItems function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractActionItemsInputSchema = z.object({
  transcript: z.string().describe('The transcript of the meeting.'),
});
export type ExtractActionItemsInput = z.infer<typeof ExtractActionItemsInputSchema>;

const ExtractActionItemsOutputSchema = z.object({
  actionItems: z.array(z.string()).describe('A list of action items extracted from the transcript.'),
});
export type ExtractActionItemsOutput = z.infer<typeof ExtractActionItemsOutputSchema>;

export async function extractActionItems(input: ExtractActionItemsInput): Promise<ExtractActionItemsOutput> {
  return extractActionItemsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractActionItemsPrompt',
  input: {schema: ExtractActionItemsInputSchema},
  output: {schema: ExtractActionItemsOutputSchema},
  prompt: `You are an AI assistant tasked with extracting action items from meeting transcripts.

  Analyze the following transcript and identify any specific tasks or assignments given to individuals.
  List each action item clearly and concisely.

  Transcript:
  {{transcript}}`,
});

const extractActionItemsFlow = ai.defineFlow(
  {
    name: 'extractActionItemsFlow',
    inputSchema: ExtractActionItemsInputSchema,
    outputSchema: ExtractActionItemsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

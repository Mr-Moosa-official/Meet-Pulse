'use server';

/**
 * @fileOverview Analyzes the sentiment of a given text.
 *
 * - analyzeSentiment - A function that analyzes the sentiment of the input text.
 * - SentimentAnalysisInput - The input type for the analyzeSentiment function.
 * - SentimentAnalysisOutput - The return type for the analyzeSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SentimentAnalysisInputSchema = z.object({
  text: z.string().describe('The text to analyze for sentiment.'),
});
export type SentimentAnalysisInput = z.infer<typeof SentimentAnalysisInputSchema>;

const SentimentAnalysisOutputSchema = z.object({
  sentiment: z
    .string()
    .describe(
      'The sentiment of the text, can be positive, negative, or neutral, with an explanation.'
    ),
});
export type SentimentAnalysisOutput = z.infer<typeof SentimentAnalysisOutputSchema>;

export async function analyzeSentiment(input: SentimentAnalysisInput): Promise<SentimentAnalysisOutput> {
  return analyzeSentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'sentimentAnalysisPrompt',
  input: {schema: SentimentAnalysisInputSchema},
  output: {schema: SentimentAnalysisOutputSchema},
  prompt: `Analyze the sentiment of the following text and provide a concise explanation for your assessment.  The sentiment should be one of "positive", "negative" or "neutral".

Text: {{{text}}}`,
});

const analyzeSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeSentimentFlow',
    inputSchema: SentimentAnalysisInputSchema,
    outputSchema: SentimentAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

import { config } from 'dotenv';
config();

import '@/ai/flows/extract-action-items.ts';
import '@/ai/flows/real-time-meeting-summarization.ts';
import '@/ai/flows/detect-keywords.ts';
import '@/ai/flows/generate-meeting-summary.ts';
import '@/ai/flows/perform-sentiment-analysis.ts';
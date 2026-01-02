import {
  ScrollText,
  ListChecks,
  Smile,
  Frown,
  Meh,
  Tags,
} from 'lucide-react';
import type { AnalysisResult } from '@/app/actions';
import { AnalysisCard } from './analysis-card';
import { Badge } from '@/components/ui/badge';

type AnalysisDashboardProps = {
  data: AnalysisResult | null;
  isLoading: boolean;
};

function getSentimentInfo(sentiment: string | undefined): { icon: React.ReactNode; badge: React.ReactNode } {
  if (!sentiment) return { icon: <Meh />, badge: <Badge variant="outline">Unknown</Badge> };
  
  const sentimentLower = sentiment.toLowerCase();

  if (sentimentLower.includes('positive')) {
    return { icon: <Smile className="text-secondary" />, badge: <Badge className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">Positive</Badge> };
  }
  if (sentimentLower.includes('negative')) {
    return { icon: <Frown className="text-accent" />, badge: <Badge className="bg-accent hover:bg-accent/90 text-accent-foreground">Negative</Badge> };
  }
  return { icon: <Meh className="text-highlight" />, badge: <Badge className="bg-highlight hover:bg-highlight/80 text-black">Neutral</Badge> };
}

export function AnalysisDashboard({ data, isLoading }: AnalysisDashboardProps) {
  const sentimentInfo = getSentimentInfo(data?.sentiment);

  return (
    <div className="space-y-6">
      <AnalysisCard title="Meeting Summary" icon={<ScrollText />} isLoading={isLoading}>
        <p className="text-sm text-muted-foreground leading-relaxed">{data?.summary || 'No summary generated yet. Stop the recording to see results.'}</p>
      </AnalysisCard>

      <AnalysisCard title="Action Items" icon={<ListChecks />} isLoading={isLoading}>
        {data?.actionItems && data.actionItems.length > 0 ? (
          <ul className="space-y-3 text-sm text-muted-foreground">
            {data.actionItems.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-primary mt-1.5">&#10003;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No action items were identified.</p>
        )}
      </AnalysisCard>
      
      <div className="grid gap-6 md:grid-cols-2">
        <AnalysisCard title="Sentiment" icon={sentimentInfo.icon} isLoading={isLoading}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                {sentimentInfo.badge}
                <p className="text-sm text-muted-foreground truncate">{data?.sentiment}</p>
            </div>
        </AnalysisCard>

        <AnalysisCard title="Keywords" icon={<Tags />} isLoading={isLoading}>
            {data?.keywords && data.keywords.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                    {data.keywords.map((keyword, index) => (
                        <Badge key={index} variant="secondary">{keyword}</Badge>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-muted-foreground">No keywords detected.</p>
            )}
        </AnalysisCard>
      </div>
    </div>
  );
}

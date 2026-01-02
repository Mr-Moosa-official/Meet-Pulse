import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type AnalysisCardProps = {
  title: string;
  icon: React.ReactNode;
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
};

export function AnalysisCard({ title, icon, isLoading, children, className }: AnalysisCardProps) {
  return (
    <Card className={`animate-bounce-in ${className}`} style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <div className="pt-2">{children}</div>
        )}
      </CardContent>
    </Card>
  );
}

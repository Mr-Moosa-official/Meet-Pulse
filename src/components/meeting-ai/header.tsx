import { Logo } from '@/components/icons';

export function Header() {
  return (
    <header className="py-4 px-4 md:px-8 border-b">
      <div className="flex items-center gap-3 max-w-7xl mx-auto">
        <Logo className="text-primary h-8 w-8" />
        <h1 className="text-2xl font-bold text-foreground">MeetingAI</h1>
      </div>
    </header>
  );
}

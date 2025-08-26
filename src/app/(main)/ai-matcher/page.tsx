import { MatcherClient } from './matcher-client';

export default function AiMatcherPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">AI Skill Match Tool</h2>
      </div>
      <p className="text-muted-foreground max-w-2xl">
        Let our AI assistant find the perfect skill exchange partners for you. It analyzes your profile, what you're looking for, and current community trends to suggest the most optimal matches.
      </p>
      <MatcherClient />
    </div>
  );
}

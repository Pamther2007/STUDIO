'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { skillMatchRecommendation } from '@/ai/flows/skill-match-recommendation';
import { getCurrentUser, users, skills } from '@/lib/data';
import { Bot, Sparkles, UserCheck } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Match = {
  userProfile: string;
  rationale: string;
};

export function MatcherClient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);

  const currentUser = getCurrentUser();

  const getSkillNames = (skillIds: string[]) => 
    skillIds.map(id => skills.find(s => s.id === id)?.name || id).join(', ');

  const handleGenerateMatches = async () => {
    setLoading(true);
    setError(null);
    setMatches([]);

    try {
      const userProfile = `User: ${currentUser.name}, Location: ${currentUser.location.name}, Skills Offered: ${getSkillNames(currentUser.skillsOffered)}, Skills Wanted: ${getSkillNames(currentUser.skillsWanted)}.`;
      
      const communityDemand = users
        .filter(u => u.id !== currentUser.id)
        .map(u => `User ${u.name} wants: ${getSkillNames(u.skillsWanted)}.`)
        .join(' ');

      const result = await skillMatchRecommendation({ userProfile, communityDemand });
      
      // The AI returns a string that needs to be parsed into a JSON object.
      const parsedMatches = JSON.parse(result.recommendedMatches);
      setMatches(parsedMatches);

    } catch (e: any) {
      console.error(e);
      setError('Failed to get recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot />
            Your AI Match Request
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">Click the button below to generate personalized skill swap recommendations based on your profile.</p>
          <Button onClick={handleGenerateMatches} disabled={loading}>
            {loading ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate My Matches
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mt-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading && (
        <div className="mt-6 space-y-4">
          <h3 className="text-2xl font-bold tracking-tight">AI Recommendations</h3>
          {[...Array(2)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-1/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {matches.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-2xl font-bold tracking-tight">AI Recommendations</h3>
          {matches.map((match, index) => (
            <Card key={index} className="bg-secondary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="text-primary" />
                  Match Recommendation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">{match.userProfile}</p>
                <blockquote className="mt-2 border-l-2 pl-3 text-sm italic text-muted-foreground">
                  {match.rationale}
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

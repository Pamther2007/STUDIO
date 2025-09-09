'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { skillMatchRecommendation } from '@/ai/flows/skill-match-recommendation';
import { users, skills } from '@/lib/data';
import { Bot, Sparkles, UserCheck, MapPin } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SkillIcon } from '@/components/skill-icon';
import { Label } from '@/components/ui/label';

type Match = {
  name: string;
  location: string;
  skillsOffered: string[];
  rationale: string;
};

export function MatcherClient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [skillToLearn, setSkillToLearn] = useState('');

  const getSkillId = (skillName: string) => {
    return skills.find(s => s.name.toLowerCase() === skillName.toLowerCase())?.id || 'unknown'
  }

  const handleGenerateMatches = async () => {
    if (!skillToLearn) {
      setError('Please enter a skill you want to learn.');
      return;
    }
    setLoading(true);
    setError(null);
    setMatches([]);

    try {
      // Filter out the current user and prepare the data for the AI
      const communityProfiles = users.map(u => ({
        name: u.name,
        location: u.location.name,
        skillsOffered: u.skillsOffered.map(id => skills.find(s => s.id === id)?.name || id),
      }));

      const result = await skillMatchRecommendation({
        skill: skillToLearn,
        communityProfiles: JSON.stringify(communityProfiles),
      });

      setMatches(result.recommendedMatches);

    } catch (e: any) {
      console.error(e);
      setError('Failed to get recommendations. The AI might be busy, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">AI Skill Match Tool</h2>
      </div>
      <p className="text-muted-foreground max-w-2xl">
        Let our AI assistant find the perfect skill exchange partners for you. It analyzes your profile, what you're looking for, and current community trends to suggest the most optimal matches.
      </p>
      <div className="mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot />
            Find Your Teacher
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="skill-input">What skill do you want to learn?</Label>
            <Input
              id="skill-input"
              placeholder="e.g., Cooking, Guitar, Coding..."
              value={skillToLearn}
              onChange={(e) => setSkillToLearn(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button onClick={handleGenerateMatches} disabled={loading || !skillToLearn}>
            {loading ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Find Matches
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
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {matches.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-2xl font-bold tracking-tight">AI Recommendations for learning "{skillToLearn}"</h3>
          {matches.map((match, index) => (
            <Card key={index} className="bg-secondary/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        <UserCheck className="text-primary" />
                        {match.name}
                    </span>
                    <span className="text-sm font-normal text-muted-foreground flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {match.location}
                    </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                 <blockquote className="border-l-2 pl-3 text-sm italic text-muted-foreground">
                  {match.rationale}
                </blockquote>
                <div>
                  <h4 className="font-semibold text-xs mb-2">Also offers:</h4>
                  <div className="flex flex-wrap gap-2">
                    {match.skillsOffered.map(skillName => (
                      <Badge key={skillName} variant={skillName.toLowerCase() === skillToLearn.toLowerCase() ? "default" : "outline"} className="flex items-center gap-1.5">
                        <SkillIcon skillId={getSkillId(skillName)} className="h-3 w-3" />
                        {skillName}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

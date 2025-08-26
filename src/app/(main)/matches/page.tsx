import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getCurrentUser, users, skills } from '@/lib/data';
import { Handshake, MapPin } from 'lucide-react';
import { SkillIcon } from '@/components/skill-icon';
import type { User } from '@/lib/types';

export default function MatchesPage() {
  const currentUser = getCurrentUser();

  const getSkillName = (skillId: string) => skills.find(s => s.id === skillId)?.name || 'Unknown Skill';

  const matches: { user: User, matchReason: string }[] = users
    .filter(user => user.id !== currentUser.id)
    .map(user => {
      const offeredByThem = user.skillsOffered.filter(skillId => currentUser.skillsWanted.includes(skillId));
      const wantedByThem = user.skillsWanted.filter(skillId => currentUser.skillsOffered.includes(skillId));
      
      if (offeredByThem.length > 0) {
        return { user, matchReason: `Offers ${getSkillName(offeredByThem[0])}` };
      }
      if (wantedByThem.length > 0) {
        return { user, matchReason: `Wants ${getSkillName(wantedByThem[0])}` };
      }
      return null;
    })
    .filter((match): match is { user: User, matchReason: string } => match !== null);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Your Skill Matches</h2>
      </div>
      <p className="text-muted-foreground">
        Connect with these community members who are offering a skill you want or looking for a skill you have.
      </p>

      {matches.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {matches.map(({ user, matchReason }) => (
            <Card key={user.id} className="flex flex-col transform transition-all hover:shadow-xl hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary/20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {user.location.name}
                  </CardDescription>
                   <Badge variant="secondary" className="mt-2">{matchReason}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Offers:</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.skillsOffered.map(skillId => (
                      <Badge key={skillId} variant={currentUser.skillsWanted.includes(skillId) ? "default" : "outline"} className="flex items-center gap-1.5">
                        <SkillIcon skillId={skillId} className="h-3 w-3" />
                        {getSkillName(skillId)}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Wants:</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.skillsWanted.map(skillId => (
                      <Badge key={skillId} variant={currentUser.skillsOffered.includes(skillId) ? "default" : "outline"} className="flex items-center gap-1.5">
                        <SkillIcon skillId={skillId} className="h-3 w-3" />
                        {getSkillName(skillId)}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Handshake className="mr-2 h-4 w-4" /> Request Session
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-lg font-semibold text-muted-foreground">No matches found yet.</p>
          <p className="text-sm text-muted-foreground">Try updating your profile with more skills you offer and want to learn!</p>
          <Button variant="link" asChild>
            <a href="/profile">Update Profile</a>
          </Button>
        </div>
      )}
    </div>
  );
}

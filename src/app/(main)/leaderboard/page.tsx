import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { getCurrentUser, users, skills } from '@/lib/data';
import { ArrowRight, Users } from 'lucide-react';
import type { User } from '@/lib/types';
import { Button } from '@/components/ui/button';

export default function MatchesPage() {
  const currentUser = getCurrentUser();

  const getSkillName = (skillId: string) => skills.find(s => s.id === skillId)?.name || 'Unknown Skill';
  const getSkillId = (skillName: string) => skills.find(s => s.name.toLowerCase() === skillName.toLowerCase())?.id;

  const matches: { user: User, matchReason: string, teaches: string, wants: string }[] = users
    .filter(user => user.id !== currentUser.id)
    .map(user => {
      const offeredByThem = user.skillsOffered.filter(skillId => currentUser.skillsWanted.includes(skillId));
      const wantedByThem = user.skillsWanted.filter(skillId => currentUser.skillsOffered.includes(skillId));
      
      if (offeredByThem.length > 0) {
        return { 
            user, 
            matchReason: `Offers ${getSkillName(offeredByThem[0])}`,
            teaches: getSkillName(offeredByThem[0]),
            wants: getSkillName(user.skillsWanted[0])
        };
      }
      if (wantedByThem.length > 0) {
        return { 
            user, 
            matchReason: `Wants ${getSkillName(wantedByThem[0])}`,
            teaches: getSkillName(user.skillsOffered[0]),
            wants: getSkillName(wantedByThem[0])
        };
      }
      return null;
    })
    .filter((match): match is { user: User, matchReason: string, teaches: string, wants: string } => match !== null);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Welcome Back!</h2>
        <p className="text-muted-foreground">
            Here's your learning and teaching snapshot for this month.
        </p>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="text-primary" /> Your Skill Matches
            </CardTitle>
            <CardDescription>
              Connect with users based on your skills and location.
            </CardDescription>
          </CardHeader>
        <CardContent>
           <div className="space-y-4">
              {matches.slice(0,3).map(({ user, teaches, wants }) => (
                  <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{user.name}</p>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <span>Teaches</span> <Badge variant="secondary">{teaches}</Badge>
                                <span>Wants</span> <Badge variant="outline">{wants}</Badge>
                            </div>
                        </div>
                      </div>
                      <Button variant="ghost">
                          Connect <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                  </div>
              ))}
           </div>
        </CardContent>
      </Card>
    </div>
  );
}

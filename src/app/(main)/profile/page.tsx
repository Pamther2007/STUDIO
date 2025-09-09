import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SkillIcon } from '@/components/skill-icon';
import { getCurrentUser, skills, users, reviews, badges as allBadges } from '@/lib/data';
import { Award, Edit, Handshake, MapPin, Star, Trophy, Users as UsersIcon, Languages, Sprout } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const badgeIcons: { [key: string]: React.ElementType } = {
  Award,
  Star,
  Users: UsersIcon,
  Languages,
  Sprout,
};

export default function ProfilePage() {
  const currentUser = getCurrentUser();
  const getSkillName = (skillId: string) => skills.find(s => s.id === skillId)?.name || 'Unknown Skill';
  const userReviews = reviews.filter(r => r.revieweeId === currentUser.id);

  const userBadges = currentUser.badges.map(badgeId => allBadges.find(b => b.id === badgeId)).filter(Boolean);

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <Card>
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-primary/20">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback className="text-3xl">{currentUser.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl font-bold">{currentUser.name}</CardTitle>
              <Button variant="outline"><Edit className="mr-2 h-4 w-4" /> Edit Profile</Button>
            </div>
            <CardDescription className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{currentUser.location.name}</span>
              <span className="flex items-center gap-1.5"><Award className="h-4 w-4 text-primary" />{currentUser.points} Points</span>
            </CardDescription>
            <p className="mt-2 text-sm text-muted-foreground">Joined {formatDistanceToNow(new Date(2023, 5, 15))} ago</p>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
           <CardHeader>
            <CardTitle>Skills</CardTitle>
            <CardDescription>The skills you offer and want to learn.</CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h3 className="font-semibold mb-2">Skills Offered</h3>
              <div className="flex flex-wrap gap-2">
                {currentUser.skillsOffered.map(skillId => (
                  <Badge key={skillId} className="text-base px-3 py-1 flex items-center gap-2">
                    <SkillIcon skillId={skillId} className="h-4 w-4" />
                    {getSkillName(skillId)}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
               <h3 className="font-semibold mb-2">Skills Wanted</h3>
              <div className="flex flex-wrap gap-2">
                {currentUser.skillsWanted.map(skillId => (
                  <Badge key={skillId} variant="secondary" className="text-base px-3 py-1 flex items-center gap-2">
                    <SkillIcon skillId={skillId} className="h-4 w-4" />
                    {getSkillName(skillId)}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
           <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Badges you've earned.</CardDescription>
          </CardHeader>
          <CardContent>
            {userBadges.length > 0 ? (
                <TooltipProvider>
                    <div className="flex flex-wrap gap-4">
                    {userBadges.map(badge => {
                        const Icon = badgeIcons[badge!.icon] || Trophy;
                        return (
                        <Tooltip key={badge!.id}>
                            <TooltipTrigger>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <span className="text-xs text-center font-medium w-20 truncate">{badge!.name}</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="font-bold">{badge!.name}</p>
                                <p className="text-sm text-muted-foreground">{badge!.description}</p>
                            </TooltipContent>
                        </Tooltip>
                        );
                    })}
                    </div>
              </TooltipProvider>
            ) : (
                <p className="text-center text-muted-foreground py-8">No badges earned yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
          <CardDescription>Feedback from your skill swap partners.</CardDescription>
        </CardHeader>
        <CardContent>
          {userReviews.length > 0 ? (
            <div className="space-y-6">
              {userReviews.map(review => {
                const reviewer = users.find(u => u.id === review.reviewerId);
                return (
                  <div key={review.id} className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={reviewer?.avatar} alt={reviewer?.name} />
                      <AvatarFallback>{reviewer?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold">{reviewer?.name}</p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < review.stars ? 'text-primary fill-current' : 'text-muted-foreground/50'}`} />
                          ))}
                        </div>
                      </div>
                      <blockquote className="mt-1 text-sm text-muted-foreground italic">"{review.feedback}"</blockquote>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No reviews yet. Complete a session to get feedback!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

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
import { getCurrentUser, skills, users, reviews } from '@/lib/data';
import { Award, Edit, Handshake, MapPin, Star } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function ProfilePage() {
  const currentUser = getCurrentUser();
  const getSkillName = (skillId: string) => skills.find(s => s.id === skillId)?.name || 'Unknown Skill';
  const userReviews = reviews.filter(r => r.revieweeId === currentUser.id);

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Skills Offered</CardTitle>
            <CardDescription>These are the skills you can teach others.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {currentUser.skillsOffered.map(skillId => (
              <Badge key={skillId} className="text-base px-3 py-1 flex items-center gap-2">
                <SkillIcon skillId={skillId} className="h-4 w-4" />
                {getSkillName(skillId)}
              </Badge>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Skills Wanted</CardTitle>
            <CardDescription>These are the skills you want to learn.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {currentUser.skillsWanted.map(skillId => (
              <Badge key={skillId} variant="secondary" className="text-base px-3 py-1 flex items-center gap-2">
                <SkillIcon skillId={skillId} className="h-4 w-4" />
                {getSkillName(skillId)}
              </Badge>
            ))}
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

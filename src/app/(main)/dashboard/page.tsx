import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Award,
  Calendar,
  Users,
  MessageSquare,
  Sparkles,
  Handshake,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getCurrentUser, users, sessions, skills, reviews } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SkillIcon } from '@/components/skill-icon';
import { format, formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const currentUser = getCurrentUser();
  const upcomingSessions = sessions
    .filter(
      (s) =>
        (s.learnerId === currentUser.id || s.teacherId === currentUser.id) &&
        s.status === 'confirmed' &&
        new Date(s.date) > new Date()
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const recentReviews = reviews
    .filter((r) => r.revieweeId === currentUser.id)
    .slice(0, 2);
  
  const potentialMatches = users.filter(user => 
    user.id !== currentUser.id && 
    user.skillsOffered.some(skillId => currentUser.skillsWanted.includes(skillId))
  ).length;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {currentUser.name.split(' ')[0]}!
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Points</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser.points}</div>
            <p className="text-xs text-muted-foreground">
              Ready to be spent on new skills
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingSessions.length}</div>
            <p className="text-xs text-muted-foreground">
              Ready to learn and teach
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Potential Matches</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{potentialMatches}</div>
            <p className="text-xs text-muted-foreground">
              New connections waiting
            </p>
          </CardContent>
        </Card>
        <Card className="bg-primary/10 border-primary/40">
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">AI Matcher</CardTitle>
            <Sparkles className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-primary-foreground mb-2">
              Find your perfect skill swap with our smart recommendation tool.
            </p>
             <Button size="sm" asChild>
                <Link href="/ai-matcher">Try Now</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>
              Your confirmed learning and teaching sessions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                {upcomingSessions.map((session) => {
                    const skill = skills.find((s) => s.id === session.skillId);
                    const partner = users.find(u => u.id === (session.teacherId === currentUser.id ? session.learnerId : session.teacherId));
                    const isTeaching = session.teacherId === currentUser.id;
                    if (!skill || !partner) return null;
                    return (
                    <div key={session.id} className="flex items-center space-x-4 p-2 rounded-lg hover:bg-secondary">
                        <Avatar>
                        <AvatarImage src={partner.avatar} />
                        <AvatarFallback>{partner.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="text-sm font-medium leading-none">
                                {isTeaching ? `Teaching ${partner.name}` : `Learning from ${partner.name}`}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <SkillIcon skillId={skill.id} className="h-4 w-4" /> {skill.name}
                            </p>
                        </div>
                        <div className="text-right">
                           <p className="text-sm font-medium">{format(new Date(session.date), "MMM d, h:mm a")}</p>
                           <Badge variant={isTeaching ? "default" : "secondary"}>{isTeaching ? "Teaching" : "Learning"}</Badge>
                        </div>
                    </div>
                    );
                })}
                </div>
            ) : (
                <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="mx-auto h-12 w-12 mb-4"/>
                    <p>No upcoming sessions.</p>
                    <p className="text-sm">Go to <Link href="/matches" className="text-primary underline">Matches</Link> to find someone!</p>
                </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
                You have {recentReviews.length} new reviews.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {recentReviews.length > 0 ? recentReviews.map(review => {
                const reviewer = users.find(u => u.id === review.reviewerId);
                if (!reviewer) return null;

                return (
                    <div key={review.id} className="flex items-start space-x-4">
                        <Avatar>
                            <AvatarImage src={reviewer.avatar} />
                            <AvatarFallback>{reviewer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium">{reviewer.name} reviewed you</p>
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Handshake key={i} className={`h-4 w-4 ${i < review.stars ? 'text-primary fill-current' : 'text-muted-foreground'}`} />
                                ))}
                            </div>
                            <blockquote className="mt-2 border-l-2 pl-3 text-sm italic text-muted-foreground">
                                "{review.feedback}"
                            </blockquote>
                        </div>
                    </div>
                )
            }) : (
                 <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="mx-auto h-12 w-12 mb-4"/>
                    <p>No new reviews yet.</p>
                    <p className="text-sm">Complete a session to get your first review!</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

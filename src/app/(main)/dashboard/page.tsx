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
  Clock,
  Flame,
  Target,
  Star,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getCurrentUser, users, sessions, skills, reviews, conversations } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SkillIcon } from '@/components/skill-icon';
import { format, formatDistanceToNow, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

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

  const nextSession = upcomingSessions[0];

  const recentReviews = reviews
    .filter((r) => r.revieweeId === currentUser.id)
    .slice(0, 2);
  
  const potentialMatches = users.filter(user => 
    user.id !== currentUser.id && 
    user.skillsOffered.some(skillId => currentUser.skillsWanted.includes(skillId))
  ).length;

  const unreadMessages = conversations.filter(c => 
    c.participantIds.includes(currentUser.id) && 
    c.lastMessage.senderId !== currentUser.id && 
    !c.lastMessage.read
  ).length;
  
  const completedSessions = sessions.filter(s => 
      (s.learnerId === currentUser.id || s.teacherId === currentUser.id) && s.status === 'completed'
    ).length;

  const weeklyGoal = 5;
  const weeklyProgress = (completedSessions / weeklyGoal) * 100;


  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {currentUser.name.split(' ')[0]}!
        </h2>
      </div>

      {nextSession && (
        <Card className="bg-primary/10 border-primary/20">
           <CardHeader>
                <CardTitle className="text-primary">Your Next Session is Coming Up!</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
                <div className="flex flex-col items-center justify-center bg-primary/20 p-4 rounded-lg">
                    <span className="text-3xl font-bold text-primary">{format(new Date(nextSession.date), "d")}</span>
                    <span className="text-sm font-medium text-primary/80">{format(new Date(nextSession.date), "MMM")}</span>
                </div>
                <div className="flex-1">
                    <p className="font-bold text-lg text-foreground">
                        {skills.find(s => s.id === nextSession.skillId)?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {nextSession.teacherId === currentUser.id ? 
                        `You are teaching ${users.find(u => u.id === nextSession.learnerId)?.name}` :
                        `You are learning from ${users.find(u => u.id === nextSession.teacherId)?.name}`
                        }
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="h-4 w-4" />
                        {format(new Date(nextSession.date), "eeee, h:mm a")} ({formatDistanceToNow(new Date(nextSession.date), { addSuffix: true })})
                    </p>
                </div>
                <Button asChild>
                    <Link href="/sessions">View Session</Link>
                </Button>
            </CardContent>
        </Card>
      )}

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
            <CardTitle className="text-sm font-medium">New Messages</CardTitle>
            <div className="relative">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              {unreadMessages > 0 && <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadMessages}</div>
            <p className="text-xs text-muted-foreground">
              From {unreadMessages} conversations
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Sessions</CardTitle>
            <Handshake className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedSessions}</div>
            <p className="text-xs text-muted-foreground">
              Across all your skills
            </p>
          </CardContent>
        </Card>
        <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedSessions}/{weeklyGoal}</div>
             <p className="text-xs text-muted-foreground mb-2">
              Sessions this week
            </p>
            <Progress value={weeklyProgress} className="h-2" />
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
                                    <Star key={i} className={`h-4 w-4 ${i < review.stars ? 'text-primary fill-primary' : 'text-muted-foreground/30'}`} />
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

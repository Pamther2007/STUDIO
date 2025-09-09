import { users, sessions, reviews } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Star, BookOpen, User, Crown, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

export default function LeaderboardPage() {
  const getLeaderboardData = () => {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    const allSessions = sessions.filter(s => s.status === 'completed');

    const userStats = users.map(user => {
      const taughtSessions = allSessions.filter(s => s.teacherId === user.id).length;
      const learnedSessions = allSessions.filter(s => s.learnerId === user.id).length;
      
      const monthlyLearnedSessions = allSessions.filter(s => 
        s.learnerId === user.id && 
        isWithinInterval(new Date(s.date), { start: monthStart, end: monthEnd })
      ).length;

      const userReviews = reviews.filter(r => r.revieweeId === user.id);
      const avgRating = userReviews.length > 0 ? userReviews.reduce((acc, r) => acc + r.stars, 0) / userReviews.length : 0;
      
      return {
        ...user,
        taughtSessions,
        learnedSessions,
        monthlyLearnedSessions,
        avgRating,
        reviewCount: userReviews.length
      };
    });

    const topTeachers = [...userStats].sort((a, b) => b.taughtSessions - a.taughtSessions).slice(0, 5);
    const topLearners = [...userStats].sort((a, b) => b.learnedSessions - a.learnedSessions).slice(0, 5);
    const topMonthlyLearners = [...userStats]
        .filter(u => u.monthlyLearnedSessions > 0)
        .sort((a, b) => b.monthlyLearnedSessions - a.monthlyLearnedSessions)
        .slice(0, 5);
    const topRated = [...userStats]
        .filter(u => u.reviewCount > 0)
        .sort((a, b) => {
            if (b.avgRating !== a.avgRating) {
                return b.avgRating - a.avgRating;
            }
            return b.reviewCount - a.reviewCount;
        })
        .slice(0, 5);

    return { topTeachers, topLearners, topMonthlyLearners, topRated };
  };

  const { topTeachers, topLearners, topMonthlyLearners, topRated } = getLeaderboardData();

  const rankColors = [
    'text-yellow-400',
    'text-gray-400',
    'text-yellow-600',
    'text-muted-foreground',
    'text-muted-foreground',
  ];
  
  const LeaderboardList = ({ users, stat, statLabel }: { users: any[], stat: string, statLabel: string }) => (
    <ul className="space-y-4">
      {users.map((user, index) => (
        <li key={user.id} className="flex items-center gap-4">
          <Trophy className={`w-6 h-6 ${rankColors[index]}`} />
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.location.name}</p>
          </div>
          <Badge variant="secondary">{user[stat]} {statLabel}</Badge>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Leaderboard</h2>
      </div>
      <p className="text-muted-foreground">
        See who's making the biggest impact in our skill-swapping community.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="text-primary" /> Top Teachers (All Time)
            </CardTitle>
            <CardDescription>Most sessions taught.</CardDescription>
          </CardHeader>
          <CardContent>
            <LeaderboardList users={topTeachers} stat="taughtSessions" statLabel="sessions" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="text-primary" /> Top Rated
            </CardTitle>
            <CardDescription>Highest average rating from reviews.</CardDescription>
          </CardHeader>
          <CardContent>
             <ul className="space-y-4">
              {topRated.map((user, index) => (
                <li key={user.id} className="flex items-center gap-4">
                  <Trophy className={`w-6 h-6 ${rankColors[index]}`} />
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.reviewCount} reviews</p>
                  </div>
                  <Badge variant="default" className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {user.avgRating.toFixed(1)}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="text-primary" /> Top Learners (This Month)
            </CardTitle>
            <CardDescription>Most sessions learned this month.</CardDescription>
          </CardHeader>
          <CardContent>
            {topMonthlyLearners.length > 0 ? (
                <LeaderboardList users={topMonthlyLearners} stat="monthlyLearnedSessions" statLabel="sessions" />
            ) : (
                <p className="text-center text-muted-foreground py-8">No monthly learners yet. Be the first!</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="text-primary" /> Top Learners (All Time)
            </CardTitle>
            <CardDescription>Most sessions learned.</CardDescription>
          </CardHeader>
          <CardContent>
             <LeaderboardList users={topLearners} stat="learnedSessions" statLabel="sessions" />
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

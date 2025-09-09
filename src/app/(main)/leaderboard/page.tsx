import { users, sessions, reviews } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Star, BookOpen, User, Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function LeaderboardPage() {
  const getLeaderboardData = () => {
    const userStats = users.map(user => {
      const taughtSessions = sessions.filter(s => s.teacherId === user.id && s.status === 'completed').length;
      const learnedSessions = sessions.filter(s => s.learnerId === user.id && s.status === 'completed').length;
      const userReviews = reviews.filter(r => r.revieweeId === user.id);
      const avgRating = userReviews.length > 0 ? userReviews.reduce((acc, r) => acc + r.stars, 0) / userReviews.length : 0;
      
      return {
        ...user,
        taughtSessions,
        learnedSessions,
        avgRating,
        reviewCount: userReviews.length
      };
    });

    const topTeachers = [...userStats].sort((a, b) => b.taughtSessions - a.taughtSessions).slice(0, 5);
    const topLearners = [...userStats].sort((a, b) => b.learnedSessions - a.learnedSessions).slice(0, 5);
    const topRated = [...userStats].filter(u => u.reviewCount > 0).sort((a, b) => b.avgRating - a.avgRating).slice(0, 5);

    return { topTeachers, topLearners, topRated };
  };

  const { topTeachers, topLearners, topRated } = getLeaderboardData();

  const rankColors = [
    'text-yellow-400',
    'text-gray-400',
    'text-yellow-600',
    'text-muted-foreground',
    'text-muted-foreground',
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Leaderboard</h2>
      </div>
      <p className="text-muted-foreground">
        See who's making the biggest impact in the community.
      </p>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="text-primary" /> Top Teachers
            </CardTitle>
            <CardDescription>Most sessions taught.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {topTeachers.map((user, index) => (
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
                  <Badge variant="secondary">{user.taughtSessions} sessions</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="text-primary" /> Top Learners
            </CardTitle>
            <CardDescription>Most sessions learned.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {topLearners.map((user, index) => (
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
                  <Badge variant="secondary">{user.learnedSessions} sessions</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="text-primary" /> Top Rated
            </CardTitle>
            <CardDescription>Highest average rating.</CardDescription>
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
      </div>
    </div>
  );
}

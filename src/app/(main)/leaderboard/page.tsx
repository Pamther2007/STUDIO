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
import { users, skills, sessions, reviews } from '@/lib/data';
import { Crown, Star, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function LeaderboardPage() {
  const topLearners = [...users].sort((a, b) => b.points - a.points).slice(0, 5);

  const getCompletedSessions = (userId: number) => {
    return sessions.filter(
      (s) => (s.learnerId === userId || s.teacherId === userId) && s.status === 'completed'
    ).length;
  };
  
  const getAverageRating = (userId: number) => {
    const userReviews = reviews.filter(r => r.revieweeId === userId);
    if (userReviews.length === 0) return 0;
    const totalStars = userReviews.reduce((acc, r) => acc + r.stars, 0);
    return (totalStars / userReviews.length);
  }

  const topRated = [...users].map(user => ({
    ...user,
    avgRating: getAverageRating(user.id),
    reviewCount: reviews.filter(r => r.revieweeId === user.id).length
  })).sort((a, b) => b.avgRating - a.avgRating).slice(0, 5);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Leaderboard</h2>
      </div>
      <p className="text-muted-foreground">
        See who is leading the SkillSwap community.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="text-primary" /> Top Learners
            </CardTitle>
            <CardDescription>
              Users who have earned the most points.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Rank</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topLearners.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">#{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                        {index === 0 && <Crown className="w-5 h-5 text-yellow-500" />}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-bold">{user.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="text-primary" /> Top Rated
            </CardTitle>
            <CardDescription>
              Users with the highest average review ratings.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow>
                   <TableHead>User</TableHead>
                  <TableHead className="text-right">Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topRated.filter(u => u.reviewCount > 0).map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                            <span className="font-bold">{user.avgRating.toFixed(1)}</span>
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-xs text-muted-foreground">({user.reviewCount})</span>
                        </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

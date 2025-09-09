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
import { getCurrentUser, users, sessions } from '@/lib/data';
import { Trophy, BarChart } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

export default function LeaderboardPage() {
  const currentUser = getCurrentUser();
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);
  
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  
  const completedSessionsThisMonth = sessions.filter(s => 
      (s.learnerId === currentUser.id || s.teacherId === currentUser.id) && 
      s.status === 'completed' &&
      isWithinInterval(new Date(s.date), { start: monthStart, end: monthEnd })
    ).length;
    
  const monthlyGoal = 6;
  const monthlyProgress = (completedSessionsThisMonth / monthlyGoal) * 100;


  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Leaderboard</h2>
      </div>
      <p className="text-muted-foreground">
        See how you stack up against other learners and teachers in the community.
      </p>

      <div className="grid gap-6 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="text-primary" /> Session Progress
            </CardTitle>
            <CardDescription>
              You completed {completedSessionsThisMonth} of {monthlyGoal} sessions this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
                <span className="font-bold text-lg text-primary">{Math.round(monthlyProgress)}%</span>
                <Progress value={monthlyProgress} className="h-4" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="text-primary" /> Monthly Ranking
            </CardTitle>
            <CardDescription>
              Top learners and teachers in the community based on points.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Rank</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedUsers.map((user, index) => (
                  <TableRow key={user.id} className={user.id === currentUser.id ? 'bg-secondary' : ''}>
                    <TableCell className="font-medium text-lg">{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-bold text-primary">{user.points}</TableCell>
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

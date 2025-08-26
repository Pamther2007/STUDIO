'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getCurrentUser, users, sessions, skills } from '@/lib/data';
import {
  Check,
  Clock,
  X,
  History,
  User,
  BookOpen,
  Calendar as CalendarIcon,
} from 'lucide-react';
import { format } from 'date-fns';
import { SkillIcon } from '@/components/skill-icon';

type SessionStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';

const statusConfig = {
  confirmed: { icon: Check, color: 'bg-green-500', text: 'Confirmed' },
  pending: { icon: Clock, color: 'bg-yellow-500', text: 'Pending' },
  completed: { icon: History, color: 'bg-blue-500', text: 'Completed' },
  cancelled: { icon: X, color: 'bg-red-500', text: 'Cancelled' },
};

function SessionCard({ session }: { session: (typeof sessions)[0] }) {
  const currentUser = getCurrentUser();
  const isTeaching = session.teacherId === currentUser.id;
  const partner = users.find(
    (u) => u.id === (isTeaching ? session.learnerId : session.teacherId)
  );
  const skill = skills.find((s) => s.id === session.skillId);

  if (!partner || !skill) return null;

  const StatusIcon = statusConfig[session.status].icon;

  return (
    <div className="p-4 border-b last:border-b-0 flex items-start gap-4">
      <Avatar className="h-12 w-12">
        <AvatarImage src={partner.avatar} alt={partner.name} />
        <AvatarFallback>{partner.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold">{partner.name}</p>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <SkillIcon skillId={skill.id} className="w-4 h-4" /> {skill.name}
            </p>
          </div>
          <Badge variant={isTeaching ? 'default' : 'secondary'}>
            {isTeaching ? 'Teaching' : 'Learning'}
          </Badge>
        </div>
        <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
          <span>{format(new Date(session.date), 'PPpp')}</span>
          <span className="flex items-center gap-2">
            <StatusIcon className={`w-4 h-4 text-white p-0.5 rounded-full ${statusConfig[session.status].color}`} />
            {statusConfig[session.status].text}
          </span>
        </div>
        {session.status === 'pending' && !isTeaching && (
          <div className="mt-2 flex gap-2">
            <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700">Accept</Button>
            <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700">Decline</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SessionsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const currentUser = getCurrentUser();

  const userSessions = sessions.filter(
    (s) => s.teacherId === currentUser.id || s.learnerId === currentUser.id
  );

  const upcomingSessions = userSessions
    .filter((s) => s.status === 'confirmed' && new Date(s.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const pendingSessions = userSessions.filter((s) => s.status === 'pending');
  const pastSessions = userSessions.filter((s) => ['completed', 'cancelled'].includes(s.status));

  const sessionDates = userSessions
    .filter(s => s.status === 'confirmed')
    .map(s => new Date(s.date));

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Your Sessions</h2>
      </div>
      <p className="text-muted-foreground">
        Manage your skill exchange bookings.
      </p>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="upcoming">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Sessions</CardTitle>
                  <CardDescription>Your confirmed appointments.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {upcomingSessions.length > 0 ? (
                    upcomingSessions.map((s) => <SessionCard key={s.id} session={s} />)
                  ) : (
                    <p className="p-6 text-center text-muted-foreground">No upcoming sessions.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="pending">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Requests</CardTitle>
                  <CardDescription>Sessions awaiting confirmation.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {pendingSessions.length > 0 ? (
                    pendingSessions.map((s) => <SessionCard key={s.id} session={s} />)
                  ) : (
                    <p className="p-6 text-center text-muted-foreground">No pending requests.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Session History</CardTitle>
                  <CardDescription>Your past exchanges.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {pastSessions.length > 0 ? (
                    pastSessions.map((s) => <SessionCard key={s.id} session={s} />)
                  ) : (
                    <p className="p-6 text-center text-muted-foreground">No past sessions.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>Confirmed sessions are marked.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
                modifiers={{ booked: sessionDates }}
                modifiersStyles={{ booked: {
                  color: 'hsl(var(--accent-foreground))',
                  backgroundColor: 'hsl(var(--accent))'
                } }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

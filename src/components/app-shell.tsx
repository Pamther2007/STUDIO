'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  Users,
  Calendar,
  MapPin,
  Bot,
  LogOut,
  Award,
  MessageSquare,
  Trophy,
  Mail,
} from 'lucide-react';
import Logo from './logo';
import { getCurrentUser } from '@/lib/data';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/matches', icon: Users, label: 'Matches' },
  { href: '/sessions', icon: Calendar, label: 'Sessions' },
  { href: '/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
  { href: '/map', icon: MapPin, label: 'Map' },
  { href: '/ai-matcher', icon: Bot, label: 'AI Matcher' },
  { href: '/contact-us', icon: Mail, label: 'Contact Us' },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentUser = getCurrentUser();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b border-sidebar-border">
          <div className="flex items-center gap-3 p-2">
            <Logo />
            <div className="flex flex-col">
              <h2 className="text-lg font-bold font-headline animate-text-color-change">Thunder Learner</h2>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
             <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/profile">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="truncate">{currentUser.name}</span>
                    </Link>
                </SidebarMenuButton>
             </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton disabled>
                    <Award />
                    <span>{currentUser.points} Points</span>
                </SidebarMenuButton>
             </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}

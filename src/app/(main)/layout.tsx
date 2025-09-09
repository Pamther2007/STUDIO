import { AppShell } from '@/components/app-shell';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell><div className="bg-background">{children}</div></AppShell>;
}

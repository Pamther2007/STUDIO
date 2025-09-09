import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-lg animate-bg-color-change',
        className
      )}
    >
      <span className="text-2xl animate-electric">⚡</span>
    </div>
  );
}

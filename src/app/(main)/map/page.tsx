import { Suspense } from 'react';
import { MapView } from './map-view';
import { Skeleton } from '@/components/ui/skeleton';

export default function MapPage() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Interactive Map</h2>
        <div className="flex items-center justify-center h-[60vh] bg-muted rounded-lg">
          <p className="text-destructive">Google Maps API key is missing. Please configure it in your environment variables.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 flex flex-col">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Nearby Skill Swappers</h2>
      </div>
      <p className="text-muted-foreground">
        Discover and connect with people in your area. Click on a marker to see details.
      </p>
      <div className="flex-grow mt-4 -mx-4 -mb-4 md:-mx-8 md:-mb-8">
        <Suspense fallback={<Skeleton className="w-full h-full" />}>
          <MapView apiKey={apiKey} />
        </Suspense>
      </div>
    </div>
  );
}

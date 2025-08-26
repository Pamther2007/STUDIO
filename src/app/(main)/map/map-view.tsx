'use client';

import { useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import { users, getCurrentUser, skills } from '@/lib/data';
import type { User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SkillIcon } from '@/components/skill-icon';

export function MapView({ apiKey }: { apiKey: string }) {
  const currentUser = getCurrentUser();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getSkillName = (skillId: string) => skills.find(s => s.id === skillId)?.name || 'Unknown Skill';

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={currentUser.location}
        defaultZoom={12}
        mapId="skillswap_map"
        className="w-full h-full rounded-lg"
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        {users.map((user) => (
          <AdvancedMarker
            key={user.id}
            position={user.location}
            onClick={() => setSelectedUser(user)}
          >
            <Pin
              background={user.id === currentUser.id ? 'hsl(var(--primary))' : 'hsl(var(--accent))'}
              borderColor={user.id === currentUser.id ? 'hsl(var(--primary))' : 'hsl(var(--accent))'}
              glyphColor={'#fff'}
            />
          </AdvancedMarker>
        ))}

        {selectedUser && (
          <InfoWindow
            position={selectedUser.location}
            onCloseClick={() => setSelectedUser(null)}
          >
            <div className="p-2 w-64 space-y-2">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                  <AvatarFallback>{selectedUser.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-base">{selectedUser.name}</h3>
                  <p className="text-xs text-muted-foreground">{selectedUser.location.name}</p>
                </div>
              </div>
               <div>
                  <h4 className="font-semibold text-xs mb-1">Offers:</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedUser.skillsOffered.map(skillId => (
                      <Badge key={skillId} variant="secondary" className="flex items-center gap-1">
                        <SkillIcon skillId={skillId} className="h-3 w-3" />
                        {getSkillName(skillId)}
                      </Badge>
                    ))}
                  </div>
                </div>
                 <div>
                  <h4 className="font-semibold text-xs mb-1">Wants:</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedUser.skillsWanted.map(skillId => (
                      <Badge key={skillId} variant="outline" className="flex items-center gap-1">
                        <SkillIcon skillId={skillId} className="h-3 w-3" />
                        {getSkillName(skillId)}
                      </Badge>
                    ))}
                  </div>
                </div>
              <Button size="sm" className="w-full mt-2">Request Session</Button>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}

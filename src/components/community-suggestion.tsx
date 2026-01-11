'use client';

import { useState, useEffect } from 'react';
import { Community, User } from '@/lib/types';
import { getCommunityByEventId, joinCommunity } from '@/lib/communities';
import { Button } from '@/components/ui/button';
import { Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CommunitySuggestionProps {
  eventId: string;
  currentUser: User;
}

export default function CommunitySuggestion({ eventId, currentUser }: CommunitySuggestionProps) {
  const [community, setCommunity] = useState<Community | null>(null);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    const foundCommunity = getCommunityByEventId(eventId);
    if (foundCommunity) {
      setCommunity(foundCommunity);
      setIsMember(foundCommunity.members.includes(currentUser.id));
    } else {
      setCommunity(null);
    }
  }, [eventId, currentUser.id]);

  const handleJoin = () => {
    if (community) {
      // joinCommunity updates localStorage and returns the new list of communities
      const updatedCommunities = joinCommunity(community.id, currentUser.id);
      const newCommunityState = updatedCommunities.find(c => c.id === community.id);

      if (newCommunityState) {
        // Update the component's state directly with the fresh data, avoiding the race condition
        setCommunity(newCommunityState);
        setIsMember(true);
      }
    }
  };

  if (!community) {
    return null; // Don't show anything if no community is linked
  }

  return (
    <div className="rounded-lg border border-dashed border-border bg-muted/50 p-4 mt-6">
        <h3 className="font-bold text-lg mb-2">Community zum Event</h3>
        <div className="flex items-start gap-4">
            <img src={community.imageUrl} alt={community.name} className="w-16 h-16 rounded-lg object-cover"/>
            <div className="flex-1">
                <p className="font-semibold">{community.name}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{community.description}</p>
                <div className="flex items-center text-sm text-muted-foreground mt-2">
                    <Users className="h-4 w-4 mr-1.5" />
                    {community.members.length} Mitglieder
                </div>
            </div>
        </div>
        <div className="mt-4">
            {isMember ? (
                <Button asChild className="w-full" variant="outline">
                  <Link href={`/communities/${community.id}`}>
                    Zum Chat
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
            ) : (
                <Button className="w-full" onClick={handleJoin}>
                    Community beitreten
                </Button>
            )}
        </div>
    </div>
  );
}

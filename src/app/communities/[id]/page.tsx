'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCommunityById, updateCommunity } from '@/lib/communities';
import { getEventById } from '@/lib/events';
import { getUsersByIds, User } from '@/lib/users';
import type { Community, Event } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react';
import Chat from '@/components/chat';
import MemberList from '@/components/member-list';

export default function CommunityPage() {
  const params = useParams();
  const router = useRouter();
  const [community, setCommunity] = useState<Community | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [members, setMembers] = useState<User[]>([]);

  const currentUser = {
    id: 'user-ronny',
    name: 'Ronny Müller',
    avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop',
  } as User;

  useEffect(() => {
    if (params && params.id) {
      const foundCommunity = getCommunityById(params.id as string);
      if (foundCommunity) {
        setCommunity(foundCommunity);
        const relatedEvent = getEventById(foundCommunity.eventId);
        setEvent(relatedEvent || null);
        const communityMembers = getUsersByIds(foundCommunity.members);
        setMembers(communityMembers);
      } else {
        setCommunity(null);
      }
    }
  }, [params]);

  const handleToggleMembership = () => {
    if (!community) return;

    const isMember = community.members.includes(currentUser.id);
    let updatedMembers;

    if (isMember) {
      updatedMembers = community.members.filter((memberId) => memberId !== currentUser.id);
    } else {
      updatedMembers = [...community.members, currentUser.id];
    }

    const updatedCommunityData = { ...community, members: updatedMembers };
    updateCommunity(updatedCommunityData);
    setCommunity(updatedCommunityData);

    const updatedMemberDetails = getUsersByIds(updatedMembers);
    setMembers(updatedMemberDetails);
  };

  if (!community) {
    return <div className="text-center text-muted-foreground mt-8">Community wird geladen oder wurde nicht gefunden...</div>;
  }

  const isMember = community.members.includes(currentUser.id);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Card className="overflow-hidden h-[80vh] flex flex-col">
                     <div className="relative h-48 w-full">
                        <Image
                        src={community.imageUrl}
                        alt={community.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <CardHeader className="border-b">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-3xl font-headline">{community.name}</CardTitle>
                                <p className="text-muted-foreground mt-1">{community.description}</p>
                            </div>
                            <Button onClick={handleToggleMembership} className="ml-4 flex-shrink-0">
                                {isMember ? 'Austreten' : 'Community beitreten'}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow">
                         <Chat community={community} currentUser={currentUser} />
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-8">
                {event && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Zugehöriges Event</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className="relative h-40 w-full overflow-hidden rounded-md mb-4">
                                <Image
                                    src={event.imageUrl}
                                    alt={event.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <h3 className="font-bold text-lg">{event.title}</h3>
                            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(event.date).toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                             <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                            </div>
                            <Button asChild className="mt-4 w-full">
                                <Link href={`/events/${event.id}`}>Event-Details</Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Mitglieder ({members.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <MemberList members={members} organizerId={community.organizerId} currentUser={currentUser} />
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}

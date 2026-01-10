'use client';

import { useState, useEffect } from 'react';
import { Community, User } from '@/lib/types';
import { getCommunities } from '@/lib/communities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MyCommunitiesPage() {
  const [joinedCommunities, setJoinedCommunities] = useState<Community[]>([]);
  const router = useRouter();

  // Mock current user
  const currentUser = {
    id: 'user-ronny',
    name: 'Ronny Müller',
    avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop',
  } as User;

  useEffect(() => {
    const allCommunities = getCommunities();
    const joined = allCommunities.filter(community => community.members.includes(currentUser.id));
    setJoinedCommunities(joined);
  }, [currentUser.id]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Zurück
      </Button>
      <h1 className="text-4xl font-headline mb-8">Meine Communities</h1>

      {joinedCommunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {joinedCommunities.map((community) => (
            <Card key={community.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <Link href={`/communities/${community.id}`} className="block">
                <div className="relative h-48 w-full">
                  <Image
                    src={community.imageUrl}
                    alt={community.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-headline">{community.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-2">{community.description}</p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-dashed border-2 rounded-lg">
            <p className="text-muted-foreground mb-4">Du bist noch keiner Community beigetreten.</p>
            <Button asChild>
                <Link href="/events">Finde coole Events und tritt Communities bei</Link>
            </Button>
        </div>
      )}
    </div>
  );
}

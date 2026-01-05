'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getCommunityById } from '@/lib/communities';
import { Community } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Chat from '@/components/chat';

export default function CommunityPage() {
  const params = useParams();
  const [community, setCommunity] = useState<Community | null>(null);

  // This is a mock user. Replace with your actual user from auth.
  const currentUser = {
    id: 'user-1',
    name: 'Alice',
    avatarUrl: 'https://github.com/shadcn.png'
  }

  useEffect(() => {
    if (params.id) {
      const foundCommunity = getCommunityById(params.id as string);
      setCommunity(foundCommunity || null);
    }
  }, [params.id]);

  if (!community) {
    return <div className="text-center text-muted-foreground mt-8">Community nicht gefunden.</div>;
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
        <Card className="overflow-hidden">
          <div className="relative h-64 w-full">
            <Image
              src={community.imageUrl}
              alt={community.name}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <CardHeader className='border-b'>
            <CardTitle className="text-4xl font-headline">{community.name}</CardTitle>
            <p className="text-muted-foreground">{community.description}</p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[60vh]">
                <Chat communityId={community.id} currentUser={currentUser} />
            </div>
          </CardContent>
        </Card>
    </div>
  );
}

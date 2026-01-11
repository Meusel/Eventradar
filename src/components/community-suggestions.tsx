'use client';

import type { Community } from "@/lib/types";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from 'next/link';
import Image from 'next/image';

interface CommunitySuggestionsProps {
  communities: Community[];
  onJoin: (communityId: string) => void;
}

export default function CommunitySuggestions({ communities, onJoin }: CommunitySuggestionsProps) {

  const handleJoin = (communityId: string) => {
    onJoin(communityId);
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold font-headline tracking-tight md:text-3xl mb-4">Vorgeschlagene Communities</h2>
      {communities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community) => (
            <Card key={community.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col justify-between">
              <Link href={`/communities/${community.id}`}>
                <div className="relative h-40 w-full">
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
              <div className="p-6 pt-0">
                <form action={() => handleJoin(community.id)} className="mt-4">
                  <Button className="w-full">Beitreten</Button>
                </form>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-dashed border-2 rounded-lg">
          <p className="text-muted-foreground">Aktuell gibt es keine neuen Vorschläge für dich.</p>
        </div>
      )}
    </div>
  );
}

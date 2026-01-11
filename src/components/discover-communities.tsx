
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Community } from "@/lib/types";
import { searchCommunities } from '@/lib/communities';
import { useDebounce } from 'use-debounce';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function DiscoverCommunities({ onJoin }: { onJoin: (communityId: string) => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Community[]>([]);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchCommunities(debouncedSearchTerm).then(setSearchResults);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  function handleJoinCommunity(communityId: string) {
    onJoin(communityId);
    setSearchResults(searchResults.filter(c => c.id !== communityId));
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold font-headline tracking-tight md:text-3xl mb-4">Communities entdecken</h2>
      <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
        <Input
          type="text"
          placeholder="Suche nach Communities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((community) => (
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
                    <CardContent className="flex-grow">
                        <p className="text-muted-foreground line-clamp-2">{community.description}</p>
                    </CardContent>
                </Link>
                <div className="p-6 pt-0">
                    <form action={() => { handleJoinCommunity(community.id) }} className="mt-4">
                        <Button className="w-full">Beitreten</Button>
                    </form>
                </div>
             </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-dashed border-2 rounded-lg">
          <p className="text-muted-foreground">Tippe etwas in die Suche ein, um Communities zu finden.</p>
        </div>
      )}
    </div>
  );
}

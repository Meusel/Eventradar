'use client';

import { useState, useEffect } from 'react';
import { User, Community } from '@/lib/types';
import { getCurrentUser } from '@/lib/users';
import { getCommunitiesByUserId, getSuggestedCommunities, joinCommunity } from '@/lib/communities';
import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

export default function ChatsPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [myCommunities, setMyCommunities] = useState<Community[]>([]);
  const [suggestedCommunities, setSuggestedCommunities] = useState<Community[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setMyCommunities(getCommunitiesByUserId(user.id));
      setSuggestedCommunities(getSuggestedCommunities(user.id));
    }
  }, []);

  const handleJoin = (communityId: string, userId: string) => {
    joinCommunity(communityId, userId);
    // Refresh community lists after joining
    if (currentUser) {
        setMyCommunities(getCommunitiesByUserId(currentUser.id));
        setSuggestedCommunities(getSuggestedCommunities(currentUser.id));
    }
  };

  const filteredSuggested = suggestedCommunities.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!currentUser) {
    return <div>Lade aktuelle Nutzerdaten...</div>; // Or a proper loader
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Meine Communities</h1>
      
      {myCommunities.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {myCommunities.map(community => (
            <Link href={`/communities/${community.id}`} key={community.id}>
              <Card className="h-full hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <img src={community.imageUrl} alt={community.name} className="w-12 h-12 rounded-lg object-cover"/>
                    <div>
                      <CardTitle className="text-base font-bold">{community.name}</CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-2">{community.description}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground mb-8">Du bist noch keiner Community beigetreten.</p>
      )}

      <h2 className="text-xl font-bold mb-4">Vorschläge für dich</h2>
      <div className="mb-4">
        <Input 
          type="text" 
          placeholder="Communities durchsuchen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      {filteredSuggested.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredSuggested.map(community => (
            <Card key={community.id}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <img src={community.imageUrl} alt={community.name} className="w-12 h-12 rounded-lg object-cover"/>
                  <div>
                    <CardTitle className="text-base font-bold">{community.name}</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">{community.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardFooter>
                <Button className="w-full" onClick={() => handleJoin(community.id, currentUser.id)}>
                  Beitreten
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">Keine weiteren Vorschläge gefunden.</p>
      )}
    </div>
  );
}
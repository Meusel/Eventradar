'use client';
import { Suspense, useState, useEffect } from "react";
import dynamic from 'next/dynamic'; // Import dynamic
import Header from "@/components/header";
import EventFeed from "@/components/event-feed";
import AiRecommendations from "@/components/ai-recommendations";
import { getEvents } from "@/lib/events";
import type { Event, User } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import PriorityLegend from "@/components/priority-legend";
import { getCommunities, joinCommunity } from "@/lib/communities";
import type { Community } from "@/lib/types";
import { getCommunitySuggestions } from "@/lib/community-suggestions";
import CommunitySuggestions from "@/components/community-suggestions";
import CommunityFeed from "@/components/community-feed";
import BottomNav from "@/components/bottom-nav";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import PrivateChatList from "@/components/private-chat-list";

// Dynamically import CookieConsent
const CookieConsent = dynamic(() => import("@/components/cookie-consent"), { ssr: false });


export default function HomePage() {
  return (
    <Suspense fallback={<div className="text-center text-muted-foreground mt-8">Lädt...</div>}>
      <App />
      <CookieConsent />
    </Suspense>
  )
}

function MyCommunities({ communities }: { communities: Community[] }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold font-headline tracking-tight md:text-3xl mb-4">Meine Communities</h2>
      {communities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community) => (
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
            <Link href="/">Finde coole Events und tritt Communities bei</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

function App() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [allCommunities, setAllCommunities] = useState<Community[]>([]);
  const [joinedCommunities, setJoinedCommunities] = useState<Community[]>([]);
  const [suggestedCommunities, setSuggestedCommunities] = useState<Community[]>([]);
  const [notJoinedCommunities, setNotJoinedCommunities] = useState<Community[]>([]);
  const [privateChats, setPrivateChats] = useState<{ user: User; lastMessage: string }[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("Alle");
  const [chatTab, setChatTab] = useState<'communities' | 'private'>('communities');

  // Mock current user. In a real app, this would come from your auth solution.
  const currentUser = {
    id: 'user-ronny',
    name: 'Ronny Müller',
    avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop',
    profileStatus: 'public',
  } as User;

  // Fetch data on component mount
  useEffect(() => {
    const events = getEvents();
    const communities = getCommunities();
    const suggestions = getCommunitySuggestions(currentUser.id);
    const joined = communities.filter(community => community.members.includes(currentUser.id));
    const notJoined = communities.filter(community => !community.members.includes(currentUser.id));
    
    setAllEvents(events);
    setAllCommunities(communities);
    setJoinedCommunities(joined);
    setSuggestedCommunities(suggestions.filter(c => !joined.some(jc => jc.id === c.id)));
    setNotJoinedCommunities(notJoined);

    // Mock private chats
    setPrivateChats([
      { user: { id: 'user-jane', name: 'Jane Doe', avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg', profileStatus: 'public' }, lastMessage: 'Hey, wie gehts?' },
      { user: { id: 'user-john', name: 'John Smith', avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg', profileStatus: 'public' }, lastMessage: 'Klar, lass uns das machen!' },
    ]);
    
    const uniqueCategories = [
      "Alle",
      ...new Set(events.map((event) => event.category)),
    ];
    setCategories(uniqueCategories);
  }, [currentUser.id]);

  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const activeView = searchParams?.get('view') || 'home';

  const handleJoinCommunity = (communityId: string) => {
    const updatedCommunities = joinCommunity(communityId, currentUser.id);
    const joined = updatedCommunities.filter(community => community.members.includes(currentUser.id));
    const notJoined = updatedCommunities.filter(community => !community.members.includes(currentUser.id));
    
    setAllCommunities(updatedCommunities);
    setJoinedCommunities(joined);
    setNotJoinedCommunities(notJoined);
    setSuggestedCommunities(suggestedCommunities.filter(c => c.id !== communityId));
  };

  const filteredEvents = allEvents
    .filter((event) => {
      if (activeCategory === "Alle") return true;
      return event.category === activeCategory;
    })
    .filter((event) => {
      if (!searchTerm) return true;
      const lowercasedTerm = searchTerm.toLowerCase();
      return (
        event.title.toLowerCase().includes(lowercasedTerm) ||
        event.description.toLowerCase().includes(lowercasedTerm)
      );
    });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const renderContent = () => {
    switch (activeView) {
      case "home":
        return (
          <>
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h1 className="text-3xl font-bold font-headline tracking-tight md:text-4xl">
                Anstehende Events in <span className="text-primary">Halle</span>
              </h1>
              <PriorityLegend />
            </div>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Suche nach Events..."
                className="w-full rounded-full bg-muted pl-10 pr-4 py-6 text-lg"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <CommunitySuggestions 
              communities={suggestedCommunities}
              title="Community-Vorschläge" 
              onJoin={handleJoinCommunity} 
            />
            <EventFeed
              events={filteredEvents}
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </>
        );
      case "search":
        return (
          <>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Suche nach Events..."
                className="w-full rounded-full bg-muted pl-10 pr-4 py-6 text-lg"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                autoFocus
              />
            </div>
            {searchTerm ? (
              <EventFeed
                events={filteredEvents}
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />
            ) : (
              <div className="text-center text-muted-foreground mt-8">
                Beginne zu tippen, um nach Events zu suchen.
              </div>
            )}
          </>
        );
      case "chat":
        return (
          <div>
            <h1 className="text-3xl font-bold font-headline tracking-tight md:text-4xl mb-6">
              Communities & Chats
            </h1>
            <ToggleGroup 
              type="single" 
              defaultValue="communities" 
              className="mb-6 w-full md:w-auto grid grid-cols-2"
              onValueChange={(value: 'communities' | 'private') => value && setChatTab(value)}
            >
              <ToggleGroupItem value="communities" className="w-full">Communities</ToggleGroupItem>
              <ToggleGroupItem value="private" className="w-full">Private Chats</ToggleGroupItem>
            </ToggleGroup>

            {chatTab === 'communities' ? (
              <>
                <MyCommunities communities={joinedCommunities} />
                <CommunityFeed 
                  communities={notJoinedCommunities.filter(c => !suggestedCommunities.some(sc => sc.id === c.id))}
                  title="Weitere Communities entdecken"
                  onJoin={handleJoinCommunity}
                />
              </>
            ) : (
              <PrivateChatList chats={privateChats} />
            )}
          </div>
        );
      case "recommendations":
        return (
          <div className="w-full">
            <AiRecommendations />
          </div>
        );
      default:
        return (
          <EventFeed
            events={filteredEvents}
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 bg-background pb-24">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          {renderContent()}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

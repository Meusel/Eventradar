'use client';
import { Suspense, useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';

import Header from "@/components/header";
import EventFeed from "@/components/event-feed";
import { getEvents } from "@/lib/events";
import { getCommunities, joinCommunity } from "@/lib/communities";
import { getCommunitySuggestions } from "@/lib/community-suggestions";
import type { Event, User, Community } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Compass, Home as HomeIcon, MessageSquare, Search, Sparkles, Calendar, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import PriorityLegend from "@/components/priority-legend";
import CommunitySuggestions from "@/components/community-suggestions";
import CommunityFeed from "@/components/community-feed";
import PrivateChatList from "@/components/private-chat-list";
import CalendarPage from "./calendar/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Dynamically import EventMap with SSR disabled
const EventMap = dynamic(() => import("@/components/event-map"), { 
  ssr: false, 
  loading: () => <div className="text-center text-muted-foreground mt-8">Karte wird geladen...</div>
});

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
            <Link href="/?view=chat">Finde coole Events und tritt Communities bei</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

function App() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeView = searchParams?.get('view') || 'home';
  
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [allCommunities, setAllCommunities] = useState<Community[]>([]);
  const [joinedCommunities, setJoinedCommunities] = useState<Community[]>([]);
  const [suggestedCommunities, setSuggestedCommunities] = useState<Community[]>([]);
  const [notJoinedCommunities, setNotJoinedCommunities] = useState<Community[]>([]);
  const [privateChats, setPrivateChats] = useState<{ user: User; lastMessage: string }[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("Alle");
  const [searchTerm, setSearchTerm] = useState("");
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

  const eventsToday = allEvents.filter(event => event.date === '2026-01-27');

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
      case "heute-in-halle":
        return (
          <>
            <div className="flex items-center gap-3 mb-6">
                <h1 className="text-4xl font-bold font-headline tracking-tighter">Heute in Halle</h1>
                <Flame className="w-8 h-8 text-primary" />
            </div>
            <EventFeed
              events={eventsToday}
              categories={[]}
              activeCategory="Alle"
              onCategoryChange={() => {}} />
          </>
        );
      case "calendar":
        return <CalendarPage />;
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
      case "discover":
        return (
          <>
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h1 className="text-3xl font-bold font-headline tracking-tight md:text-4xl">
                Event-Karte von <span className="text-primary">Halle</span>
              </h1>
            </div>
            <EventMap events={filteredEvents} categories={categories} onFilterChange={handleCategoryChange} activeCategory={activeCategory} />
          </>
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

  const handleNavClick = (view: string) => {
    // Navigate using router, keeping other query params if necessary
    const params = new URLSearchParams(searchParams?.toString());
    params.set('view', view);
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 bg-background pb-24">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          {renderContent()}
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto flex h-16 max-w-7xl items-center justify-around px-4">
          <Button
            variant="ghost"
            onClick={() => handleNavClick("home")}
            className={`flex flex-col h-full justify-center gap-1 ${
              activeView === "home" ? "text-primary" : ""
            }`}
          >
            <HomeIcon className="h-6 w-6" />
            <span className="text-xs">Home</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleNavClick("heute-in-halle")}
            className={`flex flex-col h-full justify-center gap-1 ${
              activeView === "heute-in-halle" ? "text-primary" : ""
            }`}
          >
            <Calendar className="h-6 w-6" />
            <span className="text-xs">Heute</span>
          </Button>
           <Button
            variant="ghost"
            onClick={() => handleNavClick("calendar")}
            className={`flex flex-col h-full justify-center gap-1 ${
              activeView === "calendar" ? "text-primary" : ""
            }`}
          >
            <Calendar className="h-6 w-6" />
            <span className="text-xs">Kalender</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleNavClick("chat")}
            className={`flex flex-col h-full justify-center gap-1 ${
              activeView === "chat" ? "text-primary" : ""
            }`}
          >
            <MessageSquare className="h-6 w-6" />
            <span className="text-xs">Chat</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleNavClick("discover")}
            className={`flex flex-col h-full justify-center gap-1 ${
              activeView === "discover" ? "text-primary" : ""
            }`}
          >
            <Compass className="h-6 w-6" />
            <span className="text-xs">Entdecken</span>
          </Button>
        </nav>
      </footer>
    </div>
  );
}

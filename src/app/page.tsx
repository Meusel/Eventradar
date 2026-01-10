'use client';
import { Suspense, useState, useEffect } from "react";
import dynamic from 'next/dynamic'; // Import dynamic
import Header from "@/components/header";
import EventFeed from "@/components/event-feed";
import AiRecommendations from "@/components/ai-recommendations";
import { getEvents } from "@/lib/events";
import type { Event } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import PriorityLegend from "@/components/priority-legend";
import CommunityFeed from "@/components/community-feed";
import { getCommunities } from "@/lib/communities";
import type { Community } from "@/lib/types";
import { getCommunitySuggestions } from "@/lib/community-suggestions";
import CommunitySuggestions from "@/components/community-suggestions";
import BottomNav from "@/components/bottom-nav";
import { useSearchParams } from "next/navigation";

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


function App() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [suggestedCommunities, setSuggestedCommunities] = useState<Community[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("Alle");

  // Mock current user. In a real app, this would come from your auth solution.
  const currentUserId = 'user-1';

  // Fetch events on component mount
  useEffect(() => {
    const events = getEvents();
    const communities = getCommunities();
    const suggestions = getCommunitySuggestions(currentUserId);
    setAllEvents(events);
    setCommunities(communities);
    setSuggestedCommunities(suggestions);
    const uniqueCategories = [
      "Alle",
      ...new Set(events.map((event) => event.category)),
    ];
    setCategories(uniqueCategories);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const activeView = searchParams?.get('view') || 'home';

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
            <CommunitySuggestions communities={suggestedCommunities} title="Community-Vorschläge" />
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
            <CommunitySuggestions communities={suggestedCommunities} title="Community-Vorschläge" />
            <CommunityFeed communities={communities} />
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

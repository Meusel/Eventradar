"use client";
import { Suspense } from "react";
import { useState } from "react";
import Header from "@/components/header";
import EventFeed from "@/components/event-feed";
import AiRecommendations from "@/components/ai-recommendations";
import { getEvents } from "@/lib/events";
import type { Event } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Compass, Home as HomeIcon, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import PriorityLegend from "@/components/priority-legend";

export default function HomePage() {
  const allEvents = getEvents();
  const categories = ["Alle", ...new Set(allEvents.map((event) => event.category))];
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(allEvents);
  const [activeView, setActiveView] = useState("home");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term) {
      setFilteredEvents(allEvents);
    } else {
      const lowercasedTerm = term.toLowerCase();
      const newFilteredEvents = allEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(lowercasedTerm) ||
          event.description.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredEvents(newFilteredEvents);
    }
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
            </div>
             <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Suche nach Events..."
                  className="w-full rounded-full bg-muted pl-10 pr-4 py-6 text-lg"
                  value={searchTerm}
                  onFocus={() => setActiveView('search')}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            <PriorityLegend />
            <EventFeed events={filteredEvents} categories={categories} />
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
              {searchTerm ? ( <><PriorityLegend /><EventFeed events={filteredEvents} categories={categories} /></> ) : <div className="text-center text-muted-foreground mt-8">Beginne zu tippen, um nach Events zu suchen.</div>}
            </>
        );
      case "recommendations":
        return (
          <div className="w-full">
            <AiRecommendations />
          </div>
        );
      case "discover":
         return <div className="text-center text-muted-foreground mt-8">Entdecken-Funktion kommt bald!</div>;
      default:
        return <EventFeed events={filteredEvents} categories={categories} />;
    }
  };

  return (
    <>
      <Header />
      <main className="container py-8 pb-24 md:pb-8">
        <Suspense fallback={<div className="text-center text-muted-foreground mt-8">Wird geladen...</div>}>
          {renderContent()}
        </Suspense>
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t p-2 md:hidden z-10">
        <div className="container mx-auto flex justify-around">
          <Button variant={activeView === 'home' ? 'secondary' : 'ghost'} size="sm" className="flex flex-col h-auto gap-1 p-2" onClick={() => setActiveView('home')}>
            <HomeIcon className="h-5 w-5" />
            <span className="text-xs font-semibold">Home</span>
          </Button>
          <Button variant={activeView === 'discover' ? 'secondary' : 'ghost'} size="sm" className="flex flex-col h-auto gap-1 p-2" onClick={() => setActiveView('discover')}>
            <Compass className="h-5 w-5" />
            <span className="text-xs font-semibold">Entdecken</span>
          </Button>
          <Button variant={activeView === 'search' ? 'secondary' : 'ghost'} size="sm" className="flex flex-col h-auto gap-1 p-2" onClick={() => setActiveView('search')}>
            <Search className="h-5 w-5" />
            <span className="text-xs font-semibold">Suchen</span>
          </Button>
          <Button variant={activeView === 'recommendations' ? 'secondary' : 'ghost'} size="sm" className="flex flex-col h-auto gap-1 p-2" onClick={() => setActiveView('recommendations')}>
            <Sparkles className="h-5 w-5" />
            <span className="text-xs font-semibold">Für dich</span>
          </Button>
        </div>
      </nav>
    </>
  );
}
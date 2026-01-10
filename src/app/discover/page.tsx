'use client';
import { Suspense, useState, useEffect } from "react";
import dynamic from 'next/dynamic'; // Import dynamic
import Header from "@/components/header";
import { getEvents } from "@/lib/events";
import type { Event } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import BottomNav from "@/components/bottom-nav";

// Dynamically import EventMap with SSR disabled
const EventMap = dynamic(() => import("@/components/event-map"), { 
  ssr: false, 
  loading: () => <div className="text-center text-muted-foreground mt-8">Karte wird geladen...</div>
});

export default function DiscoverPage() {
  return (
    <Suspense fallback={<div className="text-center text-muted-foreground mt-8">Lädt...</div>}>
      <App />
    </Suspense>
  )
}

function App() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("Alle");

  // Fetch events on component mount
  useEffect(() => {
    const events = getEvents();
    setAllEvents(events);
    const uniqueCategories = [
      "Alle",
      ...new Set(events.map((event) => event.category)),
    ];
    setCategories(uniqueCategories);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 bg-background pb-24">
        <div className="container mx-auto max-w-7xl px-4 py-8">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h1 className="text-3xl font-bold font-headline tracking-tight md:text-4xl">
                Event-Karte von <span className="text-primary">Halle</span>
              </h1>
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
            <EventMap events={filteredEvents} categories={categories} onFilterChange={handleCategoryChange} />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

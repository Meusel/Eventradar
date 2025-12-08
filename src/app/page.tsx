"use client";

import { useState } from "react";
import Header from "@/components/header";
import EventFeed from "@/components/event-feed";
import AiRecommendations from "@/components/ai-recommendations";
import { getEvents } from "@/lib/events";
import type { Event } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Search, Sparkles } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Home() {
  const allEvents = getEvents();
  const categories = ["All", ...new Set(allEvents.map((event) => event.category))];
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(allEvents);

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

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-3xl font-bold font-headline tracking-tight md:text-4xl">
              Upcoming Events in <span className="text-primary">Halle</span>
            </h1>
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Sparkles className="mr-2 h-4 w-4" />
                    AI Recommendations
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom">
                  <SheetHeader>
                    <SheetTitle>AI Recommendations</SheetTitle>
                  </SheetHeader>
                  <div className="p-4">
                    <AiRecommendations />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for events..."
              className="w-full rounded-full bg-muted pl-10 pr-4 py-6 text-lg"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
            <div className="lg:col-span-3">
              <EventFeed events={filteredEvents} categories={categories} />
            </div>
            <aside className="hidden w-full lg:block">
              <AiRecommendations />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

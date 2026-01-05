"use client";

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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function HomePage() {
  const allEvents = getEvents();
  const categories = ["Alle", ...new Set(allEvents.map((event) => event.category))];
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(allEvents);
  const [activeView, setActiveView] = useState("home");
  const [studentDiscountFilter, setStudentDiscountFilter] = useState(false);

  const handleFilterChange = (term: string, studentDiscount: boolean) => {
    setSearchTerm(term);
    setStudentDiscountFilter(studentDiscount);

    let newFilteredEvents = allEvents;

    if (studentDiscount) {
      newFilteredEvents = newFilteredEvents.filter(event => event.studentDiscount);
    }

    if (term) {
      const lowercasedTerm = term.toLowerCase();
      newFilteredEvents = newFilteredEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(lowercasedTerm) ||
          event.description.toLowerCase().includes(lowercasedTerm)
      );
    }
    
    setFilteredEvents(newFilteredEvents);
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
                  onChange={(e) => handleFilterChange(e.target.value, studentDiscountFilter)}
                />
              </div>
              <div className="flex items-center space-x-2 mb-6">
                <Checkbox id="student-discount" checked={studentDiscountFilter} onCheckedChange={(checked) => handleFilterChange(searchTerm, checked as boolean)} />
                <Label htmlFor="student-discount" className="text-lg">Studentenrabatt</Label>
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
                  onChange={(e) => handleFilterChange(e.target.value, studentDiscountFilter)}
                  autoFocus
                />
              </div>
              <div className="flex items-center space-x-2 mb-6">
                <Checkbox id="student-discount" checked={studentDiscountFilter} onCheckedChange={(checked) => handleFilterChange(searchTerm, checked as boolean)} />
                <Label htmlFor="student-discount" className="text-lg">Studentenrabatt</Label>
              </div>
              {searchTerm || studentDiscountFilter ? ( <><PriorityLegend /><EventFeed events={filteredEvents} categories={categories} /></> ) : <div className="text-center text-muted-foreground mt-8">Beginne zu tippen oder wähle einen Filter, um nach Events zu suchen.</div>}
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
            <Button variant="ghost" onClick={() => setActiveView('home')} className={`flex flex-col h-full justify-center gap-1 ${activeView === 'home' ? 'text-primary' : ''}`}>
                <HomeIcon className="h-6 w-6"/>
                <span className="text-xs">Home</span>
            </Button>
            <Button variant="ghost" onClick={() => setActiveView('search')} className={`flex flex-col h-full justify-center gap-1 ${activeView === 'search' ? 'text-primary' : ''}`}>
                <Search className="h-6 w-6"/>
                <span className="text-xs">Suche</span>
            </Button>
            <Button variant="ghost" onClick={() => setActiveView('recommendations')} className={`flex flex-col h-full justify-center gap-1 ${activeView === 'recommendations' ? 'text-primary' : ''}`}>
                <Sparkles className="h-6 w-6"/>
                <span className="text-xs">Für Dich</span>
            </Button>
            <Button variant="ghost" onClick={() => setActiveView('discover')} className={`flex flex-col h-full justify-center gap-1 ${activeView === 'discover' ? 'text-primary' : ''}`}>
                <Compass className="h-6 w-6"/>
                <span className="text-xs">Entdecken</span>
            </Button>
        </nav>
      </footer>
    </div>
  );
}

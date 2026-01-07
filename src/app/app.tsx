'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/header';
import EventFeed from '@/components/event-feed';
import AiRecommendations from '@/components/ai-recommendations';
import CalendarPage from './calendar/page';
import { getEvents } from '@/lib/events';
import type { Event } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Calendar, Compass, Home as HomeIcon, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';

const EventMap = dynamic(() => import('@/components/event-map'), {
  ssr: false,
});

export default function App() {
  // Use state for events and categories to make them dynamic
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');
  
  // Fetch events on component mount and set up a polling mechanism
  useEffect(() => {
    const fetchEvents = () => {
      const events = getEvents();
      setAllEvents(events);
      const uniqueCategories = ['Alle', ...new Set(events.map((event) => event.category))];
      setCategories(uniqueCategories);
    };

    fetchEvents(); // Initial fetch
    const interval = setInterval(fetchEvents, 5000); // Poll every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [activeView, setActiveView] = useState('home');

  useEffect(() => {
    if(eventId) {
        setActiveView('discover');
    }
  }, [eventId]);

  // Update filteredEvents whenever allEvents changes
  useEffect(() => {
    setFilteredEvents(allEvents);
  }, [allEvents]);

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
  
  const handleFilterChange = (category: string) => {
    if (category === 'Alle') {
      setFilteredEvents(allEvents);
    } else {
      const newFilteredEvents = allEvents.filter(
        (event) => event.category === category
      );
      setFilteredEvents(newFilteredEvents);
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case 'home':
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
            <EventFeed events={filteredEvents} categories={categories} onFilterChange={handleFilterChange}/>
          </>
        );
      case 'search':
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
              {searchTerm ? <EventFeed events={filteredEvents} categories={categories} onFilterChange={handleFilterChange} /> : <div className="text-center text-muted-foreground mt-8">Beginne zu tippen, um nach Events zu suchen.</div>}
            </>
        );
      case 'calendar':
        return <CalendarPage />;
      case 'recommendations':
        return (
          <div className="w-full">
            <AiRecommendations />
          </div>
        );
      case 'discover':
         return (
          <>
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h1 className="text-3xl font-bold font-headline tracking-tight md:text-4xl">
                Event-Karte von <span className="text-primary">Halle</span>
              </h1>
            </div>
            {/* The grid layout is removed, EventMap now takes the full width */}
            <EventMap events={filteredEvents} categories={categories} onFilterChange={handleFilterChange} selectedEventId={eventId} />
          </>
        );
      default:
        return <EventFeed events={filteredEvents} categories={categories} onFilterChange={handleFilterChange}/>;
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
            <Button variant="ghost" onClick={() => setActiveView('calendar')} className={`flex flex-col h-full justify-center gap-1 ${activeView === 'calendar' ? 'text-primary' : ''}`}>
                <Calendar className="h-6 w-6"/>
                <span className="text-xs">Kalender</span>
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

'use client';
import { useState, useEffect } from 'react';
import EventCard from '@/components/event-card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, List } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Event } from '@/lib/types';

export default function CalendarView() {
  const [view, setView] = useState('list');
  const [favoriteEvents, setFavoriteEvents] = useState<Event[]>([]);

  useEffect(() => {
    // In a real app, you would fetch this from a user's profile or a persistent store.
    // For now, we'll simulate it with localStorage.
    const favorites = JSON.parse(localStorage.getItem('favoriteEvents') || '[]');
    setFavoriteEvents(favorites);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Mein Kalender</h1>
        <div className="flex gap-2">
          <Button variant={view === 'list' ? 'default' : 'outline'} onClick={() => setView('list')}>
            <List className="mr-2 h-4 w-4" />
            Liste
          </Button>
          <Button variant={view === 'calendar' ? 'default' : 'outline'} onClick={() => setView('calendar')}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            Kalender
          </Button>
        </div>
      </div>

      {view === 'list' ? (
        <div className="grid gap-6">
          {favoriteEvents.length > 0 ? (
            favoriteEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="text-center py-16 border-dashed border-2 rounded-lg">
              <p className="text-muted-foreground mb-4">Du hast noch keine Events zu deinem Kalender hinzugefügt.</p>
              <Button asChild>
                <a href="/?view=home">Entdecke coole Events</a>
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Calendar
          mode="multiple"
          selected={favoriteEvents.map(event => new Date(event.date))}
          className="rounded-md border shadow-md"
        />
      )}
    </div>
  );
}

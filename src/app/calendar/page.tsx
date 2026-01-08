'use client';
import { useState, useEffect } from 'react';
import EventCard from '@/components/event-card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, List } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Event } from '@/lib/types';

export default function CalendarPage() {
  const [view, setView] = useState('list');
  const [favoriteEvents, setFavoriteEvents] = useState<Event[]>([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteEvents') || '[]');
    setFavoriteEvents(favorites);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Calendar</h1>
        <div className="flex gap-2">
          <Button variant={view === 'list' ? 'default' : 'outline'} onClick={() => setView('list')}>
            <List className="mr-2 h-4 w-4" />
            List
          </Button>
          <Button variant={view === 'calendar' ? 'default' : 'outline'} onClick={() => setView('calendar')}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            Calendar
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
            <p>You haven't added any events to your calendar yet.</p>
          )}
        </div>
      ) : (
        <Calendar
          mode="multiple"
          selected={favoriteEvents.map(event => new Date(event.date))}
          className="rounded-md border"
        />
      )}
    </div>
  );
}

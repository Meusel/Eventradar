'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EventCard from '@/components/event-card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, List } from 'lucide-react';
import { Event } from '@/lib/types';
import { getEvents } from '@/lib/events'; 
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/de';

moment.locale('de');
const localizer = momentLocalizer(moment);

const getUniqueCategories = (events: Event[]) => {
  const allCategories = events.flatMap(event => event.categories);
  return Array.from(new Set(allCategories));
};

export default function CalendarPage() {
  const [view, setView] = useState('list');
  const [favoriteEvents, setFavoriteEvents] = useState<Event[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>([]);
  const [calendarView, setCalendarView] = useState(Views.MONTH);
  const router = useRouter();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteEvents') || '[]');
    const events = getEvents();
    setFavoriteEvents(favorites);
    setAllEvents(events);
    setFilteredEvents(favorites);
    setCategories(['All', ...getUniqueCategories(events)]);
  }, []);

  const handleFilter = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredEvents(favoriteEvents);
    } else {
      const filtered = favoriteEvents.filter(event => event.categories.includes(category));
      setFilteredEvents(filtered);
    }
  };

  const handleSelectEvent = (event: any) => {
    router.push(`/event/${event.resource.id}`);
  };

  const calendarEvents = favoriteEvents.map(event => ({
    title: event.title,
    start: new Date(event.time.start),
    end: new Date(event.time.end),
    allDay: false,
    resource: event,
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mein Kalender</h1>
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
        <div>
          <div className="mb-4">
            <select
              value={selectedCategory}
              onChange={(e) => handleFilter(e.target.value)}
              className="p-2 border rounded"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="grid gap-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <p>You haven't added any events to your calendar yet or no events match the selected category.</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex gap-2 mb-4">
            <Button onClick={() => setCalendarView(Views.DAY)}>Day</Button>
            <Button onClick={() => setCalendarView(Views.WEEK)}>Week</Button>
            <Button onClick={() => setCalendarView(Views.MONTH)}>Month</Button>
          </div>
          <div style={{ height: 500 }}>
            <BigCalendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              view={calendarView}
              onView={view => setCalendarView(view)}
              onSelectEvent={handleSelectEvent}
              messages={{
                allDay: 'Ganztägig',
                previous: 'Zurück',
                next: 'Nächster',
                today: 'Heute',
                month: 'Monat',
                week: 'Woche',
                day: 'Tag',
                agenda: 'Agenda',
                date: 'Datum',
                time: 'Zeit',
                event: 'Ereignis',
                showMore: total => `+ ${total} mehr`
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

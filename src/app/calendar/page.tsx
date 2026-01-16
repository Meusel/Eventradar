'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EventCard from '@/components/event-card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, List, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Event } from '@/lib/types';
import { getEvents } from '@/lib/events';
import { Calendar as BigCalendar, momentLocalizer, Views, ToolbarProps } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/de';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

moment.locale('de');
const localizer = momentLocalizer(moment);

const getUniqueCategories = (events: Event[]) => {
  const allCategories = events.flatMap(event => event.categories);
  return Array.from(new Set(allCategories));
};

const viewGerman = {
  month: 'Monat',
  week: 'Woche',
  day: 'Tag',
};

const CustomToolbar = (toolbar: ToolbarProps) => {
  const goToBack = () => {
    toolbar.onNavigate('PREV');
  };

  const goToNext = () => {
    toolbar.onNavigate('NEXT');
  };

  const goToCurrent = () => {
    toolbar.onNavigate('TODAY');
  };

  const view = (view: string) => {
    toolbar.onView(view);
  };

  return (
    <div className="flex justify-between items-center mb-4 p-2 bg-gray-100 rounded-lg">
      <div className="flex items-center gap-2">
        <Button onClick={goToCurrent} variant="outline">Heute</Button>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={goToBack} variant="ghost" size="icon"><ChevronLeft className="h-5 w-5" /></Button>
        <h2 className="text-xl font-semibold capitalize">{toolbar.label}</h2>
        <Button onClick={goToNext} variant="ghost" size="icon"><ChevronRight className="h-5 w-5" /></Button>
      </div>
      <div className="flex items-center gap-2">
        {(toolbar.views as string[]).map(viewName => (
          <Button
            key={viewName}
            onClick={() => view(viewName)}
            variant={toolbar.view === viewName ? 'default' : 'outline'}
            className={toolbar.view === viewName ? 'bg-black text-white' : ''}
          >
            {viewGerman[viewName] || viewName}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default function CalendarPage() {
  const [view, setView] = useState('list');
  const [favoriteEvents, setFavoriteEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteEvents') || '[]');
    const allEvents = getEvents();
    setFavoriteEvents(favorites);
    setCategories(getUniqueCategories(allEvents));
  }, []);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredEvents(favoriteEvents);
    } else {
      const filtered = favoriteEvents.filter(event =>
        event.categories.some(cat => selectedCategories.includes(cat))
      );
      setFilteredEvents(filtered);
    }
  }, [selectedCategories, favoriteEvents]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleSelectEvent = (event: any) => {
    router.push(`/events/${event.resource.id}`);
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
          <Button
            variant={view === 'list' ? 'default' : 'outline'}
            onClick={() => setView('list')}
            className={view === 'list' ? 'bg-black text-white' : ''}
          >
            <List className="mr-2 h-4 w-4" />
            Liste
          </Button>
          <Button
            variant={view === 'calendar' ? 'default' : 'outline'}
            onClick={() => setView('calendar')}
            className={view === 'calendar' ? 'bg-black text-white' : ''}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            Kalender
          </Button>
        </div>
      </div>

      {view === 'list' ? (
        <div>
          <div className="mb-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Kategorien
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2">
                <div className="grid gap-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <Label htmlFor={category}>{category}</Label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <p>Du hast noch keine Events zu deinem Kalender hinzugefügt oder keine Events entsprechen den ausgewählten Kategorien.</p>
            )}
          </div>
        </div>
      ) : (
        <div style={{ height: '70vh' }}>
          <BigCalendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={handleSelectEvent}
            views={['month', 'week', 'day']}
            step={180}
            timeslots={1}
            components={{
              toolbar: CustomToolbar,
            }}
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
      )}
    </div>
  );
}

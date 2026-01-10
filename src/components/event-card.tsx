import Link from 'next/link';
import Image from 'next/image';
import type { Event } from '@/lib/types';
import { Button } from './ui/button';
import {
  Calendar,
  MapPin,
  Ticket,
  MessageSquare,
  Flame,
  Star,
} from 'lucide-react';
import { Badge } from './ui/badge';
import { getCategoryColor } from '@/lib/category-colors';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { getCommunitiesByEventId } from '@/lib/communities';
import { useState, useEffect } from 'react';

interface EventCardProps {
  event: Event;
  priority?: boolean;
}

export default function EventCard({ event, priority = false }: EventCardProps) {
  const categoryColor = getCategoryColor(event.category);
  const communities = getCommunitiesByEventId(event.id);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('savedEvents') || '[]');
    setIsSaved(savedEvents.some((savedEvent: Event) => savedEvent.id === event.id));
  }, [event.id]);

  const handleAddToCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const savedEvents = JSON.parse(localStorage.getItem('savedEvents') || '[]');
    const eventIndex = savedEvents.findIndex((savedEvent: Event) => savedEvent.id === event.id);

    if (eventIndex > -1) {
      savedEvents.splice(eventIndex, 1);
      setIsSaved(false);
    } else {
      savedEvents.push(event);
      setIsSaved(true);
    }
    localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
  };

  const handleTicketClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    window.open(event.ticketUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="group block h-full rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-lg">
      <Link href={`/events/${event.id}`} className="block">
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <Image
            src={event.imageUrl}
            alt={event.imageHint || event.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className="transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Priority Icons */}
          {event.priority === 'Top-Event' && (
            <div className="absolute top-3 left-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary/90 backdrop-blur-sm">
                <Flame className="h-5 w-5 text-primary-foreground" />
            </div>
          )}
          {event.priority === 'Empfohlen' && (
             <div className="absolute top-3 left-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400/90 backdrop-blur-sm">
                <Star className="h-5 w-5 text-white" />
            </div>
          )}

          <Badge
            className="absolute top-3 right-3"
            style={{
              backgroundColor: categoryColor,
              color: 'white',
            }}
          >
            {event.category}
          </Badge>
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 left-2 h-8 w-8 rounded-full bg-background/80 text-foreground hover:bg-background"
            onClick={handleAddToCalendar}
          >
            {isSaved ? (
              <CheckCircle className="h-5 w-5 text-primary" />
            ) : (
              <PlusCircle className="h-5 w-5" />
            )}
          </Button>
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/events/${event.id}`} className="block flex-grow">
            <h3 className="text-xl font-bold font-headline tracking-tight line-clamp-2">
                {event.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-3 flex-grow">
                {event.description}
            </p>
        </Link>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(event.date), 'd. MMMM yyyy', { locale: de })}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{event.venue || event.location}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
            <div className='flex-shrink-0'>
                <span className={`text-lg font-bold ${event.price === 0 ? 'text-green-500 animate-pulse' : ''}`}>{event.price > 0 ? `${event.price} €` : 'Kostenlos'}</span>
                {event.price > 0 && <span className="text-xs text-muted-foreground"> zzgl. Geb.</span>}
            </div>

            <div className="flex gap-2">
              {communities.length > 0 && (
                <Button asChild size="sm" variant="outline">
                  <Link href={`/communities/${communities[0].id}`}>
                    <MessageSquare className="h-4 w-4" />
                  </Link>
                </Button>
              )}

              <Button asChild size="sm">
                <a
                  href={event.ticketUrl}
                  onClick={handleTicketClick}
                  className="flex items-center gap-2"
                >
                  <Ticket className="h-4 w-4" />
                  <span>Tickets</span>
                </a>
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
}

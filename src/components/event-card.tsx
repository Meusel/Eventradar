
import Link from 'next/link';
import Image from 'next/image';
import type { Event } from '@/lib/types';
import { Button } from './ui/button';
import {
  Calendar,
  Clock,
  MapPin,
  Ticket,
  Tag,
  Users,
  CheckSquare,
  XSquare,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { Badge } from './ui/badge';
import { getCategoryColor } from '@/lib/category-colors';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

interface EventCardProps {
  event: Event;
  priority?: boolean;
}

export default function EventCard({ event, priority = false }: EventCardProps) {
  const categoryColor = getCategoryColor(event.category);

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
          <Badge
            className="absolute top-3 right-3"
            style={{
              backgroundColor: categoryColor,
              color: 'white',
            }}
          >
            {event.category}
          </Badge>
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/events/${event.id}`} className="block">
            <h3 className="text-xl font-bold font-headline tracking-tight line-clamp-2">
                {event.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-3">
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

        <div className="mt-4 flex items-center justify-between">
            <div>
                <span className="text-lg font-bold">{event.price > 0 ? `${event.price} €` : 'Kostenlos'}</span>
                {event.price > 0 && <span className="text-xs text-muted-foreground"> zzgl. Gebühren</span>}
            </div>

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
  );
}

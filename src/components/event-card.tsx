import type { Event } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { CalendarDays, MapPin, BadgeEuro, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type EventCardProps = {
  event: Event;
  priority?: boolean;
};

export default function EventCard({ event, priority = false }: EventCardProps) {
  return (
    <Link href={`/events/${event.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1 flex flex-col">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={event.imageUrl}
              alt={event.title}
              data-ai-hint={event.imageHint}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              priority={priority}
            />
            <Badge
              variant="secondary"
              className="absolute top-3 right-3 bg-card/80 text-card-foreground backdrop-blur-sm"
            >
              {event.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <h3 className="mb-2 text-lg font-bold font-headline leading-tight">
            {event.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4 shrink-0" />
            <span>
              {format(new Date(event.date), "EEEE, dd. MMMM yyyy", { locale: de })} um{" "}
              {event.time}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>{event.location}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 pt-0 text-sm">
           <div className="flex items-center gap-1 font-semibold">
             <BadgeEuro className="h-4 w-4 shrink-0 text-muted-foreground" />
             <span>{event.price > 0 ? `${event.price} €` : 'Kostenlos'}</span>
           </div>
           <div className="flex items-center gap-1 text-muted-foreground">
             <Clock className="h-4 w-4 shrink-0" />
             <span>{event.duration} h</span>
           </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

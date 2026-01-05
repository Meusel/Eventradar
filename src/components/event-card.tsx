import type { Event } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { CalendarDays, MapPin, BadgeEuro, Clock, Ticket } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PRIORITY_MAP } from "@/lib/priority";

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  const priorityInfo = PRIORITY_MAP[event.priority];
  const isFree = event.price === 0;

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
              sizes="100vw"
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
            {priorityInfo.icon && (
              <div className="absolute top-3 left-3 bg-destructive/80 text-destructive-foreground backdrop-blur-sm p-1 rounded-full">
                <span className="h-5 w-5">{priorityInfo.icon}</span>
              </div>
            )}
            {priorityInfo.badge && (
              <Badge
                variant="secondary"
                className="absolute bottom-3 left-3 bg-card/80 text-card-foreground backdrop-blur-sm"
              >
                {priorityInfo.badge}
              </Badge>
            )}
            {isFree && (
                <Badge
                variant="default"
                className="absolute bottom-3 right-3 bg-green-600/80 text-white backdrop-blur-sm"
              >
                Kostenlos
              </Badge>
            )}
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
           <div className={`flex items-center gap-1 font-semibold ${isFree ? 'text-green-600' : ''}`}>
             <BadgeEuro className="h-4 w-4 shrink-0 text-muted-foreground" />
             <span>{isFree ? 'Kostenlos' : `${event.price} €`}</span>
           </div>
           {event.boxOffice && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Ticket className="h-4 w-4 shrink-0" />
                <span>Abendkasse</span>
              </div>
            )}
           <div className="flex items-center gap-1 text-muted-foreground">
             <Clock className="h-4 w-4 shrink-0" />
             <span>{event.duration} h</span>
           </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

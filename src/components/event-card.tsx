
"use client";

import type { Event } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { CalendarDays, MapPin, Ticket } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type EventCardProps = {
  event: Event;
  priority?: boolean;
};

export default function EventCard({ event, priority = false }: EventCardProps) {
  const hasOnlineTickets = event.extras.includes("Online-Tickets");
  const hasBoxOffice = event.extras.includes("Abendkasse");
  const needsRegistration = event.extras.includes("Anmeldung erforderlich");
  
  const handleExternalLinkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      window.open(event.ticketUrl, '_blank', 'noopener,noreferrer');
  }

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
              {/* Assuming event.date and event.time are available from the merged Event type */}
              {format(new Date(event.date), "EEEE, dd. MMMM yyyy", { locale: de })} um{" "}
              {event.time}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>{event.location}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 pt-0">
          <div className="text-lg font-bold">
            {event.isFree ? "Kostenlos" : `${event.price} €`}
          </div>
          <div className="flex items-center">
            {(() => {
                if (event.soldOut) {
                    return <Badge variant="destructive">Ausverkauft</Badge>;
                }
                if (hasOnlineTickets) {
                    return (
                        <Button size="sm" onClick={handleExternalLinkClick}>
                            <Ticket className="mr-2 h-4 w-4" />
                            Ticket kaufen
                        </Button>
                    );
                }
                if (needsRegistration) {
                     return (
                        <Button size="sm" onClick={handleExternalLinkClick}>
                            Anmelden
                        </Button>
                    );
                }
                if (hasBoxOffice) {
                    return <Badge variant="outline">Abendkasse</Badge>;
                }
                return null;
            })()}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

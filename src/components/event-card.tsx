"use client";

import type { Event } from "@/lib/types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, MapPin, Ticket } from "lucide-react";
import Link from "next/link";

export default function EventCard({ event }: { event: Event }) {
  const eventDate = new Date(event.time.start).toLocaleDateString("de-DE", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  });
  const eventTime = new Date(event.time.start).toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const hasOnlineTickets = event.extras.includes("Online-Tickets");
  const hasBoxOffice = event.extras.includes("Abendkasse");
  const needsRegistration = event.extras.includes("Anmeldung erforderlich");

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
        <Link href={`#`} className="block">
            <div className="h-48 w-full overflow-hidden">
                <img
                src={event.imageUrl}
                alt={event.imageHint}
                className="h-full w-full object-cover"
                />
            </div>
        </Link>
      <div className="flex flex-1 flex-col p-4 md:p-6">
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap gap-2">
            {event.categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
          <Link href={`#`} className="block">
            <h3 className="font-headline text-xl font-bold tracking-tight hover:text-primary">
                {event.title}
            </h3>
          </Link>
          <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{eventDate}, {eventTime} Uhr</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{event.venue}</span>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between pt-4 border-t">
           <div className="text-xl font-bold">
            {event.isFree ? "Kostenlos" : `${event.price} €`}
          </div>
          <div className="flex items-center">
            {(() => {
                if (event.soldOut) {
                    return <Badge variant="destructive">Ausverkauft</Badge>;
                }
                if (hasOnlineTickets) {
                    return (
                        <Button asChild size="sm">
                            <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
                                <Ticket className="mr-2 h-4 w-4" />
                                Ticket kaufen
                            </a>
                        </Button>
                    );
                }
                if (needsRegistration) {
                     return (
                        <Button asChild size="sm">
                            <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
                                Anmelden
                            </a>
                        </Button>
                    );
                }
                if (hasBoxOffice) {
                    return <Badge variant="outline">Abendkasse</Badge>;
                }
                return null;
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}

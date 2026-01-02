"use client";

import type { Event } from "@/lib/types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, MapPin, Ticket } from "lucide-react";
import Link from "next/link";

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

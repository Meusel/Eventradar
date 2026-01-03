"use client";

import type { Event } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

import {
  CalendarDays,
  MapPin,
  BadgeEuro,
  Clock,
  Ticket,
} from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { PRIORITY_MAP } from "@/lib/priority";

type EventCardProps = {
  event: Event;
  priority?: boolean;
};

export default function EventCard({ event, priority = false }: EventCardProps) {
  const priorityInfo = PRIORITY_MAP[event.priority];

  const hasOnlineTickets = event.extras?.includes("Online-Tickets");
  const hasBoxOffice = event.extras?.includes("Abendkasse");
  const needsRegistration = event.extras?.includes("Anmeldung erforderlich");

  return (
    <Link href={`/events/${event.id}`} className="group block h-full">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1 flex flex-col">
        {/* IMAGE */}
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={event.imageUrl}
              alt={event.title}
              data-ai-hint={event.imageHint}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={priority}
            />

            {priorityInfo?.icon && (
              <div className="absolute top-3 left-3 bg-destructive/80 text-destructive-foreground backdrop-blur-sm p-1 rounded-full">
                <span className="h-5 w-5">{priorityInfo.icon}</span>
              </div>
            )}

            {priorityInfo?.badge && (
              <Badge
                variant="secondary"
                className="absolute bottom-3 left-3 bg-card/80 backdrop-blur-sm"
              >
                {priorityInfo.badge}
              </Badge>
            )}

            <Badge
              variant="secondary"
              className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm"
            >
              {event.category}
            </Badge>
          </div>
        </CardHeader>

        {/* CONTENT */}
        <CardContent className="flex flex-col gap-4 pt-4">
          <h3 className="text-lg font-semibold leading-tight">
            {event.title}
          </h3>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>{event.date}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>

          <div className="mt-2 flex items-center justify-between border-t pt-4">
            <div className="text-xl font-bold">
              {event.isFree ? "Kostenlos" : `${event.price} €`}
            </div>

            <div>
              {event.soldOut && (
                <Badge variant="destructive">Ausverkauft</Badge>
              )}

              {!event.soldOut && hasOnlineTickets && (
                <Button asChild size="sm">
                  <a
                    href={event.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Ticket className="mr-2 h-4 w-4" />
                    Ticket kaufen
                  </a>
                </Button>
              )}

              {!event.soldOut && needsRegistration && (
                <Button asChild size="sm">
                  <a
                    href={event.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Anmelden
                  </a>
                </Button>
              )}

              {!event.soldOut && !hasOnlineTickets && hasBoxOffice && (
                <Badge variant="outline">Abendkasse</Badge>
              )}
            </div>
          </div>
        </CardContent>

        {/* FOOTER */}
        <CardFooter className="flex justify-between items-center text-sm text-muted-foreground pt-0">
          <div className="flex items-center gap-1">
            <BadgeEuro className="h-4 w-4" />
            <span>{event.isFree ? "Kostenlos" : `${event.price} €`}</span>
          </div>

          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{event.duration} h</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

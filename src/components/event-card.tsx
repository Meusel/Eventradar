import type { Event } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { CalendarDays, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link href={`/events/${event.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={event.imageUrl}
              alt={event.title}
              data-ai-hint={event.imageHint}
              fill
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
            <Badge
              variant="secondary"
              className="absolute top-3 right-3 bg-card/80 text-card-foreground backdrop-blur-sm"
            >
              {event.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="mb-2 text-lg font-bold font-headline leading-tight">
            {event.title}
          </h3>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4 pt-0 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 shrink-0" />
            <span>
              {format(new Date(event.date), "EEEE, dd. MMMM yyyy")} at{" "}
              {event.time}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>{event.location}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

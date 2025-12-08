import { getEventById } from "@/lib/events";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Ticket,
  Tags,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SocialShareButtons from "@/components/social-share-buttons";
import Header from "@/components/header";

type EventPageProps = {
  params: {
    id: string;
  };
};

export default function EventPage({ params }: EventPageProps) {
  const event = getEventById(params.id);

  if (!event) {
    notFound();
  }

  const heroImageUrl = "https://picsum.photos/seed/7/1200/400";
  const heroImageHint = "concert crowd";

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all events
            </Link>
          </Button>
          <div className="overflow-hidden rounded-lg bg-card shadow-lg">
            <div className="relative h-64 w-full md:h-80">
              <Image
                src={heroImageUrl}
                alt={event.title}
                data-ai-hint={heroImageHint}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-6 left-6 right-6">
                <h1 className="text-3xl font-bold text-primary-foreground drop-shadow-md md:text-5xl font-headline">
                  {event.title}
                </h1>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-3 md:p-8">
              <div className="md:col-span-2">
                <h2 className="mb-4 text-2xl font-bold font-headline">
                  About this event
                </h2>
                <p className="text-base leading-relaxed text-foreground/80">
                  {event.description}
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Date and Time</h3>
                    <p className="text-sm text-foreground/80">
                      {format(new Date(event.date), "EEEE, dd. MMMM yyyy")}
                    </p>
                    <p className="text-sm text-foreground/80">
                      Starts at {event.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-sm text-foreground/80">
                      {event.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Tags className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Category</h3>
                    <Badge variant="secondary">{event.category}</Badge>
                  </div>
                </div>
                <Button asChild size="lg" variant="accent" className="w-full">
                  <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
                    <Ticket className="mr-2 h-5 w-5" />
                    Get Tickets
                  </a>
                </Button>
                <SocialShareButtons />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

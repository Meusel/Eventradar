"use client";
import { getEventById } from "@/lib/events";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Ticket,
  Tags,
  BadgeEuro,
  Clock,
  Map,
  Navigation,
} from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SocialShareButtons from "@/components/social-share-buttons";
import Header from "@/components/header";

export default function EventPage() {
  const params = useParams();
  const eventId = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!eventId) {
    notFound();
  }

  const event = getEventById(eventId);

  if (!event) {
    notFound();
  }

  const heroImageUrl = "https://picsum.photos/seed/7/1200/400";
  const heroImageHint = "konzert publikum";

 const handleGetDirections = () => {
    if (!event) return;
    const address = encodeURIComponent(event.location);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const url = isIOS
      ? `maps://?q=${address}`
      : `https://www.google.com/maps/dir/?api=1&destination=${address}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 bg-background pb-16">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück zu allen Events
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
                  Über dieses Event
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
                    <h3 className="font-semibold">Datum und Uhrzeit</h3>
                    <p className="text-sm text-foreground/80">
                      {format(new Date(event.date), "EEEE, dd. MMMM yyyy", { locale: de })}
                    </p>
                    <p className="text-sm text-foreground/80">
                      Beginnt um {event.time.start} Uhr
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Ort</h3>
                    <p className="text-sm text-foreground/80">
                      {event.location}
                    </p>
                    <div className="mt-2 flex flex-col space-y-2">
                        <Button asChild size="sm" variant="outline">
                            <Link href={`/?eventId=${event.id}`}>
                                <Map className="mr-2 h-4 w-4"/>
                                Auf Karte anzeigen
                            </Link>
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleGetDirections}>
                            <Navigation className="mr-2 h-4 w-4"/>
                            Anfahrt
                        </Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Tags className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Kategorie</h3>
                    <Badge variant="secondary">{event.category}</Badge>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <BadgeEuro className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Preis</h3>
                    <p className="text-sm text-foreground/80">
                      {event.price > 0 ? `${event.price} €` : "Kostenlos"}
                    </p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Dauer</h3>
                    <p className="text-sm text-foreground/80">
                      ca. {event.duration} Stunden
                    </p>
                  </div>
                </div>
                <Button asChild size="lg" variant="accent" className="w-full">
                  <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
                    <Ticket className="mr-2 h-5 w-5" />
                    Tickets kaufen
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

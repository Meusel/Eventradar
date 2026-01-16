'use client';
import { getEventById } from "@/lib/events";
import { notFound, useParams, useRouter } from "next/navigation";
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
  Users,
  PlusCircle
} from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SocialShareButtons from "@/components/social-share-buttons";
import Header from "@/components/header";
import { getCommunityByEventId, updateCommunity } from "@/lib/communities";
import { useState, useEffect } from "react";
import { Event } from "@/lib/types";

export default function EventPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params ? (Array.isArray(params.id) ? params.id[0] : params.id) : null;

  // Mock current user. In a real app, this would come from your auth solution.
  const currentUserId = 'user-1';

  const [isMember, setIsMember] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!eventId) {
    notFound();
  }

  const event = getEventById(eventId);

  if (!event) {
    notFound();
  }

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteEvents') || '[]');
    setIsFavorite(favorites.some((fav: Event) => fav.id === eventId));
  }, [eventId]);

  const community = getCommunityByEventId(eventId);

  useEffect(() => {
    if (community) {
      setIsMember(community.members.includes(currentUserId));
    }
  }, [community]);

  const handleJoinCommunity = () => {
    if (community) {
      const updatedCommunity = {
        ...community,
        members: [...community.members, currentUserId]
      };
      updateCommunity(updatedCommunity);
      setIsMember(true);
      router.push(`/communities/${community.id}`);
    }
  };
  
  const handleAddToCalendar = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteEvents') || '[]');
    if (isFavorite) {
        // Remove from favorites
        const newFavorites = favorites.filter((fav: Event) => fav.id !== eventId);
        localStorage.setItem('favoriteEvents', JSON.stringify(newFavorites));
        setIsFavorite(false);
    } else {
        // Add to favorites
        const newFavorites = [...favorites, event];
        localStorage.setItem('favoriteEvents', JSON.stringify(newFavorites));
        setIsFavorite(true);
    }
  };

 const handleGetDirections = () => {
    if (!event) return;
    const address = encodeURIComponent(event.location);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const url = isIOS
      ? `maps://?q=${address}`
      : `https://www.google.com/maps/dir/?api=1&destination=${address}`;
    window.open(url, '_blank');
  };

  const handleShowOnMap = () => {
    if (!event) return;
    const address = encodeURIComponent(event.location);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const url = isIOS
      ? `maps://?q=${address}`
      : `https://www.google.com/maps/search/?api=1&query=${address}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 bg-background pb-16">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück
          </Button>
          <div className="overflow-hidden rounded-lg bg-card shadow-lg">
            <div className="relative h-64 w-full md:h-80">
              <Image
                src={event.imageUrl}
                alt={event.title}
                data-ai-hint={event.imageHint}
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
                {community && (
                  <div className="rounded-lg border bg-card p-4">
                    <h3 className="font-semibold flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-primary" />
                      Community
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Tritt der Community bei, um dich mit anderen Teilnehmern auszutauschen.
                    </p>
                    {isMember ? (
                      <Button asChild className="w-full">
                        <Link href={`/communities/${community.id}`}>
                          Zum Community-Chat
                        </Link>
                      </Button>
                    ) : (
                      <Button onClick={handleJoinCommunity} className="w-full">
                        Community beitreten
                      </Button>
                    )}
                  </div>
                )}
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
                      Beginnt um {format(new Date(event.time.start), "HH:mm", { locale: de })} Uhr
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-.full bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Ort</h3>
                    <p className="text-sm text-foreground/80">
                      {event.location}
                    </p>
                    <div className="mt-2 flex flex-col space-y-2">
                        <Button size="sm" variant="outline" onClick={handleShowOnMap}>
                            <Map className="mr-2 h-4 w-4"/>
                            Auf Karte anzeigen
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
                <Button onClick={handleAddToCalendar} size="lg" variant="outline" className="w-full">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  {isFavorite ? 'Vom Kalender entfernen' : 'Zum Kalender hinzufügen'}
                </Button>
                <Button asChild size="lg" variant="accent" className="w-full">
                  <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
                    <Ticket className="mr-2 h-5 w-5" />
                    Tickets
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

"use client";

import { useState } from "react";
import Header from "@/components/header";
import EventFeed from "@/components/event-feed";
import AiRecommendations from "@/components/ai-recommendations";
import { getEvents } from "@/lib/events";
import type { Event } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Compass, Home as HomeIcon, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const allEvents = getEvents();
  const categories = ["Alle", ...new Set(allEvents.map((event) => event.category))];
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(allEvents);
  const [activeView, setActiveView] = useState("home");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term) {
      setFilteredEvents(allEvents);
    } else {
      const lowercasedTerm = term.toLowerCase();
      const newFilteredEvents = allEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(lowercasedTerm) ||
          event.description.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredEvents(newFilteredEvents);
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case "home":
        return (
          <>
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h1 className="text-3xl font-bold font-headline tracking-tight md:text-4xl">
                Anstehende Events in <span className="text-primary">Halle</span>
              </h1>
            </div>
             <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Suche nach Events..."
                  className="w-full rounded-full bg-muted pl-10 pr-4 py-6 text-lg"
                  value={searchTerm}
                  onFocus={() => setActiveView('search')}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            <EventFeed events={filteredEvents} categories={categories} />
          </>
        );
      case "search":
        return (
           <>
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Suche nach Events..."
                  className="w-full rounded-full bg-muted pl-10 pr-4 py-6 text-lg"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  autoFocus
                />
              </div>
              {searchTerm ? <EventFeed events={filteredEvents} categories={categories} /> : <div className="text-center text-muted-foreground mt-8">Beginne zu tippen, um nach Events zu suchen.</div>}
            </>
        );
      case "recommendations":
        return (
          <div className="w-full">
            <AiRecommendations />
          </div>
        );
      case "discover":
         return <div className="text-center text-muted-foreground mt-8">Entdecken-Funktion kommt bald!</div>;
      default:
        return <EventFeed events={filteredEvents} categories={categories} />;
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 bg-background pb-24">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          {renderContent()}
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto flex h-16 max-w-7xl items-center justify-around px-4">
            <Button variant="ghost" onClick={() => setActiveView('home')} className={`flex flex-col h-full justify-center gap-1 ${activeView === 'home' ? 'text-primary' : ''}`}>
                <HomeIcon className="h-6 w-6"/>
                <span className="text-xs">Home</span>
            </Button>
            <Button variant="ghost" onClick={() => setActiveView('search')} className={`flex flex-col h-full justify-center gap-1 ${activeView === 'search' ? 'text-primary' : ''}`}>
                <Search className="h-6 w-6"/>
                <span className="text-xs">Suche</span>
            </Button>
            <Button variant="ghost" onClick={() => setActiveView('recommendations')} className={`flex flex-col h-full justify-center gap-1 ${activeView === 'recommendations' ? 'text-primary' : ''}`}>
                <Sparkles className="h-6 w-6"/>
                <span className="text-xs">Für Dich</span>
            </Button>
            <Button variant="ghost" onClick={() => setActiveView('discover')} className={`flex flex-col h-full justify-center gap-1 ${activeView === 'discover' ? 'text-primary' : ''}`}>
                <Compass className="h-6 w-6"/>
                <span className="text-xs">Entdecken</span>
            </Button>
        </nav>
      </footer>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Datenschutzerklärung</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <p>
            Diese Datenschutzerklärung beschreibt, wie wir Ihre Daten erheben, verwenden und schützen.
          </p>

          <h2>Welche Daten wir erheben</h2>
          <p>
            Wir erheben Daten, um unsere Dienste bereitzustellen und zu verbessern. Dazu gehören:
          </p>
          <ul>
            <li>
              <strong>Kontoinformationen:</strong> Wenn Sie ein Konto erstellen, erheben wir
              Ihren Namen, Ihre E-Mail-Adresse und Ihr Passwort.
            </li>
            <li>
              <strong>Nutzungsdaten:</strong> Wir erheben Daten darüber, wie Sie unsere
              Dienste nutzen, z. B. welche Seiten Sie besuchen und welche Funktionen Sie
              verwenden.
            </li>
            <li>
              <strong>Cookie-Daten:</strong> Wir verwenden Cookies, um Ihre Einstellungen zu
              speichern und Ihre Erfahrung zu personalisieren.
            </li>
          </ul>

          <h2>Wie wir Ihre Daten verwenden</h2>
          <p>Wir verwenden Ihre Daten, um:</p>
          <ul>
            <li>Unsere Dienste bereitzustellen und zu pflegen</li>
            <li>Ihre Erfahrung zu personalisieren</li>
            <li>Mit Ihnen zu kommunizieren</li>
            <li>Unsere Dienste zu verbessern</li>
          </ul>

          <h2>Wie wir Ihre Daten schützen</h2>
          <p>
            Wir treffen Maßnahmen, um Ihre Daten vor unbefugtem Zugriff, unbefugter
            Verwendung oder Offenlegung zu schützen.
          </p>

          <h2>Ihre Einwilligung</h2>
          <p>
            Indem Sie unsere Dienste nutzen und dieser Datenschutzerklärung zustimmen,
            willigen Sie in die Erhebung, Verwendung und Speicherung Ihrer Daten wie in
            diesem Dokument beschrieben ein. Sie können Ihre Einwilligung jederzeit
            widerrufen, indem Sie uns unter [Ihre E-Mail-Adresse] kontaktieren.
          </p>

          <h2>Ihre Rechte</h2>
          <p>Sie haben das Recht auf:</p>
          <ul>
            <li>Zugriff auf Ihre Daten</li>
            <li>Berichtigung Ihrer Daten</li>
            <li>Löschung Ihrer Daten</li>
            <li>Widerspruch gegen die Verarbeitung Ihrer Daten</li>
          </ul>

          <h2>Kontakt</h2>
          <p>
            Wenn Sie Fragen zu dieser Datenschutzerklärung haben, kontaktieren Sie uns
            bitte unter [Ihre E-Mail-Adresse].
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

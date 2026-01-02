
import { addDays, format, startOfToday } from 'date-fns';
import type { Event } from './types';

const today = startOfToday();

const eventsData: Event[] = [
  {
    id: '1',
    title: 'Indie-Nacht in der Palette',
    description:
      "Erlebe das Beste von lokalen und internationalen Indie-Bands in der legendären Palette. Eine Nacht mit großartiger Musik, günstigen Getränken und guter Stimmung erwartet dich. Verpasse nicht das nächste große Ding!",
    date: "2026-02-07",
    time: "20:00",
    category: "Musik",
    location: "Palette, Große Ulrichstraße 51, 06108 Halle (Saale)",
    latitude: 51.4833,
    longitude: 11.9667,
    imageUrl: "https://picsum.photos/seed/1/600/400",
    imageHint: "konzert musik",
    ticketUrl: "#",
    price: 5,
    duration: 4,
    extras: ["Online-Tickets", "Abendkasse"],
    isFree: false,
    soldOut: false,
  },
  {
    id: '2',
    title: "Moderne Kunst Vernissage: 'Dimensionen'",
    description:
      "Besuche die Eröffnung von 'Dimensionen', einer neuen Ausstellung der aufstrebenden Künstlerin Klara Weiss. Entdecke abstrakte Formen und lebendige Farben, die die Wahrnehmung herausfordern. Freier Eintritt & kostenloser Sekt.",
    date: "2026-02-10",
    time: "19:00",
    category: "Kunst",
    location: "Kunstmuseum Moritzburg, Friedemann-Bach-Platz 5, 06108 Halle (Saale)",
    latitude: 51.4856,
    longitude: 11.9669,
    imageUrl: "https://picsum.photos/seed/2/600/400",
    imageHint: "kunstgalerie",
    ticketUrl: "#",
    price: 0,
    duration: 3,
    extras: ["Anmeldung erforderlich"],
    isFree: true,
    soldOut: false,
  },
  {
    id: '3',
    title: 'Studenten-Techno-Rave',
    description:
      "Entfessle deine Energie bei unserem riesigen Studenten-Techno-Rave. Top lokale DJs legen die ganze Nacht harte Tracks auf. Besondere Studentenrabatte an der Bar.",
    date: "2026-02-12",
    time: "23:00",
    category: "Party",
    location: "Station Endlos, Willy-Brandt-Straße 78, 06110 Halle (Saale)",
    latitude: 51.4701,
    longitude: 11.9852,
    imageUrl: "https://picsum.photos/seed/3/600/400",
    imageHint: "dj party",
    ticketUrl: "#",
    price: 10,
    duration: 6,
    extras: ["Online-Tickets"],
    isFree: false,
    soldOut: true, // Example of a sold out event
  },
  {
    id: '4',
    title: 'Hallesches Streetball-Turnier',
    description:
      "Hast du das Zeug dazu? Bilde ein Team und tritt beim jährlichen Halleschen Streetball-Turnier an. Preise, Musik und ein Food-Truck-Festival machen dies zu einem Muss für alle Basketball-Liebhaber.",
    date: "2026-02-14",
    time: "12:00",
    category: "Sport",
    location: "Peißnitzinsel, 06108 Halle",
    latitude: 51.487,
    longitude: 11.956,
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageHint: "bälle sport",
    ticketUrl: "#",
    price: 5,
    duration: 8,
    extras: ["Anmeldung erforderlich"],
    isFree: false,
    soldOut: false,
  },
  {
    id: '5',
    title: 'Einführung in React: Programmier-Workshop',
    description:
      "Lerne die Grundlagen von React.js in diesem praxisnahen Workshop für Anfänger. Perfekt für Studierende, die moderne Webanwendungen erstellen möchten. Bitte eigenen Laptop mitbringen.",
    date: "2026-02-18",
    time: "17:00",
    category: "Workshop",
    location: "MLU Weinberg Campus, Von-Danckelmann-Platz 1, 06120 Halle",
    latitude: 51.491,
    longitude: 11.934,
    imageUrl: "https://picsum.photos/seed/5/600/400",
    imageHint: "programmier workshop",
    ticketUrl: "#",
    price: 0,
    duration: 3,
    extras: [],
    isFree: true,
    soldOut: false,
  },
  {
    id: '6',
    title: 'Akustik Open-Air am Turm',
    description:
      "Teile dein Talent oder entdecke neue Künstler bei unserer gemütlichen Akustik Open-Mic-Nacht. Sänger, Dichter und Geschichtenerzähler sind alle willkommen. Die Anmeldung beginnt um 19:30 Uhr.",
    date: "2026-02-21",
    time: "20:00",
    category: "Musik",
    location: "Turm, Friedemann-Bach-Platz 5, 06108 Halle (Saale)",
    latitude: 51.4856,
    longitude: 11.9669,
    imageUrl: "https://picsum.photos/seed/mic-note/600/400",
    imageHint: "mikrofon und note",
    ticketUrl: "#",
    price: 5,
    duration: 3,
    extras: ["Abendkasse"],
    isFree: false,
    soldOut: false,
  },
];

export function getEvents(): Event[] {
  return eventsData;
}

export function getEventById(id: string): Event | undefined {
  return eventsData.find((event) => event.id === id);
}

import type { Event } from "./types";

const eventsData: Event[] = [
  {
    id: "1",
    title: "Indie-Nacht in der Palette",
    description:
      "Erlebe das Beste von lokalen und internationalen Indie-Bands in der legendären Palette. Eine Nacht mit großartiger Musik, günstigen Getränken und guter Stimmung erwartet dich. Verpasse nicht das nächste große Ding!",
    imageUrl: "https://picsum.photos/seed/1/600/400",
    imageHint: "konzert musik",
    ticketUrl: "#",
    categories: ["Musik", "Konzert"],
    time: {
      start: "2026-02-07T20:00:00Z",
      end: "2026-02-08T00:00:00Z",
    },
    district: "Giebichenstein",
    venue: "Palette",
    price: 5,
    isFree: false,
    targetGroups: ["Studierende", "Erwachsene"],
    accessibility: [],
    extras: ["Online-Tickets", "Abendkasse"],
    soldOut: false,
  },
  {
    id: "2",
    title: "Moderne Kunst Vernissage: 'Dimensionen'",
    description:
      "Besuche die Eröffnung von 'Dimensionen', einer neuen Ausstellung der aufstrebenden Künstlerin Klara Weiss. Entdecke abstrakte Formen und lebendige Farben, die die Wahrnehmung herausfordern. Freier Eintritt & kostenloser Sekt.",
    imageUrl: "https://picsum.photos/seed/2/600/400",
    imageHint: "kunstgalerie",
    ticketUrl: "#",
    categories: ["Kunst", "Ausstellung"],
    time: {
      start: "2026-02-10T19:00:00Z",
      end: "2026-02-10T22:00:00Z",
    },
    district: "Innenstadt",
    venue: "Kunstmuseum Moritzburg",
    price: 0,
    isFree: true,
    targetGroups: ["Erwachsene", "Senioren", "Studierende"],
    accessibility: ["Rollstuhlgerecht", "Barrierefreie Toilette"],
    extras: [],
    soldOut: false,
  },
  {
    id: "3",
    title: "Studenten-Techno-Rave",
    description:
      "Entfessle deine Energie bei unserem riesigen Studenten-Techno-Rave. Top lokale DJs legen die ganze Nacht harte Tracks auf. Besondere Studentenrabatte an der Bar.",
    imageUrl: "https://picsum.photos/seed/3/600/400",
    imageHint: "dj party",
    ticketUrl: "#",
    categories: ["Party", "Musik"],
    time: {
      start: "2026-02-12T23:00:00Z",
      end: "2026-02-13T05:00:00Z",
    },
    district: "Innenstadt",
    venue: "Station Endlos",
    price: 10,
    isFree: false,
    targetGroups: ["Studierende"],
    accessibility: [],
    extras: ["Online-Tickets", "Abendkasse"],
    soldOut: false,
  },
  {
    id: "4",
    title: "Hallesches Streetball-Turnier",
    description:
      "Hast du das Zeug dazu? Bilde ein Team und tritt beim jährlichen Halleschen Streetball-Turnier an. Preise, Musik und ein Food-Truck-Festival machen dies zu einem Muss für alle Basketball-Liebhaber.",
    imageUrl: "https://picsum.photos/seed/4/600/400",
    imageHint: "basketballspiel",
    ticketUrl: "#",
    categories: ["Sport"],
    time: {
      start: "2026-02-14T12:00:00Z",
      end: "2026-02-14T20:00:00Z",
    },
    district: "Peißnitz",
    venue: "Peißnitzinsel",
    price: 5,
    isFree: false,
    targetGroups: ["Familien", "Kinder", "Studierende", "Erwachsene"],
    accessibility: [],
    extras: ["Outdoor", "Online-Tickets", "Abendkasse"],
    soldOut: false,
  },
  {
    id: "5",
    title: "Einführung in React: Programmier-Workshop",
    description:
      "Lerne die Grundlagen von React.js in diesem praxisnahen Workshop für Anfänger. Perfekt für Studierende, die moderne Webanwendungen erstellen möchten. Bitte eigenen Laptop mitbringen.",
    imageUrl: "https://picsum.photos/seed/5/600/400",
    imageHint: "programmier workshop",
    ticketUrl: "#",
    categories: ["Workshop", "Bildung", "Veranstaltungen der MLU"],
    time: {
      start: "2026-02-18T17:00:00Z",
      end: "2026-02-18T20:00:00Z",
    },
    district: "Weinberg Campus",
    venue: "MLU Weinberg Campus",
    price: 0,
    isFree: true,
    targetGroups: ["Studierende"],
    accessibility: ["Rollstuhlgerecht"],
    extras: ["Anmeldung erforderlich"],
    soldOut: false,
  },
  {
    id: "6",
    title: "Lesungen und Akustik-Nacht am Turm",
    description:
      "Teile dein Talent oder entdecke neue Künstler bei unserer gemütlichen Akustik-Nacht. Sänger, Dichter und Geschichtenerzähler sind alle willkommen. Die Anmeldung beginnt um 19:30 Uhr.",
    imageUrl: "https://picsum.photos/seed/mic-note/600/400",
    imageHint: "mikrofon und note",
    ticketUrl: "#",
    categories: ["Kultur", "Lesungen"],
    time: {
      start: "2026-02-21T20:00:00Z",
      end: "2026-02-21T23:00:00Z",
    },
    district: "Innenstadt",
    venue: "Turm",
    price: 0,
    isFree: true,
    targetGroups: ["Erwachsene", "Studierende", "Senioren"],
    accessibility: [],
    extras: ["Outdoor"],
    soldOut: false,
  },
];

export function getEvents(): Event[] {
  return eventsData;
}

export function getEventById(id: string): Event | undefined {
  return eventsData.find((event) => event.id === id);
}

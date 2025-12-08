import { addDays, format, startOfToday } from "date-fns";
import type { Event } from "./types";

const today = startOfToday();

const eventsData: Event[] = [
  {
    id: "1",
    title: "Indie Night at Objekt 5",
    description:
      "Experience the best of local and international indie bands at the legendary Objekt 5. A night of great music, cheap drinks, and good vibes awaits. Don't miss out on the next big thing!",
    date: format(addDays(today, 1), "yyyy-MM-dd"),
    time: "20:00",
    category: "Music",
    location: "Objekt 5, Seebener Str. 5, 06114 Halle",
    imageUrl: "https://picsum.photos/seed/1/600/400",
    imageHint: "concert music",
    ticketUrl: "#",
  },
  {
    id: "2",
    title: "Modern Art Vernissage: 'Dimensions'",
    description:
      "Join us for the opening of 'Dimensions', a new exhibition by emerging artist Klara Weiss. Explore abstract forms and vibrant colors that challenge perception. Free entry & complimentary sekt.",
    date: format(addDays(today, 2), "yyyy-MM-dd"),
    time: "19:00",
    category: "Art",
    location: "Galerie Zaglmaier, Große Steinstraße 58, 06108 Halle",
    imageUrl: "https://picsum.photos/seed/2/600/400",
    imageHint: "art gallery",
    ticketUrl: "#",
  },
  {
    id: "3",
    title: "Student Techno Rave",
    description:
      "Unleash your energy at our massive student techno rave. Top local DJs will be spinning hard-hitting tracks all night long. Special student discounts at the bar.",
    date: format(addDays(today, 3), "yyyy-MM-dd"),
    time: "23:00",
    category: "Party",
    location: "Charles Bronson, Berliner Str. 242, 06112 Halle",
    imageUrl: "https://picsum.photos/seed/3/600/400",
    imageHint: "dj party",
    ticketUrl: "#",
  },
  {
    id: "4",
    title: "Halle Streetball Tournament",
    description:
      "Got game? Form a team and compete in the annual Halle Streetball Tournament. Prizes, music, and a food truck festival make this a can't-miss event for all basketball lovers.",
    date: format(addDays(today, 4), "yyyy-MM-dd"),
    time: "12:00",
    category: "Sports",
    location: "Peißnitzinsel, 06108 Halle",
    imageUrl: "https://picsum.photos/seed/4/600/400",
    imageHint: "basketball game",
    ticketUrl: "#",
  },
  {
    id: "5",
    title: "Intro to React: Coding Workshop",
    description:
      "Learn the fundamentals of React.js in this hands-on workshop for beginners. Perfect for students looking to build modern web applications. Please bring your own laptop.",
    date: format(addDays(today, 5), "yyyy-MM-dd"),
    time: "17:00",
    category: "Workshop",
    location: "MLU Weinberg Campus, Von-Danckelmann-Platz 1, 06120 Halle",
    imageUrl: "https://picsum.photos/seed/5/600/400",
    imageHint: "coding workshop",
    ticketUrl: "#",
  },
  {
    id: "6",
    title: "Acoustic Open Mic Night",
    description:
      "Share your talent or discover new artists at our cozy acoustic open mic night. Singers, poets, and storytellers are all welcome. Sign-up starts at 19:30.",
    date: format(addDays(today, 6), "yyyy-MM-dd"),
    time: "20:00",
    category: "Music",
    location: "Café Nöö, Große Klausstraße 11, 06108 Halle",
    imageUrl: "https://picsum.photos/seed/6/600/400",
    imageHint: "open mic",
    ticketUrl: "#",
  },
];

export function getEvents(): Event[] {
  return eventsData;
}

export function getEventById(id: string): Event | undefined {
  return eventsData.find((event) => event.id === id);
}

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  category: "Musik" | "Kunst" | "Party" | "Sport" | "Workshop";
  location: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  imageHint: string;
  ticketUrl: string;
  price: number;
  duration: number; // in hours
};

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  category: "Music" | "Art" | "Party" | "Sports" | "Workshop";
  location: string;
  imageUrl: string;
  imageHint: string;
  ticketUrl: string;
};

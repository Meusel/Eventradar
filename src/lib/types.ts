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
  categories: string[];
  time: {
    start: string;
    end: string;
  };
  district: string;
  venue: string;
  price: number;
  isFree: boolean;
  targetGroups: string[];
  accessibility: string[];
  extras: string[];
  soldOut: boolean;
};

export type Community = {
  id: string;
  eventId: string;
  name: string;
  description: string;
  imageUrl: string;
  members: string[];
};

export type ChatMessage = {
  id: string;
  communityId: string;
  userId: string;
  username: string;
  avatarUrl: string;
  text: string;
  timestamp: Date;
};

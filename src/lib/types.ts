export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: {
    start: string;
    end: string;
  };
  duration: number;
  category: "Musik" | "Kunst" | "Party" | "Sport" | "Workshop";
  location: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  imageHint: string;
  ticketUrl: string;
  categories: string[];
  district: string;
  venue: string;
  price: number;
  isFree: boolean;
  targetGroups: string[];
  accessibility: string[];
  extras: string[];
  soldOut: boolean;
  attendees: string[];
};

export type Community = {
  id: string;
  eventId: string;
  name: string;
  description: string;
  imageUrl: string;
  members: string[];
};

export type User = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type ChatMessage = {
  id: string;
  communityId: string;
  senderId: string;
  username: string;
  avatarUrl: string;
  text: string;
  timestamp: any; // Allow any type for Firestore timestamp flexibility
};

export type PrivateChatMessage = {
    id: string;
    chatId: string;
    senderId: string;
    text: string;
    timestamp: any; // Using any for timestamp to avoid issues with firebase serverTimestamp
};

// This type was missing
export type PrivateChatPreview = {
  id: string;
  recipient: User;
  lastMessage: string;
  lastUpdated: Date;
};

export type PrivateChat = {
    id: string;
    participants: string[];
    lastMessage: string;
    lastUpdated: any; // Using any for timestamp to avoid issues with firebase serverTimestamp
    recipient: User;
}

export type Event = {
  id: string;
  title: string;
  description: string;
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

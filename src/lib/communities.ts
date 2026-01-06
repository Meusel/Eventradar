import type { Community } from './types';

export const communities: Community[] = [
  {
    id: 'community-1',
    eventId: 'event-1',
    name: 'Rave Crew Berlin 🪩',
    description: 'Hier könnt ihr euch vor dem Event austauschen, Treffpunkte klären, etc.',
    imageUrl: '/images/indie-nacht.jpg',
    members: ['user-1', 'user-2', 'user-3'],
  },
  {
    id: 'community-2',
    eventId: 'event-2',
    name: 'Akustik-Liebhaber 🎸',
    description: 'Für alle, die handgemachte Musik lieben. Lasst uns über die besten Plätze und die Vorbands quatschen.',
    imageUrl: '/images/akustik-open-air.jpg',
    members: ['user-1', 'user-4'],
  },
  {
    id: 'community-3',
    eventId: 'event-3',
    name: 'Streetball-Junkies 🏀',
    description: 'Wer ist am Start? Lasst uns Teams bilden und über die besten Moves diskutieren.',
    imageUrl: '/images/streetball-turnier.jpg',
    members: ['user-2', 'user-5', 'user-6'],
  },
  {
    id: 'community-4',
    eventId: 'event-4',
    name: 'Code & Coffee 💻☕',
    description: 'Tauscht euch über die neuesten Tech-Trends aus und findet euren nächsten Coding-Buddy.',
    imageUrl: '/images/programmier-workshop.jpg',
    members: ['user-1', 'user-3', 'user-5'],
  },
];

export const getCommunities = () => communities;

export const getCommunityById = (id: string) => communities.find((c) => c.id === id);

export const getCommunityByEventId = (eventId: string) => communities.find((c) => c.eventId === eventId);

export const getCommunitiesByEventId = (eventId: string) =>
  communities.filter((c) => c.eventId === eventId);

export const joinCommunity = (communityId: string, userId: string) => {
  console.log(`User ${userId} joining community ${communityId}`);
  // In a real app, you would update the database here.
  const community = communities.find(c => c.id === communityId);
  if (community && !community.members.includes(userId)) {
    community.members.push(userId);
  }
};

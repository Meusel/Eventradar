import { getCommunityByEventId } from './communities';
import { getEvents } from './events';
import type { Community } from './types';

export function getCommunitySuggestions(userId: string): Community[] {
  const userEvents = getEvents().filter(event => event.attendees && event.attendees.includes(userId));
  const suggestedCommunities: Community[] = [];

  userEvents.forEach(event => {
    const community = getCommunityByEventId(event.id);
    if (community && !community.members.includes(userId)) {
      suggestedCommunities.push(community);
    }
  });

  return suggestedCommunities;
}

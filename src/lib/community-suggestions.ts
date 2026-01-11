
import { getCommunities, getCommunityByEventId } from './communities';
import { getEvents } from './events';
import type { Community } from './types';

export function getCommunitySuggestions(userId: string): Community[] {
  const allCommunities = getCommunities();
  const joinedCommunityIds = new Set(
    allCommunities.filter(c => c.members.includes(userId)).map(c => c.id)
  );

  // 1. Primary Suggestion: Based on user's attended events
  const userEvents = getEvents().filter(event => event.attendees && event.attendees.includes(userId));
  const eventBasedSuggestions = new Map<string, Community>();

  userEvents.forEach(event => {
    const community = getCommunityByEventId(event.id);
    if (community && !joinedCommunityIds.has(community.id)) {
      eventBasedSuggestions.set(community.id, community);
    }
  });

  let finalSuggestions = Array.from(eventBasedSuggestions.values());

  // 2. Fallback: If not enough suggestions, fill with other communities user hasn't joined
  if (finalSuggestions.length < 3) {
    const otherCandidates = allCommunities.filter(
      c => !joinedCommunityIds.has(c.id) && !eventBasedSuggestions.has(c.id)
    );

    const needed = 3 - finalSuggestions.length;
    finalSuggestions.push(...otherCandidates.slice(0, needed));
  }

  return finalSuggestions;
}

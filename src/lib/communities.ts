
import type { Community } from './types';

const initialCommunities: Community[] = [
  // Existing Communities
  {
    id: 'community-1',
    eventId: 'event-1',
    name: 'Rave Crew Berlin 🪩',
    description: 'Hier könnt ihr euch vor dem Event austauschen, Treffpunkte klären, etc. Für alle Techno-Fans.',
    imageUrl: '/images/techno-rave.jpg',
    members: ['user-1', 'user-2', 'user-3', 'user-ronny'],
    organizerId: 'user-basto',
  },
  {
    id: 'community-2',
    eventId: 'event-2',
    name: 'Akustik-Liebhaber 🎸',
    description: 'Für alle, die handgemachte Musik lieben. Lasst uns über die besten Plätze und die Vorbands quatschen.',
    imageUrl: '/images/akustik-open-air.jpg',
    members: ['user-1', 'user-4', 'user-ronny'],
    organizerId: 'user-4',
  },
  {
    id: 'community-3',
    eventId: 'event-3',
    name: 'Streetball-Junkies 🏀',
    description: 'Wer ist am Start? Lasst uns Teams bilden und über die besten Moves diskutieren. Sport ist unser Leben.',
    imageUrl: '/images/streetball-turnier.jpg',
    members: ['user-2', 'user-5', 'user-6'],
    organizerId: 'user-6',
  },
  {
    id: 'community-4',
    eventId: 'event-4',
    name: 'Code & Coffee 💻☕',
    description: 'Tauscht euch über die neuesten Tech-Trends aus und findet euren nächsten Coding-Buddy.',
    imageUrl: '/images/programmier-workshop.jpg',
    members: ['user-1', 'user-3', 'user-5'],
    organizerId: 'user-5',
  },

  // New Communities for Discovery
  {
    id: 'community-5',
    name: 'Jazz & Wein Abend 🎷🍷',
    description: 'Entspannte Abende mit Live-Jazz und guten Gesprächen. Wir teilen unsere Lieblings-Locations und Weine.',
    imageUrl: '/images/jazzabend.jpg',
    members: ['user-1', 'user-4'],
    organizerId: 'user-4',
    eventId: 'event-5',
  },
  {
    id: 'community-6',
    name: 'Moderne Kunst Entdecker 🎨',
    description: 'Folgt uns zu den spannendsten Ausstellungen und diskutiert über zeitgenössische Kunst und Museums-Besuche.',
    imageUrl: '/images/moderne-kunst.jpg',
    members: ['user-2', 'user-5'],
    organizerId: 'user-5',
    eventId: 'event-6',
  },
  {
    id: 'community-7',
    name: 'Indie-Nacht Schwärmer 🎶',
    description: 'Für alle Fans von Indie-Musik. Hier organisieren wir gemeinsame Konzertbesuche und Partys.',
    imageUrl: '/images/indie-nacht.jpg',
    members: ['user-3', 'user-6'],
    organizerId: 'user-6',
    eventId: 'event-7',
  },
  {
    id: 'community-8',
    name: 'Hallesche Foodies 🍔🌮',
    description: 'Wir testen uns durch die Restaurants und Street-Food-Märkte von Halle. Sei dabei!',
    imageUrl: '/images/street-food.jpg', 
    members: ['user-1', 'user-5'],
    organizerId: 'user-1',
    eventId: 'event-8',
  },
  {
    id: 'community-9',
    name: 'Yoga im Park 🧘‍♀️🌳',
    description: 'Gemeinsame Yoga-Sessions im Freien. Für Anfänger und Fortgeschrittene. Ein entspannter Sport.',
    imageUrl: '/images/yoga-im-park.jpg', 
    members: ['user-2', 'user-4', 'user-6'],
    organizerId: 'user-2',
    eventId: 'event-9',
  },
  {
    id: 'community-10',
    name: 'Brettspiel-Champions 🎲🏆',
    description: 'Organisiere und nimm an Spieleabenden teil. Von Catan bis zu den neuesten Kickstarter-Hits. Auch Quiz-Abende!',
    imageUrl: '/images/brettspiele.jpg', 
    members: ['user-3', 'user-5'],
    organizerId: 'user-3',
    eventId: 'event-10',
  },
  {
    id: 'community-11',
    name: 'Lauf-Treff Halle 🏃‍♂️💨',
    description: 'Egal ob 5km oder Marathon-Vorbereitung. Wir laufen gemeinsam an der Saale. Sport verbindet.',
    imageUrl: '/images/laufen.jpg', 
    members: ['user-1', 'user-6'],
    organizerId: 'user-6',
    eventId: 'event-11',
  },
  {
    id: 'community-12',
    name: 'Fotografie-Walks 📷',
    description: 'Entdecke die fotogensten Ecken von Halle und teile deine besten Aufnahmen. Kunst für alle.',
    imageUrl: '/images/fotografie.jpg', 
    members: ['user-4', 'user-5'],
    organizerId: 'user-4',
    eventId: 'event-12',
  },
  {
    id: 'community-13',
    name: 'Techno Bunker Crew',
    description: 'Hart, schnell und düster. Wir sind die Nachtschwärmer, die den Bass fühlen. Reine Techno-Partys.',
    imageUrl: '/images/techno-bunker.jpg',
    members: [],
    organizerId: 'user-ai',
    eventId: 'event-13',
  },
  {
    id: 'community-14',
    name: 'Kneipen-Quiz-Team Halle',
    description: 'Du weißt alles besser? Beweise es! Wir suchen kluge Köpfe für unser Quiz-Team. Nächster Termin: Irish Pub.',
    imageUrl: '/images/kneipenquiz.jpg',
    members: ['user-1'],
    organizerId: 'user-ai',
    eventId: 'event-14',
  },
  {
    id: 'community-15',
    name: 'Smooth Jazz Lounge',
    description: 'Für Liebhaber des sanften Jazz. Wir treffen uns in Bars mit Live-Musik und genießen den Abend.',
    imageUrl: '/images/smooth-jazz.jpg',
    members: ['user-4'],
    organizerId: 'user-ai',
    eventId: 'event-15',
  },
  {
    id: 'community-16',
    name: 'Museums-Freunde Halle',
    description: 'Von den Franckeschen Stiftungen bis zum Kunstmuseum Moritzburg. Wir entdecken die Kultur und Kunst unserer Stadt.',
    imageUrl: '/images/museum.jpg',
    members: ['user-2'],
    organizerId: 'user-ai',
    eventId: 'event-16',
  },
  {
    id: 'community-17',
    name: 'Halle 90s Party People',
    description: 'Zurück in die 90er! Wir feiern zu den Hits von damals und schwelgen in Erinnerungen. Trash-Party!',
    imageUrl: '/images/90er-party.jpg',
    members: [],
    organizerId: 'user-ai',
    eventId: 'event-17',
  },
  {
    id: 'community-18',
    name: 'Urban Sketchers Halle',
    description: 'Wir treffen uns, um die Stadt zu zeichnen. Jeder ist willkommen, egal ob Anfänger oder Profi. Kunst im Freien.',
    imageUrl: '/images/urban-sketching.jpg',
    members: ['user-5'],
    organizerId: 'user-ai',
    eventId: 'event-18',
  },
  {
    id: 'community-19',
    name: 'Volleyball am Heidesee',
    description: 'Sommer, Sonne, Sport! Wir suchen Mitspieler für entspannte Runden Beachvolleyball.',
    imageUrl: '/images/beachvolleyball.jpg',
    members: ['user-6'],
    organizerId: 'user-ai',
    eventId: 'event-19',
  },
  {
    id: 'community-20',
    name: 'Gaming & Pizza Abend 🍕🎮',
    description: 'Zocken, quatschen, Pizza essen. Von Mario Kart bis Elden Ring ist alles dabei. Gelegentliches Quiz inklusive.',
    imageUrl: '/images/gaming-pizza.jpg',
    members: ['user-3'],
    organizerId: 'user-ai',
    eventId: 'event-20',
  }
];


const getCommunitiesFromStorage = (): Community[] => {
  if (typeof window === 'undefined') {
    return initialCommunities;
  }
  const storedCommunities = localStorage.getItem('communities');
  if (storedCommunities) {
    try {
      const parsed = JSON.parse(storedCommunities);
      // Simple validation to ensure it's an array
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (e) {
      console.error("Failed to parse communities from localStorage", e);
      // If parsing fails, fall back to initial data
      localStorage.setItem('communities', JSON.stringify(initialCommunities));
      return initialCommunities;
    }
  }
  localStorage.setItem('communities', JSON.stringify(initialCommunities));
  return initialCommunities;
};

let communities: Community[] = getCommunitiesFromStorage();

const saveCommunitiesToStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('communities', JSON.stringify(communities));
  }
};

export const getCommunities = () => {
  communities = getCommunitiesFromStorage();
  return [...communities];
}

export const getCommunityById = (id: string) => {
    communities = getCommunitiesFromStorage();
    return communities.find((c) => c.id === id);
}

export const updateCommunity = (updatedCommunity: Community) => {
  const currentCommunities = getCommunitiesFromStorage();
  const index = currentCommunities.findIndex(c => c.id === updatedCommunity.id);
  if (index !== -1) {
    currentCommunities[index] = updatedCommunity;
    communities = currentCommunities;
    saveCommunitiesToStorage();
  }
};

export const getCommunityByEventId = (eventId: string) => {
    communities = getCommunitiesFromStorage();
    return communities.find((c) => c.eventId === eventId);
}

export const getCommunitiesByEventId = (eventId: string) => {
    communities = getCommunitiesFromStorage();
    return communities.filter((c) => c.eventId === eventId);
}

export const getCommunitiesByUserId = (userId: string) => {
  communities = getCommunitiesFromStorage();
  return communities.filter(c => c.members.includes(userId));
};

// This function is kept for historical/broader suggestion purposes if needed elsewhere.
export const getSuggestedCommunities = (userId: string) => {
  communities = getCommunitiesFromStorage();
  // Suggest communities the user is not a member of.
  return communities.filter(c => !c.members.includes(userId));
};

export const searchCommunities = async (searchTerm: string): Promise<Community[]> => {
  const allCommunities = getCommunitiesFromStorage();
  if (!searchTerm) {
    return [];
  }
  return allCommunities.filter(c =>
    (c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
};

export const joinCommunity = (communityId: string, userId: string) => {
  let currentCommunities = getCommunitiesFromStorage();
  const communityIndex = currentCommunities.findIndex(c => c.id === communityId);

  if (communityIndex !== -1 && !currentCommunities[communityIndex].members.includes(userId)) {
    // Create a new array with the updated community to ensure re-rendering
    const updatedCommunity = {
      ...currentCommunities[communityIndex],
      members: [...currentCommunities[communityIndex].members, userId]
    };
    const newCommunities = [
      ...currentCommunities.slice(0, communityIndex),
      updatedCommunity,
      ...currentCommunities.slice(communityIndex + 1)
    ];
    communities = newCommunities;
    saveCommunitiesToStorage();
    return communities;
  } 
  return currentCommunities; // Return original state if no change
}; 

export const leaveCommunity = (communityId: string, userId: string) => {
  let currentCommunities = getCommunitiesFromStorage();
  const communityIndex = currentCommunities.findIndex(c => c.id === communityId);

  if (communityIndex !== -1) {
    const updatedMembers = currentCommunities[communityIndex].members.filter(memberId => memberId !== userId);
    const updatedCommunity = {
      ...currentCommunities[communityIndex],
      members: updatedMembers
    };
    const newCommunities = [
      ...currentCommunities.slice(0, communityIndex),
      updatedCommunity,
      ...currentCommunities.slice(communityIndex + 1)
    ];
    communities = newCommunities;
    saveCommunitiesToStorage();
    return communities; 
  }

  return currentCommunities;
};


import { getEventById } from './events';
import { getUserById, getUsersByIds } from './users';
import type { Community, Message, User } from './types';


// Get a random member from the community, excluding the current user and optionally the organizer
const getRandomMember = (community: Community, currentUser: User, includeOrganizer: boolean = false): User | null => {
    let memberPool = community.members.filter(id => id !== currentUser.id);
    if (!includeOrganizer) {
        memberPool = memberPool.filter(id => id !== community.organizerId);
    }
    
    if (memberPool.length === 0) return null;
    
    const randomId = memberPool[Math.floor(Math.random() * memberPool.length)];
    return getUserById(randomId);
}

// Simple keyword-based response generation
function getResponse(message: string, community: Community, currentUser: User): { text: string; from: User } | null {
  const lowerCaseMessage = message.toLowerCase();
  const organizer = getUserById(community.organizerId);
  
  // Ensure organizer and other members exist and are actual users
  if (!organizer) return null;

  // Rule 1: Welcome message (from Organizer)
  if (lowerCaseMessage.includes('hallo') || lowerCaseMessage.includes('hey') || lowerCaseMessage.includes('servus')) {
    return {
      text: `Hallo ${currentUser.name} 👋 Herzlich willkommen in der ${community.name} Community!`,
      from: organizer,
    };
  }

  // Rule 2: Question about event details (from Organizer)
  if (lowerCaseMessage.includes('wann') || lowerCaseMessage.includes('uhr') || lowerCaseMessage.includes('start') || lowerCaseMessage.includes('wo')) {
    const event = getEventById(community.eventId);
    if (event) {
      if (lowerCaseMessage.includes('wo')) {
        return {
            text: `Das Event findet hier statt: ${event.location}. Wir sehen uns!`,
            from: organizer,
        };
      } else {
        return {
            text: `Das Event startet um ${event.time} Uhr. Sei am besten etwas früher da!`,
            from: organizer,
        };
      }
    }
  }

  // Rule 3: General excitement (from other members)
  if (lowerCaseMessage.includes('freu mich') || lowerCaseMessage.includes('heute abend') || lowerCaseMessage.includes('wird super')) {
    const randomMember = getRandomMember(community, currentUser);
    if (randomMember) {
        const responses = [
            'Auf jeden Fall! Das wird richtig gut 🔥',
            `Jaaa, ich kann's auch kaum erwarten, ${currentUser.name}! 🚀`,
            'Bin auch schon total gespannt!',
            'Das wird der Hammer!',
        ];
        return {
            text: responses[Math.floor(Math.random() * responses.length)],
            from: randomMember,
        };
    }
  }

  // Rule 4: Looking for people (from other members)
  if (lowerCaseMessage.includes('jemand da') || lowerCaseMessage.includes('wer ist schon da')) {
    const randomMember = getRandomMember(community, currentUser);
    if (randomMember) {
        const responses = [
            `Bin gleich da, ${currentUser.name}! Halte schonmal Ausschau.`,
            'Ich bin schon am Eingang. Wo bist du?',
            'Bin in 5 Minuten am Start.',
        ];
        return {
            text: responses[Math.floor(Math.random() * responses.length)],
            from: randomMember,
        };
    }
  }
  
  // Default fallback if no other rule matches (from any member, including organizer)
  const randomResponder = getRandomMember(community, currentUser, true);
  if (randomResponder) {
    const fallbacks = [
        `Sehe ich genauso, ${currentUser.name}! 👌`,
        'Absolut!',
        'Guter Punkt.',
        '👍',
    ];
    return {
        text: fallbacks[Math.floor(Math.random() * fallbacks.length)],
        from: randomResponder,
    };
  }

  return null;
}

// Main function to generate and send a reply
export function generateAndSendAiReply(
  community: Community,
  messages: Message[],
  currentUser: User,
  sendMessage: (text: string, isAutoReply: boolean, sender: User) => void
) {
  if (messages.length === 0) return;

  const lastMessage = messages[messages.length - 1];

  // Only reply to the last message if it was sent by the current user
  // and is not an auto-reply itself.
  if (lastMessage.senderId === currentUser.id) {
    const response = getResponse(lastMessage.text, community, currentUser);

    if (response && response.from) {
      // Prevent the AI from talking to itself
      if (messages.some(m => m.senderId === response.from.id && m.isAutoReply)) {
        return;
      }

      const timeoutId = setTimeout(() => {
        sendMessage(response.text, true, response.from);
      }, 1200 + Math.random() * 800); // Add some natural delay

      return () => clearTimeout(timeoutId);
    }
  }
}

import { db } from '@/lib/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  setDoc,
  orderBy
} from 'firebase/firestore';
import { getUserById } from './users';
import type { PrivateChat, User, PrivateChatPreview } from '@/lib/types';

// This function is not exported because it's a helper function for getOrCreatePrivateChat.
function getChatId(userId1: string, userId2: string): string {
  return [userId1, userId2].sort().join('--');
}

// This async function now correctly fetches the other user's data.
export async function getOtherUserInChat(chat: PrivateChat, currentUserId: string): Promise<User | null> {
    const otherUserId = chat.participants.find(p => p !== currentUserId);
    if (!otherUserId) return null;
    // Coalesce undefined to null to match the return type.
    const user = await getUserById(otherUserId);
    return user || null;
}

export async function getOrCreatePrivateChat(userId1: string, userId2: string): Promise<string> {
  const chatId = getChatId(userId1, userId2);
  const chatRef = doc(db, 'privateChats', chatId);
  const chatSnap = await getDoc(chatRef);

  if (chatSnap.exists()) {
    return chatId;
  } else {
    // Using setDoc with a specific ID to avoid creating a duplicate document
    await setDoc(chatRef, {
      participants: [userId1, userId2],
      lastUpdated: serverTimestamp(),
      lastMessage: 'Chat gestartet'
    });
    return chatId;
  }
}

export async function getPrivateChatsByUserId(userId: string): Promise<PrivateChatPreview[]> {
    const chatsRef = collection(db, 'privateChats');
    const q = query(chatsRef, where('participants', 'array-contains', userId), orderBy('lastUpdated', 'desc'));

    const querySnapshot = await getDocs(q);
    
    // Use Promise.all to fetch user data concurrently for better performance.
    const chats = await Promise.all(querySnapshot.docs.map(async (doc) => {
        const chatData = doc.data();
        const recipientId = chatData.participants.find((p: string) => p !== userId);
        
        if (!recipientId) return null;

        // Coalesce undefined to null to match the expected type.
        const recipient = (await getUserById(recipientId)) || null;

        if (!recipient) return null; // Gracefully handle cases where the recipient user is not found.

        return {
            id: doc.id,
            recipient: recipient,
            lastMessage: chatData.lastMessage || '',
            lastUpdated: chatData.lastUpdated?.toDate() || new Date(),
        };
    }));

    // Filter out any null results that occurred from missing data.
    return chats.filter((chat): chat is PrivateChatPreview => chat !== null);
}

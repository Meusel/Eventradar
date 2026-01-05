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

function getChatId(userId1: string, userId2: string): string {
  return [userId1, userId2].sort().join('--');
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
  const chats: PrivateChatPreview[] = [];

  for (const doc of querySnapshot.docs) {
    const chatData = doc.data();
    const recipientId = chatData.participants.find((p: string) => p !== userId);
    
    const recipient: User | null = recipientId ? (await getUserById(recipientId) || null) : null;

    if (recipient) {
      chats.push({
        id: doc.id,
        recipient: recipient,
        lastMessage: chatData.lastMessage || '',
        lastUpdated: chatData.lastUpdated?.toDate() || new Date(),
      });
    }
  }

  return chats;
}

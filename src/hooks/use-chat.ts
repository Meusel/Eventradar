import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase'; // Correctly import db
import { collection, query, onSnapshot, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import type { ChatMessage } from '@/lib/types';

// Mock current user - replace with your actual auth solution
const mockUser = {
  id: 'user-1', // Example user ID
  username: 'Alice',
  avatarUrl: 'https://github.com/alicenwonder.png'
};

export function useChat(communityId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!communityId) return;

    const q = query(collection(db, `communities/${communityId}/messages`), orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ChatMessage));
      setMessages(msgs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [communityId]);

  const sendMessage = async (text: string) => {
    if (!communityId || !text.trim()) return;

    // Use the mock user's data for sending the message
    const { id: senderId, username, avatarUrl } = mockUser;
    
    await addDoc(collection(db, `communities/${communityId}/messages`), {
      communityId,
      senderId,
      username,
      avatarUrl,
      text,
      timestamp: serverTimestamp(),
    });
  };

  return { messages, loading, sendMessage };
}

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import type { ChatMessage } from '@/lib/types';

export function useChat(communityId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!communityId) return;

    const q = query(collection(db, `communities/${communityId}/messages`), orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newMessages: ChatMessage[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        newMessages.push({
          id: doc.id,
          communityId,
          userId: data.userId,
          username: data.username,
          avatarUrl: data.avatarUrl,
          text: data.text,
          timestamp: data.timestamp?.toDate(),
        });
      });
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [communityId]);

  const sendMessage = async (text: string, userId: string, username: string, avatarUrl: string) => {
    if (!text.trim()) return;

    await addDoc(collection(db, `communities/${communityId}/messages`), {
      text,
      userId,
      username,
      avatarUrl,
      timestamp: serverTimestamp(),
    });
  };

  return { messages, sendMessage };
}

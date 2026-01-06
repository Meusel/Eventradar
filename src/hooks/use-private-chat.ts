import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase'; // Make sure you have firebase configured
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, orderBy, doc } from 'firebase/firestore';
import { PrivateChatMessage } from '@/lib/types';

export function usePrivateChat(chatId: string | null) {
  const [messages, setMessages] = useState<PrivateChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chatId) {
        setLoading(false);
        setMessages([]);
        return;
    }

    const q = query(collection(db, `privateChats/${chatId}/messages`), orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as PrivateChatMessage));
      setMessages(msgs);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching private chat messages: ", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async (text: string, senderId: string) => {
    if (!chatId) return;
    await addDoc(collection(db, `privateChats/${chatId}/messages`), {
      chatId: chatId,
      text,
      senderId,
      timestamp: serverTimestamp(),
    });
  };

  return { messages, loading, sendMessage };
}

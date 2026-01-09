'use client';

import { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import type { ChatMessage, User, Community } from '@/lib/types';
import { getUsersByIds } from '@/lib/users';

export function useChat(community: Community, currentUser: User) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!community.id) return;

    const q = query(collection(db, `communities/${community.id}/messages`), orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate(),
      } as ChatMessage));
      setMessages(msgs);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching chat messages: ", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, [community.id]);

  const sendMessage = useCallback(async (text: string, isAutoReply = false, sender?: User) => {
    if (!community.id || !text.trim() || (!currentUser && !isAutoReply)) return;

    const senderToUse = isAutoReply && sender ? sender : currentUser;
    if (!senderToUse) return;

    const { id: senderId, name: username, avatarUrl } = senderToUse;

    await addDoc(collection(db, `communities/${community.id}/messages`), {
      communityId: community.id,
      senderId,
      username,
      avatarUrl,
      text,
      timestamp: serverTimestamp(),
    });
  }, [community.id, currentUser]);

  // Auto-reply effect
  useEffect(() => {
    if (loading || messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];

    if (lastMessage.senderId === currentUser.id) {
        const otherMembers = getUsersByIds(community.members.filter(id => id !== currentUser.id));
        
        if (otherMembers.length > 0) {
            const randomMember = otherMembers[Math.floor(Math.random() * otherMembers.length)];
            
            const replyText = `Hey ${currentUser.name}, danke für deine Nachricht! Wir freuen uns, dich in der Community zu haben.`;

            const timeoutId = setTimeout(() => {
                sendMessage(replyText, true, randomMember);
            }, 1500); // 1.5-second delay

            return () => clearTimeout(timeoutId);
        }
    }
}, [messages, community, currentUser, sendMessage, loading]);


  return { messages, loading, sendMessage };
}

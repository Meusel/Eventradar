'use client';

import { useState, useEffect } from 'react';
import { usePrivateChat } from '@/hooks/use-private-chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { User } from '@/lib/types';
import { getOrCreatePrivateChat } from '@/lib/chats';

interface PrivateChatProps {
  recipientId: string;
  currentUserId: string;
}

export default function PrivateChat({ recipientId, currentUserId }: PrivateChatProps) {
  const [chatId, setChatId] = useState<string | null>(null);
  const { messages, sendMessage } = usePrivateChat(chatId);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    async function setupChat() {
      const id = await getOrCreatePrivateChat(currentUserId, recipientId);
      setChatId(id);
    }
    setupChat();
  }, [currentUserId, recipientId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() !== '' && chatId) {
      sendMessage(newMessage, currentUserId);
      setNewMessage('');
    }
  };

  // Dummy user data - in a real app, you would fetch this based on IDs
  const recipient: User = { id: recipientId, name: 'Recipient', avatarUrl: 'https://github.com/shadcn.png' };
  const currentUser: User = { id: currentUserId, name: 'You', avatarUrl: 'https://github.com/shadcn.png' };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message: any) => (
          <div key={message.id} className={`flex items-start gap-3 ${message.senderId === currentUser.id ? 'justify-end' : ''}`}>
            {message.senderId !== currentUser.id && (
              <img src={recipient.avatarUrl} alt={recipient.name} className="w-8 h-8 rounded-full" />
            )}
            <div className={`p-3 rounded-lg max-w-xs ${message.senderId === currentUser.id ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              <p>{message.text}</p>
              <p className="text-xs text-muted-foreground/80 mt-1">
                {message.timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            {message.senderId === currentUser.id && (
              <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-8 h-8 rounded-full" />
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex items-center gap-2 border-t p-4">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Nachricht schreiben..."
          className="flex-1"
          disabled={!chatId}
        />
        <Button type="submit" size="icon" disabled={!chatId || !newMessage.trim()}>
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}

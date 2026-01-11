'use client';

import { useState } from 'react';
import { useChat } from '@/hooks/use-chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { Community, User } from '@/lib/types';

interface ChatProps {
  community: Community;
  currentUser: User;
}

export default function Chat({ community, currentUser }: ChatProps) {
  const { messages, sendMessage } = useChat(community, currentUser);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    sendMessage(newMessage);
    setNewMessage('');
  };

  const isMember = community.members.includes(currentUser.id);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex items-start gap-3 ${message.senderId === currentUser.id ? 'justify-end' : ''}`}>
            {message.senderId !== currentUser.id && (
              <img src={message.avatarUrl} alt={message.username} className="w-8 h-8 rounded-full object-cover" />
            )}
            <div className={`p-3 rounded-lg max-w-xs ${message.senderId === currentUser.id ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <div className="flex items-center gap-2">
                    <p className="font-bold text-sm">{message.senderId === currentUser.id ? 'Du' : message.username}</p>
                    {message.senderId === community.organizerId && (
                        <span className="text-xs font-medium bg-secondary text-secondary-foreground py-0.5 px-1.5 rounded-full">
                        Veranstalter
                        </span>
                    )}
                </div>
              <p className="mt-1">{message.text}</p>
              <p className="text-xs text-muted-foreground/80 mt-1 text-right">
                {message.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            {message.senderId === currentUser.id && (
              <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-8 h-8 rounded-full object-cover" />
            )}
          </div>
        ))}
      </div>
      {isMember ? (
        <form onSubmit={handleSendMessage} className="flex items-center gap-2 border-t p-4">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Nachricht schreiben..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </form>
      ) : (
        <div className="border-t p-4 text-center text-muted-foreground">
          Nur Mitglieder können in diesem Chat schreiben.
        </div>
      )}
    </div>
  );
}

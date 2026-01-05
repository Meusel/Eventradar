'use client';

import { useState } from 'react';
import { useChat } from '@/hooks/use-chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatProps {
  communityId: string;
  // This would come from your auth solution
  currentUser: {
      id: string;
      name: string;
      avatarUrl: string;
  }
}

export default function Chat({ communityId, currentUser }: ChatProps) {
  const { messages, sendMessage } = useChat(communityId);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(newMessage, currentUser.id, currentUser.name, currentUser.avatarUrl);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
            <div key={message.id} className={`flex items-start gap-3 ${message.userId === currentUser.id ? 'justify-end' : ''}`}>
                {message.userId !== currentUser.id && (
                    <img src={message.avatarUrl} alt={message.username} className="w-8 h-8 rounded-full"/>
                )}
                <div className={`p-3 rounded-lg max-w-xs ${message.userId === currentUser.id ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <p className="font-bold text-sm">{message.userId === currentUser.id ? 'You' : message.username}</p>
                    <p>{message.text}</p>
                    <p className="text-xs text-muted-foreground/80 mt-1">
                        {message.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
                 {message.userId === currentUser.id && (
                    <img src={message.avatarUrl} alt={message.username} className="w-8 h-8 rounded-full"/>
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
            />
            <Button type="submit" size="icon">
                <Send className="h-5 w-5" />
            </Button>
      </form>
    </div>
  );
}

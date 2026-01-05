'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPrivateChatById, getOtherUserInChat } from '@/lib/chats';
import type { PrivateChat } from '@/lib/chats';
import { User, getUserById } from '@/lib/users';
import Header from '@/components/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function PrivateChatPage() {
  const params = useParams();
  const router = useRouter();
  const chatId = params.id as string;

  const [chat, setChat] = useState<PrivateChat | null>(null);
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [newMessage, setNewMessage] = useState('');
  
  // Mock current user. In a real app, this would come from your auth solution.
  const currentUser = getUserById('user-1')!;

  useEffect(() => {
    if (chatId) {
      const foundChat = getPrivateChatById(chatId);
      setChat(foundChat || null);
      if (foundChat) {
        const other = getOtherUserInChat(foundChat, currentUser.id);
        setOtherUser(other);
      }
    }
  }, [chatId, currentUser.id]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !chat) return;

    const message = {
        senderId: currentUser.id,
        text: newMessage,
        timestamp: new Date(),
    };

    // In a real app, you would send this message to your backend/Firebase
    // For now, we just update the local state
    setChat(prevChat => prevChat ? { ...prevChat, messages: [...prevChat.messages, message] } : null);
    setNewMessage('');
  };

  if (!chat || !otherUser) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header />
            <main className="flex-1 bg-background">
                <div className="container mx-auto max-w-2xl px-4 py-8 text-center">
                     <p className="text-muted-foreground">Chat nicht gefunden.</p>
                     <Button variant="ghost" onClick={() => router.back()} className="mt-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Zurück
                    </Button>
                </div>
            </main>
        </div>
    );
  }

  return (
     <div className="flex min-h-screen w-full flex-col">
        <Header />
        <main className="flex-1 bg-background">
            <div className="container mx-auto max-w-2xl px-0 py-0">
                 <div className="flex h-[90vh] flex-col rounded-lg border bg-card shadow-lg">
                    {/* Chat Header */}
                    <div className="flex items-center gap-4 border-b p-4">
                        <Button variant="ghost" size="icon" onClick={() => router.push('/chats')}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <Avatar>
                            <AvatarImage src={otherUser.avatarUrl} alt={otherUser.name} />
                            <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h2 className="text-xl font-bold font-headline">{otherUser.name}</h2>
                    </div>

                    {/* Messages */}
                     <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {chat.messages.map((message, index) => (
                        <div key={index} className={`flex items-start gap-3 ${message.senderId === currentUser.id ? 'justify-end' : ''}`}>
                            {message.senderId !== currentUser.id && (
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={otherUser.avatarUrl} alt={otherUser.name}/>
                                    <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            )}
                            <div className={`p-3 rounded-lg max-w-md ${message.senderId === currentUser.id ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                <p>{message.text}</p>
                                <p className="text-xs text-muted-foreground/80 mt-1 text-right">
                                    {message.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                            {message.senderId === currentUser.id && (
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name}/>
                                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                        ))}
                    </div>

                    {/* Input Form */}
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
            </div>
        </main>
    </div>
  );
}

'use client';

import { PrivateChat, getOtherUserInChat } from "@/lib/chats";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';

interface PrivateChatListProps {
  chats: PrivateChat[];
  currentUserId: string;
}

export default function PrivateChatList({ chats, currentUserId }: PrivateChatListProps) {
  return (
    <div className="space-y-2">
      {chats.map((chat) => {
        const otherUser = getOtherUserInChat(chat, currentUserId);
        const lastMessage = chat.messages[chat.messages.length - 1];

        if (!otherUser) return null;

        return (
          <Link href={`/chats/${chat.id}`} key={chat.id}>
            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
              <Avatar className="h-12 w-12">
                <AvatarImage src={otherUser.avatarUrl} alt={otherUser.name} />
                <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold truncate">{otherUser.name}</p>
                    <p className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDistanceToNow(lastMessage.timestamp, { addSuffix: true, locale: de })}
                    </p>
                  </div>
                <p className="text-sm text-muted-foreground truncate">
                  {lastMessage.senderId === currentUserId && 'Du: '} 
                  {lastMessage.text}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

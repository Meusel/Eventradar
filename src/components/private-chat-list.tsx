import { User } from "@/lib/types";

interface PrivateChatListProps {
  chats: { user: User; lastMessage: string }[];
}

export default function PrivateChatList({ chats }: PrivateChatListProps) {
  return (
    <div>
      {chats.map((chat) => (
        <div key={chat.user.id} className="flex items-center p-2 rounded-lg hover:bg-muted">
          <img src={chat.user.avatarUrl} alt={chat.user.name} className="w-10 h-10 rounded-full mr-4" />
          <div>
            <p className="font-semibold">{chat.user.name}</p>
            <p className="text-sm text-muted-foreground">{chat.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

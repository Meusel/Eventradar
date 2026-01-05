import { getUserById } from "./users";

export type PrivateChat = {
  id: string;
  userIds: string[];
  messages: {
    senderId: string;
    text: string;
    timestamp: Date;
  }[];
};

export const privateChats: PrivateChat[] = [
  {
    id: 'chat-1',
    userIds: ['user-1', 'user-2'],
    messages: [
        { senderId: 'user-1', text: 'Hey Ben, freust du dich schon auf die Indie-Nacht?', timestamp: new Date(new Date().getTime() - 1000 * 60 * 60 * 24) },
        { senderId: 'user-2', text: 'Hey Alice! Absolut, wird sicher mega. Wo treffen wir uns?', timestamp: new Date(new Date().getTime() - 1000 * 60 * 60 * 23) },
    ]
  },
    {
    id: 'chat-2',
    userIds: ['user-1', 'user-4'],
    messages: [
        { senderId: 'user-4', text: 'Hi Alice, hast du schon eine Idee für unser Projekt beim Programmier-Workshop?', timestamp: new Date(new Date().getTime() - 1000 * 60 * 30) },
        { senderId: 'user-1', text: 'Hey Dana, ich hab mir schon ein paar Gedanken gemacht. Lass uns morgen mal quatschen!', timestamp: new Date(new Date().getTime() - 1000 * 60 * 25) },
    ]
  }
];

export const getPrivateChatsByUserId = (userId: string) => privateChats.filter(chat => chat.userIds.includes(userId));

export const getPrivateChatById = (id: string) => privateChats.find(chat => chat.id === id);

export const getOtherUserInChat = (chat: PrivateChat, currentUserId: string) => {
    const otherUserId = chat.userIds.find(id => id !== currentUserId);
    return otherUserId ? getUserById(otherUserId) : null;
};

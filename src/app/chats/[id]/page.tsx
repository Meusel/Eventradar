'use client';
import { useParams } from 'next/navigation';
import PrivateChat from '@/components/private-chat';
import { getUserById } from '@/lib/users';
import { User } from '@/lib/types';
import { useEffect, useState } from 'react';
import Header from '@/components/header';

// This is a mock, in a real app you'd get this from your auth context
const MOCK_CURRENT_USER_ID = 'user-1';

export default function PrivateChatPage() {
  const params = useParams();
  const recipientId = params.id as string;
  const [recipient, setRecipient] = useState<User | null>(null);

  useEffect(() => {
    if (recipientId) {
      const user = getUserById(recipientId);
      if(user) {
          setRecipient(user);
      }
    }
  }, [recipientId]);

  if (!recipient) {
    return <div className="text-center p-8">Lade Chat...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
        <Header />
        <div className="flex-1 flex flex-col bg-muted/40">
             <div className="border-b p-4 bg-background shadow-sm">
                <h2 className="font-bold text-xl text-center">{recipient.name}</h2>
            </div>
            <PrivateChat recipientId={recipient.id} currentUserId={MOCK_CURRENT_USER_ID} />
        </div>
    </div>
  );
}

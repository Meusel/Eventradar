'use client';

import CommunityFeed from "@/components/community-feed";
import PrivateChatList from "@/components/private-chat-list";
import Header from "@/components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Users } from "lucide-react";
import { getCommunities } from "@/lib/communities";
import { getPrivateChatsByUserId } from "@/lib/chats";

export default function ChatsPage() {
    // Mock current user. In a real app, this would come from your auth solution.
    const currentUserId = 'user-1';

    const communities = getCommunities(); // In a real app, you'd likely fetch communities the user is a member of
    const privateChats = getPrivateChatsByUserId(currentUserId);

    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header />
            <main className="flex-1 bg-background">
                <div className="container mx-auto max-w-4xl px-4 py-8">
                    <h1 className="text-3xl font-bold mb-6 font-headline">Chats & Communities</h1>
                    <Tabs defaultValue="communities" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="communities">
                                <Users className="mr-2 h-4 w-4"/>
                                Communities
                            </TabsTrigger>
                            <TabsTrigger value="private">
                                <MessageSquare className="mr-2 h-4 w-4"/>
                                Private Chats
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="communities" className="mt-6">
                            <CommunityFeed communities={communities} />
                        </TabsContent>
                        <TabsContent value="private" className="mt-6">
                            <PrivateChatList chats={privateChats} currentUserId={currentUserId} />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
}

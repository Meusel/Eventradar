
import Header from "@/components/header";
import { Suspense } from "react";
import MyCommunities from "@/components/my-communities";
import SuggestedCommunities from "@/components/suggested-communities";
import DiscoverCommunities from "@/components/discover-communities";

// Mock current user ID, replace with your actual auth logic
const MOCK_CURRENT_USER_ID = 'user-1';

async function Chats() {
    return (
        <div className="h-screen bg-muted/40">
            <Header />
            <main className="p-4">
                <h1 className="text-2xl font-bold mb-4">Deine Communities</h1>
                <MyCommunities userId={MOCK_CURRENT_USER_ID} />
                <SuggestedCommunities userId={MOCK_CURRENT_USER_ID} />
                <DiscoverCommunities userId={MOCK_CURRENT_USER_ID} />
            </main>
        </div>
    );
}

// Use a loading fallback for better user experience
function Loading() {
    return (
        <div className="h-screen bg-muted/40">
            <Header />
            <main className="p-4">
                <h1 className="text-2xl font-bold mb-4">Deine Chats</h1>
                <div className="text-center p-8">Lade Chats...</div>
            </main>
        </div>
    )
}

export default function ChatsPage() {
    return (
        <Suspense fallback={<Loading />}>
            <Chats />
        </Suspense>
    )
}

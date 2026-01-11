
import { getSuggestedCommunities } from "@/lib/communities";
import { Community } from "@/lib/types";
import { Button } from "./ui/button";

async function handleJoinCommunity(communityId: string) {
  "use server";
  // will implement in the next step
}

export default async function SuggestedCommunities({ userId }: { userId: string }) {
  const communities = await getSuggestedCommunities(userId);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Vorgeschlagene Communities</h2>
      <div className="grid grid-cols-1 gap-4">
        {communities.map((community: Community) => (
          <div key={community.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <h3 className="font-bold">{community.name}</h3>
              <p className="text-sm text-muted-foreground">{community.description}</p>
            </div>
            <form action={async () => { await handleJoinCommunity(community.id) }}>
              <Button>Beitreten</Button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

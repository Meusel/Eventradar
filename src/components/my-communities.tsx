
import { getCommunitiesByUserId } from "@/lib/communities";
import { Community } from "@/lib/types";
import Link from "next/link";

export default async function MyCommunities({ userId }: { userId: string }) {
  const communities = await getCommunitiesByUserId(userId);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Meine Communities</h2>
      <div className="grid grid-cols-1 gap-4">
        {communities.map((community: Community) => (
          <Link href={`/communities/${community.id}`} key={community.id}>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold">{community.name}</h3>
              <p className="text-sm text-muted-foreground">{community.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

import { Community } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface CommunityFeedProps {
  communities: Community[];
}

export default function CommunityFeed({ communities }: CommunityFeedProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {communities.map((community) => (
        <Card key={community.id} className="overflow-hidden">
          <Image
            src={community.imageUrl}
            alt={community.name}
            width={400}
            height={200}
            className="w-full h-40 object-cover"
          />
          <CardHeader>
            <CardTitle>{community.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{community.description}</p>
            <div className="mt-4">
              <p className="text-sm font-semibold">{community.members.length} Mitglieder</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

import { Community } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface CommunityFeedProps {
  communities: Community[];
}

export default function CommunityFeed({ communities }: CommunityFeedProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {communities.map((community) => (
        <Link key={community.id} href={`/communities/${community.id}`} className="block hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
            <Card className="overflow-hidden h-full">
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
        </Link>
      ))}
    </div>
  );
}

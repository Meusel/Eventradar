import { Community } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface CommunitySuggestionsProps {
  communities: Community[];
  title: string;
  onJoin: (communityId: string) => void; // Callback to notify parent of join
}

export default function CommunitySuggestions({ communities, title, onJoin }: CommunitySuggestionsProps) {
  if (communities.length === 0) {
    return null;
  }

  const handleJoinClick = (e: React.MouseEvent, communityId: string) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Stop event bubbling
    onJoin(communityId);
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold font-headline mb-4">{title}</h2>
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
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-sm font-semibold">{community.members.length} Mitglieder</p>
                    <Button onClick={(e) => handleJoinClick(e, community.id)}>Beitreten</Button>
                  </div>
                </CardContent>
              </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

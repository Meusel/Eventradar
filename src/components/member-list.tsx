import { User } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { MessageCircle, Crown } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";

interface MemberListProps {
  members: User[];
  organizerId: string;
  currentUser: User;
}

export default function MemberList({ members, organizerId, currentUser }: MemberListProps) {
  const sortedMembers = [...members].sort((a, b) => {
    if (a.id === organizerId) return -1;
    if (b.id === organizerId) return 1;
    if (a.id === currentUser.id) return -1;
    if (b.id === currentUser.id) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-4">
      {sortedMembers.map((member) => (
        <div key={member.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={member.profileStatus === 'public' ? member.avatarUrl : ''} alt={member.name} />
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-2">
                <p className="font-semibold">
                    {member.id === currentUser.id ? 'Du' : (member.profileStatus === 'public' ? member.name : 'Anonymer Teilnehmer')}
                </p>
                {member.id === organizerId && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                        <Crown className="h-4 w-4" />
                        Veranstalter
                    </Badge>
                )}
            </div>
          </div>
          {member.profileStatus === 'public' && member.id !== currentUser.id && (
            <Link href={`/chats/${member.id}`} passHref>
              <Button variant="ghost" size="icon">
                <MessageCircle className="h-5 w-5 text-muted-foreground" />
              </Button>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

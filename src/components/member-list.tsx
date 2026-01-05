import { User } from "@/lib/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";

interface MemberListProps {
  members: User[];
}

export default function MemberList({ members }: MemberListProps) {
  return (
    <div className="space-y-4">
      {members.map((member) => (
        <div key={member.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={member.profileStatus === 'public' ? member.avatarUrl : ''} alt={member.name} />
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">
                {member.profileStatus === 'public' ? member.name : 'Anonymer Teilnehmer'}
              </p>
              <p className="text-xs text-muted-foreground">
                  {member.profileStatus === 'public' ? 'Öffentliches Profil' : 'Privates Profil'}
              </p>
            </div>
          </div>
          {member.profileStatus === 'public' && (
            // In a real app, this would initiate a private chat
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-5 w-5 text-muted-foreground" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}

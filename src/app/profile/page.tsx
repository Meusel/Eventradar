
import { UserProfile } from "@/components/user-profile";
import CookieSettings from "@/components/cookie-settings";

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-12">
      <UserProfile />
      <CookieSettings />
    </div>
  );
}

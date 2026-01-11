
import Link from "next/link";
import { User } from "lucide-react";
import Image from "next/image";

const EventradarLogo = () => (
    <Image src="/logo.png" alt="Eventradar Logo" width={32} height={32} />
);

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <EventradarLogo />
          <span className="text-xl font-bold font-headline tracking-tighter">
            Eventradar
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/profile">
            <User className="h-8 w-8 text-primary" />
          </Link>
        </div>
      </div>
    </header>
  );
}

'use client';

import { Compass, Home as HomeIcon, MessageSquare, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function BottomNav() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    let activeView = '';
    if (pathname === '/') {
        activeView = searchParams?.get('view') || 'home';
    } else if (pathname === '/discover') {
        activeView = 'discover';
    }

    const getLinkClass = (view: string) => {
        return `flex flex-col h-full justify-center gap-1 ${
            activeView === view ? "text-primary" : ""
        }`;
    }

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 max-w-7xl items-center justify-around px-4">
        <Button variant="ghost" asChild className={getLinkClass("home")}>
            <Link href="/">
                <HomeIcon className="h-6 w-6" />
                <span className="text-xs">Home</span>
            </Link>
        </Button>
        <Button variant="ghost" asChild className={getLinkClass("search")}>
          <Link href="/?view=search">
            <Search className="h-6 w-6" />
            <span className="text-xs">Suche</span>
          </Link>
        </Button>
        <Button variant="ghost" asChild className={getLinkClass("chat")}>
            <Link href="/?view=chat">
                <MessageSquare className="h-6 w-6" />
                <span className="text-xs">Chat</span>
            </Link>
        </Button>
        <Button variant="ghost" asChild className={getLinkClass("recommendations")}>
          <Link href="/?view=recommendations">
            <Sparkles className="h-6 w-6" />
            <span className="text-xs">Für Dich</span>
          </Link>
        </Button>
        <Button variant="ghost" asChild className={getLinkClass("discover")}>
          <Link href="/discover">
            <Compass className="h-6 w-6" />
            <span className="text-xs">Entdecken</span>
          </Link>
        </Button>
      </nav>
    </footer>
  );
}

'use client';

import { Twitter, Facebook, Share2, Instagram } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export default function SocialShareButtons() {
  const { toast } = useToast();
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // This runs only on the client, after hydration
    setCurrentUrl(window.location.href);
  }, []);

  const copyToClipboard = () => {
    if (currentUrl) {
      navigator.clipboard.writeText(currentUrl);
      toast({
        title: "Link kopiert!",
        description: "Die Event-URL wurde in deine Zwischenablage kopiert.",
      });
    }
  };

  return (
    <div className="text-center">
      <p className="mb-2 text-sm font-semibold text-muted-foreground">
        Mit Freunden teilen
      </p>
      <div className="flex justify-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              currentUrl
            )}&text=${encodeURIComponent("Schau dir dieses Event an!")}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Auf Twitter teilen"
          >
            <Twitter className="h-5 w-5" />
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              currentUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Auf Facebook teilen"
          >
            <Facebook className="h-5 w-5" />
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              `Schau dir dieses Event an: ${currentUrl}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Auf WhatsApp teilen"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="white"
            >
              <title>WhatsApp</title>
              <path d="M12.04 2.02c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.42 1.29 4.86L2.02 22l5.3-1.39a9.87 9.87 0 0 0 4.72 1.21h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zM12.04 20.15c-1.57 0-3.08-.39-4.4-1.1L6.4 19.6l.57-1.24a8.03 8.03 0 0 1-1.66-4.63c0-4.43 3.6-8.03 8.03-8.03s8.03 3.6 8.03 8.03-3.6 8.03-8.03 8.03zM17.39 14.1c-.26-.13-1.55-.77-1.79-.85-.24-.08-.42-.13-.59.13-.18.26-.68.85-.83 1.02-.15.18-.3.19-.56.06-.26-.12-1.09-.4-2.08-1.28-.77-.69-1.29-1.54-1.44-1.8-.15-.26 0-.4.12-.53s.26-.3.39-.45c.1-.12.18-.26.26-.42s.04-.3-.02-.42c-.06-.12-.59-1.42-.81-1.95-.22-.53-.45-.46-.59-.46h-.51c-.18 0-.42.06-.65.3.23.24-.89 1.1-.89 2.68s.92 3.11 1.05 3.32c.13.21 1.79 2.74 4.34 3.83.6.26 1.08.42 1.45.53.62.19 1.18.16 1.62.1.48-.06 1.55-.63 1.77-1.23.22-.6.22-1.11.15-1.23-.07-.12-.25-.19-.51-.32z"/>
            </svg>
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <a
            href={`https://www.instagram.com`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Auf Instagram teilen"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={copyToClipboard}
          aria-label="Link kopieren"
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

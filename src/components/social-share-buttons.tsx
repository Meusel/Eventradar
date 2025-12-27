"use client";

import { Twitter, Facebook, Share2 } from "lucide-react";
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

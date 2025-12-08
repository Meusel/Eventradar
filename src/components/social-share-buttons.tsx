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
        title: "Link Copied!",
        description: "The event URL has been copied to your clipboard.",
      });
    }
  };

  return (
    <div className="text-center">
      <p className="mb-2 text-sm font-semibold text-muted-foreground">
        Share with friends
      </p>
      <div className="flex justify-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              currentUrl
            )}&text=${encodeURIComponent("Check out this event!")}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Twitter"
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
            aria-label="Share on Facebook"
          >
            <Facebook className="h-5 w-5" />
          </a>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={copyToClipboard}
          aria-label="Copy link"
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

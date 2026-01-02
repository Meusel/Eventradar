"use client";
import { Sparkles, PartyPopper, Music, Palette, Loader } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { getEventRecommendations } from "@/ai/ai-event-recommendations";
import { Checkbox } from "./ui/checkbox";
import Link from "next/link";

export default function AiRecommendations() {
  const [interests, setInterests] = useState("");
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);

  const handleGetRecommendations = async () => {
    if (!interests || !hasConsented) return;
    setIsLoading(true);
    setRecommendations([]);
    try {
      const result = await getEventRecommendations({
        location: "Halle (Saale)",
        interests: interests,
      });
      setRecommendations(result.recommendations);
    } catch (error) {
      console.error("Failed to get recommendations:", error);
      // Optional: Handle error in UI
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full bg-gradient-to-br from-accent/20 to-transparent shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Sparkles className="h-6 w-6 text-accent" />
          Für Dich
        </CardTitle>
        <CardDescription>
          KI-basierte Vorschläge basierend auf deinen Interessen.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Gib deine Interessen ein, z.B. 'Techno, Kunstausstellungen, Live-Musik'..."
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />
        <div className="flex items-center space-x-2">
            <Checkbox id="terms" onCheckedChange={(checked) => setHasConsented(checked as boolean)} />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Ich stimme der Verarbeitung meiner Interessen gemäß der{' '}
              <Link href="/privacy" className="underline">
                Datenschutzerklärung
              </Link>{' '}
              zu.
            </label>
        </div>
        <Button
          variant="accent"
          className="w-full"
          onClick={handleGetRecommendations}
          disabled={isLoading || !interests || !hasConsented}
        >
          {isLoading ? (
            <Loader className="h-5 w-5 animate-spin" />
          ) : (
            "Empfehlungen erhalten"
          )}
        </Button>
        {recommendations.length > 0 && (
          <ul className="space-y-3 pt-4">
            {recommendations.map((rec, index) => (
              <li
                key={index}
                className="flex items-center gap-3 text-sm font-medium"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <PartyPopper className="h-5 w-5" />
                </div>
                <span className="flex-1">{rec}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

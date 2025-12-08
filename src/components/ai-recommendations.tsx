import { Sparkles, PartyPopper, Music, Palette } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

const recommendations = [
  { title: "Geheime Lagerhaus-Party", icon: PartyPopper },
  { title: "Jazz Jam Session", icon: Music },
  { title: "Live-Töpferei-Demo", icon: Palette },
];

export default function AiRecommendations() {
  return (
    <Card className="bg-gradient-to-br from-accent/20 to-transparent shadow-lg">
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
        <ul className="space-y-3">
          {recommendations.map((rec, index) => (
            <li
              key={index}
              className="flex items-center gap-3 text-sm font-medium"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <rec.icon className="h-5 w-5" />
              </div>
              <span className="flex-1">{rec.title}</span>
            </li>
          ))}
        </ul>
        <Button variant="accent" size="sm" className="w-full">
          Interessen anpassen
        </Button>
      </CardContent>
    </Card>
  );
}

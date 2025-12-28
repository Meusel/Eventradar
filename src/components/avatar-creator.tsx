
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";

const animals = [
  { id: "dog", name: "Hund", emoji: "🐶" },
  { id: "cat", name: "Katze", emoji: "🐱" },
  { id: "rabbit", name: "Hase", emoji: "🐰" },
  { id: "turtle", name: "Schildkröte", emoji: "🐢" },
  { id: "bird", name: "Vogel", emoji: "🐦" },
];

const colors = [
  { id: "8d55d3", name: "Lila" },
  { id: "60a5fa", name: "Blau" },
  { id: "34d399", name: "Grün" },
  { id: "fbbf24", name: "Gelb" },
  { id: "fb7185", name: "Pink" },
];

interface AvatarCreatorProps {
  onAvatarCreate: (avatarUrl: string) => void;
}

export function AvatarCreator({ onAvatarCreate }: AvatarCreatorProps) {
  const [animalId, setAnimalId] = useState(animals[0].id);
  const [color, setColor] = useState(colors[0].id);

  const generateAvatarUrl = (seed: string, backgroundColor: string, fontColor: string = "ffffff", fontSize: number = 50) => {
    const baseUrl = "https://api.dicebear.com/8.x/initials/svg";
    const params = new URLSearchParams({
      seed,
      backgroundColor: backgroundColor.replace("#", ""),
      fontColor: fontColor.replace("#", ""),
      radius: "50",
      fontSize: fontSize.toString(),
    }).toString();
    return `${baseUrl}?${params}`;
  };

  const handleCreateAvatar = () => {
    const currentAnimal = animals.find((a) => a.id === animalId);
    if (currentAnimal) {
      const avatarUrl = generateAvatarUrl(currentAnimal.emoji, color);
      onAvatarCreate(avatarUrl);
    }
  };
  
  const selectedAnimal = animals.find((a) => a.id === animalId)!;

  return (
    <DialogContent className="max-w-lg">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-center">Wähle deinen Tier-Avatar</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col items-center justify-center p-6 space-y-8">
        <div className="w-48 h-48 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
          <img src={generateAvatarUrl(selectedAnimal.emoji, color)} alt="Avatar preview" className="w-full h-full" />
        </div>

        <div className="w-full space-y-6">
          <div>
            <h4 className="font-semibold mb-3 text-center text-gray-600">1. Wähle ein Tier</h4>
            <div className="flex flex-wrap gap-3 justify-center">
              {animals.map((a) => (
                <Button
                  key={a.id}
                  variant={animalId === a.id ? "default" : "outline"}
                  onClick={() => setAnimalId(a.id)}
                  className="w-24 h-24 flex flex-col items-center justify-center text-sm p-2"
                >
                  <img 
                    src={generateAvatarUrl(a.emoji, animalId === a.id ? '8d55d3' : 'f1f5f9', animalId === a.id ? 'ffffff' : '0f172a', 40)}
                    alt={a.name}
                    className="w-12 h-12 mb-1 rounded-full"
                  />
                  {a.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-center text-gray-600">2. Wähle eine Farbe</h4>
            <div className="flex flex-wrap gap-3 justify-center">
              {colors.map((c) => (
                <Button
                  key={c.id}
                  variant={color === c.id ? "default" : "outline"}
                  onClick={() => setColor(c.id)}
                  className="w-12 h-12 rounded-full border-2"
                  style={{ backgroundColor: `#${c.id}` }}
                >
                  &nbsp;
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <DialogFooter className="mt-6 sm:justify-center">
        <DialogClose asChild>
          <Button variant="outline" className="w-full sm:w-auto">Abbrechen</Button>
        </DialogClose>
        <Button onClick={handleCreateAvatar} className="w-full sm:w-auto">Übernehmen</Button>
      </DialogFooter>
    </DialogContent>
  );
}

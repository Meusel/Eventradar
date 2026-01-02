
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { X, Users, Lock, Trash2, Edit, Pause, ShieldCheck } from "lucide-react";

export function UserProfile() {
  const [isPublic, setIsPublic] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Ronny Müller");
  const [email, setEmail] = useState("ronny.mueller@example.com");
  const [avatarUrl, setAvatarUrl] = useState("https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop");
  const [allowDataSharing, setAllowDataSharing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = () => {
    setIsEditing(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleRemoveAvatar = () => {
    setAvatarUrl("");
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto my-8 relative">
      <div className="absolute top-4 right-4">
        <Link href="/" passHref>
          <Button variant="ghost" size="icon">
            <X className="h-6 w-6 text-gray-500" />
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-center space-y-4 mb-8">
        <div className="relative cursor-pointer" onClick={handleAvatarClick}>
          <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
            <AvatarImage src={avatarUrl} alt="User avatar" className="object-cover"/>
            <AvatarFallback className="text-4xl bg-purple-500 text-white">{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-full transition-opacity duration-300 opacity-0 hover:opacity-100">
            <Edit className="text-white h-8 w-8" />
          </div>
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*"
        />
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
          <p className="text-lg text-gray-600">{email}</p>
        </div>
      </div>

      <div className="space-y-10">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Persönliche Daten</h3>
            {!isEditing ? (
              <Button variant="outline" onClick={handleEdit}>
                Bearbeiten
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCancel}>
                  Abbrechen
                </Button>
                <Button onClick={handleSave}>Speichern</Button>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="font-medium text-gray-700">Name</Label>
              {isEditing ? (
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              ) : (
                <p className="text-gray-900 text-lg pt-1">{name}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email" className="font-medium text-gray-700">E-Mail-Adresse</Label>
              {isEditing ? (
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              ) : (
                <p className="text-gray-900 text-lg pt-1">{email}</p>
              )}
            </div>
             {isEditing && (
                <div>
                    <Label className="font-medium text-gray-700">Profilbild</Label>
                    <div className="flex items-center gap-4 mt-2">
                        <Button variant="outline" size="sm" onClick={handleAvatarClick}>Bild ändern</Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600" onClick={handleRemoveAvatar}>Bild entfernen</Button>
                    </div>
                </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Sichtbarkeit</h3>
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border">
            <div className="flex items-center gap-4">
              {isPublic ? <Users className="h-6 w-6 text-gray-600" /> : <Lock className="h-6 w-6 text-gray-600" />}
              <div>
                <p className="font-semibold text-base text-gray-800">Profil: {isPublic ? "Öffentlich" : "Privat"}</p>
                <p className="text-sm text-gray-500">
                  Dein Profil ist für andere in Eventgruppen {isPublic ? "sichtbar" : "nicht sichtbar"}.
                </p>
              </div>
            </div>
            <Switch
              id="profile-visibility"
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Datenschutz</h3>
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                    <ShieldCheck className="h-6 w-6 text-gray-600" />
                    <div>
                        <p className="font-semibold text-base text-gray-800">Personalisierte Inhalte</p>
                        <p className="text-sm text-gray-500">
                            Erlaube uns, deine Daten zu nutzen, um dir bessere Event-Vorschläge zu machen.
                        </p>
                    </div>
                </div>
                <Switch
                    id="data-sharing"
                    checked={allowDataSharing}
                    onCheckedChange={setAllowDataSharing}
                />
            </div>
            <p className="text-xs text-gray-500 mt-2">
                Weitere Informationen findest du in unserer <a href="/privacy" className="text-blue-600 hover:underline">Datenschutzerklärung</a>.
            </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Account verwalten</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex-grow pr-4">
                <p className="font-semibold text-base text-gray-800">Account pausieren</p>
                <p className="text-sm text-gray-500">
                  Dein Profil wird verborgen und du erhältst keine Benachrichtigungen mehr.
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Pause className="mr-2 h-4 w-4"/> Pausieren
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex-grow pr-4">
                <p className="font-semibold text-base text-gray-800">Account löschen</p>
                <p className="text-sm text-gray-500">
                  Diese Aktion ist endgültig und kann nicht rückgängig gemacht werden.
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                        <Trash2 className="mr-2 h-4 w-4"/> Löschen
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Bist du dir absolut sicher?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Diese Aktion kann nicht rückgängig gemacht werden. Dein Account und alle deine Daten werden dauerhaft von unseren Servern gelöscht.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-700">Endgültig löschen</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

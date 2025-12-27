
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
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Camera, X, Users, Lock, Pause, Trash2, ImageUp, Smile } from "lucide-react";

export function UserProfile() {
  const [isPublic, setIsPublic] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Ronny Müller");
  const [email, setEmail] = useState("ronny.mueller@example.com");
  const [avatarUrl, setAvatarUrl] = useState("https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop");
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

  const handleUploadClick = () => {
    fileInputRef.current?.click();
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
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative cursor-pointer">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage src={avatarUrl} alt="User avatar" />
                <AvatarFallback className="text-4xl">{name.charAt(0)}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-full transition-opacity duration-300 opacity-0 hover:opacity-100">
                  <Camera className="text-white h-8 w-8" />
                </div>
              )}
            </div>
          </DialogTrigger>
          {isEditing && (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Profilbild bearbeiten</DialogTitle>
                <DialogDescription>
                  Wähle einen Avatar oder lade ein eigenes Bild hoch. Du kannst es jederzeit wieder ändern oder entfernen.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <Button asChild variant="outline">
                  <Link href="/avatar/create"><Smile className="mr-2 h-4 w-4"/> Avatar erstellen</Link>
                </Button>
                <Button variant="outline" onClick={handleUploadClick}>
                  <ImageUp className="mr-2 h-4 w-4"/> Bild hochladen
                </Button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>
              <DialogFooter>
                <Button variant="ghost" className="text-red-500 hover:text-red-600" onClick={() => setAvatarUrl('')}>Profilbild entfernen</Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
          <p className="text-lg text-gray-600">{email}</p>
        </div>
      </div>

      <div className="space-y-10">
        {/* Personal Data Section */}
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
          </div>
        </div>

        {/* Visibility Section */}
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

        {/* Account Management Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Account verwalten</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="font-semibold text-base text-gray-800">Account pausieren</p>
                <p className="text-sm text-gray-500">
                  Dein Profil wird verborgen und du erhältst keine Benachrichtigungen mehr.
                </p>
              </div>
              <Button variant="outline">
                <Pause className="mr-2 h-4 w-4"/> Pausieren
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="font-semibold text-base text-gray-800">Account löschen</p>
                <p className="text-sm text-gray-500">
                  Diese Aktion ist endgültig und kann nicht rückgängig gemacht werden.
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">
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

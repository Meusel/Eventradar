"use client";

import { Button } from "@/components/ui/button";

export default function CookieSettings() {

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    // Hier könnten Sie einen Toast oder eine andere Benachrichtigung anzeigen
    alert("Cookie-Einstellungen gespeichert: Akzeptiert");
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    alert("Cookie-Einstellungen gespeichert: Abgelehnt");
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Cookie-Einstellungen</h2>
      <p className="mb-4">
        Hier können Sie Ihre Cookie-Einstellungen verwalten.
      </p>
      <div className="flex">
        <Button onClick={handleAccept} className="mr-2">
          Cookies akzeptieren
        </Button>
        <Button onClick={handleDecline} variant="outline">
          Cookies ablehnen
        </Button>
      </div>
    </div>
  );
}

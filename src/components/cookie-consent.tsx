"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent === null) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex flex-col sm:flex-row justify-between items-center z-50">
      <p className="mb-2 sm:mb-0">
        Diese Website verwendet Cookies, um Ihre Erfahrung zu verbessern.{" "}
        <Link href="/privacy" className="underline">
          Erfahren Sie mehr
        </Link>
        .
      </p>
      <div className="flex">
        <Button onClick={handleAccept} className="mr-2">
          Akzeptieren
        </Button>
        <Button onClick={handleDecline} variant="outline">
          Ablehnen
        </Button>
      </div>
    </div>
  );
}
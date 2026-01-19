"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/loader";
import CookieConsent from "@/components/cookie-consent";
import { Toaster } from "@/components/ui/toaster";


export default function LayoutProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <CookieConsent />
          {children}
          <Toaster />
        </>
      )}
    </>
  );
}
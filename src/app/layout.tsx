import type { Metadata } from "next";
import "./globals.css";
import LayoutProvider from "@/components/layout-provider";

export const metadata: Metadata = {
  title: "Eventradar",
  description: "Events in Halle (Saale) für junge Leute und Studierende.",
};

export default function RootLayout({ 
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}

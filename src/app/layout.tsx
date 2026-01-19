import type { Metadata } from "next";
import { PT_Sans } from 'next/font/google';
import "./globals.css";
import LayoutProvider from "@/components/layout-provider";

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

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
    <html lang="de" className={`${ptSans.className} dark`}>
      <body className="font-body antialiased">
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}

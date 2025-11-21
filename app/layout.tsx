import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CommunityProvider } from "@/components/community-context";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "GearGrid | Rides, Meetups, and Mods for Gearheads",
  description:
    "Showcase your builds, drop meetup pins, and connect with gearheads across the globe. Cars, bikes, and anything with boost welcome."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-950`}>
        <CommunityProvider>{children}</CommunityProvider>
      </body>
    </html>
  );
}

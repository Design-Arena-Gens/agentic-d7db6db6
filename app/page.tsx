"use client";

import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { VehicleForm } from "@/components/vehicle-form";
import { VehicleGallery } from "@/components/vehicle-gallery";
import { MeetupForm } from "@/components/meetup-form";
import { MeetupList } from "@/components/meetup-list";
import { DroplineFeed } from "@/components/dropline-feed";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-4 py-10 md:py-16"
    >
      <Hero />

      <Section
        id="share"
        badge="Share your build"
        title="Put your ride on the grid"
        description="Upload a hero shot, drop your spec sheet, and walk everyone through the build. We pin it instantly to the feed so crews can tap in."
        className="scroll-mt-24"
      >
        <VehicleForm />
      </Section>

      <Section
        title="Live builds from the crew"
        badge="Community gallery"
        description="Cars, bikes, drift missiles, off-road rigs—whatever you wrench on is welcome. Hit a profile to reach out."
      >
        <VehicleGallery />
      </Section>

      <Section
        id="meetups"
        badge="Roll call"
        title="Drop spots and plan the next linkup"
        description="Share where you park up, what time to roll-in, and what the vibe is. Everyone gets the embed so they can punch it in."
        className="scroll-mt-24"
      >
        <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
          <MeetupList />
          <div className="glass sticky top-24 h-fit rounded-3xl border border-slate-800/60 p-6">
            <h3 className="text-lg font-semibold text-slate-100">Host a session</h3>
            <p className="mt-2 text-sm text-slate-400/90">
              Pick the spot, set the tone, and invite the squads. Throw in a map query so everyone
              lands at the right entrance.
            </p>
            <div className="mt-6">
              <MeetupForm />
            </div>
          </div>
        </div>
      </Section>

      <Section
        badge="Stay wired"
        title="Crew signal"
        description="Need a part, convoy partner, or track buddy? Drop a line and let the pit answer."
      >
        <DroplineFeed />
      </Section>
    </motion.main>
  );
}

"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800/60 bg-gradient-to-br from-slate-900/80 via-slate-950 to-black p-10 shadow-2xl shadow-black/50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="space-y-6 text-center md:text-left"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
          Gearhead Collective
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
          Share your build. Find the crews. Lock in the next meetup.
        </h1>
        <p className="max-w-2xl text-base text-slate-300 md:text-lg">
          GearGrid is the home base for tuners, riders, and fabricators. Showcase your rides,
          document the specs, drop meetup pins, and link up with fellow builders across the map.
        </p>
        <div className="flex flex-col gap-3 text-sm text-slate-300 md:flex-row md:items-center">
          <a
            href="#share"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white shadow-neon transition hover:bg-brand-dark"
          >
            Add your ride →
          </a>
          <a
            href="#meetups"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Plan a meetup
          </a>
        </div>
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-1/2 blur-3xl md:block">
        <div className="absolute inset-y-12 left-10 h-64 w-64 rounded-full bg-brand/40 blur-3xl" />
        <div className="absolute inset-y-16 right-12 h-72 w-72 rounded-full bg-indigo-500/40 blur-3xl" />
      </div>
    </section>
  );
}

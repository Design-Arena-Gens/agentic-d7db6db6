"use client";

import { FormEvent, useState } from "react";
import { useCommunity } from "./community-context";
import clsx from "clsx";

export function MeetupForm() {
  const { addMeetup } = useCommunity();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const title = (formData.get("title") as string)?.trim();
    const location = (formData.get("location") as string)?.trim();
    const date = (formData.get("date") as string)?.trim();
    const time = (formData.get("time") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const mapQuery = (formData.get("mapQuery") as string)?.trim() || location;

    if (!title || !location) {
      setError("Add a title & location so the crew knows where to land.");
      return;
    }

    setError(null);
    setLoading(true);

    addMeetup({
      title,
      location,
      date: date || "",
      time: time || "",
      description: description || "Details coming soon.",
      mapQuery: mapQuery || ""
    });

    form.reset();
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-200">Meetup name</span>
        <input
          name="title"
          type="text"
          required
          placeholder="Friday Night Lights at the Pier"
          className="glass rounded-lg border border-transparent bg-slate-900/60 px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/60"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-200">Spot</span>
        <input
          name="location"
          type="text"
          required
          placeholder="Example Motorsports Park"
          className="glass rounded-lg border border-transparent bg-slate-900/60 px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/60"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-200">Date</span>
        <input
          name="date"
          type="date"
          className="glass rounded-lg border border-transparent bg-slate-900/60 px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/60"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-200">Time</span>
        <input
          name="time"
          type="time"
          className="glass rounded-lg border border-transparent bg-slate-900/60 px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/60"
        />
      </label>

      <label className="flex flex-col gap-2 md:col-span-2">
        <span className="text-sm font-medium text-slate-200">Description / roll-in details</span>
        <textarea
          name="description"
          rows={3}
          placeholder="What's the vibe? Are there roll-in rules? Food trucks? Track time?"
          className="glass min-h-[96px] rounded-lg border border-transparent bg-slate-900/60 px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/60"
        />
      </label>

      <label className="flex flex-col gap-2 md:col-span-2">
        <span className="text-sm font-medium text-slate-200">Map search (optional)</span>
        <input
          name="mapQuery"
          type="text"
          placeholder="Use a Google Maps friendly search, e.g. '99 Speedway Stockton'"
          className="glass rounded-lg border border-transparent bg-slate-900/60 px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/60"
        />
      </label>

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className={clsx(
            "inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-2 text-sm font-semibold text-slate-50 transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-slate-950",
            loading && "opacity-60"
          )}
        >
          {loading ? "Posting..." : "Drop the meetup"}
        </button>
        {error ? <p className="mt-2 text-xs text-red-400">{error}</p> : null}
      </div>
    </form>
  );
}

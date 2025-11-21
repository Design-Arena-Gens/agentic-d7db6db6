"use client";

import { useCommunity } from "./community-context";
import { format } from "date-fns";

function formatDate(date: string) {
  if (!date) return "Date TBA";
  try {
    return format(new Date(date), "MMM d, yyyy");
  } catch {
    return date;
  }
}

export function MeetupList() {
  const { meetups } = useCommunity();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {meetups.map((meetup) => (
        <article
          key={meetup.id}
          className="glass flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 shadow-lg shadow-black/30"
        >
          <div className="border-b border-slate-800/80 p-5">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-slate-50">{meetup.title}</h3>
              <p className="text-sm text-slate-300/80">{meetup.location}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-slate-400/80">
                <span>{formatDate(meetup.date)}</span>
                {meetup.time ? <span>{meetup.time}</span> : null}
              </div>
              <p className="mt-2 text-sm text-slate-300/90">{meetup.description}</p>
            </div>
          </div>
          <div className="group relative aspect-[4/3] bg-slate-950/70">
            {meetup.mapQuery ? (
              <iframe
                title={meetup.title}
                className="absolute inset-0 h-full w-full opacity-90 transition group-hover:opacity-100"
                loading="lazy"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  meetup.mapQuery
                )}&output=embed&z=14`}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-slate-500">
                Add a map query to show the spot.
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

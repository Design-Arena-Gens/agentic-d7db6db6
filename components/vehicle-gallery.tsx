"use client";

import Image from "next/image";
import { useCommunity } from "./community-context";
import { formatDistanceToNow } from "date-fns";
import clsx from "clsx";

export function VehicleGallery() {
  const { vehicles } = useCommunity();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {vehicles.map((vehicle) => (
        <article
          key={vehicle.id}
          className="glass group flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 shadow-lg shadow-black/40 transition hover:shadow-brand/30"
        >
          <div className="relative h-56 overflow-hidden">
            <Image
              src={vehicle.imageUrl}
              alt={vehicle.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="rounded-full bg-brand/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                {vehicle.type}
              </span>
              <span className="text-xs text-slate-200/70">
                {formatDistanceToNow(new Date(vehicle.createdAt), { addSuffix: true })}
              </span>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4 p-5">
            <header className="space-y-1">
              <h3 className="text-lg font-semibold text-slate-50">{vehicle.name}</h3>
              <p className="text-sm text-slate-400">{vehicle.location}</p>
            </header>
            <dl className="space-y-3 text-sm text-slate-300/90">
              <div>
                <dt className="font-semibold uppercase tracking-wide text-slate-400">Specs</dt>
                <dd className="mt-1 whitespace-pre-line text-sm text-slate-200/90">
                  {vehicle.specs}
                </dd>
              </div>
              <div>
                <dt className="font-semibold uppercase tracking-wide text-slate-400">Mods</dt>
                <dd className="mt-1 whitespace-pre-line text-sm text-slate-200/90">
                  {vehicle.mods}
                </dd>
              </div>
            </dl>
            <div className="mt-auto">
              {vehicle.social ? (
                <a
                  href={vehicle.social}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    "inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-slate-50 transition hover:bg-white/20"
                  )}
                >
                  Link up
                  <span aria-hidden>→</span>
                </a>
              ) : (
                <p className="text-xs text-slate-500">Drop a link next time so folks can reach out.</p>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

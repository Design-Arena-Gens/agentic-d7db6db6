"use client";

import { FormEvent, useState } from "react";
import { useCommunity } from "./community-context";
import type { VehicleType } from "./types";
import clsx from "clsx";

const vehicleTypes: VehicleType[] = ["Car", "Bike", "Truck", "Other"];

export function VehicleForm() {
  const { addVehicle } = useCommunity();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string)?.trim();
    const type = (formData.get("type") as VehicleType) || "Car";
    const imageUrl = (formData.get("imageUrl") as string)?.trim();
    const location = (formData.get("location") as string)?.trim();
    const specs = (formData.get("specs") as string)?.trim();
    const mods = (formData.get("mods") as string)?.trim();
    const social = (formData.get("social") as string)?.trim();

    if (!name || !imageUrl) {
      setError("Give it a name and drop a clean photo link.");
      return;
    }

    setError(null);
    setLoading(true);

    addVehicle({
      name,
      type,
      imageUrl,
      location: location || "Somewhere on the map",
      specs: specs || "Specs coming soon.",
      mods: mods || "Mods list cooking...",
      social: social || ""
    });

    form.reset();
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-200">Vehicle name</span>
        <input
          name="name"
          type="text"
          required
          placeholder="E.g. Ruby's widebody GR Supra"
          className="glass rounded-lg border border-transparent bg-slate-900/60 px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/60"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-200">Type</span>
        <select
          name="type"
          className="glass rounded-lg border border-transparent bg-slate-900/60 px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/60"
        >
          {vehicleTypes.map((vehicleType) => (
            <option key={vehicleType} value={vehicleType}>
              {vehicleType}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2 md:col-span-2">
        <span className="text-sm font-medium text-slate-200">Hero photo URL</span>
        <input
          name="imageUrl"
          type="url"
          required
          placeholder="https://i.imgur.com/yourride.jpg"
          className="glass rounded-lg border border-transparent bg-slate-900/60 px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/60"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-200">Home base</span>
        <input
          name="location"
          type="text"
          placeholder="City, State"
          className="glass rounded-lg border border-transparent bg-slate-900/60 px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/60"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-200">Instagram / site / contact</span>
        <input
          name="social"
          type="url"
          placeholder="https://instagram.com/you"
          className="glass rounded-lg border border-transparent bg-slate-900/60 px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/60"
        />
      </label>

      <label className="flex flex-col gap-2 md:col-span-2">
        <span className="text-sm font-medium text-slate-200">Specs</span>
        <textarea
          name="specs"
          rows={3}
          placeholder="Engine, power, drivetrain, highlights..."
          className="glass min-h-[96px] rounded-lg border border-transparent bg-slate-900/60 px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/60"
        />
      </label>

      <label className="flex flex-col gap-2 md:col-span-2">
        <span className="text-sm font-medium text-slate-200">Mods</span>
        <textarea
          name="mods"
          rows={3}
          placeholder="Build sheet, custom touches, future plans..."
          className="glass min-h-[96px] rounded-lg border border-transparent bg-slate-900/60 px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/60"
        />
      </label>

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className={clsx(
            "inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-slate-950",
            loading && "opacity-60"
          )}
        >
          {loading ? "Saving..." : "Share your build"}
        </button>
        {error ? <p className="mt-2 text-xs text-red-400">{error}</p> : null}
      </div>
    </form>
  );
}

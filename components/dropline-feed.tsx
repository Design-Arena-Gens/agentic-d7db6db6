"use client";

import { FormEvent, useState } from "react";
import { useCommunity } from "./community-context";
import { formatDistanceToNow } from "date-fns";
import clsx from "clsx";

export function DroplineFeed() {
  const { drops, addDrop } = useCommunity();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const author = (formData.get("author") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();

    if (!author || !message) {
      setError("Add a handle and a message.");
      return;
    }
    setError(null);
    setPending(true);
    addDrop({ author, message });
    form.reset();
    setPending(false);
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="glass flex flex-col gap-4 rounded-2xl border border-slate-800/60 p-4 md:flex-row md:items-center md:gap-3 md:p-5"
      >
        <input
          name="author"
          type="text"
          placeholder="@handle or crew name"
          className="glass w-full rounded-xl border border-transparent bg-slate-900/60 px-4 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/60"
        />
        <input
          name="message"
          type="text"
          placeholder="Drop a line, plan a cruise, find a part..."
          className="glass w-full rounded-xl border border-transparent bg-slate-900/60 px-4 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/60"
        />
        <button
          type="submit"
          disabled={pending}
          className={clsx(
            "inline-flex min-w-[140px] items-center justify-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-slate-950",
            pending && "opacity-60"
          )}
        >
          {pending ? "Sending..." : "Post"}
        </button>
      </form>
      {error ? <p className="text-xs text-red-400">{error}</p> : null}

      <div className="space-y-4">
        {drops.map((drop) => (
          <div
            key={drop.id}
            className="glass rounded-2xl border border-slate-800/60 px-5 py-4 shadow-lg shadow-black/40"
          >
            <header className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-400/80">
              <span>{drop.author}</span>
              <span>{formatDistanceToNow(new Date(drop.createdAt), { addSuffix: true })}</span>
            </header>
            <p className="mt-3 text-sm text-slate-200">{drop.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

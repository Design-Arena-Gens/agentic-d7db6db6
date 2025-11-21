"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

export function Section({
  id,
  title,
  description,
  badge,
  children,
  className
}: {
  id?: string;
  title: string;
  description?: string;
  badge?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 18, stiffness: 110 }}
      viewport={{ once: true, amount: 0.3 }}
      id={id}
      className={clsx(
        "glass relative overflow-hidden rounded-3xl border border-slate-800/60 p-6 shadow-xl shadow-black/50 md:p-10",
        className
      )}
    >
      <div className="mb-6 space-y-3">
        <div className="flex items-center gap-3">
          {badge ? (
            <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-light">
              {badge}
            </span>
          ) : null}
          <h2 className="text-2xl font-semibold md:text-3xl">{title}</h2>
        </div>
        {description ? (
          <p className="max-w-2xl text-slate-300/80">{description}</p>
        ) : null}
      </div>
      {children}
    </motion.section>
  );
}

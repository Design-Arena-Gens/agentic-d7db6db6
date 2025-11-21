"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { nanoid } from "nanoid";
import type { DropLine, MeetupEvent, VehicleProfile, VehicleType } from "./types";
import { formatISO } from "date-fns";

interface CommunityState {
  vehicles: VehicleProfile[];
  meetups: MeetupEvent[];
  drops: DropLine[];
}

interface CommunityContextValue extends CommunityState {
  addVehicle: (payload: {
    name: string;
    type: VehicleType;
    imageUrl: string;
    location: string;
    specs: string;
    mods: string;
    social: string;
  }) => void;
  addMeetup: (payload: {
    title: string;
    location: string;
    mapQuery: string;
    date: string;
    time: string;
    description: string;
  }) => void;
  addDrop: (payload: { author: string; message: string }) => void;
}

const STORAGE_KEY = "gearhead-hub-community";

const defaultState: CommunityState = {
  vehicles: [
    {
      id: nanoid(),
      name: "Matt's Turbo Supra",
      type: "Car",
      imageUrl:
        "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80",
      location: "Seattle, WA",
      specs: "2JZ-GTE • Single turbo conversion • 720whp • 6-speed manual",
      mods: "HKS Hi-Power exhaust, Tein coilovers, StopTech big brake kit",
      social: "https://instagram.com/seattle_supra",
      createdAt: formatISO(new Date(Date.now() - 1000 * 60 * 60 * 4))
    },
    {
      id: nanoid(),
      name: "Rina's Street Triple",
      type: "Bike",
      imageUrl:
        "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1400&q=80",
      location: "Austin, TX",
      specs: "765cc inline-3 • 118hp • Quickshifter • Arrow full exhaust",
      mods: "CNC rearsets, Rizoma mirrors, SC Project exhaust, custom tune",
      social: "https://www.revtrax.blog/rina",
      createdAt: formatISO(new Date(Date.now() - 1000 * 60 * 60 * 8))
    }
  ],
  meetups: [
    {
      id: nanoid(),
      title: "Sunset Drift & Chill",
      location: "Evergreen Speedway, Monroe",
      mapQuery: "Evergreen Speedway",
      date: "2024-07-12",
      time: "18:30",
      description: "Open skid pad, food trucks, pro tips from local drifters.",
      createdAt: formatISO(new Date(Date.now() - 1000 * 60 * 60 * 12))
    },
    {
      id: nanoid(),
      title: "Caffeine & Carburetors",
      location: "Circuit of The Americas Paddock",
      mapQuery: "Circuit of the Americas, Austin, TX",
      date: "2024-07-20",
      time: "09:00",
      description: "Morning cars & coffee with a spirited hill country cruise afterwards.",
      createdAt: formatISO(new Date(Date.now() - 1000 * 60 * 60 * 24))
    }
  ],
  drops: [
    {
      id: nanoid(),
      author: "BoostedBryce",
      message: "Anyone rolling to GridLife Midwest? Trying to convoy from Denver.",
      createdAt: formatISO(new Date(Date.now() - 1000 * 60 * 30))
    },
    {
      id: nanoid(),
      author: "CarbonKat",
      message: "Just finished a carbon ducktail for the GR86 crowd. HMU if you want pics.",
      createdAt: formatISO(new Date(Date.now() - 1000 * 60 * 50))
    }
  ]
};

const CommunityContext = createContext<CommunityContextValue | null>(null);

function readStoredState(): CommunityState {
  if (typeof window === "undefined") {
    return defaultState;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultState;
    }
    const parsed = JSON.parse(raw) as CommunityState;
    if (
      !parsed ||
      !Array.isArray(parsed.vehicles) ||
      !Array.isArray(parsed.meetups) ||
      !Array.isArray(parsed.drops)
    ) {
      return defaultState;
    }
    return parsed;
  } catch (error) {
    console.warn("Failed to parse stored community state:", error);
    return defaultState;
  }
}

export function CommunityProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CommunityState>(defaultState);

  useEffect(() => {
    setState(readStoredState());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<CommunityContextValue>(
    () => ({
      ...state,
      addVehicle: (payload) => {
        setState((prev) => ({
          ...prev,
          vehicles: [
            {
              id: nanoid(),
              ...payload,
              createdAt: formatISO(new Date())
            },
            ...prev.vehicles
          ]
        }));
      },
      addMeetup: (payload) => {
        setState((prev) => ({
          ...prev,
          meetups: [
            {
              id: nanoid(),
              ...payload,
              createdAt: formatISO(new Date())
            },
            ...prev.meetups
          ]
        }));
      },
      addDrop: (payload) => {
        setState((prev) => ({
          ...prev,
          drops: [
            {
              id: nanoid(),
              ...payload,
              createdAt: formatISO(new Date())
            },
            ...prev.drops
          ]
        }));
      }
    }),
    [state]
  );

  return <CommunityContext.Provider value={value}>{children}</CommunityContext.Provider>;
}

export function useCommunity() {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error("useCommunity must be used within a CommunityProvider");
  }
  return context;
}

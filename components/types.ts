export type VehicleType = "Car" | "Bike" | "Truck" | "Other";

export interface VehicleProfile {
  id: string;
  name: string;
  type: VehicleType;
  imageUrl: string;
  location: string;
  specs: string;
  mods: string;
  social: string;
  createdAt: string;
}

export interface MeetupEvent {
  id: string;
  title: string;
  location: string;
  mapQuery: string;
  date: string;
  time: string;
  description: string;
  createdAt: string;
}

export interface DropLine {
  id: string;
  author: string;
  message: string;
  createdAt: string;
}

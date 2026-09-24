import { Workout } from "@/types/workout";

const API = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(API, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return res.json();
}
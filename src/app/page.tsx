import type { Metadata } from "next";

import Hero from "@/components/Hero";
import WorkoutList from "@/components/WorkoutList";

export const metadata: Metadata = {
  title: "Workout Library",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d0f12]">
      <Hero />
      <WorkoutList />
    </main>
  );
}
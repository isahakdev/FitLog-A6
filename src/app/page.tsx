import Hero from "@/components/Hero";
import WorkoutList from "@/components/WorkoutList";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d0f12]">
      <Hero />
      <WorkoutList />
    </main>
  );
}
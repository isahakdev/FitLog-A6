import { getWorkouts } from "@/lib/api";
import WorkoutCard from "./WorkoutCard";

const WorkoutList = async () => {
    const workouts = await getWorkouts();

    return (
        <section
            id="library"
            className="max-w-[1320px] mx-auto px-4 py-20 bg-[#050816]"
        >
            {/* Heading */}
            <div className="mb-10">
                <p className="text-white text-4xl font-bold uppercase font-oswald">
                    THE LIBRARY
                </p>

                <p className="mt-2 text-gray-400 text-sm">
                    Twelve lifts covering every major muscle group.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {workouts.map((workout) => (
                    <WorkoutCard key={workout.id} workout={workout} />
                ))}
            </div>
        </section>
    );
};

export default WorkoutList;
import { getWorkouts } from "@/lib/api";
import WorkoutCard from "./WorkoutCard";

const WorkoutList = async () => {
    const workouts = await getWorkouts();

    return (
        <section
            id="library"
            className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        >
            {/* Heading */}
            <div className="mb-10">
                <p className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
                    THE LIBRARY
                </p>

                <p className="mt-2 text-sm text-gray-400">
                    Twelve lifts covering every major muscle group.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {workouts.map((workout) => (
                    <WorkoutCard
                        key={workout.id}
                        workout={workout}
                    />
                ))}
            </div>
        </section>
    );
};

export default WorkoutList;
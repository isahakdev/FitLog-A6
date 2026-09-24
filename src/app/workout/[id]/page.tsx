import { notFound } from "next/navigation";
import WorkoutActions from "@/components/WorkoutAction";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

async function getWorkout(id: string) {
    const res = await fetch(
        `https://api.abcz.workers.dev/api/fitlog/${id}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        return null;
    }

    return res.json();
}

export default async function WorkoutDetails({ params }: PageProps) {
    const { id } = await params;

    const workout = await getWorkout(id);

    if (!workout) {
        notFound();
    }

    const categories = Array.isArray(workout.category)
        ? workout.category
        : workout.category
            ? [workout.category]
            : [];

    return (
        <main className="min-h-screen bg-[#0d0f12] px-4 py-10 text-white">
            <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-2">

                {/* Left Image */}
                <div className="overflow-hidden rounded-3xl border border-gray-800">
                    <img
                        src={workout.image}
                        alt={workout.name}
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Right Content */}
                <div>

                    {/* Category */}
                    <div className="mb-4 flex flex-wrap gap-2">
                        {categories.map(
                            (item: string, index: number) => (
                                <span
                                    key={index}
                                    className="rounded-full bg-[#CCFF00] px-3 py-1 text-xs font-bold uppercase text-black"
                                >
                                    {item}
                                </span>
                            )
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="mb-4 text-4xl font-bold uppercase">
                        {workout.name}
                    </h1>

                    {/* Description */}
                    <p className="mb-6 text-gray-400">
                        {workout.description}
                    </p>

                    {/* Specs */}
                    <div className="mb-8 grid grid-cols-2 gap-4">

                        <div className="rounded-xl bg-[#15181D] p-4">
                            <p className="text-xs text-gray-500">
                                Equipment
                            </p>
                            <p>{workout.equipment}</p>
                        </div>

                        <div className="rounded-xl bg-[#15181D] p-4">
                            <p className="text-xs text-gray-500">
                                Difficulty
                            </p>
                            <p>{workout.difficulty}</p>
                        </div>

                        <div className="rounded-xl bg-[#15181D] p-4">
                            <p className="text-xs text-gray-500">
                                Sets / Reps
                            </p>
                            <p>
                                {workout.sets} × {workout.reps}
                            </p>
                        </div>

                        <div className="rounded-xl bg-[#15181D] p-4">
                            <p className="text-xs text-gray-500">
                                Duration
                            </p>
                            <p>{workout.duration} min</p>
                        </div>

                        <div className="rounded-xl bg-[#15181D] p-4">
                            <p className="text-xs text-gray-500">
                                Calories
                            </p>
                            <p>{workout.calories} kcal</p>
                        </div>

                        <div className="rounded-xl bg-[#15181D] p-4">
                            <p className="text-xs text-gray-500">
                                Rating
                            </p>
                            <p>⭐ {workout.rating}</p>
                        </div>

                    </div>

                    {/* Instructions */}
                    <h2 className="mb-4 text-xl font-bold uppercase">
                        Instructions
                    </h2>

                    <ol className="mb-8 list-inside list-decimal space-y-3 text-gray-300">
                        {(workout.instructions || []).map(
                            (step: string, index: number) => (
                                <li key={index}>
                                    {step}
                                </li>
                            )
                        )}
                    </ol>

                    {/* Action Buttons */}
                    <WorkoutActions workout={workout} />

                </div>
            </div>
        </main>
    );
}
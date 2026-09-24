"use client";

import { useState } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { toast } from "react-toastify";

type SortOption = "duration" | "calories" | "rating";

const MyPlanPage = () => {
    const {
        plan,
        saved,
        completed,
        markAsDone,
        removeFromPlan,
        removeFromSaved,
    } = usePlan();

    const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
    const [sortBy, setSortBy] = useState<SortOption>("duration");

    // Metrics
    const totalMinutes = plan.reduce(
        (total, workout) => total + workout.duration,
        0
    );

    const totalCalories = plan.reduce(
        (total, workout) => total + workout.caloriesBurned,
        0
    );

    // Current tab workouts
    const workouts = activeTab === "plan" ? plan : saved;

    // Sort workouts
    const sortedWorkouts = [...workouts].sort((a, b) => {
        if (sortBy === "duration") {
            return a.duration - b.duration;
        }

        if (sortBy === "calories") {
            return a.caloriesBurned - b.caloriesBurned;
        }

        return a.rating - b.rating;
    });

    return (
        <main className="min-h-screen bg-[#0d0f12] px-5 py-12 text-white sm:px-8 lg:px-10">
            <div className="mx-auto max-w-[1320px]">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                        MY PLAN
                    </h1>

                    <p className="mt-3 text-zinc-400">
                        Cap of five lifts for today. Finish them, then load more.
                    </p>
                </div>

                {/* Metrics */}
                <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">

                    {/* Exercises */}
                    <div className="rounded-2xl border border-zinc-800 bg-[#111318] p-6">
                        <p className="text-sm text-zinc-500">
                            Exercises
                        </p>

                        <p className="mt-2 text-4xl font-black text-lime-400">
                            {plan.length}
                        </p>
                    </div>

                    {/* Minutes */}
                    <div className="rounded-2xl border border-zinc-800 bg-[#111318] p-6">
                        <p className="text-sm text-zinc-500">
                            Minutes
                        </p>

                        <p className="mt-2 text-4xl font-black text-white">
                            {totalMinutes}
                        </p>
                    </div>

                    {/* Calories */}
                    <div className="rounded-2xl border border-zinc-800 bg-[#111318] p-6">
                        <p className="text-sm text-zinc-500">
                            Calories
                        </p>

                        <p className="mt-2 text-4xl font-black text-white">
                            {totalCalories}
                        </p>
                    </div>
                </div>

                {/* Tabs and Sort */}
                <div className="mb-6 flex items-center justify-between gap-4">

                    {/* Tabs */}
                    <div className="flex rounded-xl border border-zinc-800 bg-[#111318] p-1">

                        {/* Today's Plan */}
                        <button
                            type="button"
                            onClick={() => setActiveTab("plan")}
                            className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${activeTab === "plan"
                                    ? "bg-zinc-800 text-white"
                                    : "text-zinc-500 hover:text-white"
                                }`}
                        >
                            Today&apos;s Plan

                            <span className="ml-2 rounded-full bg-zinc-700 px-2 py-0.5 text-xs">
                                {plan.length}
                            </span>
                        </button>

                        {/* Saved */}
                        <button
                            type="button"
                            onClick={() => setActiveTab("saved")}
                            className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${activeTab === "saved"
                                    ? "bg-zinc-800 text-white"
                                    : "text-zinc-500 hover:text-white"
                                }`}
                        >
                            Saved

                            <span className="ml-2 rounded-full bg-zinc-700 px-2 py-0.5 text-xs">
                                {saved.length}
                            </span>
                        </button>
                    </div>

                    {/* Sort */}
                    {workouts.length > 0 && (
                        <div className="flex items-center gap-3">
                            <label
                                htmlFor="sort"
                                className="text-sm text-zinc-500"
                            >
                                Sort By
                            </label>

                            <select
                                id="sort"
                                value={sortBy}
                                onChange={(event) =>
                                    setSortBy(
                                        event.target.value as SortOption
                                    )
                                }
                                className="rounded-lg border border-zinc-800 bg-[#111318] px-4 py-2.5 text-sm text-white outline-none transition focus:border-lime-400"
                            >
                                <option value="duration">
                                    Duration
                                </option>

                                <option value="calories">
                                    Calories
                                </option>

                                <option value="rating">
                                    Rating
                                </option>
                            </select>
                        </div>
                    )}
                </div>

                {/* Empty State */}
                {workouts.length === 0 ? (
                    <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-dashed border-zinc-800">
                        <div className="text-center">

                            <h2 className="text-xl font-black uppercase tracking-wide text-white">
                                NOTHING HERE YET
                            </h2>

                            <p className="mt-2 text-sm text-zinc-500">
                                Browse the library and add a lift to get today moving.
                            </p>

                            <Link
                                href="/"
                                className="mt-5 inline-block rounded-full bg-lime-400 px-6 py-2.5 text-xs font-bold text-black transition hover:bg-lime-300"
                            >
                                Go to workouts
                            </Link>
                        </div>
                    </div>
                ) : (

                    /* Workout Cards */
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {sortedWorkouts.map((workout) => {

                            const isCompleted = completed.includes(
                                workout.id
                            );

                            return (
                                <div
                                    key={workout.id}
                                    className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
                                >

                                    {/* Image */}
                                    <img
                                        src={workout.image}
                                        alt={workout.name}
                                        className="h-52 w-full object-cover"
                                    />

                                    <div className="p-5">

                                        {/* Title */}
                                        <h2 className="text-xl font-bold text-white">
                                            {workout.name}
                                        </h2>

                                        {/* Equipment */}
                                        <p className="mt-2 text-sm text-zinc-500">
                                            {workout.equipment}
                                        </p>

                                        {/* Stats */}
                                        <div className="mt-4 flex gap-4 text-sm text-zinc-400">
                                            <span>
                                                {workout.duration} min
                                            </span>

                                            <span>
                                                {workout.caloriesBurned} cal
                                            </span>

                                            <span>
                                                ★ {workout.rating}
                                            </span>
                                        </div>

                                        {/* View Details */}
                                        <Link
                                            href={`/workout/${workout.id}`}
                                            className="mt-5 block rounded-lg border border-zinc-700 py-2.5 text-center text-sm font-semibold text-white transition hover:border-lime-400 hover:text-lime-400"
                                        >
                                            View Details
                                        </Link>

                                        {/* Actions */}
                                        <div className="mt-4 flex gap-3">

                                            {/* Today's Plan Actions */}
                                            {activeTab === "plan" && (
                                                <>
                                                    {/* Mark as Done */}
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            markAsDone(
                                                                workout.id
                                                            );

                                                            toast.success(
                                                                `${workout.name} marked as completed`
                                                            );
                                                        }}
                                                        disabled={isCompleted}
                                                        className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${isCompleted
                                                                ? "cursor-not-allowed bg-lime-400/20 text-lime-400"
                                                                : "bg-lime-400 text-black hover:bg-lime-300"
                                                            }`}
                                                    >
                                                        {isCompleted
                                                            ? "Completed"
                                                            : "Mark as Done"}
                                                    </button>

                                                    {/* Remove */}
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            removeFromPlan(
                                                                workout.id
                                                            );

                                                            toast.success(
                                                                `${workout.name} removed from your plan`
                                                            );
                                                        }}
                                                        className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-300 transition hover:border-red-400 hover:text-red-400"
                                                    >
                                                        Remove
                                                    </button>
                                                </>
                                            )}

                                            {/* Saved Actions */}
                                            {activeTab === "saved" && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        removeFromSaved(
                                                            workout.id
                                                        );

                                                        toast.success(
                                                            `${workout.name} removed from saved`
                                                        );
                                                    }}
                                                    className="w-full rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-300 transition hover:border-red-400 hover:text-red-400"
                                                >
                                                    Remove from Saved
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
};

export default MyPlanPage;
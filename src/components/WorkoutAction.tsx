"use client";

import { CalendarPlus, Bookmark } from "lucide-react";
import { toast } from "react-toastify";

import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/types/workout";

type Props = {
    workout: Workout;
};

const WorkoutActions = ({ workout }: Props) => {
    const {
        plan,
        saved,
        addToPlan,
        addToSaved,
    } = usePlan();

    const isInPlan = plan.some((item) => item.id === workout.id);
    const isSaved = saved.some((item) => item.id === workout.id);
    const planIsFull = plan.length >= 5;

    const handlePlan = () => {
        if (isInPlan) {
            toast.info("This workout is already in today's plan.");
            return;
        }

        if (planIsFull) {
            toast.warning("Today's plan is full. Maximum 5 workouts allowed.");
            return;
        }

        addToPlan(workout);
        toast.success("Added to today's plan");
    };

    const handleSaved = () => {
        if (isSaved) {
            toast.info("This workout is already saved.");
            return;
        }

        addToSaved(workout);
        toast.success("Workout saved for later");
    };

    return (
        <div className="flex flex-col items-start gap-3 sm:flex-row">
            {/* Add to Today's Plan */}
            <button
                onClick={handlePlan}
                disabled={planIsFull || isInPlan}
                className="flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#CCFF00] px-4 text-xs font-medium text-black transition-colors hover:bg-[#baff00] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#CCFF00]"
            >
                <CalendarPlus size={14} strokeWidth={2} />

                <span>
                    {isInPlan
                        ? "Already in today's plan"
                        : planIsFull
                            ? "Plan is full"
                            : "Add to today's plan"}
                </span>
            </button>

            {/* Save for Later */}
            <button
                onClick={handleSaved}
                disabled={isSaved}
                className="flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[#303640] bg-transparent px-4 text-xs font-medium text-white transition-colors hover:bg-[#171b22] disabled:cursor-not-allowed disabled:opacity-40"
            >
                <Bookmark size={14} strokeWidth={1.8} />

                <span>
                    {isSaved ? "Already saved" : "Save for later"}
                </span>
            </button>
        </div>
    );
};

export default WorkoutActions;
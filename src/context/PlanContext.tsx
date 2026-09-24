"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

import { Workout } from "@/types/workout";

type PlanContextType = {
    plan: Workout[];
    saved: Workout[];
    completed: string[];
    addToPlan: (workout: Workout) => void;
    addToSaved: (workout: Workout) => void;
    removeFromPlan: (id: string) => void;
    removeFromSaved: (id: string) => void;
    markAsDone: (id: string) => void;
};

const PlanContext = createContext<PlanContextType | null>(null);

const getStoredData = <T,>(key: string, fallback: T): T => {
    if (typeof window === "undefined") {
        return fallback;
    }

    try {
        const stored = localStorage.getItem(key);

        if (!stored) {
            return fallback;
        }

        return JSON.parse(stored) as T;
    } catch {
        return fallback;
    }
};

export const PlanProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [plan, setPlan] = useState<Workout[]>(() =>
        getStoredData<Workout[]>("fitlog-plan", [])
    );

    const [saved, setSaved] = useState<Workout[]>(() =>
        getStoredData<Workout[]>("fitlog-saved", [])
    );

    const [completed, setCompleted] = useState<string[]>(() =>
        getStoredData<string[]>("fitlog-completed", [])
    );

    // Save Today's Plan
    useEffect(() => {
        localStorage.setItem(
            "fitlog-plan",
            JSON.stringify(plan)
        );
    }, [plan]);

    // Save Saved Workouts
    useEffect(() => {
        localStorage.setItem(
            "fitlog-saved",
            JSON.stringify(saved)
        );
    }, [saved]);

    // Save Completed Workouts
    useEffect(() => {
        localStorage.setItem(
            "fitlog-completed",
            JSON.stringify(completed)
        );
    }, [completed]);

    // Add to Today's Plan
    const addToPlan = (workout: Workout) => {
        setPlan((currentPlan) => {
            const exists = currentPlan.some(
                (item) => item.id === workout.id
            );

            // Maximum 5 workouts
            if (exists || currentPlan.length >= 5) {
                return currentPlan;
            }

            return [...currentPlan, workout];
        });
    };

    // Save for Later
    const addToSaved = (workout: Workout) => {
        setSaved((currentSaved) => {
            const exists = currentSaved.some(
                (item) => item.id === workout.id
            );

            if (exists) {
                return currentSaved;
            }

            return [...currentSaved, workout];
        });
    };

    // Remove from Today's Plan
    const removeFromPlan = (id: string) => {
        setPlan((currentPlan) =>
            currentPlan.filter(
                (item) => item.id !== id
            )
        );

        setCompleted((currentCompleted) =>
            currentCompleted.filter(
                (itemId) => itemId !== id
            )
        );
    };

    // Remove from Saved
    const removeFromSaved = (id: string) => {
        setSaved((currentSaved) =>
            currentSaved.filter(
                (item) => item.id !== id
            )
        );
    };

    // Mark as Done
    const markAsDone = (id: string) => {
        setCompleted((currentCompleted) => {
            if (currentCompleted.includes(id)) {
                return currentCompleted;
            }

            return [
                ...currentCompleted,
                id,
            ];
        });
    };

    return (
        <PlanContext.Provider
            value={{
                plan,
                saved,
                completed,
                addToPlan,
                addToSaved,
                removeFromPlan,
                removeFromSaved,
                markAsDone,
            }}
        >
            {children}
        </PlanContext.Provider>
    );
};

export const usePlan = () => {
    const context = useContext(PlanContext);

    if (!context) {
        throw new Error(
            "usePlan must be used inside PlanProvider"
        );
    }

    return context;
};
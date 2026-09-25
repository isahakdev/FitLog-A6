"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
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

// Get data from localStorage safely
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
    // Start with empty state to avoid hydration mismatch
    const [plan, setPlan] = useState<Workout[]>([]);
    const [saved, setSaved] = useState<Workout[]>([]);
    const [completed, setCompleted] = useState<string[]>([]);
    const [hydrated, setHydrated] = useState(false);

    // Load data from localStorage after client hydration
    // This is intentional because localStorage is only available in the browser.

    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        setPlan(getStoredData<Workout[]>("fitlog-plan", []));
        setSaved(getStoredData<Workout[]>("fitlog-saved", []));
        setCompleted(
            getStoredData<string[]>("fitlog-completed", [])
        );

        setHydrated(true);
    }, []);
    /* eslint-enable react-hooks/set-state-in-effect */

    // Save Today's Plan
    useEffect(() => {
        if (!hydrated) return;

        localStorage.setItem(
            "fitlog-plan",
            JSON.stringify(plan)
        );
    }, [plan, hydrated]);

    // Save Saved Workouts
    useEffect(() => {
        if (!hydrated) return;

        localStorage.setItem(
            "fitlog-saved",
            JSON.stringify(saved)
        );
    }, [saved, hydrated]);

    // Save Completed Workouts
    useEffect(() => {
        if (!hydrated) return;

        localStorage.setItem(
            "fitlog-completed",
            JSON.stringify(completed)
        );
    }, [completed, hydrated]);

    // Add to Today's Plan
    const addToPlan = (workout: Workout) => {
        setPlan((currentPlan) => {
            // Prevent duplicate workout
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
            // Prevent duplicate saved workout
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

        // Also remove completed status
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

    // Mark workout as Done
    const markAsDone = (id: string) => {
        setCompleted((currentCompleted) => {
            // Don't add duplicate completed ID
            if (currentCompleted.includes(id)) {
                return currentCompleted;
            }

            return [...currentCompleted, id];
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

// Custom hook
export const usePlan = () => {
    const context = useContext(PlanContext);

    if (!context) {
        throw new Error(
            "usePlan must be used inside PlanProvider"
        );
    }

    return context;
};
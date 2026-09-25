"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import { Workout } from "@/types/workout";

type PlanContextType = {
    plan: Workout[];
    saved: Workout[];
    completed: string[];
    hydrated: boolean;

    addToPlan: (workout: Workout) => void;
    addToSaved: (workout: Workout) => void;
    removeFromPlan: (id: string) => void;
    removeFromSaved: (id: string) => void;
    markAsDone: (id: string) => void;
};

const PlanContext = createContext<PlanContextType | null>(null);

const getStoredData = <T,>(
    key: string,
    fallback: T
): T => {
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
    const [plan, setPlan] = useState<Workout[]>([]);
    const [saved, setSaved] = useState<Workout[]>([]);
    const [completed, setCompleted] = useState<string[]>([]);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setPlan(
                getStoredData<Workout[]>(
                    "fitlog-plan",
                    []
                )
            );

            setSaved(
                getStoredData<Workout[]>(
                    "fitlog-saved",
                    []
                )
            );

            setCompleted(
                getStoredData<string[]>(
                    "fitlog-completed",
                    []
                )
            );

            setHydrated(true);
        }, 0);

        return () => {
            window.clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (!hydrated) return;

        localStorage.setItem(
            "fitlog-plan",
            JSON.stringify(plan)
        );
    }, [plan, hydrated]);

    useEffect(() => {
        if (!hydrated) return;

        localStorage.setItem(
            "fitlog-saved",
            JSON.stringify(saved)
        );
    }, [saved, hydrated]);

    useEffect(() => {
        if (!hydrated) return;

        localStorage.setItem(
            "fitlog-completed",
            JSON.stringify(completed)
        );
    }, [completed, hydrated]);

    const addToPlan = (workout: Workout) => {
        setPlan((currentPlan) => {
            const exists = currentPlan.some(
                (item) => item.id === workout.id
            );

            if (exists || currentPlan.length >= 5) {
                return currentPlan;
            }

            return [...currentPlan, workout];
        });
    };

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

    const removeFromSaved = (id: string) => {
        setSaved((currentSaved) =>
            currentSaved.filter(
                (item) => item.id !== id
            )
        );
    };

    const markAsDone = (id: string) => {
        setCompleted((currentCompleted) => {
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
                hydrated,
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
// workoutcard 
import Link from "next/link";
import Image from "next/image";
import { Clock3, Flame, Star } from "lucide-react";
import { Workout } from "@/types/workout";

type Props = {
    workout: Workout;
};

const WorkoutCard = ({ workout }: Props) => {
    const categories = Array.isArray(workout.category)
        ? workout.category
        : workout.category
            ? [workout.category]
            : [];

    return (
        <Link href={`/workout/${workout.id}`}>
            <div className="bg-[#111827] rounded-[24px] overflow-hidden border border-[#1F2937] hover:border-[#CCFF00] transition-all duration-300 cursor-pointer hover:-translate-y-1">

                {/* Image */}
                <div className="relative w-full h-[190px]">
                    <img
                        src={workout.image}
                        alt={workout.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Category Pills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {categories.map((item, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 rounded-full bg-[#CCFF00] text-black text-[10px] font-bold uppercase tracking-wide"
                            >
                                {item}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-white text-xl font-bold uppercase leading-tight">
                        {workout.name}
                    </h2>

                    {/* Equipment */}
                    <p className="text-gray-400 text-sm mt-2">{workout.equipment}</p>

                    {/* Divider */}
                    <div className="border-t border-[#1F2937] my-4"></div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-gray-400 text-xs">
                        <div className="flex items-center gap-1">
                            <Clock3 size={14} />
                            <span>{workout.duration} min</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <Flame size={14} />
                            <span>{workout.caloriesBurned} cal</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <Star size={14} />
                            <span>{workout.rating}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default WorkoutCard;
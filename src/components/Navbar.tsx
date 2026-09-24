// FitLog Navbar Component
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { usePlan } from "@/context/PlanContext";

const Navbar = () => {
    const pathname = usePathname();
    const { plan, saved } = usePlan();

    const isWorkoutPage =
        pathname === "/" || pathname.startsWith("/workout/");

    const isMyPlanPage = pathname === "/my-plan";

    return (
        <header className="sticky top-0 z-50 h-[66px] border-b border-[#17191d] bg-[#0d0f12]/95 backdrop-blur">
            <nav className="mx-auto flex h-full w-full max-w-[1295px] items-center px-4 sm:px-5">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex shrink-0 items-center gap-2"
                    aria-label="FitLog Home"
                >
                    <Image
                        src="/images/logo.png"
                        alt="FitLog logo"
                        width={24}
                        height={24}
                        className="h-6 w-6 object-contain"
                    />

                    <span className="text-[16px] font-bold tracking-[-0.3px] text-[#f2f2f2] sm:text-[17px]">
                        FITLOG
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 md:flex">
                    <Link
                        href="/"
                        className={`rounded-full px-4 py-2 text-xs font-semibold transition ${isWorkoutPage
                                ? "bg-[#17210d] text-[#ccff00]"
                                : "text-[#999ca3] hover:text-white"
                            }`}
                    >
                        Workout
                    </Link>

                    <Link
                        href="/my-plan"
                        className={`rounded-full px-4 py-2 text-xs font-semibold transition ${isMyPlanPage
                                ? "bg-[#17210d] text-[#ccff00]"
                                : "text-[#999ca3] hover:text-white"
                            }`}
                    >
                        My Plan
                    </Link>
                </div>

                {/* Mobile Navigation */}
                <div className="ml-auto flex items-center gap-1 md:hidden">
                    <Link
                        href="/"
                        className={`rounded-full px-2.5 py-1.5 text-[10px] font-semibold transition sm:px-3 sm:py-2 sm:text-[11px] ${isWorkoutPage
                                ? "bg-[#17210d] text-[#ccff00]"
                                : "text-[#999ca3] hover:text-white"
                            }`}
                    >
                        Workout
                    </Link>

                    <Link
                        href="/my-plan"
                        className={`rounded-full px-2.5 py-1.5 text-[10px] font-semibold transition sm:px-3 sm:py-2 sm:text-[11px] ${isMyPlanPage
                                ? "bg-[#17210d] text-[#ccff00]"
                                : "text-[#999ca3] hover:text-white"
                            }`}
                    >
                        My Plan
                    </Link>
                </div>

                {/* Desktop Counters */}
                <div className="ml-auto hidden items-center gap-6 md:flex">
                    {/* Plan */}
                    <Link
                        href="/my-plan"
                        className="flex items-center gap-2 text-xs font-medium text-[#d0d1d4] transition hover:text-white"
                    >
                        <span>Plan</span>

                        <span className="flex h-[21px] min-w-[21px] items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[11px] font-bold leading-none text-black">
                            {plan.length}
                        </span>
                    </Link>

                    {/* Saved */}
                    <Link
                        href="/my-plan"
                        className="flex items-center gap-2 text-xs font-medium text-[#d0d1d4] transition hover:text-white"
                    >
                        <span>Saved</span>

                        <span className="flex h-[21px] min-w-[21px] items-center justify-center rounded-full border border-[#777b82] px-1.5 text-[11px] font-bold leading-none text-white">
                            {saved.length}
                        </span>
                    </Link>
                </div>

                {/* Mobile Counters */}
                <div className="ml-2 flex items-center gap-1.5 md:hidden">
                    {/* Plan */}
                    <Link
                        href="/my-plan"
                        aria-label={`Today's plan: ${plan.length}`}
                        className="flex h-[21px] min-w-[21px] items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[11px] font-bold leading-none text-black transition hover:bg-[#baff00]"
                    >
                        {plan.length}
                    </Link>

                    {/* Saved */}
                    <Link
                        href="/my-plan"
                        aria-label={`Saved workouts: ${saved.length}`}
                        className="flex h-[21px] min-w-[21px] items-center justify-center rounded-full border border-[#777b82] px-1.5 text-[11px] font-bold leading-none text-white transition hover:border-white"
                    >
                        {saved.length}
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
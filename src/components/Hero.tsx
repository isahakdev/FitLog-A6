import Image from "next/image";

const Hero = () => {
    return (
        <section className="px-4 py-8 sm:px-5 sm:py-10 lg:py-12">
            <div className="mx-auto flex min-h-[460px] max-w-[1295px] overflow-hidden rounded-2xl border border-[#272b32] bg-[#15171c]">
                {/* Left Content */}
                <div className="flex w-full flex-col justify-center px-7 py-12 sm:px-10 lg:w-[58%] lg:px-14 lg:py-16">
                    {/* Eyebrow */}
                    <p className="mb-6 text-xs font-bold uppercase tracking-wider text-[#ccff00]">
                        Workout Library
                    </p>

                    {/* Heading */}
                    <h1 className="max-w-2xl text-5xl font-black uppercase leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
                        Train with intent.
                        <br />
                        Log every set.
                    </h1>

                    {/* Description */}
                    <p className="mt-6 max-w-xl text-base leading-6 text-[#9da3af]">
                        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
                        into today&apos;s plan, and watch the week&apos;s work add up.
                    </p>

                    {/* CTA */}
                    <a
                        href="#library"
                        className="mt-7 inline-flex h-11 w-fit items-center justify-center gap-2 rounded-md bg-[#ccff00] px-6 text-xs font-bold uppercase tracking-wide text-black transition hover:bg-[#baff00]"
                    >
                        <span>Browse Workouts</span>

                        {/* Arrow Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 12h14m-6-6 6 6-6 6"
                            />
                        </svg>
                    </a>
                </div>

                {/* Right Image */}
                <div className="relative hidden min-h-[460px] flex-1 lg:block">
                    <Image
                        src="/images/banner.png"
                        alt="FitLog workout illustration"
                        fill
                        priority
                        sizes="(min-width: 1024px) 42vw, 0px"
                        className="object-contain object-center"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
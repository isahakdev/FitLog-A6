import Image from "next/image";

const Hero = () => {
    return (
        <section className="border-b border-zinc-800 bg-[#0d0f12]">
            <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-20">

                {/* Hero Content */}
                <div>
                    <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-lime-400">
                        WORKOUT LIBRARY
                    </p>

                    <h1 className="max-w-2xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                        TRAIN WITH INTENT.
                        <br />
                        <span className="text-lime-400">LOG EVERY SET.</span>
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
                        A focused workout library to help you train with purpose,
                        track your progress, and build a stronger routine.
                    </p>

                    <a
                        href="#library"
                        className="mt-8 inline-flex rounded-full bg-lime-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-300"
                    >
                        Browse Workouts
                    </a>
                </div>

                {/* Hero Image */}
                <div className="relative mx-auto w-full max-w-[560px]">
                    <Image
                        src="/images/banner.png"
                        alt="FitLog workout"
                        width={900}
                        height={700}
                        priority
                        className="h-auto w-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
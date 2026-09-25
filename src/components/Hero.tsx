import Image from "next/image";

const Hero = () => {
  return (
    <section className="px-4 py-6 sm:px-5 sm:py-8 lg:py-12">
      <div
        className="
          mx-auto
          flex
          max-w-[1295px]
          flex-col
          overflow-hidden
          rounded-2xl
          border border-[#272b32]
          bg-[#15171c]

          lg:min-h-[460px]
          lg:flex-row
        "
      >
        {/* Left Content */}
        <div
          className="
            flex
            w-full
            flex-col
            justify-center
            px-4
            py-8

            sm:px-6
            sm:py-10

            md:px-8
            md:py-12

            lg:w-[58%]
            lg:px-14
            lg:py-16
          "
        >
          {/* Eyebrow */}
          <p className="mb-5 text-[11px] font-bold uppercase tracking-wide text-[#ccff00] sm:text-xs">
            Workout Library
          </p>

          {/* Heading */}
          <h1
            className="
              max-w-2xl
              text-[32px]
              font-black
              uppercase
              leading-[1.05]
              tracking-tight
              text-white

              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >
            Train with intent.
            <br />
            Log every set.
          </h1>

          {/* Description */}
          <p
            className="
              mt-5
              max-w-xl
              text-sm
              leading-5
              text-[#9da3af]

              sm:mt-6
              sm:text-base
              sm:leading-6
            "
          >
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          {/* CTA */}
          <a
            href="#library"
            className="
              mt-6
              inline-flex
              h-10
              w-fit
              items-center
              justify-center
              gap-2
              rounded-md
              bg-[#ccff00]
              px-4
              text-[11px]
              font-bold
              uppercase
              tracking-wide
              text-black
              transition
              hover:bg-[#baff00]

              sm:mt-7
              sm:h-11
              sm:px-6
              sm:text-xs
            "
          >
            <span>Browse Workouts</span>

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

        {/* Image */}
        <div
          className="
            relative
            h-[300px]
            w-full

            sm:h-[350px]

            md:h-[400px]

            lg:h-auto
            lg:min-h-[460px]
            lg:w-[42%]
          "
        >
          <Image
            src="/Images/banner.png"
            alt="FitLog workout illustration"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 42vw"
            className="object-contain object-center"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
//footer
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t border-zinc-800 bg-[#0d0f12]">
      <div className="mx-auto max-w-[1320px] px-5 py-12 sm:px-8 lg:px-10">

        {/* Footer Main */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <Image
                src="/Images/logo.png"
                alt="FitLog logo"
                width={45}
                height={45}
                className="h-11 w-11 object-contain"
              />

              <h2 className="text-2xl font-black text-white">
                Fit<span className="text-lime-400">Log</span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-zinc-400">
              A focused workout library to help you train with purpose,
              track your progress, and build a stronger routine.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm text-zinc-400">
              <li>
                <a
                  href="/"
                  className="transition hover:text-lime-400"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#library"
                  className="transition hover:text-lime-400"
                >
                  Workout Library
                </a>
              </li>

              <li>
                <a
                  href="/my-plan"
                  className="transition hover:text-lime-400"
                >
                  My Plan
                </a>
              </li>
            </ul>
          </div>

          {/* Workout */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
              Workout
            </h3>

            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="transition hover:text-lime-400">
                Strength Training
              </li>

              <li className="transition hover:text-lime-400">
                Full Body Workout
              </li>

              <li className="transition hover:text-lime-400">
                Cardio
              </li>

              <li className="transition hover:text-lime-400">
                Mobility
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
              Contact
            </h3>

            <ul className="space-y-3 text-sm text-zinc-400">
              <li>Email: support@fitlog.com</li>
              <li>Available 24/7</li>
              <li>Train. Track. Improve.</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-zinc-800" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-zinc-500">
            © 2026 FitLog. All rights reserved.
          </p>

          <p className="text-sm text-zinc-500">
            Train with intent.{" "}
            <span className="text-lime-400">Log every set.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
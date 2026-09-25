import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t border-zinc-800 bg-[#080a0d]">
      <div
        className="
          mx-auto flex max-w-[1320px]
          flex-col items-center justify-center
          gap-4 px-4 py-6
          sm:px-6
          md:flex-row md:justify-between
          md:gap-6 md:py-7
          lg:px-10
        "
      >
        {/* Logo */}
        <Image
          src="/Images/logo.png"
          alt="FitLog"
          width={75}
          height={24}
          className="h-auto w-[75px] shrink-0 object-contain"
        />

        {/* Copyright */}
        <p
          className="
            max-w-full
            text-center text-[11px] leading-5 text-zinc-500
            sm:text-xs
            md:text-right md:text-sm
          "
        >
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
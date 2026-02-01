import HeroBackground from "@/app/partials/hero-section/HeroBackground";
import HeroTitle from "@/app/partials/hero-section/HeroTitle";
import GuestGreeting from "@/app/partials/hero-section/GuestGreeting";
import Countdown from "@/app/components/CountDown";
import ScrollArrow from "@/app/partials/hero-section/ScrollArrow";
import Button from "@/app/elements/button/Button";

export default function Hero() {
  return (
    <div className="relative min-h-[100dvh] transition-all duration-150 flex items-center justify-center text-white font-sans overflow-hidden">
      <HeroBackground />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45 dark:bg-black/60 backdrop-blur-[2px] grayscale-[20%] z-10"></div>

      {/* Konten */}
      <div className="relative z-20 text-center px-4">
        <GuestGreeting />
        <HeroTitle />

        <div className="flex justify-center items-center flex-col mt-4">
          <Countdown />

          <div className="mt-18 md:mt-14">
            <Button url="#home">Lihat Undangan</Button>
          </div>
        </div>

        <p className="mt-4 text-sm sm:text-base 2xl:text-lg text-gray-300/70 tracking-wide">
          Menuju Hari Bahagia — 15 Februari 2026
        </p>

        {/* scroll arrow */}
        <ScrollArrow />
      </div>

      <div className="absolute h-24 left-0 bottom-0 w-full bg-black/45 dark:bg-black/80 mask-t-from-2 z-10" />
    </div>
  );
}

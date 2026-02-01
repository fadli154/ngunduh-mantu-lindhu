"use client";

import { motion } from "framer-motion";
import { Sacramento } from "next/font/google";
import { FaClock } from "react-icons/fa";

const greSacramento = Sacramento({ subsets: ["latin"], weight: "400" });

type CardProps = {
  title: string;
  day: string;
  month: string;
  year: string;
  date: string;
  time: string;
  icon: React.ReactNode;
};

export default function AnimatedCard({ title, time, icon, day, month, year, date }: CardProps) {
  return (
    <div className="e-card playing relative backdrop-blur-3xl w-full h-65 rounded-2xl overflow-hidden shadow-lg dark:shadow-text-500/10 bg-transparent mx-auto">
      {/* Animated Waves */}
      <motion.div className="absolute w-[540px] h-[700px] opacity-60 left-0 top-0 -ml-[50%] -mt-[70%] bg-gradient-to-tr rounded-[40%] animate-wave1 wave" />
      <motion.div className="absolute w-[540px] h-[700px] opacity-60 left-0 top-0 -ml-[50%] -mt-[70%] bg-gradient-to-tr rounded-[40%] animate-wave2 wave" />
      <motion.div className="absolute w-[540px] h-[700px] opacity-60 left-0 top-0 -ml-[50%] -mt-[70%] bg-gradient-to-tr rounded-[40%] animate-wave3 wave" />

      {/* Info Section */}
      <div className="relative flex justify-center items-center flex-col right-0 top-9 text-center text-white font-semibold text-lg">
        <div className="w-10 h-10 mb-1 text-[#d4af37]/50">{icon}</div>
        <h3 className={`text-[2rem] md:text-[2.2rem] font-bold ${greSacramento.className} bg-gradient-to-r from-[#d4af37] via-[#807955] to-[#b8860b] bg-clip-text text-transparent font-bold`}>{title}</h3>
        <div className="flex justify-center content-center px-1 -ml-[20px] md:-ml-7 w-full items-center gap-2 mt-4 md:mt-2">
          <p className="text-dark2-600/25 inline-block self-center font-bold place-content-center dark:text-white2-500/70 text-[calc(.7rem+.6vw)] border-r-2 border-[#d4af37]/30 pr-3 min-h-[80px]">{day}</p>
          <div className="-mt-1 px-2">
            <p className="text-dark2-600/30 dark:text-white2-500/70 text-[calc(1.1rem+.6vw)] font-bold">{date}</p>
            <p className="text-dark2-600/25 dark:text-white2-500/70 text-[calc(.7rem+.6vw)] -mt-1 md:-mt-2">{month}</p>
            <div className="flex items-center content-center align-middle -ml-1 gap-2 justify-center text-dark2-600/50 dark:text-white2-500 place-content-center">
              <FaClock size={12} className="opacity-70" />
              <span className="text-center place-content-center align-middle tracking-tighter -ml-[5px] self-center content-center text-dark2-600/25 dark:text-white2-500/70 text-sm md:text-base">{time}</span>
            </div>
          </div>
          <p className="text-dark2-600/25 dark:text-white2-500/70 place-content-center text-[calc(.7rem+.6vw)] border-l-2 border-[#d4af37]/30 pl-3 min-h-[80px] font-bold">{year}</p>
        </div>
      </div>
    </div>
  );
}

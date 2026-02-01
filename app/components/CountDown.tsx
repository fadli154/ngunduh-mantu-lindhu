"use client";

import { useEffect, useState } from "react";

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const now = new Date();
  const targetDate = new Date("2026-02-15T00:00:00");
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => setTimeLeft(getTimeLeft());
    updateCountdown(); // initial
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-4 text-white2-500 text-2xl font-bold justify-center items-center">
      {["Hari", "Jam", "Menit", "Detik"].map((label, i) => {
        const value = [
          timeLeft.days,
          timeLeft.hours,
          timeLeft.minutes,
          timeLeft.seconds,
        ][i];
        return (
          <div key={label} className="animate-pop-fade-up">
            <div className="bg-white/10 shadow-sm text-base md:text-lg lg:text-xl 2xl:text-2xl 2xl:w-24 2xl:h-22 rounded-full w-18 h-16 md:w-20 lg:w-22 lg:h-20 flex justify-center flex-col items-center md:h-18 backdrop-blur-md">
              <div className="opacity-75">{value}</div>
              <span className="block text-sm text-white2-500/60 -mt-1">
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

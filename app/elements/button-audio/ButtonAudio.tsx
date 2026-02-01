"use client";

import { useEffect, useState } from "react";
import { RiDiscLine } from "react-icons/ri";
import { FaRegPauseCircle } from "react-icons/fa";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useMusic } from "./MusicProvider"; // ✅ ambil context

export default function ButtonAudio() {
  const { isPlaying, toggleMusic } = useMusic();
  const [showTooltip, setShowTooltip] = useState(true); // ✅ awalnya tampil

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000); // ✅ auto hilang setelah 5 detik
    return () => clearTimeout(timer);
  }, []);

  return (
    <Tooltip.Provider delayDuration={0}>
      {/* kontrol open pakai state */}
      <Tooltip.Root open={showTooltip}>
        <Tooltip.Trigger asChild>
          <button
            onClick={toggleMusic}
            className="fixed bottom-4 right-4 z-50 w-10 2xl:w-12 h-10 2xl:h-12 rounded-full
              bg-white shadow-lg dark:bg-dark2-600 focus:outline-none 
              active:scale-90 hover:scale-105 flex items-center justify-center"
          >
            <div className="w-12 h-12 2xl:w-14 2xl:h-14 text-dark2-600/50 dark:text-white2-500">{isPlaying ? <RiDiscLine className="w-full h-full animate-spin" /> : <FaRegPauseCircle className="w-full h-full" />}</div>
          </button>
        </Tooltip.Trigger>

        <Tooltip.Content side="top" className="bg-black text-white text-xs px-3 py-1 mr-2 rounded shadow z-50" sideOffset={8}>
          ketuk untuk memutar lagu
          <Tooltip.Arrow className="fill-black" />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

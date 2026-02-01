"use client";
import { RiDiscLine } from "react-icons/ri";
import { FaRegPauseCircle } from "react-icons/fa";
import { useMusic } from "./MusicProvider";

export default function ButtonIcon() {
  const { isPlaying, toggleMusic } = useMusic();

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-4 right-4 z-50 w-10 h-10 rounded-full 
                 bg-white shadow-lg dark:bg-dark2-600 
                 flex items-center justify-center 
                 transition-all duration-200 active:scale-90 hover:scale-105"
    >
      {isPlaying ? <RiDiscLine className="w-full h-full animate-spin" /> : <FaRegPauseCircle className="w-full h-full" />}
    </button>
  );
}

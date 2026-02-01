"use client";

import Link from "next/link";
import { HiOutlineMailOpen } from "react-icons/hi";
import React from "react";
import { useMusic } from "@/app/elements/button-audio/MusicProvider"; // ✅ ambil context

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  url: string;
};

const isExternal = (url: string): boolean => /^https?:\/\//.test(url);

const Button = ({ children, className = "", url }: ButtonProps) => {
  const { toggleMusic } = useMusic();

  const content = (
    <div
      onClick={toggleMusic} // ✅ klik -> play/pause musik
      className={`cursor-pointer group relative flex items-center justify-center bg-white/30 backdrop-blur-md hover:bg-zinc-300/70 text-black font-semibold text-sm px-6 py-0 md:py-3 rounded-full transition-all duration-300 ease-in-out shadow-sm hover:shadow-lg w-45 h-8 md:w-45 md:h-12 active:scale-95 touch-manipulation ${className}`}
    >
      <div className="relative flex items-center justify-center gap-2 overflow-hidden">
        <span className="relative flex items-center justify-center h-5 md:h-6">
          <span className="transition-transform duration-300 group-hover:-translate-y-full group-focus:-translate-y-full group-active:-translate-y-full">{children}</span>
          <span className="absolute top-full transition-transform duration-300 group-hover:translate-y-[-100%] group-focus:translate-y-[-100%] group-active:translate-y-[-100%]">Right Now</span>
        </span>
        <div className="transition-transform duration-300 group-hover:rotate-45 group-focus:rotate-45 group-active:rotate-45">
          <HiOutlineMailOpen className="w-4 h-4" />
        </div>
      </div>
    </div>
  );

  return isExternal(url) ? (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <Link href={url}>{content}</Link>
  );
};

export default Button;

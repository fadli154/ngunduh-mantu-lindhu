"use client";

import { useEffect, useRef, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { ModeToggle } from "@/app/elements/mode-toggle/ModeToggle";
import clsx from "clsx";
import { Grey_Qo } from "next/font/google";
import Image from "next/image";

const greGrey_Qo = Grey_Qo({ subsets: ["latin"], weight: "400" });

const navItems = [
  { label: "Home", to: "home" },
  { label: "Info", to: "info" },
  { label: "RSVP", to: "rsvp" },
  { label: "Gift", to: "gift" },
  { label: "Gallery", to: "gallery" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden relative z-[60]">
      {/* Hamburger Button */}
      <button ref={buttonRef} className="w-8 h-8 flex flex-col justify-center items-center group z-[60] relative" onClick={() => setIsOpen((prev) => !prev)}>
        <span className={clsx("absolute w-8 h-1 bg-text-500 rounded transition-all duration-300 origin-center", isOpen ? "rotate-45" : "-translate-y-2")} />
        <span className={clsx("absolute w-8 h-1 right-1 bg-text-500 rounded transition-all duration-300", isOpen ? "opacity-0" : "translate-y-0")} />
        <span className={clsx("absolute w-8 h-1 bg-text-500 rounded transition-all duration-300 origin-center", isOpen ? "-rotate-45" : "translate-y-2")} />
      </button>

      {/* Slide Menu */}
      <div
        ref={menuRef}
        className={clsx(
          "fixed top-0 left-0 h-full bg-white2-500 dark:bg-background w-64 min-h-screen shadow-xl transition-transform duration-300 ease-in-out flex flex-col p-6 shadow-dark2-600/10 dark:shadow-white2-500/5 space-y-6 z-50 items-center",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className={clsx(greGrey_Qo.className, "text-3xl py-5 2xl:text-5xl font-bold tracking-widest text-text-500 lg:text-4xl drop-shadow-sm drop-shadow-text-500 mb-4")} style={{ transform: "scale(1.1)" }}>
          <Image src="/img/heart.png" className="min-h-10 min-w-10 2xl:min-h-25 2xl:min-w-25 drop-shadow-sm drop-shadow-text-500/60 dark:brightness-75" alt="foto-hati" width={35} height={35} priority />
        </div>

        {navItems.map((item) => (
          <ScrollLink
            key={item.to}
            to={item.to}
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
            onClick={() => setIsOpen(false)}
            activeClass="text-yellow-600 dark:text-yellow-400 font-bold"
            className={`cursor-pointer text-md text-zinc-600 dark:text-zinc-200 hover:text-black dark:hover:text-white transition-colors text-center m-0 py-6 border-b w-full border-zinc-400/20 ${item.label == "Home" ? "border-t" : ""}`}
          >
            {item.label}
          </ScrollLink>
        ))}

        <div className="py-6">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

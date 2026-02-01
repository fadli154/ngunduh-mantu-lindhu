"use client";

import { Link as ScrollLink } from "react-scroll";
import { ModeToggle } from "@/app/elements/mode-toggle/ModeToggle";

const navItems = [
  { label: "Home", to: "home" },
  { label: "Info", to: "info" },
  { label: "Gift", to: "gift" },
  { label: "Gallery", to: "gallery" },
];

export default function NavLinks() {
  return (
    <div className="hidden lg:flex space-x-10 2xl:space-x-14 items-center">
      {navItems.map((item) => (
        <ScrollLink
          key={item.to}
          to={item.to}
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
          activeClass="text-yellow-600 dark:text-yellow-400 font-bold"
          className="cursor-pointer text-zinc-500 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-all duration-300 text-sm lg:text-md 2xl:text-xl"
        >
          {item.label}
        </ScrollLink>
      ))}
      <ModeToggle />
    </div>
  );
}

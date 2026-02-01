import { Grey_Qo } from "next/font/google";
import clsx from "clsx";
import NavLinks from "@/app/components/navbar/NavbarLinks";
import MobileMenu from "@/app/components/navbar/MobileMenu";

const greGrey_Qo = Grey_Qo({ subsets: ["latin"], weight: "400" });

export default function Navbar() {
  return (
    <nav
      className={clsx(
        "sticky top-0 z-50 w-full px-8 md:px-18 pt-6 pb-5 flex justify-between items-center transition-all duration-300",
        "backdrop-blur-4xl backdrop-blur-lg bg-white/5 shadow-sm dark:shadow-white/5 border-b border-zinc-100/10",
      )}
    >
      <div
        className={clsx(
          greGrey_Qo.className,
          "text-3xl 2xl:text-5xl pb-1 -mt-[7px] tracking-widest bg-gradient-to-r from-[#d4af37] via-[#cfc6978f] dark:via-[#cfc697] to-[#b8860b] bg-clip-text text-transparent font-bold",
        )}
      >
        Lindhu & Fikha
      </div>
      <NavLinks />
      <MobileMenu />
    </nav>
  );
}

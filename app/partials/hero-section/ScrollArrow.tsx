"use client";

import { useEffect, useState } from "react";
import { HiMiniArrowLongDown } from "react-icons/hi2";

export default function ScrollArrow() {
  const [visible, setVisible] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => setHidden(true), 1000); // delay sama dengan durasi animasi
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 -bottom-33 md:-bottom-18 2xl:-bottom-40 mt-14 md:mt-8 py-2 rounded-full border-1 animate-bounce transition-all duration-1000 ease-in-out
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      <HiMiniArrowLongDown size={23} />
    </div>
  );
}

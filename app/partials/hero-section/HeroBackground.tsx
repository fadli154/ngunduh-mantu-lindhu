"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const bgImages = ["/img/hero2.jpeg", "/img/hero.jpeg", "/img/hero3.jpeg"];

export default function HeroBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % bgImages.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="absolute inset-0 z-0">
      {prevIndex !== null && (
        <motion.div
          key={`prev-${prevIndex}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${bgImages[prevIndex]}')` }}
        />
      )}
      <motion.div
        key={`current-${currentIndex}`}
        initial={{ opacity: 0, filter: "blur(12px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${bgImages[currentIndex]}')` }}
      />
    </div>
  );
}

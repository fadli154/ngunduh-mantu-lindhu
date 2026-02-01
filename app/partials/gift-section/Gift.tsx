"use client";

import { motion, useInView } from "framer-motion";
import FlipCard from "@/app/elements/card/FlipCard";
import { Sacramento } from "next/font/google";
import { easeInOut } from "framer-motion";
import { CiGift } from "react-icons/ci";
import { useRef } from "react";
import Image from "next/image";

const greSacramento = Sacramento({ subsets: ["latin"], weight: "400" });

const flowerVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 50 },
  visible: (custom: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: custom * 0.3, duration: 1, ease: easeInOut },
  }),
};

export default function GiftSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeInOut },
    },
  };

  const imageFade = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1, ease: easeInOut },
    },
  };

  const flowers = [
    {
      id: 1,
      src: "/img/flower2.png",
      x: "-left-19 md:-left-21 -top-12",
      translate: "rotate-80 md:rotate-90",
    },
    {
      id: 2,
      src: "/img/flower2.png",
      x: "-right-19 md:-right-21 -top-12",
      translate: "-rotate-80 md:-rotate-90",
    },
    {
      id: 3,
      src: "/img/flower2.png",
      x: "-left-19 md:-left-21 -bottom-20",
      translate: "rotate-100",
    },
    {
      id: 4,
      src: "/img/flower2.png",
      x: "-right-19 md:-right-21 -bottom-20",
      translate: "-rotate-100",
    },
  ];

  return (
    <section
      id="gift"
      ref={ref}
      className="relative px-6 py-20 md:py-28 flex justify-center items-center"
    >
      {/* Animated Flowers */}
      {flowers.map((flower, i) => (
        <motion.div
          key={flower.id}
          className={`absolute dark:brightness-65 w-35 h-35 lg:w-60 lg:h-60 2xl:w-60 2xl:h-60 ${flower.x} ${flower.translate}`}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={flowerVariants}
          custom={i}
        >
          <Image
            src={flower.src}
            alt={`flower-${flower.id}`}
            fill
            className="object-contain drop-shadow-md"
          />
        </motion.div>
      ))}
      <div className="w-full max-w-5xl flex flex-col items-center text-center gap-10">
        <div className="flex justify-center items-center flex-col">
          {/* Judul */}
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`
            ${greSacramento.className}
            text-[calc(2.5rem+1.5vw)] 
            font-bold 2xl:text-8xl
            bg-gradient-to-r from-[#d4af37] via-[#f1e189] to-[#b8860b]
            bg-clip-text text-transparent 2xl:pb-9
          `}
          >
            Gift
          </motion.h2>
          <p className="text-sm md:text-md mt-1 text-center text-dark2-600/60 dark:text-white2-500/50 max-w-[90%] lg:max-w-[70%] text-[calc(.7rem+.7vw)]">
            <CiGift className="inline mr-1 pb-1" size={30} />
            Tanpa mengurangi rasa hormat, bagi keluarga dan sahabat yang ingin
            mengirimkan tanda kasih, ketuk kartu ini untuk menyalin nomor
            rekening.
          </p>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-5 -mt-4">
          <FlipCard
            bankName="BCA"
            rek="7621 5689 00"
            name="Lindhu Wicaksono Ariardi"
          />
          <FlipCard bankName="BCA" rek="7615 3231 36" name="Fikha Monisa" />
        </div>

        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-5 -mt-4">
          <FlipCard
            bankName="Dana"
            rek="0823 2821 8710"
            name="Lindhu Wicaksono Ariardi"
          />
          <FlipCard bankName="BCA" rek="7620 6254 63" name="Nardi" />
        </div>
      </div>
    </section>
  );
}

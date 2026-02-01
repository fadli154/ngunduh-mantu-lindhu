"use client";

import { Sacramento } from "next/font/google";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { easeInOut } from "framer-motion";
import { useRef } from "react";

const sacramento = Sacramento({ subsets: ["latin"], weight: "400" });

const flowerVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 50 },
  visible: (custom: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: custom * 0.3, duration: 1, ease: easeInOut },
  }),
};

export default function Home() {
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
      src: "/img/flower1.png",
      x: "-left-19 md:-left-21 top-75 md:-top-12",
      translate: "rotate-80 md:rotate-90",
    },
    {
      id: 2,
      src: "/img/flower1.png",
      x: "-right-19 md:-right-21 top-75 md:-top-12",
      translate: "-rotate-80 md:-rotate-90",
    },
    {
      id: 3,
      src: "/img/flower1.png",
      x: "-left-19 md:-left-21 bottom-68 md:-bottom-28",
      translate: "rotate-100",
    },
    {
      id: 4,
      src: "/img/flower1.png",
      x: "-right-19 md:-right-21 bottom-68 md:-bottom-28",
      translate: "-rotate-100",
    },
  ];

  return (
    <div
      key={"info-section"}
      ref={ref}
      className="relative min-h-screen container flex flex-col items-center justify-center text-secondary-500 dark:text-white2-500 font-sans bg-cover bg-center transition-all duration-300 px-4 pb-2"
      id="home"
    >
      {/* Animated Flowers */}
      {flowers.map((flower, i) => (
        <motion.div
          key={flower.id}
          className={`absolute dark:brightness-65 w-35 h-35 lg:w-60 z-20 lg:h-60 2xl:w-60 2xl:h-60 ${flower.x} ${flower.translate}`}
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

      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        variants={fadeUp}
      >
        <h1
          className={`
            ${sacramento.className}
            text-[calc(2.5rem+1.5vw)] 
            font-bold 2xl:text-8xl
            bg-gradient-to-r from-[#d4af37] via-[#cfc6978f] dark:via-[#cfc697] to-[#b8860b]
            bg-clip-text text-transparent 
          `}
        >
          Ngunduh Mantu
        </h1>

        <motion.h3
          className="text-dark2-600 dark:text-white2-500 text-[calc(.7rem+.7vw)] lg:text-lg 2xl:text-2xl 2xl:mt-2"
          variants={fadeUp}
          transition={{ delay: 0.2 }}
        >
          Diselenggarakan pada 15 Februari 2026 di Tangerang, Banten.
        </motion.h3>

        <motion.h4
          className="text-dark2-600/70 dark:text-white2-500/50 lg:text-sm 2xl:text-lg w-full md:w-1/2 mt-2 2xl:mt-4 text-[calc(.6rem+.6vw)]"
          variants={fadeUp}
          transition={{ delay: 0.4 }}
        >
          Oleh karena itu, dengan segala hormat, kami bermaksud untuk mengundang
          Bapak/Ibu, saudara, dan teman-teman untuk hadir pada acara kami.
        </motion.h4>

        <div className="flex mt-10 2xl:mt-20 justify-evenly items-start md:items-center gap-4">
          {/* Mempelai Pria */}
          <motion.div
            className="flex justify-center items-center flex-col lg:flex-row-reverse"
            variants={imageFade}
            transition={{ delay: 0.6 }}
          >
            <Image
              src="/img/lindhu.png"
              className="relative drop-shadow-md z-30 drop-shadow-text-500/60  right-4 md:-right-5 h-25 w-25 md:h-45 md:w-45 2xl:h-60 2xl:w-60 rounded-t-full md:rounded-b-full"
              alt="foto-mempelai-pria"
              width={180}
              height={180}
              priority
            />
            <div className="flex flex-col-reverse mt-3 justify-center items-center relative right-4">
              <p className="text-dark2-600/70 dark:text-white2-500 mt-0 md:mt-2 text-[calc(.6rem+.6vw)] 2xl:text-xl">
                Putra Pertama dari Bapak Nardi & Ibu Sri Lestari
              </p>
              <h1
                className={`${sacramento.className} bg-gradient-to-r from-[#d4af37] via-[#cfc6978f] dark:via-[#cfc697] to-[#b8860b] bg-clip-text text-transparent font-bold text-[calc(1.5rem+1.5vw)]`}
              >
                Lindhu Wicaksono Ariardi
              </h1>
            </div>
          </motion.div>

          {/* Icon Hati */}
          <motion.div
            className="z-10 mt-9 md:mt-0"
            variants={fadeUp}
            transition={{ delay: 0.8 }}
          >
            <Image
              src="/img/heart.png"
              className="min-h-12 min-w-12 2xl:min-h-25 2xl:min-w-25 drop-shadow-sm drop-shadow-text-500/60 dark:brightness-75"
              alt="foto-hati"
              width={80}
              height={80}
              priority
            />
          </motion.div>

          {/* Mempelai Wanita */}
          <motion.div
            className="flex justify-center items-center flex-col lg:flex-row"
            variants={imageFade}
            transition={{ delay: 1 }}
          >
            <Image
              src="/img/fikha.png"
              className="relative drop-shadow-md z-30 drop-shadow-text-500/60 left-4 h-25 w-25 md:h-45 md:w-45 2xl:h-60 2xl:w-60 md:-left-5 rounded-t-full md:rounded-b-full"
              alt="foto-mempelai-wanita"
              width={180}
              height={180}
              priority
            />
            <div className="flex flex-col-reverse mt-3 justify-center items-center relative left-4">
              <p className="text-dark2-600/70 dark:text-white2-500 mt-0 md:mt-2 text-[calc(.6rem+.6vw)] 2xl:text-xl">
                Putri pertama dari Bapak Mudi & Ibu Ini Sukarni
              </p>
              <h1
                className={`${sacramento.className} bg-gradient-to-r from-[#d4af37] via-[#cfc6978f] dark:via-[#cfc697] to-[#b8860b] bg-clip-text text-transparent font-bold text-[calc(1.5rem+1.5vw)]`}
              >
                Fikha Monisa
              </h1>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

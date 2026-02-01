"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { TbArrowNarrowRightDashed } from "react-icons/tb";

export interface SlideData {
  title: string;
  button: string;
  src: string;
  category: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  onClick: (index: number) => void;
}

const Slide = ({ slide, index, current, onClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;
      const x = xRef.current;
      const y = yRef.current;
      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const r = slideRef.current?.getBoundingClientRect();
    if (!r) return;
    xRef.current = e.clientX - (r.left + r.width / 2);
    yRef.current = e.clientY - (r.top + r.height / 2);
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        onClick={() => onClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white w-[70vmin] h-[70vmin] mx-[4vmin] z-10 cursor-pointer bg-transparent"
        style={{
          transform: current !== index ? "scale(0.98) rotateX(8deg)" : "scale(1) rotateX(0deg)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full bg-transparent rounded-lg h-full overflow-hidden"
          style={{
            transform: current === index ? "translate3d(calc(var(--x)/30), calc(var(--y)/30), 0)" : "none",
          }}
        >
          <Image
            src={slide.src}
            alt={slide.title}
            width={1200} // ukuran besar asli
            height={800}
            className="absolute inset-0 w-full h-full rounded-lg bg-transparent object-cover"
            style={{ opacity: current === index ? 1 : 0.5 }}
            loading="eager"
            decoding="sync"
          />

          {current === index && <div className="absolute inset-0 bg-black/30" />}
        </div>
        <article className={`relative p-[4vmin] ${current === index ? "opacity-100 visible" : "opacity-0 invisible"} transition-opacity duration-1000 ease-in-out`}></article>
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: "previous" | "next";
  title: string;
  onClick: () => void;
}

const CarouselControl = ({ type, title, onClick }: CarouselControlProps) => (
  <button
    title={title}
    onClick={onClick}
    className={`w-10 h-10 md:w-12 md:h-12 mx-2 flex items-center justify-center bg-zinc-500/10 backdrop-blur-2xl dark:bg-zinc-700/40 rounded-full mt-2 md:mt-1 hover:-translate-y-0.5 transition ${type === "previous" ? "rotate-180" : ""}`}
  >
    <TbArrowNarrowRightDashed className="text-text-500/40 dark:text-text-500/70 w-6 h-6 md:w-8 md:h-8" />
  </button>
);

export interface CarouselProps {
  slides: SlideData[];
  current: number;
  onPrevious: () => void;
  onNext: () => void;
  onSlideClick: (index: number) => void;
}

export const Carousel = ({ slides, current, onPrevious, onNext, onSlideClick }: CarouselProps) => {
  return (
    <div className="relative w-[70vmin] h-[70vmin] mx-auto">
      <ul
        className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide key={index} slide={slide} index={index} current={current} onClick={onSlideClick} />
        ))}
      </ul>
      <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
        <CarouselControl type="previous" title="Sebelumnya" onClick={onPrevious} />
        <CarouselControl type="next" title="Berikutnya" onClick={onNext} />
      </div>
    </div>
  );
};

// WeddingGallery.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sacramento } from "next/font/google";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  FaTimes,
  FaSearchPlus,
  FaDownload,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Carousel } from "@/components/ui/carousel";

const sacramento = Sacramento({ subsets: ["latin"], weight: "400" });

const categories = [
  { id: "family", label: "Moment" },
  { id: "moment", label: "Spesial" },
];

const slideData = [
  {
    id: "1",
    title: "Moment",
    button: "Detail",
    src: "/img/moment.jpeg",
    category: "moment",
  },
  {
    id: "2",
    title: "Moment",
    button: "Detail",
    src: "/img/moment2.jpeg",
    category: "moment",
  },
  {
    id: "3",
    title: "Moment",
    button: "Detail",
    src: "/img/moment3.jpeg",
    category: "moment",
  },
  {
    id: "4",
    title: "Moment",
    button: "Detail",
    src: "/img/hero3.jpeg",
    category: "family",
  },
  {
    id: "5",
    title: "Moment",
    button: "Detail",
    src: "/img/hero2.jpeg",
    category: "family",
  },
  {
    id: "6",
    title: "Moment",
    button: "Detail",
    src: "/img/moment4.jpeg",
    category: "family",
  },
  {
    id: "7",
    title: "Moment",
    button: "Detail",
    src: "/img/moment5.jpeg",
    category: "family",
  },
  {
    id: "8",
    title: "Moment",
    button: "Detail",
    src: "/img/moment6.jpeg",
    category: "family",
  },
];

export default function WeddingGallery() {
  const [selectedCategory, setSelectedCategory] = useState("family");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [modalImage, setModalImage] = useState<{
    src: string;
    title: string;
    category: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredItems = slideData.filter(
    (item) => item.category === selectedCategory,
  );

  useEffect(() => {
    if (!isModalOpen) {
      const interval = setInterval(() => {
        setSelectedImageIndex((prev) => (prev + 1) % filteredItems.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [filteredItems.length, isModalOpen]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedImageIndex(0);
  };

  const handleSlideClick = (index: number) => {
    const item = filteredItems[index];
    setSelectedImageIndex(index);
    setModalImage({
      src: item.src,
      title: item.title,
      category: item.category,
    });
    setIsModalOpen(true);
  };

  const goPrev = () => {
    const newIndex =
      (selectedImageIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImageIndex(newIndex);
    setModalImage({
      src: filteredItems[newIndex].src,
      title: filteredItems[newIndex].title,
      category: filteredItems[newIndex].category,
    });
  };

  const goNext = () => {
    const newIndex = (selectedImageIndex + 1) % filteredItems.length;
    setSelectedImageIndex(newIndex);
    setModalImage({
      src: filteredItems[newIndex].src,
      title: filteredItems[newIndex].title,
      category: filteredItems[newIndex].category,
    });
  };

  return (
    <section
      className="py-18 md:py-20 px-4 sm:px-6 lg:px-10 transition-colors duration-300 bg-primary-500/10 dark:bg-dark2-600"
      id="gallery"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-md font-medium mb-2 text-[#c7a47a] tracking-wide uppercase"
          >
            Galeri
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`text-[2.6rem] sm:text-7xl sm:pb-5 font-bold bg-gradient-to-r from-[#d4af37] via-[#f1e189] to-[#b8860b] bg-clip-text text-transparent ${sacramento.className}`}
          >
            Kenangan{" "}
            <span className="text-dark2-600/20 dark:text-white2-500">
              Indah
            </span>
          </motion.h2>
        </div>

        <div className="overflow-x-auto flex gap-3 justify-center border-b border-gray-200 dark:border-gray-600 pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 text-sm lg:text-base 2xl:text-lg font-medium transition-all border-b-2 ${
                selectedCategory === cat.id
                  ? "text-[#c7a47a] border-[#c7a47a]"
                  : "text-gray-500 dark:text-gray-400 border-transparent hover:text-[#c7a47a]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <Carousel
          slides={filteredItems}
          current={selectedImageIndex}
          onSlideClick={handleSlideClick}
          onPrevious={goPrev}
          onNext={goNext}
        />

        {/* Thumbnail */}
        <div className="flex gap-2 mt-20 md:mt-22 sm:gap-3 md:gap-4 overflow-x-auto justify-center scrollbar-hidden snap-x scroll-pl-4">
          {filteredItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setSelectedImageIndex(index)}
              className={`border-2 rounded-md overflow-hidden snap-start transition-all duration-300 ${
                index === selectedImageIndex
                  ? "border-[#c7a47a]"
                  : "border-transparent hover:border-[#c7a47a] focus:border-[#c7a47a]"
              }`}
            >
              <Image
                src={item.src}
                alt={item.title}
                width={100}
                height={70}
                className="w-20 h-16 sm:w-24 sm:h-20 2xl:w-30 2xl:h-26 object-cover"
              />
            </button>
          ))}
        </div>

        {/* Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent
            showCloseButton={false}
            className="fixed z-[999] flex items-center justify-center bg-black/45 py-10 border-none min-w-full min-h-screen rounded-none"
          >
            <div className="absolute top-10 md:top-8 left-6 text-white text-lg md:text-xl font-semibold">
              <DialogTitle>{modalImage?.title}</DialogTitle>
            </div>

            <div className="absolute top-10 md:top-8 right-6 flex gap-12">
              <button
                className="text-white hover:scale-110 transition"
                onClick={() => window.open(modalImage?.src, "_blank")}
              >
                {" "}
                <FaSearchPlus className="text-xl" />{" "}
              </button>
              <a
                href={modalImage?.src}
                download
                className="text-white hover:scale-110 transition"
              >
                {" "}
                <FaDownload className="text-xl" />{" "}
              </a>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-red-500 hover:rotate-30 focus:rotate-30 transition"
              >
                {" "}
                <FaTimes className="text-2xl" />{" "}
              </button>
            </div>

            <button
              onClick={goPrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/80 hover:scale-125 transition"
            >
              {" "}
              <FaChevronLeft className="text-2xl text-text-500" />{" "}
            </button>
            <button
              onClick={goNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:scale-125 transition"
            >
              {" "}
              <FaChevronRight className="text-2xl text-text-500" />{" "}
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl overflow-hidden px-2 w-[500px] h-[500px] flex items-center justify-center"
            >
              {modalImage && (
                <Image
                  src={modalImage.src}
                  alt="Zoomed"
                  width={1200}
                  height={800}
                  className="max-w-full max-h-full object-contain rounded-xl"
                />
              )}
            </motion.div>

            <div className="absolute bottom-10 md:bottom-8 text-center w-full text-white text-sm">
              {selectedImageIndex + 1} dari {filteredItems.length} Foto
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

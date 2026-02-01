"use client";

import { motion } from "framer-motion";
import { Sacramento } from "next/font/google";
import AnimatedCard from "@/app/elements/card/AnimatedCard";
import { GiDiamondRing } from "react-icons/gi";
import { MdDateRange } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";

const greSacramento = Sacramento({ subsets: ["latin"], weight: "400" });

export default function EventInfo() {
  return (
    <section
      className="w-full relative bg-primary-500/10 dark:bg-dark2-600 text-white dark:text-white2-500 px-6 py-25 transition-colors duration-500 flex flex-col justify-center items-center"
      id="info"
    >
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex flex-col items-center mb-2">
          {/* Hiasan garis di atas */}
          <div className="w-18 h-1 bg-gradient-to-r from-[#d4af37] via-[#f1e189] to-[#b8860b] rounded-full mb-2"></div>

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
            bg-clip-text text-transparent 2xl:pb-6
          `}
          >
            Informasi{" "}
            <span className="text-dark2-600/20 dark:text-white2-500">
              Acara
            </span>
          </motion.h2>
        </div>

        <div className="flex justify-center items-center">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm md:text-md mb-6 text-center text-dark2-600/60 dark:text-white2-500/50 max-w-[80%] lg:max-w-[70%] text-[calc(.7rem+.7vw)]"
          >
            <strong>
              <GrMapLocation className="inline mr-1 pb-2" size={30} />
            </strong>
            Gor Pasar Kemis (Samping Polsek Pasar Kemis) Jl. Raya Pasar Kemis
            Kec. Pasar Kemis, Kab. Tangerang
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full h-64 md:h-80 2xl:h-95 mb-6"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.690997256964!2d106.52706007503726!3d-6.172111493815225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e420076c8ac3749%3A0xbcf747ef37de1d7a!2sJl.%20Raya%20Ps.%20Kemis%20No.212%2C%20Suka%20Harja%2C%20Kec.%20Sindang%20Jaya%2C%20Kabupaten%20Tangerang%2C%20Banten%2015560!5e0!3m2!1sid!2sid!4v1769519460514!5m2!1sid!2sid"
            width="100%"
            height="100%"
            loading="lazy"
            className="rounded-xl shadow-lg dark:shadow-primary-500/15"
            allowFullScreen
          ></iframe>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 mt-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <AnimatedCard
              icon={<MdDateRange size={40} />}
              title="Ngunduh Mantu"
              date="15"
              day="Minggu"
              month="Februari"
              year="2026"
              time="09.00 WIB"
            />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-sm md:text-md 2xl:text-lg mt-5 bg-gradient-to-r from-[#C5A54EFF]/20 via-[#f1e189]/20 to-[#CC960CE1]/20 shadow-lg dark:shadow-text-500/10 p-6 rounded-md text-pretty text-start text-dark2-600/40 dark:text-white2-500/80"
        >
          <strong className=" block text-start h-[60%] border-l-3 sm:border-l-4 pl-2 border-text-500/60 text-text-500/50 text-[calc(.8rem+.6vw)] font-bold mb-3">
            Informasi Penting
          </strong>{" "}
          Diharapkan untuk tidak salah alamat dan tanggal. Jika tiba di tempat
          tanpa tanda-tanda, cek ulang jadwal dan lokasi.
        </motion.p>
      </div>
    </section>
  );
}

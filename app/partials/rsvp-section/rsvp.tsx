"use client";

import { motion } from "framer-motion";
import { Sacramento } from "next/font/google";
import { useState } from "react";
import emailjs from "emailjs-com";
import { FaUser, FaEnvelopeOpenText } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import toast from "react-hot-toast";
import { HiPaperAirplane } from "react-icons/hi2";
import { HiOutlineMail } from "react-icons/hi";

const greSacramento = Sacramento({ subsets: ["latin"], weight: "400" });

export default function RSVPSection() {
  const [form, setForm] = useState({
    nama: "",
    hadir: "Ya",
    ucapan: "",
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          nama: form.nama,
          hadir: form.hadir,
          ucapan: form.ucapan,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(() => {
        setSent(true);
        setLoading(false);
        setForm({ nama: "", hadir: "Ya", ucapan: "" });
        toast.success("Email berhasil dikirim!", {
          // Styling
          className: "text-white2-500 font-semibold",
          iconTheme: {
            primary: "linear-gradient(744deg, #B8870BFF 0%, #BBA56EFF 60%, #E4A507FF)",
            secondary: "#fff",
          },
        });
        // Reset tombol setelah 3 detik
        setTimeout(() => {
          setSent(false);
        }, 2500);
      })
      .catch((error) => {
        console.error("Gagal kirim email:", error?.text || error?.message || error);
        setLoading(false);
      });
  };

  return (
    <section id="rsvp" className="transition-colors duration-300 py-20 sm:py-24 px-8 md:px-10 2xl:px-32">
      <div className="max-w-xl mx-auto flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`${greSacramento.className} text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] 2xl:text-[4rem] font-bold bg-gradient-to-r from-[#d4af37] via-[#f1e189] to-[#b8870bb7] bg-clip-text text-transparent`}
        >
          RSVP
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-sm md:text-md mb-6 text-center text-dark2-600/60 dark:text-white2-500/50 max-w-[80%] lg:max-w-[70%] text-[calc(.7rem+.7vw)]"
        >
          <HiOutlineMail className="inline mr-1 pb-1" size={30} />
          Mohon konfirmasi kehadiran serta doa restu Anda melalui form berikut.
        </motion.p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto mt-1 md:mt-4 bg-white dark:bg-dark2-600/80 rounded-2xl shadow-lg dark:shadow-text-500/15 px-6 md:px-10 py-8 border-t-2 border-[#d4af37] sm:py-10 space-y-6 text-left transition-colors duration-300"
      >
        {/* Nama Lengkap */}
        <div className="relative">
          <label htmlFor="nama" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200 2xl:text-lg">
            Nama Lengkap
          </label>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/40" />
            <input
              type="text"
              id="nama"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Contoh: Siti Kamilah"
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-text-500/20 bg-white/90 dark:bg-dark2-600 text-gray-800 dark:text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gold ring-text-500/30 transition-all"
            />
          </div>
        </div>

        {/* Kehadiran (Dropdown) */}
        <div className="relative">
          <label htmlFor="hadir" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200 2xl:text-lg">
            Konfirmasi Kehadiran
          </label>
          <div className="relative">
            <MdEventAvailable className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/40" />
            <select
              name="hadir"
              id="hadir"
              value={form.hadir}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-text-500/20 bg-white/90 dark:bg-dark2-600 text-gray-800 dark:text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gold ring-text-500/30 transition-all appearance-none"
            >
              <option value="Ya">Hadir</option>
              <option value="Tidak">Tidak Hadir</option>
            </select>
          </div>
        </div>

        {/* Ucapan & Doa */}
        <div className="relative">
          <label htmlFor="ucapan" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200 2xl:text-lg">
            Ucapan & Doa
          </label>
          <div className="relative">
            <FaEnvelopeOpenText className="absolute left-3 top-3 md:top-4 text-gray-400 dark:text-white/40" />
            <textarea
              id="ucapan"
              name="ucapan"
              rows={4}
              value={form.ucapan}
              onChange={handleChange}
              placeholder="Sampaikan ucapan atau doa terbaik Anda..."
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-text-500/20 bg-white/90 dark:bg-dark2-600 text-gray-800 dark:text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gold ring-text-500/30 transition-all resize-none"
            />
          </div>
        </div>

        {/* Tombol Submit */}
        <div className="text-center pt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-[#d4af37] to-[#b8870b] hover:brightness-110 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all shadow-lg disabled:opacity-70 group"
          >
            <span className="mr-2 inline-block">{loading ? "Mengirim..." : sent ? "Terkirim" : "Kirim Ucapan"}</span>
            <HiPaperAirplane className="inline-block origin-center relative -top-[2px] -rotate-25 group-hover:rotate-0 focus:rotate-0 transition-all" />
          </button>
        </div>
      </motion.form>
    </section>
  );
}

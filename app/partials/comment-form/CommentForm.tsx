"use client";

import { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "@/firebase/config";
import { FaUserEdit, FaCommentDots } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { HiPaperAirplane } from "react-icons/hi2";

export default function CommentForm() {
  const [form, setForm] = useState({ nama: "", pesan: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await push(ref(db, "komentar"), {
        nama: form.nama,
        pesan: form.pesan,
        waktu: Date.now(),
        userId: localStorage.getItem("userId"),
      });
      setSent(true);
      setForm({ nama: "", pesan: "" });
      toast.success("Komentar berhasil dikirim!");
      // Reset tombol setelah 3 detik
      setTimeout(() => {
        setSent(false);
      }, 2500);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-dark2-600/80 p-8 rounded-2xl shadow-md border-t-2 border-[#d4af37] space-y-6 max-w-xl w-full mx-auto dark:shadow-text-500/20 -mt-1"
    >
      <div className="relative">
        <label className="text-sm font-semibold text-gray-700 dark:text-white mb-2 block 2xl:text-lg">Nama</label>
        <FaUserEdit className="absolute 2xl:scale-120 left-4 2xl:left-[18px] top-[50.5px] 2xl:top-[64px] -translate-y-1/2 text-gray-400/50" />
        <input
          name="nama"
          value={form.nama}
          onChange={handleChange}
          maxLength={45}
          placeholder="Contoh: Fadli"
          required
          className="pl-10 2xl:pl-11 pr-4 py-3 rounded-lg border w-full border-text-500/25 text-sm bg-white/90 dark:bg-dark2-600 2xl:text-lg text-gray-800 dark:text-white focus:ring-2 focus:ring-gold focus:outline-none ring-text-500/40 2xl:placeholder:text-lg placeholder:opacity-90"
        />
      </div>

      <div className="relative">
        <label className="text-sm font-semibold text-gray-700 dark:text-white mb-2 block 2xl:text-lg">Pesan / Doa</label>
        <FaCommentDots className="absolute left-3 2xl:left-[14px] top-[44px] 2xl:top-[58px] text-gray-400/50" />
        <textarea
          name="pesan"
          value={form.pesan}
          onChange={handleChange}
          rows={4}
          maxLength={200}
          placeholder="Sampaikan ucapan atau doa terbaik..."
          required
          className="pl-10 pr-4 py-3 2xl:text-lg rounded-lg border w-full border-text-500/25 text-sm bg-white/90 dark:bg-dark2-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-gold focus:outline-none ring-text-500/40 resize-none"
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-[#d4af37] to-[#b8870b] hover:brightness-110 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all shadow-lg disabled:opacity-70 group"
        >
          <span className="mr-2 inline-block">{loading ? "Mengirim..." : sent ? "Terkirim" : "Kirim Ucapan"}</span>
          <HiPaperAirplane className="inline-block origin-center relative -top-[2px] -rotate-25 group-hover:rotate-0 group-focus:rotate-0 transition-all" />
        </button>
      </div>
    </motion.form>
  );
}

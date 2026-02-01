"use client";

import { useEffect, useRef, useState } from "react";
import { db } from "@/firebase/config";
import { ref, remove, update, onValue } from "firebase/database";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrashAlt, FaEdit, FaEllipsisH } from "react-icons/fa";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Swal from "sweetalert2";
import { FaClock } from "react-icons/fa";
import { GoPersonFill } from "react-icons/go";
import { format } from "date-fns";
import { id } from "date-fns/locale";

type Komentar = {
  id: string;
  nama: string;
  pesan: string;
  waktu: number;
  userId: string;
};

export default function CommentList() {
  const [comments, setComments] = useState<Komentar[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState("");
  const [localUserId, setLocalUserId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existingId = localStorage.getItem("userId");
    if (existingId) {
      setLocalUserId(existingId);
    } else {
      const newId = crypto.randomUUID();
      localStorage.setItem("userId", newId);
      setLocalUserId(newId);
    }

    const komentarRef = ref(db, "komentar");
    onValue(komentarRef, (snapshot) => {
      const data = snapshot.val();
      const result: Komentar[] = [];
      for (const key in data) {
        result.push({
          id: key,
          ...data[key],
        });
      }

      setComments(result);

      // Scroll ke bawah
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, 100);
    });
  }, []);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Yakin hapus komentar ini?",
      text: "Komentar tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      backdrop: true,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });

    if (!result.isConfirmed) return;

    // Animasi keluar lalu hapus dari UI dulu
    setComments((prev) => prev.filter((c) => c.id !== id));

    setTimeout(async () => {
      await remove(ref(db, `komentar/${id}`));
      Swal.fire("Berhasil!", "Komentar berhasil dihapus.", "success");
    }, 300);
  };

  const handleEdit = async (id: string) => {
    await update(ref(db, `komentar/${id}`), {
      pesan: editedText,
    });
    setEditingId(null);
    Swal.fire("Berhasil!", "Komentar berhasil diubah.", "success");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-xl w-full mx-auto mt-4">
      <div ref={containerRef} className="min-h-[170px] max-h-[400px] overflow-y-auto overflow-x-hidden w-full space-y-4 pr-2">
        <AnimatePresence mode="popLayout">
          {comments.length === 0 && <p className="text-center text-sm text-gray-500 dark:text-white/60 -mr-1">Belum ada komentar.</p>}
          {comments.map((k) => (
            <motion.div
              key={k.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-dark2-600/60 p-6 rounded-xl shadow-sm dark:shadow-text-500/30 border border-text-500/30 dark:border-text-600 relative w-full"
            >
              <div className="flex justify-between items-center w-fit mb-5">
                <div className="p-2 bg-gradient-to-r from-[#d4af37] via-[#ccbd70ce] dark:via-[#bbac4e] to-[#d8a011d2] rounded-full">
                  <GoPersonFill className="w-5 h-5 text-white dark:text-white2-500" />
                </div>
                <div className="ml-[10px] md:-mt-[3px]">
                  <p className="font-semibold text-gray-800/45 dark:text-white text-sm 2xl:text-lg">{k.nama}</p>
                  <div className="text-xs relative -mt-[3px] flex items-center text-gray-500/30 dark:text-white/30 2xl:text-sm">
                    <FaClock className="inline-block mr-1 relative -top-[.1px] md:top-[.6px]" />
                    {/* waktu jam */}
                    <span className="text-xs 2xl:text-sm">{format(new Date(k.waktu), "d MMMM yyyy 'pukul' HH:mm", { locale: id })}</span>
                  </div>
                </div>
              </div>

              {editingId === k.id ? (
                <div>
                  <textarea
                    className="w-full bg-white dark:bg-dark2-600 border border-text-300 dark:border-text-500 rounded px-4 py-6 text-sm text-text-800 dark:text-white"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button onClick={() => setEditingId(null)} className="text-xs text-gray-500 hover:text-gray-700">
                      Batal
                    </button>
                    <button onClick={() => handleEdit(k.id)} className="text-xs text-blue-600 hover:text-blue-800 font-semibold">
                      Simpan
                    </button>
                  </div>
                </div>
              ) : (
                <div className={`flex flex-col border-l-2 border-text-500/10 py-1 dark:border-text-500/20 pl-2`}>
                  <p className="text-sm text-gray-600 dark:text-white/80 break-all whitespace-pre-wrap ">{k.pesan}</p>
                </div>
              )}

              {k.userId === localUserId && editingId !== k.id && (
                <div className="absolute top-4 right-4 text-sm">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="text-text-500/80 hover:text-text-500" title="Menu">
                        <FaEllipsisH size={18} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent forceMount align="end" className="w-28 custom-dropdown-position">
                      <DropdownMenuItem
                        onClick={() => {
                          setEditingId(k.id);
                          setEditedText(k.pesan);
                        }}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <FaEdit size={14} className="text-text-500 focus:text-text-500 " /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(k.id)} className="flex items-center gap-2 cursor-pointer">
                        <FaTrashAlt size={13} className="text-red-500 focus:text-red-700 " /> Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

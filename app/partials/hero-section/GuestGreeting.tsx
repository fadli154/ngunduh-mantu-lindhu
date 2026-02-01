"use client";

import { useSearchParams } from "next/navigation";

export default function GuestGreeting() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to");

  if (!guestName) return null;

  return (
    <p className="mb-6 text-sm sm:text-base 2xl:text-lg text-gray-200 italic animate-fade-in-up">
      💌 Kepada Yth. Bapak/Ibu/Saudara/i <br />
      <span className="font-semibold">{guestName}</span>
    </p>
  );
}

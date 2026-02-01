"use client";

import { useEffect, useState } from "react";

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (loading) {
      html.classList.add("loading");
      body.classList.add("loading");
    } else {
      html.classList.remove("loading");
      body.classList.remove("loading");
    }

    return () => {
      html.classList.remove("loading");
      body.classList.remove("loading");
    };
  }, [loading]);

  return (
    <div className="relative w-full h-full">
      {/* Loader */}
      <div className={`fixed inset-0 flex items-center justify-center bg-white dark:bg-[#0d0d0d] transition-opacity duration-1000 z-50 ${loading ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div className="loader">
          <div className="waves" />
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-opacity duration-1000 ${loading ? "opacity-0" : "opacity-100"}`}>{children}</div>
    </div>
  );
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    domains: ["picsum.photos"], // ✅ tambahkan domain di sini
  },
};

export default nextConfig;

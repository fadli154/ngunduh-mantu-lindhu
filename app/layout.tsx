import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/app/components/theme-provider";
import { Toaster } from "react-hot-toast";
import "@/app/globals.css";
import Loader from "./elements/preloader/Loader";
import { MusicProvider } from "@/app/elements/button-audio/MusicProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  title: "Ngunduh Mantu",
  description: "Lindhu & Fikha Ngunduh Mantu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Loader>
          <Toaster position="bottom-left" />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <MusicProvider>{children}</MusicProvider>
          </ThemeProvider>
        </Loader>
      </body>
    </html>
  );
}

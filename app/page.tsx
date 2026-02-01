import { Suspense } from "react";
import HeroWrapper from "@/app/partials/hero-section/HeroWrapper";
import SkeletonHero from "@/app/partials/hero-section/SkeletonHero";
import Navbar from "./components/navbar/Navbar";
import ButtonIcon from "./elements/button-audio/ButtonAudio";
import RSVPSection from "./partials/rsvp-section/rsvp";
import Gallery from "./partials/gallery-section/Gallery";
import Gift from "./partials/gift-section/Gift";
import FooterSection from "./partials/footer-section/Footer";
import Home from "./partials/home-section/home";
import Info from "./partials/info-section/info";
import CommentSection from "./partials/comment-form/CommentSection";

export default function HomePage() {
  return (
    <main className="overflow-x-clip">
      <Suspense fallback={<SkeletonHero />}>
        <HeroWrapper />
      </Suspense>
      <div className="relative">
        <Navbar />
        <Home />
        <Info />
        <Gift />
        <Gallery />
        <CommentSection />
        <FooterSection />
      </div>
      <ButtonIcon />
    </main>
  );
}

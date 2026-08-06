import type { Metadata } from "next";
import { ArtistGrid } from "@/components/artists/artist-grid";
import { MainHeader } from "@/components/main-header";

export const metadata: Metadata = { title: "Les artistes — NUBE", description: "Les sept artistes de la première édition de NUBE." };

export default function ArtistesPage() {
  return (
    <main className="min-h-screen bg-[#f1efe9] text-[#0a0a0d]">
      <MainHeader />
      <section className="px-[clamp(24px,7vw,110px)] pb-[clamp(90px,11vw,170px)] pt-[clamp(150px,16vw,230px)]">
        <p className="mb-8 text-[11px] font-black tracking-[.18em] opacity-55">NUBE #1 · 21.06.2026</p>
        <h1 className="mb-20 mt-0 text-[clamp(56px,9vw,118px)] leading-[.92] tracking-[-.08em]">SEPT ARTISTES.<br /><em className="font-[Georgia] font-normal text-[#ff3f98]">SEPT UNIVERS.</em></h1>
        <ArtistGrid />
      </section>
    </main>
  );
}

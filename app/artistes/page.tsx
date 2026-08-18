import type { Metadata } from "next";
import { ArtistGrid } from "@/components/artists/artist-grid";
import Link from "next/link";
import { MainHeader } from "@/components/main-header";
import { SiteFooter } from "@/components/site-footer";
import { createPageMetadata } from "@/data/site";

export const metadata: Metadata = createPageMetadata({ title: "Les artistes — NUBE", description: "Les sept artistes de la première édition de NUBE.", path: "/artistes" });

export default function ArtistesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#f1efe9] text-[#0a0a0d]">
      <MainHeader />
      <section className="px-[clamp(24px,7vw,110px)] pb-[clamp(90px,11vw,170px)] pt-[clamp(150px,16vw,230px)]">
        <p className="mb-8 text-[11px] font-black tracking-[.18em] opacity-55">NUBE #1 · 21.06.2026</p>
        <h1 className="mb-14 mt-0 text-[clamp(42px,9vw,118px)] min-[581px]:mb-20 leading-[.92] tracking-[-.08em]">SEPT ARTISTES.<br /><span className="sr-only"> </span><em className="font-[Georgia] font-normal text-[#ff66c4]">SEPT UNIVERS.</em></h1>
        <ArtistGrid numbered={false} />
      </section>
      <section className="grid gap-8 bg-[#0a090b] px-[clamp(24px,7vw,110px)] py-[clamp(72px,9vw,120px)] text-[#f1efe9] min-[901px]:grid-cols-[1fr_auto] min-[901px]:items-end">
        <div><p className="mb-5 text-[11px] font-black tracking-[.18em] text-white/70">APRÈS LA SCÈNE</p><h2 className="m-0 text-[clamp(42px,6vw,78px)] leading-[.92] tracking-[-.06em]">LEURS PASSAGES<br /><span className="sr-only"> </span><em className="font-[Georgia] font-normal text-[#ff66c4]">RESTENT.</em></h2></div>
        <Link className="w-fit border-b border-[#ff66c4] pb-2 text-[11px] font-black tracking-[.15em] text-[#ff66c4]" href="/archives">VOIR L’ARCHIVE NUBE #1</Link>
      </section>
      <SiteFooter />
    </main>
  );
}

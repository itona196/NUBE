import Link from "next/link";
import Image from "next/image";
import { ArtistGrid } from "@/components/artists/artist-grid";
import { CloudArtwork } from "@/components/cloud-artwork";
import { PracticalSection } from "@/components/home/practical-section";
import { MainHeader } from "@/components/main-header";
import { SiteFooter } from "@/components/site-footer";

const section = "relative px-[clamp(24px,7vw,110px)] py-[clamp(64px,8vw,110px)]";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <MainHeader home />

      <section id="top" className="nube-dream-sky relative flex min-h-[720px] items-start overflow-hidden px-[clamp(24px,7vw,110px)] pb-[72px] pt-[145px] min-[581px]:min-h-[760px] min-[901px]:min-h-[92svh] min-[901px]:items-center min-[901px]:pt-[140px]">
        <div className="relative z-4 mt-[35px] w-full min-[901px]:w-[68%]">
          <p className="mb-[18px] text-[clamp(11px,.9vw,13px)] font-extrabold tracking-[.2em] text-[#c8c4cc]">FESTIVAL INDÉPENDANT À LAUSANNE</p>
          <h1 className="m-0 text-[clamp(54px,12vw,96px)] leading-[.92] font-[950] tracking-[-.07em] min-[901px]:text-[clamp(64px,7.5vw,122px)]"><span className="block whitespace-nowrap">NUBE<span className="sr-only"> </span></span><span className="block whitespace-nowrap text-transparent [-webkit-text-stroke:1.5px_rgba(241,239,233,.78)] min-[901px]:ml-[clamp(20px,6vw,90px)]">OPEN AIR.</span></h1>
          <p className="mt-9 max-w-[560px] text-[clamp(15px,1.2vw,18px)] leading-[1.65] text-[#d0ccd3] min-[901px]:ml-[clamp(8px,6vw,90px)]">Un festival qui accompagne des artistes émergents, construit leurs univers et les réunit sur scène à Lausanne.</p>
          <div className="mt-8 flex flex-wrap gap-6 min-[901px]:ml-[clamp(8px,8vw,130px)]"><Link className="bg-[#f1efe9] px-6 py-5 text-[12px] font-black tracking-[.13em] text-[#08080a] transition hover:bg-[#ff66c4]" href="/festival">DÉCOUVRIR LE FESTIVAL</Link><Link className="border-b border-white/40 py-4 text-[11px] font-black tracking-[.15em]" href="/archives">VOIR NUBE #1</Link></div>
        </div>
        <CloudArtwork className="scale-105" />
      </section>

      <PracticalSection />

      <section className={`${section} bg-[#f1efe9] text-[#0a0a0d]`}>
        <div className="mb-12 flex flex-col gap-6 min-[581px]:flex-row min-[581px]:items-end min-[581px]:justify-between"><div><p className="text-[11px] font-black tracking-[.18em] opacity-70">PROGRAMMATION · NUBE #1</p><h2 className="m-0 text-[clamp(44px,6vw,78px)] leading-[.92] tracking-[-.06em]">LES ARTISTES.</h2></div><Link className="border-b border-black/40 pb-2 text-[11px] font-black tracking-[.15em]" href="/artistes">VOIR LES SEPT</Link></div>
        <ArtistGrid names={["DXMXN", "ITONA", "NEL", "Bx"]} numbered={false} descriptions={false} />
      </section>

      <section className={`${section} overflow-hidden bg-[#09090b]`}>
        <div className="grid items-center gap-12 min-[901px]:grid-cols-[1.2fr_.8fr]">
          <div className="relative aspect-video overflow-hidden border border-white/15 bg-[radial-gradient(circle_at_65%_40%,#8e1c5a,#171219_45%,#09090b)]"><Image className="object-contain object-[82%_50%] opacity-70" src="/nube-logo.webp" alt="" fill sizes="(max-width: 900px) 100vw, 60vw" /><span className="absolute bottom-5 left-5 z-2 text-[11px] font-black tracking-[.17em]">NUBE #1 · 21.06.2026</span></div>
          <div><p className="text-[11px] font-black tracking-[.18em] text-white/70">PREMIÈRE ÉDITION</p><h2 className="my-6 text-[clamp(44px,6vw,78px)] leading-[.92] tracking-[-.06em]">ON L’A<br /><span className="sr-only"> </span>FAIT.</h2><p className="max-w-md text-[14px] leading-[1.7] text-white/75">Sept artistes, une scène et une première archive à découvrir.</p><Link className="mt-8 inline-block border-b border-[#ff66c4] pb-2 text-[11px] font-black tracking-[.15em] text-[#ff66c4]" href="/archives">OUVRIR LES ARCHIVES</Link></div>
        </div>
      </section>

      <section className="relative flex min-h-[540px] flex-col items-center justify-center overflow-hidden bg-[#ff66c4] px-6 py-20 text-center text-[#0a090b]">
        <span className="absolute -right-12 top-4 font-[Georgia] text-[clamp(180px,30vw,430px)] italic leading-none text-black/[.06]" aria-hidden="true">N</span>
        <div className="relative z-2">
          <p className="text-[11px] font-black tracking-[.18em]">AU-DELÀ DE LA SCÈNE</p>
          <h2 className="my-8 text-[clamp(44px,7vw,92px)] leading-[.92] tracking-[-.065em]">UN PROJET.<br /><span className="sr-only"> </span><em className="font-[Georgia] font-normal text-white">TOUT UN MONDE.</em></h2>
          <p className="mx-auto mb-8 max-w-lg text-[15px] font-medium leading-[1.7] text-[#24151d]">NUBE Studio transforme une intention artistique en identité, en images et en expérience.</p>
          <Link className="inline-flex bg-[#09090b] px-7 py-5 text-[12px] font-black tracking-[.15em] text-white transition hover:-translate-y-0.5" href="/creation">ENTRER DANS LE STUDIO</Link>
        </div>
      </section>
      <SiteFooter theme="pink" />
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { Aftermovie } from "@/components/aftermovie";
import { MainHeader } from "@/components/main-header";
import { SiteFooter } from "@/components/site-footer";
import { createPageMetadata } from "@/data/site";

/* eslint-disable @next/next/no-html-link-for-pages */

export const metadata: Metadata = createPageMetadata({
  title: "Archives — NUBE Festival",
  description: "Les éditions, artistes et souvenirs du festival NUBE à Lausanne.",
  path: "/archives",
});

const section = "relative px-[clamp(24px,7vw,110px)] py-[clamp(64px,8vw,112px)]";
const index = "mb-6 text-[11px] font-black tracking-[.18em] opacity-70";

export default function ArchivesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="nube-surface-dark bg-[#09090b]">
      <MainHeader />
      <section id="top" className="nube-dream-sky relative flex min-h-[680px] flex-col justify-start overflow-hidden px-[clamp(24px,7vw,110px)] pb-20 pt-[150px] min-[581px]:min-h-[72svh] min-[581px]:justify-center">
        <p className="absolute left-[clamp(24px,7vw,110px)] top-[108px] text-[12px] font-extrabold tracking-[.23em] text-[#bdb8c0] min-[581px]:top-[125px]"><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#ff66c4] shadow-[0_0_12px_#ff66c4]" /> MÉMOIRE VIVANTE · LAUSANNE</p><p className={`${index} relative z-2 !mb-[22px]`}>NUBE / DEPUIS 2026</p><h1 className="relative z-2 m-0 text-[48px] leading-[.98] min-[360px]:text-[56px] min-[380px]:text-[64px] min-[581px]:leading-[.92] tracking-[-.085em] min-[581px]:text-[clamp(72px,11vw,140px)]">NOS<br /><span className="sr-only"> </span><em className="font-[Georgia] font-normal text-[var(--nube-accent-text)]">ARCHIVES.</em></h1><p className="relative z-2 mt-[46px] max-w-[480px] text-[13px] leading-[1.7] text-[#bdb8c0] min-[581px]:ml-[8vw] min-[581px]:text-[15px]">Chaque édition devient un chapitre : ses artistes, ses images, ses coulisses et les mondes créés ensemble.</p><div className="absolute right-[-20vw] top-[46%] z-2 grid aspect-square w-[75vw] place-items-center rounded-full border border-white/20 opacity-55 before:absolute before:inset-[17%] before:rounded-full before:border before:border-white/15 min-[581px]:right-[-5vw] min-[581px]:top-[24%] min-[581px]:w-[min(32vw,460px)] min-[901px]:right-[6vw] min-[901px]:opacity-100" aria-hidden="true"><span className="absolute right-[8%] top-[46%] z-2 font-[Georgia] text-[15px] italic">01</span><Image className="object-contain p-[6%] drop-shadow-[0_0_40px_rgba(255,63,152,.42)]" src="/nube-logo.webp" alt="" fill sizes="(max-width: 580px) 75vw, (max-width: 900px) 32vw, 460px" priority /></div>
      </section>

      <section id="edition-one" className={`${section} nube-surface-light bg-[#f1efe9] text-[#0a0a0d]`}>
        <div className="flex flex-col items-start justify-between gap-[30px] min-[581px]:flex-row min-[581px]:items-end"><div><p className={index}>CHAPITRE 01 · 21.06.2026</p><h2 className="m-0 text-[72px] leading-[.92] tracking-[-.08em] min-[581px]:text-[clamp(62px,9vw,110px)]">NUBE<br /><span className="sr-only"> </span>OPEN AIR</h2></div><span className="mb-[7px] text-[11px] font-black tracking-[.19em]">LAUSANNE · PREMIÈRE ÉDITION</span></div>
        <div id="aftermovie" className="mt-20 overflow-hidden bg-black"><Aftermovie /></div>
        <div className="mt-[30px] grid gap-[18px] border-t border-[#bbb5ad] pt-[25px] min-[581px]:grid-cols-[.5fr_1.5fr] min-[581px]:gap-10"><strong className="text-[11px] tracking-[.17em]">07 ARTISTES · 01 SCÈNE</strong><p className="m-0 max-w-2xl text-[14px] leading-[1.65] text-[#5d5960]">Le 21 juin 2026, sept artistes se sont réunis sur la scène de NUBE à Lausanne. L’aftermovie retrace cette première édition, point de départ d’une histoire commune.</p></div>
      </section>

      <section id="future" className={`${section} flex min-h-[80vh] flex-col items-center justify-center nube-surface-light bg-[#f1efe9] text-center text-[#0a090b]`}><p className={index}>CHAPITRE 02</p><h2 className="m-0 text-[40px] leading-[.94] tracking-[-.065em] min-[380px]:text-[48px] min-[581px]:text-[clamp(54px,7vw,96px)] min-[581px]:leading-[.8] min-[581px]:tracking-[-.075em]">LA SUITE<br /><span className="sr-only"> </span><em className="font-[Georgia] font-normal text-[var(--nube-accent-text)]">S’ÉCRIT MAINTENANT.</em></h2><div className="my-[35px] grid w-[min(560px,100%)] grid-cols-[auto_1fr] items-center gap-[22px] border border-black/30 p-[22px] text-left min-[581px]:my-[48px] min-[581px]:grid-cols-[auto_1fr_auto]"><span className="font-[Georgia] text-[26px] italic text-[var(--nube-accent-text)]">02</span><strong className="text-xl">NUBE #2</strong><small className="col-start-2 text-[10px] tracking-[.18em] min-[581px]:col-auto">ARCHIVE À VENIR</small></div><a className="border-b border-black/50 pb-[7px] text-[11px] font-black tracking-[.17em]" href="/">RETOUR À NUBE </a></section>
      <SiteFooter theme="light" />
    </main>
  );
}

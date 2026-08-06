import type { Metadata } from "next";
import { MainHeader } from "@/components/main-header";

/* eslint-disable @next/next/no-html-link-for-pages */

export const metadata: Metadata = {
  title: "Archives — NUBE Festival",
  description: "Les éditions, artistes et souvenirs du festival NUBE à Lausanne.",
};

const section = "relative px-[clamp(24px,7vw,110px)] py-[clamp(64px,8vw,112px)]";
const index = "mb-6 text-[11px] font-black tracking-[.18em] opacity-55";
const mediaTexture = "before:absolute before:inset-0 before:bg-[linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] before:bg-[size:34px_34px] before:opacity-15";

export default function ArchivesPage() {
  return (
    <main className="bg-[#09090b]">
      <MainHeader />
      <section id="top" className="relative flex min-h-[680px] flex-col justify-start overflow-hidden bg-[radial-gradient(circle_at_76%_47%,rgba(255,63,152,.23),transparent_28%),#09090b] px-[clamp(24px,7vw,110px)] pb-20 pt-[150px] min-[581px]:min-h-[72svh] min-[581px]:justify-center">
        <p className="absolute left-[clamp(24px,7vw,110px)] top-[108px] text-[12px] font-extrabold tracking-[.23em] text-[#aaa5ad] min-[581px]:top-[125px]"><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#ff3f98] shadow-[0_0_12px_#ff3f98]" /> MÉMOIRE VIVANTE · LAUSANNE</p><p className={`${index} relative z-2 !mb-[22px]`}>NUBE / DEPUIS 2026</p><h1 className="relative z-2 m-0 text-[78px] leading-[.92] tracking-[-.085em] min-[581px]:text-[clamp(72px,11vw,140px)]">NOS<br /><em className="font-[Georgia] font-normal text-[#ff3f98]">ARCHIVES.</em></h1><p className="relative z-2 mt-[46px] max-w-[480px] text-[13px] leading-[1.7] text-[#aaa5ae] min-[581px]:ml-[8vw] min-[581px]:text-[15px]">Chaque édition devient un chapitre : ses artistes, ses images, ses coulisses et les mondes créés ensemble.</p><div className="absolute right-[-20vw] top-[46%] z-2 grid aspect-square w-[75vw] place-items-center rounded-full border border-white/20 opacity-55 before:absolute before:inset-[17%] before:rounded-full before:border before:border-white/15 min-[581px]:right-[-5vw] min-[581px]:top-[24%] min-[581px]:w-[min(32vw,460px)] min-[901px]:right-[6vw] min-[901px]:opacity-100" aria-hidden="true"><span className="absolute right-[8%] top-[46%] font-[Georgia] text-[15px] italic">01</span><img className="h-[88%] w-[88%] object-contain drop-shadow-[0_0_40px_rgba(255,63,152,.42)]" src="/nube-logo.png" alt="" /></div>
      </section>

      <section id="edition-one" className={`${section} bg-[#f1efe9] text-[#0a0a0d]`}>
        <div className="flex flex-col items-start justify-between gap-[30px] min-[581px]:flex-row min-[581px]:items-end"><div><p className={index}>CHAPITRE 01 · 21.06.2026</p><h2 className="m-0 text-[72px] leading-[.92] tracking-[-.08em] min-[581px]:text-[clamp(62px,9vw,110px)]">NUBE<br />OPEN AIR</h2></div><span className="mb-[7px] text-[11px] font-black tracking-[.19em]">LAUSANNE · PREMIÈRE ÉDITION</span></div>
        <div className="mt-20 grid gap-3.5 min-[901px]:grid-cols-[1.4fr_.6fr]"><div className={`${mediaTexture} relative min-h-[280px] overflow-hidden bg-[radial-gradient(circle_at_65%_40%,#9c225f,#171219_42%,#09090b)] text-white min-[581px]:min-h-[520px]`}><span className="absolute left-2.5 top-2.5 z-3 border border-white/45 bg-[#08080a]/55 p-[7px] text-[10px] font-black tracking-[.18em] backdrop-blur-sm min-[581px]:left-5 min-[581px]:top-5 min-[581px]:px-[11px] min-[581px]:py-[9px] min-[581px]:text-[10px]">PLACEHOLDER · AFTERMOVIE</span><p className="absolute bottom-[17px] left-5 m-0 text-[11px] font-black tracking-[.17em]">VIDÉO 16:9 À AJOUTER</p></div><div className={`${mediaTexture} relative min-h-[480px] overflow-hidden bg-[linear-gradient(145deg,#72516c,#161217_65%)] text-white min-[581px]:min-h-[650px] min-[901px]:min-h-[520px]`}><span className="absolute left-2.5 top-2.5 z-3 border border-white/45 bg-[#08080a]/55 p-[7px] text-[10px] font-black tracking-[.18em] backdrop-blur-sm min-[581px]:left-5 min-[581px]:top-5 min-[581px]:px-[11px] min-[581px]:py-[9px] min-[581px]:text-[10px]">PLACEHOLDER · PHOTO</span><div className="absolute inset-0 grid place-items-center text-6xl opacity-60">+</div><p className="absolute bottom-[17px] left-5 m-0 text-[11px] font-black tracking-[.17em]">PHOTO PRINCIPALE 4:5</p></div></div>
        <div className="mt-[30px] grid gap-[18px] border-t border-[#bbb5ad] pt-[25px] min-[581px]:grid-cols-[.5fr_1fr_.5fr] min-[581px]:gap-10"><strong className="text-[11px] tracking-[.17em]">07 ARTISTES · 01 SCÈNE</strong><p className="m-0 text-[13px] leading-[1.65] text-[#5d5960]">Ajoute ici un texte souvenir de l’édition, les crédits photo/vidéo et les liens vers le vlog, les publications ou les performances.</p><span className="justify-self-start text-[11px] tracking-[.17em] text-[#ff3f98] min-[581px]:justify-self-end">TEXTE & LIENS À COMPLÉTER</span></div>
      </section>

      <section id="future" className={`${section} flex min-h-[80vh] flex-col items-center justify-center bg-[#f1efe9] text-center text-[#0a090b]`}><p className={index}>CHAPITRE 02</p><h2 className="m-0 text-[56px] leading-[.8] tracking-[-.075em] min-[581px]:text-[clamp(54px,7vw,96px)]">LA SUITE<br /><em className="font-[Georgia] font-normal text-[#ff3f98]">S’ÉCRIT MAINTENANT.</em></h2><div className="my-[35px] grid w-[min(560px,100%)] grid-cols-[auto_1fr] items-center gap-[22px] border border-black/30 p-[22px] text-left min-[581px]:my-[48px] min-[581px]:grid-cols-[auto_1fr_auto]"><span className="font-[Georgia] text-[26px] italic text-[#ff3f98]">02</span><strong className="text-xl">NUBE #2</strong><small className="col-start-2 text-[10px] tracking-[.18em] min-[581px]:col-auto">ARCHIVE À VENIR</small></div><a className="border-b border-black/50 pb-[7px] text-[11px] font-black tracking-[.17em]" href="/">RETOUR À NUBE </a></section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { MainHeader } from "@/components/main-header";
import { instagramUrl, journey, pillars } from "@/data/nube";

export const metadata: Metadata = {
  title: "Le festival — NUBE",
  description: "Le projet NUBE, son accompagnement artistique et sa prochaine édition à Lausanne.",
};

const section = "relative px-[clamp(24px,7vw,110px)] py-[clamp(64px,8vw,112px)]";
const index = "mb-6 text-[11px] font-black tracking-[.18em] opacity-55";

export default function FestivalPage() {
  return (
    <main>
      <MainHeader />

      <section id="top" className={`${section} flex min-h-[68svh] items-end overflow-hidden bg-[#f1efe9] pt-40 text-[#0a0a0d]`}>
        <div className="relative z-2"><p className={index}>LE FESTIVAL · LAUSANNE</p><h1 className="m-0 text-[clamp(56px,9vw,120px)] leading-[.92] tracking-[-.08em]">PAS SEULEMENT<br /><em className="font-[Georgia] font-normal text-[#ff3f98]">UN CONCERT.</em></h1><p className="mt-10 max-w-xl text-[clamp(16px,1.6vw,23px)] leading-[1.6] text-[#4f4b52]">NUBE accompagne les artistes pour faire exister une identité, une histoire et une scène qui leur appartient.</p></div>
      </section>

      <section className={`${section} bg-[#f1efe9] text-[#0a0a0d]`}>
        <div className="grid border-t border-[#b9b5ae] min-[901px]:grid-cols-3">
          {pillars.map((pillar) => <article className="border-b border-[#b9b5ae] py-8 min-[901px]:min-h-[320px] min-[901px]:border-r min-[901px]:px-10 min-[901px]:first:pl-0 min-[901px]:last:border-r-0" key={pillar.number}><span className="font-[Georgia] italic text-[#ff3f98]">{pillar.number}</span><h2 className="my-5 text-[clamp(30px,3vw,46px)] tracking-[-.05em] min-[901px]:mt-20">{pillar.title}</h2><p className="max-w-80 text-[13px] leading-[1.7] text-[#5b575e]">{pillar.text}</p></article>)}
        </div>
      </section>

      <section id="edition" className={`${section} bg-[#0d0c0f]`}>
        <div className="grid gap-12 min-[901px]:grid-cols-[1.2fr_.8fr]"><div><p className={index}>NUBE #2</p><h2 className="m-0 text-[clamp(50px,7vw,96px)] leading-[.8] tracking-[-.07em]">DE L’IDÉE<br /><em className="font-[Georgia] font-normal text-[#ff3f98]">À LA SCÈNE.</em></h2></div><div className="border-t border-white/20 pt-6 min-[901px]:mt-8"><p className="text-[11px] font-black tracking-[.18em] text-white/65">CANDIDATURES</p><strong className="mt-5 block text-[clamp(28px,3vw,42px)]">BIENTÔT OUVERTES</strong><span className="mt-5 block text-[11px] tracking-[.15em] text-[#ff3f98]">DATE À ANNONCER</span></div></div>
        <div className="mt-20 grid min-[901px]:grid-cols-3">{journey.map((step) => <article className="border-b border-white/15 py-8 min-[901px]:min-h-[300px] min-[901px]:border-b-0 min-[901px]:border-l min-[901px]:px-10 min-[901px]:first:border-l-0 min-[901px]:first:pl-0" key={step.number}><span className="font-[Georgia] italic text-[#ff3f98]">{step.number}</span><h3 className="mt-16 text-[clamp(30px,3.5vw,50px)] tracking-[-.05em]">{step.title}</h3><p className="max-w-80 text-[13px] leading-[1.7] text-white/70">{step.text}</p></article>)}</div>
        <Link className="mt-16 inline-flex bg-[#ff3f98] px-6 py-5 text-[12px] font-black tracking-[.15em] text-black" href={instagramUrl} target="_blank" rel="noreferrer">NOUS ÉCRIRE SUR INSTAGRAM</Link>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { MainHeader } from "@/components/main-header";
import { SiteFooter } from "@/components/site-footer";
import { contactEmail, contactEmailUrl, instagramUrl, journey, pillars } from "@/data/nube";
import { createPageMetadata, siteUrl } from "@/data/site";

export const metadata: Metadata = createPageMetadata({
  title: "Le festival — NUBE",
  description: "Le projet NUBE, son accompagnement artistique et sa prochaine édition à Lausanne.",
  path: "/festival",
});

const eventData = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "NUBE Open Air #2",
  description: "La prochaine édition du festival indépendant NUBE à Lausanne.",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  url: new URL("/festival", siteUrl).toString(),
  image: new URL("/opengraph-image", siteUrl).toString(),
  location: {
    "@type": "Place",
    name: "Lausanne — lieu à annoncer",
    address: { "@type": "PostalAddress", addressLocality: "Lausanne", addressCountry: "CH" },
  },
  organizer: { "@type": "Organization", name: "NUBE", url: siteUrl.toString() },
};

const section = "relative px-[clamp(24px,7vw,110px)] py-[clamp(64px,8vw,112px)]";
const index = "mb-6 text-[11px] font-black tracking-[.18em] opacity-70";

export default function FestivalPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <MainHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventData).replace(/</g, "\\u003c") }} />

      <section id="top" className={`${section} flex min-h-[68svh] items-end overflow-hidden nube-surface-light bg-[#f1efe9] pt-40 text-[#0a0a0d]`}>
        <div className="relative z-2"><p className={index}>LE FESTIVAL · LAUSANNE</p><h1 className="m-0 text-[clamp(44px,9vw,120px)] leading-[.92] tracking-[-.08em]">PAS SEULEMENT<br /><span className="sr-only"> </span><em className="font-[Georgia] font-normal text-[var(--nube-accent-text)]">UN CONCERT.</em></h1><p className="mt-10 max-w-xl text-[clamp(16px,1.6vw,23px)] leading-[1.6] text-[#4f4b52]">NUBE accompagne les artistes pour faire exister une identité, une histoire et une scène qui leur appartient.</p><div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"><a className="border-b border-black/45 pb-2 text-[12px] font-black tracking-[.12em]" href="#methode">DÉCOUVRIR LA MÉTHODE</a><Link className="border-b border-black/45 pb-2 text-[12px] font-black tracking-[.12em]" href="/archives">VOIR NUBE #1</Link><a className="nube-surface-dark bg-[#0a090b] px-5 py-4 text-[12px] font-black tracking-[.12em] text-white" href="#edition">SUIVRE NUBE #2</a></div></div>
      </section>

      <section id="methode" className={`${section} nube-surface-light bg-[#f1efe9] text-[#0a0a0d]`}>
        <div className="grid gap-12 min-[901px]:grid-cols-[.72fr_1.28fr] min-[901px]:gap-20">
          <div className="min-[901px]:sticky min-[901px]:top-36 min-[901px]:self-start"><p className={index}>NOTRE MANIÈRE DE FAIRE</p><h2 className="m-0 text-[clamp(44px,6vw,76px)] leading-[.92] tracking-[-.065em]">FAIRE<br /><span className="sr-only"> </span><em className="font-[Georgia] font-normal text-[var(--nube-accent-text)]">ÉMERGER.</em></h2></div>
          <div className="border-t border-[#b9b5ae]">
            {pillars.map((pillar) => <article className="grid gap-5 border-b border-[#b9b5ae] py-8 min-[581px]:grid-cols-[56px_1fr] min-[901px]:py-12" key={pillar.number}><span className="font-[Georgia] italic text-[var(--nube-accent-text)]">{pillar.number}</span><div><h3 className="m-0 text-[clamp(28px,3vw,42px)] tracking-[-.05em]">{pillar.title}</h3><p className="mb-0 mt-4 max-w-xl text-[14px] leading-[1.75] text-[#5b575e]">{pillar.text}</p></div></article>)}
          </div>
        </div>
      </section>

      <section id="edition" className={`${section} bg-[#0d0c0f]`}>
        <div className="grid gap-12 min-[901px]:grid-cols-[1.2fr_.8fr]"><div><p className={index}>NUBE #2</p><h2 className="m-0 text-[clamp(50px,7vw,96px)] leading-[.8] tracking-[-.07em]">DE L’IDÉE<br /><span className="sr-only"> </span><em className="font-[Georgia] font-normal text-[var(--nube-accent-text)]">À LA SCÈNE.</em></h2></div><div className="border-t border-white/20 pt-6 min-[901px]:mt-8"><p className="text-[11px] font-black tracking-[.18em] text-white/70">PROGRAMMATION</p><strong className="mt-5 block text-[clamp(28px,3vw,42px)]">CHOISIE PAR L’ORGANISATION</strong><span className="mt-5 block text-[11px] tracking-[.15em] text-[var(--nube-accent-text)]">LINE-UP À ANNONCER</span></div></div>
        <div className="mt-20 grid min-[901px]:grid-cols-3">{journey.map((step) => <article className="border-b border-white/15 py-8 min-[901px]:min-h-[300px] min-[901px]:border-b-0 min-[901px]:border-l min-[901px]:px-10 min-[901px]:first:border-l-0 min-[901px]:first:pl-0" key={step.number}><span className="font-[Georgia] italic text-[var(--nube-accent-text)]">{step.number}</span><h3 className="mt-16 text-[clamp(30px,3.5vw,50px)] tracking-[-.05em]">{step.title}</h3><p className="max-w-80 text-[13px] leading-[1.7] text-white/70">{step.text}</p></article>)}</div>
        <Link className="mt-16 inline-flex bg-[#ff66c4] px-6 py-5 text-[12px] font-black tracking-[.15em] text-black" href={instagramUrl} target="_blank" rel="noreferrer">NOUS ÉCRIRE SUR INSTAGRAM</Link>
        <div className="mt-4"><a className="inline-flex min-h-11 items-center text-[14px] underline underline-offset-4" href={contactEmailUrl}>{contactEmail}</a></div>
      </section>
      <SiteFooter />
    </main>
  );
}

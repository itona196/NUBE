import type { Metadata } from "next";
import { FaqSection } from "@/components/home/faq-section";
import { MainHeader } from "@/components/main-header";
import { SiteFooter } from "@/components/site-footer";
import { createPageMetadata } from "@/data/site";

export const metadata: Metadata = createPageMetadata({ title: "Informations — NUBE", description: "Date, lieu, accès et réponses pratiques pour NUBE à Lausanne.", path: "/infos" });

const practicalItems = [
  { label: "ACCÈS", value: "LAUSANNE", text: "L’adresse exacte et le plan d’accès seront publiés dès la confirmation du lieu." },
  { label: "TRANSPORTS", value: "TRANSPORTS PUBLICS", text: "Les lignes, arrêts recommandés et derniers départs seront indiqués avec le lieu." },
  { label: "HORAIRES", value: "À CONFIRMER", text: "Ouverture des portes, début des concerts et fin de soirée seront regroupés ici." },
];

export default function InfosPage() {
  return (
    <main id="main-content" tabIndex={-1} className="bg-[#0d0c0f] pt-[78px] min-[901px]:pt-24">
      <MainHeader />
      <section id="infos" className="nube-surface-light bg-[#f1efe9] px-[clamp(24px,7vw,110px)] py-[clamp(72px,9vw,120px)] text-[#0a0a0d]">
        <p className="mb-5 text-[12px] font-black tracking-[.16em] text-black/55">PRÉPARER SA VENUE · NUBE #2</p>
        <div className="grid gap-10 min-[901px]:grid-cols-[1.1fr_.9fr] min-[901px]:items-end">
          <h1 className="m-0 text-[clamp(46px,8vw,108px)] leading-[.9] tracking-[-.075em]">TOUT SAVOIR.<br /><span className="sr-only"> </span><em className="font-[Georgia] font-normal text-[var(--nube-accent-text)]">AVANT DE VENIR.</em></h1>
          <div className="border-t border-black/25 pt-6"><p className="m-0 max-w-lg text-[16px] leading-[1.7] text-[#514c54]">Cette page est le point de référence pour préparer ta venue. Les informations y seront datées et mises à jour dès qu’elles seront confirmées.</p><div className="mt-6 flex flex-wrap gap-3 text-[12px] font-black tracking-[.12em]"><span className="nube-surface-dark bg-[#0a090b] px-4 py-3 text-white">LAUSANNE</span><span className="border border-black/30 px-4 py-3">DATE À ANNONCER</span><span className="border border-black/30 px-4 py-3">LIEU À ANNONCER</span></div></div>
        </div>
      </section>

      <nav className="sticky top-[78px] z-30 border-y border-white/15 bg-[#0d0c0f]/95 px-[clamp(24px,7vw,110px)] backdrop-blur-md min-[901px]:top-24" aria-label="Navigation des informations"><div className="flex flex-wrap gap-x-7 text-[12px] font-black tracking-[.11em] text-white/80"><a href="#guide">GUIDE PRATIQUE</a><a href="#faq">FAQ</a></div></nav>

      <section id="guide" className="px-[clamp(24px,7vw,110px)] py-[clamp(72px,9vw,120px)]">
        <div className="mb-12 grid gap-6 min-[901px]:grid-cols-[.7fr_1.3fr]"><div><p className="mb-5 text-[12px] font-black tracking-[.16em] text-[var(--nube-accent-text)]">GUIDE PRATIQUE</p><h2 className="m-0 text-[clamp(42px,6vw,78px)] leading-[.92] tracking-[-.06em]">VENIR<br /><span className="sr-only"> </span><em className="font-[Georgia] font-normal text-[var(--nube-accent-text)]">SEREINEMENT.</em></h2></div><p className="max-w-xl self-end text-[15px] leading-[1.75] text-white/75">L’adresse, les transports et les horaires seront regroupés au même endroit dès leur confirmation.</p></div>
        <div className="grid border-l border-t border-white/15 min-[581px]:grid-cols-2 min-[901px]:grid-cols-3">
          {practicalItems.map((item) => <article className="min-h-[235px] border-b border-r border-white/15 p-5 min-[581px]:p-6" key={item.label}><span className="text-[12px] font-black tracking-[.14em] text-[var(--nube-accent-text)]">{item.label}</span><h3 className="mb-4 mt-9 text-[clamp(20px,2.2vw,30px)] leading-[1.05] tracking-[-.04em]">{item.value}</h3><p className="mb-0 text-[14px] leading-[1.7] text-white/75">{item.text}</p></article>)}
        </div>
      </section>

      <FaqSection />
      <SiteFooter />
    </main>
  );
}

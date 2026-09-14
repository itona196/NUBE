import { CloudArtwork } from "@/components/cloud-artwork";
import { MainHeader } from "@/components/main-header";
import { SiteFooter } from "@/components/site-footer";
import { contactEmail, contactEmailUrl, instagramUrl } from "@/data/nube";

type PriceLine = { name: string; price: string };
const priceGroups: { id: string; title: string; lines: PriceLine[] }[] = [
  { id: "design", title: "DESIGN", lines: [
    { name: "Direction artistique", price: "150 CHF+" },
    { name: "Identité visuelle", price: "200 CHF" },
    { name: "Cover", price: "50 CHF" },
    { name: "Affiche", price: "100 CHF" },
    { name: "Visuel promotionnel", price: "70 CHF" },
    { name: "Déclinaison visuelle", price: "30 CHF/format" },
  ] },
  { id: "musique", title: "MUSIQUE", lines: [
    { name: "Production musicale", price: "100 CHF+" },
    { name: "Composition / arrangement", price: "30 CHF" },
    { name: "Accompagnement artistique", price: "30 CHF" },
  ] },
  { id: "studio", title: "STUDIO", lines: [
    { name: "1 son", price: "175 CHF" },
    { name: "2 sons", price: "310 CHF" },
    { name: "3 sons", price: "405 CHF" },
    { name: "4 sons", price: "460 CHF" },
  ] },
  { id: "visuel", title: "VISUEL", lines: [
    { name: "Shooting photo", price: "120 CHF" },
    { name: "Contenu promotionnel", price: "100 CHF" },
    { name: "Contenu vertical", price: "80 CHF" },
    { name: "Visualizer", price: "120 CHF" },
    { name: "Vidéo", price: "150 CHF+" },
    { name: "Captation live/performance", price: "150 CHF+" },
    { name: "Clip", price: "Sur devis" },
  ] },
];
const supplements: PriceLine[] = [
  { name: "Featuring", price: "+50 CHF" },
  { name: "PPP", price: "+50 CHF" },
  { name: "Live", price: "+10 CHF" },
];
const section = "relative px-[clamp(24px,7vw,110px)] py-[clamp(64px,8vw,110px)]";

function PriceList({ lines }: { lines: PriceLine[] }) {
  return <dl className="m-0 border-t border-[#b9b5ae]">{lines.map((line) => <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 border-b border-[#b9b5ae] py-4" key={line.name}><dt className="text-[14px] leading-[1.6]">{line.name}</dt><dd className="m-0 whitespace-nowrap text-right text-[13px] font-bold">{line.price}</dd></div>)}</dl>;
}

export function StudioExperience() {
  return <main id="main-content" tabIndex={-1} className="studio-page nube-surface-dark bg-[#09090b] text-[#f1efe9]">
    <MainHeader />
    <section id="top" className="nube-dream-sky relative flex min-h-[720px] items-start overflow-hidden px-[clamp(24px,7vw,110px)] pb-[72px] pt-[145px] min-[581px]:min-h-[760px] min-[901px]:min-h-[92svh] min-[901px]:items-center min-[901px]:pt-[140px]">
      <div className="relative z-4 mt-[35px] w-full min-[901px]:w-[68%]">
        <p className="mb-[18px] text-[clamp(11px,.9vw,13px)] font-extrabold tracking-[.2em] text-[#c8c4cc]">STUDIO ARTISTIQUE INDÉPENDANT · LAUSANNE</p>
        <h1 className="m-0 text-[clamp(54px,12vw,96px)] leading-[.92] font-[950] tracking-[-.07em] min-[901px]:text-[clamp(64px,7.5vw,122px)]"><span className="block">NUBE<span className="sr-only"> </span></span><span className="block text-transparent [-webkit-text-stroke:1.5px_rgba(241,239,233,.78)] min-[901px]:ml-[clamp(20px,6vw,90px)]">STUDIO.</span></h1>
        <p className="mt-9 max-w-[560px] text-[clamp(15px,1.2vw,18px)] leading-[1.65] text-[#d0ccd3] min-[901px]:ml-[clamp(8px,6vw,90px)]">Enregistrement, production, design et vidéo. Les prestations de NUBE sont ouvertes toute l’année aux artistes indépendants.</p>
        <div className="mt-8 flex flex-wrap gap-6 min-[901px]:ml-[clamp(8px,8vw,130px)]"><a className="nube-surface-light bg-[#f1efe9] px-6 py-5 text-[12px] font-black tracking-[.13em] text-[#08080a] transition hover:bg-[#ff66c4]" href="#contact">NOUS ÉCRIRE</a><a className="border-b border-white/40 py-4 text-[11px] font-black tracking-[.15em]" href="#tarifs">VOIR LES TARIFS</a></div>
      </div>
      <CloudArtwork className="studio-cloud" />
    </section>

    <nav className="sticky top-[78px] z-40 border-y border-white/15 bg-[#09090b]/95 px-[clamp(24px,7vw,110px)] backdrop-blur-md min-[901px]:top-24" aria-label="Navigation Studio"><div className="flex flex-wrap gap-x-7 text-[12px] font-black tracking-[.11em] text-white/80"><a href="#tarifs">TARIFS</a><a href="#accompagnement">SUIVI</a><a href="#contact">CONTACT</a></div></nav>

    <section id="tarifs" className={`${section} nube-surface-light bg-[#f1efe9] text-[#0a090b]`}>
      <div className="mb-14 grid gap-8 min-[901px]:grid-cols-[1.1fr_.9fr] min-[901px]:items-end"><div><p className="mb-5 text-[11px] font-black tracking-[.18em] text-[#5e5961]">NUBE STUDIO · CHF</p><h2 className="m-0 text-[clamp(44px,6vw,78px)] leading-[.92] tracking-[-.06em]">LES TARIFS.</h2></div><p className="m-0 max-w-lg text-[15px] leading-[1.7] text-[#514c54]">Les prestations sont disponibles à la carte. Écris-nous pour parler de ce dont tu as besoin et confirmer les détails.</p></div>
      <div className="grid items-start gap-x-16 gap-y-14 min-[901px]:grid-cols-2">{priceGroups.map((group, number) => <section id={`prix-${group.id}`} key={group.id} aria-labelledby={`titre-${group.id}`}><div className="mb-6 flex items-baseline gap-4"><span className="font-[Georgia] italic text-[var(--nube-accent-text)]">0{number + 1}</span><h3 id={`titre-${group.id}`} className="m-0 text-[clamp(30px,3.5vw,46px)] leading-none tracking-[-.05em]">{group.title}</h3></div>{group.id === "studio" && <p className="mb-5 text-[13px] leading-[1.7] text-[#514c54]">Enregistrement, mix & master inclus.</p>}<PriceList lines={group.lines} />{group.id === "studio" && <><p className="mt-5 text-[12px] leading-[1.7] text-[#514c54]"><strong>Acompte ingénieur : 100 CHF</strong>, compris dans la formule et déduit du solde.</p><h4 className="mb-4 mt-7 text-[11px] font-black tracking-[.14em]">SUPPLÉMENTS</h4><PriceList lines={supplements} /></>}</section>)}</div>
      <div className="studio-discount mt-14 grid gap-5 border-t border-black/25 pt-7 min-[901px]:grid-cols-[.45fr_1.55fr]"><strong className="text-[clamp(36px,5vw,64px)] leading-none tracking-[-.06em] text-[var(--nube-accent-text)]">−15 %</strong><div><p className="m-0 text-[14px] font-bold leading-[1.7]">À partir de 3 services internes éligibles.</p><p className="mb-0 mt-2 max-w-2xl text-[12px] leading-[1.7] text-[#514c54]">La formule Studio compte comme un seul service. Les suppléments et les prestations sur devis sont exclus de la réduction. Les prix suivis d’un « + » sont des tarifs de départ.</p></div></div>
    </section>

    <section id="accompagnement" className={`${section} nube-surface-dark bg-[#09090b]`}>
      <div className="grid gap-12 min-[901px]:grid-cols-[.72fr_1.28fr] min-[901px]:gap-20">
        <div><p className="mb-6 text-[11px] font-black tracking-[.18em] text-white/70">ACCOMPAGNEMENT</p><h2 className="m-0 text-[clamp(44px,6vw,76px)] leading-[.92] tracking-[-.065em]">DE L’IDÉE<br /><em className="font-[Georgia] font-normal text-[var(--nube-accent-text)]">À LA SORTIE.</em></h2></div>
        <div className="border-t border-white/20">{[{ title: "LE PROJET", text: "On discute de ce que tu prépares, des prestations et du budget." }, { title: "LA PRÉPARATION", text: "On définit le travail à réaliser, les formats et les étapes." }, { title: "LA RÉALISATION", text: "Musique, design et visuel avancent autour du même projet." }].map((step, number) => <article key={step.title} className="grid grid-cols-[32px_1fr] gap-5 border-b border-white/20 py-8 min-[581px]:grid-cols-[56px_1fr]"><span className="font-[Georgia] italic text-[var(--nube-accent-text)]">0{number + 1}</span><div><h3 className="m-0 text-[clamp(25px,3vw,38px)] tracking-[-.05em]">{step.title}</h3><p className="mb-0 mt-4 max-w-xl text-[14px] leading-[1.75] text-white/75">{step.text}</p></div></article>)}</div>
      </div>
    </section>

    <section id="contact" className="relative flex min-h-[540px] flex-col items-center justify-center overflow-hidden bg-[#ff66c4] px-6 py-20 text-center text-[#09090b]"><p className="mb-5 text-[11px] font-black tracking-[.18em]">PREMIER ÉCHANGE</p><h2 className="my-8 text-[clamp(44px,7vw,92px)] leading-[.92] tracking-[-.065em]">PARLE-NOUS<br /><em className="font-[Georgia] font-normal text-[#09090b]">DE TON PROJET.</em></h2><p className="my-7 max-w-xl text-[15px] leading-[1.7]">Une prestation précise ou un projet encore flou : raconte-nous où tu veux aller.</p><a className="nube-surface-dark bg-[#09090b] px-7 py-5 text-[12px] font-black tracking-[.13em] text-white" href={instagramUrl} target="_blank" rel="noreferrer">NOUS ÉCRIRE SUR INSTAGRAM</a><a className="mt-4 inline-flex min-h-11 items-center text-[14px] underline underline-offset-4" href={contactEmailUrl}>{contactEmail}</a></section>
    <SiteFooter theme="pink" />
  </main>;
}

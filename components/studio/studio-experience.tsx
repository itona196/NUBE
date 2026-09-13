"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { MainHeader } from "@/components/main-header";
import { SiteFooter } from "@/components/site-footer";
import { contactEmail, contactEmailUrl, instagramUrl } from "@/data/nube";

type Pole = "Design" | "Musique" | "Visuel";
type Service = { id: string; name: string; pole: Pole; price: number | null; label: string; internal: boolean; unit?: "hour" };

const services: Service[] = [
  { id: "direction", name: "Direction artistique", pole: "Design", price: 150, label: "dès 150 CHF", internal: true },
  { id: "cover", name: "Cover", pole: "Design", price: 80, label: "dès 80 CHF", internal: true },
  { id: "studio", name: "Studio", pole: "Musique", price: 50, label: "50 CHF/heure", internal: true, unit: "hour" },
  { id: "production", name: "Production", pole: "Musique", price: 150, label: "dès 150 CHF", internal: true },
  { id: "shooting", name: "Shooting", pole: "Visuel", price: 150, label: "dès 150 CHF", internal: true },
  { id: "visualizer", name: "Visualizer", pole: "Visuel", price: 150, label: "dès 150 CHF", internal: true },
  { id: "clip", name: "Clip", pole: "Visuel", price: null, label: "sur devis", internal: false },
  { id: "mix-master", name: "Mix & master", pole: "Musique", price: null, label: "sur devis", internal: false },
];

const poles = [
  { title: "DESIGN", price: "DÈS 80 CHF", items: ["Direction artistique", "Identité visuelle", "Covers", "Affiches", "Supports promotionnels"] },
  { title: "MUSIQUE", price: "DÈS 50 CHF", items: ["Production musicale", "Composition", "Enregistrement studio", "Arrangement", "Accompagnement artistique", "Mix & mastering associé"] },
  { title: "VISUEL", price: "DÈS 150 CHF", items: ["Shooting photo", "Contenu promotionnel", "Contenu vertical", "Visualizer", "Vidéo", "Clip associé"] },
];

const projectTypes = ["Single", "EP", "Album", "Identité artistique", "Autre"];
const serviceDescription = (service: Service) => service.unit === "hour"
  ? `${service.name} — base d’une heure à ${service.price} CHF, durée à convenir`
  : service.name;

const presets = [
  { type: "Single", text: "Construire l’identité complète d’une sortie.", detail: "Direction artistique, cover, studio et shooting", selected: ["direction", "cover", "studio", "shooting"] },
  { type: "EP", text: "Développer un univers cohérent autour de plusieurs morceaux.", detail: "Direction artistique, cover, studio et visualizer", selected: ["direction", "cover", "studio", "visualizer"] },
  { type: "Album", text: "Penser un projet artistique dans sa globalité.", detail: "Une base complète, librement ajustable", selected: ["direction", "cover", "studio", "production", "shooting", "visualizer"] },
];

const section = "relative px-[clamp(24px,7vw,110px)] py-[clamp(64px,8vw,108px)]";
const index = "mb-5 text-[11px] font-black tracking-[.18em] text-[var(--nube-accent-text)]";
const title = "m-0 text-[clamp(38px,7vw,92px)] leading-[.96] tracking-[-.055em] min-[581px]:text-[clamp(46px,7vw,92px)]";

function SectionTitle({ number, children }: { number: string; children: React.ReactNode }) {
  return <div><p className={index}>{number}</p><h2 className={title}>{children}</h2></div>;
}

function PoleVisual({ pole }: { pole: string }) {
  if (pole === "DESIGN") return <div className="relative mt-6 h-40 overflow-hidden border border-[#c7c1b9] bg-[#e4dfd8]" aria-hidden="true"><div className="absolute left-[12%] top-[18%] h-[62%] w-[68%] -rotate-6 border border-[#807a82] nube-surface-light bg-[#f1efe9] shadow-[12px_12px_0_#ff66c4]"><span className="absolute bottom-3 left-3 text-[clamp(20px,2.2vw,31px)] font-black leading-[.9] tracking-[-.05em]">CONTINUER<br /><span className="sr-only"> </span>À CRÉER</span></div></div>;
  if (pole === "MUSIQUE") return <div className="relative mt-6 flex h-40 items-end gap-1 overflow-hidden border border-[#39343a] nube-surface-dark bg-[#111013] px-5 pb-9 pt-12" aria-hidden="true">{[35, 62, 48, 84, 56, 92, 43, 73, 51, 88, 66, 39, 79, 54, 95, 61].map((height, barIndex) => <i className="flex-1 animate-[studioSound_1.1s_ease-in-out_infinite_alternate] bg-[#ff66c4] motion-reduce:animate-none" style={{ height: `${height}%`, animationDelay: `${barIndex * -70}ms` }} key={barIndex} />)}<small className="absolute bottom-3 left-5 text-[10px] font-black tracking-[.14em] text-white/70">NUBE AUDIO · SESSION 001</small></div>;
  return <div className="relative mt-6 h-40 overflow-hidden border border-[#9d376b] bg-[linear-gradient(145deg,#ff9bc9,#ff66c4_48%,#5b2044)] p-4 text-[#09090b]" aria-hidden="true"><span className="text-[10px] font-black tracking-[.14em]">REC · FRAME 04</span><div className="absolute inset-x-[17%] bottom-[12%] top-[20%] grid grid-cols-2 gap-1.5 rotate-[-3deg]">{[0, 1, 2, 3].map((frame) => <i className={frame === 1 || frame === 2 ? "nube-surface-light bg-[#f1efe9]/75" : "bg-[#151116]/85"} key={frame} />)}</div></div>;
}

export function StudioExperience() {
  const [projectType, setProjectType] = useState("Single");
  const [selected, setSelected] = useState<string[]>([]);
  const [storageReady, setStorageReady] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "success" | "error">("idle");
  const chosen = services.filter((service) => selected.includes(service.id));
  const totals = useMemo(() => {
    const serviceValue = (service: Service) => service.price ?? 0;
    const value = chosen.reduce((sum, service) => sum + serviceValue(service), 0);
    const eligible = chosen.filter((service) => service.internal && service.price !== null);
    const discount = eligible.length >= 3 ? Math.round(eligible.reduce((sum, service) => sum + serviceValue(service), 0) * 0.15) : 0;
    return { value, discount, estimate: value - discount, quote: chosen.some((service) => service.price === null), hasEstimate: chosen.some((service) => service.price !== null) };
  }, [chosen]);

  useEffect(() => {
    let project: unknown;
    try {
      const saved = window.localStorage.getItem("nube-studio-project");
      if (saved) project = JSON.parse(saved);
    } catch { /* Ignore une sauvegarde invalide ou inaccessible. */ }

    let restoredType = "Single";
    let restoredSelected: string[] = [];
    if (typeof project === "object" && project !== null && !Array.isArray(project)) {
      const saved = project as Record<string, unknown>;
      if (typeof saved.projectType === "string" && projectTypes.includes(saved.projectType)) {
        restoredType = saved.projectType;
      }
      if (Array.isArray(saved.selected)) {
        restoredSelected = [...new Set(saved.selected.filter((id): id is string =>
          typeof id === "string" && services.some((service) => service.id === id)))];
      }
    }

    window.queueMicrotask(() => {
      setProjectType(restoredType);
      setSelected(restoredSelected);
      setStorageReady(true);
    });
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem("nube-studio-project", JSON.stringify({ projectType, selected }));
    } catch {
      // Keep the configurator usable for this visit when storage is unavailable.
    }
  }, [projectType, selected, storageReady]);

  const toggle = (id: string) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const choosePreset = (preset: (typeof presets)[number]) => {
    setProjectType(preset.type);
    setSelected(preset.selected);
    window.setTimeout(() => document.querySelector("#configurateur")?.scrollIntoView({ behavior: "smooth" }), 20);
  };

  const estimateDescription = totals.hasEstimate
    ? `${totals.estimate} CHF${totals.quote ? " + prestations sur devis, en supplément et non incluses" : ""}`
    : totals.quote ? "sur devis" : "À définir ensemble";

  const summary = useMemo(() => [
    `Bonjour NUBE Studio, je souhaite parler d’un projet ${projectType}.`,
    "",
    "Prestations envisagées :",
    ...(chosen.length ? chosen.map((service) => `- ${serviceDescription(service)}`) : ["- À définir ensemble"]),
    "",
    `Estimation indicative : ${estimateDescription}.`,
  ].join("\n"), [chosen, projectType, estimateDescription]);

  const copyAndOpenInstagram = async () => {
    window.open(instagramUrl, "_blank", "noopener,noreferrer");
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(summary);
      } else {
        const field = document.createElement("textarea");
        field.value = summary;
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        const copied = document.execCommand("copy");
        field.remove();
        if (!copied) throw new Error("copy failed");
      }
      setCopyStatus("success");
      window.setTimeout(() => setCopyStatus("idle"), 5000);
    } catch {
      setCopyStatus("error");
    }
  };

  const resetProject = () => {
    setProjectType("Single");
    setSelected([]);
    setCopyStatus("idle");
  };

  return <main id="main-content" tabIndex={-1} className="nube-surface-dark bg-[#09090b] text-[#f1efe9]">
    <MainHeader />

    <section id="top" className="nube-dream-sky relative flex min-h-[650px] items-center overflow-hidden px-[clamp(24px,7vw,110px)] pb-16 pt-32 min-[901px]:min-h-[100svh] min-[901px]:pb-20 min-[901px]:pt-36">
      <div className="relative z-10 max-w-[900px]"><p className={index}>ACTIVITÉ CRÉATIVE PERMANENTE DE NUBE</p><h1 className="m-0 text-[clamp(58px,12vw,164px)] leading-[.84] tracking-[-.075em] min-[581px]:leading-[.8] min-[581px]:tracking-[-.085em]">NUBE<br /><span className="sr-only"> </span><em className="ml-2 font-[Georgia] font-normal text-transparent [-webkit-text-stroke:1.5px_rgba(241,239,233,.82)] min-[581px]:ml-[clamp(16px,7vw,100px)]">STUDIO</em></h1><p className="ml-2 mt-8 max-w-xl text-[clamp(17px,2vw,26px)] leading-[1.4] min-[581px]:ml-[clamp(16px,7vw,100px)] min-[581px]:mt-10">Incubateur de projets artistiques indépendants.</p><p className="ml-2 mt-4 text-[11px] font-black tracking-[.15em] text-white/75 min-[581px]:ml-[clamp(16px,7vw,100px)] min-[581px]:text-[12px] min-[581px]:tracking-[.18em]">DESIGN · MUSIQUE · VISUEL</p><div className="ml-2 mt-7 flex flex-col items-start gap-3 min-[581px]:ml-[clamp(16px,7vw,100px)] min-[581px]:flex-row min-[581px]:flex-wrap min-[581px]:gap-5"><a className="max-w-full nube-surface-light bg-[#f1efe9] px-5 py-4 text-[11px] font-black leading-[1.35] tracking-[.11em] text-[#09090b] hover:bg-[#ff66c4] min-[581px]:px-6 min-[581px]:text-[12px] min-[581px]:tracking-[.13em]" href="#configurateur">CONSTRUIRE MON PROJET</a><a className="border-b border-white/40 py-3 text-[11px] font-black tracking-[.12em]" href="#poles">DÉCOUVRIR LE STUDIO</a></div></div>
      <div className="absolute right-[3vw] top-[49%] aspect-square w-[min(62vw,430px)] rounded-full border border-white/10 opacity-30 before:absolute before:inset-[17%] before:rounded-full before:border before:border-white/10 after:absolute after:inset-[35%] after:rounded-full after:bg-[#ff66c4]/15 after:blur-xl min-[581px]:top-[35%] min-[581px]:opacity-45 min-[901px]:right-[5vw] min-[901px]:top-[22%] min-[901px]:w-[min(43vw,630px)]" aria-hidden="true" />
      <div data-studio-cloud className="absolute right-[4vw] top-[56%] z-[2] grid aspect-square w-[min(54vw,280px)] animate-[studioCloudFloat_7s_ease-in-out_infinite] place-items-center opacity-25 motion-reduce:animate-none min-[581px]:top-[48%] min-[581px]:w-[min(58vw,320px)] min-[581px]:opacity-40 min-[901px]:right-[9vw] min-[901px]:top-[28%] min-[901px]:w-[min(28vw,410px)] min-[901px]:opacity-75" aria-hidden="true"><Image className="object-contain p-[11%] drop-shadow-[0_0_35px_rgba(255,63,152,.42)]" src="/nube-logo.webp" alt="" fill sizes="(min-width: 901px) 28vw, 54vw" priority /></div>
    </section>

    <nav className="sticky top-[78px] z-40 overflow-hidden border-y border-white/15 nube-surface-dark bg-[#09090b]/95 px-[clamp(18px,5vw,110px)] backdrop-blur-md min-[901px]:top-24" aria-label="Navigation Studio"><div className="flex w-full items-center justify-between gap-3 py-1 text-[12px] font-black tracking-[.1em] text-white/80 min-[901px]:justify-center min-[901px]:gap-10 min-[901px]:py-2 min-[901px]:tracking-[.13em]">{[{ href: "#poles", label: "EXPERTISES" }, { href: "#configurateur", label: "MON PROJET" }, { href: "#accompagnement", label: "SUIVI" }].map((item) => <a className="whitespace-nowrap px-1 py-2 transition hover:text-[var(--nube-accent-text)] focus-visible:text-[var(--nube-accent-text)]" href={item.href} key={item.href}>{item.label}</a>)}</div></nav>

    <section id="poles" className={`${section} nube-surface-light bg-[#f1efe9] text-[#09090b]`}><div className="grid gap-7 min-[901px]:grid-cols-[1.15fr_.85fr] min-[901px]:items-end"><SectionTitle number="01 / LES TROIS PÔLES">UNE IDÉE.<br /><span className="sr-only"> </span><em className="font-[Georgia] font-normal text-[var(--nube-accent-text)]">PLUSIEURS FORMES.</em></SectionTitle><p className="max-w-lg text-[15px] leading-[1.7] text-[#514c54]">Design, musique et image réunis pour construire un projet cohérent, de l’intention à sa sortie.</p></div><div className="mt-10 grid gap-3 min-[901px]:grid-cols-3">{poles.map((pole, poleIndex) => <article className="group flex min-h-[350px] flex-col border border-[#c8c2ba] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(41,20,31,.12)]" key={pole.title}><div className="flex justify-between text-[11px] font-black tracking-[.13em]"><span className="font-[Georgia] text-base italic text-[var(--nube-accent-text)]">0{poleIndex + 1}</span><span>{pole.price}</span></div><PoleVisual pole={pole.title} /><h3 className="mb-2 mt-5 text-[clamp(34px,4vw,50px)] tracking-[-.06em] transition group-hover:text-[var(--nube-accent-text)]">{pole.title}</h3><p className="mb-0 text-[13px] leading-[1.6] text-[#514c54]">{pole.items.slice(0, 4).join(" · ")}</p><a className="mt-auto pt-3 text-[11px] font-black tracking-[.13em] text-[var(--nube-accent-text)]" href="#configurateur">COMPOSER MON PROJET</a></article>)}</div><p className="mt-5 text-[12px] leading-[1.6] text-[#5e5961]">Tarifs de départ indicatifs. L’estimation détaillée se construit dans le configurateur.</p></section>

    <section id="configurateur" className={`${section} scroll-mt-24 nube-surface-light bg-[#f1efe9] text-[#09090b]`}><SectionTitle number="02 / CONSTRUIRE MON PROJET">TON PROJET.<br /><span className="sr-only"> </span><em className="font-[Georgia] font-normal text-[var(--nube-accent-text)]">À TA MANIÈRE.</em></SectionTitle><p className="mt-7 max-w-xl text-[15px] leading-[1.7] text-[#514c54]">Pars d’une base ou compose librement. Le tarif et le récapitulatif se mettent à jour immédiatement.</p><div className="mt-9 grid gap-2 min-[581px]:grid-cols-3" aria-label="Bases de projet rapides">{presets.map((preset) => <button className="min-h-14 border border-[#aaa4ac] bg-transparent px-4 text-left text-[12px] font-black tracking-[.08em] transition hover:border-[#ff66c4] hover:bg-[#ff66c4]/10" type="button" onClick={() => choosePreset(preset)} key={preset.type}><span className="block text-[var(--nube-accent-text)]">BASE {preset.type.toUpperCase()}</span><small className="mt-1 block text-[11px] font-medium normal-case tracking-normal text-[#5e5961]">{preset.text}</small></button>)}</div><div className="mt-12 grid items-start gap-12 min-[901px]:grid-cols-[1.2fr_.8fr]">
      <div><fieldset className="mb-14 border-0 p-0"><legend className="mb-6 w-full border-b border-[#bbb6ae] pb-4 text-[11px] font-black tracking-[.13em]"><span className="mr-4 font-[Georgia] italic text-[var(--nube-accent-text)]">01</span>QU’EST-CE QUE TU CRÉES ?</legend><div className="grid gap-2 min-[581px]:grid-cols-2">{projectTypes.map((type) => <button type="button" className={`flex min-h-14 items-center justify-between border px-4 text-[13px] font-bold transition ${projectType === type ? "border-[#ff66c4] bg-[#ff66c4]" : "border-[#c4bfb7] bg-transparent hover:border-[#ff66c4]"} ${type === "Autre" ? "min-[581px]:col-span-2" : ""}`} key={type} onClick={() => setProjectType(type)} aria-pressed={projectType === type}>{type}<span className="text-[10px] font-black tracking-[.1em]">{projectType === type ? "SÉLECTIONNÉ" : ""}</span></button>)}</div></fieldset>
      <fieldset className="border-0 p-0"><legend className="mb-6 w-full border-b border-[#bbb6ae] pb-4 text-[11px] font-black tracking-[.13em]"><span className="mr-4 font-[Georgia] italic text-[var(--nube-accent-text)]">02</span>DE QUOI AS-TU BESOIN ?</legend><div className="grid gap-8">{(["Design", "Musique", "Visuel"] as Pole[]).map((pole) => <div key={pole}><h3 className="mb-2 text-[11px] tracking-[.15em] text-[var(--nube-accent-text)]">{pole.toUpperCase()}</h3>{services.filter((service) => service.pole === pole).map((service) => { const active = selected.includes(service.id); return <label className={`grid min-h-[72px] cursor-pointer grid-cols-[82px_1fr] items-center gap-3 border-b border-[#c9c4bc] px-2 py-3 transition ${active ? "bg-[#ff66c4]/10" : "hover:bg-black/[.025]"}`} key={service.id}><input className="sr-only" type="checkbox" checked={active} onChange={() => toggle(service.id)} /><span className={`grid min-h-10 place-items-center border px-2 text-[10px] font-black tracking-[.08em] ${active ? "border-[#ff66c4] bg-[#ff66c4]" : "border-[#aaa4ac] text-[#6a656d]"}`}>{active ? "AJOUTÉ" : "AJOUTER"}</span><span className="flex flex-col justify-between gap-1 min-[581px]:flex-row min-[581px]:items-baseline"><strong className="text-[14px]">{service.name}</strong><small className="text-[11px] uppercase tracking-[.08em] text-[#6a656d]">{service.label} · {service.internal ? "par NUBE" : "partenaire"}</small></span></label>; })}</div>)}</div></fieldset></div>
      <aside id="project-summary" className="relative scroll-mt-40 overflow-hidden nube-surface-dark bg-[#0b0a0d] p-6 text-[#f1efe9] shadow-[0_25px_70px_rgba(15,8,12,.17)] min-[901px]:sticky min-[901px]:top-28"><div className="mb-6 border-b border-white/15 pb-4"><div className="flex items-center justify-between"><p className="m-0 text-[11px] font-black tracking-[.15em] text-[var(--nube-accent-text)]">TON PROJET</p><span className="text-[11px] text-white/75">{selected.length} SÉLECTION{selected.length !== 1 ? "S" : ""}</span></div><p className="mb-2 mt-4 text-[11px] text-white/75">{Math.min(selected.filter((id) => services.find((service) => service.id === id)?.internal).length, 3)} sur 3 prestations réalisées par NUBE</p><div className="grid grid-cols-3 gap-1" aria-hidden="true">{[0, 1, 2].map((step) => <i className={`h-1 not-italic ${selected.filter((id) => services.find((service) => service.id === id)?.internal).length > step ? "bg-[#ff66c4]" : "bg-white/20"}`} key={step} />)}</div></div><h3 className="my-6 text-[clamp(36px,4vw,58px)] leading-none tracking-[-.06em]">{projectType}</h3><div className="min-h-28 border-b border-white/15 pb-5">{chosen.length === 0 ? <p className="max-w-xs text-[13px] leading-[1.6] text-white/75">Ajoute une prestation pour obtenir une première estimation.</p> : chosen.map((service) => <div className="flex min-h-11 items-center justify-between gap-3 text-[13px] text-white/85" key={service.id}><span>{serviceDescription(service)}</span><button className="min-h-11 border-0 bg-transparent px-2 text-[11px] font-black tracking-[.08em] text-white/75 hover:text-[var(--nube-accent-text)]" type="button" onClick={() => toggle(service.id)} aria-label={`Retirer ${service.name}`}>RETIRER</button></div>)}</div><div className="border-b border-white/15 py-5 text-[12px]"><div className="mb-2 flex justify-between text-white/75"><span>Montants chiffrés</span><strong>{totals.hasEstimate ? `${totals.value} CHF` : totals.quote ? "Sur devis" : "À définir ensemble"}{totals.quote && totals.hasEstimate ? " + devis" : ""}</strong></div><div className="flex justify-between"><span>Réduction</span><strong className={totals.discount ? "text-[var(--nube-accent-text)]" : "text-white/70"}>{totals.discount ? `− ${totals.discount} CHF` : "—"}</strong></div><p className="mb-0 mt-4 text-[11px] leading-[1.55] text-white/75">{totals.discount ? "Réduction de 15 % activée sur les montants admissibles." : `${Math.max(0, 3 - selected.filter((id) => services.find((service) => service.id === id)?.internal).length)} prestation(s) réalisée(s) par NUBE avant la réduction.`}{totals.quote ? " Les prestations sur devis ne sont pas incluses." : ""}</p></div><div className="flex items-end justify-between gap-4 py-6"><span className="text-[11px] font-black tracking-[.14em] text-white/75">MINIMUM ESTIMÉ</span><strong className="text-right text-[clamp(27px,3vw,42px)] tracking-[-.05em] text-[var(--nube-accent-text)]">{totals.hasEstimate ? `${totals.estimate} CHF` : totals.quote ? "SUR DEVIS" : "À définir ensemble"}</strong></div><p className="mb-5 text-[11px] leading-[1.55] text-white/75">Estimation indicative : {estimateDescription}.</p>{chosen.length ? <button className="w-full border-0 bg-[#ff66c4] px-5 py-5 text-[12px] font-black tracking-[.13em] text-[#09090b] transition hover:bg-white" type="button" onClick={copyAndOpenInstagram}>COPIER LE RÉCAPITULATIF ET OUVRIR INSTAGRAM</button> : <a className="block bg-white/10 px-5 py-5 text-center text-[12px] font-black tracking-[.13em] text-white/75" href="#configurateur">CHOISIS D’ABORD UNE PRESTATION</a>}<p className="mb-0 mt-4 text-[11px] leading-[1.55] text-white/75">Le résumé est copié dans ton presse-papiers : colle-le ensuite dans ton message Instagram.</p><p className={`mt-3 text-[12px] font-bold ${copyStatus === "error" ? "text-[#ffb3d3]" : "text-[var(--nube-accent-text)]"}`} role="status">{copyStatus === "success" ? "Résumé copié. Instagram est ouvert dans un nouvel onglet." : copyStatus === "error" ? "La copie a échoué. Tu peux réessayer ou nous écrire directement." : ""}</p><button className="mt-5 min-h-11 border-0 border-b border-white/30 bg-transparent pb-1 text-[11px] font-black tracking-[.1em] text-white/75" type="button" onClick={resetProject}>RÉINITIALISER MON PROJET</button></aside>
    </div></section>

    {selected.length > 0 && <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1fr_auto] items-center gap-4 border-t border-white/15 nube-surface-dark bg-[#09090b]/95 px-5 py-3 text-white shadow-[0_-12px_35px_rgba(0,0,0,.28)] backdrop-blur-md min-[901px]:hidden"><div><span className="block text-[11px] font-black tracking-[.12em] text-white/60">{selected.length} SÉLECTION{selected.length !== 1 ? "S" : ""}</span><strong className="mt-1 block text-xl tracking-[-.04em] text-[var(--nube-accent-text)]">{totals.hasEstimate ? `${totals.estimate} CHF` : "SUR DEVIS"}</strong></div><a className="inline-flex min-h-11 items-center bg-[#ff66c4] px-4 text-[12px] font-black tracking-[.1em] text-[#09090b]" href="#project-summary">VOIR MON PROJET</a></div>}

    <section id="accompagnement" className={`${section} overflow-hidden bg-[radial-gradient(circle_at_82%_42%,rgba(255,63,152,.18),transparent_28%),#100b10]`}><div className="grid items-center gap-9 min-[581px]:grid-cols-[1.2fr_.8fr]"><div><SectionTitle number="03 / ACCOMPAGNEMENT">PLUS QU’UNE<br /><span className="sr-only"> </span><em className="font-[Georgia] font-normal text-[var(--nube-accent-text)]">PRESTATION.</em></SectionTitle><p className="mt-7 max-w-2xl text-[15px] leading-[1.7] text-white/75">Pour les projets suivis dans la durée, une équipe resserrée coordonne direction artistique, musique et image. Des spécialistes partenaires interviennent au bon moment.</p><strong className="mt-5 block text-[13px]">Un seul fil conducteur pour tout le projet.</strong></div><div className="mx-auto grid aspect-square w-[min(52vw,230px)] place-items-center rounded-full border border-dashed border-white/30 text-center"><div><Image className="mx-auto w-1/2 opacity-80" src="/nube-logo.webp" alt="" width={230} height={230} /><strong className="block text-[clamp(24px,3vw,38px)] tracking-[-.05em] text-[var(--nube-accent-text)]">INCUBATED</strong><span className="text-[12px] font-black tracking-[.15em]">BY NUBE STUDIO</span></div></div></div></section>

    <section id="contact" className="relative flex min-h-[520px] flex-col items-center justify-center bg-[#ff66c4] px-6 py-20 text-center text-[#09090b]"><p className="mb-5 text-[11px] font-black tracking-[.18em]">PREMIER ÉCHANGE</p><h2 className={title}>ON CONSTRUIT<br /><span className="sr-only"> </span><em className="font-[Georgia] font-normal text-[#09090b]">QUOI ENSEMBLE ?</em></h2><p className="my-7 max-w-xl text-[15px] leading-[1.7]">Une prestation précise ou un projet encore flou : raconte-nous où tu veux aller.</p><a className="nube-surface-dark bg-[#09090b] px-7 py-5 text-[12px] font-black tracking-[.13em] text-white" href={instagramUrl} target="_blank" rel="noreferrer">NOUS ÉCRIRE SUR INSTAGRAM</a><a className="mt-4 inline-flex min-h-11 items-center text-[14px] underline underline-offset-4" href={contactEmailUrl}>{contactEmail}</a></section>
    <SiteFooter theme="pink" />
  </main>;
}

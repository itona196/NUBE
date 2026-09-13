import Image from "next/image";
import Link from "next/link";
import { MainHeader } from "@/components/main-header";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="relative flex min-h-screen items-center overflow-hidden bg-[radial-gradient(circle_at_75%_50%,rgba(255,63,152,.2),transparent_34%),#08080a] px-[clamp(24px,7vw,110px)] pb-16 pt-36 text-[#f1efe9]">
      <MainHeader />
      <div className="relative z-2 max-w-3xl">
        <p className="mb-6 text-[11px] font-black tracking-[.2em] text-white/60">ERREUR · 404</p>
        <h1 className="m-0 text-[clamp(58px,12vw,150px)] leading-[.82] tracking-[-.085em]">HORS<br /><span className="sr-only"> </span><em className="font-[Georgia] font-normal text-[var(--nube-accent-text)]">SCÈNE.</em></h1>
        <p className="mb-9 mt-10 max-w-md text-[15px] leading-[1.7] text-white/70">Cette page n’existe pas ou a changé d’adresse. Le reste de NUBE est toujours là.</p>
        <div className="flex flex-wrap gap-5">
          <Link className="nube-surface-light bg-[#f1efe9] px-6 py-5 text-[12px] font-black tracking-[.14em] text-[#08080a] transition hover:bg-[#ff66c4]" href="/">RETOUR À L’ACCUEIL</Link>
          <Link className="border-b border-white/40 px-1 py-4 text-[11px] font-black tracking-[.15em]" href="/festival">VOIR LE FESTIVAL</Link>
        </div>
      </div>
      <div className="pointer-events-none absolute -right-[18vw] top-[26%] aspect-square w-[70vw] max-w-[620px] opacity-35 min-[581px]:-right-[8vw]" aria-hidden="true">
        <Image className="object-contain drop-shadow-[0_0_50px_rgba(255,63,152,.4)]" src="/nube-logo.webp" alt="" fill sizes="70vw" priority />
      </div>
    </main>
  );
}

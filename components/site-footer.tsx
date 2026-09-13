import Link from "next/link";
import { contactEmail, contactEmailUrl } from "@/data/nube";
import { mainNavigation } from "@/data/navigation";

type SiteFooterProps = {
  theme?: "dark" | "light" | "pink";
};

const themes = {
  dark: "border-white/15 nube-surface-dark bg-[#09090b] text-white",
  light: "border-black/20 nube-surface-light bg-[#f1efe9] text-[#0a090b]",
  pink: "border-black/25 bg-[#ff66c4] text-[#0a090b]",
};

export function SiteFooter({ theme = "dark" }: SiteFooterProps) {
  const muted = theme === "dark" ? "text-white/65" : theme === "pink" ? "text-black/75" : "text-black/65";
  const linkHover = theme === "pink" ? "hover:text-[#0a090b] hover:underline focus-visible:text-[#0a090b] focus-visible:underline" : "hover:text-[var(--nube-accent-text)]";

  return (
    <footer className={`border-t px-[clamp(24px,7vw,110px)] py-9 ${themes[theme]}`}>
      <div className="grid gap-7 text-center min-[901px]:grid-cols-[1fr_auto_1fr] min-[901px]:items-end min-[901px]:text-left">
        <div className="justify-self-center min-[901px]:justify-self-start">
          <Link className="inline-flex min-h-11 items-center text-2xl font-[950] tracking-[-.05em]" href="/" aria-label="Retour à l’accueil NUBE">NUBE<sup className="ml-0.5 align-top text-[11px]">®</sup></Link>
          <p className={`mb-0 mt-2 text-[12px] font-bold leading-[1.6] tracking-[.08em] ${muted}`}>FESTIVAL ET STUDIO ARTISTIQUE INDÉPENDANT · LAUSANNE</p>
          <a className="mt-2 inline-flex min-h-11 items-center text-[14px] underline underline-offset-4" href={contactEmailUrl}>{contactEmail}</a>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-4 justify-self-center" aria-label="Navigation de pied de page">
          {mainNavigation.map((link) => (
            <Link className={`inline-flex min-h-11 items-center text-[12px] font-black tracking-[.12em] transition ${linkHover}`} href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <p className={`m-0 justify-self-center text-[12px] font-bold tracking-[.1em] min-[901px]:justify-self-end min-[901px]:text-right ${muted}`}>
          © 2026 NUBE · LAUSANNE, CH
        </p>
      </div>
    </footer>
  );
}

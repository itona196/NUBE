import Link from "next/link";
import type { NavigationItem } from "./site-header";

type SiteFooterProps = {
  tagline: string;
  links: NavigationItem[];
  copyright: string;
  darkBorder?: boolean;
};

export function SiteFooter({
  tagline,
  links,
  copyright,
  darkBorder = false,
}: SiteFooterProps) {
  return (
    <footer
      className={`absolute inset-x-[clamp(24px,4vw,70px)] bottom-[34px] grid grid-cols-2 items-end gap-y-[18px] border-t pt-6 text-left min-[581px]:grid-cols-[1fr_auto_1fr] ${darkBorder ? "border-black/25" : "border-white/15"}`}
    >
      <div className="text-[22px] font-[950] tracking-[-.05em]">
        NUBE<sup className="ml-0.5 align-top text-[11px]">®</sup>
        <span className="mt-1 block text-[10px] tracking-[.18em]">{tagline}</span>
      </div>
      <div className="row-start-2 flex gap-[26px] text-[11px] font-black tracking-[.15em] min-[581px]:row-auto">
        {links.map((link) => (
          <Link href={link.href} key={`${link.href}-${link.label}`}>
            {link.label}
          </Link>
        ))}
      </div>
      <div className="row-start-2 justify-self-end text-right text-[10px] leading-[1.7] tracking-[.15em] min-[581px]:row-auto">
        LAUSANNE, CH
        <br />© 2026 {copyright}
      </div>
    </footer>
  );
}

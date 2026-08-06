"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "./brand";

export type NavigationItem = {
  href: string;
  label: string;
};

type SiteHeaderProps = {
  brandLabel: string;
  brandHref?: string;
  navigationLabel: string;
  navigation: NavigationItem[];
  action?: NavigationItem;
};

export function SiteHeader({
  brandLabel,
  brandHref = "/",
  navigationLabel,
  navigation,
  action,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = navigation
      .filter((item) => item.href.startsWith("#"))
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-25% 0px -60%", threshold: [0, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navigation]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 grid h-[78px] grid-cols-[1fr_auto] items-center border-b border-white/15 bg-[#08080a]/80 px-[clamp(24px,4vw,72px)] backdrop-blur-xl min-[901px]:h-24 min-[901px]:grid-cols-[1fr_auto_1fr]">
      <Brand href={brandHref} ariaLabel={brandLabel} />
      <nav
        className="hidden gap-[clamp(16px,2vw,30px)] min-[901px]:flex"
        aria-label={navigationLabel}
      >
        {navigation.map((item) => (
          <Link
            className={`relative text-[11px] font-extrabold tracking-[.14em] transition after:absolute after:-bottom-2 after:left-0 after:h-px after:bg-[#ff3f98] after:transition-all hover:text-[#ff3f98] ${activeHref === item.href || pathname === item.href ? "text-[#ff3f98] opacity-100 after:w-full" : "opacity-70 after:w-0"}`}
            href={item.href}
            key={item.href}
            aria-current={pathname === item.href ? "page" : activeHref === item.href ? "location" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center justify-self-end gap-3">
        {action && (
          <Link
            className="hidden items-center gap-3.5 text-[11px] font-extrabold tracking-[.14em] min-[901px]:flex"
            href={action.href}
          >
            {action.label}
          </Link>
        )}
        <button
          className="grid h-11 w-11 place-items-center border border-white/20 text-white transition hover:border-[#ff3f98] hover:text-[#ff3f98] min-[901px]:hidden"
          type="button"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="relative h-4 w-5" aria-hidden="true">
            <span className={`absolute left-0 top-0 h-px w-5 bg-current transition ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`absolute left-0 top-[7px] h-px w-5 bg-current transition ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 top-[14px] h-px w-5 bg-current transition ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`absolute inset-x-0 top-full border-b border-white/15 bg-[#08080a]/97 px-6 pb-7 pt-3 shadow-2xl backdrop-blur-xl transition duration-200 min-[901px]:hidden ${menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"}`}
        aria-label={`${navigationLabel} mobile`}
      >
        <div className="flex flex-col">
          {navigation.map((item, itemIndex) => (
            <Link
              className={`flex items-center justify-between border-b border-white/10 py-5 text-sm font-black tracking-[.14em] transition hover:text-[#ff3f98] ${activeHref === item.href || pathname === item.href ? "text-[#ff3f98]" : "text-white/80"}`}
              href={item.href}
              key={item.href}
              aria-current={pathname === item.href ? "page" : activeHref === item.href ? "location" : undefined}
              onClick={closeMenu}
            >
              <span><small className="mr-4 font-[Georgia] text-[12px] italic text-[#ff3f98]">0{itemIndex + 1}</small>{item.label}</span>
            </Link>
          ))}
          {action && (
            <Link
              className="mt-5 flex items-center justify-between bg-[#ff3f98] px-5 py-4 text-[12px] font-black tracking-[.14em] text-[#08080a]"
              href={action.href}
              onClick={closeMenu}
            >
              {action.label}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

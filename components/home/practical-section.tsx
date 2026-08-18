import Link from "next/link";

const practicalDetails = [
  { label: "ÉDITION", value: "NUBE #2" },
  { label: "DATE", value: "À ANNONCER" },
  { label: "VILLE", value: "LAUSANNE" },
  { label: "LIEU", value: "À ANNONCER" },
];

export function PracticalSection() {
  return (
    <section id="infos" className="scroll-mt-24 border-y border-white/15 bg-[#0d0c0f] px-[clamp(24px,7vw,110px)] py-[clamp(58px,7vw,90px)]">
      <div className="grid gap-10 min-[901px]:grid-cols-[.65fr_1.35fr] min-[901px]:items-end">
        <div>
          <p className="mb-4 text-[11px] font-black tracking-[.18em] text-white/80">L’ESSENTIEL</p>
          <h2 className="m-0 text-[clamp(38px,5vw,72px)] leading-[.92] tracking-[-.06em]">NUBE #2<br /><span className="sr-only"> </span><em className="font-[Georgia] font-normal text-[#ff66c4]">ARRIVE.</em></h2>
        </div>
        <div>
          <div className="grid grid-cols-2 border-l border-t border-white/15 min-[581px]:grid-cols-4">
            {practicalDetails.map((detail) => (
              <div className="min-h-28 border-b border-r border-white/15 p-4 min-[581px]:p-5" key={detail.label}>
                <span className="block text-[10px] font-black tracking-[.18em] text-white/75">{detail.label}</span>
                <strong className="mt-7 block text-[13px] tracking-[.04em]">{detail.value}</strong>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-col items-start justify-between gap-4 min-[581px]:flex-row min-[581px]:items-center">
            <p className="m-0 max-w-md text-[12px] leading-[1.65] text-white/80">Le détail complet est centralisé dans le guide pratique.</p>
            <Link className="bg-[#ff66c4] px-5 py-4 text-[11px] font-black tracking-[.15em] text-[#08080a] transition hover:-translate-y-0.5 hover:bg-white" href="/infos">OUVRIR LE GUIDE</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

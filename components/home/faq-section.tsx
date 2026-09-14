import { instagramUrl } from "@/data/nube";

const questions = [
  { question: "Comment suivre les prochaines annonces ?", answer: <>Les nouvelles éditions, la programmation et les informations pratiques sont annoncées sur le site et sur le compte Instagram de <a className="font-bold text-[var(--nube-accent-text)] underline underline-offset-4" href={instagramUrl} target="_blank" rel="noopener noreferrer">NUBE</a>.</> },
  { question: "Où aura lieu la prochaine édition ?", answer: "À Lausanne. Le lieu précis, les horaires et les conditions d’accès seront communiqués dès leur confirmation." },
  { question: "NUBE Studio et le festival, c’est la même chose ?", answer: "Le festival est la scène publique. NUBE Studio est le pôle qui accompagne la création d’identités et d’expériences." },
];

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 nube-surface-light bg-[#f1efe9] px-[clamp(24px,7vw,110px)] py-[clamp(80px,10vw,140px)] text-[#0a0a0d]">
      <div className="grid gap-12 min-[901px]:grid-cols-[.65fr_1.35fr]">
        <div><p className="mb-5 text-[11px] font-black tracking-[.18em] opacity-80">FAQ</p><h2 className="m-0 text-[clamp(46px,6vw,82px)] leading-[.92] tracking-[-.06em]">AVANT<br /><span className="sr-only"> </span><em className="font-[Georgia] font-normal text-[var(--nube-accent-text)]">DE VENIR.</em></h2></div>
        <div className="border-t border-black/25">
          {questions.map((item, index) => (
            <details className="group border-b border-black/25 py-6" key={item.question}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[clamp(18px,2vw,28px)] font-black tracking-[-.03em]"><span><small className="mr-4 font-[Georgia] text-xs italic text-[var(--nube-accent-text)]">0{index + 1}</small>{item.question}</span><span className="text-[var(--nube-accent-text)] transition group-open:rotate-45">+</span></summary>
              <p className="mb-0 ml-9 mt-5 max-w-xl text-[14px] leading-[1.7] text-[#514c54]">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

type CloudArtworkProps = {
  topLabel: string;
  bottomLabel: string;
  className?: string;
};

const orb =
  "absolute rounded-full bg-[radial-gradient(circle_at_35%_28%,#ffc2f8_0,#ff76bc_24%,#fe69a0_48%,#7b235f_72%,#27122f_100%)] shadow-[inset_-25px_-30px_60px_rgba(0,0,0,.5),0_0_58px_rgba(255,102,196,.25)]";

export function CloudArtwork({ topLabel, bottomLabel, className = "" }: CloudArtworkProps) {
  return (
    <div className={`nube-bloom absolute right-[-23vw] top-[55%] z-2 aspect-square w-[75vw] opacity-75 saturate-110 min-[581px]:right-[-8vw] min-[581px]:top-[48%] min-[581px]:w-[65vw] min-[901px]:right-[clamp(-110px,-2vw,-25px)] min-[901px]:top-[18%] min-[901px]:w-[min(43vw,650px)] min-[901px]:opacity-100 ${className}`} aria-hidden="true">
      <div className="absolute inset-[13%] rounded-full bg-[#ff66c4] opacity-30 blur-[80px] motion-safe:animate-pulse" />
      <div className={`${orb} left-[8%] top-[28%] h-1/2 w-1/2`} /><div className={`${orb} right-[3%] top-[21%] h-[58%] w-[58%]`} />
      <div className={`${orb} left-[31%] top-[2%] h-[42%] w-[42%]`} /><div className={`${orb} bottom-[15%] left-[24%] h-[43%] w-[55%]`} />
      <div className="absolute inset-[28%] grid place-items-center rounded-full border border-white/35 font-[Georgia] text-[clamp(70px,10vw,165px)] italic text-white mix-blend-overlay drop-shadow-[0_0_25px_white]">N</div>
      <span className="absolute right-[4%] top-[48%] rotate-90 text-[11px] font-black tracking-[.28em] text-white/70">{topLabel}</span>
      <span className="absolute bottom-[22%] left-[5%] -rotate-12 text-[11px] font-black tracking-[.28em] text-white/70">{bottomLabel}</span>
    </div>
  );
}

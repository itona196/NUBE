import Image from "next/image";

type CloudArtworkProps = {
  className?: string;
};

export function CloudArtwork({ className = "" }: CloudArtworkProps) {
  return (
    <div className={`nube-bloom absolute right-[-18vw] top-[54%] z-2 aspect-square w-[72vw] animate-[studioCloudFloat_7s_ease-in-out_infinite] opacity-55 motion-reduce:animate-none min-[581px]:right-[-7vw] min-[581px]:top-[43%] min-[581px]:w-[58vw] min-[581px]:opacity-70 min-[901px]:right-[3vw] min-[901px]:top-[20%] min-[901px]:w-[min(38vw,560px)] min-[901px]:opacity-90 ${className}`} aria-hidden="true">
      <div className="absolute inset-[16%] rounded-full bg-[#ff66c4]/35 blur-[70px]" />
      <div className="absolute inset-[4%] rounded-full border border-white/10 before:absolute before:inset-[18%] before:rounded-full before:border before:border-white/10" />
      <Image className="object-contain p-[8%] drop-shadow-[0_0_42px_rgba(255,102,196,.45)]" src="/nube-logo.webp" alt="" fill sizes="(min-width: 901px) 38vw, 72vw" priority />
    </div>
  );
}

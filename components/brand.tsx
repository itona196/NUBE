import Image from "next/image";
import Link from "next/link";

type BrandProps = {
  href?: string;
  ariaLabel: string;
};

export function Brand({ href = "/", ariaLabel }: BrandProps) {
  return (
    <Link
      className="group flex min-h-11 items-center gap-[11px] text-xl font-black tracking-[-1.5px] min-[581px]:text-2xl"
      href={href}
      aria-label={ariaLabel}
    >
      <Image
        className="h-[34px] w-[34px] object-contain drop-shadow-[0_0_9px_rgba(255,63,152,.42)] transition group-hover:-rotate-6 group-hover:scale-105 min-[581px]:h-[42px] min-[581px]:w-[42px]"
        src="/nube-logo.webp"
        alt=""
        width={42}
        height={42}
        priority
      />
      <span>
        NUBE<sup className="ml-0.5 align-top text-[11px]">®</sup>
      </span>
    </Link>
  );
}

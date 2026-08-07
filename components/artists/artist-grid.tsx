import Image from "next/image";
import { artists } from "@/data/nube";

type ArtistGridProps = {
  limit?: number;
  names?: string[];
  numbered?: boolean;
  descriptions?: boolean;
};

export function ArtistGrid({ limit, names, numbered = true, descriptions = true }: ArtistGridProps) {
  const selectedArtists = names
    ? names.flatMap((name) => artists.filter((artist) => artist.name === name))
    : artists;
  const visibleArtists = limit ? selectedArtists.slice(0, limit) : selectedArtists;

  return (
    <div className="grid grid-cols-2 gap-x-[9px] gap-y-[30px] min-[581px]:gap-x-3.5 min-[581px]:gap-y-[42px] min-[901px]:grid-cols-4">
      {visibleArtists.map((artist, index) => (
        <article className="group min-w-0 min-[901px]:even:translate-y-10" key={artist.name}>
          <div className="nube-image-treatment relative aspect-[2/3] overflow-hidden border border-[#c5c0b8] bg-[#111014] after:pointer-events-none after:absolute after:inset-0 after:z-[1] after:bg-[linear-gradient(180deg,rgba(0,0,0,.12),transparent_30%,rgba(0,0,0,.78))]">
            <Image
              className="object-cover transition duration-700 group-hover:scale-[1.025] group-hover:saturate-[1.08] group-hover:contrast-[1.03]"
              src={artist.image}
              alt={artist.alt}
              fill
              sizes="(max-width: 900px) 50vw, 25vw"
            />
            {numbered && <span className="absolute right-[13px] top-3 z-2 grid h-8 w-8 place-items-center rounded-full border border-white/40 font-[Georgia] text-xs italic text-white backdrop-blur-sm">0{index + 1}</span>}
            <div className="absolute inset-x-3 bottom-4 z-2 min-[581px]:inset-x-4 min-[581px]:bottom-5">
              <span className="mb-2 block h-[3px] w-8 bg-[#ff66c4] transition-all duration-500 group-hover:w-full" aria-hidden="true" />
              <h3 className="m-0 break-words text-[clamp(25px,3.2vw,46px)] font-[950] leading-[.84] tracking-[-.065em] text-white drop-shadow-[0_3px_18px_rgba(0,0,0,.65)] transition duration-500 group-hover:text-[#ff66c4]">{artist.name}</h3>
            </div>
          </div>
          {descriptions && artist.description && (
            <div className="mt-4 border-l-2 border-[#ff66c4] pl-4">
              <p className="mb-0 max-w-[34rem] text-[13px] leading-[1.65] text-[#5b575e]">{artist.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {!artist.soundcloudUrl && (artist.spotifyUrl ? <a className="border border-[#0a090b] px-3 py-2 text-[9px] font-black tracking-[.14em] transition hover:border-[#ff66c4] hover:bg-[#ff66c4]" href={artist.spotifyUrl} target="_blank" rel="noreferrer">SPOTIFY</a> : <span className="cursor-not-allowed border border-black/20 px-3 py-2 text-[9px] font-black tracking-[.14em] text-black/35" aria-disabled="true">SPOTIFY · BIENTÔT</span>)}
                {artist.soundcloudUrl && <a className="border border-[#0a090b] px-3 py-2 text-[9px] font-black tracking-[.14em] transition hover:border-[#ff66c4] hover:bg-[#ff66c4]" href={artist.soundcloudUrl} target="_blank" rel="noreferrer">SOUNDCLOUD</a>}
                {artist.instagramUrl ? <a className="border border-[#0a090b] px-3 py-2 text-[9px] font-black tracking-[.14em] transition hover:border-[#ff66c4] hover:bg-[#ff66c4]" href={artist.instagramUrl} target="_blank" rel="noreferrer">INSTAGRAM</a> : <span className="cursor-not-allowed border border-black/20 px-3 py-2 text-[9px] font-black tracking-[.14em] text-black/35" aria-disabled="true">INSTAGRAM · BIENTÔT</span>}
              </div>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

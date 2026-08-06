import { artists } from "@/data/nube";

type ArtistGridProps = {
  limit?: number;
};

export function ArtistGrid({ limit }: ArtistGridProps) {
  const visibleArtists = limit ? artists.slice(0, limit) : artists;

  return (
    <div className="grid grid-cols-2 gap-x-[9px] gap-y-[30px] min-[581px]:gap-x-3.5 min-[581px]:gap-y-[42px] min-[901px]:grid-cols-4">
      {visibleArtists.map((artist, index) => (
        <article className="group min-w-0" key={artist.name}>
          <div className="relative aspect-[2/3] overflow-hidden border border-[#c5c0b8] bg-[#111014] after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(0,0,0,.18),transparent_20%,transparent_72%,rgba(0,0,0,.28))]">
            <img className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025] group-hover:saturate-[1.08] group-hover:contrast-[1.03]" src={artist.image} alt={artist.alt} loading="lazy" decoding="async" />
            <span className="absolute right-[13px] top-3 z-2 font-[Georgia] text-xs italic text-white drop-shadow-[0_1px_10px_rgba(0,0,0,.7)]">0{index + 1}</span>
          </div>
          <h3 className="m-0 border-t border-[#bbb6ae] pt-[13px] text-[clamp(20px,2vw,30px)] tracking-[-.045em]">{artist.name}</h3>
        </article>
      ))}
    </div>
  );
}

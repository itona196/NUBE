import Image from "next/image";
import { artists } from "@/data/nube";

type ArtistGridProps = {
  limit?: number;
  names?: string[];
  numbered?: boolean;
  descriptions?: boolean;
};

function SpotifyIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <path d="M6.6 9.25c3.72-1.05 7.67-.73 10.99.9" stroke="var(--icon-cutout, #f1efe9)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7.2 12.45c3.12-.82 6.5-.54 9.33.82" stroke="var(--icon-cutout, #f1efe9)" strokeWidth="1.55" strokeLinecap="round" />
      <path d="M7.75 15.45c2.58-.62 5.37-.39 7.72.69" stroke="var(--icon-cutout, #f1efe9)" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

function SoundCloudIcon() {
  return (
    <svg className="h-6 w-7" viewBox="0 0 28 24" fill="currentColor" aria-hidden="true">
      <rect x="1" y="12" width="1.6" height="6" rx=".8" />
      <rect x="4" y="9.5" width="1.7" height="11" rx=".85" />
      <rect x="7.1" y="7" width="1.8" height="15" rx=".9" />
      <rect x="10.4" y="5" width="1.9" height="18" rx=".95" />
      <path d="M14.2 21.2h8.7a4.1 4.1 0 0 0 .35-8.18A6.25 6.25 0 0 0 13.9 8.1v12.8c0 .17.13.3.3.3Z" />
    </svg>
  );
}

export function ArtistGrid({ limit, names, numbered = true, descriptions = true }: ArtistGridProps) {
  const selectedArtists = names
    ? names.flatMap((name) => artists.filter((artist) => artist.name === name))
    : artists;
  const visibleArtists = limit ? selectedArtists.slice(0, limit) : selectedArtists;

  return (
    <div className="grid grid-cols-1 gap-x-[9px] gap-y-12 min-[581px]:grid-cols-2 min-[581px]:gap-x-3.5 min-[581px]:gap-y-[42px] min-[901px]:grid-cols-4">
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
              <p className="mb-0 max-w-[34rem] font-sans text-[15px] font-medium leading-[1.65] tracking-[-.015em] text-[#514c54]">{artist.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {artist.spotifyUrl && <a className="grid h-11 w-11 place-items-center border border-[#0a090b] text-[#0a090b] transition hover:-translate-y-0.5 hover:border-[#ff66c4]" href={artist.spotifyUrl} target="_blank" rel="noreferrer" aria-label={`Écouter ${artist.name} sur Spotify`} title="Spotify"><SpotifyIcon /></a>}
                {artist.soundcloudUrl && <a className="grid h-11 w-11 place-items-center border border-[#0a090b] text-[#0a090b] transition hover:-translate-y-0.5 hover:border-[#ff66c4]" href={artist.soundcloudUrl} target="_blank" rel="noreferrer" aria-label={`Écouter ${artist.name} sur SoundCloud`} title="SoundCloud"><SoundCloudIcon /></a>}
                {artist.instagramUrl && <a className="inline-flex min-h-11 items-center border border-[#0a090b] px-4 py-2 text-[11px] font-black tracking-[.12em] transition hover:border-[#ff66c4] hover:bg-[#ff66c4] min-[581px]:text-[12px]" href={artist.instagramUrl} target="_blank" rel="noreferrer">INSTAGRAM</a>}
              </div>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

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

// Brand paths from Simple Icons (CC0).
function AppleMusicIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.295-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536a1.88 1.88 0 011.038-2.022c.323-.16.67-.25 1.018-.324.378-.082.758-.153 1.134-.24.274-.063.457-.23.51-.516a.904.904 0 00.02-.193c0-1.815 0-3.63-.002-5.443a.725.725 0 00-.026-.185c-.04-.15-.15-.243-.304-.234-.16.01-.318.035-.475.066-.76.15-1.52.303-2.28.456l-2.325.47-1.374.278c-.016.003-.032.01-.048.013-.277.077-.377.203-.39.49-.002.042 0 .086 0 .13-.002 2.602 0 5.204-.003 7.805 0 .42-.047.836-.215 1.227-.278.64-.77 1.04-1.434 1.233-.35.1-.71.16-1.075.172-.96.036-1.755-.6-1.92-1.544-.14-.812.23-1.685 1.154-2.075.357-.15.73-.232 1.108-.31.287-.06.575-.116.86-.177.383-.083.583-.323.6-.714v-.15c0-2.96 0-5.922.002-8.882 0-.123.013-.25.042-.37.07-.285.273-.448.546-.518.255-.066.515-.112.774-.165.733-.15 1.466-.296 2.2-.444l2.27-.46c.67-.134 1.34-.27 2.01-.403.22-.043.442-.088.663-.106.31-.025.523.17.554.482.008.073.012.148.012.223.002 1.91.002 3.822 0 5.732z" />
    </svg>
  );
}

function DeezerIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M.693 10.024c.381 0 .693-1.256.693-2.807 0-1.55-.312-2.807-.693-2.807C.312 4.41 0 5.666 0 7.217s.312 2.808.693 2.808ZM21.038 1.56c-.364 0-.684.805-.91 2.096C19.765 1.446 19.184 0 18.526 0c-.78 0-1.464 2.036-1.784 5-.312-2.158-.788-3.536-1.325-3.536-.745 0-1.386 2.704-1.62 6.472-.442-1.932-1.083-3.145-1.793-3.145s-1.35 1.213-1.793 3.145c-.242-3.76-.874-6.463-1.628-6.463-.537 0-1.013 1.378-1.325 3.535C6.938 2.036 6.262 0 5.474 0c-.658 0-1.247 1.447-1.602 3.665-.217-1.291-.546-2.105-.91-2.105-.675 0-1.221 2.807-1.221 6.272 0 3.466.546 6.273 1.221 6.273.277 0 .537-.476.736-1.273.32 2.928.996 4.938 1.776 4.938.606 0 1.143-1.204 1.507-3.11.251 3.622.875 6.195 1.602 6.195.46 0 .875-1.023 1.187-2.677C10.142 21.6 11 24 12.004 24c1.005 0 1.863-2.4 2.235-5.822.312 1.654.727 2.677 1.186 2.677.728 0 1.352-2.573 1.603-6.195.364 1.906.9 3.11 1.507 3.11.78 0 1.455-2.01 1.775-4.938.208.797.46 1.273.737 1.273.675 0 1.22-2.807 1.22-6.273-.008-3.457-.553-6.272-1.23-6.272ZM23.307 10.024c.381 0 .693-1.256.693-2.807 0-1.55-.312-2.807-.693-2.807-.381 0-.693 1.256-.693 2.807s.312 2.808.693 2.808Z" />
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

function InstagramIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
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
          <div className="nube-surface-dark nube-image-treatment relative aspect-[2/3] overflow-hidden border border-[#c5c0b8] bg-[#111014] after:pointer-events-none after:absolute after:inset-0 after:z-[1] after:bg-[linear-gradient(180deg,rgba(0,0,0,.12),transparent_30%,rgba(0,0,0,.78))]">
            <Image
              className="object-cover transition duration-700 group-hover:scale-[1.025] group-hover:saturate-[1.08] group-hover:contrast-[1.03]"
              src={artist.image}
              alt={artist.alt}
              fill
              sizes="(max-width: 580px) 100vw, (max-width: 900px) 50vw, 25vw"
            />
            {numbered && <span className="absolute right-[13px] top-3 z-2 grid h-8 w-8 place-items-center rounded-full border border-white/40 font-[Georgia] text-xs italic text-white backdrop-blur-sm">0{index + 1}</span>}
            <div className="absolute inset-x-3 bottom-4 z-2 min-[581px]:inset-x-4 min-[581px]:bottom-5">
              <span className="mb-2 block h-[3px] w-8 bg-[#ff66c4] transition-all duration-500 group-hover:w-full" aria-hidden="true" />
              <h3 className="m-0 break-words text-[clamp(25px,3.2vw,46px)] font-[950] leading-[.84] tracking-[-.065em] text-white drop-shadow-[0_3px_18px_rgba(0,0,0,.65)] transition duration-500 group-hover:text-[var(--nube-accent-text)]">{artist.name}</h3>
            </div>
          </div>
          {descriptions && artist.description && (
            <div className="mt-4 border-l-2 border-[#ff66c4] pl-4">
              <p className="mb-0 max-w-[34rem] font-sans text-[15px] font-medium leading-[1.65] tracking-[-.015em] text-[#514c54]">{artist.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {artist.spotifyUrl && <a className="grid h-11 w-11 place-items-center border border-[#0a090b] text-[#0a090b] transition hover:-translate-y-0.5 hover:border-[#ff66c4]" href={artist.spotifyUrl} target="_blank" rel="noreferrer" aria-label={`Écouter ${artist.name} sur Spotify`} title="Spotify"><SpotifyIcon /></a>}
                {artist.appleMusicUrl && <a className="grid h-11 w-11 place-items-center border border-[#0a090b] text-[#0a090b] transition hover:-translate-y-0.5 hover:border-[#ff66c4]" href={artist.appleMusicUrl} target="_blank" rel="noopener noreferrer" aria-label={`Écouter ${artist.name} sur Apple Music`} title="Apple Music"><AppleMusicIcon /></a>}
                {artist.deezerUrl && <a className="grid h-11 w-11 place-items-center border border-[#0a090b] text-[#0a090b] transition hover:-translate-y-0.5 hover:border-[#ff66c4]" href={artist.deezerUrl} target="_blank" rel="noopener noreferrer" aria-label={`Écouter ${artist.name} sur Deezer`} title="Deezer"><DeezerIcon /></a>}
                {artist.soundcloudUrl && <a className="grid h-11 w-11 place-items-center border border-[#0a090b] text-[#0a090b] transition hover:-translate-y-0.5 hover:border-[#ff66c4]" href={artist.soundcloudUrl} target="_blank" rel="noreferrer" aria-label={`Écouter ${artist.name} sur SoundCloud`} title="SoundCloud"><SoundCloudIcon /></a>}
                {artist.instagramUrl && <a className="grid h-11 w-11 place-items-center border border-[#0a090b] text-[#0a090b] transition hover:-translate-y-0.5 hover:border-[#ff66c4]" href={artist.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={`Suivre ${artist.name} sur Instagram`} title="Instagram"><InstagramIcon /></a>}
              </div>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

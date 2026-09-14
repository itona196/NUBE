"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const subscribe = () => () => {};
const hydrated = () => true;
const serverSnapshot = () => false;

function clock(seconds: number) {
  const value = Math.floor(Number.isFinite(seconds) ? seconds : 0);
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
}

function Icon({ children }: { children: React.ReactNode }) {
  return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">{children}</svg>;
}

export function Aftermovie() {
  const video = useRef<HTMLVideoElement>(null);
  const player = useRef<HTMLDivElement>(null);
  const enhanced = useSyncExternalStore(subscribe, hydrated, serverSnapshot);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [message, setMessage] = useState("");
  const button = "grid h-11 w-11 shrink-0 place-items-center border-0 bg-transparent text-[#f1efe9] transition hover:text-[#ff66c4]";

  useEffect(() => {
    const update = () => setFullscreen(document.fullscreenElement === player.current);
    document.addEventListener("fullscreenchange", update);
    return () => document.removeEventListener("fullscreenchange", update);
  }, []);

  const togglePlay = async () => {
    if (!video.current) return;
    setMessage("");
    if (!video.current.paused) video.current.pause();
    else {
      try { await video.current.play(); }
      catch { setMessage("La lecture a échoué. Réessaie ou télécharge la vidéo."); }
    }
  };

  const toggleFullscreen = async () => {
    const media = video.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    try {
      if (document.fullscreenElement === player.current) await document.exitFullscreen();
      else if (player.current?.requestFullscreen) await player.current.requestFullscreen();
      else if (media?.webkitEnterFullscreen) media.webkitEnterFullscreen();
      else setMessage("Le plein écran n’est pas disponible dans ce navigateur.");
    } catch {
      if (media?.webkitEnterFullscreen) {
        try { media.webkitEnterFullscreen(); } catch { setMessage("Le plein écran n’est pas disponible dans ce navigateur."); }
      } else setMessage("Le plein écran n’est pas disponible dans ce navigateur.");
    }
  };

  return <div ref={player} className="nube-aftermovie nube-surface-dark flex flex-col bg-[#08080a] text-[#f1efe9]"
    tabIndex={enhanced ? 0 : undefined}
    role="region"
    aria-label="Lecteur de l’aftermovie"
    onPointerDown={(event) => {
      if (enhanced && event.target instanceof HTMLVideoElement) player.current?.focus({ preventScroll: true });
    }}
    onKeyDown={(event) => {
      const target = event.target as HTMLElement;
      // Buttons already handle Space; sliders must retain their keyboard controls.
      if (!enhanced || event.code !== "Space" || target.closest("button, input, textarea, select, a, [contenteditable]")) return;
      event.preventDefault();
      if (!event.repeat) void togglePlay();
    }}
  >
    <div className="nube-aftermovie-stage relative min-h-0">
    <video
      ref={video}
      className="block aspect-video min-h-0 w-full bg-black object-contain"
      controls={!enhanced}
      playsInline
      preload="none"
      poster="/videos/nube-1-aftermovie.jpg"
      aria-label="Aftermovie NUBE #1 — 21 juin 2026"
      onPlay={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      onEnded={() => setPlaying(false)}
      onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
      onDurationChange={(event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
      onVolumeChange={(event) => { setVolume(event.currentTarget.volume); setMuted(event.currentTarget.muted); }}
      onError={() => setMessage("La vidéo n’est pas disponible. Réessaie plus tard.")}
    >
      <source src="/videos/nube-1-aftermovie.mp4" type="video/mp4" />
      Votre navigateur ne prend pas en charge la vidéo.{' '}
      <a href="/videos/nube-1-aftermovie.mp4">Télécharger l’aftermovie</a>
    </video>
    {enhanced && !playing && <button
      type="button"
      aria-label="Lancer l’aftermovie"
      onClick={togglePlay}
      className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-[#ff66c4] bg-[#08080a]/85 text-[#ff66c4] shadow-lg transition hover:scale-105 hover:bg-[#08080a]"
    >
      <svg className="ml-1 h-8 w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m8 5 11 7-11 7Z" /></svg>
    </button>}
    </div>
    {enhanced && <div className="grid grid-cols-[44px_1fr_44px_44px] items-center gap-x-2 border-t border-white/15 px-2 min-[581px]:grid-cols-[44px_minmax(0,1fr)_auto_44px_72px_44px]" role="group" aria-label="Commandes de l’aftermovie">
      <button type="button" className={button} onClick={togglePlay} aria-label={playing ? "Mettre en pause" : "Lire l’aftermovie"}>
        <Icon>{playing ? <><path d="M8 5v14M16 5v14" strokeWidth="4" /></> : <path d="m8 5 11 7-11 7Z" fill="currentColor" stroke="none" />}</Icon>
      </button>
      <input type="range" min="0" max={duration || 1} step="0.1" value={Math.min(time, duration || 1)} disabled={!duration}
        className="nube-video-range order-first col-span-4 w-full min-w-0 min-[581px]:order-none min-[581px]:col-span-1"
        aria-label="Position dans la vidéo" aria-valuetext={`${clock(time)} sur ${clock(duration)}`}
        style={{ backgroundImage: `linear-gradient(to right, #ff66c4 ${duration ? time / duration * 100 : 0}%, #555058 ${duration ? time / duration * 100 : 0}%)` }}
        onChange={(event) => { if (video.current) { video.current.currentTime = Number(event.target.value); setTime(Number(event.target.value)); } }} />
      <span className="whitespace-nowrap text-[12px] tabular-nums" aria-hidden="true">{clock(time)} / {duration ? clock(duration) : "—"}</span>
      <button type="button" className={button} aria-label={muted || volume === 0 ? "Activer le son" : "Couper le son"} onClick={() => {
        if (video.current) { if (video.current.volume === 0) video.current.volume = 1; video.current.muted = !video.current.muted && volume !== 0; }
      }}><Icon><path d="M11 5 6 9H3v6h3l5 4Z" />{muted || volume === 0 ? <path d="m16 9 5 6m0-6-5 6" /> : <><path d="M15 8c3 2 3 6 0 8M18 5c5 4 5 10 0 14" /></>}</Icon></button>
      <input type="range" min="0" max="1" step="0.05" value={muted ? 0 : volume} aria-label="Volume" aria-valuetext={`${Math.round((muted ? 0 : volume) * 100)} %`}
        className="nube-video-range hidden w-full min-w-0 min-[581px]:block"
        style={{ backgroundImage: `linear-gradient(to right, #ff66c4 ${muted ? 0 : volume * 100}%, #555058 ${muted ? 0 : volume * 100}%)` }}
        onChange={(event) => { if (video.current) { video.current.volume = Number(event.target.value); video.current.muted = false; } }} />
      <button type="button" className={button} onClick={toggleFullscreen} aria-label={fullscreen ? "Quitter le plein écran" : "Afficher en plein écran"}><Icon><path d={fullscreen ? "M4 9h5V4m11 5h-5V4M4 15h5v5m11-5h-5v5" : "M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5"} /></Icon></button>
    </div>}
    {message && <p className="m-0 px-4 py-3 text-[13px]" role="status">{message} <a className="underline underline-offset-4" href="/videos/nube-1-aftermovie.mp4">Télécharger l’aftermovie</a></p>}
  </div>;
}

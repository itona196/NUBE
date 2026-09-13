export function Aftermovie() {
  return (
    <video
      className="block aspect-video w-full bg-black object-contain"
      controls
      playsInline
      preload="none"
      poster="/videos/nube-1-aftermovie.jpg"
      aria-label="Aftermovie NUBE #1 — 21 juin 2026"
    >
      <source src="/videos/nube-1-aftermovie.mp4" type="video/mp4" />
      Votre navigateur ne prend pas en charge la vidéo.{' '}
      <a href="/videos/nube-1-aftermovie.mp4">Télécharger l’aftermovie</a>
    </video>
  );
}

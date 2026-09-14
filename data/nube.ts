export const contactEmail = "contact@nubeexperience.ch";
export const contactEmailUrl = `mailto:${contactEmail}`;
export const instagramUrl = "https://www.instagram.com/nube.experience/";

export type Artist = {
  name: string;
  image: string;
  alt: string;
  description: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  deezerUrl?: string;
  instagramUrl?: string;
  soundcloudUrl?: string;
};

export const artists: Artist[] = [
  { name: "DXMXN", instagramUrl: "https://www.instagram.com/dex.en.personne/", appleMusicUrl: "https://music.apple.com/ch/artist/dxmxn/1766311388", deezerUrl: "https://www.deezer.com/artist/281044621", image: "/artists/dxmxn.jpg", alt: "Visuel officiel de DXMXN pour NUBE #1", description: "Une énergie reggaeton directe, solaire et pensée pour faire bouger la scène.", spotifyUrl: "https://open.spotify.com/intl-fr/artist/5gxIhjBjfrH04OwBCbEWVv?si=NRFNgeoPR7mgqOdgzCWiOw" },
  { name: "SH4M", instagramUrl: "https://www.instagram.com/sh4m.mp4/", appleMusicUrl: "https://music.apple.com/ch/artist/sh4m/6777966169", deezerUrl: "https://www.deezer.com/artist/331221071", image: "/artists/sh4m.jpg", alt: "Visuel officiel de SH4M pour NUBE #1", description: "Une indie pop sensible où les mélodies intimes rencontrent une production moderne.", spotifyUrl: "https://open.spotify.com/intl-fr/artist/61evS7eHgth1o4FclIkoVN?si=8Yzf7QXoQ66VZBVIC1wx_w" },
  { name: "NEL", instagramUrl: "https://www.instagram.com/nel5.off/", appleMusicUrl: "https://music.apple.com/ch/artist/nel/1777514480", deezerUrl: "https://www.deezer.com/artist/298511301", image: "/artists/nel.webp", alt: "NEL en performance sur le visuel officiel de NUBE #1", description: "Un boom bap mélancolique qui transforme son vécu en récits personnels.", spotifyUrl: "https://open.spotify.com/intl-fr/artist/7eQNzlA9C0Z27y26n9L3Aj?si=fn_xpa7RRBm7b3L9_TtlQA" },
  { name: "TENGSHE", instagramUrl: "https://www.instagram.com/t.engshe/", appleMusicUrl: "https://music.apple.com/ch/artist/tengshe/1892645910", deezerUrl: "https://www.deezer.com/artist/388448291", image: "/artists/tengshe.jpg", alt: "Visuel officiel fleuri de TENGSHE pour NUBE #1", description: "Un univers EDM et hyperpop, électrique, rapide et sans frontières.", spotifyUrl: "https://open.spotify.com/intl-fr/artist/2Vpb0qaSmyhIwydvg0UXC8?si=gOvmE5xHS_-4_3B4ANlc5g" },
  { name: "ITONA", image: "/artists/itona.jpg", alt: "Visuel officiel en reflet d’ITONA pour NUBE #1", description: "Un univers sombre où les textures cloud rencontrent l’intensité du rock.", soundcloudUrl: "https://on.soundcloud.com/SEiy3j0j30UaedBhgC" },
  { name: "G2L", image: "/artists/g2l.jpg", alt: "Visuel officiel aux hirondelles de G2L pour NUBE #1", description: "Du boom bap porté par des textes conscients, lucides et engagés." },
  { name: "Bx", instagramUrl: "https://www.instagram.com/bxrevvn/", image: "/artists/bx.jpg", alt: "Visuel officiel au sabre lumineux de Bx pour NUBE #1", description: "Un artiste polyvalent qui navigue entre les styles et adapte son énergie à chaque morceau." },
];

export const pillars = [
  { number: "01", title: "On rassemble", text: "Des artistes sans distinction de style, de parcours ou d’expérience. La sélection part d’une vision, pas d’un chiffre." },
  { number: "02", title: "On construit", text: "Chaque artiste est accompagné pour développer son univers visuel, sa promotion et la manière de présenter son projet." },
  { number: "03", title: "On fait vivre", text: "Le festival devient une expérience complète : une scène, une identité et un moment commun entre artistes et public." },
];

export const journey = [
  { number: "01", title: "Direction artistique", text: "L’organisation choisit la line-up selon sa vision, les univers et l’équilibre de l’édition." },
  { number: "02", title: "Création", text: "On développe ensemble l’identité, les contenus et la promotion de chaque projet." },
  { number: "03", title: "Scène", text: "On transforme tout le travail en une performance et une expérience pensée pour le public." },
];

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NUBE — Festival & Studio",
    short_name: "NUBE",
    description: "Festival indépendant et studio artistique à Lausanne.",
    start_url: "/",
    display: "standalone",
    background_color: "#08080a",
    theme_color: "#08080a",
    icons: [
      {
        src: "/nube-logo.webp",
        sizes: "720x720",
        type: "image/webp",
        purpose: "maskable",
      },
    ],
  };
}

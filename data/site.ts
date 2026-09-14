import type { Metadata } from "next";

export const siteName = "NUBE";
export const siteDescription =
  "NUBE réunit des artistes, construit leurs univers et les fait vivre sur scène à Lausanne.";

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://nubeexperience.ch",
);

const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "NUBE — Festival indépendant et studio artistique à Lausanne",
};

type PageMetadata = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({ title, description, path }: PageMetadata): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      locale: "fr_CH",
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.url],
    },
  };
}


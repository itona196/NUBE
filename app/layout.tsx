import type { Metadata } from "next";
import "./globals.css";
import { createPageMetadata, siteDescription, siteName, siteUrl } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  ...createPageMetadata({
    title: "NUBE — Festival indépendant à Lausanne",
    description: siteDescription,
    path: "/",
  }),
  applicationName: siteName,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/nube-favicon.png", type: "image/png", sizes: "64x64" }],
    shortcut: "/nube-favicon.png",
    apple: "/nube-logo.webp",
  },
};

const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl.toString(),
  logo: new URL("/nube-logo.webp", siteUrl).toString(),
  description: siteDescription,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lausanne",
    addressCountry: "CH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className="scroll-smooth motion-reduce:scroll-auto"
      data-scroll-behavior="smooth"
    >
      <body className="m-0 overflow-x-hidden bg-[#08080a] font-sans text-[#f1efe9] selection:bg-[#ff66c4] selection:text-[#09090b]">
        <a className="nube-skip-link" href="#main-content">Aller au contenu</a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationData).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}

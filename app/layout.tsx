import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NUBE — Festival indépendant à Lausanne",
  description:
    "NUBE réunit des artistes, construit leurs univers et les fait vivre sur scène à Lausanne.",
  icons: {
    icon: "/nube-logo.png",
    shortcut: "/nube-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth motion-reduce:scroll-auto">
      <body className="m-0 overflow-x-hidden bg-[#08080a] font-sans text-[#f1efe9] selection:bg-[#ff3f98] selection:text-[#09090b]">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { StudioExperience } from "@/components/studio/studio-experience";
import { createPageMetadata } from "@/data/site";

export const metadata: Metadata = createPageMetadata({
  title: "NUBE Studio — Incubateur de projets artistiques",
  description: "Design, musique et visuel : NUBE Studio accompagne les projets artistiques indépendants de l’idée à la réalisation.",
  path: "/creation",
});

export default function CreationPage() {
  return <StudioExperience />;
}

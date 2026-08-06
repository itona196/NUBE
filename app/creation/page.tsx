import type { Metadata } from "next";
import { StudioExperience } from "@/components/studio/studio-experience";

export const metadata: Metadata = {
  title: "NUBE Studio — Incubateur de projets artistiques",
  description: "Design, musique et visuel : NUBE Studio accompagne les projets artistiques indépendants de l’idée à la réalisation.",
};

export default function CreationPage() {
  return <StudioExperience />;
}

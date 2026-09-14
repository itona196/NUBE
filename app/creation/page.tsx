import type { Metadata } from "next";
import { StudioExperience } from "@/components/studio/studio-experience";
import { createPageMetadata } from "@/data/site";

export const metadata: Metadata = createPageMetadata({
  title: "NUBE Studio — Tarifs et prestations",
  description: "Les tarifs de NUBE Studio : design, production musicale, enregistrement, mix, master, photo et vidéo à Lausanne.",
  path: "/creation",
});

export default function CreationPage() {
  return <StudioExperience />;
}

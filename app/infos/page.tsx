import type { Metadata } from "next";
import { FaqSection } from "@/components/home/faq-section";
import { PracticalSection } from "@/components/home/practical-section";
import { MainHeader } from "@/components/main-header";

export const metadata: Metadata = { title: "Informations — NUBE", description: "Date, lieu, accès et réponses pratiques pour NUBE à Lausanne." };

export default function InfosPage() {
  return (
    <main className="bg-[#0d0c0f] pt-[78px] min-[901px]:pt-24">
      <MainHeader />
      <h1 className="sr-only">Informations pratiques</h1>
      <PracticalSection />
      <FaqSection />
    </main>
  );
}

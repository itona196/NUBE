import { SiteHeader } from "./site-header";
import { mainNavigation } from "@/data/navigation";

type MainHeaderProps = {
  home?: boolean;
};

export function MainHeader({ home = false }: MainHeaderProps) {
  return (
    <SiteHeader
      brandLabel={home ? "NUBE — accueil" : "Retour à l’accueil NUBE"}
      brandHref={home ? "#top" : "/"}
      navigationLabel="Navigation principale"
      navigation={mainNavigation}
    />
  );
}

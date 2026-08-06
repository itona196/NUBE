import { SiteHeader } from "./site-header";

const navigation = [
  { href: "/festival", label: "FESTIVAL" },
  { href: "/artistes", label: "ARTISTES" },
  { href: "/archives", label: "ARCHIVES" },
  { href: "/infos", label: "INFOS" },
  { href: "/creation", label: "STUDIO" },
];

type MainHeaderProps = {
  home?: boolean;
};

export function MainHeader({ home = false }: MainHeaderProps) {
  return (
    <SiteHeader
      brandLabel={home ? "NUBE — accueil" : "Retour à l’accueil NUBE"}
      brandHref={home ? "#top" : "/"}
      navigationLabel="Navigation principale"
      navigation={navigation}
    />
  );
}

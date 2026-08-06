const artists = [
  { name: "DXMXN", image: "/artists/dxmxn.jpg", alt: "Visuel officiel de DXMXN pour NUBE #1" },
  { name: "SH4M", image: "/artists/sh4m.jpg", alt: "Visuel officiel de SH4M pour NUBE #1" },
  { name: "NEL", image: "/artists/nel.png", alt: "NEL en performance sur le visuel officiel de NUBE #1" },
  { name: "TENGSHE", image: "/artists/tengshe.jpg", alt: "Visuel officiel fleuri de TENGSHE pour NUBE #1" },
  { name: "ITONA", image: "/artists/itona.jpg", alt: "Visuel officiel en reflet d’ITONA pour NUBE #1" },
  { name: "G2L", image: "/artists/g2l.jpg", alt: "Visuel officiel aux hirondelles de G2L pour NUBE #1" },
  { name: "Bx", image: "/artists/bx.jpg", alt: "Visuel officiel au sabre lumineux de Bx pour NUBE #1" },
];

const pillars = [
  { number: "01", title: "On rassemble", text: "Des artistes sans distinction de style, de parcours ou d’expérience. La sélection part d’une vision, pas d’un chiffre." },
  { number: "02", title: "On construit", text: "Chaque artiste est accompagné pour développer son univers visuel, sa promotion et la manière de présenter son projet." },
  { number: "03", title: "On fait vivre", text: "Le festival devient une expérience complète : une scène, une identité et un moment commun entre artistes et public." },
];

const gallery = [
  { label: "PHOTO SCÈNE", format: "HORIZONTAL 16:10", size: "col-span-2 row-span-2 min-[581px]:col-span-8 min-[581px]:row-span-4" },
  { label: "PORTRAIT ARTISTE", format: "VERTICAL 4:5", size: "col-span-1 row-span-2 min-[581px]:col-span-4 min-[581px]:row-span-5" },
  { label: "PUBLIC", format: "CARRÉ 1:1", size: "col-span-1 row-span-2 min-[581px]:col-span-4 min-[581px]:row-span-4" },
  { label: "COULISSES", format: "HORIZONTAL 3:2", size: "col-span-2 row-span-2 min-[581px]:col-span-8 min-[581px]:row-span-4" },
  { label: "DÉTAIL / AMBIANCE", format: "VERTICAL 4:5", size: "col-span-1 row-span-2 min-[581px]:col-span-4 min-[581px]:row-span-4" },
];

const journey = [
  { number: "01", title: "Candidatures", text: "On découvre les artistes, leurs envies et le monde qu’ils veulent construire." },
  { number: "02", title: "Création", text: "On développe ensemble l’identité, les contenus et la promotion de chaque projet." },
  { number: "03", title: "Scène", text: "On transforme tout le travail en une performance et une expérience pensée pour le public." },
];

const section = "relative px-[clamp(24px,7vw,110px)] py-[clamp(90px,11vw,170px)]";
const index = "mb-[38px] text-[9px] font-black tracking-[.25em] opacity-55";
const displayTitle = "m-0 text-[clamp(62px,8.5vw,132px)] leading-[.78] font-[950] tracking-[-.075em] max-[580px]:text-[60px]";
const pinkSerif = "font-[Georgia] font-normal text-[#ff3f98]";
const gridTexture = "before:absolute before:inset-0 before:bg-[linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] before:bg-[size:34px_34px] before:opacity-15";

function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 grid h-[78px] grid-cols-[1fr_auto] items-center border-b border-white/15 px-[clamp(24px,4vw,72px)] min-[901px]:h-24 min-[901px]:grid-cols-[1fr_auto_1fr]">
      <a className="group flex items-center gap-[11px] text-xl font-black tracking-[-1.5px] min-[581px]:text-2xl" href="#top" aria-label="NUBE — accueil">
        <img className="h-[34px] w-[34px] object-contain drop-shadow-[0_0_9px_rgba(255,63,152,.42)] transition group-hover:-rotate-6 group-hover:scale-105 min-[581px]:h-[42px] min-[581px]:w-[42px]" src="/nube-logo.png" alt="" />
        <span>NUBE<sup className="ml-0.5 align-top text-[8px]">®</sup></span>
      </a>
      <nav className="hidden gap-[38px] min-[901px]:flex" aria-label="Navigation principale">
        {[['#festival','FESTIVAL'],['#edition-one','NUBE #1'],['#artistes','ARTISTES'],['#edition','NUBE #2']].map(([href,label]) => <a className="text-[11px] font-extrabold tracking-[.14em] opacity-70 transition hover:text-[#ff3f98] hover:opacity-100" href={href} key={href}>{label}</a>)}
      </nav>
      <a className="flex items-center gap-2 justify-self-end text-[8px] font-extrabold tracking-[.14em] min-[581px]:gap-3.5 min-[581px]:text-[11px]" href="/creation">NUBE STUDIO <span className="text-base text-[#ff3f98]">↗</span></a>
    </header>
  );
}

function Cloud() {
  const orb = "absolute rounded-full bg-[radial-gradient(circle_at_35%_28%,#ffa9d1_0,#ff4aa0_25%,#a52479_60%,#27122f_100%)] shadow-[inset_-25px_-30px_60px_rgba(0,0,0,.5),0_0_50px_rgba(255,42,145,.15)]";
  return (
    <div className="absolute right-[-23vw] top-[55%] z-2 aspect-square w-[75vw] scale-105 opacity-75 saturate-110 min-[581px]:right-[-8vw] min-[581px]:top-[48%] min-[581px]:w-[65vw] min-[901px]:right-[clamp(-110px,-2vw,-25px)] min-[901px]:top-[18%] min-[901px]:w-[min(43vw,650px)] min-[901px]:opacity-100" aria-hidden="true">
      <div className="absolute inset-[13%] rounded-full bg-[#ff3f98] opacity-30 blur-[80px] motion-safe:animate-pulse" />
      <div className={`${orb} left-[8%] top-[28%] h-1/2 w-1/2`} /><div className={`${orb} right-[3%] top-[21%] h-[58%] w-[58%]`} />
      <div className={`${orb} left-[31%] top-[2%] h-[42%] w-[42%]`} /><div className={`${orb} bottom-[15%] left-[24%] h-[43%] w-[55%]`} />
      <div className="absolute inset-[28%] grid place-items-center rounded-full border border-white/35 font-[Georgia] text-[clamp(70px,10vw,165px)] italic text-white mix-blend-overlay drop-shadow-[0_0_25px_white]">N</div>
      <span className="absolute right-[4%] top-[48%] rotate-90 text-[8px] font-black tracking-[.28em] text-white/70">LAUSANNE · SUISSE</span>
      <span className="absolute bottom-[22%] left-[5%] -rotate-12 text-[8px] font-black tracking-[.28em] text-white/70">NUBE FESTIVAL</span>
    </div>
  );
}

function Footer() {
  return (
    <footer className="absolute inset-x-[clamp(24px,4vw,70px)] bottom-[34px] grid grid-cols-2 items-end gap-y-[18px] border-t border-black/25 pt-6 text-left min-[581px]:grid-cols-[1fr_auto_1fr]">
      <div className="text-[22px] font-[950] tracking-[-.05em]">NUBE<sup className="ml-0.5 align-top text-[8px]">®</sup><span className="mt-1 block text-[7px] tracking-[.25em]">CONTINUER À CRÉER</span></div>
      <div className="row-start-2 flex gap-[26px] text-[8px] font-black tracking-[.15em] min-[581px]:row-auto"><a href="/archives">ARCHIVES ↗</a><a href="#top">INSTAGRAM ↗</a><a href="#top">TIKTOK ↗</a></div>
      <div className="row-start-2 justify-self-end text-right text-[7px] leading-[1.7] tracking-[.15em] min-[581px]:row-auto">LAUSANNE, CH<br />© 2026 NUBE</div>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <Header />
      <section id="top" className="relative flex min-h-[800px] items-start overflow-hidden bg-[radial-gradient(circle_at_72%_48%,rgba(255,33,135,.15),transparent_38%),#08080a] px-[clamp(24px,7vw,110px)] pb-[90px] pt-[145px] min-[581px]:min-h-[860px] min-[581px]:pt-[170px] min-[901px]:min-h-svh min-[901px]:items-center min-[901px]:pt-[150px]">
        <div className="absolute left-[clamp(24px,7vw,110px)] top-[108px] text-[10px] font-extrabold tracking-[.23em] text-[#aaa5ad] min-[581px]:top-[130px]"><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#ff3f98] shadow-[0_0_12px_#ff3f98]" /> FESTIVAL INDÉPENDANT · LAUSANNE</div>
        <div className="relative z-4 mt-[35px] w-full min-[901px]:w-[68%]">
          <p className="mb-[18px] text-[clamp(10px,.9vw,13px)] font-extrabold tracking-[.31em] text-[#aca8af]">UNE SCÈNE. PLUSIEURS MONDES.</p>
          <h1 className="m-0 text-[clamp(53px,13vw,100px)] leading-[.84] font-[950] tracking-[-.075em] min-[901px]:text-[clamp(62px,8.5vw,145px)] min-[901px]:leading-[.78]"><span className="block whitespace-nowrap">CONTINUER</span><span className="block whitespace-nowrap text-transparent [-webkit-text-stroke:1.5px_rgba(241,239,233,.78)] min-[901px]:ml-[clamp(20px,7vw,120px)]">À CRÉER</span></h1>
          <p className="mt-[30px] max-w-[310px] text-[13px] leading-[1.7] text-[#bdb8c1] min-[581px]:mt-[42px] min-[581px]:max-w-[430px] min-[581px]:text-[clamp(14px,1.1vw,17px)] min-[901px]:ml-[clamp(8px,8vw,130px)]">NUBE réunit des artistes, construit leurs univers et les fait vivre sur scène.</p>
          <div className="mt-8 flex flex-col items-start gap-[22px] min-[581px]:flex-row min-[581px]:items-center min-[581px]:gap-[34px] min-[901px]:ml-[clamp(8px,8vw,130px)]">
            <a className="inline-flex items-center gap-[30px] bg-[#f1efe9] px-[21px] py-[17px] text-[10px] font-black tracking-[.13em] text-[#08080a] transition hover:-translate-y-0.5 hover:bg-[#ff3f98]" href="#edition">DÉCOUVRIR NUBE #2 <span className="text-base">↓</span></a>
            <a className="border-b border-[#666] pb-1.5 text-[9px] font-extrabold tracking-[.17em]" href="#festival">COMPRENDRE LE PROJET <span className="ml-2 text-[#ff3f98]">↘</span></a>
          </div>
        </div>
        <Cloud /><div className="absolute bottom-[35px] right-[4vw] z-5 text-[9px] tracking-[.2em] text-[#706c73]">NUBE — 2026</div>
      </section>

      <section id="festival" className={`${section} bg-[#f1efe9] text-[#0a0a0d]`}>
        <div className="grid items-start gap-[60px] min-[901px]:grid-cols-[1.2fr_.8fr]">
          <div><p className={index}>01 / LE FESTIVAL</p><h2 className="m-0 text-[49px] leading-[.85] font-[950] tracking-[-.065em] min-[581px]:text-[clamp(50px,7vw,105px)]">ON NE FAIT PAS<br /><em className={pinkSerif}>QU’UN CONCERT.</em></h2></div>
          <div className="max-w-[470px] justify-self-start pt-[18px] min-[901px]:justify-self-end min-[901px]:pt-[42px]">
            <p className="m-0 text-base leading-[1.55] text-[#3e3b41] min-[581px]:text-[clamp(17px,1.55vw,23px)]">NUBE est un espace où les artistes peuvent montrer plus qu’une performance : une identité, une histoire et un monde qui leur appartient.</p>
            <span className="mt-8 block border-t border-[#b9b5ae] pt-[15px] text-[8px] font-black tracking-[.18em] text-[#767178]">NOTRE POINT DE DÉPART — CONTINUER À CRÉER</span>
            <div className="mt-[34px] flex items-center gap-4 min-[581px]:gap-6"><img className="h-[94px] w-[94px] object-contain drop-shadow-[0_10px_28px_rgba(255,63,152,.16)] min-[581px]:h-[132px] min-[581px]:w-[132px]" src="/nube-logo.png" alt="Logo NUBE, un nuage qui rêve entouré d’étoiles" /><small className="border-l border-[#beb8b0] pl-3.5 text-[7px] font-black leading-[1.7] tracking-[.16em] text-[#6f6971] min-[581px]:pl-5">LE SYMBOLE NUBE<br />UN NUAGE QUI RÊVE, PUIS CRÉE.</small></div>
          </div>
        </div>
        <div className="mt-[60px] grid border-t border-[#b9b5ae] min-[901px]:mt-[100px] min-[901px]:grid-cols-3">
          {pillars.map((pillar) => <article className="border-b border-[#b9b5ae] py-7 min-[901px]:min-h-[300px] min-[901px]:border-r min-[901px]:px-[38px] min-[901px]:first:pl-0 min-[901px]:last:border-r-0" key={pillar.number}><span className="font-[Georgia] text-[15px] italic text-[#ff3f98]">{pillar.number}</span><h3 className="my-3 text-[clamp(28px,3vw,46px)] tracking-[-.055em] min-[901px]:mb-[18px] min-[901px]:mt-20">{pillar.title}</h3><p className="m-0 max-w-80 text-[13px] leading-[1.7] text-[#5b575e]">{pillar.text}</p></article>)}
        </div>
      </section>

      <section id="edition-one" className={`${section} overflow-hidden bg-[#09090b] before:absolute before:right-[-35vw] before:top-[8%] before:h-[55vw] before:w-[55vw] before:rounded-full before:bg-[#ff3f98] before:opacity-10 before:blur-[170px]`}>
        <div className="relative z-2 grid items-end gap-[60px] min-[901px]:grid-cols-[1.2fr_.8fr]"><div><p className={index}>02 / NUBE #1 · 21.06.2026</p><h2 className={displayTitle}>ON L’A FAIT.</h2></div><p className="m-0 max-w-[430px] justify-self-start text-[15px] leading-[1.7] text-[#aaa5ae] min-[901px]:justify-self-end">Une première scène, sept artistes et une identité commune. La preuve que NUBE existe aussi en vrai.</p></div>
        <div className="relative z-2 mt-[50px] aspect-video overflow-hidden border border-white/15 bg-[radial-gradient(circle_at_72%_45%,#8e1c5a,#261321_28%,#0c0b0f_67%)] min-[581px]:mt-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] bg-[size:70px_70px] opacity-15" />
          <img className="absolute right-[-4%] top-[8%] aspect-square w-[62vw] -rotate-6 object-contain opacity-55 drop-shadow-[0_0_60px_rgba(255,63,152,.4)] min-[581px]:right-[7%] min-[581px]:top-[4%] min-[581px]:w-[min(38vw,520px)] min-[581px]:opacity-70" src="/nube-logo.png" alt="" aria-hidden="true" />
          <div className="absolute inset-0 grid place-items-center"><span className="grid aspect-square w-[clamp(70px,9vw,128px)] place-items-center rounded-full border border-white/65 bg-[#08080a]/35 pl-[7px] text-[clamp(22px,2.8vw,40px)] backdrop-blur-lg">▶</span></div>
          <div className="absolute left-2.5 top-2.5 z-3 border border-white/45 bg-[#08080a]/55 p-[7px] text-[6px] font-black tracking-[.18em] backdrop-blur-sm min-[581px]:left-5 min-[581px]:top-5 min-[581px]:px-[11px] min-[581px]:py-[9px] min-[581px]:text-[7px]">PLACEHOLDER · VIDÉO 16:9</div>
          <div className="absolute inset-x-6 bottom-[22px] flex flex-col items-start gap-6 min-[581px]:flex-row min-[581px]:items-end min-[581px]:justify-between"><strong className="text-[clamp(20px,2.6vw,38px)] tracking-[-.04em]">AFTERMOVIE NUBE #1</strong><span className="hidden max-w-[310px] text-right text-[7px] leading-[1.5] tracking-[.15em] text-[#c5bfc8] min-[581px]:block">REMPLACER PAR UN EXTRAIT DE 10–20 SEC. OU LA VIDÉO COMPLÈTE</span></div>
        </div>
        <div className="relative z-2 mt-5 grid grid-cols-1 border-y border-white/15 min-[581px]:grid-cols-3">
          {[['07','ARTISTES'],['01','SCÈNE'],['∞','MONDES']].map(([value,label]) => <span className="flex min-h-[72px] items-center gap-[13px] border-b border-white/15 px-6 py-[18px] text-[8px] font-black tracking-[.15em] min-[581px]:min-h-[105px] min-[581px]:border-b-0 min-[581px]:border-r" key={label}><strong className="font-[Georgia] text-[clamp(28px,3vw,46px)] italic text-[#ff3f98]">{value}</strong> {label}</span>)}
          <a className="flex min-h-[72px] items-center justify-between px-6 py-[18px] text-[8px] font-black tracking-[.15em] min-[581px]:col-span-3 min-[581px]:border-t min-[901px]:col-span-1 min-[901px]:border-t-0" href="/archives">OUVRIR LES ARCHIVES <i className="text-xl not-italic text-[#ff3f98]">↗</i></a>
        </div>
        <div className="relative z-2 mt-[75px] mb-7 flex flex-col items-start gap-3.5 min-[581px]:mt-[110px] min-[581px]:flex-row min-[581px]:items-end min-[581px]:justify-between"><p className={`${index} !m-0`}>GALERIE / PREMIÈRE ÉDITION</p><p className="m-0 max-w-[380px] text-left text-[11px] leading-[1.55] text-[#8f8992] min-[581px]:text-right">Remplace chaque cadre par une photo du festival en gardant le ratio indiqué.</p></div>
        <div className="relative z-2 grid auto-rows-[110px] grid-cols-2 grid-flow-dense gap-[13px] min-[581px]:auto-rows-[85px] min-[581px]:grid-cols-12">
          {gallery.map((item,indexValue) => <div className={`${item.size} ${gridTexture} relative min-h-[180px] overflow-hidden border border-white/15 bg-[radial-gradient(circle_at_65%_30%,rgba(255,63,152,.31),transparent_27%),linear-gradient(140deg,#292430,#0e0d10_68%)]`} key={item.label}><span className="absolute right-[15px] top-[13px] font-[Georgia] text-xs italic text-[#ff3f98]">0{indexValue + 1}</span><div className="absolute inset-0 grid place-items-center text-[70px] font-thin text-white/35">+</div><div className="absolute bottom-3.5 left-4"><strong className="block text-[10px] tracking-[.14em]">{item.label}</strong><small className="mt-1 block text-[6px] tracking-[.17em] text-[#9c969f]">PLACEHOLDER · {item.format}</small></div></div>)}
        </div>
      </section>

      <section id="artistes" className={`${section} bg-[#f1efe9] text-[#0a0a0d]`}>
        <div className="relative z-2 grid items-end gap-[60px] min-[901px]:grid-cols-[1.2fr_.8fr]"><div><p className={index}>03 / LES ARTISTES</p><h2 className={displayTitle}>SEPT ARTISTES.<br /><em className={pinkSerif}>SEPT UNIVERS.</em></h2></div><p className="m-0 max-w-[430px] justify-self-start text-[15px] leading-[1.7] text-[#5c5860] min-[901px]:justify-self-end">Sept identités visuelles imaginées pour faire exister chaque univers avant même l’entrée en scène.</p></div>
        <div className="mt-[55px] grid grid-cols-2 gap-x-[9px] gap-y-[30px] min-[581px]:gap-x-3.5 min-[581px]:gap-y-[42px] min-[581px]:mt-20 min-[901px]:grid-cols-4">
          {artists.map((artist,indexValue) => <article className="group min-w-0" key={artist.name}><div className="relative aspect-[2/3] overflow-hidden border border-[#c5c0b8] bg-[#111014] after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(0,0,0,.18),transparent_20%,transparent_72%,rgba(0,0,0,.28))]"><img className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025] group-hover:saturate-[1.08] group-hover:contrast-[1.03]" src={artist.image} alt={artist.alt} loading="lazy" decoding="async" /><span className="absolute right-[13px] top-3 z-2 font-[Georgia] text-xs italic text-white drop-shadow-[0_1px_10px_rgba(0,0,0,.7)]">0{indexValue + 1}</span></div><div className="flex flex-col items-start gap-2.5 border-t border-[#bbb6ae] pt-[13px] min-[581px]:flex-row min-[581px]:items-end min-[581px]:justify-between"><h3 className="m-0 text-[clamp(20px,2vw,30px)] tracking-[-.045em]">{artist.name}</h3><span className="max-w-[90px] text-left text-[6px] leading-[1.5] tracking-[.12em] text-[#7c777e] min-[581px]:text-right">LIEN MUSIQUE À AJOUTER ↗</span></div></article>)}
        </div>
      </section>

      <section id="edition" className={`${section} bg-[#0d0c0f]`}>
        <div className="relative z-2 grid items-start gap-[60px] min-[901px]:grid-cols-[1.2fr_.8fr]"><div><p className={index}>04 / NUBE #2</p><h2 className={displayTitle}>DE L’IDÉE<br /><em className={pinkSerif}>JUSQU’À LA SCÈNE.</em></h2></div><div className="mt-5 w-[min(100%,360px)] justify-self-start border border-white/15 bg-[#151218] p-[27px] min-[901px]:mt-0 min-[901px]:justify-self-end"><span className="float-right h-2 w-2 rounded-full bg-[#ff3f98] shadow-[0_0_0_6px_rgba(255,63,152,.12),0_0_18px_#ff3f98]" /><p className="mb-[18px] text-[7px] tracking-[.18em] text-[#8e8992]">STATUT DES CANDIDATURES</p><strong className="block text-[clamp(23px,2.4vw,34px)] leading-none tracking-[-.04em]">BIENTÔT OUVERTES</strong><small className="mt-[26px] inline-block border border-[#4a454d] px-[9px] py-[7px] text-[7px] tracking-[.15em] text-[#ff3f98]">DATE À AJOUTER</small></div></div>
        <div className="mt-[55px] grid min-[901px]:mt-[105px] min-[901px]:grid-cols-3">
          {journey.map((step) => <article className="relative border-b border-white/15 py-[30px] min-[901px]:min-h-[330px] min-[901px]:border-b-0 min-[901px]:px-[45px] min-[901px]:first:pl-0 min-[901px]:not-first:border-l" key={step.number}><span className="font-[Georgia] text-base italic text-[#ff3f98]">{step.number}</span><div className="my-[25px] h-px w-full bg-[linear-gradient(90deg,#ff3f98,#3a343d_43%,transparent)] min-[901px]:mb-[62px] min-[901px]:mt-[38px]" /><h3 className="mb-5 text-[clamp(30px,3.4vw,50px)] tracking-[-.055em]">{step.title}</h3><p className="m-0 max-w-80 text-[13px] leading-[1.7] text-[#928c96]">{step.text}</p></article>)}
        </div>
      </section>

      <section className={`${section} relative flex min-h-[810px] flex-col items-center justify-start overflow-hidden bg-[#ff3f98] pt-[105px] text-center text-[#0a090b] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_18%_20%,white,transparent_22%)] before:opacity-15 min-[581px]:min-h-[94vh] min-[581px]:justify-center`}>
        <img className="absolute right-[-4vw] top-[-8vw] aspect-square w-[min(36vw,540px)] rotate-[9deg] object-contain opacity-20 grayscale brightness-[.12]" src="/nube-logo.png" alt="" aria-hidden="true" />
        <p className={`${index} relative !mb-5`}>PROCHAINE ÉDITION</p><p className="relative mb-[30px] text-[8px] font-black tracking-[.2em]"><span className="mr-2 inline-block h-[7px] w-[7px] rounded-full bg-[#0a090b] shadow-[0_0_0_5px_rgba(0,0,0,.1)]" /> NUBE #2 — EN CONSTRUCTION</p>
        <h2 className="relative m-0 text-[64px] leading-[.78] font-[950] tracking-[-.075em] min-[581px]:text-[clamp(64px,9vw,136px)]">ON OUVRE<br /><em className="font-[Georgia] font-normal text-white">PLUS GRAND.</em></h2>
        <p className="relative mx-auto mt-[35px] mb-6 max-w-[610px] text-[13px] leading-[1.65] min-[581px]:text-[15px]">Plus d’artistes. Plus de styles. Une promotion pensée avec eux et une véritable expérience scénique à construire ensemble.</p>
        <div className="relative flex w-[min(520px,100%)] flex-col items-center gap-6"><a className="relative mt-[15px] flex w-full items-center justify-between bg-[#09090b] py-[11px] pr-3 pl-[25px] text-left text-[10px] font-black tracking-[.15em] text-white transition hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(30,0,15,.25)]" href="mailto:contact@nube.studio?subject=NUBE%20%232%20%E2%80%94%20participation"><span>REJOINDRE NUBE #2</span><i className="grid h-[49px] w-[49px] place-items-center bg-white text-[22px] not-italic text-black">↗</i></a><a className="border-b border-black/45 pb-[7px] text-[8px] font-black tracking-[.18em]" href="/creation">DÉCOUVRIR LE PÔLE CRÉATION <span className="ml-[9px]">↗</span></a></div>
        <p className="relative mt-[13px] text-[8px] tracking-[.12em] opacity-60">E-MAIL PLACEHOLDER — REMPLACER contact@nube.studio</p><Footer />
      </section>
    </main>
  );
}

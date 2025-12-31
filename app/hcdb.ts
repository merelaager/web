// This file contains the ‘static database’. Information is hardcoded here
// since it rarely changes, and it is hardly inconvenient to redeploy the
// application when this information changes. Additionally, it helps keep a nice
// history of some key info on the website.

// The used year reflects the relevant information year, which might not be the
// current year. Hence, using new Date().getFullYear() is not suitable everywhere.
// Due to the human nature of information updates, we cannot use a function either
// to "toggle" the year swap. As such, this constant should be used wherever the
// information year is needed (i.e., everywhere aside from immutable, static years
// or copyright).

import type { ReactElement } from "react";

export const YEAR: number = 2026;
export const UNLOCK_TIME = new Date(
  Date.parse("01 Jan 2026 12:00:00 UTC")
).getTime();

export const REG_MAX_COUNT = 4;

export const LANDING_TAGLINE: string = "Kohtumiseni suvel";
export const LANDING_SUBTEXT: string = "- Merelaager -";

export interface QuickLink {
  href: string;
  content: string;
}

export const landingQuickLinks: QuickLink[] = [
  {
    href: "/registreerimine/",
    content: "Registreerimine"
  },
  // {
  //   href: "/info/laagrist/#asukoht",
  //   content: "Asukoht ja kogunemine"
  // },
  // {
  //   href: "/info/laagrist/#laagrisse-kaasa",
  //   content: "Laagrisse kaasa"
  // },
  {
    href: "/info/vahetused/#ajad",
    content: "Laagrivahetuste ajad"
  },
  {
    href: "/info/maksmine/#maksumus",
    content: "Hinnad"
  }
];

export interface PromoContent {
  title: string;
  description: string;
  img?: ReactElement;
  video_mp4?: string;
  video_webm?: string;
}

export const landingPromoContent: PromoContent[] = [
  {
    title: "Laoküla merelaager",
    description:
      "Suurepärane võimalus 8–16aastastel merehuvilistel veeta suvi looduskaunis kohas mere kaldal.",
    video_webm: "/img/landing/introduction.webm",
    video_mp4: "/img/landing/introduction.mp4"
  },
  {
    title: "Eelnev merekogemus pole oluline",
    description:
      "12päevase laagrivahetuse jooksul võib selgeks saada nii purjetamise, sõudmise kui ka muude meresõiduvahendite kasutamise algtõed.",
    video_webm: "/img/landing/sailing.webm",
    video_mp4: "/img/landing/sailing.mp4"
  },
  {
    title: "Ja siis, kui merele ei saa",
    description:
      "Merelaagri õhtuid ja ka tormipäevi sisustavad tavapärased laagri tegevused – lõkkeõhtud, diskod, matkad ja mitmesugused võistlused.",
    video_webm: "/img/landing/freetime.webm",
    video_mp4: "/img/landing/freetime.mp4"
  }
];

export interface TeamMember {
  name: string;
  description: string;
  achievements: string[];
}

// Current camp-masters.
export const mainMembers: TeamMember[] = [
  {
    name: "Sanna",
    description:
      "Sanna on juba 13 aastat suviti merelaagrist osa võtnud: alguses lapsena ning viimased 5 aastat kasvatajana. Lisaks laagrile näeb Sannat suvel tihti veemotospordi võistlustel kihutamas. Sanna on energiline ja positiivne ning leiab alati lastega ühise keele.",
    achievements: []
  },
  {
    name: "Markus",
    description:
      "Markus on olnud merelaagriga seotud juba väikesest poisist peale. Esimest korda käis ta laagris aastal 2007. Nüüd, 14 aastat hiljem on ta valmis edasi andma oma teadmisi purjetamisest ja merest. Suved veedab Markus enamasti vee ääres, aidates ehitada ja korraldada merelaagrit või reisides Euroopas, et olla abiks veemoto võistlustel. Talviti õpib ta Tallinna Tehnikaülikoolis inseneriks.",
    achievements: []
  },
  {
    name: "Maria",
    description:
      "Maria soov tegeleda lastega sai alguse merelaagrist ja sellest on välja kujunenud ka tema kutsumus. Kui ta just parajasti eripedagoogi haridust ei omanda, siis tegeleb ta lastega nii huviringi juhendajana koolis, eraõpetajana kodus kui ka laagrikasvatajana suvel. Lisaks huvitavad teda veel meri, kunst ja muusika.",
    achievements: []
  },
  {
    name: "Martin",
    description:
      "Martin leidis huvi mere vastu lapsena, kui esimest korda merelaagrisse tuli. Sellest ajast saati on Martin käinud merelaagris korduvalt, nii lapsena kui ka kasvatajana. Talle meeldib anda edasi teadmisi merest ning õpetada lastele mere ja tehnoloogiaga seotud oskusi. Väljaspool laagrit on Martin üliõpilane ning tegeleb purjetamise, spordi ja inseneeriaga.",
    achievements: []
  }
];

// Retired camp-masters.
export const retiredMembers: TeamMember[] = [
  {
    name: "Ahto",
    description:
      "Ahto elu ja töö ongi merelaager ja muidugi ka veemoto. Ametilt on ta koolitatud meremees – laevamehaanik. Võib öelda, et ilmselt nakatus ta merepisikuga juba lapsena Noorte Meremeeste Klubis ja Simiste merelaagris käies. Tema käte, mõtete ja ideede abil on laagris valminud kõik, mis silmaga näha. Noortega on ta töötanud viimased paarkümmend aastat – nii laagris kui ka Eesti veemoto järelkasvu treenides.",
    achievements: [
      "2014. aastal pälvis Ahto tubli töö eest veemoto noortetreenerina riikliku spordipreemia.",
      "2015. aasta veebruaris pälvis ta elupäästja III klassi medali.",
      "Aasta mereharija 2019."
    ]
  },
  {
    name: "Kati",
    description:
      "Kati elu märksõnadeks on meri ja lapsed. Ka tema kutsumus on alguse saanud Noorte Meremeeste Klubist, kus ta oli lapsena kasvandik ja hiljem tööl erinevatel ametikohtadel... ikka õpetades. Esmased kogemused merelaagri kasvatajana sai ta juba Simiste laagrist. Kui ta just laagris ei ole, õpetab ta järelkasvu lasteaias. Tema õpitud erialad ongi koolieelne pedagoogika ja noorsootöö.",
    achievements: ["Aasta mereharija 2012."]
  },
  {
    name: "Leho",
    description:
      "Leho on noorsootöötaja suure tähega. Selleks on ta ka õppinud. Merelaagri meeskonda sulandus ta juba üle kahekümne aasta tagasi, on korralikult ära õppinud kõik olulised meretarkused ja oskab neid suurepäraselt noortele edasi anda. Igapäevaselt rakendab ta oma oskusi noortega töötamisel Kaitseliidus.",
    achievements: [
      "2010. aastal nimetati Leho Järvamaa parimaks noorsootöötajaks."
    ]
  },
  {
    name: "Tiia",
    description:
      "Tiia on ka saanud tuule tiibadesse Laoküla merelaagrist. Algul oli ta siin kasvandik, siis kasvataja ja nüüd juhatab juba mitmendat aastat oma vahetust. Kuna igasugune organiseerimine tuleb tal väga hästi välja, siis tema erialaks on vaba aja ja puhketegevuse korraldus (rekreatsioonikorraldus). Lisaks lööb ta aktiivselt kaasa veemoto suurvõistluste korraldamisel.",
    achievements: []
  },
  {
    name: "Kai",
    description:
      "Sarnaselt Kati ja Ahtoga on ka tema merepisik pärit Noorte Meremeeste Klubi ajast, kust ta muuhulgas töötas laevakokana õppelaeval Juku. Ta on õppinud ettevõtlust ja ärijuhtimist ning tal on pikaajaline töökogemus turismivaldkonnas nii merel kui maal. Aastast 2016 on ta tagasi lapsepõlve nostalgiaradadel merelaagris. Talle meeldib meri ja tal on hea meel, kui saab noorte merearmastusele kaasa aidata.",
    achievements: []
  }
];

import { Link } from "react-router";
import React, { ReactElement } from "react";
import { Fragment } from "react";
import type { MetaDescriptor, MetaFunction } from "react-router";

import { genMetaData } from "~/utils/metagen";
import MetaConstants from "~/utils/meta-constants";
import Email from "~/components/email";

export const meta: MetaFunction = () => {
  return genMetaData(MetaConstants.INFO, "/info") as MetaDescriptor[];
};

interface ReferenceLink {
  id: string;
  description: string;
}

interface InfoCard {
  title: string;
  description: string;
  linkSuffix: string;
  refs: ReferenceLink[];
  addendum?: ReactElement;
}

interface InfoCardsProp {
  cards: InfoCard[];
}

interface ReferenceLinksProp {
  linkSuffix: string;
  refs: ReferenceLink[];
}

const cardsInfo: InfoCard[] = [
  {
    title: "Vahetused ja broneerimine",
    description:
      "Suve jooksul toimub 4 erinevat laagrivahetust, igaüks erineva ilma, tegevuskava ja seltskonnaga. Üks täispikk vahetus kestab 12 päeva ja lühike vahetus 9 päeva. Enamasti tahavad lapsed tagasi tulla juba tuttavasse vahetusse, ent alati on ka neid, kes soovivad erinevad vahetused läbi proovida, sest sõpru leiab alati.",
    linkSuffix: "vahetused/",
    refs: [
      { id: "#ajad", description: "Laagrivahetuste ajad" },
      { id: "#broneerimine", description: "Broneerimine" },
    ],
  },
  {
    title: "Hinnad ja maksmine",
    description:
      "Toetades meid, toetate ka Neptunit. Neptun kaitseb teie varandust – lapsi ja nende head tuju – nii maal kui ka merel. Kes teab, võib-olla ilmutab ta end isegi lastele.",
    linkSuffix: "maksmine/",
    refs: [
      { id: "#maksumus", description: "Laagrikoha maksumus" },
      { id: "#makseinfo", description: "Makseinfo" },
    ],
  },
  {
    title: "Elu laagris",
    description:
      "Kui lapsed on laagris, hoolitsevad nende hea tuju eest nii nemad ise kui ka kasvatajad, ent on asju mida lapsed ja vanemad võiksid eelnevalt teada. Nii saate tagada selle, et laps laagris millestki puudust ei tunneks, ja nii ennast kui ka lapsi kurssi viia sellega, mis neid ees ootab.",
    linkSuffix: "laagrist/",
    refs: [
      { id: "#asukoht", description: "Asukoht ja kogunemine" },
      { id: "#laagrisse-kaasa", description: "Laagrisse kaasa" },
      { id: "#kava", description: "Päevakava" },
      { id: "#kodukord", description: "Kodukord" },
    ],
  },
  {
    title: "Korduma kippuvad küsimused",
    description:
      "Merelaager on igatepidi eriline. Ega meil olegi võimalik teile laagrist täit ülevaadet anda, selle tagasiside saate loodetavasti lastelt :). Siin oleme välja toonud vastused kõige olulisematele küsimustele, mis vanematel tihti tekivad.",
    linkSuffix: "kkk/",
    refs: [
      { id: "#turvalisus", description: "Turvalisus merel" },
      { id: "#toitlustamine", description: "Toitlustamine" },
      { id: "#tervis", description: "Terviserike või õnnetusjuhtum" },
      { id: "#ujumisoskus", description: "Ujumisoskus" },
      { id: "#purjetamisoskus", description: "Purjetamisoskus" },
      { id: "#osalustasu", description: "Osalemistasu tagasimaksmine" },
    ],
    addendum: (
      <p className="u-mt-15">
        Kui te oma küsimustele kusagilt vastust ei leia, kirjutage meile:{" "}
        <span className="t-visible">
          <Email username="info" />
        </span>
        .
      </p>
    ),
  },
];

const InfoCardRefs = ({ linkSuffix, refs }: ReferenceLinksProp) => {
  const cardRefs = refs.map((ref) => (
    <li key={ref.id}>
      <Link to={linkSuffix + ref.id}>{ref.description}</Link>
    </li>
  ));

  return (
    <div className="c-sectional__links">
      <h5>Viited</h5>
      <ul className="u-visible-links c-wave-list">{cardRefs}</ul>
    </div>
  );
};

const InfoCards = ({ cards }: InfoCardsProp) => {
  const infoCards = cards.map((card) => (
    <section key={card.linkSuffix} className="c-section">
      <div className="o-container">
        <div className="c-sectional">
          <h4 className="c-sectional__header">
            <Link to={card.linkSuffix}>{card.title}</Link>
          </h4>
          <div className="c-sectional__content">
            <p>{card.description}</p>
            {card.addendum ?? null}
          </div>
          <InfoCardRefs refs={card.refs} linkSuffix={card.linkSuffix} />
        </div>
      </div>
    </section>
  ));

  return <Fragment>{infoCards}</Fragment>;
};

export default function InfoRoute() {
  return (
    <main>
      <h3 className="c-section-heading u-mt-1em">Ülevaade</h3>
      <InfoCards cards={cardsInfo} />
    </main>
  );
}

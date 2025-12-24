import { Link } from "react-router";
import type { MetaDescriptor, MetaFunction } from "react-router";
import { genMetaData } from "~/utils/metagen";
import MetaConstants from "~/utils/meta-constants";

export const meta: MetaFunction = () => {
  return genMetaData(
    MetaConstants.KASUTAJATINGIMUSED,
    "/kasutajatingimused",
  ) as MetaDescriptor[];
};

export default function TermsOfUseLegalRoute() {
  return (
    <main>
      <section className="c-section c-section--legal">
        <div className="o-container">
          <h3 className="c-section-heading">Veebilehe kasutajatingimused</h3>
          <p>Viimati täiendatud: 24. detsember 2025</p>
          <ol className="u-no-list-style u-nested-increments">
            <li>
              <h4>Üldinfo</h4>
              <ol className="u-no-list-style">
                <li>
                  Merelaagri veebilehe kasutajatingimused (edaspidi{" "}
                  <q>kasutajatingimused</q>) käivad internetilehekülgede kohta
                  (edaspidi <q>veebileht</q>), mis kuuluvad merelaager.ee
                  domeeni alla.
                </li>
                <li>
                  Veebilehe kasutamisega kinnitab kasutaja, et on käesolevate
                  tingimustega tutvunud, neist aru saanud ja nõustub nendega
                  täielikult.
                </li>
              </ol>
            </li>
            <li>
              <h4>Veebilehel olev informatsioon</h4>
              <ol className="u-no-list-style">
                <li>
                  Kuigi oleme teinud omalt poolt kõik võimaliku, et veebilehel
                  olev info oleks täpne ja täielik, ei taga me info õigsust ega
                  vastuta tagajärgede eest, mis võivad tuleneda väärinfo
                  kasutamisest.
                </li>
              </ol>
            </li>
            <li>
              <h4>Isikuandmete töötlemine</h4>
              <p>
                Infot selle kohta, kuidas taotleme isikuandmeid, leiate{" "}
                <Link to="/oiguslik/isikuandmed/" className="t-visible">
                  siit
                </Link>
                .
              </p>
            </li>
            <li>
              <h4>Vastutuse piirang</h4>
              <ol className="u-no-list-style">
                <li>
                  Veebilehe sisu on kasutamiseks põhimõttel <q>nagu on</q> (
                  <q>as-is</q>). Me ei anna tagatisi veebilehe ega sellel
                  leiduva info sisu kohta. Me ei vastuta kahju eest, mida
                  veebilehe kasutamine võib põhjustada, isegi juhul, kui olime
                  teadlikud veebilehel olevast veast.
                </li>
              </ol>
            </li>
            <li>
              <h4>Autoriõigus</h4>
              <ol className="u-no-list-style">
                <li>
                  Kogu veebilehel leiduv info, sealhulgas veebilehe kujundus ja
                  tarkvara, kuulub merelaagrile, kui ei ole teisiti sätestatud,
                  ja seda võib kasutada vaid mitteärilistel eesmärkidel.
                </li>
                <li>
                  Veebilehel sisalduvate piltide jagamine ilma meie eelneva
                  kirjaliku loata on keelatud. Laagrilastel ja nende lähimatel
                  pereliikmetel on õigus oma lähiringkonnale osa pilte jagada ja
                  üles laadida, ent nad on kohustatud need maha võtma, kui neilt
                  seda palutakse.
                </li>
                <li>
                  Laagrivahetuse jooksul pildistamise kohta leiate infot meie{" "}
                  <Link to="/info/laagrist/#kodukord" className="t-visible">
                    kodukorrast
                  </Link>
                  .
                </li>
                <li>
                  Merelaagri brändi ja logomärkide kasutamise kohta leiate infot{" "}
                  <Link to="/oiguslik/brand/" className="t-visible">
                    siit
                  </Link>
                  .
                </li>
                <li>
                  Veebisaidi lähtekoodi on võimalik sirvida{" "}
                  <a href="https://github.com/merelaager" className="t-visible">
                    siin
                  </a>
                  , ent seda ei või kasutada / reproda, ei osadena ega
                  täielikult, ilma merelaagri eelneva kirjaliku nõusolekuta.
                </li>
              </ol>
            </li>
            <li>
              <h4>Lingid</h4>
              <ol className="u-no-list-style">
                <li>
                  Veebilehel olevad lingid kolmandate osapoolte
                  internetilehekülgedele on vaid refereerimiseks ja/või
                  täiendava, laagrist mittesõltuva info leidmise hõlbustamiseks.
                  Nende linkide olemasolu ei tohiks käsitleda meie heakskiiduna
                  lehekülgedel leiduva info või pakutavate teenuste kohta.
                  Taoliste linkide kasutamine toimub kasutaja enda riisikol ja
                  me ei vastuta selliste lehekülgede sisu, kättesaadavuse ega
                  kasutamise eest. Me ei ole kindlaks teinud sellistel
                  lehekülgedel leiduva info tõesust, täpsust ega
                  usaldusväärsust.
                </li>
              </ol>
            </li>
            <li>
              <h4>Küpsised (Cookies) ning Web Storage</h4>
              <p>
                Infot küpsiste ja Web Storage'i kasutamise kohta leiate{" "}
                <Link to="/oiguslik/kupsised/" className="t-visible">
                  siit
                </Link>
                .
              </p>
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
}
